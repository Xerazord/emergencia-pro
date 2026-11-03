/* ─── Conduta, Prescrição Médica & Pendências de Plantão ─── */
function getActivePendingItems(){
 const T=S.sind?CT[S.sind]:null;
 const rawExams=[];
 const rawDisp=[];

 const isLabItem=(txt)=>{
  const t=txt.toLowerCase();
  if(t.includes('ringer')||t.includes('norepinefrina')||t.includes('noradrenalina')||t.includes('vasopressor')||t.includes('dobutamina')||t.includes('bolus')||t.includes('expansão')||t.includes('ressuscitação')) return false;
  return t.startsWith('solicito ')||t.startsWith('solicitar ')||t.startsWith('coleta de ')||t.includes('gasometria')||t.includes('hemocultura')||t.includes('lactato basal')||t.includes('lactato sérico');
 };

 const collect=(sid,sindObj)=>{
  if(!sindObj||!sindObj.s)return;
  sindObj.s.forEach(sec=>{
   (sec.it||[]).forEach((it,i)=>{
    if(S.chk[sid+'_'+sec.id+'_'+i]){
     if(sec.id==='inv') rawExams.push(it);
     else if(sec.id==='dsp') rawDisp.push(it);
     else if(sec.id==='sup'&&isLabItem(it)) rawExams.push(it);
    }
   });
  });
 };

 if(T){
  collect(S.sind,T);
  if(T.subExcl&&S.subsind&&CT[S.subsind])collect(S.subsind,CT[S.subsind]);
  if(T.subAdd){
   S.subsinds.forEach(id=>{
    if(CT[id]){
     if(MOMENTO_2_SYNDROMES.includes(S.sind)){
      const sObj=CT[id];
      if(sObj&&sObj.s){
       const invSec=sObj.s.find(sec=>sec.id==='inv');
       if(invSec){
        (invSec.it||[]).forEach((it,i)=>{
         if(S.chk[id+'_inv_'+i]) rawExams.push(it);
        });
       }
      }
     } else {
      collect(id,CT[id]);
     }
    }
   });
  }
 }

 const pList=[];

 // 1. Exames Laboratoriais (1 única linha sintética)
 const hasLab=rawExams.some(e=>{
  const t=e.toLowerCase();
  return t.includes('hemograma')||t.includes('gasometria')||t.includes('lactato')||
         t.includes('hemocultura')||t.includes('urina')||t.includes('eas')||
         t.includes('eletrólitos')||t.includes('creatinina')||t.includes('ureia')||
         t.includes('troponina')||t.includes('coagulograma')||t.includes('tp/inr')||
         t.includes('d-dímero')||t.includes('pcr')||t.includes('laborat')||
         t.includes('sorologia')||t.includes('líquor')||t.includes('amilase')||
         t.includes('bioquímic')||t.includes('cultura')||t.includes('coleta de');
 });

 // 2. Exames de Imagem (1 única linha sintética)
 const hasImg=rawExams.some(e=>{
  const t=e.toLowerCase();
  return t.includes('tc ')||t.includes('tc de')||t.includes('tomografia')||t.includes('radiografia')||
         t.includes('raio-x')||t.includes('rx ')||t.includes('rx de')||t.includes('ultrassom')||
         t.includes('usg')||t.includes('angiotc')||t.includes('ecocardiograma')||t.includes('eco ')||
         t.includes('ressonância')||t.includes('rm ')||t.includes('eda ')||
         t.includes('endoscopia')||t.includes('colonoscopia')||t.includes('doppler')||
         t.includes('arteriografia')||t.includes('cintilografia');
 });

 if(hasLab || (rawExams.length && !hasImg)){
  pList.push({type:'Laboratório', txt:'Aguardando resultados de exames laboratoriais (sangue/culturas/gasometria)'});
 }

 if(hasImg){
  const imgNames=[];
  rawExams.forEach(e=>{
   const t=e.toLowerCase();
   if(t.includes('angiotc')) imgNames.push('AngioTC');
   else if(t.includes('tc ')||t.includes('tc de')||t.includes('tomografia')) imgNames.push('TC');
   else if(t.includes('radiografia')||t.includes('raio-x')||t.includes('rx ')||t.includes('rx de')) imgNames.push('Rx');
   else if(t.includes('doppler')) imgNames.push('Doppler');
   else if(t.includes('ultrassom')||t.includes('usg')) imgNames.push('USG');
   else if(t.includes('ecocardiograma')||t.includes('eco ')) imgNames.push('Eco');
   else if(t.includes('ressonância')||t.includes('rm ')) imgNames.push('RM');
   else if(t.includes('eda ')||t.includes('endoscopia')) imgNames.push('EDA');
   else if(t.includes('colonoscopia')) imgNames.push('Colonoscopia');
   else if(t.includes('arteriografia')||t.includes('cintilografia')) imgNames.push('Imagem Especial');
  });
  const uImg=[...new Set(imgNames)];
  const label=uImg.length?` (${uImg.join(', ')})`:'';
  pList.push({type:'Imagem', txt:`Aguardando realização e laudo de exames de imagem${label}`});
 }

 // 3. Transferência / Regulação (1 única linha sintética)
 if(rawDisp.length){
  pList.push({type:'Transferência', txt:'Aguardando regulação de vaga e transferência hospitalar (CROSS / NIR / UTI)'});
 }

 // 4. Plantão manual
 if(S.condPendDesc&&S.condPendDesc.trim()){
  pList.push({type:'Plantão', txt:S.condPendDesc.trim()+(S.condPendPrazoMin?` (Prazo: ${S.condPendPrazoMin} min)`:'')});
 }

 return pList;
}

