/* ─── Queixas de Trauma & Toxicologia / Psiquiatria ─── */
// ─── Intoxicação exógena ───────────────────────────────────────────────────
const INT_CIRC=['Tentativa de autoextermínio (ingestão intencional)','Exposição acidental (criança / idoso / erro de medicação)','Uso recreativo / overdose acidental de drogas','Exposição ocupacional / agrícola / ambiental'];
const INT_TEMPO_VIA=['Via oral (ingestão)','Via inalatória','Via cutânea / mucosa','Via parenteral / intravenosa','Tempo de exposição < 1 hora (janela de lavagem gástrica)','Tempo de exposição entre 1 e 2 horas (janela carvão ativado)','Tempo de exposição > 2 horas','Horário exato desconhecido'];
const INT_DOSE_CO=['Dose maciça / frascos inteiros relatados','Cartelas vazias encontradas no local do evento','Co-ingestão de etanol (bebida alcoólica)','Co-ingestão de múltiplos psicotrópicos / polifarmácia','Dose terapêutica acidental duplicada'];
const INT_TOX=['Toxíndrome Anticolinérgica (rubor, midríase, mucosas secas, retenção urinária, delírio)','Toxíndrome Colinérgica (miose, sudorese, broncorreia, fasciculações, bradicardia)','Toxíndrome Opioide (tríade: miose puntiforme, bradipneia/depressão respiratória, coma)','Toxíndrome Simpaticomimética (taquicardia, HAS grave, diaforese, midríase, agitação)','Toxíndrome Sedativo-Hipnótica (sonolência/coma, hipotensão leve, pupilas normais/mióticas)','Toxíndrome Serotoninérgica (hipertermia, clônus, hiper-reflexia, tremor)'];

function intHda(S) {
  const it = S.intQ;
  if (!it.circunstancia && !it.tempoVia.length && !S.itDrug && !it.doseCo.length && !it.toxidromes.length) return '';
  let out = 'Paciente avaliado por suspeita clínica de intoxicação exógena';
  if (it.circunstancia) out += `, num contexto sugestivo de ${it.circunstancia.toLowerCase()}`;
  if (it.tempoVia.length) out += `. A exposição ocorreu via ${joinAnd(it.tempoVia).toLowerCase()}`;
  if (S.itDrug) out += `. Há relato de contato com as seguintes substâncias: ${S.itDrug}`;
  if (it.doseCo.length) out += `. Destaca-se quanto à dose e coingestões: ${joinAnd(it.doseCo).toLowerCase()}`;
  if (it.toxidromes.length) out += `. O exame direcionado aponta achados compatíveis com ${joinAnd(it.toxidromes).toLowerCase()}`;
  return out + '.';
}

