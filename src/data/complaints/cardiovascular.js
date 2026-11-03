/* ─── Queixas Cardiovasculares ─── */
// ─── Síncope ───────────────────────────────────────────────────────────────
const SINC_EVENTO=[
 'Relato de perda de consciência súbita sem pródromos, com queda abrupta',
 'Turvação ou escurecimento visual progressivo associado a perda de tônus postural',
 'Sensação progressiva de tontura, cabeça vazia e fraqueza difusa antes da perda de consciência',
 'Quase-síncope / lipotimia (turvação visual e redução do tônus postural sem perda completa da consciência)',
 'Perda transitória da consciência não testemunhada (encontrado ao solo com amnésia do evento)'
];
const SINC_PROD=[
 'Ausentes (instalação súbita)',
 'Diaforese fria, náuseas e palidez cutânea (pródromos autonômicos)',
 'Turvação ou escurecimento visual premonitório',
 'Palpitações precedendo o evento',
 'Dor torácica precedente',
 'Cefaleia súbita precedente',
 'Aura epiléptica'
];
const SINC_POST=['Em pé','Sentado','Deitado / supina','Durante esforço','Pós-esforço imediato'];
const SINC_GAT=['Ortostase (ao levantar)','Micção','Defecação','Tosse / Valsalva','Dor / estímulo doloroso','Calor / ambiente fechado','Emoção intensa / visão de sangue','Esforço físico'];
const SINC_CAR=['Queda sem proteção (sem reação de defesa)','Mordedura lateral de língua','Liberação esfincteriana (urina/fezes)','Abalos musculares breves (< 15 s)','Cianose facial durante o evento','Olhos abertos e desviados'];
const SINC_REC=['Imediata (< 30 s)','Lenta (30 s – 5 min)','Confusão pós-ictal (> 5 min)','Não recuperou / ainda inconsciente'];
const SINC_ALAR=['Durante esforço físico','Em posição supina / deitado','Palpitação imediatamente antes','Morte súbita familiar (< 50 anos)','Cardiopatia estrutural conhecida','Sem pródromos (queda abrupta)','Mais de 1 episódio no último mês','> 65 anos com comorbidades'];
const SINC_ANTE=['Cardiopatia estrutural (ICC, miocardiopatia, valvopatia)','Arritmia documentada','DAC / IAM prévio','Síndrome de Brugada','Síncope ou MCE familiar','QT longo congênito ou adquirido','Marca-passo / CDI implantado','Anti-hipertensivos / diuréticos em uso','Antiarrítmicos em uso','Síncopes prévias recorrentes'];
const SINC_EF_ORTO=['Normal (queda PA < 20/10 mmHg)','Hipotensão ortostática (queda ≥ 20/10 mmHg)','Não realizado / paciente acamado'];
const SINC_EF_SOP=['Sopro sistólico (EAo suspeito)','Sopro diastólico','Sopro em regurgitação mitral','Ausência de sopros','B3 / B4 audível'];
const SINC_EF_NF=['Sem déficit focal','Hemiparesia','Afasia','Nistagmo','Disartria','Ataxia de marcha'];

// Builders — Síncope
function sincCalgarySc(){
 const a=S.sinc.alar;
 const highRisk=['Durante esforço físico','Em posição supina / deitado','Palpitação imediatamente antes','Morte súbita familiar (< 50 anos)','Cardiopatia estrutural conhecida'];
 return a.filter(x=>highRisk.includes(x)).length;
}
function sincBadge(){
 if(S.queixa!=='Síncope')return '';
 const sc=sincCalgarySc();
 if(sc===0)return gravBadge('leve','Sem critérios Calgary de alto risco');
 return gravBadge('grave',`Síncope de alto risco — ${sc} critério${sc>1?'s':''} Calgary (ECG urgente + monitorização)`);
}

