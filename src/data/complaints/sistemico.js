/* ─── Queixas Sistêmicas & Osteomusculares ─── */
// ─── Febre ─────────────────────────────────────────────────────────────────
const FEB_AFER=['Febre aferida por termômetro no domicílio','Sensação febril referida (sem aferição termométrica)'];
const FEB_PADRAO=['Diária contínua','Intermitente com calafrios trepidantes','Vespertina com sudorese profusa','Picos febris esporádicos'];
const FEB_FOCO=['Queixas respiratórias associadas','Queixas urinárias ou lombares associadas','Queixas gastrointestinais associadas','Alterações de pele e partes moles','Cefaleia intensa ou sinais meníngeos','Sem foco infeccioso evidente pela anamnese inicial'];
const FEB_ALARME=['Prostração intensa desproporcional','Confusão mental / sonolência nova','Extremidades frias / livedo reticular','Redução importante do volume urinário (oligúria)','Surgimento de petéquias / lesões purpúricas cutâneas','Sem sinais de gravidade / alerta sistêmico no momento'];
const FEB_RISCO=['Imunossupressão / quimioterapia recente / corticoterapia','Diabetes descompensado','Uso recente de antibióticos nas últimas semanas','Viagem recente para área endêmica de arboviroses / malária','Portador de cateter venoso central ou prótese valvar/ortopédica'];

function febHda(S) {
  const f = S.feb;
  if (!f.afericao && !f.padrao && !f.foco.length && !f.alarme.length && !f.risco.length) return '';
  let out = 'com relato de estado febril';
  if (f.afericao) out += ` (${f.afericao.toLowerCase()}${f.pico ? ', pico de ' + f.pico + ' °C' : ''})`;
  if (f.padrao) out += `, de padrão ${f.padrao.toLowerCase()}`;
  if (f.foco.length) out += `. Rastreio de foco infeccioso aponta ${joinAnd(f.foco).toLowerCase()}`;
  if (f.alarme.length) out += `. Sinais de alarme sistêmico: ${joinAnd(f.alarme).toLowerCase()}`;
  if (f.risco.length) out += `. Histórico e fatores de risco: ${joinAnd(f.risco).toLowerCase()}`;
  
  // Negações ativas
  const unselected = [];
  const alSet = (f.alarme || []).map(x => x.toLowerCase());
  if (!alSet.some(x => x.includes('prostração'))) unselected.push('prostração intensa');
  if (!alSet.some(x => x.includes('confusão') || x.includes('sonolência'))) unselected.push('rebaixamento de consciência ou confusão aguda');
  if (!alSet.some(x => x.includes('petéquias') || x.includes('purpúricas'))) unselected.push('lesões purpúricas ou petéquias');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de ${joinAnd(unselected)}.`;

  if (S.mascc && S.mascc.evaluated) {
    const mSc = masccSc();
    out += ` Escore MASCC: ${mSc}/26 pts (${masccInterp(mSc)}).`;
  }
  return out;
}
function febAfter(S){
 const f=S.feb;let out='';
 if(f.risco.includes('Imunossupressão / quimioterapia recente / corticoterapia')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE SUSPEITA DE NEUTROPENIA FEBRIL</strong> — Emergência oncológica! Coleta imediata de 2 pares de hemoculturas e início de antibioticoterapia antipseudomonas venosa empírica (Cefepima ou Piperacilina-Tazobactam) em menos de 60 minutos (Golden Hour).</div>`;
 }
 if(f.foco.some(x=>x.includes('Neurológico')||x.includes('meníngeos'))){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>SUSPEITA DE MENINGOENCEFALITE AGUDA</strong> — Coleta rápida de líquor (após descartar HIC/massa expansiva se sinais focais) + início imediato de Ceftriaxona 2g IV + Ampicilina (se idoso/imunossuprimido) + Dexametasona prévia/concomitante. Não atrasar ATB para exames de imagem.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Pico térmico aferido (°C)</label><input type="text" value="${esc(S.feb.pico||'')}" oninput="S.feb.pico=this.value" placeholder="Ex: 38.8, 39.5"></div>`;
 out+=`<div style="margin-top:8px"><label>Tempo de duração da febre</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 2 dias, há 5 dias"></div>`;
 const mSc=masccSc();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_mascc')"><span style="font-weight:500"><i class="ti ti-shield-half"></i> Escore MASCC (Risco em Neutropenia Febril)</span><span class="sb ${masccBadgeClass(mSc)}">${mSc}/26 pts</span></div><div class="sbd ${isCardOpen('sc_mascc',true)?'open':''}" id="sc_mascc">${rMascc()}<div class="sres"><div class="snum">${mSc}<span style="font-size:13px;color:var(--color-text-secondary)">/26 pts</span></div><div style="font-size:13px">${masccInterp(mSc)}</div></div></div></div>`;
 return out;
}

