/* ─── Passo 4: Impressão Diagnóstica, Síndromes Clínicas & Condutas Unificadas ─── */

function rCSec(sid,sec){const items=sec.it||[];const dc=items.filter((_,i)=>S.chk[sid+'_'+sec.id+'_'+i]).length;const alertsHtml='';const catNames={sup:'Suporte & Ressuscitação',inv:'Investigação',sin:'Sintomáticos',esp:'Específico',dsp:'Disposição/Alta'};const tagLbl=catNames[sec.id]||'';const tagHtml=tagLbl?`<span class="csec-tag csec-tag-${sec.id}">${tagLbl}</span>`:'';const uid='cs_'+sid+'_'+sec.id;const isCollapsedByDefault=(S.ef==='amb'&&sec.id==='sup'&&dc===0);const openCls=isCollapsedByDefault?'':' open';const badgeHint=isCollapsedByDefault?`<span class="sb" style="font-size:10px;background:#f3f4f6;color:#6b7280;margin-left:4px"><i class="ti ti-chevron-right" aria-hidden="true"></i> recolhido no ambulatorial (clique para abrir)</span>`:'';return`<div class="csec csec-${sec.id}"><div class="csh" onclick="tog('${uid}')"><span style="display:flex;align-items:center;gap:6px">${tagHtml}<span>${sec.t}</span>${badgeHint}</span><div style="display:flex;gap:5px;align-items:center">${dc?`<span class="sb sok" style="font-size:11px">${dc} prescrito${dc>1?'s':''}</span>`:''}<i class="ti ti-chevron-down" aria-hidden="true"></i></div></div><div class="csb${openCls}" id="${uid}">${alertsHtml}${items.map((item,idx)=>{const k=sid+'_'+sec.id+'_'+idx;const cl=ccls(k);const hl=itemHasVitalHl(item)?' hl':'';return`<div class="chk ${cl}${hl}" onclick="cyc('${k}')"><div class="cico"><i class="ti ${cico(k)}" aria-hidden="true"></i></div><div class="ctx">${item}</div></div>`;}).join('')}<div style="margin-top:8px"><label style="margin-bottom:3px;display:block;font-size:12px;color:var(--color-text-secondary)">Observações desta seção:</label><textarea style="min-height:45px;font-size:13px" placeholder="Particularidades do caso..." oninput="S.nts['${sid}_${sec.id}']=this.value">${esc(S.nts[sid+'_'+sec.id]||'')}</textarea></div></div></div>`;}

function rMomentoZeroBlock(sid,T){
 if(!T||!T.s||!T.s.length)return '';
 const totSel=T.s.reduce((a,sec)=>a+(sec.it||[]).filter((_,i)=>S.chk[sid+'_'+sec.id+'_'+i]).length,0);
 const inlineAlerts=getInlineAlerts();
 const alertsHtml=inlineAlerts.length?`<div class="abox aw" style="margin-bottom:8px;font-size:12.5px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>Alertas de Antecedentes e Medicações:</strong><ul style="margin:4px 0 0 18px;padding:0">${inlineAlerts.map(a=>`<li style="margin-bottom:3px">${esc(a)}</li>`).join('')}</ul></div>`:'';

 const m0Subtitle=sid==='cho'
  ?'Protocolo Pessoal de Choque: Estabilização, POCUS, Débito e Avaliação de Congestão VCI/Doppler + Fail-safe Empírico'
  :'Estabilização Imediata, Suporte Vital & Investigação Inicial Comum';

 return `
  <div class="card" style="border-top:3px solid #3b82f6">
   <div class="st" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <span style="display:flex;align-items:center;gap:7px">
     <i class="ti ti-clock-play" style="color:#2563eb" aria-hidden="true"></i>
     <span><strong>MOMENTO ZERO:</strong> Abordagem Sindrômica Base — ${esc(T.l)}</span>
    </span>
    <span class="sb sok" style="font-size:11px;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe">Condutas Iniciais / Pré-Diagnóstico</span>
   </div>
   <div class="sl" style="margin-top:-2px;margin-bottom:10px;font-size:12px;color:var(--color-text-secondary)">
    <i class="ti ti-info-circle" aria-hidden="true"></i> ${esc(m0Subtitle)}
   </div>
   ${alertsHtml}
   ${totSel?`
    <div class="psm" style="background:#f0fdf4;border-color:#bbf7d0;margin-bottom:10px">
     <span class="psml" style="color:#15803d"><i class="ti ti-clipboard-check" aria-hidden="true"></i> Prescrição ativa do Momento 0:</span>
     <span class="psmb" style="background:#dcfce7;color:#15803d">${totSel} ite${totSel>1?'ns':'m'} selecionado${totSel>1?'s':''}</span>
    </div>`:''}
   ${T.s.map(sec=>rCSec(sid,sec)).join('')}
  </div>
 `;
}

