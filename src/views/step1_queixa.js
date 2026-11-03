/* ─── Passo 1: Queixa Principal & HDA Assistida ─── */
function qxMatchesQuery(qName, qry){
 if(!qry) return true;
 const q = qry.toLowerCase().trim();
 const n = qName.toLowerCase();
 if(n.includes(q)) return true;
 const synMap = {
  'Dor torácica': ['peito','dor precordial','infarto','coracao','angina','retroesternal','torax','toracica','dor no peito','pontada'],
  'Dispneia': ['ar','falta de ar','cansaco','respirar','folego','chiado','dispneico','asfixia'],
  'Cefaleia': ['cabeca','dor de cabeca','enxaqueca','migranea','têmpora','nuca'],
  'Déficit neurológico agudo': ['derrame','avc','fraqueza','paralisia','boca torta','fala enrolada','plegia','paresia','isquemia'],
  'Síncope': ['desmaio','lipotimia','perda de consciencia','apagou','desmaiou','teto preto'],
  'Convulsão': ['crise convulsiva','ataque','epilepsia','abalo','tremor generalizado','baba'],
  'Dor abdominal': ['barriga','dor de barriga','estomago','apendicite','vesicula','colica abdominal','ventre'],
  'Náusea e Vômitos': ['vomito','enjoo','nausea','ansia','golfada','intolerancia alimentar'],
  'Diarreia': ['desarranjo','fezes liquidas','evacuacoes','disenteria','soltura'],
  'Sangramento': ['hemorragia','sangue','hemoptise','melena','hematuria','hematemese','epistaxe'],
  'Dor lombar': ['costas','rins','coluna','lombalgia','ciatico','dor nas costas'],
  'Icterícia': ['amarelo','pele amarela','olho amarelo','figado','coluria','acolia'],
  'Vertigem': ['tontura','tonteira','labirintite','rodando','roda tudo','desequilibrio'],
  'Palpitações': ['batedeira','arritmia','taquicardia','acelerado','coracao pulando'],
  'Edema / Dor em MMII': ['perna inchada','edema','inchaço','dor na perna','panturrilha','tornozelo','tvp'],
  'Trauma': ['queda','acidente','pancada','batida','tce','fratura','colisao','politrauma'],
  'Intoxicação exógena': ['remedio','veneno','overdose','chumbinho','alcool','drogas','comprimidos'],
  'Agitação psicomotora': ['surto','agressivo','agitado','nervoso','psico','desorientado'],
  'Rebaixamento de consciência': ['coma','sonolento','torpor','desacordado','rebaixado','inconsciente','gcs'],
  'Febre': ['calafrio','temperatura','quente','pirexia','febril'],
  'Tosse': ['catarro','escarro','pigarro','secrecao','tosse seca']
 };
 const syns = synMap[qName];
 if(syns && syns.some(s => s.includes(q) || q.includes(s))) return true;
 return false;
}

