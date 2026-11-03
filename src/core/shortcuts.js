/* ─── FAB Drawer, Modal de Atalhos, Atalhos de Teclado & Controles de Layout ─── */
// ─── Floating Action Button (FAB) & Mobile Drawer ───
function updateFabDrawerText(){
 const ta = document.getElementById('fabDrawerTxt');
 if(!ta) return;
 ta.value = S.relMode==='resumo'?gResumo():gRel();
 const fb = document.getElementById('fabRelModeFull');
 const rb = document.getElementById('fabRelModeResumo');
 if(fb) fb.classList.toggle('on', S.relMode!=='resumo');
 if(rb) rb.classList.toggle('on', S.relMode==='resumo');
}
function openFabDrawer(){
 updateFabDrawerText();
 const el = document.getElementById('fabDrawerOverlay');
 if(el) el.style.display = 'flex';
}
function closeFabDrawer(){
 const el = document.getElementById('fabDrawerOverlay');
 if(el) el.style.display = 'none';
}
function toggleFabDrawer(){
 const el = document.getElementById('fabDrawerOverlay');
 if(el && el.style.display === 'flex') closeFabDrawer(); else openFabDrawer();
}
function copyFabDrawer(){
 const ta = document.getElementById('fabDrawerTxt');
 if(ta) navigator.clipboard.writeText(ta.value).then(()=>showToast('Copiado!'));
}
function saveReportFromFab(){
 const ta = document.getElementById('fabDrawerTxt');
 if(ta) saveReport(ta.value);
}

// ─── Modal de Ajuda de Atalhos de Teclado ───
function showShortcutModal(){
 const m = document.getElementById('shortcutModal');
 if(m) m.style.display = 'flex';
}
function closeShortcutModal(){
 const m = document.getElementById('shortcutModal');
 if(m) m.style.display = 'none';
}
function toggleShortcutModal(){
 const m = document.getElementById('shortcutModal');
 if(m && m.style.display === 'flex') closeShortcutModal(); else showShortcutModal();
}

// ─── Atalhos Globais de Teclado ───
if(typeof window !== 'undefined' && !window._globalKeydownAttached){
 window._globalKeydownAttached = true;
 window.addEventListener('keydown', (e)=>{
  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

  // Escape fecha qualquer modal ou painel aberto
  if (e.key === 'Escape') {
   closeShortcutModal();
   closeFabDrawer();
   closeCockpitDecisionPanel();
   closeDecisionDrawer();
   closeModalArea();
   const sm = document.getElementById('shiftModal'); if (sm && sm.style.display === 'flex') closeShiftModal();
   const am = document.getElementById('adminModal'); if (am && am.style.display === 'flex') closeAdminModal();
   return;
  }

  // ? ou Alt + / para abrir guia de atalhos
  if ((e.key === '?' || (e.altKey && (e.key === '/' || e.key === '?'))) && !isInput) {
   e.preventDefault();
   toggleShortcutModal();
   return;
  }

  // Alt + [0-5, N, P, C, D, S, R]
  if (e.altKey && !e.ctrlKey && !e.metaKey) {
   if (['0','1','2','3','4','5'].includes(e.key)) {
    e.preventDefault();
    gs(parseInt(e.key, 10));
    return;
   }
   if (e.key === 'n' || e.key === 'N' || e.key === 'ArrowRight') {
    e.preventDefault();
    nx();
    return;
   }
   if (e.key === 'p' || e.key === 'P' || e.key === 'ArrowLeft') {
    e.preventDefault();
    pv();
    return;
   }
   if (e.key === 'c' || e.key === 'C') {
    e.preventDefault();
    copyRelCol();
    return;
   }
   if (e.key === 'd' || e.key === 'D') {
    e.preventDefault();
    toggleCockpitDecisionPanel();
    return;
   }
   if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    saveReportFromCol();
    return;
   }
   if (e.key === 'r' || e.key === 'R') {
    e.preventDefault();
    S.relMode = (S.relMode === 'full' ? 'resumo' : 'full');
    render();
    return;
   }
  }

  // Ctrl + Shift + C ou Cmd + Shift + C para copiar relatório
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
   e.preventDefault();
   copyRelCol();
   return;
  }
 });
}

initAuth();


// ─── Controles de Ergonomia e Layout (Split-Screen & Modo Noturno) ───
let _splitMode = localStorage.getItem('rel_split_mode') === 'true';
let _nightMode = localStorage.getItem('plantao_night_mode') === 'true';

function applySplitMode(){
 const wrap = document.querySelector('.two-col-wrap');
 const btn = document.getElementById('splitModeBtn');
 if(wrap){
  wrap.classList.toggle('split-50-50', _splitMode);
 }
 if(btn){
  btn.classList.toggle('active', _splitMode);
 }
}

function toggleSplitMode(){
 _splitMode = !_splitMode;
 localStorage.setItem('rel_split_mode', String(_splitMode));
 applySplitMode();
 if(typeof showToast === 'function'){
  showToast(_splitMode ? 'Modo Dividido 50/50 ativado' : 'Layout padrão restaurado');
 }
}

function applyHighContrastNight(){
 document.body.classList.toggle('high-contrast-night', _nightMode);
 const btn = document.getElementById('nightModeBtn');
 if(btn) btn.classList.toggle('active', _nightMode);
}

function toggleHighContrastNight(){
 _nightMode = !_nightMode;
 localStorage.setItem('plantao_night_mode', String(_nightMode));
 applyHighContrastNight();
 if(typeof showToast === 'function'){
  showToast(_nightMode ? 'Modo Noturno de Alto Contraste ativado' : 'Modo Noturno desativado');
 }
}

// Inicialização automática ao carregar
if(typeof window !== 'undefined'){
 window.addEventListener('DOMContentLoaded', () => {
  applySplitMode();
  applyHighContrastNight();
 });
}


