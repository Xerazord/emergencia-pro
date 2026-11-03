/* ─── Queixas Neurológicas ─── */
// ─── Cefaleia ──────────────────────────────────────────────────────────────
const CEF_INICIO=['Trovoada / Súbito','Progressivo','Crônica recorrente','Crônica diária'];
const CEF_LOC=['Holocraniana','Hemicraniana D','Hemicraniana E','Temporal D','Temporal E','Temporal bilateral','Cervical','Occipital','Frontal','Retro-orbitária'];
const CEF_QUAL=['Pulsátil','Em pressão / aperto','Em pontada','Em queimação','Lancinante / em choque','Contínua'];
const CEF_MODIF=['Piora ao esforço / Valsalva','Piora ao deitar','Melhora ao deitar','Piora ao acordar','Posicional (muda com postura)','Piora com movimento da cabeça','Melhora em ambiente escuro / silencioso','Melhora com sono'];
const CEF_PRECIP=['Esforço físico','Manobra de Valsalva (tosse, evacuação)','Estresse','Jejum','Álcool','Alimento específico','Ciclo menstrual','Privação de sono','Pós-TCE recente','Pós-punção lombar / raquianestesia','Pós-coito'];
const CEF_ASSOC=['Náusea / vômitos','Fotofobia','Fonofobia','Aura visual (escotoma cintilante)','Aura sensitiva (parestesia)','Aura motora / disfasia','Lacrimejamento ipsilateral','Hiperemia conjuntival','Ptose / miose ipsilaterais (Horner)','Rinorreia / congestão nasal','Inquietude / agitação','Febre','Rigidez de nuca','Convulsão','Déficit neurológico focal','Síncope ou pré-síncope'];
const CEF_ALARM=['Pior cefaleia da vida','Cefaleia em trovoada (pico < 1 min)','Primeira crise da vida','Mudança de padrão habitual','Imunossupressão / HIV / neoplasia ativa','Gravidez / puerpério','Anticoagulação em uso','Abuso de analgésicos (> 10–15 dias/mês)','Cefaleia que acorda o paciente','Perda ponderal / sudorese noturna inexplicada'];
const CEF_ANTEC=['Enxaqueca prévia','Cefaleia tensional prévia','Cefaleia em salvas prévia','Hipertensão intracraniana idiopática conhecida','Aneurisma cerebral conhecido / familiar','Uso de ACO / TRH','Sinusopatia crônica','Disfunção temporomandibular'];
const CEF_DESCR_MAP={'Aura motora / disfasia':'auraMot','Déficit neurológico focal':'deficit','Convulsão':'conv','Síncope ou pré-síncope':'sinc'};
const CEF_DESCR_FIELDS=[
 ['Aura motora / disfasia','auraMot','Descrever aura motora / disfasia (ex: parestesia MSE, disartria, hemiparesia transitória...)'],
 ['Déficit neurológico focal','deficit','Descrever déficit (ex: hemiparesia D, afasia, ataxia, diplopia...)'],
 ['Convulsão','conv','Descrever convulsão (ex: TCG, focal, duração, pós-ictal...)'],
 ['Síncope ou pré-síncope','sinc','Descrever síncope (ex: pós-pico álgico, sem pródromo, queda...)']
];
function cefAssocExtra(S){
 const c=S.cef;const out=[];
 CEF_DESCR_FIELDS.forEach(([trig,key,ph])=>{if(c.assoc.includes(trig))out.push(`<label>${esc(trig)} — descrição</label><input type="text" value="${esc(c.descr[key])}" oninput="S.cef.descr['${key}']=this.value" placeholder="${esc(ph)}" style="margin-bottom:8px">`);});
 return out.join('');
}
function cefAfter(S){
 return `<div style="margin-top:10px"><label>Tempo de início</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 2 horas, 30 min"></div>`+cefAlarmBadge();
}
function cefAlarmCount(){return S.cef.alarm.length;}
function cefAlarmBadge(){
 if(S.queixa!=='Cefaleia')return '';
 const n=cefAlarmCount();
 const level=n===0?'leve':n<=2?'mod':'grave';
 return gravBadge(level,`Cefaleia com ${n} ${n===1?'sinal':'sinais'} de alarme`);
}
function cefHda(S) {
  const c = S.cef;
  if (!c.inicio && !c.loc.length && !c.qual.length && !c.modif.length && !c.precip.length && !c.assoc.length && !c.alarm.length) return '';
  const car = [];
  if (c.inicio) {
    const iniStr = c.inicio.toLowerCase().replace(/súbito$/, 'súbita').replace(/progressivo$/, 'progressiva');
    car.push(`com instalação ${iniStr}`);
  }
  if (c.loc.length) car.push(`localizada em ${joinAnd(c.loc).toLowerCase()}`);
  if (c.qual.length) car.push(`de caráter ${joinAnd(c.qual).toLowerCase()}`);

  let out = car.length ? `caracterizada por cefaleia ${joinAnd(car)}` : 'apresentando cefaleia';
  if (c.precip.length || c.modif.length) {
    const m = [];
    if (c.precip.length) m.push(`desencadeada por ${joinAnd(c.precip).toLowerCase()}`);
    if (c.modif.length) m.push(`com fatores modificadores: ${joinAnd(c.modif).toLowerCase()}`);
    out += `. Relata crise ${joinAnd(m)}`;
  }
  if (c.assoc.length) {
    let s = joinAnd(c.assoc).toLowerCase();
    const d = [];
    if (c.descr.auraMot) d.push(`aura motora: ${c.descr.auraMot}`);
    if (c.descr.deficit) d.push(`déficit: ${c.descr.deficit}`);
    if (c.descr.conv) d.push(`convulsão: ${c.descr.conv}`);
    if (c.descr.sinc) d.push(`síncope: ${c.descr.sinc}`);
    if (d.length) s += ` (${d.join('; ')})`;
    out += `. Ao interrogatório sintomático, relata ${s}`;
  }
  if (c.alarm.length) out += `. Sinais de alerta presentes: ${joinAnd(c.alarm).toLowerCase()}`;

  // Negações ativas com fusão elegante
  const unselected = [];
  const alSet = (c.alarm || []).map(x => x.toLowerCase());
  const asSet = (c.assoc || []).map(x => x.toLowerCase());
  if (!alSet.includes('início súbito / pico em segundos ("trovoada" - hsa)')) unselected.push('instalação em trovoada (thunderclap)');
  if (!asSet.includes('febre') && !alSet.includes('febre associada')) unselected.push('febre');
  if (!alSet.includes('déficit neurológico focal')) unselected.push('déficits neurológicos focais');
  if (!asSet.includes('crise convulsiva') && !alSet.includes('crise convulsiva')) unselected.push('crises epilépticas');
  if (!asSet.includes('síncope')) unselected.push('síncope');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de sinais de alerta como ${joinAnd(unselected)}.`;

  return out;
}
function cefHpp(S){return S.cef.antec.slice();}

// Cefaleia EF — opções
const CEF_EF_MENTAL=['Alerta e orientado','Sonolento','Confuso / desorientado','Disartria','Afasia de expressão','Afasia de compreensão','Afasia global','Discurso incoerente'];
const CEF_EF_MOTOR=['Normal','Hemiparesia D','Hemiparesia E','Hemiplegia D','Hemiplegia E','Paraparesia'];
const CEF_EF_COORD=['Normal','Dismetria índex-nariz','Dismetria calcanhar-joelho','Disdiadocodinésia','Ataxia de tronco','Ataxia de marcha'];
const CEF_EF_REGIONAL=['Artéria temporal dolorosa / endurecida','Sensibilidade ATM','Dor à digitopressão de seios paranasais','Sinais autonômicos craniofaciais ipsilaterais (cluster)'];
function cefEFText(S){
 const e=S.cefEF;
 const parts=[];
 if(e.mental.length){
  const mapM=m=>m==='Alerta e orientado'?'alerta e orientado em tempo, espaço e pessoa':m.toLowerCase();
  parts.push(`Paciente ${joinAnd(e.mental.map(mapM))}`);
 }
 if(e.motor.length){
  const mapMo=m=>m==='Normal'?'força motora preservada (Grau V nos quatro membros)':m.replace(/^Hemi/,'hemi').replace(/^Para/,'para');
  parts.push(`exame motor evidenciando ${joinAnd(e.motor.map(mapMo))}`);
 }
 if(e.coord.length){
  const mapC=m=>m==='Normal'?'coordenação preservada às manobras índex-nariz e calcanhar-joelho':m.toLowerCase();
  parts.push(joinAnd(e.coord.map(mapC)));
 }
 if(e.regional.length){
  const mapR=r=>r.replace('ATM','da articulação temporomandibular (ATM)').toLowerCase().replace('(atm)','(ATM)');
  parts.push(`achados regionais com ${joinAnd(e.regional.map(mapR))}`);
 }
 if(!parts.length)return '';
 const txt=parts.join('; ');
 return txt.charAt(0).toUpperCase()+txt.slice(1)+'.';
}

registerQx('Cefaleia',{
 anamnese:{
  sigla:'cef',
  blocks:[
   {key:'inicio',label:'Início',type:'radio',options:CEF_INICIO,autoOpenNext:'loc'},
   {key:'loc',label:'Localização',type:'tags',options:CEF_LOC,autoOpenNext:'qual'},
   {key:'qual',label:'Qualidade',type:'tags',options:CEF_QUAL,autoOpenNext:'modif'},
   {key:'modif',label:'Modificadores',type:'tags',options:CEF_MODIF,autoOpenNext:'precip'},
   {key:'precip',label:'Precipitantes',type:'tags',options:CEF_PRECIP,autoOpenNext:'assoc'},
   {key:'assoc',label:'Sintomas associados',type:'tags',options:CEF_ASSOC,autoOpenNext:'alarm',extra:cefAssocExtra},
   {key:'alarm',label:'Sinais de alarme',type:'tags',options:CEF_ALARM,autoOpenNext:'antec'},
   {key:'antec',label:'Antecedentes específicos',type:'tags',options:CEF_ANTEC}
  ],
  after:cefAfter,
  onRemove(k,v){if(k==='assoc'&&CEF_DESCR_MAP[v])S.cef.descr[CEF_DESCR_MAP[v]]='';}
 },
 ef:{
  sigla:'cefEF',
  blocks:[
   {key:'mental',label:'Estado mental e fala',type:'tags',options:CEF_EF_MENTAL,autoOpenNext:'motor'},
   {key:'motor',label:'Força motora',type:'tags',options:CEF_EF_MOTOR,autoOpenNext:'coord'},
   {key:'coord',label:'Coordenação',type:'tags',options:CEF_EF_COORD,autoOpenNext:'regional'},
   {key:'regional',label:'Achados regionais',type:'tags',options:CEF_EF_REGIONAL}
  ],
  inCritical:true,
  criticalIcon:'ti-brain',
  criticalTitle:'Exame específico — Cefaleia',
  ambIcon:'ti-brain',
  ambTitle:'Exame físico específico — Cefaleia',
  onAdd(k,v){if(k==='mental'&&v==='Alerta e orientado'&&S.ef==='crit'){S.abc.ao=4;S.abc.rv=5;S.abc.rm=6;}}
 },
 hda:cefHda,
 hpp:cefHpp,
 badge:cefAlarmBadge,
 efText:cefEFText
});


// ─── Convulsão ────────────────────────────────────────────────────────────
const CV_INICIO=['Súbito sem aura','Súbito com aura','Após gatilho desencadeante identificado','Não testemunhado (achado pós-evento)'];
const CV_PADRAO=['Tônico-clônico generalizado (TCG)','Tônico isolado (rigidez)','Clônico isolado (abalos rítmicos)','Mioclônico (abalos breves)','Atônico (perda súbita de tônus)','Focal motor com preservação da consciência','Focal motor com comprometimento da consciência','Focal evoluindo para bilateral tônico-clônico','Ausência (parada comportamental breve)','Crise não convulsiva (estado confusional)'];
const CV_DUR=['< 1 minuto','1–5 minutos','> 5 minutos (status epilepticus)','Crises em salva sem recuperação intercrítica (status)','Duração desconhecida / não testemunhada'];
const CV_POS=['Recuperação imediata (< 1 min)','Sonolência / lentificação por minutos','Confusão pós-ictal prolongada (> 15 min)','Paralisia de Todd (déficit focal pós-ictal)','Afasia / disartria pós-ictal','Cefaleia pós-ictal','Vômitos pós-ictais','Agitação / agressividade pós-ictal','Persistência de RNC (não recobrou consciência)','Amnésia retrógrada do evento'];
const CV_EVENTO=['Mordedura lateral de língua','Mordedura de ponta de língua','Liberação esfincteriana (urina)','Liberação esfincteriana (fezes)','Desvio do olhar / olhar fixo durante o evento','Cianose facial durante o evento','Sialorreia / espuma oral','Versão cefálica forçada (cabeça desviada lateralmente)','Postura tônica unilateral (sinal de 4)','Vocalização ictal (grito, gemido)','Queda sem proteção (sem reação de defesa)','Trauma craniano durante a queda','Abalos breves (< 15 s) sugerindo síncope convulsiva','Palidez imediatamente antes (sugere síncope)','Recuperação imediata sem confusão (sugere síncope)'];
const CV_ALARM=['Status epilepticus (> 5 min ou sem recuperação intercrítica)','Primeira crise da vida','Primeira crise em > 40 anos','Gestação atual','Puerpério < 6 semanas','Febre associada ao evento','Sinais meníngeos / cefaleia intensa associada','TCE recente (< 7 dias)','Imunossupressão / HIV / neoplasia ativa','Anticoagulação em uso','Etilismo crônico / suspeita de abstinência alcoólica','Hipoglicemia documentada na chegada','Distúrbio hidroeletrolítico conhecido (Na, Ca, Mg)','Persistência de RNC após o evento','Déficit focal novo pós-ictal','Múltiplas crises em 24 h'];
const CV_ANTEC=['Epilepsia conhecida','Crises não-controladas (última crise < 30 dias)','Em uso de DAE (drogas antiepilépticas)','Suspeita de má adesão à DAE','Troca recente de DAE (< 30 dias)','Nível sérico de DAE recente (informar valor em campo livre)','AVC prévio','TCE prévio com sequela','Neurocirurgia prévia','Neoplasia SNC conhecida','Neurocisticercose conhecida','Etilismo crônico','Uso de cocaína / anfetaminas','Privação de sono nas últimas 24 h','Eclâmpsia prévia / pré-eclâmpsia em gestação atual','Antecedente familiar de epilepsia'];
const CV_EF_NIVEL=['Alerta e orientado (Glasgow 15)','Sonolento, despertável ao chamado (Glasgow 13–14)','Despertável apenas à dor (Glasgow 9–12)','Coma (Glasgow ≤ 8)','Estado pós-ictal ainda em curso (recuperando)','Crise ativa no momento do exame'];
const CV_EF_FOCO=['Sem déficit focal','Paralisia de Todd — hemiparesia D','Paralisia de Todd — hemiparesia E','Afasia residual','Disartria residual','Desvio conjugado do olhar','Hemianopsia','Ataxia de marcha','Hiperreflexia / Babinski ipsilateral'];
const CV_EF_MEN=['Sem sinais meníngeos','Rigidez de nuca','Kernig +','Brudzinski +','Lesão de couro cabeludo / hematoma','Ferimento de língua (mordedura lateral)','Ferimento de língua (mordedura de ponta)','Liberação esfincteriana evidente (roupa molhada/suja)','Sinais de trauma compatível com queda'];

const CV_STATUS_DUR=['> 5 minutos (status epilepticus)','Crises em salva sem recuperação intercrítica (status)'];
const CV_GRAVE_ALARM=['Status epilepticus (> 5 min ou sem recuperação intercrítica)','Persistência de RNC após o evento','Múltiplas crises em 24 h'];

function cvHasStatus(){const c=S.cv;return CV_STATUS_DUR.includes(c.dur)||c.alarm.includes('Status epilepticus (> 5 min ou sem recuperação intercrítica)');}
function cvHasGrave(){const c=S.cv;return cvHasStatus()||c.alarm.some(a=>CV_GRAVE_ALARM.includes(a));}

function cvHda(S) {
  const c = S.cv;
  if (!c.inicio && !c.padrao.length && !c.dur && !c.pos.length && !c.evento.length && !c.alarm.length) return '';
  let out = 'após episódio convulsivo';
  if (c.inicio) {
    out += ` com início ${c.inicio.toLowerCase()}`;
    if (c.inicio === 'Súbito com aura' && c.descrAura) out += ` (aura descrita como ${c.descrAura.toLowerCase()})`;
  }
  if (c.padrao.length) out += `, caracterizado por padrão motor ${joinAnd(c.padrao).toLowerCase()}`;
  if (c.dur) out += ` e duração estimada de ${c.dur.toLowerCase()}`;
  if (c.evento.length) out += `. Achados ictais presenciados: ${joinAnd(c.evento).toLowerCase()}`;
  if (c.pos.length) out += `. No período pós-ictal, cursou com ${joinAnd(c.pos).toLowerCase()}`;
  if (c.alarm.length) out += `. Sinais de alerta: ${joinAnd(c.alarm).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const alSet = (c.alarm || []).map(x => x.toLowerCase());
  if (!alSet.some(x => x.includes('status'))) unselected.push('crises subentrantes sem recuperação da consciência');
  if (!alSet.some(x => x.includes('febre'))) unselected.push('febre associada');
  if (!alSet.some(x => x.includes('tce'))) unselected.push('trauma cranioencefálico prévio ao ictus');
  if (unselected.length) out += `. Ao interrogatório, negação de ${joinAnd(unselected)}.`;

  return out;
}
function cvHpp(S){return S.cv.antec.slice();}
function cvBadge(){
 if(S.queixa!=='Convulsão')return '';
 const c=S.cv;const n=c.alarm.length;
 if(cvHasGrave())return gravBadge('grave','Convulsão de alto risco — status epilepticus / RNC persistente / crises em salva',{sublabel:cvHasStatus()?'Status epilepticus — protocolo BZD imediato':''});
 if(n===0)return gravBadge('leve','Convulsão sem sinais de alarme');
 return gravBadge('mod',`Convulsão com ${n} ${n===1?'sinal':'sinais'} de alarme`);
}
function cvEFText(S){
 if(S.ef!=='crit')return '';
 const e=S.cvEF;const parts=[];
 if(e.nivel)parts.push(`Nível de consciência no momento da avaliação: ${e.nivel.charAt(0).toLowerCase()+e.nivel.slice(1)}`);
 if(e.foco.length){
  const mapF=v=>v==='Sem déficit focal'?'sem déficits neurológicos focais residuais':v.replace('Paralisia de Todd — hemiparesia D','paralisia de Todd com hemiparesia à direita (D)').replace('Paralisia de Todd — hemiparesia E','paralisia de Todd com hemiparesia à esquerda (E)').replace(/^([A-Z])/,m=>m.toLowerCase());
  parts.push(joinAnd(e.foco.map(mapF)));
 }
 if(e.men.length){
  const menOnly=e.men.filter(x=>['Sem sinais meníngeos','Rigidez de nuca','Kernig +','Brudzinski +'].includes(x));
  const ectoOnly=e.men.filter(x=>!['Sem sinais meníngeos','Rigidez de nuca','Kernig +','Brudzinski +'].includes(x));
  if(menOnly.length){
   if(menOnly.length===1&&menOnly[0]==='Sem sinais meníngeos')parts.push('sinais de irritação meníngea ausentes (sem rigidez de nuca, manobras de Kernig e Brudzinski negativas)');
   else parts.push(`pesquisa meníngea evidenciando ${joinAnd(menOnly.filter(x=>x!=='Sem sinais meníngeos').map(x=>x==='Rigidez de nuca'?'rigidez de nuca':x==='Kernig +'?'sinal de Kernig positivo':'sinal de Brudzinski positivo'))}`);
  }
  if(ectoOnly.length){
   parts.push(`ectoscopia pós-ictal com ${joinAnd(ectoOnly.map(x=>x.toLowerCase()))}`);
  }
 }
 if(!parts.length)return '';
 const txt=parts.join('; ');
 return txt.charAt(0).toUpperCase()+txt.slice(1)+'.';
}
function cvAfter(S){
 const c=S.cv;let out='';
 if(c.inicio==='Súbito com aura')out+=`<div style="margin-top:8px"><label>Descrever aura</label><input type="text" value="${esc(c.descrAura)}" oninput="S.cv.descrAura=this.value" placeholder="Visual, olfativa, gustativa, epigástrica, déjà vu, medo súbito..."></div>`;
 out+=`<div style="margin-top:8px"><label>Tempo de início</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 2 horas, 30 min"></div>`;
 // Alertas inline — ordem: gestação > status > infecção > abstinência > metabólica > 1ª crise
 if(c.alarm.includes('Gestação atual')||c.alarm.includes('Puerpério < 6 semanas'))out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Convulsão em gestante/puérpera = eclâmpsia até prova em contrário (independente de PA). Sulfato de magnésio: ataque 4–6 g IV em 20 min, manutenção 1–2 g/h IV em BI. Antídoto: Gluconato de cálcio 1 g IV se hiporreflexia/depressão respiratória. Controle de PA se PAS ≥ 160 ou PAD ≥ 110 (Hidralazina 5 mg IV ou Labetalol). Avaliação obstétrica imediata. (ACOG 2020 / SBC 2020)</div>`;
 if(cvHasStatus())out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Status epilepticus — iniciar imediatamente: Diazepam 10 mg IV bolus (ou Midazolam 10 mg IM se sem acesso). Se persistir 5 min após 1ª dose: repetir BZD + Fenitoína 20 mg/kg IV em 20 min (ou Ácido valproico 40 mg/kg IV). Se refratário > 30 min: IOT + sedação contínua (Midazolam ou Propofol). (NEJM 2025 / BTLS-Status 2016)</div>`;
 if(c.alarm.includes('Febre associada ao evento')||c.alarm.includes('Sinais meníngeos / cefaleia intensa associada'))out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Convulsão febril em adulto — considerar meningite/encefalite (HSV) ou sepse com disfunção SNC. Iniciar empírico precoce: Ceftriaxona 2 g IV 12/12h + Vancomicina 15–20 mg/kg IV 8/8h + Ampicilina 2 g IV 4/4h (se > 50a ou imunossuprimido) + Aciclovir 10 mg/kg IV 8/8h. Coletar hemoculturas e punção lombar (após TC se déficit focal/RNC). (IDSA 2017)</div>`;
 if(c.alarm.includes('Etilismo crônico / suspeita de abstinência alcoólica'))out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Suspeita de crise por abstinência alcoólica — Diazepam 10 mg IV/VO repetível + Tiamina 100 mg IV antes de qualquer glicose. Avaliar CIWA-Ar. Evitar Fenitoína (não previne recorrência nesta etiologia). (ASAM 2020)</div>`;
 if(c.alarm.includes('Hipoglicemia documentada na chegada')||c.alarm.includes('Distúrbio hidroeletrolítico conhecido (Na, Ca, Mg)'))out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Causa metabólica suspeita — corrigir glicemia (Glicose 50% 50 mL IV se < 60), checar Na, Ca, Mg, ureia. Tiamina 100 mg IV antes de glicose se etilismo/desnutrição. Crise por hipoglicemia/DHE não responde duradouramente a BZD sem correção do distúrbio.</div>`;
 if(c.alarm.includes('Primeira crise da vida')||c.alarm.includes('Primeira crise em > 40 anos')){out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Primeira crise — solicitar TC de crânio sem contraste, glicemia, Na/K/Ca/Mg, função renal, hemograma, β-hCG (mulher em idade fértil), screening toxicológico. Considerar punção lombar se febre / cefaleia / imunossupressão. RM eletiva ambulatorial. (ILAE 2014 / ACEP 2014)</div>`;if(c.alarm.includes('Imunossupressão / HIV / neoplasia ativa')||c.alarm.includes('Anticoagulação em uso'))out+=`<div class="abox aw" style="margin-top:6px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Imunossupressão/anticoagulação — TC + punção lombar de alta prioridade.</div>`;}
 out+=cvBadge();
 return out;
}