function getQxResultsHtml(qSearch){
 const qxListHtml = QX_CATS.map(cat=>{
  const matchingItems = cat.items.filter(q => qxMatchesQuery(q, qSearch));
  if(qSearch && !matchingItems.length) return '';
  return `
   <div class="qcat qcat-${cat.id}">
    <div class="qcat-lbl" style="display:flex;align-items:center;gap:5px">
     ${cat.icon ? `<i class="ti ${cat.icon}" aria-hidden="true"></i>` : ''}
     ${cat.label}
    </div>
    <div class="qgrid">
     ${matchingItems.map(q=>`<button class="qbtn" onclick="setQueixa('${q.replace(/'/g,"\\'")}')">${esc(q)}</button>`).join('')}
    </div>
   </div>
  `;
 }).filter(Boolean).join('');

 const noResultsHtml = (!qxListHtml && qSearch)
  ? `<div style="text-align:center;padding:24px 12px;color:var(--color-text-secondary);background:var(--color-background-secondary);border-radius:8px;margin-bottom:12px">
      <i class="ti ti-search-off" style="font-size:28px;color:#9ca3af;display:block;margin-bottom:6px" aria-hidden="true"></i>
      <strong>Nenhuma queixa encontrada para "${esc(qSearch)}"</strong>
      <p style="font-size:12px;margin:4px 0 10px 0">Verifique a ortografia ou selecione uma das 21 queixas disponíveis no catálogo.</p>
      <button class="btns" style="padding:4px 12px;font-size:12px" onclick="clearQueixaSearch()">Limpar busca</button>
     </div>`
  : '';

 return `${noResultsHtml}${qxListHtml}`;
}

function filterQueixas(val){
 S._qxSearch = val;
 const clearBtn = document.getElementById('searchQxClearBtn');
 if(clearBtn) clearBtn.style.display = S._qxSearch ? 'block' : 'none';
 const wrap = document.getElementById('qxListResultsWrap');
 if(wrap){
  wrap.innerHTML = getQxResultsHtml((S._qxSearch || '').trim());
  return;
 }
 render();
}

function clearQueixaSearch(){
 S._qxSearch = '';
 const inp = document.getElementById('searchQxInput');
 if(inp) inp.value = '';
 const clearBtn = document.getElementById('searchQxClearBtn');
 if(clearBtn) clearBtn.style.display = 'none';
 const wrap = document.getElementById('qxListResultsWrap');
 if(wrap){
  wrap.innerHTML = getQxResultsHtml('');
  if(inp) inp.focus();
  return;
 }
 render();
}

function s1(){
 const al=ALERTAS[S.queixa],isIT=S.queixa==='Intoxicação exógena',renderQx=QX_ANAMNESE[S.queixa],cm=CMAP[S.queixa]||['Início súbito','Progressivo','Persistente','Febre'];
 const qSearch = (S._qxSearch || '').trim();
 
 const qxListHtml = QX_CATS.map(cat=>{
  const matchingItems = cat.items.filter(q => qxMatchesQuery(q, qSearch));
  if(qSearch && !matchingItems.length) return '';
  return `
   <div class="qcat qcat-${cat.id}">
    <div class="qcat-lbl" style="display:flex;align-items:center;gap:5px">
     ${cat.icon ? `<i class="ti ${cat.icon}" aria-hidden="true"></i>` : ''}
     ${cat.label}
    </div>
    <div class="qgrid">
     ${matchingItems.map(q=>`<button class="qbtn" onclick="setQueixa('${q.replace(/'/g,"\\'")}')">${esc(q)}</button>`).join('')}
    </div>
   </div>
  `;
 }).filter(Boolean).join('');

 const noResultsHtml = (!qxListHtml && qSearch)
  ? `<div style="text-align:center;padding:24px 12px;color:var(--color-text-secondary);background:var(--color-background-secondary);border-radius:8px;margin-bottom:12px">
      <i class="ti ti-search-off" style="font-size:28px;color:#9ca3af;display:block;margin-bottom:6px" aria-hidden="true"></i>
      <strong>Nenhuma queixa encontrada para "${esc(qSearch)}"</strong>
      <p style="font-size:12px;margin:4px 0 10px 0">Verifique a ortografia ou selecione uma das 21 queixas disponíveis no catálogo.</p>
      <button class="btns" style="padding:4px 12px;font-size:12px" onclick="clearQueixaSearch()">Limpar busca</button>
     </div>`
  : '';

 return `
  <div id="step-1" class="card">
   <div class="st"><i class="ti ti-stethoscope" aria-hidden="true"></i> Queixa principal</div>
   ${!S.queixa ? `
    <div class="search-qx-box">
     <input type="text" id="searchQxInput" class="search-qx-input" placeholder="🔍 Buscar queixa clínica (ex: peito, falta de ar, barriga, cabeça, febre)..." oninput="filterQueixas(this.value)" value="${esc(S._qxSearch||'')}">
     <button class="clear-search-btn" id="searchQxClearBtn" onclick="clearQueixaSearch()" title="Limpar busca" aria-label="Limpar busca" style="${S._qxSearch ? '' : 'display:none'}">×</button>
    </div>
    <div id="qxListResultsWrap">
     ${noResultsHtml}
     ${qxListHtml}
    </div>
   ` : `
    <div class="selq">
     <span><i class="ti ti-check" aria-hidden="true"></i> ${esc(S.queixa)}</span>
     <button onclick="setQueixa(null)">Mudar</button>
    </div>
    ${al?`<div class="abox ${al.c}"><i class="ti ti-alert-triangle" aria-hidden="true"></i> ${al.m}</div>`:''}
    ${renderQx ? renderQx() : `
     <div class="sl">Características:</div>
     <div class="tags">${cm.map(c=>`<span class="tag ${S.caract.includes(c)?'on':''}" onclick="ts(S.caract,\`${c}\`)">${c}</span>`).join('')}</div>
     <div style="margin-top:10px"><label>Tempo de início</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 2 horas, 30 min"></div>
     ${isIT?`<div style="margin-top:8px"><label>Substâncias suspeitas</label><input type="text" value="${esc(S.itDrug)}" oninput="S.itDrug=this.value" placeholder="Ex: benzodiazepínico, antidepressivo tricíclico, álcool..."></div>`:''}
    `}
   `}
  </div>
 `;
}