function calcCalgaryScore(){
 const c=S.sincCalgary||{};
 let sc=0;
 if(c.bivent)sc-=2;
 if(c.palp)sc-=1;
 if(c.esforco)sc-=1;
 if(c.supina)sc-=2;
 if(c.prod)sc+=2;
 if(c.orto)sc+=1;
 if(c.situac)sc+=1;
 return sc;
}
function calgaryInterp(){
 const sc=calcCalgaryScore();
 if(sc>=-2)return 'Escore ≥ −2: Provável causa vasovagal / reflexa (baixo risco cardiogênico)';
 return 'Escore < −2: Alto risco cardiogênico — indicação de investigação arritmogênica/estrutural';
}
function calgaryBadgeClass(){return calcCalgaryScore()>=-2?'sok':'sgr';}
function rCalgary(){
 const c=S.sincCalgary||{};
 const items=[
  {k:'bivent',l:'Cardiopatia estrutural, ICC ou ECG anormal?',d:'−2 pts'},
  {k:'palp',l:'Palpitações precedendo imediatamente a síncope?',d:'−1 pt'},
  {k:'esforco',l:'Síncope durante esforço físico?',d:'−1 pt'},
  {k:'supina',l:'Síncope em decúbito dorsal / deitado?',d:'−2 pts'},
  {k:'prod',l:'Pródromos autonômicos (sudorese, calor, náusea)?',d:'+2 pts'},
  {k:'orto',l:'Desencadeada por ortostase prolongada ou calor?',d:'+1 pt'},
  {k:'situac',l:'Fatores situacionais (tosse, micção, defecação, dor)?',d:'+1 pt'}
 ];
 return items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(!!c[x.k])===v?'on':''}" onclick="if(!S.sincCalgary)S.sincCalgary={};S.sincCalgary['${x.k}']=${v};render()">${lb}</span>`).join('')}</div></div>`).join('');
}

function calcCanadianScore(){
 const c=S.sincCanadian||{};
 let sc=0;
 if(c.histCard)sc+=1;
 if(c.paEmerg)sc+=2;
 if(c.tropo)sc+=2;
 if(c.ecgAnorm)sc+=1;
 if(c.dxEmerg==='vasovagal')sc-=2;
 else if(c.dxEmerg==='cardiaco')sc+=2;
 return sc;
}
function canadianInterp(){
 const sc=calcCanadianScore();
 if(sc<=0)return 'Muito baixo risco (< 1% risco de evento adverso grave em 30d)';
 if(sc<=2)return 'Baixo risco (~ 2% a 3% risco em 30d)';
 if(sc<=5)return 'Médio risco (~ 9% a 13% risco em 30d)';
 return 'Alto risco (> 20% risco em 30d — monitorização / internação)';
}
function canadianBadgeClass(){
 const sc=calcCanadianScore();
 if(sc<=2)return 'sok';
 if(sc<=5)return 'smod';
 return 'sgr';
}
function rCanadian(){
 const c=S.sincCanadian||{};
 const items=[
  {k:'histCard',l:'História clínica de cardiopatia prévia',d:'+1 pt'},
  {k:'paEmerg',l:'PA na admissão: PAS < 90 ou > 180 mmHg',d:'+2 pts'},
  {k:'tropo',l:'Troponina sérica elevada (> LSN)',d:'+2 pts'},
  {k:'ecgAnorm',l:'ECG com alteração aguda/recente (BAV, arritmia, QTc > 480ms)',d:'+1 pt'}
 ];
 let rows=items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(!!c[x.k])===v?'on':''}" onclick="if(!S.sincCanadian)S.sincCanadian={};S.sincCanadian['${x.k}']=${v};render()">${lb}</span>`).join('')}</div></div>`).join('');
 const dxOpts=[['vasovagal','Vasovagal / reflexa (−2)'],['indet','Inespecífica / Indeterminada (0)'],['cardiaco','Cardiogênica (+2)']];
 rows+=`<div class="srow"><div style="flex:1"><div class="slbl">Hipótese de presunção na emergência</div></div><div class="sopts">${dxOpts.map(([v,lb])=>`<span class="sopt ${c.dxEmerg===v?'on':''}" onclick="if(!S.sincCanadian)S.sincCanadian={};S.sincCanadian.dxEmerg='${v}';render()">${lb}</span>`).join('')}</div></div>`;
 return rows;
}

