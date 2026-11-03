/* ─── Passo 2: Sinais Vitais & Antecedentes Clínicos ─── */
function s2(){
 const va=vA();
 return `<div id="step-2" class="card">
  <div class="st"><i class="ti ti-heart-rate-monitor" aria-hidden="true"></i> Sinais vitais</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:10px;margin-bottom:12px">
   <div><label>FC (bpm)</label><input type="number" inputmode="numeric" min="0" max="300" value="${esc(S.fc)}" oninput="S.fc=this.value;uvb()" placeholder="bpm"></div>
   <div><label>SatO2 (%)</label><input type="number" inputmode="numeric" min="0" max="100" value="${esc(S.sat)}" oninput="S.sat=this.value;uvb()" placeholder="%"></div>
   <div><label>PA (mmHg)</label><input type="text" inputmode="numeric" pattern="\\d{2,3}/\\d{2,3}" value="${esc(S.pa)}" oninput="S.pa=this.value.replace(/[^0-9\\/]/g,'');uvb()" placeholder="120/80"></div>
   <div><label>FR (irpm)</label><input type="number" inputmode="numeric" min="0" max="80" value="${esc(S.fr)}" oninput="S.fr=this.value;uvb()" placeholder="irpm"></div>
   <div><label>Temp. (°C)</label><input type="number" inputmode="decimal" step="0.1" min="25" max="45" value="${esc(S.temp)}" oninput="S.temp=this.value;uvb()" placeholder="°C"></div>
   <div><label>Glicemia (mg/dL)</label><input type="number" inputmode="numeric" min="0" max="1000" value="${esc(S.gli)}" oninput="S.gli=this.value;uvb()" placeholder="mg/dL"></div>
  </div>
  <div class="r2" style="margin-bottom:10px">
   <div><label>Peso estimado (kg)</label><input type="number" inputmode="decimal" step="0.5" min="0" max="300" value="${esc(S.peso)}" oninput="S.peso=this.value" placeholder="kg"></div>
   <div>
    <div class="sl" style="margin-bottom:4px">Escala de Dor · 0 a 10 ${S.eva!==''&&S.eva!=null?`<span style="font-weight:700;color:#b91c1c;margin-left:6px">(${S.eva}/10)</span>`:''}</div>
    <div style="display:flex;gap:3px">${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<button type="button" style="flex:1;padding:5px 0;border-radius:4px;border:.5px solid ${S.eva==n?'#a32d2d':'#d1d5db'};background:${S.eva==n?'#fcebeb':'#fff'};color:${S.eva==n?'#a32d2d':'#374151'};font-size:12px;cursor:pointer;font-weight:${S.eva==n?'700':'400'}" onclick="S.eva=${n};render()">${n}</button>`).join('')}</div>
   </div>
  </div>
  ${va.length?`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> ${va.join(' | ')}</div>`:''}
  <div id="news2LiveBox" style="margin-top:8px">${renderNews2LiveCard()}</div>
 </div>
 <div class="card">
  <div class="st"><i class="ti ti-clipboard-list" aria-hidden="true"></i> Antecedentes</div>
  ${tags('Antecedentes Patológicos:',['HAS','DM2','ICC','AVC','DAC','IRC','DPOC','FA','Neoplasia','Cirrose','HIV','Outras'],S.hpp,"ts(S.hpp,'%V')")}
  <div class="r2" style="margin-bottom:10px">
   <div><label>Medicações em uso</label><input type="text" value="${esc(S.muc)}" oninput="S.muc=this.value" placeholder="Ex: Metoprolol, AAS"></div>
   <div><label>Alergias</label><input type="text" value="${esc(S.ale)}" oninput="S.ale=this.value"></div>
  </div>
  ${radio('Tabagismo:',['Não fumante','Ex-fumante','Fumante ativo'],S.tab,"S.tab='%V';render()")}
  ${radio('Etilismo:',['Nega','Eventual','Regular','Abusivo'],S.etil,"S.etil='%V';render()")}
  <div><label>Drogas ilícitas</label><input type="text" value="${esc(S.drog)}" oninput="S.drog=this.value" placeholder="Nega ou descreva"></div>
 </div>`;
}
