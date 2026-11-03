/* ─── Painel de Plantão & Gestão de Pacientes em Observação ─── */
// ─── Painel de plantão ─────────────────────────────────────────────────────
let _shiftData = null;
let _shiftCurrentTab = 'resumo';

const STATUS_LABEL = {
 em_conduta:'Em conduta',
 aguard_exames:'Aguard. exames',
 aguard_vaga:'Aguard. vaga',
 alta:'Alta',
 transferencia:'Transferência',
 obito:'Óbito',
 recusa_terapeutica:'Recusa terap.'
};
const PEND_CAT_LABEL = {
 exame:'Exame',
 medicacao:'Medicação',
 transferencia:'Transferência',
 reavaliacao:'Reavaliação',
 consulta:'Consulta',
 outros:'Outros'
};
const TIME_DEPENDENT_QUEIXAS = new Set([
 'Dor torácica','Déficit neurológico agudo','Dispneia',
 'Dor abdominal','Rebaixamento de consciência',
 'Trauma','Intoxicação exógena','Agitação psicomotora'
]);
const STATUS_CLOSED = new Set(['alta','transferencia','obito','recusa_terapeutica']);

function urgScore(p){
 // menor = mais urgente
 const now = Date.now();
 const reavalDue = p.reavaliar_em && new Date(p.reavaliar_em).getTime() < now;
 if(reavalDue) return 0;
 const isOpen = !STATUS_CLOSED.has(p.status_conduta);
 const isCritico = isOpen && TIME_DEPENDENT_QUEIXAS.has(p.queixa);
 const reavalSoon = p.reavaliar_em && (new Date(p.reavaliar_em).getTime() - now < 30*60000);
 if(isCritico && reavalSoon) return 1;
 if(isCritico) return 2;
 if(reavalSoon) return 3;
 if(p.status_conduta==='em_conduta') return 4;
 if(p.status_conduta==='aguard_exames' || p.status_conduta==='aguard_vaga') return 5;
 return 9; // closed
}
function urgClass(p){
 const now = Date.now();
 const reavalDue = p.reavaliar_em && new Date(p.reavaliar_em).getTime() < now;
 const isOpen = !STATUS_CLOSED.has(p.status_conduta);
 const isCritico = isOpen && TIME_DEPENDENT_QUEIXAS.has(p.queixa);
 if(!isOpen) return 'pac-closed';
 if(reavalDue) return 'pac-critico';
 if(isCritico) return 'pac-critico';
 if(p.status_conduta==='aguard_exames' || p.status_conduta==='aguard_vaga') return 'pac-warn';
 if(p.status_conduta==='em_conduta') return 'pac-warn';
 return 'pac-ok';
}

async function showShiftPanel(){
 if(!_currentProfile || _currentProfile.status!=='approved'){alert('Acesso negado.');return;}
 document.getElementById('shiftOverlay').style.display='flex';
 await loadShiftDashboard();
}
function closeShiftPanel(){document.getElementById('shiftOverlay').style.display='none';}

async function loadShiftDashboard(){
 document.getElementById('shiftBody').innerHTML='<div class="shift-empty">Carregando...</div>';
 const {data,error}=await sb.rpc('shift_dashboard',{p_shift_id:null});
 if(error){
  console.error('shift_dashboard:',error);
  document.getElementById('shiftBody').innerHTML=`<div class="shift-empty">Erro: ${esc(error.message||error)}</div>`;
  return;
 }
 _shiftData = data || {shift:null, pacientes:[]};
 renderShiftHeader();
 renderShiftBody();
}

function fmtElapsed(ms){
 const total = Math.floor(ms/60000);
 const h = Math.floor(total/60);
 const m = total%60;
 return (h>0?h+'h ':'')+m+'min';
}