function sincHda(S) {
  const s = S.sinc;
  if (!s.evento && !s.prod && !s.post && !s.gat.length && !s.car.length && !s.rec && !s.alar.length && !s.ante.length) return '';
  const eventoMap = {
    'Relato de perda de consciência súbita sem pródromos, com queda abrupta': 'relato de perda de consciência súbita sem pródromos, cursando com queda abrupta',
    'Turvação ou escurecimento visual progressivo associado a perda de tônus postural': 'relato de turvação e escurecimento visual progressivos associados a perda do tônus postural',
    'Sensação progressiva de tontura, cabeça vazia e fraqueza difusa antes da perda de consciência': 'sensação progressiva de tontura, cabeça vazia e fraqueza difusa culminando em perda transitória da consciência',
    'Quase-síncope / lipotimia (turvação visual e redução do tônus postural sem perda completa da consciência)': 'episódio de pré-síncope (lipotimia), caracterizado por turvação visual e redução do tônus postural sem perda completa da consciência',
    'Perda transitória da consciência não testemunhada (encontrado ao solo com amnésia do evento)': 'perda transitória da consciência não testemunhada, tendo sido encontrado ao solo com amnésia do evento'
  };
  let out = s.evento ? `após ${eventoMap[s.evento] || s.evento.toLowerCase()}` : 'após episódio sincopal';
  if (s.post) out += `, ocorrido ${s.post === 'Em pé' ? 'em ortostase' : s.post === 'Sentado' ? 'na posição sentada' : s.post === 'Deitado / supina' ? 'em decúbito dorsal' : s.post.toLowerCase()}`;
  if (s.prod) {
    if (s.prod.startsWith('Ausente')) {
      if (!out.includes('sem pródromos')) out += ', sem sintomas prodrômicos';
    } else {
      const prodClean = s.prod.toLowerCase();
      out += `, precedido por ${prodClean}`;
    }
  }
  if (s.gat.length) out += `. Fatores desencadeantes identificados: ${joinAnd(s.gat).toLowerCase()}`;
  if (s.car.length) out += `. Durante o evento, cursou com ${joinAnd(s.car).toLowerCase()}`;
  if (s.rec) out += `, apresentando recuperação ${s.rec.toLowerCase()}`;
  if (s.alar.length) out += `. Sinais de alarme relatados: ${joinAnd(s.alar).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const alSet = (s.alar || []).map(x => x.toLowerCase());
  const prStr = (s.prod || '').toLowerCase();
  if (!alSet.some(x => x.includes('dor torácica')) && !prStr.includes('dor torácica')) unselected.push('dor torácica precedente');
  if (!alSet.some(x => x.includes('palpita')) && !prStr.includes('palpita')) unselected.push('palpitações prévias');
  if (!alSet.some(x => x.includes('dispneia'))) unselected.push('dispneia aguda');
  if (!alSet.some(x => x.includes('cefaleia')) && !prStr.includes('cefaleia')) unselected.push('cefaleia súbita intensa');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de ${joinAnd(unselected)}.`;

  return out;
}
function sincHpp(S){return S.sinc.ante.slice();}
function sincEFText(S){
 const e=S.sincEF;const parts=[];
 const ortoMap={'Normal (queda PA < 20/10 mmHg)':'pesquisa de hipotensão ortostática negativa (queda de PA < 20/10 mmHg)','Hipotensão ortostática (queda ≥ 20/10 mmHg)':'hipotensão ortostática documentada à beira-leito (queda de PA ≥ 20/10 mmHg)','Não realizado / paciente acamado':'aferição postural não realizada por restrição ao leito'};
 const sopMap={'Sopro sistólico (EAo suspeito)':'sopro sistólico ejetivo sugestivo de estenose aórtica (EAo)','Sopro diastólico':'sopro cardíaco diastólico','Sopro em regurgitação mitral':'sopro holossistólico sugestivo de regurgitação mitral','Ausência de sopros':'ausência de sopros valvares','B3 / B4 audível':'presença de bulhas acessórias (B3/B4)'};
 if(e.orto)parts.push(ortoMap[e.orto]||`PA ortostática: ${e.orto}`);
 if(e.sop.length)parts.push(`ausculta cardíaca com ${joinAnd(e.sop.map(x=>sopMap[x]||x.toLowerCase()))}`);
 if(e.nf.length){const mapN=v=>v==='Sem déficit focal'?'exame neurológico sem déficits focais':v.toLowerCase();parts.push(joinAnd(e.nf.map(mapN)));}
 if(!parts.length)return '';
 const txt=parts.join('; ');
 return txt.charAt(0).toUpperCase()+txt.slice(1)+'.';
}
function sincAfter(S){
 return sincBadge();
}

