/* ─── Passo 5: Relatório de Admissão, Tríade PEP & Pendências ─── */
function s5(){
 const statusOpts = Object.entries(STATUS_LABEL).map(([k,v])=>
  `<option value="${esc(k)}" ${S.condStatus===k?'selected':''}>${esc(v)}</option>`
 ).join('');
 const catOpts = Object.entries(PEND_CAT_LABEL).map(([k,v])=>
  `<option value="${esc(k)}" ${S.condPendCat===k?'selected':''}>${esc(v)}</option>`
 ).join('');
 return `<div id="step-5" class="card"><div class="st"><i class="ti ti-file-text" aria-hidden="true"></i> Relatório de admissão</div>${pSumH()}${QX_BADGE[S.queixa]?QX_BADGE[S.queixa]():''}<div id="news2AlertS5">${renderNews2Step5Alert()}</div><div class="desktop-hide-relcard">
<div class="pep-action-toolbar" style="margin-bottom:10px;border-radius:6px;border:0.5px solid var(--color-border-tertiary)" title="Copiar seções prontas para colar no PEP hospitalar">
 <span class="pep-toolbar-lbl"><i class="ti ti-clipboard-data" aria-hidden="true"></i> PEP:</span>
 <button type="button" class="pep-tool-btn" style="flex:1" onclick="copyPepSection('anamnese')"><i class="ti ti-clipboard" aria-hidden="true"></i> Anamnese</button>
 <button type="button" class="pep-tool-btn" style="flex:1" onclick="copyPepSection('ef')"><i class="ti ti-stethoscope" aria-hidden="true"></i> Exame Físico</button>
 <button type="button" class="pep-tool-btn" style="flex:1" onclick="copyPepSection('conduta')"><i class="ti ti-checklist" aria-hidden="true"></i> Conduta</button>
 <button type="button" class="pep-tool-btn pep-tool-btn-all" onclick="copyPepSection('tudo')"><i class="ti ti-copy" aria-hidden="true"></i> Tudo</button>
</div>
<div class="rg" style="margin-bottom:10px"><span class="ro ${S.relMode==='full'?'on':''}" onclick="S.relMode='full';render()"><i class="ti ti-file-text" aria-hidden="true"></i> Completo</span><span class="ro ${S.relMode==='resumo'?'on':''}" onclick="S.relMode='resumo';render()"><i class="ti ti-list" aria-hidden="true"></i> Resumo de plantão</span></div><div class="relbox" id="relTxt"></div></div>
<div style="border-top:.5px solid #e5e7eb;padding-top:12px;margin-top:12px;margin-bottom:12px">
 <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;font-weight:500">Conduta inicial (vai para o painel de plantão)</div>
 <div class="r2" style="margin-bottom:8px">
  <div><label>Status</label><select onchange="S.condStatus=this.value">${statusOpts}</select></div>
  <div><label>Reavaliar em (min)</label><input type="number" min="1" max="2880" inputmode="numeric" value="${S.condReavalMin||''}" oninput="S.condReavalMin=parseInt(this.value,10)||null" placeholder="opcional"></div>
 </div>
 <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.4px;margin:10px 0 6px;font-weight:500">Pendência inicial (opcional)</div>
 <div style="margin-bottom:6px"><input type="text" maxlength="500" value="${esc(S.condPendDesc)}" oninput="S.condPendDesc=this.value" placeholder="Descrição da pendência (deixe vazio para pular)"></div>
 <div class="r2"><div><label>Categoria</label><select onchange="S.condPendCat=this.value">${catOpts}</select></div><div><label>Prazo (min)</label><input type="number" min="1" max="2880" inputmode="numeric" value="${S.condPendPrazoMin||''}" oninput="S.condPendPrazoMin=parseInt(this.value,10)||null" placeholder="opcional"></div></div>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btng" onclick="navigator.clipboard.writeText(document.getElementById('relTxt').textContent).then(()=>showToast('Relatório copiado!'))"><i class="ti ti-copy" aria-hidden="true"></i> Copiar Relatório</button><button class="btng btn-clean-patient" onclick="copyAndClearPatient()"><i class="ti ti-copy-check" aria-hidden="true"></i> Copiar e Limpar Paciente</button><button class="btng" style="background:#185fa5" onclick="saveReport(document.getElementById('relTxt').textContent)"><i class="ti ti-device-floppy" aria-hidden="true"></i> Salvar</button><button class="btns" onclick="showSaved()"><i class="ti ti-history" aria-hidden="true"></i> Ver salvos</button><button class="btns" onclick="pv()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Editar</button></div></div>`;
}


// ─── Extração & Cópia Rápida para o PEP (Tríade: Anamnese, EF, Conduta) ───
function getReportTextForCopy(){
 const ta = document.getElementById('relColTxt');
 if(ta && ta.value && ta.value.trim()) return ta.value;
 const rt = document.getElementById('relTxt');
 if(rt && rt.textContent && rt.textContent.trim()) return rt.textContent;
 return S.relMode === 'resumo' ? gResumo() : gRel();
}

