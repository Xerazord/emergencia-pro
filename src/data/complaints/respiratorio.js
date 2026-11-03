/* ─── Queixas Respiratórias ─── */
// ─── Dispneia ──────────────────────────────────────────────────────────────
const DSP_INICIO=['Súbito','Progressivo','Crônico agudizado','Oscilante'];
const DSP_PADRAO=['Ortopneia','Dispneia paroxística noturna (DPN)','Em repouso','Aos mínimos esforços','Aos moderados/grandes esforços','Platipneia / ortodeoxia','Trepopneia'];
const DSP_MODIF=['Piora ao decúbito','Melhora sentado/Fowler','Piora ao esforço','Melhora com O2','Piora noturna'];
const DSP_ASSOC_CV=['Edema MMII','Palpitações','Dor torácica anginosa','Síncope/pré-síncope'];
const DSP_ASSOC_RESP=['Dor torácica de caráter pleurítico (ventilatório-dependente)','Sibilos','Crepitações','Uso de musculatura acessória','Hemoptise','Tosse produtiva','Tosse seca','Estridor laríngeo'];
const DSP_ASSOC_INF=['Febre','Calafrios','Expectoração purulenta','Coriza / mialgia'];
const DSP_CTX=['IC prévia','Asma/DPOC conhecido','Tabagismo importante','Imobilização recente','Cirurgia recente','TVP/TEP prévio','Neoplasia ativa','Imunossupressão'];
const DSP_EF_FALA=['Frases completas','Frases incompletas','Palavras soltas','Impossível falar'];
const DSP_EF_POSIC=['Decúbito tolerado','Sentado (Fowler)','Tripé','Decúbito não tolerado'];
const DSP_EF_CIANOSE=['Ausente','Periférica (acrocianose)','Central (lábios/língua)'];
const DSP_EF_AUS=['MV normal','Estertores crepitantes bilaterais','Estertores unilaterais','Sibilos difusos','Roncos','MV reduzido D','MV reduzido E','Atrito pleural','Tórax silencioso'];
const DSP_EF_SINAIS_CV=['Turgência jugular','Galope (B3)','Edema MMII com cacifo','Cianose central','Pulso paradoxal','Sopro cardíaco audível'];

