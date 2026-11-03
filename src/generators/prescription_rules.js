/* ─── Regras de Prescrição Canônica, Deduplicação e Unificação de Exames ─── */
function getCanonicalConductKey(txt){
 if(!txt)return null;
 const t=txt.toLowerCase();
 // Monitorização
 if(t.includes('monitorização')||t.includes('telemetria')||t.includes('cardioscopia')||t.includes('sinais vitais contínu')||t.includes('monitor multiparamétrico')){
  return 'monitor';
 }
 // ECG
 if(t.startsWith('ecg')||t.startsWith('eletrocardiograma')||t.includes('ecg 12')||t.includes('ecg de 12')||t.includes('eletrocardiograma de 12')||t.includes('repetir ecg')||(t.includes('ecg')&&(t.includes('derivaç')||t.includes('admissão')||t.includes('10 min')||t.includes('seriado')||t.includes('repetir')||t.includes('15-30')||t.includes('15–30')))){
  return 'ecg';
 }
 // Acesso Venoso
 if(t.includes('acesso venoso')||t.includes('acesso vascular')||t.includes('punção venosa')||t.includes('2 acessos')||t.includes('avp')){
  return 'acesso';
 }
 // Oxigenoterapia
 if(t.includes('oxigenoterapia')||t.includes('o2 suplementar')||t.includes('cânula nasal')||t.includes('cateter nasal')||t.includes('alvo spo2')){
  return 'oxigenio';
 }
 // Glicemia Capilar
 if(t.includes('glicemia capilar')||t.includes('hgt imediato')||t.includes('hgt na chegada')){
  return 'glicemia';
 }
 // Diurese / Sonda Vesical
 if(t.includes('cateter vesical')||t.includes('sonda vesical')||t.includes('diurese horária')){
  return 'sonda_vesical';
 }
 // Repouso
 if((t.includes('repouso no leito')||t.includes('repouso absoluto')||t.includes('cabeceira')) && !t.includes('medidas de tratamento para hic') && !t.includes('neuroproteção') && !t.includes('pic')){
  return 'repouso';
 }
 // Gasometria + Lactato
 if(((t.includes('gasometria')&&t.includes('lactato'))||t.includes('lactato sérico')||t.includes('lactato basal')) && !t.includes('hemograma') && !t.includes('painel') && !t.includes('laborat') && !t.includes('eletrólitos') && !t.includes('creatinina') && !t.includes('ureia') && !t.includes('coagulograma') && !t.includes('troponina') && !t.includes('ast') && !t.includes('alt') && !t.includes('tgo') && !t.includes('tgp') && !t.includes('plaquetas') && !t.includes('amilase') && !t.includes('lipase') && !t.includes('bilirrubin')){
  return 'gaso_lactato';
 }
 // Dieta Zero / Jejum
 if(t.includes('jejum')||t.includes('dieta zero')||t.includes('nada por via oral')||t.includes('npo')||t.includes('suspender dieta')){
  return 'jejum';
 }
 // Ondansetrona
 if(t.includes('ondansetrona')||t.includes('ondansetrana')){
  return 'ondansetrana';
 }
 // Dipirona
 if(t.includes('dipirona 1g')||t.includes('dipirona 1 g')||t.includes('dipirona 1000mg')||t.includes('dipirona iv')||t.includes('dipirona 2 ml')){
  return 'dipirona';
 }
 // POCUS
 if((t.includes('pocus')||t.includes('ultrassom point-of-care')||t.includes('ultrassonografia beira-leito')||t.includes('focus cardíaco')||t.includes('ultrassom focado')) && !t.includes('bainha do nervo') && !t.includes('dno') && !t.includes('pulmonar') && !t.includes('blue') && !t.includes('fast') && !t.includes('efast')){
  return 'pocus';
 }
 // Lab de Triagem
 if((t.includes('hemograma, ureia, creatinina, eletrólitos')||t.includes('hemograma, eletrólitos, função renal')||t.includes('hemograma completo, ureia, creatinina')||(t.includes('hemograma')&&(t.includes('creatinina')||t.includes('cr'))&&(t.includes('ureia')||t.includes('ur')))) && !t.includes('troponina') && !t.includes('coagulograma') && !t.includes('gasometria') && !t.includes('lactato') && !t.includes('amilase') && !t.includes('lipase') && !t.includes('ast') && !t.includes('alt') && !t.includes('tgo') && !t.includes('tgp') && !t.includes('bilirrubin')){
  return 'lab_triagem';
 }
 return null;
}