registerQx('Síncope',{
 anamnese:{
  sigla:'sinc',
  blocks:[
   {key:'evento',label:'Caracterização do evento e instalação',type:'radio',options:SINC_EVENTO,autoOpenNext:'prod'},
   {key:'prod',label:'Pródromos',type:'radio',options:SINC_PROD,autoOpenNext:'post'},
   {key:'post',label:'Postura no evento',type:'radio',options:SINC_POST,autoOpenNext:'gat'},
   {key:'gat',label:'Gatilhos',type:'tags',options:SINC_GAT,autoOpenNext:'car'},
   {key:'car',label:'Características do evento',type:'tags',options:SINC_CAR,autoOpenNext:'rec'},
   {key:'rec',label:'Recuperação',type:'radio',options:SINC_REC,autoOpenNext:'alar'},
   {key:'alar',label:'Sinais de alarme',type:'tags',options:SINC_ALAR,autoOpenNext:'ante'},
   {key:'ante',label:'Antecedentes específicos',type:'tags',options:SINC_ANTE}
  ],
  after:sincAfter
 },
 ef:{
  sigla:'sincEF',
  showIn:['crit'],
  ambIcon:'ti-heart',
  ambTitle:'Exame físico específico — Síncope',
  critIcon:'ti-heart',
  critTitle:'Avaliação Cardiológica — Síncope',
  blocks:[
   {key:'orto',label:'PA ortostática',type:'radio',options:SINC_EF_ORTO,autoOpenNext:'sop'},
   {key:'sop',label:'Ausculta cardíaca',type:'tags',options:SINC_EF_SOP,autoOpenNext:'nf'},
   {key:'nf',label:'Exame neurológico focal',type:'tags',options:SINC_EF_NF}
  ]
 },
 hda:sincHda,
 hpp:sincHpp,
 badge:sincBadge,
 efText:sincEFText
});


// ─── Dor torácica ──────────────────────────────────────────────────────────
const DT_LOC=['Retroesternal','Precordial','Hemitórax esquerdo','Hemitórax direito','Epigástrica','Dorso / Interescapular','Difusa e mal delimitada'];
const DT_INI=['Súbito em repouso','Súbito ao esforço físico extenuante','Súbito após pico de estresse emocional','Súbito após vômito vigoroso (Boerhaave)','Progressivo / insidioso'];
const DT_QUAL=['Opressiva / Em aperto','Dilacerante / Rasgante (sugere dissecção)','Pleurítica / Ventilatório-dependente','Em queimação / Pirose retroesternal','Em pontada / Agulhada','Sensação de peso precordial','Difusa e mal delimitada'];
const DT_IRR=['MMSS esquerdo (borda ulnar)','MMSS direito','Bilateral para ambos os braços','Mandíbula / Dentes / Região cervical','Dorso interescapular','Dorso com padrão migratório crânio-caudal','Trapézio / Ombro esquerdo','Epigástrio / Andar superior do abdome'];
const DT_MODIF=['Piora ao esforço e melhora com repouso','Melhora clássica com inclinação anterior do tronco (prece maometana)','Alívio com nitrato sublingual em minutos','Refratária a nitrato sublingual','Piora com inspiração profunda ou tosse','Piora com decúbito dorsal','Piora com deglutição (odinofagia)'];
const DT_SEM=['Sim, semelhante a evento coronariano prévio','Não, dor diferente de eventos anteriores','Sem evento cardiovascular prévio'];
const DT_PAL=['Não reproduzida à palpação parietal','Reproduzida pontualmente à palpação parietal (osteomuscular)'];
const DT_SIN=['Diaforese fria profusa','Dispneia aguda concomitante','Sensação de morte iminente','Síncope / Pré-síncope associada','Náuseas e vômitos','Palpitações taquicárdicas','Parestesias de extremidades / perioral','Febre prévia','Hemoptise franca'];

