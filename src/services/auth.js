/* ─── Autenticação, Overlays, Turnstile, KYC & Painel Admin ─── */
const _AUTH_OVERLAYS = ['loginOverlay','signupOverlay','kycOverlay','pendingOverlay','inactivityOverlay'];
const TURNSTILE_SITE_KEY = '0x4AAAAAADTWnhJoTdtRavea';
const _turnstileWidgets = {}; // {name: {id, token}}
let _profileSub = null;
let _currentProfile = null;
let _adminCurrentTab = 'pending';

function hideAllOverlays(){
 _AUTH_OVERLAYS.forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
 const app=document.getElementById('mainApp');if(app)app.style.display='none';
}
function showOverlay(id){
 hideAllOverlays();
 const el=document.getElementById(id);if(el)el.style.display='flex';
}
function showLogin(){stopProfileSub();stopInactivityTimer();showOverlay('loginOverlay');if(typeof setTimeout==='function')setTimeout(()=>{resetTurnstile('login');onTurnstileReady();},0);}
function showSignup(){stopProfileSub();stopInactivityTimer();showOverlay('signupOverlay');setTimeout(()=>{resetTurnstile('signup');onTurnstileReady();},0);}
function showKyc(){showOverlay('kycOverlay');}
function showPending(status, motivo){
 const titleEl=document.getElementById('pendingTitle');
 const msgEl=document.getElementById('pendingMsg');
 const iconEl=document.getElementById('pendingIcon');
 const icoI=iconEl.querySelector('i');
 if(status==='rejected'){
  titleEl.textContent='Cadastro rejeitado';
  msgEl.textContent='Seu cadastro foi rejeitado.'+(motivo?' Motivo: '+motivo:'')+' Entre em contato com o administrador.';
  iconEl.style.background='#fcebeb';icoI.style.color='#a32d2d';icoI.className='ti ti-x';
 } else if(status==='suspended'){
  titleEl.textContent='Conta suspensa';
  msgEl.textContent='Sua conta foi suspensa.'+(motivo?' Motivo: '+motivo:'')+' Entre em contato com o administrador.';
  iconEl.style.background='#fcebeb';icoI.style.color='#a32d2d';icoI.className='ti ti-ban';
 } else {
  titleEl.textContent='Aguardando aprovação';
  msgEl.textContent='Sua conta foi enviada para análise. Você receberá acesso assim que o administrador validar seus documentos.';
  iconEl.style.background='#faeeda';icoI.style.color='#854f0b';icoI.className='ti ti-hourglass';
 }
 showOverlay('pendingOverlay');
}
function showApp(){
 hideAllOverlays();
 document.getElementById('mainApp').style.display='block';
 const adminBtn = document.getElementById('adminHdrBtn');
 if(adminBtn) adminBtn.style.display = (_currentProfile && _currentProfile.role==='admin') ? '' : 'none';
 const shiftBtn = document.getElementById('shiftHdrBtn');
 if(shiftBtn) shiftBtn.style.display = (_currentProfile && _currentProfile.status==='approved') ? '' : 'none';
 if(typeof autoLoad==='function')autoLoad();
 render();
 startInactivityTimer();
}

async function initAuth(){
 const {data:{session}} = await sb.auth.getSession();
 if(session) await routePostLogin(); else showLogin();
 sb.auth.onAuthStateChange(async (event,s)=>{
  if(s){await routePostLogin();} else {stopProfileSub();showLogin();}
 });
}