registerQx('Convulsão',{
 anamnese:{
  sigla:'cv',
  blocks:[
   {key:'inicio',label:'Início e aura',type:'radio',options:CV_INICIO,autoOpenNext:'padrao'},
   {key:'padrao',label:'Padrão motor',type:'tags',options:CV_PADRAO,autoOpenNext:'dur'},
   {key:'dur',label:'Duração do evento',type:'radio',options:CV_DUR,autoOpenNext:'pos'},
   {key:'pos',label:'Pós-ictal',type:'tags',options:CV_POS,autoOpenNext:'evento'},
   {key:'evento',label:'Eventos associados',type:'tags',options:CV_EVENTO,autoOpenNext:'alarm'},
   {key:'alarm',label:'Sinais de alarme',type:'tags',options:CV_ALARM,autoOpenNext:'antec'},
   {key:'antec',label:'Antecedentes específicos',type:'tags',options:CV_ANTEC}
  ],
  after:cvAfter,
  onAdd(k,v){if(k==='inicio'&&v!=='Súbito com aura')S.cv.descrAura='';}
 },
 ef:{
  sigla:'cvEF',
  showIn:['crit'],
  critIcon:'ti-brain',
  critTitle:'Exame específico — Convulsão',
  ambIcon:'ti-brain',
  ambTitle:'Exame específico — Convulsão',
  blocks:[
   {key:'nivel',label:'Nível de consciência atual',type:'radio',options:CV_EF_NIVEL,autoOpenNext:'foco'},
   {key:'foco',label:'Déficit focal residual',type:'tags',options:CV_EF_FOCO,autoOpenNext:'men'},
   {key:'men',label:'Sinais meníngeos e cabeça',type:'tags',options:CV_EF_MEN}
  ],
  onAdd(k,v){if(k==='nivel'&&v==='Alerta e orientado (Glasgow 15)'&&S.ef==='crit'){S.abc.ao=4;S.abc.rv=5;S.abc.rm=6;}}
 },
 hda:cvHda,
 hpp:cvHpp,
 badge:cvBadge,
 efText:cvEFText
});