function dtHda(S) {
  const d = S.dt;
  if ((!d.loc || !d.loc.length) && !d.ini && !d.qual.length && !d.irr.length && !d.modif.length && !d.pal && !d.sem && !d.sin.length) return '';
  const car = [];
  if (d.loc && d.loc.length) car.push(`localizada predominantemente em ${joinAnd(d.loc).toLowerCase()}`);
  if (d.qual && d.qual.length) car.push(`com caráter ${joinAnd(d.qual).toLowerCase()}`);
  if (d.ini) car.push(`de início ${d.ini.toLowerCase()}`);
  if (d.irr && d.irr.length) car.push(`com irradiação para ${joinAnd(d.irr).toLowerCase()}`);
  
  let out = car.length ? `caracterizada por dor torácica ${joinAnd(car)}` : 'apresentando dor torácica';
  if (d.modif && d.modif.length) out += `. Refere fatores modificadores como: ${joinAnd(d.modif).toLowerCase()}`;
  if (d.pal) out += `. Dor ${d.pal.toLowerCase()}`;
  if (d.sem) {
    const semClean = d.sem.toLowerCase();
    out += `. Em comparação com eventos prévios, refere quadro de caráter ${semClean}`;
  }
  if (d.sin && d.sin.length) out += `. Ao interrogatório sintomático, relata ${joinAnd(d.sin).toLowerCase()}`;

  // Negações ativas para respaldo médico-legal de Red Flags
  const unselected = [];
  const sSet = (d.sin || []).map(x => x.toLowerCase());
  const iSet = (d.irr || []).map(x => x.toLowerCase());
  const qSet = (d.qual || []).map(x => x.toLowerCase());
  if (!iSet.includes('dorso interescapular') && !qSet.includes('dilacerante / rasgante (sugere dissecção)')) unselected.push('dor dilacerante ou interescapular migratória');
  if (!sSet.includes('dispneia associada')) unselected.push('dispneia súbita');
  if (!sSet.includes('síncope / pré-síncope')) unselected.push('síncope');
  if (!sSet.includes('palpitações associadas')) unselected.push('palpitações');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de sintomas de alarme como ${joinAnd(unselected)}.`;

  return out;
}
function isOcaActive(sState){
 const st = sState || (typeof S !== 'undefined' ? S : null);
 if(!st) return false;
 if(st.subsind === 'sca_oca' || st.sind === 'sca_oca') return true;
 if(Array.isArray(st.subsinds) && st.subsinds.includes('sca_oca')) return true;
 if(Array.isArray(st.sindromes) && st.sindromes.includes('sca_oca')) return true;
 if(st.ecgS?.st?.some(s => s && s.toLowerCase().includes('supra'))) return true;
 const ocaPatterns = ['de winter', 'wellens', 'sgarbossa', 'smith', 'hiperaguda'];
 if(st.ecgS?.padroes?.some(p => ocaPatterns.some(k => p && p.toLowerCase().includes(k)))) return true;
 return false;
}

function dtAfter(S){
 const d=S.dt;let out='';
 if((d.sin.includes('Parestesias de extremidades / perioral')||d.sin.includes('Sensação de morte iminente'))&&d.ini.includes('repouso'))out+=`<div class="abox aw"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Considerar etiologia isquêmica aguda ou hiperventilação</div>`;
 if(d.irr.includes('Dorso interescapular')||d.irr.includes('Dorso com padrão migratório crânio-caudal')||d.qual.includes('Dilacerante / Rasgante (sugere dissecção)'))out+=`<div class="abox ad"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE DISSECÇÃO AÓRTICA</strong> — Dor dilacerante ou interescapular migratória: CONTRAINDICADA anticoagulação plena/antiagregação até descartar dissecção por AngioTC de aorta torácica total!</div>`;
 out+=`<div style="margin-top:8px"><label>Tempo de início</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 2 horas, 30 min"></div>`;
 if(isOcaActive(S)){
  out+=`<div class="abox ad" style="margin-top:10px"><i class="ti ti-alert-circle" aria-hidden="true"></i> <strong>OCLUSÃO CORONARIANA AGUDA (OCA / STEMI) DETECTADA:</strong> Escores de estratificação ambulatorial / dor torácica indiferenciada (HEART / EDACS) são <u>contraindicados / inaplicáveis</u>. Conduta imediata: Reperfusão de emergência (ICP primária em ≤ 120 min ou fibrinólise imediata se indisponível em 120 min), dupla antiagregação e anticoagulação plena.</div>`;
 } else {
  out+=`<div class="scard"><div class="shdr" onclick="tog('hb')"><span style="font-weight:500">Score HEAR</span><span class="sb ${hC()}">${hSc()}/10</span></div><div class="sbd ${isCardOpen('hb',true)?'open':''}" id="hb">${rHear()}<div class="sres"><div class="snum">${hSc()}<span style="font-size:13px;color:var(--color-text-secondary)">/10</span></div><div><span class="sb ${hC()}">${hI(hSc())}</span></div></div></div></div>`;
  out+=`<div class="scard"><div class="shdr" onclick="tog('eb')"><span style="font-weight:500">Score EDACS</span><span class="sb ${eC()}">${eSc()} pts</span></div><div class="sbd ${isCardOpen('eb',true)?'open':''}" id="eb">${rEdacs()}<div class="sres"><div class="snum">${eSc()}<span style="font-size:13px;color:var(--color-text-secondary)"> pts</span></div><div style="font-size:13px">${eI()}</div></div></div></div>`;
 }
 return out;
}