function renderShiftHeader(){
 const sh = _shiftData && _shiftData.shift;
 const ps = (_shiftData && _shiftData.pacientes) || [];
 const info = document.getElementById('shiftInfo');
 const actions = document.getElementById('shiftActions');
 const status = document.getElementById('shiftStatus');

 if(!sh){
  status.textContent = 'Nenhum plantão ativo';
  info.innerHTML = '';
  actions.innerHTML = '<button class="shift-action-btn shift-act-start" onclick="doStartShift()"><i class="ti ti-player-play" aria-hidden="true"></i> Iniciar plantão</button>';
  document.getElementById('shiftBody').innerHTML='';
  return;
 }
 const started = new Date(sh.started_at);
 const ended = sh.ended_at ? new Date(sh.ended_at) : null;
 const elapsed = (ended || new Date()) - started;
 status.textContent = `Iniciado ${started.toLocaleString('pt-BR')} • ${ended ? 'Encerrado em '+ended.toLocaleString('pt-BR') : 'Ativo há '+fmtElapsed(elapsed)}`;

 const total = ps.length;
 const emConduta = ps.filter(p=>p.status_conduta==='em_conduta').length;
 const now = new Date();
 const reavalVenc = ps.filter(p=>p.reavaliar_em && new Date(p.reavaliar_em) < now).length;
 const pendOpen = ps.reduce((s,p)=>s + (p.pendencias||[]).filter(pn=>!pn.done).length, 0);

 info.innerHTML = `
  <div class="si-card"><div class="si-lbl">Pacientes</div><div class="si-val">${total}</div></div>
  <div class="si-card"><div class="si-lbl">Em conduta</div><div class="si-val">${emConduta}</div></div>
  <div class="si-card"><div class="si-lbl">Reaval. vencidas</div><div class="si-val" style="${reavalVenc>0?'color:#a32d2d':''}">${reavalVenc}</div></div>
  <div class="si-card"><div class="si-lbl">Pend. abertas</div><div class="si-val" style="${pendOpen>0?'color:#a32d2d':''}">${pendOpen}</div></div>
 `;

 if(!ended){
  actions.innerHTML = `
   <button class="shift-action-btn shift-act-end" onclick="doEndShift()"><i class="ti ti-flag" aria-hidden="true"></i> Encerrar plantão</button>
   <button class="shift-action-btn shift-act-pdf" onclick="exportShiftPDF()"><i class="ti ti-file-export" aria-hidden="true"></i> Exportar PDF</button>`;
 } else {
  actions.innerHTML = `
   <button class="shift-action-btn shift-act-start" onclick="doStartShift()"><i class="ti ti-player-play" aria-hidden="true"></i> Iniciar novo plantão</button>
   <button class="shift-action-btn shift-act-pdf" onclick="exportShiftPDF()"><i class="ti ti-file-export" aria-hidden="true"></i> Exportar PDF</button>`;
 }
}

function renderShiftBody(){
 if(!_shiftData || !_shiftData.shift) return;
 document.getElementById('shiftBody').innerHTML = renderShiftPacientes();
}

function fmtReaval(reavaliar_em){
 if(!reavaliar_em) return '';
 const reaval = new Date(reavaliar_em);
 const now = new Date();
 const diff = reaval - now;
 const cls = diff < 0 ? 'reaval-due' : (diff < 30*60000 ? 'reaval-soon' : '');
 const abs = Math.abs(diff);
 const h = Math.floor(abs/3600000);
 const m = Math.floor((abs%3600000)/60000);
 const span = (h>0?h+'h ':'')+m+'min';
 const txt = diff < 0 ? `Vencida há ${span}` : `Em ${span}`;
 return `<div class="${cls}">${esc(txt)}</div>`;
}

function fmtVitais(v){
 if(!v || typeof v !== 'object') return '';
 const parts = [];
 if(v.fc)   parts.push(`FC ${esc(v.fc)}`);
 if(v.sat)  parts.push(`SpO₂ ${esc(v.sat)}%`);
 if(v.pa)   parts.push(`PA ${esc(v.pa)}`);
 if(v.fr)   parts.push(`FR ${esc(v.fr)}`);
 if(v.temp) parts.push(`T ${esc(v.temp)}°C`);
 return parts.join('<span class="vsep">|</span>');
}

function _firstName(s){return String(s||'').trim().split(/\s+/)[0] || 'Sem nome';}