registerQx('Febre',{
 anamnese:{
  sigla:'feb',
  blocks:[
   {key:'afericao',label:'Aferição da Temperatura',type:'radio',options:FEB_AFER,autoOpenNext:'padrao'},
   {key:'padrao',label:'Padrão da Febre',type:'radio',options:FEB_PADRAO,autoOpenNext:'foco'},
   {key:'foco',label:'Rastreio de Foco Infeccioso Inicial',type:'tags',options:FEB_FOCO,autoOpenNext:'alarme'},
   {key:'alarme',label:'Sinais de Alarme Sistêmico e Sepse',type:'tags',options:FEB_ALARME,autoOpenNext:'risco'},
   {key:'risco',label:'Fatores de Risco e Epidemiologia',type:'tags',options:FEB_RISCO}
  ],
  after:febAfter
 },
 hda:febHda
});


// ─── Dor lombar ────────────────────────────────────────────────────────────
const LOM_CARAC=['Em cólica paroxística unilateral irradiando para fossa ilíaca/genitália (padrão calculoso)','Dor mecânica postural com piora aos movimentos e melhora ao repouso no leito','Dor súbita intensa em dorso/flanco sem relação com movimento (alerta de dissecção/AAA)','Dor inflamatória contínua com rigidez matinal e piora noturna'];
const LOM_CAUDA=['Anestesia em sela (perda de sensibilidade perineal/anal)','Perda de controle de esfíncteres (incontinência fecal ou retenção urinária súbita)','Fraqueza motora aguda em membros inferiores (déficit de dorsiflexão / pé caído)','Ausência de déficits neurológicos ou esfincterianos (nega sinais de Cauda Equina)'];
const LOM_ALARME=['Febre associada com calafrios (suspeita de pielonefrite/espondilodiscite)','Hematúria macroscópica ou disúria concomitante','Histórico de neoplasia prévia conhecida','Uso crônico de corticoide ou imunossupressão','Antecedente de trauma lombar recente'];

function lomHda(S) {
  const l = S.lom;
  if (!l.carac.length && !l.caudaEquina.length && !l.alarme.length) return '';
  let out = 'caracterizada por dor lombar';
  if (l.carac.length) out += ` com padrão de ${joinAnd(l.carac).toLowerCase()}`;
  if (l.caudaEquina.length) out += `. Rastreio de cauda equina: ${joinAnd(l.caudaEquina).toLowerCase()}`;
  if (l.alarme.length) out += `. Sinais de alerta sistêmicos: ${joinAnd(l.alarme).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const ceSet = (l.caudaEquina || []).map(x => x.toLowerCase());
  if (!ceSet.some(x => x.includes('sela'))) unselected.push('anestesia em sela');
  if (!ceSet.some(x => x.includes('esfíncteres') || x.includes('incontinência') || x.includes('retenção'))) unselected.push('perda de controle esfincteriano');
  if (!ceSet.some(x => x.includes('fraqueza') || x.includes('pé caído'))) unselected.push('fraqueza motora aguda em membros inferiores');
  if (unselected.length) out += `. Ao rastreio neurológico direcionado, ausência de ${joinAnd(unselected)}.`;

  return out;
}
function lomAfter(S){
 const l=S.lom;let out='';
 if(l.caudaEquina.includes('Anestesia em sela (perda de sensibilidade perineal/anal)')||l.caudaEquina.includes('Perda de controle de esfíncteres (incontinência fecal ou retenção urinária súbita)')||l.caudaEquina.includes('Fraqueza motora aguda em membros inferiores (déficit de dorsiflexão / pé caído)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA CRÍTICO: SUSPEITA DE SÍNDROME DA CAUDA EQUINA</strong> — Emergência neurocirúrgica! Solicitar Ressonância Magnética de coluna lombo-sacra em caráter de urgência imediata. Avaliação neurocirúrgica em menos de 24–48h para prevenir sequela neurológica irreversível.</div>`;
 }
 if(l.carac.includes('Dor súbita intensa em dorso/flanco sem relação com movimento (alerta de dissecção/AAA)')){
  out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> <strong>DOR SÚBITA INTENSA EM DORSO / FLANCO</strong> — Considerar rotura/expansão de Aneurisma de Aorta Abdominal (AAA) ou dissecção aórtica em pacientes > 50 anos ou hipertensos. POCUS aórtico / AngioTC abdominal imediata.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de início da dor</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 3 horas, 2 dias"></div>`;
 return out;
}

registerQx('Dor lombar',{
 anamnese:{
  sigla:'lom',
  blocks:[
   {key:'carac',label:'Características e Padrão da Dor',type:'tags',options:LOM_CARAC,autoOpenNext:'caudaEquina'},
   {key:'caudaEquina',label:'Rastreio de Síndrome da Cauda Equina (Red Flags Neurológicos)',type:'tags',options:LOM_CAUDA,autoOpenNext:'alarme'},
   {key:'alarme',label:'Sinais de Alarme Infeccioso, Malignidade e Urológico',type:'tags',options:LOM_ALARME}
  ],
  after:lomAfter
 },
 hda:lomHda
});