registerQx('Dor torácica',{
 anamnese:{
  sigla:'dt',
  blocks:[
   {key:'loc',label:'Local de Início / Maior Intensidade',type:'tags',options:DT_LOC,autoOpenNext:'ini'},
   {key:'ini',label:'Início e Contexto',type:'radio',options:DT_INI,autoOpenNext:'qual'},
   {key:'qual',label:'Qualidade da Dor',type:'tags',options:DT_QUAL,autoOpenNext:'irr'},
   {key:'irr',label:'Irradiação',type:'tags',options:DT_IRR,autoOpenNext:'modif'},
   {key:'modif',label:'Fatores Modificadores e Posturais',type:'tags',options:DT_MODIF,autoOpenNext:'sem'},
   {key:'sem',label:'Semelhante a evento prévio?',type:'radio',options:DT_SEM,autoOpenNext:'pal'},
   {key:'pal',label:'Palpação parietal',type:'radio',options:DT_PAL,autoOpenNext:'sin'},
   {key:'sin',label:'Sintomas Associados',type:'tags',options:DT_SIN}
  ],
  after:dtAfter
 },
 hda:dtHda
});


// ─── Palpitações ───────────────────────────────────────────────────────────
const PAL_INICIO=['Início súbito e abrupto ("em liga-desliga")','Início gradual e progressivo','Percebidas ao despertar ou em repouso','Percebidas de forma intermitente ao longo do dia'];
const PAL_ATIVIDADE=['Em repouso absoluto (sentado ou deitado)','Durante esforço físico ou exercício','Logo após término de esforço físico','Após mudança postural (ao levantar-se)','Durante estresse emocional ou ansiedade'];
const PAL_GATILHOS=['Uso recente de cafeína, energéticos ou estimulantes','Consumo recente de bebida alcoólica','Uso de simpaticomiméticos, descongestionantes ou broncodilatadores','Privação de sono ou fadiga intensa','Febre, desidratação ou infecção intercorrente','Sem fator desencadeante identificado'];
const PAL_PIORA=['Piora com esforço físico','Piora com decúbito lateral esquerdo ou dorsal','Piora com inspiração profunda ou mudança postural','Sem fatores claros de piora'];
const PAL_TERMINO=['Cessam espontaneamente de forma súbita','Cessam gradualmente com o repouso','Cessam após manobras vagais (tosse, esforço evacuatório, respiração presa)','Episódio mantido e contínuo até a admissão'];
const PAL_INSTAB=['Síncope durante o episódio','Pré-síncope, tontura intensa ou escurecimento visual','Dor torácica opressiva concomitante','Dispneia ou desconforto respiratório associado','Sudorese fria ou mal-estar intenso','Ausência de sintomas de alarme associados'];