function pacConductTags(p){
 const open = (p.pendencias||[]).filter(pn=>!pn.done);
 const hasCat = c => open.some(pn=>pn.categoria===c);
 const tags = [];
 if(hasCat('exame') || p.status_conduta==='aguard_exames') tags.push('<span class="pac-conduct-tag tag-exames"><i class="ti ti-test-pipe" aria-hidden="true"></i> Aguarda exames</span>');
 if(hasCat('medicacao')) tags.push('<span class="pac-conduct-tag tag-medicacao"><i class="ti ti-pill" aria-hidden="true"></i> Aguarda medicação</span>');
 if(hasCat('transferencia') || p.status_conduta==='transferencia') tags.push('<span class="pac-conduct-tag tag-transferencia"><i class="ti ti-arrow-forward" aria-hidden="true"></i> Aguarda transferência</span>');
 if(p.status_conduta==='aguard_vaga') tags.push('<span class="pac-conduct-tag tag-vaga"><i class="ti ti-bed" aria-hidden="true"></i> Aguarda vaga</span>');
 // Pendências específicas (outros/consulta/reavaliacao) — cada uma vira tag com seu texto
 open.filter(pn=>['outros','consulta','reavaliacao'].includes(pn.categoria)).forEach(pn=>{
  tags.push(`<span class="pac-conduct-tag tag-pend-spec" title="${esc(pn.descricao)}"><i class="ti ti-flag" aria-hidden="true"></i><span class="pt-txt">${esc(pn.descricao)}</span></span>`);
 });
 return tags.length ? `<div class="pac-conducts">${tags.join('')}</div>` : '';
}

function renderShiftPacientes(){
 const ps = (_shiftData && _shiftData.pacientes) || [];
 if(!ps.length) return '<div class="shift-empty">Nenhum paciente neste plantão ainda.</div>';
 const sorted = ps.slice().sort((a,b)=>{
  const ua=urgScore(a), ub=urgScore(b);
  if(ua!==ub) return ua-ub;
  return new Date(a.created_at)-new Date(b.created_at);
 });
 return sorted.map(p=>{
  const dt = p.created_at ? new Date(p.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) : '';
  const pendOpen = (p.pendencias||[]).filter(pn=>!pn.done).length;
  const pendTotal = (p.pendencias||[]).length;
  const sexoTxt = p.sexo==='M'?'M':p.sexo==='F'?'F':p.sexo==='O'?'O':'';
  const demoParts = [p.idade!=null?p.idade+'a':'', sexoTxt].filter(Boolean);
  const demo = demoParts.length ? '<span class="pac-demo">· '+esc(demoParts.join(' · '))+'</span>' : '';
  const isTimeDep = TIME_DEPENDENT_QUEIXAS.has(p.queixa) && !STATUS_CLOSED.has(p.status_conduta);
  const queixaIcon = isTimeDep ? '<i class="ti ti-alert-triangle" aria-hidden="true" style="color:#a32d2d;margin-right:4px"></i>' : '';
  const vitalsHtml = fmtVitais(p.sinais_vitais);
  const sind = p.sind_label || p.queixa || '';
  const reavalHtml = p.reavaliar_em ? `<div style="margin-top:6px;font-size:12px"><i class="ti ti-clock" aria-hidden="true"></i> Reaval.: ${fmtReaval(p.reavaliar_em)}</div>` : '';
  return `<div class="pac-card ${urgClass(p)}" onclick="openPacienteEdit(${Number(p.id)})">
   <div style="min-width:0">
    <div class="pac-line1">
     <span class="pac-name">${esc(_firstName(p.nome))}</span>
     ${demo}
    </div>
    ${vitalsHtml?`<div class="pac-vitals">${vitalsHtml}</div>`:''}
    <div class="pac-sind">${queixaIcon}${esc(sind)}</div>
    ${pacConductTags(p)}
    ${reavalHtml}
   </div>
   <div class="pac-right">
    <div class="pac-hora"><i class="ti ti-clock" aria-hidden="true"></i> ${esc(dt)}</div>
    <span class="pac-pend-count ${pendOpen>0?'has-open':''}">${pendOpen}/${pendTotal} pend.</span>
   </div>
  </div>`;
 }).join('');
}


