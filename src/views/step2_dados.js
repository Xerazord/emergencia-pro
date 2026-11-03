/* ─── Passo 2: Sinais Vitais & Antecedentes Clínicos ─── */
function s2(){
 const va=vA();
 return `<div id="step-2" class="card">
  <div class="st"><i class="ti ti-heart-rate-monitor" aria-hidden="true"></i> Sinais vitais</div>
  <div class="vital-hud-grid">
   <div class="vital-hud-card ${S.fc?vC('fc',S.fc):''}" id="vhud_fc">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">FC</span><span class="vital-hud-unit">bpm</span></div>
    <input type="number" class="vital-hud-input" inputmode="numeric" min="0" max="300" value="${esc(S.fc)}" oninput="S.fc=this.value;uvb()" placeholder="—">
   </div>
   <div class="vital-hud-card ${S.sat?vC('sat',S.sat):''}" id="vhud_sat">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">SatO₂</span><span class="vital-hud-unit">%</span></div>
    <input type="number" class="vital-hud-input" inputmode="numeric" min="0" max="100" value="${esc(S.sat)}" oninput="S.sat=this.value;uvb()" placeholder="—">
   </div>
   <div class="vital-hud-card ${S.pa?vC('pa',S.pa):''}" id="vhud_pa">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">PA</span><span class="vital-hud-unit">mmHg</span></div>
    <input type="text" class="vital-hud-input" inputmode="numeric" pattern="\\d{2,3}/\\d{2,3}" value="${esc(S.pa)}" oninput="S.pa=this.value.replace(/[^0-9\\/]/g,'');uvb()" placeholder="120/80">
   </div>
   <div class="vital-hud-card ${S.fr?vC('fr',S.fr):''}" id="vhud_fr">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">FR</span><span class="vital-hud-unit">irpm</span></div>
    <input type="number" class="vital-hud-input" inputmode="numeric" min="0" max="80" value="${esc(S.fr)}" oninput="S.fr=this.value;uvb()" placeholder="—">
   </div>
   <div class="vital-hud-card ${S.temp?vC('temp',S.temp):''}" id="vhud_temp">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">Temp.</span><span class="vital-hud-unit">°C</span></div>
    <input type="number" class="vital-hud-input" inputmode="decimal" step="0.1" min="25" max="45" value="${esc(S.temp)}" oninput="S.temp=this.value;uvb()" placeholder="—">
   </div>
   <div class="vital-hud-card ${S.gli?vC('gli',S.gli):''}" id="vhud_gli">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">Glicemia</span><span class="vital-hud-unit">mg/dL</span></div>
    <input type="number" class="vital-hud-input" inputmode="numeric" min="0" max="1000" value="${esc(S.gli)}" oninput="S.gli=this.value;uvb()" placeholder="—">
   </div>
  </div>
  <div class="r2" style="margin-bottom:10px">
   <div class="vital-hud-card" style="border-left-color:#94a3b8">
    <div class="vital-hud-hdr"><span class="vital-hud-lbl">Peso estimado</span><span class="vital-hud-unit">kg</span></div>
    <input type="number" class="vital-hud-input" inputmode="decimal" step="0.5" min="0" max="300" value="${esc(S.peso)}" oninput="S.peso=this.value" placeholder="—">
   </div>
   <div style="background:var(--color-background-primary);border:1px solid var(--color-border-tertiary);border-radius:var(--border-radius-md);padding:8px 12px;border-left:3.5px solid #a32d2d;display:flex;flex-direction:column;justify-content:center">
    <div class="vital-hud-hdr">
     <span class="vital-hud-lbl">Escala de Dor (EVA)</span>
     ${S.eva!==''&&S.eva!=null?`<span style="font-weight:700;color:#b91c1c;font-size:11px">(${S.eva}/10)</span>`:''}
    </div>
    <div style="display:flex;gap:3px;margin-top:2px">
     ${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<button type="button" style="flex:1;padding:5px 0;border-radius:4px;border:.5px solid ${S.eva==n?'#a32d2d':'#d1d5db'};background:${S.eva==n?'#fcebeb':'#fff'};color:${S.eva==n?'#a32d2d':'#374151'};font-size:12px;cursor:pointer;font-weight:${S.eva==n?'700':'400'}" onclick="S.eva=${n};render()">${n}</button>`).join('')}
    </div>
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
