// ─── NIHSS (National Institutes of Health Stroke Scale) ─────────────────────
function nihssSc(){
 const n=S.nihss||{};
 return (+(n.loc||0))+(+(n.qLoc||0))+(+(n.cLoc||0))+(+(n.olhar||0))+(+(n.campo||0))+(+(n.face||0))+(+(n.bracoE||0))+(+(n.bracoD||0))+(+(n.pernaE||0))+(+(n.pernaD||0))+(+(n.ataxia||0))+(+(n.sensib||0))+(+(n.ling||0))+(+(n.disart||0))+(+(n.extin||0));
}
function nihssBreakdown(){
 const n=S.nihss||{};
 const map=[
  ['loc','1A'],['qLoc','1B'],['cLoc','1C'],
  ['olhar','2'],['campo','3'],['face','4'],
  ['bracoE','5A'],['bracoD','5B'],['pernaE','6A'],['pernaD','6B'],
  ['ataxia','7'],['sensib','8'],['ling','9'],['disart','10'],['extin','11']
 ];
 const abnormal=[];
 map.forEach(([k,code])=>{
  const val=+(n[k]||0);
  if(val>0){
   abnormal.push(`${code}.${val}`);
  }
 });
 return abnormal.length ? ` (${abnormal.join(' / ')})` : '';
}
function nihssInterp(pts){
 if(pts===0)return '0 pts — Sem déficit neurológico mensurável';
 if(pts<=4)return 'AVC Leve (avaliar se déficit é incapacitante para trombólise)';
 if(pts<=14)return 'AVC Moderado (indicação clássica de reperfusão / trombólise se em janela)';
 if(pts<=24)return 'AVC Grave (alta suspeita de oclusão de grande vaso — avaliar trombectomia)';
 return 'AVC Gravíssimo (prognóstico reservado / risco de transformação hemorrágica)';
}
function nihssBadgeClass(pts){return pts<=4?'sok':pts<=14?'smod':'sgr';}
function rNihss(){
 const n=S.nihss;
 const it=[
  {k:'loc',l:'1a. Nível de Consciência',o:[[0,'0-Alerta'],[1,'1-Sonolento'],[2,'2-Estupor'],[3,'3-Coma']]},
  {k:'qLoc',l:'1b. Perguntas LOC (Mês e Idade)',o:[[0,'0-Ambas certas'],[1,'1-Uma certa'],[2,'2-Nenhuma certa']]},
  {k:'cLoc',l:'1c. Comandos LOC (Olhos e Mão)',o:[[0,'0-Ambos certos'],[1,'1-Um certo'],[2,'2-Nenhum certo']]},
  {k:'olhar',l:'2. Movimentos Oculares (Olhar Conjugado)',o:[[0,'0-Normal'],[1,'1-Paresia parcial'],[2,'2-Desvio forçado']]},
  {k:'campo',l:'3. Campos Visuais (Hemianopsia)',o:[[0,'0-Normal'],[1,'1-Hemianopsia parcial'],[2,'2-Completa'],[3,'3-Cegueira/Bilateral']]},
  {k:'face',l:'4. Paralisia Facial',o:[[0,'0-Normal'],[1,'1-Mínima/assimetria'],[2,'2-Parcial inferior'],[3,'3-Completa/plegia']]},
  {k:'bracoE',l:'5a. Motor Braço Esquerdo (10 seg)',o:[[0,'0-Sem queda'],[1,'1-Queda s/ encostar'],[2,'2-Cai no leito'],[3,'3-Esforço s/ gravidade'],[4,'4-Plegia']]},
  {k:'bracoD',l:'5b. Motor Braço Direito (10 seg)',o:[[0,'0-Sem queda'],[1,'1-Queda s/ encostar'],[2,'2-Cai no leito'],[3,'3-Esforço s/ gravidade'],[4,'4-Plegia']]},
  {k:'pernaE',l:'6a. Motor Perna Esquerda (5 seg)',o:[[0,'0-Sem queda'],[1,'1-Queda s/ encostar'],[2,'2-Cai no leito'],[3,'3-Esforço s/ gravidade'],[4,'4-Plegia']]},
  {k:'pernaD',l:'6b. Motor Perna Direita (5 seg)',o:[[0,'0-Sem queda'],[1,'1-Queda s/ encostar'],[2,'2-Cai no leito'],[3,'3-Esforço s/ gravidade'],[4,'4-Plegia']]},
  {k:'ataxia',l:'7. Ataxia de Membros (Dismetria)',o:[[0,'0-Ausente'],[1,'1-Em 1 membro'],[2,'2-Em 2 membros']]},
  {k:'sensib',l:'8. Sensibilidade (Dor/Agulha)',o:[[0,'0-Normal'],[1,'1-Perda parcial'],[2,'2-Perda grave/total']]},
  {k:'ling',l:'9. Linguagem e Afasia',o:[[0,'0-Normal'],[1,'1-Afasia leve-mod'],[2,'2-Afasia grave'],[3,'3-Mudo/global']]},
  {k:'disart',l:'10. Disartria (Clareza da Fala)',o:[[0,'0-Normal'],[1,'1-Leve/moderada'],[2,'2-Grave/anartria']]},
  {k:'extin',l:'11. Extinção / Negligência',o:[[0,'0-Normal'],[1,'1-Inatenção parcial'],[2,'2-Negligência total']]}
 ];
 return it.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div></div><div class="sopts">${x.o.map(([v,lb])=>`<span class="sopt ${Number(n[x.k])===v?'on':''}" onclick="S.nihss['${x.k}']=${v};S.nihss.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}