function intAfter(S){
 const it=S.intQ;let out='';
 if(it.toxidromes.includes('Toxíndrome Opioide (tríade: miose puntiforme, bradipneia/depressão respiratória, coma)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>SUSPEITA DE OVERDOSE DE OPIOIDE</strong> — Naloxona 0,4 a 2 mg IV/IM/intranasal imediata. Titular dose até ventilação espontânea adequada (alvo não é despertar completo, e sim FR ≥ 10–12 irpm). Monitorizar recidiva da depressão respiratória.</div>`;
 }
 if(it.toxidromes.includes('Toxíndrome Colinérgica (miose, sudorese, broncorreia, fasciculações, bradicardia)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>INTOXICAÇÃO POR ORGANOFOSFORADOS / CARBAMATOS</strong> — Atropinização imediata: Atropina 1 a 2 mg IV em bolus, dobrando a dose a cada 3–5 min até cessar broncorreia e broncoespasmo. Descontaminação cutânea rigorosa (retirar roupas, lavar com água/sabão).</div>`;
 }
 return out;
}

registerQx('Intoxicação exógena',{
 anamnese:{
  sigla:'intQ',
  blocks:[
   {key:'circunstancia',label:'Circunstância da Exposição',type:'radio',options:INT_CIRC,autoOpenNext:'tempoVia'},
   {key:'tempoVia',label:'Via de Exposição e Janela Temporal',type:'tags',options:INT_TEMPO_VIA,autoOpenNext:'doseCo'},
   {key:'doseCo',label:'Dose Estimada e Co-ingestão',type:'tags',options:INT_DOSE_CO,autoOpenNext:'toxidromes',extra:S=>`<div style="margin-top:8px"><label>Substâncias suspeitas / medicações encontradas</label><input type="text" value="${esc(S.itDrug||'')}" oninput="S.itDrug=this.value" placeholder="Ex: Clonazepam 60 comprimidos + Paracetamol 20 comprimidos..."></div>`},
   {key:'toxidromes',label:'Triagem Clínica de Toxíndromes',type:'tags',options:INT_TOX}
  ],
  after:intAfter
 },
 hda:intHda
});


// ─── Trauma ────────────────────────────────────────────────────────────────
const TRM_MEC=['Colisão auto x auto / anteparo','Colisão moto x auto / anteparo','Capotamento / tombamento','Atropelamento por veículo automotor','Queda de nível (> 2 metros / escada)','Queda da própria altura (idoso / fragilidade)','Agressão física contusa','Ferimento por arma de fogo (FAF)','Ferimento por arma branca (FAB)','Trauma desportivo / lazer'];
const TRM_ALTA_ENERGIA=['Óbito no mesmo habitáculo','Vítima ejetada do veículo','Deformidade de habitáculo > 30 cm','Extricação prolongada (> 20 min)','Atropelamento em alta velocidade','Queda de altura > 3 vezes a estatura do paciente'];
const TRM_PROTECAO=['Cinto de segurança utilizado','Capacete utilizado e afivelado','Airbag deflagrado','Sem dispositivos de proteção relatados / desconhecido'];
const TRM_CENA=['Perda de consciência transitória na cena com recuperação','Perda de consciência mantida na cena','Crise convulsiva pós-trauma relatada','Lúcido e orientado na cena (sem perda de consciência)','Necessidade de via aérea avançada / O2 no resgate','Colar cervical e prancha rígida aplicados pelo resgate'];
const TRM_ATIVAS=['Dor em coluna cervical','Dor torácica ventilatório-dependente','Dor abdominal / pélvica','Déficit motor ou sensitivo em extremidades','Ferimento cortocontuso evidente com sangramento','Escoriações / contusões musculares difusas','Sem queixas álgicas espontâneas no momento'];

function trmHda(S) {
  const t = S.trm;
  if (!t.mec && !t.altaEnergia.length && !t.protecao.length && !t.cena.length && !t.ativas.length) return '';
  let out = 'vítima de trauma';
  if (t.mec) out += ` decorrente de ${t.mec.toLowerCase()}`;
  if (t.altaEnergia.length) out += `. Cinemática com fatores de alta energia: ${joinAnd(t.altaEnergia).toLowerCase()}`;
  if (t.protecao.length) out += `. Dispositivos de proteção: ${joinAnd(t.protecao).toLowerCase()}`;
  if (t.cena.length) out += `. Achados na cena/resgate: ${joinAnd(t.cena).toLowerCase()}`;
  if (t.ativas.length) out += `. Queixas ativas na admissão: ${joinAnd(t.ativas).toLowerCase()}`;
  if (S.trmRules && S.trmRules.evaluated) {
    const parts = [];
    if (S.trmRules.cchrPos) parts.push('Canadian CT Head de alto risco (TC crânio indicada)');
    else if (S.trmRules.cchrMed) parts.push('Canadian CT Head de risco médio (TC recomendada)');
    else parts.push('Canadian CT Head de baixo risco');
    if (S.trmRules.ccsrHigh || S.trmRules.ccsrLow) parts.push('Canadian C-Spine positivo (imagem cervical indicada)');
    else parts.push('Canadian C-Spine negativo');
    if (S.trmRules.nexusPos) parts.push('critérios NEXUS positivos');
    else parts.push('critérios NEXUS de baixo risco');
    out += `. Decisão clínica: ${joinAnd(parts)}.`;
  }
  return out;
}
function trmAfter(S){
 const t=S.trm;let out='';
 if(t.altaEnergia.length || t.cena.includes('Perda de consciência mantida na cena') || t.cena.includes('Crise convulsiva pós-trauma relatada')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE CINEMÁTICA DE ALTA ENERGIA / POLITRAUMA</strong> — Imobilização de coluna em prancha rígida e colar cervical; avaliação primária sistematizada ABCDE; FAST / e-FAST e tomografia computadorizada multislice corpo total (politrauma).</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo do trauma / ocorrência</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 45 min, há 2 horas"></div>`;
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_trauma_rules')"><span style="font-weight:500"><i class="ti ti-shield-check"></i> Regras de Decisão Clínica em Trauma (Canadian Head, Canadian C-Spine, NEXUS)</span><span class="sb ${S.trmRules&&S.trmRules.evaluated?'smod':'sok'}">${S.trmRules&&S.trmRules.evaluated?'Avaliado':'Critérios'}</span></div><div class="sbd ${isCardOpen('sc_trauma_rules',true)?'open':''}" id="sc_trauma_rules">${rTraumaRules()}</div></div>`;
 return out;
}

registerQx('Trauma',{
 anamnese:{
  sigla:'trm',
  blocks:[
   {key:'mec',label:'Mecanismo do Trauma',type:'radio',options:TRM_MEC,autoOpenNext:'altaEnergia'},
   {key:'altaEnergia',label:'Cinemática e Fatores de Alta Energia',type:'tags',options:TRM_ALTA_ENERGIA,autoOpenNext:'protecao'},
   {key:'protecao',label:'Dispositivos de Proteção Utilizados',type:'tags',options:TRM_PROTECAO,autoOpenNext:'cena'},
   {key:'cena',label:'Estado Inicial na Cena / Resgate',type:'tags',options:TRM_CENA,autoOpenNext:'ativas'},
   {key:'ativas',label:'Queixas Ativas na Admissão',type:'tags',options:TRM_ATIVAS}
  ],
  after:trmAfter
 },
 hda:trmHda
});


// ─── Agitação psicomotora ──────────────────────────────────────────────────
const AGI_EVOL=['Hiperaguda (< 2 horas)','Aguda no mesmo dia','Subaguda / progressiva há dias','Flutuante / oscilante (delirium)'];
const AGI_PADRAO=['Heteroagressividade física ativa (contra terceiros/equipe)','Heteroagressividade verbal intensa com ameaças','Agitação psicomotora desorganizada sem agressividade','Tentativa ativa de fuga / evasão do serviço','Desinibição comportamental / hipersexualidade','Comportamento bizarro / inadequado','Risco iminente de autoextermínio / autoagressão'];
const AGI_PSIC=['Alucinações auditivas de comando','Alucinações visuais (zoopsias / vultos)','Delírios persecutórios / paranoides','Desorientação têmporo-espacial evidente','Fuga de ideias / discurso desconexo e acelerado','Ausência de sintomas psicóticos evidentes'];
const AGI_ORG=['Febre recente ou sinais infecciosos ativos','Trauma cranioencefálico recente','Abuso agudo de álcool / substâncias psicoativas','Síndrome de abstinência alcoólica recente','Glicemia capilar normal descartando hipoglicemia','Sem estigmas evidentes de causa orgânica'];
const AGI_PSIQ_HPP=['Transtorno afetivo bipolar conhecido','Esquizofrenia / transtorno psicótico conhecido','Transtorno de personalidade','Abandono recente de tratamento psicofarmacológico','Sem antecedentes psiquiátricos conhecidos'];

function agiHda(S) {
  const a = S.agi;
  if (!a.evolucao && !a.padrao.length && !a.psicoticos.length && !a.organica.length && !a.psiqHpp.length) return '';
  let out = 'apresentando quadro de agitação psicomotora';
  if (a.evolucao) out += ` de evolução ${a.evolucao.toLowerCase()}`;
  if (a.padrao.length) out += `, manifestada predominantemente por ${joinAnd(a.padrao).toLowerCase()}`;
  if (a.psicoticos.length) out += `. Alterações do pensamento/sensopercepção: ${joinAnd(a.psicoticos).toLowerCase()}`;
  if (a.organica.length) out += `. Rastreio de causas orgânicas: ${joinAnd(a.organica).toLowerCase()}`;
  if (a.psiqHpp.length) out += `. Histórico psiquiátrico prévio: ${joinAnd(a.psiqHpp).toLowerCase()}`;
  return out;
}
function agiAfter(S){
 const a=S.agi;let out='';
 if(a.padrao.includes('Heteroagressividade física ativa (contra terceiros/equipe)')||a.padrao.includes('Risco iminente de autoextermínio / autoagressão')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>AGITAÇÃO GRAVE / RISCO IMINENTE</strong> — Priorizar segurança da equipe e do paciente. Contenção mecânica em 4 pontos se estritamente necessária após tentativa de desescalonamento verbal, acompanhada de sedação medicamentosa imediata (ex: Haloperidol 5 mg + Midazolam 5 mg ou Prometazina 50 mg IM/IV). Monitorização de oximetria e sinais vitais.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de início da agitação</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 1 hora, há 12 horas"></div>`;
 return out;
}

registerQx('Agitação psicomotora',{
 anamnese:{
  sigla:'agi',
  blocks:[
   {key:'evolucao',label:'Evolução e Início Temporal',type:'radio',options:AGI_EVOL,autoOpenNext:'padrao'},
   {key:'padrao',label:'Padrão Comportamental e Agressividade',type:'tags',options:AGI_PADRAO,autoOpenNext:'psicoticos'},
   {key:'psicoticos',label:'Alterações Sensoperceptivas e de Pensamento',type:'tags',options:AGI_PSIC,autoOpenNext:'organica'},
   {key:'organica',label:'Investigação de Causas Orgânicas',type:'tags',options:AGI_ORG,autoOpenNext:'psiqHpp'},
   {key:'psiqHpp',label:'Histórico Psiquiátrico e MUC',type:'tags',options:AGI_PSIQ_HPP}
  ],
  after:agiAfter
 },
 hda:agiHda
});

