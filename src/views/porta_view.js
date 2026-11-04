/* ─── Guia de Consulta Rápida de Porta / Ambulatório (Adultos) ─── */

let _isPortaModalOpen = false;
let _selectedPortaId = 'cistite';
let _portaSearchQuery = '';
let _selectedPortaCategory = 'todos';
let _portaCertDays = {};

function openPortaGuideModal(){
  _isPortaModalOpen = true;
  const overlay = document.getElementById('porta-guide-overlay');
  if(overlay){
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    renderPortaGuideContent();
    const input = document.getElementById('porta-search-input');
    if(input) input.focus();
  }
}

function closePortaGuideModal(){
  _isPortaModalOpen = false;
  const overlay = document.getElementById('porta-guide-overlay');
  if(overlay){
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function togglePortaGuideModal(){
  if(_isPortaModalOpen) closePortaGuideModal();
  else openPortaGuideModal();
}

function selectPortaPathology(id){
  _selectedPortaId = id;
  renderPortaGuideContent();
  const cardElem = document.getElementById('porta-active-card');
  if(cardElem) cardElem.scrollTop = 0;
}

function setPortaCategory(catId){
  _selectedPortaCategory = catId;
  const filtered = getFilteredPortaList();
  if(filtered.length > 0 && !filtered.some(p => p.id === _selectedPortaId)){
    _selectedPortaId = filtered[0].id;
  }
  renderPortaGuideContent();
}

function onPortaSearch(q){
  _portaSearchQuery = (q || '').trim().toLowerCase();
  const filtered = getFilteredPortaList();
  if(filtered.length > 0 && !filtered.some(p => p.id === _selectedPortaId)){
    _selectedPortaId = filtered[0].id;
  }
  renderPortaGuideContent();
}

function clearPortaSearch(){
  _portaSearchQuery = '';
  const input = document.getElementById('porta-search-input');
  if(input){ input.value = ''; input.focus(); }
  renderPortaGuideContent();
}

function setPortaCertDays(id, days){
  _portaCertDays[id] = parseInt(days, 10) || 1;
  renderPortaGuideContent();
}

function getFilteredPortaList(){
  let list = PORTA_CATALOG;
  if(_selectedPortaCategory && _selectedPortaCategory !== 'todos'){
    list = list.filter(p => p.category === _selectedPortaCategory);
  }
  if(_portaSearchQuery){
    const q = _portaSearchQuery;
    list = list.filter(p => {
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchCid = (p.cid10 || '').toLowerCase().includes(q);
      const matchCat = (p.categoryLabel || '').toLowerCase().includes(q);
      const matchKeys = (p.searchKeywords || []).some(k => k.toLowerCase().includes(q));
      return matchTitle || matchCid || matchCat || matchKeys;
    });
  }
  return list;
}

function copyPortaPrescription(id){
  const p = PORTA_CATALOG.find(x => x.id === id);
  if(!p) return;
  const lines = [`# PRESCRIÇÃO MÉDICA AMBULATORIAL — ${p.title} (CID-10: ${p.cid10})`];
  
  if(p.prescription.firstLine && p.prescription.firstLine.length){
    lines.push('\n[1ª Linha / Preferencial]');
    p.prescription.firstLine.forEach(it => {
      lines.push(`- ${it.drug || it}: ${it.regimen || ''} ${it.duration ? '('+it.duration+')' : ''}`.trim());
    });
  }
  if(p.prescription.secondLine && p.prescription.secondLine.length){
    lines.push('\n[2ª Linha / Alternativa]');
    p.prescription.secondLine.forEach(it => {
      lines.push(`- ${it.drug || it}: ${it.regimen || ''} ${it.duration ? '('+it.duration+')' : ''}`.trim());
    });
  }
  if(p.prescription.symptomatic && p.prescription.symptomatic.length){
    lines.push('\n[Sintomáticos & Controle de Sintomas]');
    p.prescription.symptomatic.forEach(it => {
      lines.push(`- ${it.drug || it}: ${it.regimen || ''} ${it.duration ? '('+it.duration+')' : ''}`.trim());
    });
  }
  if(!p.prescription.firstLine?.length && !p.prescription.secondLine?.length && !p.prescription.symptomatic?.length){
    lines.push('\n(Prescrição em aguardo de compilação pelo médico)');
  }

  const text = lines.join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Prescrição de ${p.title} copiada para a área de transferência!`);
  });
}

function copyPortaOrientations(id){
  const p = PORTA_CATALOG.find(x => x.id === id);
  if(!p) return;
  const lines = [`# ORIENTAÇÕES AO PACIENTE — ${p.title}`];
  if(p.nonPharm && p.nonPharm.length){
    lines.push('\n[Medidas e Cuidados Gerais]');
    p.nonPharm.forEach(m => lines.push(`- ${m}`));
  }
  if(p.discharge && p.discharge.alarmCriteria){
    lines.push('\n[SINAIS DE ALARME / QUANDO RETORNAR AO PRONTO-ATENDIMENTO]');
    lines.push(p.discharge.alarmCriteria);
  }
  if(!p.nonPharm?.length && !p.discharge?.alarmCriteria){
    lines.push('\n(Orientações em aguardo de compilação pelo médico)');
  }

  const text = lines.join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Orientações ao paciente copiadas!`);
  });
}

function copyPortaCertificate(id){
  const p = PORTA_CATALOG.find(x => x.id === id);
  if(!p) return;
  const days = _portaCertDays[id] !== undefined ? _portaCertDays[id] : (p.discharge.defaultCertDays || 1);
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR');
  
  const text = `ATESTADO MÉDICO\n\nAtesto para os devidos fins que o(a) paciente esteve sob meus cuidados médicos no dia de hoje (${dateStr}), necessitando de ${days} (${days === 1 ? 'um dia' : days + ' dias'}) de repouso por motivo de saúde.\n\nCID-10: ${p.cid10} (${p.title})`;
  
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Atestado de ${days} dia(s) copiado com sucesso!`);
  });
}