function isGenericVitalSupportItem(item){
 if(!item)return false;
 const t=item.toLowerCase();
 // Preserva expressamente bundles de suporte especializado e diretrizes de ressuscitação
 if(t.includes('medidas de tratamento para hic') || t.includes('neuroproteção') || t.includes('pic') || t.includes('sepse') || t.includes('vasopressor') || t.includes('trombólise') || t.includes('vni') || t.includes('cpap') || t.includes('descompressão') || t.includes('dreno') || t.includes('hemodinâmica')) return false;
 return t.includes('monitorização') || t.includes('oximetria') || t.includes('acesso venoso') || t.includes('oxigenoterapia') || t.includes('cabeceira') || t.includes('repouso no leito') || t.includes('cardioscopia') || t.includes('telemetria');
}

const CANONICAL_PRESCRIPTION_ORDERS={
 ecg: 'Eletrocardiograma (ECG) de 12 derivações na admissão e seriado se recorrência ou instabilidade',
 monitor: 'Monitorização multiparamétrica contínua (cardioscopia contínua, SpO2, PNI)',
 acesso: 'Acesso venoso periférico calibroso imediato (16G ou 18G em membro superior)',
 oxigenio: 'Oxigenoterapia suplementar sob demanda (titular para alvo SpO2 92–96%, ou 88–92% em DPOC/retentores)',
 glicemia: 'Glicemia capilar imediata na admissão e vigilância seriada',
 sonda_vesical: 'Cateter vesical de demora para controle estrito de diurese horária',
 repouso: 'Repouso no leito com cabeceira elevada a 30 graus',
 gaso_lactato: 'Coleta imediata de gasometria com dosagem de lactato sérico na admissão',
 jejum: 'Dieta zero / Jejum imediato por via oral',
 ondansetrana: 'Ondansetrona 8 mg IV se náuseas ou vômitos',
 dipirona: 'Dipirona 1 g (2 mL) IV diluído em 100 mL de SF 0,9% correr em 15–20 min se dor/febre',
 pocus: 'POCUS à beira-leito direcionado protocolar',
 lab_triagem: 'Exames laboratoriais de urgência: Hemograma completo, Ureia, Creatinina, Sódio, Potássio'
};

function cleanPrescriptionItem(txt){
 if(!txt)return '';
 let s=txt;
 s=s.replace(/\[CONTRAINDICADO\s+se[^\]]+\]/gi,'(suspender se PAS < 100 mmHg ou inibidor PDE-5 em 24-48h)');
 s=s.replace(/\[atenção:[^\]]+\]/gi,'');
 s=s.replace(/\[diretriz:[^\]]+\]/gi,'');
 s=s.replace(/\[classe\s+[i|v|x]+[^\]]*\]/gi,'');
 s=s.replace(/\[[^\]]*(?:classe|nível|nivel|diretriz|sbc|aha|esc|ssc|guideline)[^\]]*\]/gi,'');
 s=s.replace(/\(Glasgow isolado não indica intubação mandatória em coma não-traumático\)/gi,'');
 s=s.replace(/\(tendência de queda indica melhora da perfusão; não constitui meta isolada para volume ou vasopressor\)/gi,'');
 s=s.replace(/\(evitar nitratos se suspeita de IAM de VD com instabilidade ou uso de inibidores de PDE-5\)/gi,'');
 s=s.replace(/\s{2,}/g,' ').trim();
 return s;
}


const EXAM_QUICK_CHIPS = [
 'Hemograma', 'Ureia e Creatinina', 'Eletrólitos (Na/K)', 'Coagulograma', 'Troponina hs', 
 'D-Dímero', 'Gasometria com lactato', 'Urina 1', 'Hemoculturas (2 pares)', 'Glicemia', 
 'Radiografia de tórax', 'TC de crânio', 'AngioTC', 'POCUS beira-leito'
];

function addCustomExam(name){
 if(!name||!name.trim()) return;
 const trimmed = name.trim();
 if(!S.customExams) S.customExams = [];
 if(!S.customExams.some(x => x.toLowerCase() === trimmed.toLowerCase())){
  S.customExams.push(trimmed);
  autoSave();
  render();
  const ta = document.getElementById('relColTxt');
  if(ta) ta.value = gRel();
  if(typeof showToast === 'function') showToast(`Exame adicionado: ${trimmed}`);
 }
}