async function routePostLogin(){
 try{
  const {data:{user}} = await sb.auth.getUser();
  if(!user){showLogin();return;}
  let {data:profile, error} = await sb.from('profiles').select('status, role, nome_completo, crm, crm_uf, especialidade, motivo_rejeicao, selfie_path, crm_doc_path').eq('id',user.id).maybeSingle();
  if(error){
   console.error('routePostLogin:',error);
   showLogin();
   document.getElementById('loginErr').textContent='Erro ao carregar perfil: '+(error.message||error);
   document.getElementById('loginErr').style.display='block';
   return;
  }
  if(!profile){
   // Edge case: trigger handle_new_user não criou row (ex.: user criado antes do trigger existir).
   const {error:insErr} = await sb.from('profiles').insert({id:user.id, email:user.email, status:'pending', role:'user'});
   if(insErr){console.error('routePostLogin insert:',insErr);showLogin();return;}
   _currentProfile = {id:user.id, status:'pending', role:'user'};
   showKyc();
   return;
  }
  _currentProfile = profile;
  const needsKyc = !profile.nome_completo || !profile.crm || !profile.selfie_path || !profile.crm_doc_path;
  if(profile.status==='approved'){
   showApp();
  } else if(profile.status==='pending' && needsKyc){
   showKyc();
  } else if(profile.status==='pending'){
   startProfileSub();
   showPending('pending');
  } else if(profile.status==='rejected'){
   showPending('rejected', profile.motivo_rejeicao);
  } else if(profile.status==='suspended'){
   showPending('suspended', profile.motivo_rejeicao);
  } else {
   showPending('pending');
  }
 } catch(e){
  console.error('routePostLogin exception:',e);
  showLogin();
 }
}

function startProfileSub(){
 stopProfileSub();
 _profileSub = sb.channel('profile-status')
  .on('postgres_changes',{event:'UPDATE',schema:'public',table:'profiles'},(payload)=>{
   if(payload.new && payload.new.status==='approved'){routePostLogin();}
   else if(payload.new && (payload.new.status==='rejected' || payload.new.status==='suspended')){routePostLogin();}
  })
  .subscribe();
}
function stopProfileSub(){
 if(_profileSub){try{sb.removeChannel(_profileSub);}catch(e){}_profileSub=null;}
}

async function doLogin(){
 const email=document.getElementById('loginEmail').value.trim();
 const pwd=document.getElementById('loginPassword').value;
 const errEl=document.getElementById('loginErr');
 const loadEl=document.getElementById('loginLoading');
 const btn=document.getElementById('loginBtn');
 errEl.style.display='none';
 const captchaToken = getTurnstileToken('login');
 if(!captchaToken){
  errEl.textContent='Complete o desafio de verificação antes de entrar.';
  errEl.style.color='#a32d2d';errEl.style.display='block';
  return;
 }
 loadEl.style.display='block';
 btn.disabled=true;
 const {error}=await sb.auth.signInWithPassword({email,password:pwd,options:{captchaToken}});
 loadEl.style.display='none';
 btn.disabled=false;
 // Turnstile token é single-use — reseta sempre, sucesso ou falha
 resetTurnstile('login');
 if(error){
  const msg=error.message==='Invalid login credentials'?'E-mail ou senha incorretos':error.message;
  errEl.textContent=msg;errEl.style.color='#a32d2d';errEl.style.display='block';
 }
}

async function doLogout(){
 stopProfileSub();
 stopInactivityTimer();
 clearDraft();
 if(typeof INITIAL_S !== 'undefined') Object.assign(S, JSON.parse(JSON.stringify(INITIAL_S)));
 _currentProfile = null;
 _adminCache = {};
 _kycFiles.selfie = null;
 _kycFiles.crm = null;
 resetTurnstile('login');
 resetTurnstile('signup');
 _shiftData = null;
 const adminBtn = document.getElementById('adminHdrBtn');
 if(adminBtn) adminBtn.style.display = 'none';
 const shiftBtn = document.getElementById('shiftHdrBtn');
 if(shiftBtn) shiftBtn.style.display = 'none';
 const inact = document.getElementById('inactivityOverlay');
 if(inact) inact.style.display = 'none';
 await sb.auth.signOut();
}

async function doForgotPassword(){
 const email=document.getElementById('loginEmail').value.trim();
 const errEl=document.getElementById('loginErr');
 if(!email){errEl.textContent='Digite o e-mail acima primeiro.';errEl.style.color='#a32d2d';errEl.style.display='block';return;}
 const captchaToken = getTurnstileToken('login');
 if(!captchaToken){
  errEl.textContent='Complete o desafio de verificação antes de solicitar recuperação.';
  errEl.style.color='#a32d2d';errEl.style.display='block';
  return;
 }
 const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:window.location.href,captchaToken});
 resetTurnstile('login');
 if(error){errEl.textContent='Erro: '+error.message;errEl.style.color='#a32d2d';}
 else{errEl.textContent='Enviamos um link de recuperação para seu e-mail.';errEl.style.color='#3b6d11';}
 errEl.style.display='block';
}

