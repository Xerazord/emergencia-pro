/* ─── Registro de Evidências Clínicas & Popover (CDS) ─── */
const EVIDENCE_REGISTRY = {
 ecg_precoce: {
  title: 'ECG Precoce em < 10 minutos',
  guideline: 'Diretriz SBC SCA 2021 / AHA-ACC 2023',
  recClass: 'Classe I',
  evidenceLevel: 'Nível B',
  rationale: 'A realização e interpretação do ECG de 12 derivações nos primeiros 10 minutos da chegada reduz o tempo porta-balão/porta-agulha e previne desfechos adversos.'
 },
 dapt_sca: {
  title: 'Dupla Antiagregação Plaquetária (DAPT)',
  guideline: 'Diretriz SBC SCA 2021 / ESC 2023',
  recClass: 'Classe I',
  evidenceLevel: 'Nível A',
  rationale: 'Associação de AAS a um inibidor P2Y12 (Ticagrelor ou Clopidogrel) reduz reinfarto, trombose de stent e mortalidade cardiovascular.'
 },
 trombolise_avc: {
  title: 'Trombólise Química no AVCI (< 4,5h)',
  guideline: 'Diretriz AVC Agudo SBDC / AHA-ASA 2023',
  recClass: 'Classe I',
  evidenceLevel: 'Nível A',
  rationale: 'Alteplase ou Tenecteplase em até 4,5h do ictus melhora significativamente a sobrevida livre de incapacidade funcional aos 90 dias.'
 },
 sepse_atb: {
  title: 'Antibioticoterapia Precoce na Sepse',
  guideline: 'Surviving Sepsis Campaign (SSC) 2021',
  recClass: 'Classe I',
  evidenceLevel: 'Nível B',
  rationale: 'Início de antibiótico de amplo espectro na 1ª hora (Golden Hour) é a intervenção de maior impacto isolado na redução da mortalidade.'
 },
 nora_choque: {
  title: 'Noradrenalina como Vasopressor de 1ª Linha',
  guideline: 'Surviving Sepsis Campaign (SSC) 2021',
  recClass: 'Classe I',
  evidenceLevel: 'Nível A',
  rationale: 'Noradrenalina restaura o tônus vascular com alvo de PAM ≥ 65 mmHg apresentando menor taquiarritmia que a dopamina.'
 },
 cve_taqui: {
  title: 'Cardioversão Elétrica Sincronizada',
  guideline: 'Diretriz SBC Arritmias / ACLS AHA 2024',
  recClass: 'Classe I',
  evidenceLevel: 'Nível B',
  rationale: 'Taquiarritmias com instabilidade hemodinâmica, choque, EAP ou angina exigem cardioversão sincronizada imediata.'
 },
 iot_sri: {
  title: 'Sequência Rápida de Intubação (SRI)',
  guideline: 'Difficult Airway Society / Manual de IOT de Emergência',
  recClass: 'Classe I',
  evidenceLevel: 'Nível B',
  rationale: 'Pré-oxigenação com hipnótico e bloqueador neuromuscular de ação rápida otimiza sucesso na 1ª tentativa e previne broncoaspiração.'
 },
 perc_tep: {
  title: 'Regra de Exclusão PERC em Baixo Risco de TEP',
  guideline: 'ESC Guidelines TEP 2019 / Annals Emerg Med',
  recClass: 'Classe IIa',
  evidenceLevel: 'Nível B',
  rationale: 'Permite descartar TEP com segurança sem dosar D-Dímero ou solicitar AngioTC quando todos os 8 critérios são negativos.'
 },
 heparina_sca: {
  title: 'Anticoagulação Plena na SCA',
  guideline: 'Diretriz SBC / ESC NSTE-ACS 2023',
  recClass: 'Classe I',
  evidenceLevel: 'Nível A',
  rationale: 'Enoxaparina ou Heparina não-fracionada reduz progressão trombótica coronariana e isquemia recorrente.'
 },
 trop_seriada: {
  title: 'Troponina Ultrassensível Seriada',
  guideline: '4ª Definição Universal de Infarto / ESC 2023',
  recClass: 'Classe I',
  evidenceLevel: 'Nível A',
  rationale: 'Protocolos de 0/1h ou 0/2h de troponina ultrassensível permitem rule-out e rule-in diagnósticos rápidos e precisos de IAM.'
 }
};