// ─── Déficit neurológico agudo ─────────────────────────────────────────────
const NEU_UVVB=['Horário de UVVB exato e testemunhado','Wake-up stroke (UVVB antes de dormir)','UVVB indeterminada / sem testemunhas'];
const NEU_JANELA=['Janela < 4,5h (candidato à trombólise IV)','Janela 4,5 a 24h (avaliar trombectomia mecânica)','Janela > 24h ou fora de janela'];
const NEU_MOTOR=['Hemiparesia proporcional (F=B=P)','Hemiparesia desproporcional braquiofacial','Hemiparesia crural isolada','Monoparesia','Hemi-hipoestesia tátil/dolorosa proporcional','Hemi-hipoestesia desproporcional','Tetraparesia / paraparesia aguda'];
const NEU_LADO=['Déficit em dimídio direito (hemisfério E)','Déficit em dimídio esquerdo (hemisfério D)','Bilateral / Tronco encefálico'];
const NEU_LING=['Afasia motora (Broca / expressão)','Afasia sensitiva (Wernicke / compreensão)','Afasia global','Disartria pura','Desvio de rima labial central','Hemianopsia homônima','Desvio conjugado do olhar'];
const NEU_FOSSA=['Ataxia de marcha / apendicular','Vertigem central aguda','Diplopia aguda','Disfagia aguda','Nistagmo central / vertical','Síndrome de Horner'];
const NEU_MIMICS=['Glicemia capilar normal no ictus (descarta hipoglicemia)','Crise epiléptica associada no início (mimic vs crise sintomática)','Cefaleia súbita intensa precedendo o déficit (sugere HSA / AVCh)','Rebaixamento agudo de consciência associado'];
const NEU_ANTICOAG=['Nega uso de anticoagulantes','Varfarina / Marevan em uso','DOAC em uso (Apixabana, Rivaroxabana, Dabigatrana)','Uso de heparina nas últimas 24h','AVC isquêmico ou TCE grave < 3 meses','Cirurgia de grande porte < 14 dias','Sangramento ativo gastrointestinal'];