function removeCustomExam(name){
 if(!S.customExams) return;
 S.customExams = S.customExams.filter(x => x.toLowerCase() !== name.toLowerCase());
 autoSave();
 render();
 const ta = document.getElementById('relColTxt');
 if(ta) ta.value = gRel();
 if(typeof showToast === 'function') showToast(`Exame removido: ${name}`);
}

function toggleCustomExamChip(name){
 if(!S.customExams) S.customExams = [];
 const exists = S.customExams.some(x => x.toLowerCase() === name.toLowerCase());
 if(exists){
  removeCustomExam(name);
 } else {
  addCustomExam(name);
 }
}

function cleanExamItemName(raw){
 let item = (raw || '').trim().replace(/^-\s*/, '').replace(/^\[.*?\]\s*/, '');
 const l = item.toLowerCase();
 
 if(l.includes('tc de crânio imediata') || l.includes('tc de crânio sem contraste') || l.includes('tomografia de crânio')){
  return 'TC de Crânio sem contraste imediata';
 }
 if(l.includes('angiotomografia arterial e venosa de crânio') || (l.includes('angiotc') && l.includes('crânio'))){
  return 'Angiotomografia de crânio (AngioTC)';
 }
 if(l.includes('bainha do nervo óptico') || l.includes('dno')){
  return 'POCUS da bainha do nervo óptico (DNO)';
 }
 if(l.includes('pocus focado') || (l.includes('pocus') && l.includes('contratilidade'))){
  return 'POCUS focado à beira-leito';
 }
 if(l.includes('pocus pulmonar') || l.includes('protocolo blue')){
  return 'POCUS pulmonar (Protocolo BLUE)';
 }
 if(l.includes('fast') || l.includes('efast')){
  return 'POCUS eFAST à beira-leito';
 }
 if(l.includes('radiografia de tórax') || l.includes('rx de tórax') || l.includes('raio-x de tórax')){
  return 'Radiografia de tórax no leito';
 }
 if(l.includes('d-dímero') || l.includes('ddímero')){
  return 'D-Dímero quantitativo';
 }
 if(l.includes('2 pares de hemoculturas') || l.includes('hemoculturas de sítios') || l.includes('hemoculturas pareadas')){
  return '2 pares de hemoculturas pareadas';
 }
 if(l.includes('culturas de sítios suspeitos') || l.includes('culturas direcionadas')){
  return 'Culturas de sítios suspeitos com antibiograma';
 }
 if((l.includes('urina tipo 1') || l.includes('sedimento urinário') || l.includes('eas')) && !l.includes('hemograma') && !l.includes('função renal') && !l.includes('ureia') && !l.includes('creatinina')){
  return 'Urina tipo 1 (sedimento urinário)';
 }
 if((l.includes('gasometria com dosagem de lactato') || l.includes('gasometria venosa imediata') || l.includes('lactato sérico na admissão') || l.includes('gasometria')) && !l.includes('hemograma') && !l.includes('ureia') && !l.includes('creatinina') && !l.includes('eletrólitos') && !l.includes('coagulograma') && !l.includes('ast') && !l.includes('alt')){
  return 'Gasometria com dosagem de lactato';
 }
 if(l.includes('eletrólitos com sódio sérico') || l.includes('sódio sérico e osmolaridade')){
  return 'Eletrólitos com sódio sérico e osmolaridade sérica';
 }
 if((l.includes('ecg de 12 derivações') || l.includes('eletrocardiograma de 12 derivações') || l.includes('eletrocardiograma seriado')) && !l.includes('hemograma')){
  return 'Eletrocardiograma de 12 derivações';
 }
 if(l.includes('ecocardiograma transtorácico') && !l.includes('hemograma')){
  return 'Ecocardiograma transtorácico';
 }
 if(l.includes('peptídeos natriuréticos') || l.includes('bnp')){
  return 'Peptídeos natriuréticos (BNP / NT-proBNP)';
 }
 if(l.includes('função renal urgente') && !l.includes('hemograma')){
  return 'Função renal urgente (Ureia e Creatinina)';
 }
 if(l.includes('troponina') && (l.includes('0h/1h') || l.includes('ultrassensível') || l.includes('alta sensibilidade')) && !l.includes('hemograma') && !l.includes('eletrólitos')){
  return 'Troponina ultrassensível seriada (0h/1h)';
 }

 let clean = item;
 if(clean.includes(':')){
  const parts = clean.split(':');
  if(parts[0].length < 65 && (parts[0].toLowerCase().includes('laborat') || parts[0].toLowerCase().includes('painel') || parts[0].toLowerCase().includes('exames') || parts[0].toLowerCase().includes('rotina') || parts[0].toLowerCase().includes('marcadores'))){
   clean = parts.slice(1).join(':').trim();
  } else if(parts[0].length < 40){
   clean = parts[0];
  }
 }
 clean = clean.replace(/\([^\)]{25,}\)/g, '').trim();
 clean = clean.replace(/\s+/g, ' ');
 return clean;
}