async function doStartShift(){
 const notes = prompt('Notas iniciais do plantão (opcional, até 500 chars):');
 if(notes===null) return;
 const clean = notes ? notes.trim().slice(0,500) : null;
 const {error} = await sb.rpc('start_shift',{p_notes:clean});
 if(error){alert('Erro: '+(error.message||error));return;}
 showToast('Plantão iniciado');
 await loadShiftDashboard();
}

async function doEndShift(){
 if(!confirm('Encerrar plantão atual? Você pode iniciar um novo depois.'))return;
 const notes = prompt('Observações finais (opcional, até 500 chars):');
 if(notes===null) return;
 const clean = notes ? notes.trim().slice(0,500) : null;
 const {error} = await sb.rpc('end_shift',{p_notes:clean});
 if(error){alert('Erro: '+(error.message||error));return;}
 showToast('Plantão encerrado');
 await loadShiftDashboard();
}

async function doTogglePendencia(id){
 const {error} = await sb.rpc('toggle_pendencia',{p_id:id});
 if(error){alert('Erro: '+(error.message||error));return;}
 await loadShiftDashboard();
}

function openPacienteEdit(id){
 const ps = (_shiftData && _shiftData.pacientes) || [];
 const p = ps.find(x => Number(x.id) === Number(id));
 if(!p){alert('Paciente não encontrado.');return;}
 renderPacEdit(p);
}

function closePacEdit(){document.getElementById('pacEditArea').innerHTML='';}

function renderPacEdit(p){
 const area = document.getElementById('pacEditArea');
 const statusOpts = Object.entries(STATUS_LABEL).map(([k,v])=>
  `<option value="${esc(k)}" ${p.status_conduta===k?'selected':''}>${esc(v)}</option>`
 ).join('');
 const catOpts = Object.entries(PEND_CAT_LABEL).map(([k,v])=>
  `<option value="${esc(k)}">${esc(v)}</option>`
 ).join('');
 const dt = p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : '';
 const reavalCur = p.reavaliar_em
  ? new Date(p.reavaliar_em).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})
  : '';

 const pendList = (p.pendencias||[]).map(it => {
  const prazo = it.prazo ? new Date(it.prazo).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'}) : '';
  return `<div class="pend-item ${it.done?'done':''}">
   <input type="checkbox" ${it.done?'checked':''} onchange="doTogglePendenciaInEdit(${Number(it.id)}, ${Number(p.id)})">
   <span class="pend-cat">${esc(PEND_CAT_LABEL[it.categoria]||it.categoria)}</span>
   <div style="min-width:0">
    <div class="pend-desc" style="font-size:13px">${esc(it.descricao)}</div>
    ${prazo?`<div class="pend-paciente">prazo ${esc(prazo)}</div>`:''}
   </div>
   <button class="pend-del-btn" onclick="doDeletePendencia(${Number(it.id)}, ${Number(p.id)})" title="Excluir"><i class="ti ti-trash" aria-hidden="true"></i></button>
  </div>`;
 }).join('') || '<div style="font-size:12px;color:#6b7280;padding:8px 0">Sem pendências.</div>';

 const sexoTxt = p.sexo==='M'?'M':p.sexo==='F'?'F':p.sexo==='O'?'O':'';
 const demo = [p.idade!=null?p.idade+' anos':'', sexoTxt].filter(Boolean).join(' · ');
 const vitalsHtml = fmtVitais(p.sinais_vitais);
 const sindFull = p.sind_label || p.queixa || '—';
 area.innerHTML = `<div class="pac-edit-modal"><div class="pac-edit-box">
  <div class="modal-hdr">
   <div>
    <div style="font-size:16px;font-weight:600">${esc(p.nome||'Sem nome')}${demo?` <span style="font-size:13px;color:#6b7280;font-weight:400">(${esc(demo)})</span>`:''}</div>
    <div style="font-size:12px;color:#6b7280">${esc(sindFull)} • ${esc(dt)}</div>
   </div>
   <button class="modal-close" onclick="closePacEdit()" aria-label="Fechar">×</button>
  </div>
  ${vitalsHtml?`<div class="pac-vitals" style="margin-bottom:8px">${vitalsHtml}</div>`:''}
  <div style="margin-bottom:8px">
   <button class="shift-action-btn shift-act-pdf" style="font-size:12px;padding:6px 12px" onclick="viewReportText(${Number(p.id)})"><i class="ti ti-file-text" aria-hidden="true"></i> Ver relatório completo</button>
  </div>

  <div class="pac-edit-section">
   <h4>Status de conduta</h4>
   <div class="pac-edit-row">
    <select id="paceStatus" onchange="doUpdatePacStatus(${Number(p.id)})">${statusOpts}</select>
    <span class="pac-status-badge status-${esc(p.status_conduta)}" id="paceStatusBadge">${esc(STATUS_LABEL[p.status_conduta]||p.status_conduta)}</span>
   </div>
  </div>

  <div class="pac-edit-section">
   <h4>Reavaliação</h4>
   <div class="pac-edit-row" style="grid-template-columns:1fr auto auto">
    <input type="number" id="paceReavalMin" placeholder="Reavaliar em N minutos a partir de agora" min="1" max="2880" inputmode="numeric">
    <button class="shift-action-btn" style="background:#185fa5;color:#fff" onclick="doUpdatePacReaval(${Number(p.id)}, false)">Definir</button>
    <button class="shift-action-btn" style="background:#e5e7eb;color:#374151" onclick="doUpdatePacReaval(${Number(p.id)}, true)">Limpar</button>
   </div>
   ${reavalCur ? `<div style="font-size:12px;color:#6b7280;margin-top:4px">Atual: ${esc(reavalCur)} ${fmtReaval(p.reavaliar_em)}</div>` : '<div style="font-size:12px;color:#6b7280;margin-top:4px">Sem reavaliação agendada.</div>'}
  </div>

  <div class="pac-edit-section">
   <h4>Pendências</h4>
   <div class="pend-list-edit" style="margin-bottom:10px">${pendList}</div>
   <div class="pend-add-grid">
    <input type="text" id="pendAddDesc" placeholder="Descrição da pendência (até 500 chars)" maxlength="500">
    <select id="pendAddCat">${catOpts}</select>
    <input type="number" id="pendAddPrazo" placeholder="prazo min" min="1" max="2880" inputmode="numeric">
    <button onclick="doAddPendencia(${Number(p.id)})">Adicionar</button>
   </div>
  </div>
 </div></div>`;
}