// ─── Edema / Dor em MMII ───────────────────────────────────────────────────
const EDM_LAT=['Membro inferior direito (MID)','Membro inferior esquerdo (MIE)','Ambos os membros inferiores'];
const EDM_EXT=['Restrito ao pé e tornozelo (infragenicular distal)','Até o terço médio da perna / panturrilha (infragenicular)','Estendendo-se até o joelho','Acometendo todo o membro inferior até a raiz da coxa'];
const EDM_LOCAIS=['Dor espontânea ou à palpação da panturrilha','Aumento de volume (edema) perceptível','Sensação de peso, tensão ou empastamento muscular','Calor local e eritema cutâneo','Edema depressível (sinal do cacifo / Godet)','Cordão venoso superficial palpável e doloroso'];
const EDM_SIST=['Dispneia de início recente ou progressiva','Dor torácica ventilatório-dependente (pleurítica)','Tosse seca ou hemoptoica','Febre ou calafrios associados','Ortopneia ou dispneia paroxística noturna','Ausência de sintomas respiratórios ou sistêmicos'];
const EDM_WELLS=['Cirurgia recente ou imobilização prolongada nas últimas 12 semanas','Viagem prolongada recente (> 4 horas)','Neoplasia ativa ou em tratamento nos últimos 6 meses','Histórico pessoal prévio de TVP ou TEP','Uso de terapia hormonal ou anticoncepcional oral','Trauma recente no membro acometido','Sem fatores de risco conhecidos para TEV'];

function edmHda(S) {
  const e = S.edm;
  const loc = (e.locais && e.locais.length) ? e.locais : (e.flogose || []);
  const sis = (e.sist && e.sist.length) ? e.sist : (e.toracicos || []);
  if (!e.lat && !e.ext && !loc.length && !e.wells.length && !sis.length) return '';
  let out = 'com quadro de edema e dor em membros inferiores';
  if (e.lat) out += `, acometendo ${e.lat.toLowerCase().replace('(mid)','(MID)').replace('(mie)','(MIE)')}`;
  if (e.ext) out += `, com extensão ${e.ext.toLowerCase()}`;
  if (loc.length) out += `. Achados locais: ${joinAnd(loc).toLowerCase()}`;
  if (sis.length) out += `. Manifestações sistêmicas e respiratórias: ${joinAnd(sis).toLowerCase()}`;
  if (e.wells.length) out += `. Fatores de risco para tromboembolismo venoso: ${joinAnd(e.wells).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const trSet = sis.map(x => x.toLowerCase());
  if (!trSet.some(x => x.includes('dispneia'))) unselected.push('dispneia');
  if (!trSet.some(x => x.includes('dor torácica'))) unselected.push('dor torácica pleurítica');
  if (!trSet.some(x => x.includes('hemoptoica'))) unselected.push('hemoptise');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de sintomas de TEP como ${joinAnd(unselected)}.`;

  if (S.wellsTvp && S.wellsTvp.evaluated) {
    const wSc = wellsTvpSc();
    out += ` Escore de Wells para TVP: ${wSc} pts (${wellsTvpInterp(wSc)}).`;
  }
  return out;
}
function edmAfter(S){
 const e=S.edm;let out='';
 const loc=(e.locais&&e.locais.length)?e.locais:(e.flogose||[]);
 if((e.lat.includes('direito')||e.lat.includes('esquerdo')) && (e.wells.some(w=>!w.includes('Sem fatores')) || loc.some(l=>l.includes('panturrilha')||l.includes('empastamento')))){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE SUSPEITA DE TROMBOSE VENOSA PROFUNDA (TVP)</strong> — Solicitar Ultrassonografia Doppler venosa de membros inferiores de urgência ou D-Dímero conforme escore de probabilidade de Wells. Se sintomas torácicos associados, investigar TEP imediatamente (AngioTC de tórax).</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de evolução do edema / dor</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 3 dias, há 1 semana"></div>`;
 const wSc=wellsTvpSc();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_wells_tvp')"><span style="font-weight:500"><i class="ti ti-calculator"></i> Escore de Wells para TVP (Trombose Venosa Profunda)</span><span class="sb ${wellsTvpBadgeClass(wSc)}">${wSc} pts</span></div><div class="sbd ${isCardOpen('sc_wells_tvp',true)?'open':''}" id="sc_wells_tvp">${rWellsTvp()}<div class="sres"><div class="snum">${wSc}<span style="font-size:13px;color:var(--color-text-secondary)"> pts</span></div><div style="font-size:13px">${wellsTvpInterp(wSc)}</div></div></div></div>`;
 return out;
}

registerQx('Edema / Dor em MMII',{
 anamnese:{
  sigla:'edm',
  blocks:[
   {key:'lat',label:'Lateralidade',type:'radio',options:EDM_LAT,autoOpenNext:'ext'},
   {key:'ext',label:'Extensão e Nível Anatômico',type:'radio',options:EDM_EXT,autoOpenNext:'locais'},
   {key:'locais',label:'Características Locais e Sinais Inflamatórios',type:'tags',options:EDM_LOCAIS,autoOpenNext:'sist'},
   {key:'sist',label:'Sintomas Associados Sistêmicos e Respiratórios',type:'tags',options:EDM_SIST,autoOpenNext:'wells'},
   {key:'wells',label:'Fatores de Risco para TEV',type:'tags',options:EDM_WELLS}
  ],
  after:edmAfter
 },
 hda:edmHda
});