function isExamOrder(entry){
 const l = (entry.item || '').toLowerCase();
 if(l.includes('abertura de protocolo') || l.includes('início de atb') || l.includes('expansão volêmica') || l.includes('vasopressor') || l.includes('medidas de tratamento')) return false;
 if(entry.secId === 'inv' || entry.secId === 'lab') return true;
 if(l.startsWith('painel laboratorial') || l.startsWith('exames laboratoriais') || l.startsWith('laboratório de triagem')) return true;
 if(l.startsWith('tc ') || l.startsWith('angiotomografia') || l.startsWith('radiografia') || l.startsWith('raio-x') || l.startsWith('rx ')) return true;
 if(l.startsWith('pocus ') || l.startsWith('ecg de 12') || l.startsWith('eletrocardiograma de 12') || l.startsWith('ecocardiograma')) return true;
 if(l.startsWith('coleta de 2 pares') || l.startsWith('coleta de culturas') || l.startsWith('urina tipo 1')) return true;
 return false;
}

function rExamUnificationCard(){
 const quickChips = EXAM_QUICK_CHIPS.map(chip => {
  const active = (S.customExams || []).some(x => x.toLowerCase() === chip.toLowerCase());
  return `<button type="button" class="xbtn ${active ? 'on' : ''}" style="font-size:11px;padding:3px 8px;border-radius:12px" onclick="toggleCustomExamChip('${chip}')">${active ? '✓ ' : '+ '}${chip}</button>`;
 }).join('');

 const addedTags = (S.customExams && S.customExams.length) ? `
  <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--color-border);display:flex;flex-wrap:wrap;gap:5px;align-items:center">
   <span style="font-size:11px;color:var(--color-text-secondary);font-weight:600">Exames incluídos:</span>
   ${S.customExams.map(ex => `
    <span class="sb" style="font-size:11px;background:#e0f2fe;color:#0369a1;display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:12px">
     ${esc(ex)} <i class="ti ti-x" style="cursor:pointer;margin-left:2px" onclick="removeCustomExam('${esc(ex)}')" title="Remover exame"></i>
    </span>
   `).join('')}
  </div>` : '';

 return `
  <div class="exam-unification-card" style="margin-bottom:12px;background:var(--color-bg-secondary,#f8fafc);border:1px solid var(--color-border,#e2e8f0);border-radius:8px;padding:10px 12px">
   <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;flex-wrap:wrap;gap:4px">
    <span style="font-size:12px;font-weight:600;color:var(--color-text-primary,#1e293b);display:flex;align-items:center;gap:6px">
     <i class="ti ti-test-pipe" style="color:#2563eb" aria-hidden="true"></i> Adicionar Exames à Solicitação Inicial:
    </span>
    <span style="font-size:11px;color:var(--color-text-secondary,#64748b)">Fundidos em linha única na conduta</span>
   </div>
   <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px">
    ${quickChips}
   </div>
   <div style="display:flex;gap:6px;align-items:center">
    <input type="text" id="customExamInput" placeholder="Outro exame (ex: Líquor, Urina 1, Lipase, D-Dímero)..." style="font-size:12px;padding:5px 8px;flex:1;border-radius:6px;border:1px solid var(--color-border,#cbd5e1)" onkeydown="if(event.key==='Enter'){event.preventDefault();addCustomExam(this.value);this.value='';}">
    <button type="button" class="btnp" style="padding:5px 12px;font-size:12px" onclick="const inp=document.getElementById('customExamInput');if(inp){addCustomExam(inp.value);inp.value='';}">+ Adicionar</button>
   </div>
   ${addedTags}
  </div>
 `;
}