function rMomento1TrabalhoBlock(subId,subT){
 if(!subT||!subT.s||!subT.s.length)return '';
 const totSel=subT.s.reduce((a,sec)=>a+(sec.it||[]).filter((_,i)=>S.chk[subId+'_'+sec.id+'_'+i]).length,0);
 return `
  <div class="card" style="border-top:3px solid #a32d2d">
   <div class="st" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <span style="display:flex;align-items:center;gap:7px">
     <i class="ti ti-target" style="color:#a32d2d" aria-hidden="true"></i>
     <span><strong>MOMENTO 1:</strong> Diagnóstico de Trabalho Adotado — ${esc(subT.l)}</span>
    </span>
    <span class="sb" style="font-size:11px;background:#fcebeb;color:#a32d2d;border:1px solid #f09595">Terapêutica Ativa Completa</span>
   </div>
   <div class="sl" style="margin-top:-2px;margin-bottom:10px;font-size:12px;color:var(--color-text-secondary)">
    <i class="ti ti-shield-check" aria-hidden="true"></i> Conduta específica completa para o mecanismo adotado (suporte, drogas específicas, sintomáticos e disposição).
   </div>
   ${totSel?`
    <div class="psm" style="background:#f0fdf4;border-color:#bbf7d0;margin-bottom:10px">
     <span class="psml" style="color:#15803d"><i class="ti ti-clipboard-check" aria-hidden="true"></i> Prescrição ativa do Momento 1:</span>
     <span class="psmb" style="background:#dcfce7;color:#15803d">${totSel} ite${totSel>1?'ns':'m'} selecionado${totSel>1?'s':''}</span>
    </div>`:''}
   ${subT.s.map(sec=>rCSec(subId,sec)).join('')}
  </div>
 `;
}

function rDifferentialsExamsBlock(subsinds){
 if(!subsinds||!subsinds.length)return '';
 const validSubs=subsinds.filter(sid=>CT[sid]);
 if(!validSubs.length)return '';

 let totalInvItems=0;
 validSubs.forEach(sid=>{
  const sObj=CT[sid];
  if(sObj&&sObj.s){
   const invSec=sObj.s.find(sec=>sec.id==='inv');
   if(invSec&&invSec.it){
    totalInvItems+=invSec.it.filter((_,i)=>S.chk[sid+'_inv_'+i]).length;
   }
  }
 });

 const cardsHtml=validSubs.map(sid=>{
  const sObj=CT[sid];
  const invSec=sObj.s?sObj.s.find(sec=>sec.id==='inv'):null;
  if(!invSec){
   return `
    <div style="margin-bottom:8px;padding:8px 12px;background:var(--color-background-secondary);border-radius:6px;font-size:12.5px">
     <strong>${esc(sObj.l)}:</strong> Sem exames adicionais cadastrados.
    </div>`;
  }
  return `
   <div style="margin-bottom:10px">
    <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:var(--color-text-primary)">
     <i class="ti ti-microscope" style="color:#059669" aria-hidden="true"></i> Exames para descarte: ${esc(sObj.l)}
    </div>
    ${rCSec(sid,invSec)}
   </div>`;
 }).join('');

 return `
  <div class="card" style="border-top:3px solid #059669">
   <div class="st" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <span style="display:flex;align-items:center;gap:7px">
     <i class="ti ti-zoom-check" style="color:#059669" aria-hidden="true"></i>
     <span><strong>MOMENTO 1:</strong> Diagnósticos Diferenciais a Descartar</span>
    </span>
    <span class="sb" style="font-size:11px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0">Apenas Exames Complementares</span>
   </div>
   <div class="abox ai" style="margin-bottom:10px;font-size:12.5px">
    <i class="ti ti-info-circle" aria-hidden="true"></i>
    <span><strong>Descarte seguro sem conflito terapêutico:</strong> Os diagnósticos diferenciais selecionados disponibilizam <em>exclusivamente</em> seus exames de investigação complementar, evitando a prescrição acidental de condutas terapêuticas contraditórias com o diagnóstico de trabalho.</span>
   </div>
   ${totalInvItems?`
    <div class="psm" style="background:#f0fdf4;border-color:#bbf7d0;margin-bottom:10px">
     <span class="psml" style="color:#15803d"><i class="ti ti-clipboard-check" aria-hidden="true"></i> Exames de descarte selecionados:</span>
     <span class="psmb" style="background:#dcfce7;color:#15803d">${totalInvItems} ite${totalInvItems>1?'ns':'m'}</span>
    </div>`:''}
   ${cardsHtml}
  </div>
 `;
}

