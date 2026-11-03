/* ─── Ciclo Mestre de Renderização Reativa & Preservação de Foco ─── */
function captureFocusState(){
 if(typeof document === 'undefined') return null;
 const el = document.activeElement;
 if(!el || el === document.body || !['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return null;

 let path = [];
 if(el.id){
  path = ['id', el.id];
 } else {
  const stepCard = el.closest('[id^="step-"], .card, .csec, .srow');
  const cardId = stepCard ? (stepCard.id || stepCard.className) : '';
  const oninputAttr = el.getAttribute('oninput') || '';
  const onchangeAttr = el.getAttribute('onchange') || '';
  const placeholder = el.getAttribute('placeholder') || '';
  const type = el.type || '';
  path = ['sig', el.tagName, cardId, oninputAttr, onchangeAttr, placeholder, type];
 }

 return {
  path,
  start: (el.selectionStart !== undefined) ? el.selectionStart : null,
  end: (el.selectionEnd !== undefined) ? el.selectionEnd : null,
  scrollLeft: el.scrollLeft,
  scrollTop: el.scrollTop
 };
}

function restoreFocusState(st){
 if(!st || typeof document === 'undefined') return;
 let el = null;
 if(st.path[0] === 'id'){
  el = document.getElementById(st.path[1]);
 } else if(st.path[0] === 'sig'){
  const [_, tagName, cardId, oninputAttr, onchangeAttr, placeholder, type] = st.path;
  const container = (cardId && document.getElementById(cardId)) ? document.getElementById(cardId) : document;
  const candidates = container.querySelectorAll(tagName.toLowerCase());
  for(const cand of candidates){
   if(oninputAttr && cand.getAttribute('oninput') === oninputAttr){ el = cand; break; }
   if(onchangeAttr && cand.getAttribute('onchange') === onchangeAttr){ el = cand; break; }
   if(placeholder && cand.getAttribute('placeholder') === placeholder){ el = cand; break; }
  }
 }
 if(el && typeof el.focus === 'function'){
  try{ el.focus({ preventScroll: true }); }catch(e){ el.focus(); }
  if(st.start !== null && st.end !== null && typeof el.setSelectionRange === 'function'){
   try{ el.setSelectionRange(st.start, st.end); }catch(e){}
  }
  if(st.scrollTop) el.scrollTop = st.scrollTop;
  if(st.scrollLeft) el.scrollLeft = st.scrollLeft;
 }
}

function render(){
 const scrollX = (typeof window !== 'undefined') ? (window.scrollX || window.pageXOffset || 0) : 0;
 const scrollY = (typeof window !== 'undefined') ? (window.scrollY || window.pageYOffset || 0) : 0;
 const focusState = (typeof captureFocusState === 'function') ? captureFocusState() : null;

 rs();
 updateStickyClinicalCockpit();
 const c=document.getElementById('con');
 if(c) c.innerHTML=s0()+s1()+s2()+s3()+s4()+s5();
 const rt=document.getElementById('relTxt');
 if(rt)rt.textContent=S.relMode==='resumo'?gResumo():gRel();
 if(typeof autoSave==='function')autoSave();
 updateRelCol();
 updateDecisionConflictBadge();
 if(_isCockpitPanelOpen)renderCockpitDecisionPanel();
 if(document.getElementById('fabDrawerOverlay')?.style.display==='flex')updateFabDrawerText();
 if(_pendingScroll){
  const el=document.getElementById(_pendingScroll);
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  _pendingScroll=null;
 } else if(typeof window !== 'undefined' && (scrollX || scrollY)) {
  window.scrollTo(scrollX, scrollY);
 }
 if(focusState && typeof restoreFocusState === 'function'){
  restoreFocusState(focusState);
 }
}

