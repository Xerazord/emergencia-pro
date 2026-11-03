/* ─── Scores Preditivos & Estratificação de Risco ─── */
function buildPredictiveScores(){
 const lines=[];
 if(S.queixa==='Dor torácica'){
  if(isOcaActive(S)){
   lines.push('- Escores HEART / EDACS: Contraindicados / Inaplicáveis na vigência de Oclusão Coronariana Aguda (OCA / STEMI). Indicação de reperfusão imediata (ESC / AHA).');
  } else {
   lines.push(`- HEAR: ${hSc()}/10 — ${hI(hSc())}`);
   const trop=S.edacs.t0||S.edacs.t2?' (Troponina 0h: '+(S.edacs.t0||'—')+' | 2h: '+(S.edacs.t2||'—')+')':'';
   lines.push(`- EDACS: ${eSc()} pts — ${eI()}${trop}`);
  }
 }
 if(S.wellsTep&&S.wellsTep.evaluated){
  lines.push(`- Escore de Wells para TEP: ${wellsTepSc().toFixed(1)} pts — ${wellsTepInterp(wellsTepSc())}`);
 }
 if(S.wellsTvp&&S.wellsTvp.evaluated){
  lines.push(`- Escore de Wells para TVP: ${wellsTvpSc()} pts — ${wellsTvpInterp(wellsTvpSc())}`);
 }
 if(S.nihss&&S.nihss.evaluated){
  lines.push(`- NIHSS (AVC Isquêmico / Hemorrágico): ${nihssSc()}/42 pts${nihssBreakdown()} — ${nihssInterp(nihssSc())}`);
 }
 if(S.alvarado&&S.alvarado.evaluated){
  lines.push(`- Escore de Alvarado (Apendicite Aguda): ${alvaradoSc()}/10 pts — ${alvaradoInterp(alvaradoSc())}`);
 }
 if(S.tokyo&&S.tokyo.evaluated){
  const tSt=tokyoStatus();
  lines.push(`- Critérios de Tokyo (TG18/TG20 - Colecistite): ${tSt.text}`);
 }
 if(S.psiPort&&S.psiPort.evaluated){
  const pSc=psiPortSc();
  lines.push(`- PSI / PORT (Pneumonia Adquirida na Comunidade): ${pSc} pts — ${psiPortClass(pSc)}`);
 }
 if(S.mascc&&S.mascc.evaluated){
  lines.push(`- Escore MASCC (Neutropenia Febril): ${masccSc()}/26 pts — ${masccInterp(masccSc())}`);
 }
 if(S.trmRules&&S.trmRules.evaluated){
  const tr=[];
  if(S.trmRules.cchrPos)tr.push('Canadian CT Head: Alto risco (TC de crânio indicada)');
  else if(S.trmRules.cchrMed)tr.push('Canadian CT Head: Risco médio (TC recomendada)');
  else tr.push('Canadian CT Head: Baixo risco');
  if(S.trmRules.ccsrHigh||S.trmRules.ccsrLow)tr.push('Canadian C-Spine: Positivo (Imagem cervical indicada)');
  else tr.push('Canadian C-Spine: Baixo risco (Sem imagem)');
  if(S.trmRules.nexusPos)tr.push('NEXUS: Critérios positivos (Imagem indicada)');
  else tr.push('NEXUS: Critérios negativos (Sem imagem cervical)');
  lines.push(`- Regras de Trauma (Canadian Head / Canadian C-Spine / NEXUS): ${tr.join(' | ')}`);
 }
 if(!lines.length)return '';
 return `# SCORES PREDITIVOS & ESTRATIFICAÇÃO DE RISCO\n${lines.join('\n')}`;
}
function buildScoresDT(){return buildPredictiveScores();}
function buildScoresSinc(){return '';}