function suggestSindFromABC(){
 if(S.ef!=='crit')return null;
 const a=S.abc,g=gcs(),va=vA();
 const pasMatch=S.pa&&S.pa.includes('/')?parseFloat(S.pa.split('/')[0]):NaN;
 const sat=parseFloat(S.sat);
 if(a.va==='Obstruída')return {id:null,l:'Via aérea obstruída',hint:'Manejo imediato de via aérea antes de qualquer outra conduta'};
 if(g<=8)return {id:'rnc',l:'Rebaixamento de consciência',hint:`Glasgow ${g}/15 — considerar IOT e proteção de via aérea`};
 if(a.tec==='> 5s'||a.pul==='Filiformes'||a.pul==='Ausentes'||(pasMatch&&pasMatch<90)||va.includes('Hipotensão'))return {id:'cho',l:'Choque',hint:'Sinais clínicos de hipoperfusão — ressuscitação volêmica + identificar etiologia (séptico/hipovolêmico/cardiogênico/obstrutivo)'};
 if(a.def&&a.def.length&&g<15)return {id:'neu',l:'Síndrome neurovascular (AVC/AIT)',hint:'Déficit focal + alteração de consciência — TC crânio em < 25 min'};
 if(sat&&sat<90&&a.rud&&a.rud.includes('Crépitos'))return {id:'dsp',l:'Dispneia',hint:'Hipoxemia + creptações — EAP/pneumonia/SDRA são prioridades'};
 if(sat&&sat<90&&a.esf&&(a.esf.includes('Dispneia')||a.esf.includes('Uso de musculatura acessória')||a.esf.includes('Uso musc. acessória')))return {id:'dsp',l:'Dispneia',hint:'Hipoxemia + esforço respiratório — DPOC/asma/EAP/TEP'};
 return null;
}
function applySindSuggestion(id){if(!id)return;S.sind=id;S.chk={};S.nts={};S.subsind=null;S.subsinds=[];S.syndromeGridCollapsed=true;render();}
function s4ImpHeader(){
 const sug=suggestSindFromABC();
 const sugHtml=(sug&&!S.sind)?`<div class="abox aw" style="margin-bottom:12px;font-size:13px"><i class="ti ti-bulb" aria-hidden="true"></i> <strong>Sugestão do ABCDE:</strong> ${esc(sug.l)}. ${esc(sug.hint)}${sug.id?` <button class="xbtn" style="margin-left:6px;padding:3px 8px;font-size:12px" onclick="applySindSuggestion('${sug.id}')">Aplicar sugestão</button>`:''}</div>`:'';
 return `<div id="step-4" class="card"><div class="st"><i class="ti ti-clipboard-check" aria-hidden="true"></i> Impressão clínica e síndrome</div>${sugHtml}<div style="margin-bottom:12px"><label>Impressão clínica livre</label><textarea oninput="S.imp=this.value" placeholder="Descreva sua impressão diagnóstica...">${esc(S.imp)}</textarea></div>`;
}
function s4Grid(){return `${s4ImpHeader()}<div class="sl">Síndrome clínica suspeita:</div><div class="sgrid" id="syndrome-grid">${SLIST.map(s=>`<button class="xbtn ${S.sind===s.id?'on':''}" onclick="S.sind=S.sind==='${s.id}'?null:'${s.id}';S.chk={};S.nts={};S.subsind=null;S.subsinds=[];S.syndromeGridCollapsed=true;render()">${s.l}</button>`).join('')}</div></div>`;}
function s4ResetBtn(){return `<div style="margin-bottom:10px"><button class="xbtn" onclick="S.syndromeGridCollapsed=false;render()" style="width:100%;padding:8px;font-size:13px"><i class="ti ti-arrow-left" aria-hidden="true"></i> Voltar ao seletor</button></div>`;}
function s4SubExcl(T){
 const isM2=MOMENTO_2_SYNDROMES.includes(S.sind);
 const prefix=isM2?'MOMENTO 1 — Diagnóstico de Trabalho Adotado: ':'';
 const lbl=S.sind==='dtx'?(prefix+'Approach / Probabilidade clínica:'):S.sind==='cho'?(prefix+'Fenótipo hemodinâmico / Apresentação:'):S.sind==='dsp'?'Fenótipo hemodinâmico / Apresentação:':S.sind==='neu'?(prefix+'Etiologia neurovascular / Apresentação:'):S.sind==='hdg'?'Origem presumida do sangramento:':S.sind==='abd'?(prefix+'Mecanismo sindrômico (WSES 2022):'):S.sind==='ict'?'Fenótipo de acometimento hepático:':S.sind==='pal'?'Ritmo eletrocardiográfico / Tipo de arritmia:':S.sind==='int'?(prefix+'Toxídrome clínica / Agente presumido:'):S.sind==='rnc'?(prefix+'Etiologia principal presumida:'):S.sind==='dlb'?'Mecanismo etiológico / Sinais de alarme:':S.sind==='emmi'?'Padrão clínico e distribuição (Wells / WSES):':'Subtipo clínico:';
 return `<div class="card"><div class="st"><i class="ti ti-git-branch" aria-hidden="true"></i> ${lbl}</div><div class="sgrid">${T.subExcl.map(s=>`<button class="xbtn ${S.subsind===s.id?'on':''}" onclick="selSub('${s.id}')">${s.l}</button>`).join('')}</div></div>`;
}
function s4SubAdd(T){
 const isM2=MOMENTO_2_SYNDROMES.includes(S.sind);
 const prefix=isM2?'MOMENTO 1 — Diferenciais a Descartar (Exames): ':'';
 const lbl=S.sind==='dtx'?(prefix+'Ameaças à vida & diagnósticos diferenciais:'):S.sind==='cho'?(prefix+'Ameaças mecânicas / causas a descartar:'):S.sind==='dsp'?'Etiologias associadas / Descompensação:':S.sind==='neu'?(prefix+'Complicações e diferenciais associados:'):S.sind==='hdg'?'Complicações / Instabilidade associada:':S.sind==='abd'?(prefix+'Diferenciais e complicações associadas:'):S.sind==='ict'?'Complicações sistêmicas associadas:':S.sind==='pal'?'Complicações hemodinâmicas / Causas associadas:':S.sind==='int'?(prefix+'Complicações sistêmicas a descartar:'):S.sind==='rnc'?(prefix+'Condições associadas / secundárias:'):S.sind==='dlb'?'Complicações sistêmicas associadas:':S.sind==='emmi'?'Complicações vasculares e sistêmicas associadas:':S.sind==='feb'?'Disfunções orgânicas e focos associados:':'Subsíndromes presentes:';
 return `<div class="card"><div class="st"><i class="ti ti-list-tree" aria-hidden="true"></i> ${lbl}</div><div class="sgrid">${T.subAdd.map(s=>`<button class="xbtn ${S.subsinds.includes(s.id)?'on':''}" onclick="toggleSub('${s.id}')">${s.l}</button>`).join('')}</div></div>`;
}
function s4Nav(){return '';}
function rInteractiveDifferentialsCard(T){
 if(!T||!T.subAdd||!T.subAdd.length)return '';
 const isM2=MOMENTO_2_SYNDROMES.includes(S.sind);
 const title=S.sind==='dtx'
   ?'MOMENTO 1 — Diagnósticos Diferenciais & Ameaças à Vida'
   :'MOMENTO 1 — Diagnósticos Diferenciais & Condições Associadas';
 const badgeTxt='Descarte Seguro (Exames Inline)';
 
 const itemsHtml=T.subAdd.map(sub=>{
  const isSelected=S.subsinds.includes(sub.id);
  const sObj=CT[sub.id];
  const invSec=sObj&&sObj.s?sObj.s.find(sec=>sec.id==='inv'):null;
  const invCount=invSec&&invSec.it?invSec.it.filter((_,i)=>S.chk[sub.id+'_inv_'+i]).length:0;

  let bodyHtml='';
  if(isSelected){
   if(invSec&&invSec.it&&invSec.it.length){
    bodyHtml=`
     <div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--color-border);background:var(--color-background-primary);padding:10px;border-radius:6px">
      <div style="font-size:12px;font-weight:600;margin-bottom:6px;color:#059669;display:flex;align-items:center;gap:6px">
       <i class="ti ti-microscope" aria-hidden="true"></i> Exames direcionados para afastar ou confirmar:
      </div>
      ${rCSec(sub.id,invSec)}
     </div>`;
   } else {
    bodyHtml=`
     <div style="margin-top:8px;font-size:12px;color:var(--color-text-secondary);font-style:italic">
      Sem exames investigativos específicos adicionais cadastrados no catálogo.
     </div>`;
   }
  }

  const borderStyle=isSelected?'border:1.5px solid #059669;background:#f0fdf4':'border:1px solid var(--color-border);background:var(--color-background-secondary)';

  return `
   <div style="margin-bottom:10px;padding:12px;border-radius:8px;transition:all 0.15s ease;${borderStyle}">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
     <div style="display:flex;align-items:center;gap:8px">
      <i class="ti ${isSelected?'ti-zoom-check':'ti-circle'}" style="color:${isSelected?'#059669':'var(--color-text-secondary)'};font-size:16px" aria-hidden="true"></i>
      <strong style="font-size:13.5px;color:var(--color-text-primary)">${esc(sub.l)}</strong>
      ${invCount?`<span class="sb sok" style="font-size:11px;background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:10px">${invCount} exame${invCount>1?'s':''} prescrito${invCount>1?'s':''}</span>`:''}
     </div>
     <div>
      ${isSelected?`
       <button class="xbtn on" style="font-size:12px;padding:4px 10px;background:#059669;color:#fff;border-color:#047857" onclick="toggleSub('${sub.id}')">
        <i class="ti ti-check" aria-hidden="true"></i> Investigar / Suspeitado
       </button>
      `:`
       <button class="xbtn" style="font-size:12px;padding:4px 10px" onclick="toggleSub('${sub.id}')">
        <i class="ti ti-plus" aria-hidden="true"></i> Afastado / Não suspeitado
       </button>
      `}
     </div>
    </div>
    ${bodyHtml}
   </div>
  `;
 }).join('');

 return `
  <div class="card" style="border-top:3px solid #059669">
   <div class="st" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <span style="display:flex;align-items:center;gap:7px">
     <i class="ti ti-zoom-check" style="color:#059669" aria-hidden="true"></i>
     <span><strong>${esc(title)}</strong></span>
    </span>
    <span class="sb" style="font-size:11px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0">${esc(badgeTxt)}</span>
   </div>
   <div class="abox ai" style="margin-bottom:12px;font-size:12.5px;line-height:1.45">
    <i class="ti ti-info-circle" aria-hidden="true"></i>
    <span><strong>Regra do Descarte Seguro:</strong> Clique em cada diferencial para abrir as opções de investigação complementar inline e prescrever os exames de descarte diretamente dentro do quadro.</span>
   </div>
   ${itemsHtml}
  </div>
 `;
}