function extractPepSection(txt, sec){
 if(!txt) return '';
 if(sec === 'tudo') return txt.trim();

 const lines = txt.split('\n');
 const sections = {};
 let currentSec = 'HEADER';
 let currentContent = [];

 lines.forEach(line => {
  if(line.startsWith('# ')) {
   if(currentContent.length) {
    sections[currentSec] = (sections[currentSec] || []).concat(currentContent);
   }
   const title = line.replace(/^#\s+/, '').trim().toUpperCase();
   if(title.includes('ADMISSÃO')) currentSec = 'ADMISSAO';
   else if(title.includes('HISTÓRIA DA DOENÇA') || title.includes('HDA')) currentSec = 'HDA';
   else if(title.includes('ANTECEDENTES')) currentSec = 'ANTECEDENTES';
   else if(title.includes('SINAIS VITAIS')) currentSec = 'VITAIS';
   else if(title.includes('EXAME FÍSICO')) currentSec = 'EF';
   else if(title.includes('SCORES')) currentSec = 'SCORES';
   else if(title.includes('ELETROCARDIOGRAMA') || title.includes('ECG')) currentSec = 'ECG';
   else if(title.includes('ULTRASSONOGRAFIA') || title.includes('POCUS')) currentSec = 'POCUS';
   else if(title.includes('CONDUTA') || title.includes('PLANO')) currentSec = 'CONDUTA';
   else if(title.includes('PENDÊNCIAS')) currentSec = 'PENDENCIAS';
   else currentSec = title;
   currentContent = [line];
  } else {
   currentContent.push(line);
  }
 });
 if(currentContent.length) {
  sections[currentSec] = (sections[currentSec] || []).concat(currentContent);
 }

 const getSecText = (key) => sections[key] ? sections[key].join('\n').trim() : '';

 if(sec === 'anamnese') {
  const parts = [
   getSecText('ADMISSAO') || buildHeader(),
   getSecText('HDA') || buildHDA(),
   getSecText('ANTECEDENTES') || buildAntecedentes()
  ].filter(Boolean);
  return parts.join('\n\n').trim();
 }

 if(sec === 'ef') {
  const parts = [
   getSecText('VITAIS') || buildVitais(),
   getSecText('EF') || buildEF(),
   getSecText('SCORES') || buildPredictiveScores(),
   getSecText('ECG') || buildEcgText(),
   getSecText('POCUS') || buildPocText()
  ].filter(Boolean);
  return parts.join('\n\n').trim();
 }

 if(sec === 'conduta') {
  const parts = [
   getSecText('CONDUTA') || buildCondutas(),
   getSecText('PENDENCIAS')
  ].filter(Boolean);
  return parts.join('\n\n').trim();
 }

 return txt.trim();
}

function copyPepSection(sec){
 if(typeof autoSave === 'function') autoSave(true);
 const raw = getReportTextForCopy();
 const textToCopy = extractPepSection(raw, sec);
 if(!textToCopy){
  showToast('Seção vazia.');
  return;
 }
 const labels = {
  anamnese: '1. Anamnese copiada para o PEP!',
  ef: '2. Exame Físico copiado para o PEP!',
  conduta: '3. Conduta copiada para o PEP!',
  tudo: 'Prontuário completo copiado!'
 };
 const toastMsg = labels[sec] || 'Copiado com sucesso!';
 if(navigator.clipboard && navigator.clipboard.writeText){
  navigator.clipboard.writeText(textToCopy);
  showToast(toastMsg);
 } else {
  const ta = document.createElement('textarea');
  ta.value = textToCopy;
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  showToast(toastMsg);
 }
}

function copyPrescricaoOnly(){
 if(typeof autoSave === 'function') autoSave(true);
 const presc=buildCondutas();
 if(!presc||!presc.trim()){
  showToast('Nenhuma conduta selecionada.');
  return;
 }
 const txt=presc.trim();
 if(navigator.clipboard&&navigator.clipboard.writeText){
  navigator.clipboard.writeText(txt).then(()=>showToast('Prescrição copiada!'));
 } else {
  const ta=document.createElement('textarea');
  ta.value=txt;
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  showToast('Prescrição copiada!');
 }
}

let _lastRelValue = '';
let _liveDiffTimer = null;
function triggerReportLiveDiff(){
 const wrap = document.querySelector('.rel-col-txt-wrap');
 const ta = document.getElementById('relColTxt');
 if(!wrap) return;
 wrap.classList.add('live-diff-highlight');
 if(ta) ta.classList.add('live-diff-highlight');
 if(_liveDiffTimer) clearTimeout(_liveDiffTimer);
 _liveDiffTimer = setTimeout(()=>{
  wrap.classList.remove('live-diff-highlight');
  if(ta) ta.classList.remove('live-diff-highlight');
  _liveDiffTimer = null;
 }, 1200);
}

function updateRelCol(){
 const newVal = S.relMode==='resumo'?gResumo():gRel();
 const rt=document.getElementById('relTxt');
 if(rt)rt.textContent = newVal;
 const ta=document.getElementById('relColTxt');
 if(!ta)return;
 if(_lastRelValue && _lastRelValue !== newVal){
  triggerReportLiveDiff();
 }
 _lastRelValue = newVal;
 ta.value = newVal;
 const fb=document.getElementById('relModeFullBtn');
 const rb=document.getElementById('relModeResumoBtn');
 if(fb)fb.classList.toggle('on',S.relMode!=='resumo');
 if(rb)rb.classList.toggle('on',S.relMode==='resumo');
}
function copyRelCol(){
 const ta=document.getElementById('relColTxt');
 if(ta){
  if(typeof autoSave === 'function') autoSave(true);
  navigator.clipboard.writeText(ta.value).then(()=>showToast('Copiado!'));
 }
}
function saveReportFromCol(){const ta=document.getElementById('relColTxt');if(ta)saveReport(ta.value);}