function neuHda(S) {
  const n = S.neu;
  if (!n.tipoUvvb && !n.tempoUvvb && !n.janela && !n.motor.length && !n.lado && !n.linguagem.length && !n.fossa.length && !n.mimics.length && !n.anticoag.length) return '';
  let out = 'apresentando déficit neurológico focal agudo';
  if (n.tipoUvvb === 'UVVB indeterminada / sem testemunhas') {
    out += ` de início não testemunhado (última vez visto bem indeterminada)`;
  } else if (n.tipoUvvb === 'Horário de UVVB exato e testemunhado') {
    out += `, com ictus presenciado e horário exato estabelecido${n.tempoUvvb ? ' há ' + n.tempoUvvb : ''}`;
  } else if (n.tipoUvvb === 'Wake-up stroke (UVVB antes de dormir)') {
    out = `com quadro sugestivo de wake-up stroke (dormiu assintomático)${n.tempoUvvb ? ' há ' + n.tempoUvvb : ''}`;
  } else if (n.tempoUvvb) {
    out += `, com última vez visto bem há ${n.tempoUvvb}`;
  }
  if (n.janela) out += `. Encontra-se em ${n.janela.toLowerCase()}`;
  if (n.lado) out += `. Topografia clínica compatível com acometimento do ${n.lado.toLowerCase()}`;
  if (n.motor.length) out += `, cursando com ${joinAnd(n.motor).toLowerCase()}`;
  if (n.linguagem.length) out += ` e ${joinAnd(n.linguagem).toLowerCase()}`;
  if (n.fossa.length) out += `. Sinais de fossa posterior ou tronco: ${joinAnd(n.fossa).toLowerCase()}`;
  if (n.mimics.length) out += `. Diferenciais e mimics checados: ${joinAnd(n.mimics).toLowerCase()}`;
  if (n.anticoag.length) out += `. Status de anticoagulação e risco hemorrágico: ${joinAnd(n.anticoag).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const mimSet = (n.mimics || []).map(x => x.toLowerCase());
  if (!mimSet.includes('crise epiléptica associada no início (mimic vs crise sintomática)')) unselected.push('crise convulsiva no ictus');
  if (!mimSet.includes('cefaleia súbita intensa precedendo o déficit (sugere hsa / avch)')) unselected.push('cefaleia súbita em trovoada');
  unselected.push('trauma cranioencefálico recente');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de ${joinAnd(unselected)}.`;

  if (S.nihss && S.nihss.evaluated) {
    const nSc = nihssSc();
    out += ` Escore NIHSS na admissão: ${nSc} pontos${nihssBreakdown()} (${nihssInterp(nSc)}).`;
  }
  return out;
}