function getEvidenceKeyForItem(item){
 if(!item) return null;
 const t = item.toLowerCase();
 if(t.startsWith('ecg') || t.includes('eletrocardiograma')) return 'ecg_precoce';
 if(t.includes('aas') || t.includes('clopidogrel') || t.includes('ticagrelor') || t.includes('antiagrega')) return 'dapt_sca';
 if(t.includes('trombolise') || t.includes('alteplase') || t.includes('tenecteplase')) return 'trombolise_avc';
 if(t.includes('antibiótico') || t.includes('ceftriaxona') || t.includes('meropenem') || t.includes('golden hour')) return 'sepse_atb';
 if(t.includes('noradrenalina') || t.includes('norepinefrina')) return 'nora_choque';
 if(t.includes('cardioversão') || t.includes('cardioversao')) return 'cve_taqui';
 if(t.includes('intubação') || t.includes('quetamina') || t.includes('rocurônio') || t.includes('sri')) return 'iot_sri';
 if(t.includes('perc') || t.includes('years')) return 'perc_tep';
 if(t.includes('enoxaparina') || t.includes('heparina')) return 'heparina_sca';
 if(t.includes('troponina')) return 'trop_seriada';
 return null;
}

function showEvidencePopover(e, key){
 if(e){ e.stopPropagation(); if(e.preventDefault) e.preventDefault(); }
 const ev = EVIDENCE_REGISTRY[key];
 if(!ev) return;
 let pop = document.getElementById('evidencePopover');
 if(!pop){
  pop = document.createElement('div');
  pop.id = 'evidencePopover';
  pop.className = 'evidence-popover';
  document.body.appendChild(pop);
 }
 pop.innerHTML = `
  <div class="evidence-popover-hdr">
   <div style="display:flex;align-items:center;gap:6px">
    <i class="ti ti-certificate" style="color:#2563eb;font-size:16px"></i>
    <strong>${esc(ev.title)}</strong>
   </div>
   <button class="evidence-close-btn" onclick="closeEvidencePopover()" aria-label="Fechar">×</button>
  </div>
  <div style="font-size:11.5px;color:var(--color-text-secondary);margin-bottom:6px">
   <i class="ti ti-book"></i> <strong>Referência:</strong> ${esc(ev.guideline)}
  </div>
  <div style="display:flex;gap:6px;margin-bottom:8px">
   <span class="evidence-badge badge-class">${esc(ev.recClass)}</span>
   <span class="evidence-badge badge-level">${esc(ev.evidenceLevel)}</span>
  </div>
  <div style="font-size:12px;line-height:1.45;color:var(--color-text-primary);background:var(--color-background-secondary);padding:6px 8px;border-radius:6px">
   ${esc(ev.rationale)}
  </div>
 `;
 pop.style.display = 'block';
 if(e && e.target && typeof e.target.getBoundingClientRect === 'function'){
  const rect = e.target.getBoundingClientRect();
  const top = (window.scrollY || window.pageYOffset || 0) + rect.bottom + 6;
  let left = (window.scrollX || window.pageXOffset || 0) + rect.left - 120;
  if(left < 10) left = 10;
  if(left + 320 > (window.innerWidth || 800)) left = Math.max(10, (window.innerWidth || 800) - 330);
  pop.style.top = top + 'px';
  pop.style.left = left + 'px';
 }
}

function closeEvidencePopover(){
 const pop = document.getElementById('evidencePopover');
 if(pop) pop.style.display = 'none';
}


