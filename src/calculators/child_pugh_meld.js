// ─── Child-Pugh & MELD (Apoio à decisão / Icterícia) ────────────────────────
function childPughSc(){
 const c=S.childPugh||{};
 return (+(c.bili||1))+(+(c.alb||1))+(+(c.inr||1))+(+(c.ascite||1))+(+(c.encef||1));
}
function childPughClass(s){
 if(s<=6)return{classe:'Classe A',pontos:s,sobrevida:'Sobrevida 1 ano ~100%, 2 anos ~85%'};
 if(s<=9)return{classe:'Classe B',pontos:s,sobrevida:'Sobrevida 1 ano ~80%, 2 anos ~57%'};
 return{classe:'Classe C',pontos:s,sobrevida:'Sobrevida 1 ano ~45%, 2 anos ~35%'};
}
function calcMELD(){
 const m=S.meld;
 const bili=parseFloat(m.bili),cr=parseFloat(m.cr),inr=parseFloat(m.inr);
 if(!bili||!cr||!inr||isNaN(bili)||isNaN(cr)||isNaN(inr))return null;
 const b=Math.max(1,bili),c=m.dialise?4.0:Math.min(4.0,Math.max(1,cr)),i=Math.max(1,inr);
 let meld=Math.round((9.57*Math.log(c))+(3.78*Math.log(b))+(11.2*Math.log(i))+6.43);
 meld=Math.max(6,Math.min(40,meld));
 return meld;
}
function insertChildPughMeldToProntuario(){
 const cp=childPughSc();
 const cpInf=childPughClass(cp);
 const mSc=calcMELD();
 let txt=`[Apoio à Decisão - Hepatologia]\nEscore Child-Pugh: ${cpInf.pontos} pontos (${cpInf.classe} — ${cpInf.sobrevida})`;
 if(mSc!==null)txt+=`\nEscore MELD calculado: ${mSc} pontos (Mortalidade estimada em 90 dias)`;
 if(!S.imp)S.imp=txt;
 else S.imp+='\n\n'+txt;
 navigator.clipboard.writeText(txt).then(()=>{
  showToast('Escores Child-Pugh / MELD inseridos na impressão e copiados!');
  render();
 });
}
function updateMeldDisplay(){
 const box = document.getElementById('meldDisplayBox');
 if(box){
  const mSc = calcMELD();
  box.innerHTML = `<strong>MELD:</strong> ${mSc!==null?mSc+' pontos':'Preencha Bilirrubina, Creatinina e INR para calcular'}`;
 }
 autoSave();
}

function rChildPughMeldDecision(){
 const c=S.childPugh,m=S.meld;
 const cpSc=childPughSc();
 const cpInf=childPughClass(cpSc);
 const mSc=calcMELD();
 return `
  <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:#1e3a8a"><i class="ti ti-calculator"></i> Escore Child-Pugh</div>
  <div class="srow"><div style="flex:1"><div class="slbl">Bilirrubina total</div></div><div class="sopts">${[['1','< 2 (1)'],['2','2 a 3 (2)'],['3','> 3 (3)']].map(([v,lb])=>`<span class="sopt ${c.bili===v?'on':''}" onclick="S.childPugh.bili='${v}';render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Albumina sérica</div></div><div class="sopts">${[['1','> 3,5 (1)'],['2','2,8 a 3,5 (2)'],['3','< 2,8 (3)']].map(([v,lb])=>`<span class="sopt ${c.alb===v?'on':''}" onclick="S.childPugh.alb='${v}';render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">INR / Coagulograma</div></div><div class="sopts">${[['1','< 1,7 (1)'],['2','1,7 a 2,3 (2)'],['3','> 2,3 (3)']].map(([v,lb])=>`<span class="sopt ${c.inr===v?'on':''}" onclick="S.childPugh.inr='${v}';render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Ascite</div></div><div class="sopts">${[['1','Ausente (1)'],['2','Leve / Tratável (2)'],['3','Moderada/Grave (3)']].map(([v,lb])=>`<span class="sopt ${c.ascite===v?'on':''}" onclick="S.childPugh.ascite='${v}';render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Encefalopatia Hepática</div></div><div class="sopts">${[['1','Ausente (1)'],['2','Grau 1–2 (2)'],['3','Grau 3–4 (3)']].map(([v,lb])=>`<span class="sopt ${c.encef===v?'on':''}" onclick="S.childPugh.encef='${v}';render()">${lb}</span>`).join('')}</div></div>
  <div style="padding:6px 10px;margin:8px 0;background:#eff6ff;border-radius:6px;font-size:12px;color:#1e40af"><strong>Child-Pugh:</strong> ${cpInf.pontos} pontos — <strong>${cpInf.classe}</strong> (${cpInf.sobrevida})</div>

  <div style="font-size:13px;font-weight:600;margin:12px 0 6px 0;color:#1e3a8a"><i class="ti ti-calculator"></i> Escore MELD (Model for End-Stage Liver Disease)</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px">
   <div><label style="font-size:11px">Bilirrubina (mg/dL)</label><input type="number" step="0.1" value="${esc(m.bili)}" oninput="S.meld.bili=this.value;updateMeldDisplay()" style="width:100%" placeholder="Ex: 2.5"></div>
   <div><label style="font-size:11px">Creatinina (mg/dL)</label><input type="number" step="0.1" value="${esc(m.cr)}" oninput="S.meld.cr=this.value;updateMeldDisplay()" style="width:100%" placeholder="Ex: 1.2"></div>
   <div><label style="font-size:11px">INR</label><input type="number" step="0.1" value="${esc(m.inr)}" oninput="S.meld.inr=this.value;updateMeldDisplay()" style="width:100%" placeholder="Ex: 1.6"></div>
  </div>
  <div style="margin-bottom:8px;font-size:12px"><label><input type="checkbox" ${m.dialise?'checked':''} onchange="S.meld.dialise=this.checked;updateMeldDisplay()"> Diálise ≥ 2x na última semana (fixa Cr em 4.0)</label></div>
  <div id="meldDisplayBox" style="padding:6px 10px;margin-bottom:10px;background:#eff6ff;border-radius:6px;font-size:12px;color:#1e40af"><strong>MELD:</strong> ${mSc!==null?mSc+' pontos':'Preencha Bilirrubina, Creatinina e INR para calcular'}</div>

  <button class="btng" style="width:100%;background:#1d4ed8;font-size:12.5px" onclick="insertChildPughMeldToProntuario()"><i class="ti ti-clipboard-plus"></i> Inserir no Prontuário / Copiar</button>
 `;
}