function neuAfter(S){
 const n=S.neu;let out='';
 if(n.janela==='Janela < 4,5h (candidato à trombólise IV)'){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>PROTOCOLO AVC HIPERAGUDO ATIVADO (UVVB < 4,5h)</strong> — TC crânio sem contraste imediata + AngioTC arterial. Acesso venoso calibroso (evitar punções arteriais/centrais). PA alvo para trombólise: manter &lt; 185/110 mmHg. Avaliar trombólise IV com Alteplase 0,9 mg/kg (máx 90 mg) ou Tenecteplase 0,25 mg/kg. Notificar equipe de neurologia / stroke team imediatamente.</div>`;
 } else if(n.tipoUvvb==='Wake-up stroke (UVVB antes de dormir)'||n.janela==='Janela 4,5 a 24h (avaliar trombectomia mecânica)'){
  out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> <strong>JANELA ESTENDIDA / WAKE-UP STROKE</strong> — Indicação de imagem multimodal avançada (TC + AngioTC + Perfusão / RM com mismatch DWI-FLAIR) para seleção de trombólise ou trombectomia mecânica (Critérios DAWN / DEFUSE-3 / WAKE-UP).</div>`;
 }
 const nSc=nihssSc();
 const nBk=nihssBreakdown();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_nihss')"><span style="font-weight:500"><i class="ti ti-calculator"></i> Escore NIHSS (National Institutes of Health Stroke Scale)</span><span class="sb ${nihssBadgeClass(nSc)}">${nSc}/42 pts${nBk}</span></div><div class="sbd ${isCardOpen('sc_nihss',true)?'open':''}" id="sc_nihss">${rNihss()}<div class="sres"><div class="snum">${nSc}<span style="font-size:13px;color:var(--color-text-secondary)">/42 pts</span>${nBk}</div><div style="font-size:13px">${nihssInterp(nSc)}</div></div></div></div>`;
 return out;
}