function palQHda(S) {
  const p = S.palQ;
  if (!p.inicio && !(p.atividade||[]).length && !(p.gatilhos||[]).length && !(p.piora||[]).length && !(p.termino||[]).length && !(p.instab||[]).length) return '';
  let out = 'com queixa de palpitações';
  if (p.inicio) out += ` de ${p.inicio.toLowerCase()}`;
  if ((p.atividade||[]).length) out += `, desencadeadas ${joinAnd(p.atividade).toLowerCase()}`;
  if ((p.gatilhos||[]).length) out += `. Fatores desencadeantes associados: ${joinAnd(p.gatilhos).toLowerCase()}`;
  if ((p.piora||[]).length) out += `. Fatores de piora: ${joinAnd(p.piora).toLowerCase()}`;
  if ((p.termino||[]).length) out += `. Padrão de término / alívio: ${joinAnd(p.termino).toLowerCase()}`;
  if ((p.instab||[]).length) out += `. Sintomas de alarme avaliados: ${joinAnd(p.instab).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const inSet = (p.instab || []).map(x => x.toLowerCase());
  if (!inSet.some(x => x.includes('síncope') && !x.includes('pré-síncope'))) unselected.push('síncope');
  if (!inSet.some(x => x.includes('dor torácica'))) unselected.push('dor torácica');
  if (!inSet.some(x => x.includes('dispneia'))) unselected.push('dispneia');
  if (unselected.length) out += `. Negação de sintomas de alarme como ${joinAnd(unselected)}.`;

  return out;
}
function palQAfter(S){
 const p=S.palQ;let out='';
 if((p.instab||[]).some(i=>!i.includes('Ausência'))){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>SINAIS DE INSTABILIDADE HEMODINÂMICA EM ARRITMIA</strong> — Monitorização multiparamétrica imediata, oxigênio sob demanda, acesso venoso calibroso e ECG de 12 derivações. Se instabilidade mantida (hipotensão, angina, dispneia com congestão, síncope): preparar cardioversão elétrica sincronizada imediata.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Duração do episódio de palpitações</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 30 min, há 2 horas"></div>`;
 return out;
}

registerQx('Palpitações',{
 anamnese:{
  sigla:'palQ',
  blocks:[
   {key:'inicio',label:'Forma de Início e Instalação',type:'radio',options:PAL_INICIO,autoOpenNext:'atividade'},
   {key:'atividade',label:'Atividade no Momento do Início',type:'tags',options:PAL_ATIVIDADE,autoOpenNext:'gatilhos'},
   {key:'gatilhos',label:'Gatilhos e Fatores Desencadeantes',type:'tags',options:PAL_GATILHOS,autoOpenNext:'piora'},
   {key:'piora',label:'Fatores de Piora',type:'tags',options:PAL_PIORA,autoOpenNext:'termino'},
   {key:'termino',label:'Forma de Término e Manobras de Alívio',type:'tags',options:PAL_TERMINO,autoOpenNext:'instab'},
   {key:'instab',label:'Sintomas Associados de Alarme e Instabilidade',type:'tags',options:PAL_INSTAB}
  ],
  after:palQAfter
 },
 hda:palQHda
});

