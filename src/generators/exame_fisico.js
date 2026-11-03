/* ─── Exame Físico (Ambulatorial vs. Crítico ABCDE), ECG & POCUS ─── */
function buildEcgText(){
 const e=S.ecgS;
 if(e.normal)return '# ELETROCARDIOGRAMA\n- Ritmo sinusal, FC normal, PR normal, QRS de eixo e duração normais, sem alterações de repolarização sugestivas de isquemia ou DHE.';
 const p=[];
 if(e.ritmo)p.push(`Ritmo: ${e.ritmo}`);
 if(e.fcEcg)p.push(`FC: ${e.fcEcg} bpm`);
 if(e.pr)p.push(`PR: ${e.pr}`);
 if(e.qrs)p.push(`QRS: ${e.qrs}`);
 if(e.qtc)p.push(`QTc: ${e.qtc}`);
 if(e.st&&e.st.length)p.push(`Segmento ST: ${e.st.join(', ')}`);
 if(e.ondaT&&e.ondaT.length)p.push(`Onda T: ${e.ondaT.join(', ')}`);
 if(e.padroes&&e.padroes.length)p.push(`Padrões: ${e.padroes.join(', ')}`);
 if(!p.length)return '';
 return '# ELETROCARDIOGRAMA\n'+p.map(x=>`- ${x}`).join('\n');
}
function buildPocText(){
 const p=S.pocS;
 const segs=[
  p.pulmao&&`Janela Pulmonar: ${p.pulmao}`,
  p.coracao&&`Janela Cardíaca: ${p.coracao}`,
  p.abdome&&`Janela Abdominal (FAST): ${p.abdome}`,
  p.mmii&&`Vascular MMII: ${p.mmii}`,
  p.outros&&`Outras Janelas: ${p.outros}`
 ].filter(Boolean);
 if(!segs.length)return '';
 return '# POCUS\n'+segs.map(s=>`- ${s}`).join('\n');
}

function buildEF(){
 const g=gcs();
 let ef='';
 if(S.ef==='amb'){
  ef=`- Geral: ${S.amb.g||'—'}\n`+
     `- Cardiovascular: ${S.amb.cv||'—'}\n`+
     `- Respiratório: ${S.amb.re||'—'}\n`+
     `- Abdome: ${S.amb.ab||'—'}\n`+
     `- Neurológico: ${S.amb.ne||'—'}\n`+
     `- Extremidades e Pele: ${S.amb.pe||'—'}`;
 } else if(S.ef==='crit'){
  const a=S.abc;
  const ausMap={'Regular':'Ritmo cardíaco regular, bulhas normofonéticas','Irregular':'Ritmo cardíaco irregular','Reduzida':'Fonese cardíaca reduzida','Sopro':'Presença de sopro cardíaco','Bulhas hipofonéticas':'Bulhas hipofonéticas'};
  const ausStr=a.aus&&a.aus.length?a.aus.map(x=>ausMap[x]||x).join(', '):'Ritmo cardíaco regular, bulhas normofonéticas';
  ef=`- A: Via aérea ${a.va.toLowerCase()}, fonação ${a.fon.toLowerCase()}${a.col === 'Colocado/Mantido' ? ', colar cervical mantido' : ', sem indicação de imobilização cervical'}.\n`+
     `- B: Expansibilidade torácica ${a.exp.toLowerCase()}${a.esf&&a.esf.length ? ', com sinais de esforço (' + a.esf.join(', ').toLowerCase() + ')' : ', sem esforço respiratório aparente'}; murmúrio vesicular ${a.mv.toLowerCase()}, ${a.rud&&a.rud.length ? 'com presença de ' + a.rud.join(', ').toLowerCase() : 'sem ruídos adventícios'}.\n`+
     `- C: Tempo de enchimento capilar ${a.tec}; ausculta cardíaca: ${ausStr}; pulsos periféricos ${a.pul.toLowerCase()}; abdome ${(a.abd&&a.abd.length ? a.abd.join(', ').toLowerCase() : 'sem alterações')}.\n`+
     `- D: Escala de Coma de Glasgow ${g}/15 (Abertura ocular: ${a.ao}, Resposta verbal: ${a.rv}, Resposta motora: ${a.rm}); pupilas ${a.pup.toLowerCase()}; ${a.def&&a.def.length ? 'déficits neurológicos focais: ' + a.def.join(', ') : 'sem déficits neurológicos focais'}.\n`+
     `- E: Membros inferiores ${a.ede === 'Presente' ? 'com edema (' + a.cac.toLowerCase() + ')' : 'sem edema'}; ectoscopia e pele: ${a.pel&&a.pel.length ? a.pel.join(', ').toLowerCase() : 'sem alterações agudas'}.`;
 }
 if(QX_EF_TEXT[S.queixa]){
  const extra=QX_EF_TEXT[S.queixa](S);
  if(extra){
   ef+=(ef?'\n':'')+`- Avaliação complementar: ${extra}`;
  }
 }
 return `# EXAME FÍSICO\n${ef}`;
}