async function doUpdatePacStatus(id){
 const sel = document.getElementById('paceStatus');
 const val = sel.value;
 const {error} = await sb.rpc('update_report_meta',{p_id:id, p_status_conduta:val, p_reavaliar_em:null, p_clear_reavaliar:false});
 if(error){alert('Erro: '+(error.message||error));return;}
 showToast('Status atualizado');
 await loadShiftDashboard();
 const p = (_shiftData.pacientes||[]).find(x=>Number(x.id)===Number(id));
 if(p) renderPacEdit(p);
}

async function doUpdatePacReaval(id, clear){
 if(clear){
  const {error} = await sb.rpc('update_report_meta',{p_id:id, p_status_conduta:null, p_reavaliar_em:null, p_clear_reavaliar:true});
  if(error){alert('Erro: '+(error.message||error));return;}
  showToast('Reavaliação removida');
 } else {
  const min = parseInt(document.getElementById('paceReavalMin').value,10);
  if(!min || min<1 || min>2880){alert('Informe um valor entre 1 e 2880 minutos.');return;}
  const target = new Date(Date.now() + min*60000).toISOString();
  const {error} = await sb.rpc('update_report_meta',{p_id:id, p_status_conduta:null, p_reavaliar_em:target, p_clear_reavaliar:false});
  if(error){alert('Erro: '+(error.message||error));return;}
  showToast('Reavaliação agendada para '+min+' min');
 }
 await loadShiftDashboard();
 const p = (_shiftData.pacientes||[]).find(x=>Number(x.id)===Number(id));
 if(p) renderPacEdit(p);
}