function rUnifiedConductsBoard(T){
 if(!T)return '';
 const sid=S.sind;
 const subId=S.subsind;
 const subT=subId&&CT[subId]?CT[subId]:null;
 const diffList=(S.subsinds||[]).map(id=>CT[id]?{id,obj:CT[id]}:null).filter(Boolean);

 let totSel=0;
 if(T.s){
  T.s.forEach(sec=>{
   (sec.it||[]).forEach((_,i)=>{ if(S.chk[sid+'_'+sec.id+'_'+i]) totSel++; });
  });
 }
 if(subT&&subT.s){
  subT.s.forEach(sec=>{
   (sec.it||[]).forEach((_,i)=>{ if(S.chk[subId+'_'+sec.id+'_'+i]) totSel++; });
  });
 }
 diffList.forEach(d=>{
  if(d.obj&&d.obj.s){
   d.obj.s.forEach(sec=>{
    (sec.it||[]).forEach((_,i)=>{ if(S.chk[d.id+'_'+sec.id+'_'+i]) totSel++; });
   });
  }
 });

 const inlineAlerts=getInlineAlerts();
 const alertsHtml=inlineAlerts.length?`
  <div class="abox aw" style="margin-bottom:10px;font-size:12.5px">
   <i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>Alertas de Antecedentes e Medicações:</strong>
   <ul style="margin:4px 0 0 18px;padding:0">
    ${inlineAlerts.map(a=>`<li style="margin-bottom:3px">${esc(a)}</li>`).join('')}
   </ul>
  </div>`:'' ;

 const MACRO_DEFS=[
  {id:'macro_sup',primarySecId:'sup',name:'1. Suporte Imediato & Monitorização',secIds:['sup'],ico:'ti-first-aid-kit',tagCls:'csec-tag-sup'},
  {id:'macro_med',primarySecId:'esp',name:'2. Prescrição Médica & Tratamento',secIds:['esp','sin'],ico:'ti-pill',tagCls:'csec-tag-esp'},
  {id:'macro_dsp',primarySecId:'inv',name:'3. Propedêutica Diagnóstica & Destino',secIds:['inv','dsp'],ico:'ti-microscope',tagCls:'csec-tag-inv'}
 ];

 function shouldSuppressMotherItem(item, secId, sid){
  if(isOcaActive(S)){
   const l=item.toLowerCase();
   if(l.includes('heart')||l.includes('edacs')||l.includes('sem oca')||l.includes('alta e seguimento')){
    return true;
   }
  }
  return false;
 }

 // Deduplicação canônica em escopo geral do quadro: registra itens da síndrome-mãe
 const boardSeenCanonical = new Set();
 if(T.s){
  T.s.forEach(sec=>{
   (sec.it||[]).forEach(it=>{
    const ck = getCanonicalConductKey(it);
    if(ck) boardSeenCanonical.add(ck);
   });
  });
 }

 const renderedSections=MACRO_DEFS.map(macro=>{
  const motherEntries=[];
  macro.secIds.forEach(secId=>{
   const sec=T.s?T.s.find(s=>s.id===secId):null;
   if(sec&&sec.it){
    sec.it.forEach((item,idx)=>{
     if(shouldSuppressMotherItem(item,secId,sid)) return;
     motherEntries.push({item,idx,secId});
    });
   }
  });

  const subEntries=[];
  macro.secIds.forEach(secId=>{
   const sec=subT&&subT.s?subT.s.find(s=>s.id===secId):null;
   if(sec&&sec.it){
    sec.it.forEach((item,idx)=>{
     const ck = getCanonicalConductKey(item);
     if(secId === 'sup' && (ck || isGenericVitalSupportItem(item))){
      if(ck && !boardSeenCanonical.has(ck)) boardSeenCanonical.add(ck);
      return;
     }
     if(ck && boardSeenCanonical.has(ck)) return;
     if(ck) boardSeenCanonical.add(ck);
     subEntries.push({item,idx,secId});
    });
   }
  });

  const diffEntries=diffList.map(d=>{
   const fItems=[];
   macro.secIds.forEach(secId=>{
    const sec=d.obj.s?d.obj.s.find(s=>s.id===secId):null;
    if(sec&&sec.it){
     sec.it.forEach((item,idx)=>{
      const ck = getCanonicalConductKey(item);
      if(secId === 'sup' && (ck || isGenericVitalSupportItem(item))){
       if(ck && !boardSeenCanonical.has(ck)) boardSeenCanonical.add(ck);
       return;
      }
      if(ck && boardSeenCanonical.has(ck)) return;
      if(ck) boardSeenCanonical.add(ck);
      fItems.push({item,idx,secId});
     });
    }
   });
   if(!fItems.length) return null;
   return {id:d.id,label:d.obj.l,fItems};
  }).filter(Boolean);

  const totalItemsCount=motherEntries.length+subEntries.length+diffEntries.reduce((acc,d)=>acc+d.fItems.length,0);
  if(totalItemsCount===0)return '';

  let macroChecked=0;
  motherEntries.forEach(m=>{ if(S.chk[sid+'_'+m.secId+'_'+m.idx]) macroChecked++; });
  subEntries.forEach(s=>{ if(S.chk[subId+'_'+s.secId+'_'+s.idx]) macroChecked++; });
  diffEntries.forEach(d=>{
   d.fItems.forEach(df=>{ if(S.chk[d.id+'_'+df.secId+'_'+df.idx]) macroChecked++; });
  });

  const uid='cs_u_'+sid+'_'+macro.id;
  const isCollapsedByDefault=(S.ef==='amb'&&macro.id==='macro_sup'&&macroChecked===0);
  const openCls=isCollapsedByDefault?'':' open';
  const badgeHint=isCollapsedByDefault?`<span class="sb" style="font-size:10px;background:#f3f4f6;color:#6b7280;margin-left:4px"><i class="ti ti-chevron-right" aria-hidden="true"></i> recolhido no ambulatorial (clique para abrir)</span>`:'';

  const secAlertsHtml='';

  return `
   <div class="csec csec-${macro.primarySecId}" style="margin-bottom:12px">
    <div class="csh" onclick="tog('${uid}')">
     <span style="display:flex;align-items:center;gap:6px">
      <span class="csec-tag ${macro.tagCls}">${macro.name}</span>
      ${badgeHint}
     </span>
     <div style="display:flex;gap:5px;align-items:center">
      ${macroChecked?`<span class="sb sok" style="font-size:11px">${macroChecked} prescrito${macroChecked>1?'s':''}</span>`:''}
      <i class="ti ti-chevron-down" aria-hidden="true"></i>
     </div>
    </div>
    <div class="csb${openCls}" id="${uid}">
     ${secAlertsHtml}
     ${macro.id === 'macro_dsp' ? rExamUnificationCard() : ''}
     
     ${motherEntries.length?`
      <div style="margin-bottom:8px">
       ${(subEntries.length||diffEntries.length)?`<div style="font-size:11.5px;font-weight:600;color:var(--color-text-secondary);text-transform:uppercase;margin-bottom:4px;letter-spacing:0.5px">Condutas Gerais — ${esc(T.l)}:</div>`:''}
       ${motherEntries.map(({item,idx,secId})=>{
        const k=sid+'_'+secId+'_'+idx;
        const cl=ccls(k);
        const hl=itemHasVitalHl(item)?' hl':'';
        const evKey=getEvidenceKeyForItem(item);
        const evBtn=evKey?`<button type="button" class="evidence-info-btn" onclick="event.stopPropagation();showEvidencePopover(event,'${evKey}')" title="Ver diretriz e evidência clínica" aria-label="Ver evidência"><i class="ti ti-info-circle"></i></button>`:'';
        return `
         <div class="chk ${cl}${hl}" onclick="cyc('${k}')">
          <div class="cico"><i class="ti ${cico(k)}" aria-hidden="true"></i></div>
          <div class="ctx">${item}${evBtn}</div>
         </div>`;
       }).join('')}
      </div>`:''}

     ${subEntries.length?`
      <div style="margin-top:10px;margin-bottom:8px;padding-top:8px;border-top:1px dashed var(--color-border)">
       <div style="font-size:12px;font-weight:600;color:#991b1b;margin-bottom:6px;display:flex;align-items:center;gap:6px">
        <i class="ti ti-target" aria-hidden="true"></i> Conduta Específica — ${esc(subT.l)}:
       </div>
       ${subEntries.map(({item,idx,secId})=>{
        const k=subId+'_'+secId+'_'+idx;
        const cl=ccls(k);
        const hl=itemHasVitalHl(item)?' hl':'';
        const evKey=getEvidenceKeyForItem(item);
        const evBtn=evKey?`<button type="button" class="evidence-info-btn" onclick="event.stopPropagation();showEvidencePopover(event,'${evKey}')" title="Ver diretriz e evidência clínica" aria-label="Ver evidência"><i class="ti ti-info-circle"></i></button>`:'';
        return `
         <div class="chk ${cl}${hl}" onclick="cyc('${k}')">
          <div class="cico"><i class="ti ${cico(k)}" aria-hidden="true"></i></div>
          <div class="ctx"><span style="display:inline-block;padding:1px 5px;background:#fcebeb;color:#991b1b;border-radius:4px;font-size:11px;font-weight:600;margin-right:6px">[${esc(subT.l)}]</span>${item}${evBtn}</div>
         </div>`;
       }).join('')}
      </div>`:''}

     ${diffEntries.map(d=>`
      <div style="margin-top:10px;margin-bottom:8px;padding-top:8px;border-top:1px dashed var(--color-border)">
       <div style="font-size:12px;font-weight:600;color:#047857;margin-bottom:6px;display:flex;align-items:center;gap:6px">
        <i class="ti ti-zoom-check" aria-hidden="true"></i> Conduta Direcionada — ${esc(d.label)}:
       </div>
       ${d.fItems.map(({item,idx,secId})=>{
        const k=d.id+'_'+secId+'_'+idx;
        const cl=ccls(k);
        const hl=itemHasVitalHl(item)?' hl':'';
        const evKey=getEvidenceKeyForItem(item);
        const evBtn=evKey?`<button type="button" class="evidence-info-btn" onclick="event.stopPropagation();showEvidencePopover(event,'${evKey}')" title="Ver diretriz e evidência clínica" aria-label="Ver evidência"><i class="ti ti-info-circle"></i></button>`:'';
        return `
         <div class="chk ${cl}${hl}" onclick="cyc('${k}')">
          <div class="cico"><i class="ti ${cico(k)}" aria-hidden="true"></i></div>
          <div class="ctx"><span style="display:inline-block;padding:1px 5px;background:#dcfce7;color:#15803d;border-radius:4px;font-size:11px;font-weight:600;margin-right:6px">[${esc(d.label)}]</span>${item}${evBtn}</div>
         </div>`;
       }).join('')}
      </div>
     `).join('')}

     <div style="margin-top:8px">
      <label style="margin-bottom:3px;display:block;font-size:12px;color:var(--color-text-secondary)">Observações desta macro-seção:</label>
      <textarea style="min-height:45px;font-size:13px" placeholder="Particularidades de ${macro.name.toLowerCase()}..." oninput="S.nts['${sid}_${macro.primarySecId}']=this.value">${esc(S.nts[sid+'_'+macro.primarySecId]||macro.secIds.map(sId=>S.nts[sid+'_'+sId]).filter(Boolean).join(' | '))}</textarea>
     </div>
    </div>
   </div>
  `;
 }).filter(Boolean).join('');

 return `
  <div class="card" style="border-top:3px solid #2563eb">
   <div class="st" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <span style="display:flex;align-items:center;gap:7px">
     <i class="ti ti-clipboard-list" style="color:#2563eb" aria-hidden="true"></i>
     <span><strong>Prescrição & Condutas por Macro-Seções — ${esc(T.l)}</strong></span>
    </span>
    <span class="sb sok" style="font-size:11px;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe">
     ${totSel?`${totSel} ite${totSel>1?'ns':'m'} selecionado${totSel>1?'s':''}`:'Seleção Direta de 1 Clique'}
    </span>
   </div>
   <div class="sl" style="margin-top:-2px;margin-bottom:10px;font-size:12px;color:var(--color-text-secondary)">
    <i class="ti ti-info-circle" aria-hidden="true"></i> Condutas consolidadas em 3 macro-seções práticas de emergência (Suporte Imediato, Prescrição & Tratamento, Propedêutica & Destino). Ícone <i class="ti ti-info-circle" style="color:#2563eb"></i> exibe diretriz e evidência clínica on-demand.
   </div>
   ${alertsHtml}
   ${renderedSections}
  </div>
 `;
}

