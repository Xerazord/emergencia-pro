/* ─── Sintetizador de História da Doença Atual (HDA) ─── */
function buildHDA(){
 const gen = S.sexo === 'F' ? 'Admitida' : S.sexo === 'M' ? 'Admitido' : 'Admitido(a)';
 let origContext = '';
 if(['Vaga Zero','Transferência'].includes(S.orig)){
  origContext = `proveniente de ${S.orig.toLowerCase()}${S.origInst ? ' da instituição ' + S.origInst : ''}${S.origMotivo ? ' por motivo de ' + S.origMotivo : ''}, `;
 }
 const tempoStr = S.tempo ? ` com início dos sintomas há ${S.tempo}` : '';
 const drugStr = S.queixa === 'Intoxicação exógena' && S.itDrug ? ` (substâncias suspeitas: ${S.itDrug})` : '';

 let qxContent = '';
 if(QX_HDA[S.queixa]){
  qxContent = QX_HDA[S.queixa](S).replace(/^\.\s*/, '').trim();
 } else if(S.caract && S.caract.length){
  qxContent = `caracterizada por ${joinAnd(S.caract.map(x=>x.toLowerCase()))}.`;
 }

 let hda = '';
 if(qxContent){
  // Normaliza e remove aberturas repetitivas como "Paciente relata...", "Paciente refere...", etc.
  const cleanQx = qxContent
   .replace(/^Paciente\s+(relata|refere|apresenta|informa|é\s+admitido\s+com|deu\s+entrada\s+com|evolui\s+com|avaliado\s+por|queixa-se\s+de|cursa\s+com|vítima\s+de)\s+(quadro\s+de\s+|episódio\s+de\s+|queixa\s+de\s+|relato\s+de\s+estado\s+)?/i, '')
   .replace(/^(quadro\s+de\s+|episódio\s+de\s+|relato\s+de\s+estado\s+)/i, '')
   .trim();

  if(/^(caracterizad[ao]|apresentando|com|cursando|manifestand|após|decorrente|segundo|vítima|em\s+avaliação)/i.test(cleanQx)){
   hda = `${gen} ${origContext}com queixa principal de ${S.queixa}${drugStr}${tempoStr}, ${cleanQx}`;
  } else if(/^[A-Z]/.test(cleanQx)){
   hda = `${gen} ${origContext}com queixa principal de ${S.queixa}${drugStr}${tempoStr}. ${cleanQx}`;
  } else {
   hda = `${gen} ${origContext}com queixa principal de ${S.queixa}${drugStr}${tempoStr}, caracterizada por ${cleanQx}`;
  }
 } else {
  hda = `${gen} ${origContext}com queixa principal de ${S.queixa}${drugStr}${tempoStr}.`;
 }

 hda = hda.replace(/\s+/g,' ')
          .replace(/\s+\./g,'.')
          .replace(/\s+,/g,',')
          .replace(/\.\.+/g,'.')
          .replace(/,\s*\./g,'.')
          .replace(/,\s*,/g,',')
          .trim();
 if(!hda.endsWith('.')) hda += '.';
 return `# HISTÓRIA DA DOENÇA ATUAL\n${hda}`;
}