async function doAddPendencia(reportId){
 const desc = document.getElementById('pendAddDesc').value.trim();
 const cat = document.getElementById('pendAddCat').value;
 const prazoMin = parseInt(document.getElementById('pendAddPrazo').value,10);
 if(!desc){alert('Descrição é obrigatória.');return;}
 if(desc.length>500){alert('Descrição muito longa (máx 500 chars).');return;}
 const prazo = (prazoMin && prazoMin>=1 && prazoMin<=2880) ? new Date(Date.now()+prazoMin*60000).toISOString() : null;
 const {error} = await sb.rpc('add_pendencia',{p_report_id:reportId, p_descricao:desc, p_prazo:prazo, p_categoria:cat});
 if(error){alert('Erro: '+(error.message||error));return;}
 showToast('Pendência adicionada');
 await loadShiftDashboard();
 const p = (_shiftData.pacientes||[]).find(x=>Number(x.id)===Number(reportId));
 if(p) renderPacEdit(p);
}

async function viewReportText(id){
 const {data, error} = await sb.rpc('load_report_text', {p_id: id});
 if(error){alert('Erro: '+(error.message||error)); return;}
 showRel(data || '(relatório vazio)');
}

async function doTogglePendenciaInEdit(id, reportId){
 const {error} = await sb.rpc('toggle_pendencia',{p_id:id});
 if(error){alert('Erro: '+(error.message||error));return;}
 await loadShiftDashboard();
 const p = (_shiftData.pacientes||[]).find(x=>Number(x.id)===Number(reportId));
 if(p) renderPacEdit(p);
}

async function doDeletePendencia(id, reportId){
 if(!confirm('Excluir pendência?'))return;
 const {error} = await sb.rpc('delete_pendencia',{p_id:id});
 if(error){alert('Erro: '+(error.message||error));return;}
 showToast('Pendência excluída');
 await loadShiftDashboard();
 const p = (_shiftData.pacientes||[]).find(x=>Number(x.id)===Number(reportId));
 if(p) renderPacEdit(p);
}