registerQx('Déficit neurológico agudo',{
 anamnese:{
  sigla:'neu',
  blocks:[
   {key:'tipoUvvb',label:'UVVB — Última Vez Visto Bem (Ictus)',type:'radio',options:NEU_UVVB,autoOpenNext:'janela',extra:S=>`<div style="margin-top:8px"><label>Horário exato ou tempo estimado da UVVB</label><input type="text" value="${esc(S.neu.tempoUvvb||'')}" oninput="S.neu.tempoUvvb=this.value" placeholder="Ex: há 1h30min, ou visto bem às 14:30h"></div>`},
   {key:'janela',label:'Janela Terapêutica',type:'radio',options:NEU_JANELA,autoOpenNext:'motor'},
   {key:'motor',label:'Padrão do Déficit Motor e Sensitivo',type:'tags',options:NEU_MOTOR,autoOpenNext:'lado'},
   {key:'lado',label:'Hemisfério / Lado Acometido',type:'radio',options:NEU_LADO,autoOpenNext:'linguagem'},
   {key:'linguagem',label:'Linguagem e Pares Cranianos',type:'tags',options:NEU_LING,autoOpenNext:'fossa'},
   {key:'fossa',label:'Fossa Posterior e Sinais Cerebelares',type:'tags',options:NEU_FOSSA,autoOpenNext:'mimics'},
   {key:'mimics',label:'Fatores Sugestivos de Diferenciais & Mimics',type:'tags',options:NEU_MIMICS,autoOpenNext:'anticoag'},
   {key:'anticoag',label:'Anticoagulação e Contraindicações',type:'tags',options:NEU_ANTICOAG}
  ],
  after:neuAfter
 },
 hda:neuHda
});