// ─── Turnstile (suporta múltiplos widgets identificados por data-tname) ───
function onTurnstileReady(){
 if(!window.turnstile)return;
 document.querySelectorAll('.cf-turnstile[data-tname]').forEach(el=>{
  const name = el.dataset.tname;
  if(_turnstileWidgets[name] && _turnstileWidgets[name].id != null) return;
  try{
   const id = window.turnstile.render(el, {
    sitekey: TURNSTILE_SITE_KEY,
    callback: t => { if(_turnstileWidgets[name]) _turnstileWidgets[name].token = t; },
    'error-callback':   () => { if(_turnstileWidgets[name]) _turnstileWidgets[name].token = null; },
    'expired-callback': () => { if(_turnstileWidgets[name]) _turnstileWidgets[name].token = null; }
   });
   _turnstileWidgets[name] = { id, token: null };
  }catch(e){console.warn('turnstile render', name, ':', e);}
 });
}
function getTurnstileToken(name){return _turnstileWidgets[name] ? _turnstileWidgets[name].token : null;}
function resetTurnstile(name){
 const w = _turnstileWidgets[name];
 if(!w) return;
 w.token = null;
 if(window.turnstile && w.id != null){try{window.turnstile.reset(w.id);}catch(e){}}
}

// ─── Validação de senha ────────────────────────────────────────────────────
function validatePassword(p){
 return {
  len: (p||'').length >= 10,
  upp: /[A-Z]/.test(p||''),
  num: /[0-9]/.test(p||''),
  spc: /[^A-Za-z0-9]/.test(p||'')
 };
}
function renderPwdRules(){
 const p=document.getElementById('signupPwd').value;
 const r=validatePassword(p);
 const map={'pr-len':r.len,'pr-upp':r.upp,'pr-num':r.num,'pr-spc':r.spc};
 for(const id in map){
  const li=document.getElementById(id);if(!li)continue;
  li.className=map[id]?'ok':(p?'fail':'');
  const ico=li.querySelector('i');if(ico)ico.className=map[id]?'ti ti-check':'ti ti-circle';
 }
}

// ─── Signup ────────────────────────────────────────────────────────────────
async function doSignup(){
 const email=document.getElementById('signupEmail').value.trim();
 const pwd=document.getElementById('signupPwd').value;
 const pwd2=document.getElementById('signupPwd2').value;
 const errEl=document.getElementById('signupErr');
 const loadEl=document.getElementById('signupLoading');
 const btn=document.getElementById('signupBtn');
 errEl.style.display='none';
 errEl.style.color='#a32d2d';

 if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){errEl.textContent='E-mail inválido.';errEl.style.display='block';return;}
 const rules=validatePassword(pwd);
 if(!(rules.len && rules.upp && rules.num && rules.spc)){errEl.textContent='A senha não atende a todos os requisitos.';errEl.style.display='block';return;}
 if(pwd!==pwd2){errEl.textContent='As senhas não coincidem.';errEl.style.display='block';return;}
 const captchaToken = getTurnstileToken('signup');
 if(!captchaToken){errEl.textContent='Complete o desafio de verificação.';errEl.style.display='block';return;}

 loadEl.style.display='block';btn.disabled=true;
 const {error}=await sb.auth.signUp({email,password:pwd,options:{captchaToken}});
 loadEl.style.display='none';btn.disabled=false;
 resetTurnstile('signup');
 if(error){
  errEl.textContent='Erro: '+error.message;errEl.style.display='block';
  return;
 }
 errEl.style.color='#3b6d11';
 errEl.textContent='Conta criada. Verifique seu e-mail para confirmar e depois faça login.';
 errEl.style.display='block';
}

