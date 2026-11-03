/* ─── Relatório de Admissão (gRel), Resumo de Plantão & Tríade PEP ─── */
function gRel(){
 const parts=[
  buildHeader(),
  buildHDA(),
  buildAntecedentes(),
  buildVitais(),
  buildEF(),
  buildPredictiveScores(),
  buildEcgText(),
  buildPocText(),
  buildCondutas()
 ].filter(Boolean);
 return parts.join('\n\n');
}

function gResumo(){
 const T=S.sind?CT[S.sind]:null;
 const now=new Date().toLocaleString('pt-BR');
 const id=`${S.nome||'Paciente'}, ${S.idade}a (${S.sexo||'Sexo não informado'})`;
 const queixa=S.queixa||'sem queixa registrada';
 const tempo=S.tempo?` há ${S.tempo}`:'';
 const va=vA();
 const n2=calcNEWS2(S);
 const n2Str=n2?` | NEWS2: ${n2.score} (${n2.nivelLabel})`:'';
 const vitais=`FC ${S.fc||'—'} | Sat ${S.sat||'—'}% | PA ${S.pa||'—'} | FR ${S.fr||'—'} | T ${S.temp||'—'}°C${n2Str}${va.length?' ⚠ '+va.join('; '):''}`;
 let dx='(sem hipótese)';
 if(T){
  let sub='';
  if(T.subExcl&&S.subsind){const sx=T.subExcl.find(x=>x.id===S.subsind);if(sx)sub+=` (${sx.l.toLowerCase()})`;}
  if(T.subAdd&&S.subsinds.length){const labs=S.subsinds.map(id=>{const sa=T.subAdd.find(x=>x.id===id);return sa?sa.l:'';}).filter(Boolean);if(labs.length)sub+=` + dif: ${labs.join(', ')}`;}
  dx=T.l+sub;
 }
 const imp=S.imp?` — ${S.imp.length>120?S.imp.slice(0,117)+'...':S.imp}`:'';

 const pends=getActivePendingItems();
 const pTop=pends.slice(0,5).map(p=>` - [${p.type}] ${p.txt.length>90?p.txt.slice(0,87)+'...':p.txt}`);
 const pendStr=pends.length?`Pendências ativas (${pends.length}):\n${pTop.join('\n')}${pends.length>5?`\n - ... e mais ${pends.length-5} pendências`:''}`:'Pendências ativas: nenhuma';
 return `# RESUMO DE PLANTÃO (${now})\n- ${id} — ${queixa}${tempo}\n- Vitais: ${vitais}\n- Dx: ${dx}${imp}\n- ${pendStr}`;
}

function pSumH(){
 const pends=getActivePendingItems();
 if(!pends.length)return'';
 const labCount=pends.filter(x=>x.type==='Laboratório').length;
 const imgCount=pends.filter(x=>x.type==='Imagem').length;
 const trCount=pends.filter(x=>x.type==='Transferência').length;
 const parts=[];
 if(labCount)parts.push(`${labCount} laboratório`);
 if(imgCount)parts.push(`${imgCount} imagem`);
 if(trCount)parts.push(`${trCount} transferência`);
 const detailStr=parts.length?` (${parts.join(', ')})`:'';
 return `<div class="psm" style="margin-bottom:12px;background:#fef3c7;border-color:#fde68a"><span class="psml" style="color:#92400e"><i class="ti ti-clock" aria-hidden="true"></i> Pendências de plantão:</span><span class="psmb" style="background:#fde68a;color:#92400e">${pends.length} ativa${pends.length>1?'s':''}${detailStr}</span></div>`;
}

