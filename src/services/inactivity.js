/* ─── Timer de Inatividade (Proteção LGPD / Estação Compartilhada) ─── */
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutos
let _inactivityTimer = null;
let _isLockedForInactivity = false;

function resetInactivityTimer(){
 if(!_currentProfile || _isLockedForInactivity) return;
 if(typeof clearTimeout === 'function') clearTimeout(_inactivityTimer);
 if(typeof setTimeout === 'function') _inactivityTimer = setTimeout(lockForInactivity, INACTIVITY_TIMEOUT_MS);
}

const INACTIVITY_EVENTS = ['mousemove','keydown','touchstart','scroll','click'];

function startInactivityTimer(){
 stopInactivityTimer();
 _isLockedForInactivity = false;
 INACTIVITY_EVENTS.forEach(evt => {
  if(typeof window !== 'undefined' && window.addEventListener){
   window.addEventListener(evt, resetInactivityTimer, {passive:true});
  }
 });
 resetInactivityTimer();
}

function stopInactivityTimer(){
 if(typeof clearTimeout === 'function') clearTimeout(_inactivityTimer);
 _inactivityTimer = null;
 if(typeof window !== 'undefined' && window.removeEventListener){
  INACTIVITY_EVENTS.forEach(evt => {
   window.removeEventListener(evt, resetInactivityTimer);
  });
 }
}

function lockForInactivity(){
 if(!_currentProfile) return;
 _isLockedForInactivity = true;
 stopInactivityTimer();
 const inact = document.getElementById('inactivityOverlay');
 if(inact) inact.style.display = 'flex';
}

async function unlockInactivity(){
 try{
  const {data:{session}} = await sb.auth.getSession();
  if(!session){
   const inact = document.getElementById('inactivityOverlay');
   if(inact) inact.style.display = 'none';
   doLogout();
   return;
  }
 }catch(e){}
 _isLockedForInactivity = false;
 const inact = document.getElementById('inactivityOverlay');
 if(inact) inact.style.display = 'none';
 startInactivityTimer();
}