function exportShiftPDF(){
 if(!_shiftData || !_shiftData.shift){alert('Sem plantão para exportar.');return;}
 if(!window.jspdf || !window.jspdf.jsPDF){alert('Biblioteca PDF ainda carregando. Tente novamente em alguns segundos.');return;}
 const { jsPDF } = window.jspdf;
 const doc = new jsPDF({unit:'pt', format:'a4'});
 const W = doc.internal.pageSize.getWidth();
 const H = doc.internal.pageSize.getHeight();
 const M = 40;
 let y = M;

 function tx(txt, size, bold, color){
  doc.setFontSize(size);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setTextColor(...(color||[17,24,39]));
  const ls = doc.splitTextToSize(String(txt==null?'':txt), W - 2*M);
  doc.text(ls, M, y);
  y += ls.length * (size * 1.25);
 }
 function rule(){doc.setLineWidth(0.5);doc.setDrawColor(220,220,220);doc.line(M, y, W-M, y);y += 6;}
 function sp(n){y += n;}
 function ensure(need){if(y + need > H - 50){doc.addPage();y = M;}}

 const sh = _shiftData.shift;
 const ps = _shiftData.pacientes || [];
 const started = new Date(sh.started_at);
 const ended = sh.ended_at ? new Date(sh.ended_at) : new Date();
 const durMs = ended - started;
 const dh = Math.floor(durMs/3600000);
 const dm = Math.floor((durMs%3600000)/60000);

 // Cabeçalho
 tx('Resumo de Plantão', 18, true);
 sp(4);
 const medico = (_currentProfile && _currentProfile.nome_completo) || '—';
 const crmTxt = (_currentProfile && _currentProfile.crm) ? ' · CRM ' + _currentProfile.crm + '/' + (_currentProfile.crm_uf || '??') : '';
 const espTxt = (_currentProfile && _currentProfile.especialidade) ? ' · ' + _currentProfile.especialidade : '';
 tx(medico + crmTxt + espTxt, 11);
 sp(2);
 tx('Início: ' + started.toLocaleString('pt-BR') + (sh.ended_at ? ' · Encerrado: ' + ended.toLocaleString('pt-BR') : ' · Em curso (snapshot)'), 9, false, [107,114,128]);
 tx('Duração: ' + dh + 'h ' + dm + 'min · ' + ps.length + ' paciente(s)', 9, false, [107,114,128]);
 sp(10); rule(); sp(6);

 // Métricas
 const now = Date.now();
 const emConduta   = ps.filter(p=>p.status_conduta==='em_conduta').length;
 const reavalVenc  = ps.filter(p=>p.reavaliar_em && new Date(p.reavaliar_em).getTime() < now).length;
 const pendOpenTot = ps.reduce((s,p)=> s + ((p.pendencias||[]).filter(pn=>!pn.done).length), 0);
 tx('Métricas', 11, true);
 tx(`Total: ${ps.length} · Em conduta: ${emConduta} · Reaval. vencidas: ${reavalVenc} · Pendências abertas: ${pendOpenTot}`, 10);
 sp(10); rule(); sp(8);

 if(sh.notes){
  tx('Notas do plantão', 11, true);
  tx(sh.notes, 10);
  sp(8); rule(); sp(6);
 }

 // Lista de pacientes
 if(!ps.length){
  tx('(Nenhum paciente registrado neste plantão.)', 10, false, [107,114,128]);
 } else {
  tx('Pacientes', 13, true);
  sp(4);
  const sorted = ps.slice().sort((a,b)=> new Date(a.created_at) - new Date(b.created_at));
  sorted.forEach((p, idx)=>{
   ensure(120);
   // Cabeçalho do paciente
   const hdr = (idx+1) + '. ' + _firstName(p.nome) + (p.idade!=null?' · '+p.idade+'a':'') + (p.sexo?' · '+p.sexo:'');
   tx(hdr, 12, true);
   const dt = p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : '';
   tx('Admissão: ' + dt, 9, false, [107,114,128]);
   const sind = p.sind_label || p.queixa || '—';
   tx('Síndrome: ' + sind, 10, false, [24,95,165]);
   // Vitais
   const v = p.sinais_vitais;
   if(v){
    const parts = [];
    if(v.fc) parts.push('FC '+v.fc);
    if(v.sat) parts.push('SpO2 '+v.sat+'%');
    if(v.pa) parts.push('PA '+v.pa);
    if(v.fr) parts.push('FR '+v.fr);
    if(v.temp) parts.push('T '+v.temp+'°C');
    if(parts.length) tx(parts.join('  |  '), 9, false, [55,65,81]);
   }
   // Status + reaval
   const stLbl = STATUS_LABEL[p.status_conduta] || p.status_conduta;
   let stLine = 'Status: ' + stLbl;
   if(p.reavaliar_em){
    const rv = new Date(p.reavaliar_em);
    const due = rv < new Date() ? '  [VENCIDA]' : '';
    stLine += '   ·   Reavaliar: ' + rv.toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'}) + due;
   }
   tx(stLine, 9);
   // Pendências
   const pends = p.pendencias || [];
   if(pends.length){
    sp(2);
    tx('Pendências:', 10, true);
    pends.forEach(pn=>{
     ensure(20);
     const chk = pn.done ? '[x]' : '[ ]';
     const cat = '(' + (PEND_CAT_LABEL[pn.categoria]||pn.categoria) + ')';
     const prz = pn.prazo ? '  · prazo ' + new Date(pn.prazo).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'}) : '';
     tx('  ' + chk + ' ' + pn.descricao + '  ' + cat + prz, 9);
    });
   }
   sp(8); rule(); sp(4);
  });
 }

 // Rodapé em todas as páginas
 const total = doc.internal.getNumberOfPages();
 for(let i=1; i<=total; i++){
  doc.setPage(i);
  doc.setFontSize(8);
  doc.setTextColor(156,163,175);
  doc.text('Emergência Pro · v' + (typeof BUILD_VERSION!=='undefined'?BUILD_VERSION:'—') + ' · gerado ' + new Date().toLocaleString('pt-BR'), M, H-20);
  doc.text(`${i} / ${total}`, W-M-30, H-20);
 }

 const stampDate = started.toISOString().slice(0,10);
 const stampTime = started.toTimeString().slice(0,5).replace(':','');
 doc.save('plantao_' + stampDate + '_' + stampTime + '.pdf');
}