function dspHda(S) {
  const d = S.dsp;
  if (!d.inicio && !d.padrao.length && !d.modif.length && !d.assocCV.length && !d.assocResp.length && !d.assocInf.length && !d.ctx.length) return '';
  const car = [];
  if (d.inicio) {
    const iniStr = d.inicio.toLowerCase().replace(/súbito$/, 'súbita').replace(/progressivo$/, 'progressiva');
    car.push(`de instalação ${iniStr}`);
  }
  if (d.padrao.length) {
    const pad = d.padrao.map(p => {
      const pl = p.toLowerCase();
      if (pl.startsWith('ortopneia') || pl.startsWith('dispneia')) return pl;
      return `padrão de ${pl}`;
    });
    car.push(`com ${joinAnd(pad)}`);
  }
  let out = car.length ? `caracterizada por dispneia ${joinAnd(car)}` : 'apresentando dispneia';
  if (d.modif.length) out += `. Refere fatores modificadores ou posturais de alívio: ${joinAnd(d.modif).toLowerCase()}`;
  const assoc = [...d.assocCV, ...d.assocResp, ...d.assocInf];
  if (assoc.length) out += `. Ao interrogatório sintomático, relata ${joinAnd(assoc).toLowerCase()}`;
  if (d.ctx.length) out += `. Destaca-se histórico relevante de ${joinAnd(d.ctx).toLowerCase()}`;

  // Negações ativas com fusão elegante
  const unselected = [];
  const cvSet = (d.assocCV || []).map(x => x.toLowerCase());
  const respSet = (d.assocResp || []).map(x => x.toLowerCase());
  if (!cvSet.includes('dor torácica anginosa')) unselected.push('dor torácica anginosa típica');
  if (!cvSet.includes('síncope/pré-síncope')) unselected.push('síncope');
  if (!respSet.includes('hemoptise')) unselected.push('hemoptise');
  if (unselected.length) out += `. Sem queixas associadas de ${joinAnd(unselected)}.`;

  if (S.wellsTep && S.wellsTep.evaluated) out += ` Escore de Wells para TEP: ${wellsTepSc().toFixed(1)} pts (${wellsTepInterp(wellsTepSc())}).`;
  return out;
}
function dspEFText(S){
 if(S.ef!=='crit')return '';
 const e=S.dspEF;const dp=[];
 const posMap={'Sentado (Fowler)':'em posição de Fowler','Tripé':'em posição de tripé','Decúbito tolerado':'tolerando o decúbito dorsal','Decúbito não tolerado':'com intolerância ao decúbito'};
 const falaMap={'Frases completas':'com fala preservada em frases completas','Frases incompletas':'com fala entrecortada em frases incompletas','Palavras soltas':'com fala restrita a palavras soltas','Impossível falar':'incapaz de falar por dispneia acentuada'};
 const cianMap={'Ausente':'acianótico','Periférica (acrocianose)':'com acrocianose periférica','Central (lábios/língua)':'com cianose central de lábios e língua'};
 const ausMap={'MV normal':'murmúrio vesicular fisiológico','Estertores crepitantes bilaterais':'estertores crepitantes bilaterais','Estertores unilaterais':'estertores crepitantes unilaterais','Sibilos difusos':'sibilos difusos','Roncos':'roncos','MV reduzido D':'murmúrio vesicular reduzido à direita','MV reduzido E':'murmúrio vesicular reduzido à esquerda','Atrito pleural':'atrito pleural','Tórax silencioso':'tórax silencioso'};
 const cvMap={'Turgência jugular':'turgência jugular patológica','Galope (B3)':'ritmo de galope por B3','Edema MMII com cacifo':'edema de MMII com cacifo','Cianose central':'cianose central','Pulso paradoxal':'pulso paradoxal','Sopro cardíaco audível':'sopro cardíaco audível'};
 const ecto=[e.posic&&posMap[e.posic],e.fala&&falaMap[e.fala],e.cianose&&cianMap[e.cianose]].filter(Boolean);
 if(ecto.length)dp.push(`Paciente ${joinAnd(ecto)}`);
 if(e.aus.length)dp.push(`ausculta pulmonar com ${joinAnd(e.aus.map(x=>ausMap[x]||x.toLowerCase()))}`);
 if(e.sinaisCV.length)dp.push(`avaliação cardiovascular evidenciando ${joinAnd(e.sinaisCV.map(x=>cvMap[x]||x.toLowerCase()))}`);
 if(!dp.length)return '';
 const txt=dp.join('; ');
 return txt.charAt(0).toUpperCase()+txt.slice(1)+'.';
}
function dspAfter(S){
 let out=`<div style="margin-top:6px"><label>Tempo de início</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 2 horas, 30 min"></div>`;
 const wSc=wellsTepSc();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_wells_tep')"><span style="font-weight:500"><i class="ti ti-calculator"></i> Escore de Wells para TEP</span><span class="sb ${wellsTepBadgeClass(wSc)}">${wSc.toFixed(1)} pts</span></div><div class="sbd ${isCardOpen('sc_wells_tep',true)?'open':''}" id="sc_wells_tep">${rWellsTep()}<div class="sres"><div class="snum">${wSc.toFixed(1)}<span style="font-size:13px;color:var(--color-text-secondary)"> pts</span></div><div style="font-size:13px">${wellsTepInterp(wSc)}</div></div></div></div>`;
 return out;
}

registerQx('Dispneia',{
 anamnese:{
  sigla:'dsp',
  blocks:[
   {key:'inicio',label:'Início',type:'radio',options:DSP_INICIO,autoOpenNext:'padrao'},
   {key:'padrao',label:'Padrão',type:'tags',options:DSP_PADRAO,autoOpenNext:'modif'},
   {key:'modif',label:'Modificadores',type:'tags',options:DSP_MODIF,autoOpenNext:'assocCV'},
   {key:'assocCV',label:'Associado — cardiovascular',type:'tags',options:DSP_ASSOC_CV,autoOpenNext:'assocResp'},
   {key:'assocResp',label:'Associado — respiratório',type:'tags',options:DSP_ASSOC_RESP,autoOpenNext:'assocInf'},
   {key:'assocInf',label:'Associado — infeccioso',type:'tags',options:DSP_ASSOC_INF,autoOpenNext:'ctx'},
   {key:'ctx',label:'Contexto clínico',type:'tags',options:DSP_CTX}
  ],
  after:dspAfter
 },
 ef:{
  sigla:'dspEF',
  showIn:['crit'],
  ambIcon:'ti-lungs',
  ambTitle:'Exame físico específico — Dispneia',
  blocks:[
   {key:'fala',label:'Capacidade de falar',type:'radio',options:DSP_EF_FALA,autoOpenNext:'posic'},
   {key:'posic',label:'Posição preferencial',type:'radio',options:DSP_EF_POSIC,autoOpenNext:'cianose'},
   {key:'cianose',label:'Cianose',type:'radio',options:DSP_EF_CIANOSE,autoOpenNext:'aus'},
   {key:'aus',label:'Ausculta pulmonar',type:'tags',options:DSP_EF_AUS,autoOpenNext:'sinaisCV'},
   {key:'sinaisCV',label:'Sinais cardiovasculares',type:'tags',options:DSP_EF_SINAIS_CV}
  ]
 },
 hda:dspHda,
 badge:dispGravBadge,
 efText:dspEFText
});