// ─── KYC ───────────────────────────────────────────────────────────────────
const _kycFiles = {selfie:null, crm:null};
function onKycFile(input, kind){
 const file=input.files && input.files[0];
 if(!file)return;
 if(file.size > 5*1024*1024){alert('Arquivo muito grande (máx 5 MB).');input.value='';return;}
 _kycFiles[kind]=file;
 const lbl=document.getElementById(kind==='selfie'?'kycSelfieLbl':'kycCrmDocLbl');
 if(lbl){lbl.classList.add('has-file');lbl.firstChild.nodeValue=' '+file.name+' ';}
}

async function uploadKycFile(file, kind, userId){
 const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
 const path=`${userId}/${kind}.${ext}`;
 const {error}=await sb.storage.from('kyc-docs').upload(path,file,{upsert:true,contentType:file.type||'application/octet-stream'});
 if(error)throw error;
 return path;
}

async function doKycSubmit(){
 const nome=document.getElementById('kycNome').value.trim();
 const crm=document.getElementById('kycCrm').value.trim();
 const uf=document.getElementById('kycCrmUf').value.trim().toUpperCase();
 const esp=document.getElementById('kycEsp').value.trim();
 const tel=document.getElementById('kycTel').value.trim();
 const errEl=document.getElementById('kycErr');
 const loadEl=document.getElementById('kycLoading');
 const btn=document.getElementById('kycBtn');
 errEl.style.display='none';

 if(nome.length<5){errEl.textContent='Nome completo é obrigatório.';errEl.style.display='block';return;}
 if(!/^\d{3,7}$/.test(crm)){errEl.textContent='CRM deve conter apenas números (3 a 7 dígitos).';errEl.style.display='block';return;}
 if(!/^[A-Z]{2}$/.test(uf)){errEl.textContent='UF deve ter 2 letras maiúsculas.';errEl.style.display='block';return;}
 if(esp.length<3){errEl.textContent='Informe sua especialidade.';errEl.style.display='block';return;}
 if(tel.replace(/\D/g,'').length<10){errEl.textContent='Telefone inválido.';errEl.style.display='block';return;}
 if(!_kycFiles.selfie){errEl.textContent='Envie uma selfie segurando o CRM.';errEl.style.display='block';return;}
 if(!_kycFiles.crm){errEl.textContent='Envie a foto/scan do CRM.';errEl.style.display='block';return;}

 loadEl.style.display='block';btn.disabled=true;
 try{
  const {data:{user}}=await sb.auth.getUser();
  if(!user)throw new Error('Sessão expirada — faça login novamente.');
  const selfiePath=await uploadKycFile(_kycFiles.selfie,'selfie',user.id);
  const crmPath=await uploadKycFile(_kycFiles.crm,'crm',user.id);
  const {error}=await sb.from('profiles').update({
   nome_completo:nome, crm, crm_uf:uf, especialidade:esp, telefone:tel,
   selfie_path:selfiePath, crm_doc_path:crmPath
  }).eq('id',user.id);
  if(error)throw error;
  startProfileSub();
  showPending('pending');
 } catch(e){
  console.error('doKycSubmit:',e);
  errEl.textContent='Erro: '+(e.message||String(e));errEl.style.display='block';
 } finally {
  loadEl.style.display='none';btn.disabled=false;
 }
}

// ─── Painel admin ──────────────────────────────────────────────────────────
async function showAdminPanel(){
 if(!_currentProfile || _currentProfile.role!=='admin'){alert('Acesso negado.');return;}
 document.getElementById('adminOverlay').style.display='flex';
 setAdminTab('pending');
 // contador na tab pendentes
 try{
  const {count}=await sb.from('profiles').select('id',{count:'exact',head:true}).eq('status','pending');
  const el=document.getElementById('adminCntPending');if(el)el.textContent=count||'';
 }catch(e){}
}
function closeAdminPanel(){document.getElementById('adminOverlay').style.display='none';document.getElementById('kycDetailArea').innerHTML='';}

function setAdminTab(tab){
 _adminCurrentTab=tab;
 document.querySelectorAll('#adminTabs .admin-tab').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);});
 loadAdminTab(tab);
}