// ─── Rebaixamento de consciência ───────────────────────────────────────────
const RNC_INST=['Hiperaguda / súbita (< 1 hora)','Aguda (1 a 12 horas)','Subaguda / progressiva (dias)','Flutuante / oscilante (delirium)'];
const RNC_CTX=['Trauma cranioencefálico recente (mesmo leve / queda da própria altura)','Acesso ou ingestão de medicamentos / sedativos / opioides','Tentativa de autoextermínio presumida','Uso recente de drogas ilícitas / abuso de álcool','Febre recente ou foco infeccioso evidente','Diabetes em uso de insulina / hipoglicemiante oral','Insuficiência hepática / cirrose conhecida','Insuficiência renal dialítica / uremia','Epilepsia conhecida / pós-ictal prolongado'];
const RNC_SINAIS=['Crise convulsiva inicial relatada','Cefaleia súbita e intensa precedendo o coma','Vômitos precedendo o rebaixamento','Rigidez de nuca / sinais meníngeos','Anisocoria pupilar / midríase fixa unilateral','Movimentos anormais / tremores / mioclonias / asterixe','Respiração ruidosa / roncos com queda de língua'];
const RNC_FUNC=['Totalmente independente prévio (atividades normais da vida diária)','Independente parcial / declínio cognitivo leve prévio','Demência moderada a avançada / restrito ao leito','Sequela neurológica motora prévia de AVC'];