function buildCondutas(){
 const T=S.sind?CT[S.sind]:null;
 if(!T)return S.imp?`# IMPRESSÃO CLÍNICA E CONDUTA\n- ${S.imp}`:'';
 let subLabel='';
 if(T.subExcl&&S.subsind){const sx=T.subExcl.find(x=>x.id===S.subsind);if(sx)subLabel+=` (${sx.l})`;}
 if(T.subAdd&&S.subsinds.length){const labels=S.subsinds.map(id=>{const sa=T.subAdd.find(x=>x.id===id);return sa?sa.l:'';}).filter(Boolean);if(labels.length)subLabel+=`\nDiferenciais considerados: ${labels.join(', ')}`;}

 const collected=[];
 const collect=(sid,sindObj)=>{
  if(!sindObj||!sindObj.s)return;
  sindObj.s.forEach(sec=>{
   (sec.it||[]).forEach((it,i)=>{
    if(S.chk[sid+'_'+sec.id+'_'+i]){
     const nt=S.nts[sid+'_'+sec.id]||'';
     collected.push({
      sid,
      sindLabel:sindObj.l,
      secId:sec.id,
      secTitle:sec.t,
      item:it.trim(),
      note:nt.trim()
     });
    }
   });
  });
 };
 collect(S.sind,T);
 if(T.subExcl&&S.subsind&&CT[S.subsind])collect(S.subsind,CT[S.subsind]);
 if(T.subAdd){
  S.subsinds.forEach(id=>{
   if(CT[id]){
    collect(id, CT[id]);
   }
  });
 }

 // Deduplicação inteligente agressiva de itens idênticos ou redundantes
 const seenCanonical=new Set();
 const seenExact=new Set();
 let deduplicated=[];
 
 for(const c of collected){
  const cKey=getCanonicalConductKey(c.item);
  if(cKey){
   if(!seenCanonical.has(cKey)){
    seenCanonical.add(cKey);
    const cleanOrder=CANONICAL_PRESCRIPTION_ORDERS[cKey]||c.item;
    deduplicated.push({
     ...c,
     item:cleanOrder
    });
   }
   continue;
  }
  
  const cleanItem=cleanPrescriptionItem(c.item);
  const norm=cleanItem.toLowerCase();
  if(!seenExact.has(norm)){
   seenExact.add(norm);
   deduplicated.push({
    ...c,
    item:cleanItem
   });
  }
 }

 // Fusão inteligente e unificação de exames diagnósticos e complementares
 const examOrders = [];
 const nonExamOrders = [];
 deduplicated.forEach(c => {
  if (isExamOrder(c)) {
   examOrders.push(c);
  } else {
   nonExamOrders.push(c);
  }
 });

 const seenExamNames = new Set();
 const cleanedExamList = [];
 examOrders.forEach(c => {
  const name = cleanExamItemName(c.item);
  if(!name) return;
  const nL = name.toLowerCase();
  const subsetIdx = cleanedExamList.findIndex(existing => nL.includes(existing.toLowerCase()) && existing.length > 10);
  if (subsetIdx !== -1) {
   seenExamNames.delete(cleanedExamList[subsetIdx].toLowerCase());
   seenExamNames.add(nL);
   cleanedExamList[subsetIdx] = name;
   return;
  }
  const alreadyCovered = cleanedExamList.some(existing => existing.toLowerCase().includes(nL) && nL.length > 10);
  if (!alreadyCovered && !seenExamNames.has(nL)) {
   seenExamNames.add(nL);
   cleanedExamList.push(name);
  }
 });

 (S.customExams || []).forEach(name => {
  const trimmed = (name || '').trim();
  if (trimmed && !seenExamNames.has(trimmed.toLowerCase())) {
   seenExamNames.add(trimmed.toLowerCase());
   cleanedExamList.push(trimmed);
  }
 });

 if (cleanedExamList.length > 0) {
  const hasImagingOrMethods = cleanedExamList.some(name => {
   const l = name.toLowerCase();
   return l.includes('tc ') || l.includes('tomografia') || l.includes('angio') || 
          l.includes('radiografia') || l.includes('rx') || l.includes('pocus') || 
          l.includes('cultura') || l.includes('urina') || l.includes('ecg') || 
          l.includes('eletrocardiograma') || l.includes('ecocardiograma') || 
          l.includes('líquor') || l.includes('usg');
  }) || (S.customExams && S.customExams.length > 0);

  const titlePrefix = hasImagingOrMethods ? 'Solicitação de exames de urgência: ' : 'Exames laboratoriais de urgência: ';
  const fusedItem = {
   sid: examOrders[0] ? examOrders[0].sid : S.sind,
   sindLabel: examOrders[0] ? examOrders[0].sindLabel : '',
   secId: 'inv',
   secTitle: 'Exames Complementares',
   item: `${titlePrefix}${cleanedExamList.join(', ')}`,
   note: ''
  };
  deduplicated = [...nonExamOrders, fusedItem];
 } else {
  deduplicated = nonExamOrders;
 }

const filteredItems=[];
 const seenItems=new Set();
 deduplicated.forEach(entry=>{
  if(isOcaActive(S)){
   const l=entry.item.toLowerCase();
   if(l.includes('heart')||l.includes('edacs')||l.includes('sem oca')||l.includes('alta e seguimento')){
    return;
   }
  }
  const isDiff=entry.sid!==S.sind&&(T.subExcl?entry.sid!==S.subsind:true);
  let tag='';
  if(isDiff){
   const shortTag=entry.sid==='rnc'?'RNC':entry.sid==='con'?'Convulsão':entry.sid==='int'?'Intoxicação':entry.sid==='cho'?'Choque':entry.sid==='tep'?'TEP':entry.sid==='pntx'?'Pneumotórax':entry.sid==='peri'?'Tamponamento':entry.sindLabel;
   tag=`[${shortTag}] `;
  }
  let line=`- ${tag}${entry.item}`;
  if(entry.note){
   line+=` (Obs: ${entry.note})`;
  }
  if(!seenItems.has(line)){
   seenItems.add(line);
   filteredItems.push(line);
  }
 });

 let ct=`# CONDUTA & PLANO TERAPÊUTICO\n- Hipótese Diagnóstica: ${T.l}${subLabel}`;
 if(S.imp&&S.imp.trim()){
  ct+=`\n- Impressão Clínica: ${S.imp.trim()}`;
 }

 if(filteredItems.length){
  ct+='\n'+filteredItems.join('\n');
 } else {
  ct+=`\n- (Nenhuma conduta pré-formatada selecionada)`;
 }

 // QUADRO DE PENDÊNCIAS DE PLANTÃO
 const pList=getActivePendingItems();
 if(pList.length){
  ct+=`\n\n# PENDÊNCIAS DE PLANTÃO\n`+pList.map(p=>`- ⏳ ${p.type==='Plantão'?'Plantão: '+p.txt:(p.type==='Laboratório'?'Exames Laboratoriais: '+p.txt:(p.type==='Imagem'?'Exames de Imagem: '+p.txt:'Transferência / Regulação: '+p.txt))}`).join('\n');
 }

 return ct;
}