async function loadAdminTab(tab){
 const listEl=document.getElementById('adminList');
 listEl.innerHTML='<div class="admin-empty">Carregando...</div>';
 const {data, error}=await sb.from('profiles')
  .select('id,email,nome_completo,crm,crm_uf,especialidade,telefone,status,role,motivo_rejeicao,created_at,aprovado_em,selfie_path,crm_doc_path')
  .eq('status',tab)
  .order('created_at',{ascending: tab==='pending' ? true : false});
 if(error){listEl.innerHTML=`<div class="admin-empty">Erro: ${esc(error.message||error)}</div>`;return;}
 if(!data || !data.length){listEl.innerHTML='<div class="admin-empty">Nenhum registro.</div>';return;}
 _adminCache = {};
 listEl.innerHTML = data.map(p=>{
  _adminCache[p.id]=p;
  const sub = p.nome_completo ? esc(p.nome_completo) : '<em style="color:#a32d2d">Sem KYC</em>';
  const crm = p.crm ? esc(p.crm)+'/'+esc(p.crm_uf||'??') : '—';
  const esp = p.especialidade ? esc(p.especialidade) : '—';
  const dt = p.created_at ? new Date(p.created_at).toLocaleDateString('pt-BR') : '';
  return `<div class="admin-row" onclick="openKycDetail('${esc(p.id)}')">
   <div><div class="ar-name">${sub}</div><div class="ar-sub">${esc(p.email)}</div></div>
   <div class="ar-meta">${crm}</div>
   <div class="ar-meta">${esp}</div>
   <div class="ar-meta">${dt}</div>
   <div class="ar-meta" style="text-align:right;color:#185fa5">Detalhar →</div>
  </div>`;
 }).join('');
}

let _adminCache = {};

async function getKycSignedUrl(path){
 if(!path)return null;
 const {data, error}=await sb.storage.from('kyc-docs').createSignedUrl(path, 300); // 5 min
 if(error){console.warn('signed url:',error);return null;}
 return data && data.signedUrl;
}

async function openKycDetail(id){
 const p=_adminCache[id];
 if(!p){alert('Perfil não encontrado.');return;}
 const area=document.getElementById('kycDetailArea');
 area.innerHTML=`<div class="kyc-detail-modal"><div class="kyc-detail-box"><div class="modal-hdr"><strong>${esc(p.nome_completo||p.email)}</strong><button class="modal-close" onclick="document.getElementById('kycDetailArea').innerHTML=''">×</button></div>
  <div class="kyc-info-grid">
   <div><div class="kil">E-mail</div>${esc(p.email)}</div>
   <div><div class="kil">CRM</div>${esc(p.crm||'—')}${p.crm?'/'+esc(p.crm_uf||'??'):''}</div>
   <div><div class="kil">Especialidade</div>${esc(p.especialidade||'—')}</div>
   <div><div class="kil">Telefone</div>${esc(p.telefone||'—')}</div>
   <div><div class="kil">Status atual</div><strong>${esc(p.status)}</strong></div>
   <div><div class="kil">Solicitação</div>${p.created_at?new Date(p.created_at).toLocaleString('pt-BR'):'—'}</div>
   ${p.motivo_rejeicao?`<div style="grid-column:1/-1"><div class="kil">Motivo anterior</div>${esc(p.motivo_rejeicao)}</div>`:''}
  </div>
  <div class="kyc-imgs" id="kycDetailImgs"><div class="ki-card"><div class="ki-lbl">Selfie</div><div style="color:#6b7280;font-size:12px">Carregando…</div></div><div class="ki-card"><div class="ki-lbl">CRM</div><div style="color:#6b7280;font-size:12px">Carregando…</div></div></div>
  <div class="kyc-actions">${renderAdminActions(p)}</div>
 </div></div>`;
 // signed URLs em paralelo
 const [selfieUrl, crmUrl] = await Promise.all([getKycSignedUrl(p.selfie_path), getKycSignedUrl(p.crm_doc_path)]);
 const imgs=document.getElementById('kycDetailImgs');
 if(imgs){
  imgs.innerHTML = `
   <div class="ki-card"><div class="ki-lbl">Selfie com CRM</div>${selfieUrl?`<img src="${esc(selfieUrl)}" alt="Selfie"><br><a href="${esc(selfieUrl)}" target="_blank" rel="noopener">Abrir em nova aba</a>`:'<div style="color:#6b7280;font-size:12px">Não enviada</div>'}</div>
   <div class="ki-card"><div class="ki-lbl">Documento CRM</div>${crmUrl?`<img src="${esc(crmUrl)}" alt="CRM" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block'"><a href="${esc(crmUrl)}" target="_blank" rel="noopener" style="display:inline-block">Abrir documento</a>`:'<div style="color:#6b7280;font-size:12px">Não enviado</div>'}</div>`;
 }
}

