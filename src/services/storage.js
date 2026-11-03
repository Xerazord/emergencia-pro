/* ─── Persistência Offline de Rascunhos & Armazenamento em Nuvem ─── */
const DRAFT_KEY='emergencia_draft_v2';
const BUILD_VERSION='2026.05.20';

let _saveTimer=null;
function autoSave(immediate = false){
 if(immediate){
  if(_saveTimer){
   clearTimeout(_saveTimer);
   _saveTimer=null;
  }
  try{
   sessionStorage.setItem(DRAFT_KEY,JSON.stringify(S));
   localStorage.setItem(DRAFT_KEY,JSON.stringify(S));
  }catch(e){}
  return;
 }
 if(_saveTimer) clearTimeout(_saveTimer);
 _saveTimer=setTimeout(()=>{
  try{
   sessionStorage.setItem(DRAFT_KEY,JSON.stringify(S));
   localStorage.setItem(DRAFT_KEY,JSON.stringify(S));
  }catch(e){}
  _saveTimer=null;
 }, 400); // Debounce de 400ms para evitar escrita excessiva em storage
}

function autoLoad(){
 try{
  const saved=sessionStorage.getItem(DRAFT_KEY)||localStorage.getItem(DRAFT_KEY);
  if(!saved)return false;
  const parsed=JSON.parse(saved);
  if(parsed&&(parsed.nome||parsed.queixa||parsed.step>0||parsed.imp)){
   if(confirm('Há um caso anterior em andamento. Deseja continuá-lo?')){
    Object.assign(S, deepMergeDefaults(INITIAL_S, parsed));
    sanitizeState(S);
    return true;
   }else{
    clearDraft();
   }
  }
 }catch(e){}
 return false;
}

function clearDraft(){
 if(_saveTimer){
  clearTimeout(_saveTimer);
  _saveTimer=null;
 }
 try{
  localStorage.removeItem(DRAFT_KEY);
  sessionStorage.removeItem(DRAFT_KEY);
 }catch(e){}
}

function resetCase(){
 if(!confirm('Reiniciar caso? Todos os dados do paciente atual serão perdidos.'))return;
 resetCaseDirect();
}

function resetCaseDirect(){
 if(_saveTimer){
  clearTimeout(_saveTimer);
  _saveTimer=null;
 }
 Object.assign(S,JSON.parse(JSON.stringify(INITIAL_S)));
 clearDraft();
 gs(0);
 render();
}

function fallbackCopyText(txt){
 const ta=document.createElement('textarea');
 ta.value=txt;
 ta.style.position='fixed';
 ta.style.left='-9999px';
 document.body.appendChild(ta);
 ta.focus();
 ta.select();
 try{document.execCommand('copy');}catch(e){}
 document.body.removeChild(ta);
}

function copyAndClearPatient(){
 const txt=S.relMode==='resumo'?gResumo():gRel();
 if(!txt||!txt.trim()){
  showToast('Nenhum dado registrado para copiar.');
  return;
 }
 if(_saveTimer){
  clearTimeout(_saveTimer);
  _saveTimer=null;
 }
 const finalize=()=>{
  clearDraft();
  resetCaseDirect();
  showToast('Copiado para o PEP! Dados do paciente removidos da memória (LGPD).');
 };
 if(navigator.clipboard&&navigator.clipboard.writeText){
  navigator.clipboard.writeText(txt).then(finalize).catch(()=>{
   fallbackCopyText(txt);
   finalize();
  });
 }else{
  fallbackCopyText(txt);
  finalize();
 }
}

// Salva rascunho de forma imediata antes de descarregar a página
if(typeof window !== 'undefined'){
 window.addEventListener('pagehide',()=>{
  try{
   if(typeof autoSave === 'function') autoSave(true);
  }catch(e){}
 });
 if(!window._inputAutoSaveListenerAttached && typeof document !== 'undefined'){
  window._inputAutoSaveListenerAttached = true;
  document.addEventListener('input', (e)=>{
   if(e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)){
    autoSave();
   }
  }, {passive:true});
 }
}



// storage — Supabase
function _vitaisFromS(){
 const v = {};
 if(S.fc)   v.fc   = String(S.fc);
 if(S.sat)  v.sat  = String(S.sat);
 if(S.pa)   v.pa   = String(S.pa);
 if(S.fr)   v.fr   = String(S.fr);
 if(S.temp) v.temp = String(S.temp);
 if(S.gli)  v.gli  = String(S.gli);
 if(S.eva!==''&&S.eva!=null) v.eva = String(S.eva);
 if(S.peso) v.peso = String(S.peso);
 return Object.keys(v).length ? v : null;
}
function _sindLabel(){
 if(!S.sind || typeof SLIST==='undefined') return null;
 const m = SLIST.find(s=>s.id===S.sind);
 return m ? m.l : null;
}