function renderPortaGuideContent(){
  const body = document.getElementById('porta-guide-modal-body');
  if(!body) return;

  const filtered = getFilteredPortaList();
  const activePathology = PORTA_CATALOG.find(p => p.id === _selectedPortaId) || filtered[0] || PORTA_CATALOG[0];
  const certDays = _portaCertDays[activePathology.id] !== undefined ? _portaCertDays[activePathology.id] : (activePathology.discharge.defaultCertDays || 1);

  body.innerHTML = `
    <!-- Top Filter Bar: Categories Chips -->
    <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:12px;border-bottom:1px solid var(--color-border,#e2e8f0);white-space:nowrap" class="scrollbar-thin">
      ${PORTA_CATEGORIES.map(cat => {
        const isActive = _selectedPortaCategory === cat.id;
        const count = cat.id === 'todos' ? PORTA_CATALOG.length : PORTA_CATALOG.filter(x => x.category === cat.id).length;
        return `
          <button type="button" class="xbtn ${isActive ? 'on' : ''}" style="padding:4px 10px;font-size:11.5px;display:flex;align-items:center;gap:5px;border-radius:16px" onclick="setPortaCategory('${cat.id}')">
            <i class="ti ${cat.icon}" aria-hidden="true"></i>
            <span>${cat.label}</span>
            <span class="sb" style="font-size:10px;padding:1px 5px;background:${isActive ? '#fff' : 'var(--color-background-primary)'};color:${isActive ? '#2563eb' : 'var(--color-text-secondary)'};border-radius:10px">${count}</span>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Main Content Area: Split View -->
    <div style="display:grid;grid-template-columns:300px 1fr;gap:16px;height:calc(85vh - 140px);overflow:hidden" id="porta-split-container">
      
      <!-- Left Column: Pathology Navigation List -->
      <div style="overflow-y:auto;padding-right:6px;border-right:1px solid var(--color-border,#e2e8f0)" class="scrollbar-thin">
        ${filtered.length === 0 ? `
          <div style="text-align:center;padding:30px 10px;color:var(--color-text-secondary)">
            <i class="ti ti-search-off" style="font-size:28px;display:block;margin-bottom:6px"></i>
            <strong>Nenhuma queixa encontrada</strong>
            <p style="font-size:11.5px;margin-top:4px">Tente buscar por outro termo ou limpe o filtro.</p>
            <button type="button" class="xbtn" style="margin-top:8px;font-size:11px;padding:3px 8px" onclick="clearPortaSearch()">Limpar busca</button>
          </div>
        ` : filtered.map(p => {
          const isSelected = p.id === activePathology.id;
          const hasPrescription = (p.prescription.firstLine?.length || p.prescription.secondLine?.length);
          return `
            <div onclick="selectPortaPathology('${p.id}')" style="cursor:pointer;padding:10px 12px;margin-bottom:6px;border-radius:8px;transition:all 0.15s ease;border:1px solid ${isSelected ? '#3b82f6' : 'var(--color-border,#e2e8f0)'};background:${isSelected ? '#eff6ff' : 'var(--color-background-primary,#ffffff)'}">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${isSelected ? '#1d4ed8' : '#64748b'};display:flex;align-items:center;gap:4px">
                  <i class="ti ${p.icon}"></i> ${esc(p.categoryLabel)}
                </span>
                <span class="sb" style="font-size:10px;background:#f1f5f9;color:#475569;padding:1px 6px;border-radius:4px">CID ${esc(p.cid10)}</span>
              </div>
              <strong style="font-size:13px;display:block;color:${isSelected ? '#1e3a8a' : 'var(--color-text-primary,#0f172a)'}">${esc(p.title)}</strong>
              <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
                <span style="font-size:10.5px;color:${hasPrescription ? '#15803d' : '#94a3b8'}">
                  <i class="ti ${hasPrescription ? 'ti-check' : 'ti-dots'}"></i> ${hasPrescription ? 'Prescrição ativa' : 'Aguardando compilação'}
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Right Column: Active Card Display -->
      <div style="overflow-y:auto;padding-right:8px" class="scrollbar-thin" id="porta-active-card">
        
        <!-- Header Card -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:14px">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="sb" style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:12px;font-weight:600">
                <i class="ti ${activePathology.icon}"></i> ${esc(activePathology.categoryLabel)}
              </span>
              <span class="sb" style="background:#f1f5f9;color:#334155;font-size:11px;padding:2px 8px;border-radius:12px">
                CID-10: ${esc(activePathology.cid10)}
              </span>
            </div>
            <h2 style="font-size:17px;font-weight:700;margin:0;color:#0f172a">${esc(activePathology.title)}</h2>
          </div>
          
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btng" style="padding:6px 10px;font-size:12px;background:#059669;display:flex;align-items:center;gap:5px" onclick="copyPortaPrescription('${activePathology.id}')">
              <i class="ti ti-clipboard"></i> Copiar Receita
            </button>
            <button type="button" class="btng" style="padding:6px 10px;font-size:12px;background:#2563eb;display:flex;align-items:center;gap:5px" onclick="copyPortaOrientations('${activePathology.id}')">
              <i class="ti ti-file-text"></i> Copiar Orientações
            </button>
          </div>
        </div>

        <!-- 1. Critérios Diagnósticos Práticos (Azul) -->
        <div style="margin-bottom:14px;border:1px solid #bfdbfe;border-radius:8px;background:#f0f9ff;padding:12px">
          <div style="font-size:12.5px;font-weight:700;color:#1d4ed8;margin-bottom:6px;display:flex;align-items:center;gap:6px">
            <i class="ti ti-zoom-check"></i> 1. Critérios Diagnósticos Práticos & Escores Beira-Leito:
          </div>
          ${activePathology.diagnosticCriteria && activePathology.diagnosticCriteria.length ? `
            <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.55;color:#1e3a8a">
              ${activePathology.diagnosticCriteria.map(c => `<li>${esc(c)}</li>`).join('')}
            </ul>
          ` : `
            <div style="font-size:12px;color:#64748b;font-style:italic;padding:4px 0">
              <i class="ti ti-pencil"></i> (Aguardando inserção de critérios diagnósticos e escores pelo especialista)
            </div>
          `}
        </div>

        <!-- 2. Red Flags / O que NÃO tratar na porta (Âmbar/Vermelho) -->
        <div style="margin-bottom:14px;border:1px solid #fecaca;border-radius:8px;background:#fef2f2;padding:12px">
          <div style="font-size:12.5px;font-weight:700;color:#b91c1c;margin-bottom:6px;display:flex;align-items:center;gap:6px">
            <i class="ti ti-alert-triangle"></i> 2. Sinais de Alarme (Red Flags) — Quando NÃO tratar na Porta / Encaminhar:
          </div>
          ${activePathology.redFlags && activePathology.redFlags.length ? `
            <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.55;color:#991b1b">
              ${activePathology.redFlags.map(rf => `<li><strong>${esc(rf)}</strong></li>`).join('')}
            </ul>
          ` : `
            <div style="font-size:12px;color:#b45309;font-style:italic;padding:4px 0">
              <i class="ti ti-pencil"></i> (Aguardando inserção de sinais de alarme e critérios de desvio de fluxo pelo especialista)
            </div>
          `}
        </div>

        <!-- 3. Prescrição SUS / RENAME (Verde) -->
        <div style="margin-bottom:14px;border:1px solid #bbf7d0;border-radius:8px;background:#f0fdf4;padding:12px">
          <div style="font-size:12.5px;font-weight:700;color:#15803d;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
            <span style="display:flex;align-items:center;gap:6px"><i class="ti ti-pill"></i> 3. Prescrição Ambulatorial Padrão (SUS / RENAME):</span>
            <button type="button" class="btns" style="padding:2px 8px;font-size:11px" onclick="copyPortaPrescription('${activePathology.id}')">
              <i class="ti ti-copy"></i> Copiar
            </button>
          </div>
          
          <!-- 1a Linha -->
          <div style="margin-bottom:8px">
            <strong style="font-size:11.5px;color:#166534;text-transform:uppercase;letter-spacing:0.5px">1ª Linha / Esquema Preferencial:</strong>
            ${activePathology.prescription.firstLine && activePathology.prescription.firstLine.length ? `
              <ul style="margin:4px 0 0 18px;padding:0;font-size:12.5px;line-height:1.5;color:#14532d">
                ${activePathology.prescription.firstLine.map(it => `<li><strong>${esc(it.drug || it)}</strong> — ${esc(it.regimen || '')} ${it.duration ? `<em>(${esc(it.duration)})</em>` : ''}</li>`).join('')}
              </ul>
            ` : `
              <div style="font-size:12px;color:#64748b;font-style:italic;margin-top:2px">
                (Aguardando compilação da 1ª linha terapêutica)
              </div>
            `}
          </div>

          <!-- 2a Linha -->
          <div style="margin-bottom:8px;padding-top:6px;border-top:1px dashed #dcfce7">
            <strong style="font-size:11.5px;color:#166534;text-transform:uppercase;letter-spacing:0.5px">2ª Linha / Alternativa (Alergias ou Intolerância):</strong>
            ${activePathology.prescription.secondLine && activePathology.prescription.secondLine.length ? `
              <ul style="margin:4px 0 0 18px;padding:0;font-size:12.5px;line-height:1.5;color:#14532d">
                ${activePathology.prescription.secondLine.map(it => `<li>${esc(it.drug || it)} — ${esc(it.regimen || '')} ${it.duration ? `<em>(${esc(it.duration)})</em>` : ''}</li>`).join('')}
              </ul>
            ` : `
              <div style="font-size:12px;color:#64748b;font-style:italic;margin-top:2px">
                (Aguardando compilação da 2ª linha / alternativas)
              </div>
            `}
          </div>

          <!-- Sintomaticos -->
          <div style="padding-top:6px;border-top:1px dashed #dcfce7">
            <strong style="font-size:11.5px;color:#166534;text-transform:uppercase;letter-spacing:0.5px">Sintomáticos & Controle de Sintomas:</strong>
            ${activePathology.prescription.symptomatic && activePathology.prescription.symptomatic.length ? `
              <ul style="margin:4px 0 0 18px;padding:0;font-size:12.5px;line-height:1.5;color:#14532d">
                ${activePathology.prescription.symptomatic.map(it => `<li>${esc(it.drug || it)}: ${esc(it.regimen || '')}</li>`).join('')}
              </ul>
            ` : `
              <div style="font-size:12px;color:#64748b;font-style:italic;margin-top:2px">
                (Aguardando compilação de sintomáticos de resgate)
              </div>
            `}
          </div>
        </div>

        <!-- 4. Medidas Nao Farmacologicas & Orientacoes (Cinza/Roxo) -->
        <div style="margin-bottom:14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;padding:12px">
          <div style="font-size:12.5px;font-weight:700;color:#334155;margin-bottom:6px;display:flex;align-items:center;gap:6px">
            <i class="ti ti-shield"></i> 4. Medidas Não Farmacológicas & Orientações de Alta:
          </div>
          ${activePathology.nonPharm && activePathology.nonPharm.length ? `
            <ul style="margin:0 0 8px 18px;padding:0;font-size:12.5px;line-height:1.5;color:#475569">
              ${activePathology.nonPharm.map(m => `<li>${esc(m)}</li>`).join('')}
            </ul>
          ` : `
            <div style="font-size:12px;color:#64748b;font-style:italic;margin-bottom:6px">
              (Aguardando compilação das medidas não farmacológicas)
            </div>
          `}
          ${activePathology.discharge && activePathology.discharge.alarmCriteria ? `
            <div style="font-size:12px;padding:8px;background:#fff;border-radius:6px;border:1px solid #e2e8f0;color:#1e293b">
              <strong>Critérios de retorno imediato ao pronto-atendimento:</strong> ${esc(activePathology.discharge.alarmCriteria)}
            </div>
          ` : ''}
        </div>

        <!-- 5. Modulo Interativo de Atestado Medico -->
        <div style="border:1px solid #e9d5ff;border-radius:8px;background:#faf5ff;padding:12px">
          <div style="font-size:12.5px;font-weight:700;color:#7e22ce;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
            <span style="display:flex;align-items:center;gap:6px"><i class="ti ti-certificate"></i> 5. Gerador de Atestado Médico / Declaração:</span>
            <button type="button" class="btng" style="padding:3px 9px;font-size:11.5px;background:#7e22ce" onclick="copyPortaCertificate('${activePathology.id}')">
              <i class="ti ti-copy"></i> Copiar Atestado
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <span style="font-size:12px;color:#6b21a8;font-weight:600">Período de repouso:</span>
            ${[0, 1, 2, 3, 5, 7].map(d => `
              <button type="button" class="xbtn ${certDays === d ? 'on' : ''}" style="padding:2px 8px;font-size:11px;border-radius:12px" onclick="setPortaCertDays('${activePathology.id}', ${d})">
                ${d === 0 ? 'Apenas horas' : `${d} dia${d > 1 ? 's' : ''}`}
              </button>
            `).join('')}
          </div>
          <div style="background:#fff;border:1px dashed #d8b4fe;border-radius:6px;padding:8px 12px;font-size:12px;line-height:1.45;color:#3b0764">
            <em>"Atesto para os devidos fins que o(a) paciente necessita de <strong>${certDays} dia(s)</strong> de repouso por motivo de saúde a partir desta data. CID-10: <strong>${esc(activePathology.cid10)} (${esc(activePathology.title)})</strong>."</em>
          </div>
        </div>

      </div>
    </div>
  `;
}