function renderAdminActions(p){
 const id = esc(p.id);
 const cancel='<button class="kyc-act-cancel" onclick="document.getElementById(\'kycDetailArea\').innerHTML=\'\'">Cancelar</button>';
 if(p.status==='pending'){
  return `<button class="kyc-act-approve" onclick="adminApprove('${id}')">Aprovar</button><button class="kyc-act-reject" onclick="adminReject('${id}')">Rejeitar</button>${cancel}`;
 }
 if(p.status==='approved'){
  return `<button class="kyc-act-suspend" onclick="adminSuspend('${id}')">Suspender</button>${cancel}`;
 }
 if(p.status==='rejected' || p.status==='suspended'){
  return `<button class="kyc-act-reactivate" onclick="adminReactivate('${id}')">Reativar (aprovar)</button>${cancel}`;
 }
 return cancel;
}

function _sanitizeAdminMotivo(s){
 if(!s)return '';
 const trimmed = String(s).trim().slice(0,500);
 // remove caracteres que podem virar HTML se algum dia renderizado em innerHTML
 return trimmed.replace(/[<>]/g,'');
}

async function adminUpdateStatus(id, status, motivo){
 const patch={status, motivo_rejeicao:motivo||null};
 if(status==='approved'){
  patch.aprovado_em = new Date().toISOString();
  const {data:{user}}=await sb.auth.getUser();
  if(!user){alert('Sessão expirada. Faça login novamente.');return false;}
  patch.aprovado_por = user.id;
 }
 const {data, error} = await sb.from('profiles').update(patch).eq('id',id).select();
 if(error){alert('Erro ao atualizar cadastro: '+(error.message||error));return false;}
 if(!data || !data.length){
  alert('Aviso: nenhuma alteração foi gravada no banco. Isso ocorre se o seu usuário não possuir role="admin" na tabela public.profiles ou se a política RLS bloquear a atualização.');
  return false;
 }
 document.getElementById('kycDetailArea').innerHTML='';
 await loadAdminTab(_adminCurrentTab);
 // atualizar contador de pendentes
 try{
  const {count}=await sb.from('profiles').select('id',{count:'exact',head:true}).eq('status','pending');
  const el=document.getElementById('adminCntPending');if(el)el.textContent=count||'';
 }catch(e){}
 return true;
}

async function adminApprove(id){
 if(!confirm('Aprovar este cadastro?'))return;
 await adminUpdateStatus(id,'approved',null);
}
async function adminReject(id){
 const motivo=prompt('Motivo da rejeição (até 500 caracteres):');
 if(motivo===null)return;
 const clean = _sanitizeAdminMotivo(motivo);
 if(!clean){alert('Motivo é obrigatório.');return;}
 await adminUpdateStatus(id,'rejected',clean);
}
async function adminSuspend(id){
 const motivo=prompt('Motivo da suspensão (até 500 caracteres):');
 if(motivo===null)return;
 const clean = _sanitizeAdminMotivo(motivo);
 if(!clean){alert('Motivo é obrigatório.');return;}
 await adminUpdateStatus(id,'suspended',clean);
}
async function adminReactivate(id){
 if(!confirm('Reativar (aprovar) este cadastro?'))return;
 await adminUpdateStatus(id,'approved',null);
}