function rncHda(S) {
  const r = S.rncQ;
  if (!r.instalacao && !r.contexto.length && !r.sinais.length && !r.funcional) return '';
  let out = 'cursando com rebaixamento do nível de consciência';
  if (r.instalacao) out += ` de instalação ${r.instalacao.toLowerCase()}`;
  if (r.contexto.length) out += `. Contexto clínico de ${joinAnd(r.contexto).toLowerCase()}`;
  if (r.sinais.length) out += `. Ao exame e anamnese dirigida, constatam-se ${joinAnd(r.sinais).toLowerCase()}`;
  if (r.funcional) out += `. Nível funcional prévio relatado: ${r.funcional.toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const sSet = (r.sinais || []).map(x => x.toLowerCase());
  const cSet = (r.contexto || []).map(x => x.toLowerCase());
  if (!sSet.some(x => x.includes('crise'))) unselected.push('crises convulsivas presenciadas');
  if (!cSet.some(x => x.includes('trauma'))) unselected.push('trauma cranioencefálico prévio conhecido');
  if (unselected.length) out += `. Negação de ${joinAnd(unselected)}.`;

  return out;
}

function rncAfter(S){
 const r=S.rncQ;let out='';
 if(r.contexto.includes('Trauma cranioencefálico recente (mesmo leve / queda da própria altura)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>HISTÓRIA DE TCE RECENTE EM PACIENTE COM RNC</strong> — TC de crânio sem contraste mandatória urgente para descartar hematoma subdural / epidural ou contusão hemorrágica.</div>`;
 }
 if(r.sinais.includes('Anisocoria pupilar / midríase fixa unilateral')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ANISOCORIA / SINAIS DE HÉRNIA UNCAL</strong> — Emergência neurocirúrgica imediata! Elevação de cabeceira a 30°, hiperventilação leve transitória e osmoterapia (Salina 3% ou Manitol) enquanto aguarda TC e avaliação neurocirúrgica.</div>`;
 }
 return out;
}

registerQx('Rebaixamento de consciência',{
 anamnese:{
  sigla:'rncQ',
  blocks:[
   {key:'instalacao',label:'Velocidade de Instalação e Duração',type:'radio',options:RNC_INST,autoOpenNext:'contexto'},
   {key:'contexto',label:'Contexto e Fatores Precipitantes',type:'tags',options:RNC_CTX,autoOpenNext:'sinais'},
   {key:'sinais',label:'Sinais Acompanhantes e Exame Imediato',type:'tags',options:RNC_SINAIS,autoOpenNext:'funcional'},
   {key:'funcional',label:'Nível Funcional Pré-Mórbido',type:'radio',options:RNC_FUNC}
  ],
  after:rncAfter
 },
 hda:rncHda
});


// ─── Vertigem ──────────────────────────────────────────────────────────────
const VER_TIPO=['Vertigem rotatória verdadeira (sensação nítida de ambiente ou corpo rodando)','Desequilíbrio puro da marcha sem rotação','Sensação pré-sincopal de desmaio / escurecimento visual ao ortostatismo','Tontura inespecífica / flutuação'];
const VER_DURACAO=['Crises curtas em segundos desencadeadas por movimentação cefálica (padrão VPPB)','Crises recorrentes de horas associadas a hipoacusia/zumbido (Ménière)','Quadro contínuo incapacitante há horas/dias com náusea intensa (neurite vs AVC cerebelar)'];
const VER_REDFLAGS=['Ataxia de tronco severa (incapaz de sentar-se ou deambular sem apoio)','Diplopia aguda','Disartria / fala arrastada','Disfagia aguda','Assimetria facial / paresia de hemiface','Cefaleia occipital súbita intensa','Ausência de déficits neurológicos focais de fossa posterior'];
const VER_AUDITIVO=['Hipoacusia unilateral súbita associada','Plenitude auricular / zumbido intenso','Náuseas e vômitos repetidos incapacitantes','Sem queixas auditivas'];

function verHda(S) {
  const v = S.ver;
  if (!v.tipo && !v.duracao && !v.redflags.length && !v.auditivo.length) return '';
  let out = 'com queixa de tontura / vertigem';
  if (v.tipo) out += ` ${v.tipo.toLowerCase()}`;
  if (v.duracao) out += `, com temporalidade ${v.duracao.toLowerCase()}`;
  if (v.redflags.length) out += `. Rastreio de sinais de alarme centrais (tronco/cerebelo): ${joinAnd(v.redflags).toLowerCase()}`;
  if (v.auditivo.length) out += `. Repercussões neurovegetativas e auditivas: ${joinAnd(v.auditivo).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const rfSet = (v.redflags || []).map(x => x.toLowerCase());
  if (!rfSet.some(x => x.includes('ataxia'))) unselected.push('ataxia severa de tronco');
  if (!rfSet.some(x => x.includes('diplopia'))) unselected.push('diplopia aguda');
  if (!rfSet.some(x => x.includes('disartria'))) unselected.push('disartria');
  if (unselected.length) out += `. Ao rastreio de alarme, ausência de ${joinAnd(unselected)}.`;

  return out;
}
function verAfter(S){
 const v=S.ver;let out='';
 if(v.redflags.some(r=>!r.includes('Ausência'))){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE FOSSA POSTERIOR / AVC CEREBELAR OU DE TRONCO</strong> — Sinais de alarme centrais presentes. Realizar protocolo HINTS beira-leito ou Neuroimagem urgente (TC de crânio com angio arterial / Ressonância com Difusão). Não liberar o paciente sem descartar evento isquêmico/hemorrágico de fossa posterior.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de início da vertigem</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 2 horas, 1 dia"></div>`;
 return out;
}

registerQx('Vertigem',{
 anamnese:{
  sigla:'ver',
  blocks:[
   {key:'tipo',label:'Caracterização da Tontura',type:'radio',options:VER_TIPO,autoOpenNext:'duracao'},
   {key:'duracao',label:'Temporalidade e Desencadeantes',type:'radio',options:VER_DURACAO,autoOpenNext:'redflags'},
   {key:'redflags',label:'Sinais de Alarme de Tronco / Cerebelo (Fossa Posterior)',type:'tags',options:VER_REDFLAGS,autoOpenNext:'auditivo'},
   {key:'auditivo',label:'Sintomas Auditivos e Neurovegetativos',type:'tags',options:VER_AUDITIVO}
  ],
  after:verAfter
 },
 hda:verHda
});