// ─── Tosse ─────────────────────────────────────────────────────────────────
const TOS_TIPO=['Seca e irritativa (não produtiva)','Produtiva com escarro hialino / mucoide','Produtiva com secreção purulenta amarelada/esverdeada','Hemoptoica (estrias de sangue no escarro)','Hemoptise franca com coágulos','Escarro com aspecto herrumbroso'];
const TOS_DURACAO=['Aguda (< 3 semanas)','Subaguda (3 a 8 semanas)','Crônica (> 8 semanas)'];
const TOS_PADRAO=['Predomínio noturno despertando o sono','Piora acentuada ao decúbito dorsal','Acessos paroxísticos com guincho inspiratório','Desencadeada por esforço ou ar frio','Tosse pós-prandial / engasgos'];
const TOS_ASSOC=['Febre diária com calafrios','Dor torácica ventilatório-dependente (pleurítica)','Dispneia progressiva associada','Sibilância audível (chiado no peito)','Sudorese noturna profusa','Perda ponderal involuntária recente','Coriza / congestão nasal / odinofagia'];
const TOS_RISCO=['Tabagismo ativo (fumante)','Ex-tabagista','Uso crônico de IECA (Enalapril / Captopril)','Contato domiciliar recente com tuberculose ativa','Asma / DPOC prévio conhecido','Exposição ocupacional a poeiras / mofo / biomassa'];

function tosHda(S) {
  const t = S.tos;
  if (!t.tipo && !t.duracao && !t.padrao.length && !t.assoc.length && !t.risco.length) return '';
  let out = t.tipo ? `com tosse caracterizada como ${t.tipo.toLowerCase()}` : 'com queixa de tosse';
  if (t.duracao) out += `, com evolução ${t.duracao.toLowerCase()}`;
  if (t.padrao.length) out += `. Padrão temporal: ${joinAnd(t.padrao).toLowerCase()}`;
  if (t.assoc.length) out += `. Ao interrogatório direcionado, relata ${joinAnd(t.assoc).toLowerCase()}`;
  if (t.risco.length) out += `. Fatores de risco relevantes: ${joinAnd(t.risco).toLowerCase()}`;
  
  // Negações ativas
  const unselected = [];
  const asSet = (t.assoc || []).map(x => x.toLowerCase());
  if (!asSet.includes('febre diária com calafrios')) unselected.push('febre com calafrios');
  if (!asSet.includes('dispneia progressiva associada')) unselected.push('dispneia em repouso');
  if (!t.tipo.toLowerCase().includes('hemoptise')) unselected.push('hemoptise franca');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de ${joinAnd(unselected)}.`;

  if (S.psiPort && S.psiPort.evaluated) {
    const pSc = psiPortSc();
    out += ` Escore PSI / PORT: ${pSc} pts (${psiPortClass(pSc)}).`;
  }
  return out;
}
function tosAfter(S){
 const t=S.tos;let out='';
 if(t.tipo.includes('Hemoptise franca com coágulos')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE HEMOPTISE MACIÇA / POTENCIALMENTE GRAVE</strong> — Garantir patência de via aérea; decúbito lateral sobre o lado acometido se conhecido para proteger o pulmão são; reserva de sangue, TC de tórax com contraste e contato com pneumologia/cirurgia torácica.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de duração da tosse</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 4 dias, há 3 semanas"></div>`;
 const pSc=psiPortSc();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_psi_port')"><span style="font-weight:500"><i class="ti ti-calculator"></i> Escore PSI / PORT — Pneumonia Adquirida na Comunidade</span><span class="sb ${psiPortBadgeClass(pSc)}">${pSc} pts</span></div><div class="sbd ${isCardOpen('sc_psi_port',true)?'open':''}" id="sc_psi_port">${rPsiPort()}<div class="sres"><div class="snum">${pSc}<span style="font-size:13px;color:var(--color-text-secondary)"> pts</span></div><div style="font-size:13px">${psiPortClass(pSc)}</div></div></div></div>`;
 return out;
}

registerQx('Tosse',{
 anamnese:{
  sigla:'tos',
  blocks:[
   {key:'tipo',label:'Aspecto e Característica da Secreção',type:'radio',options:TOS_TIPO,autoOpenNext:'duracao'},
   {key:'duracao',label:'Duração e Cronologia',type:'radio',options:TOS_DURACAO,autoOpenNext:'padrao'},
   {key:'padrao',label:'Padrão Temporal e Fatores de Piora',type:'tags',options:TOS_PADRAO,autoOpenNext:'assoc'},
   {key:'assoc',label:'Sintomas Associados',type:'tags',options:TOS_ASSOC,autoOpenNext:'risco'},
   {key:'risco',label:'Fatores de Risco e Exposições',type:'tags',options:TOS_RISCO}
  ],
  after:tosAfter
 },
 hda:tosHda
});