async function saveReport(txt){
 try{
 const {data:{user}}=await sb.auth.getUser();
 if(!user){showToast('Faça login para salvar',false);return;}
 const reavalIso = (S.condReavalMin && S.condReavalMin>=1 && S.condReavalMin<=2880)
   ? new Date(Date.now()+S.condReavalMin*60000).toISOString() : null;
 const validStatuses = ['em_conduta','aguard_exames','aguard_vaga','alta','transferencia','obito','recusa_terapeutica'];
 const condStatus = validStatuses.includes(S.condStatus) ? S.condStatus : 'em_conduta';
 const {data: reportId, error}=await sb.rpc('save_report_secure',{
 p_key:'rel_'+Date.now(),
 p_nome:S.nome||'Sem nome',
 p_queixa:S.queixa||'—',
 p_date:new Date().toLocaleString('pt-BR'),
 p_txt:txt,
 p_status_conduta: condStatus,
 p_reavaliar_em: reavalIso,
 p_idade: (typeof S.idade==='number' && S.idade>=0 && S.idade<=130) ? S.idade : null,
 p_sexo: (S.sexo==='M'||S.sexo==='F'||S.sexo==='O') ? S.sexo : null,
 p_sinais_vitais: _vitaisFromS(),
 p_sind_label: _sindLabel()
 });
 if(error)throw error;
 // Pendência inicial opcional
 const pendDesc = (S.condPendDesc||'').trim();
 if(pendDesc && reportId){
  const validCats = ['exame','medicacao','transferencia','reavaliacao','consulta','outros'];
  const cat = validCats.includes(S.condPendCat) ? S.condPendCat : 'outros';
  const prazoIso = (S.condPendPrazoMin && S.condPendPrazoMin>=1 && S.condPendPrazoMin<=2880)
    ? new Date(Date.now()+S.condPendPrazoMin*60000).toISOString() : null;
  const {error:pErr} = await sb.rpc('add_pendencia',{
   p_report_id: reportId,
   p_descricao: pendDesc.slice(0,500),
   p_prazo: prazoIso,
   p_categoria: cat
  });
  if(pErr){console.error('add_pendencia:',pErr);showToast('Relatório salvo, mas falhou ao adicionar pendência: '+(pErr.message||pErr),false);}
 }
 showToast('Relatório salvo com sucesso!');
 clearDraft();
 }catch(e){const msg=(e&&e.message)||String(e)||'desconhecido';console.error('saveReport:',e);showToast('Erro ao salvar: '+msg,false);}
}
let _activeToastTimer=null;
function showToast(msg,ok=true){
 let t=document.getElementById('toast');
 if(!t){
  t=document.createElement('div');
  t.id='toast';
  document.body.appendChild(t);
 }
 t.style.cssText=`position:fixed;bottom:20px;right:20px;background:${ok?'#3b6d11':'#a32d2d'};color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;z-index:200;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.2s;`;
 t.textContent=msg;
 t.style.display='block';
 t.style.opacity='1';
 if(_activeToastTimer) clearTimeout(_activeToastTimer);
 _activeToastTimer=setTimeout(()=>{
  t.style.opacity='0';
  setTimeout(()=>{ if(t.style.opacity==='0') t.style.display='none'; },200);
  _activeToastTimer=null;
 },2500);
}

function closeModalArea(){
 const modal=document.getElementById('modalArea');
 if(modal) modal.innerHTML='';
}

async function loadSaved(){
 try{
 const {data,error}=await sb.rpc('load_reports_secure');
 if(error)throw error;
 return(data||[]).map(r=>({key:r.key,data:{date:r.report_date,nome:r.nome,queixa:r.queixa,txt:r.txt}}));
 }catch(e){console.error('loadSaved:',e);showToast('Erro ao carregar relatórios',false);return[];}
}
const _savedReports=new Map();
async function showSaved(){
 const items=await loadSaved();
 const modal=document.getElementById('modalArea');
 if(!modal) return;
 if(!items.length){modal.innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModalArea()"><div class="modal"><div class="modal-hdr"><strong>Relatórios salvos</strong><button class="modal-close" onclick="closeModalArea()">×</button></div><div style="color:var(--color-text-secondary);font-size:14px">Nenhum relatório salvo ainda.</div></div></div>`;return;}
 _savedReports.clear();
 items.forEach(x=>_savedReports.set(x.key,x.data));
 const list=items.sort((a,b)=>b.key.localeCompare(a.key)).map(x=>`<div class="saved-item" data-key="${esc(x.key)}"><div class="si-top"><div class="si-name">${esc(x.data.nome)}</div><div class="si-date">${esc(x.data.date)}</div></div><div class="si-preview">${esc(x.data.queixa)}</div></div>`).join('');
 modal.innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModalArea()"><div class="modal"><div class="modal-hdr"><strong>Relatórios salvos</strong><button class="modal-close" onclick="closeModalArea()">×</button></div>${list}</div></div>`;
 modal.querySelectorAll('.saved-item').forEach(el=>{
 el.addEventListener('click',()=>{
 const data=_savedReports.get(el.dataset.key);
 if(data)showRel(data.txt);
 });
 });
}
function showRel(txt){
 const modal=document.getElementById('modalArea');
 if(!modal) return;
 modal.innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModalArea()"><div class="modal"><div class="modal-hdr"><strong>Relatório</strong><button class="modal-close" onclick="closeModalArea()">×</button></div><div class="relbox" id="relTxtView"></div><div style="display:flex;gap:8px;margin-top:10px"><button class="btng" id="btnCopyView"><i class='ti ti-copy' aria-hidden='true'></i> Copiar Relatório</button></div></div></div>`;
 document.getElementById('relTxtView').textContent=txt;
 document.getElementById('btnCopyView').addEventListener('click',()=>{
 navigator.clipboard.writeText(txt).then(()=>{
  autoSave(true);
  showToast('Relatório copiado!');
 });
 });
}