function s4SyndromeFull(T){
 const parts=[];
 const isMomento2=MOMENTO_2_SYNDROMES.includes(S.sind);

 if(T.subExcl)parts.push(s4SubExcl(T));
 
 if(isMomento2){
  if(T.subAdd)parts.push(rInteractiveDifferentialsCard(T));
 } else {
  if(T.subAdd)parts.push(s4SubAdd(T));
 }

 const conflictAlerts=getConflictAlerts(S);
 if(conflictAlerts.length){
  parts.push(`
   <div class="conflict-banner-interactive" onclick="openDecisionDrawer('conflitos')">
    <span style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#991b1b">
     <i class="ti ti-shield-alert" style="font-size:18px;color:#dc2626" aria-hidden="true"></i>
     Atenção Farmacológica: ${conflictAlerts.length} conflito(s) terapêutico(s) identificado(s) entre condutas
    </span>
    <span style="font-size:12px;color:#b91c1c;text-decoration:underline;display:flex;align-items:center;gap:4px">
     Ver no Apoio à Decisão <i class="ti ti-arrow-right" aria-hidden="true"></i>
    </span>
   </div>
  `);
 }

 parts.push(rUnifiedConductsBoard(T));

 return parts.join('');
}
function s4(){
 if(!S.syndromeGridCollapsed)return s4Grid()+s4Nav();
 if(S.sind){const T=CT[S.sind];return `${s4ImpHeader()}</div>${s4ResetBtn()}${s4SyndromeFull(T)}${s4Nav()}`;}
 return s4Grid()+s4Nav();
}

