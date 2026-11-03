/* ─── Monitorização de Sinais Vitais & NEWS2 & Sticky Cockpit ─── */
const VITAL_HL_MAP={
 'Sat < 90%':['o₂','o2 ','oxigen','satO','satura','MNRL','VNI','CNAF','intuba','IOT','flush-rate'],
 'Hipotensão':['vasopressor','norepinefrina','noradrenalina','dobutamina','vasopressina','ressuscita','volêmica','PAS','fluido','bolus','ringer','cristaloid'],
 'FC crítica':['cardiovers','amiodarona','atropina','desfibril','marcapasso','adenosina','beta-bloq','betabloq','bradicardi','taquicardi'],
 'FR crítica':['ventila','intuba','IOT','VNI','CNAF','MNRL','oxigen'],
 'HAS grave':['anti-hipertensiv','nitroprussiato','labetalol','hidralazina','nitrato','captopril','enalapril','clevidipina','PA alvo']
};
function itemHasVitalHl(item){const it=String(item).toLowerCase();return vA().some(al=>{const kw=VITAL_HL_MAP[al]||[];return kw.some(k=>it.includes(k.toLowerCase()));});}

function vC(k,v){const n=parseFloat(v);if(!v)return'vok';if(k==='fc')return(n<40||n>130)?'vc':(n<60||n>100)?'vw':'vok';if(k==='sat')return n<90?'vc':n<95?'vw':'vok';if(k==='fr')return(n<8||n>30)?'vc':(n<12||n>20)?'vw':'vok';if(k==='gli')return n<60?'vc':n<70||n>200?'vw':'vok';if(k==='pa'&&v&&v.includes('/')){const s=parseFloat(v.split('/')[0]);return isNaN(s)?'vok':s<90?'vc':s>180?'vw':'vok';}return'vok';}
function vA(){const a=[],fc=parseFloat(S.fc),sat=parseFloat(S.sat),fr=parseFloat(S.fr);if(S.fc&&(fc>120||fc<40))a.push('FC crítica');if(S.sat&&sat<90)a.push('Sat < 90%');if(S.fr&&(fr>30||fr<8))a.push('FR crítica');if(S.pa&&S.pa.includes('/')){const s=parseFloat(S.pa.split('/')[0]);if(!isNaN(s)){if(s<90)a.push('Hipotensão');if(s>180)a.push('HAS grave');}}return a;}
function vBH(){return[{k:'fc',l:'FC',v:S.fc},{k:'sat',l:'Sat',v:S.sat},{k:'pa',l:'PA',v:S.pa},{k:'fr',l:'FR',v:S.fr},{k:'gli',l:'Glic',v:S.gli}].map(x=>`<div class="vbar ${vC(x.k,x.v)}">${esc(x.l)}<br><strong>${esc(x.v||'—')}</strong></div>`).join('');}
function uvb(){const b=document.getElementById('vbars');if(b)b.innerHTML=vBH();const n2=document.getElementById('news2LiveBox');if(n2)n2.innerHTML=renderNews2LiveCard();const s5n=document.getElementById('news2AlertS5');if(s5n)s5n.innerHTML=renderNews2Step5Alert();}
function calcNEWS2(S){
 let score=0;const breakdown=[];let singleParamAlert=false;
 const fr=parseFloat(S.fr);
 if(!isNaN(fr)&&S.fr!==''&&S.fr!=null){
  let p=0;
  if(fr<=8)p=3;else if(fr<=11)p=1;else if(fr<=20)p=0;else if(fr<=24)p=2;else p=3;
  score+=p;if(p===3)singleParamAlert=true;
  breakdown.push({k:'FR',v:fr+' irpm',p});
 }
 const sat=parseFloat(S.sat);
 if(!isNaN(sat)&&S.sat!==''&&S.sat!=null){
  let p=0;
  if(sat<=91)p=3;else if(sat<=93)p=2;else if(sat<=95)p=1;else p=0;
  score+=p;if(p===3)singleParamAlert=true;
  breakdown.push({k:'SatO2',v:sat+'%',p});
 }
 let pas=null;
 if(S.pa&&typeof S.pa==='string'){
  const pt=S.pa.split('/');pas=parseFloat(pt[0]);
 }
 if(pas!=null&&!isNaN(pas)){
  let p=0;
  if(pas<=90)p=3;else if(pas<=100)p=2;else if(pas<=110)p=1;else if(pas<=219)p=0;else p=3;
  score+=p;if(p===3)singleParamAlert=true;
  breakdown.push({k:'PAS',v:pas+' mmHg',p});
 }
 const fc=parseFloat(S.fc);
 if(!isNaN(fc)&&S.fc!==''&&S.fc!=null){
  let p=0;
  if(fc<=40)p=3;else if(fc<=50)p=1;else if(fc<=90)p=0;else if(fc<=110)p=1;else if(fc<=130)p=2;else p=3;
  score+=p;if(p===3)singleParamAlert=true;
  breakdown.push({k:'FC',v:fc+' bpm',p});
 }
 const temp=parseFloat(S.temp);
 if(!isNaN(temp)&&S.temp!==''&&S.temp!=null){
  let p=0;
  if(temp<=35.0)p=3;else if(temp<=36.0)p=1;else if(temp<=38.0)p=0;else if(temp<=39.0)p=1;else p=2;
  score+=p;if(p===3)singleParamAlert=true;
  breakdown.push({k:'Temp',v:temp+'°C',p});
 }
 let g=(typeof gcs==='function')?gcs():15;
 if(S.ef==='crit'&&g<15){
  score+=3;singleParamAlert=true;
  breakdown.push({k:'Consciência',v:`Glasgow ${g}`,p:3});
 }
 if(!breakdown.length)return null;

 let nivel='baixo',nivelLabel='Baixo risco',cor='#2e7d32',conduta='Monitorização clínica de rotina.';
 if(score>=7){
  nivel='alto';nivelLabel='Alto risco';cor='#b71c1c';
  conduta='RESPOSTA DE EMERGÊNCIA IMEDIATA. Alto risco de deterioração clínica. Avaliar e COGITAR SEPSE / Choque Séptico imediatamente (triagem SSC 2021: lactato, hemoculturas, reposição volêmica precoce e antibiótico na 1ª hora).';
 }else if(score>=5||singleParamAlert){
  nivel='medio';nivelLabel=singleParamAlert&&score<5?'Médio risco (critério extremo em 1 parâmetro)':'Médio risco';cor='#b45309';
  conduta='RESPOSTA DE URGÊNCIA. Risco aumentado de deterioração clínica. Avaliar necessidade de COGITAR SEPSE se suspeita de infecção (coleta de lactato e rastreio infeccioso).';
 }
 return {score,nivel,nivelLabel,cor,conduta,breakdown,singleParamAlert};
}

function renderNews2LiveCard(){
 const res=calcNEWS2(S);
 if(!res)return'';
 const badgeCls=res.nivel==='alto'?'news2-badge-alto':res.nivel==='medio'?'news2-badge-medio':'news2-badge-baixo';
 const alertBox=(res.nivel==='alto'||res.nivel==='medio')
  ?`<div class="abox ${res.nivel==='alto'?'ad':'aw'}" style="margin-top:8px;font-size:12px;line-height:1.45"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>Atenção (NEWS2):</strong> ${esc(res.conduta)}</div>`
  :'';
 return`<div class="news2-card">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px">
   <div style="display:flex;align-items:center;gap:6px">
    <i class="ti ti-activity-heartbeat" style="color:${res.cor};font-size:18px" aria-hidden="true"></i>
    <strong style="font-size:13px">NEWS2 Score: ${res.score} pts</strong>
   </div>
   <span class="news2-badge ${badgeCls}">${res.nivelLabel}</span>
  </div>
  ${alertBox}
 </div>`;
}

function renderNews2Step5Alert(){
 const res=calcNEWS2(S);
 if(!res)return'';
 if(res.nivel==='alto'||res.nivel==='medio'){
  const isCrit=res.nivel==='alto';
  return`<div class="news2-alert-banner ${isCrit?'news2-banner-crit':'news2-banner-urg'}">
   <i class="ti ti-alert-circle" style="font-size:24px;flex-shrink:0" aria-hidden="true"></i>
   <div style="flex:1">
    <div style="font-weight:700;font-size:13.5px;text-transform:uppercase;letter-spacing:.3px">
     ALERTA NEWS2: ${res.score} PONTOS (${res.nivelLabel.toUpperCase()}) — COGITAR SEPSE
    </div>
    <div style="font-size:12px;margin-top:4px;line-height:1.45">
     ${res.conduta}
    </div>
   </div>
  </div>`;
 }
 return`<div class="news2-alert-banner news2-banner-ok">
  <i class="ti ti-circle-check" style="font-size:20px;flex-shrink:0" aria-hidden="true"></i>
  <div style="font-size:12px">
   <strong>NEWS2: ${res.score} pontos (${res.nivelLabel})</strong> — Baixo risco imediato de deterioração clínica aguda.
  </div>
 </div>`;
}
function gcs(){return+S.abc.ao+ +S.abc.rv+ +S.abc.rm;}
function gcsC(n){return n>=14?'sok':n>=9?'smod':'sgr';}
function gcsL(n){return n>=14?'Leve':n>=9?'Moderado':'Grave';}

function updateStickyClinicalCockpit(){
 const el = document.getElementById('stickyClinicalCockpit');
 if(!el) return;
 const pNome = S.nome ? esc(S.nome) : '';
 const pIdade = (typeof S.idade==='number' && S.idade>=0) ? S.idade+'a' : '—';
 const pSexo = S.sexo === 'M' ? 'Masc' : S.sexo === 'F' ? 'Fem' : S.sexo === 'O' ? 'Outro' : '—';
 const pQueixa = S.queixa ? esc(S.queixa) : 'Sem queixa definida';
 
 const pas = S.pa ? parseInt(S.pa.split('/')[0], 10) : null;
 const fc = parseInt(S.fc, 10);
 const sat = parseInt(S.sat, 10);
 const g = (typeof gcs === 'function') ? gcs() : 15;
 const tec = S.abc?.tec;
 const pul = S.abc?.pul;
 const hasSupra = S.ecgS?.st?.some(s=>s.includes('Supra'));
 
 const isCrit = (pas && pas < 90) ||
                (fc && (fc > 130 || fc < 40)) ||
                (sat && sat < 90) ||
                (g <= 12 && S.abc?.ao) ||
                (tec === '> 5s' || pul === 'Filiformes' || pul === 'Ausentes') ||
                hasSupra ||
                (S.sind === 'cho' || S.sind === 'pcr');

 const statusBadge = isCrit
   ? `<span class="cockpit-badge badge-unstable" title="Sinais vitais ou apresentação indicam gravidade iminente"><i class="ti ti-alert-triangle"></i> Instável / Crítico</span>`
   : `<span class="cockpit-badge badge-stable" title="Parâmetros clínicos sem critérios imediatos de instabilidade"><i class="ti ti-circle-check"></i> Estável</span>`;
   
 const allergyBadge = (S.ale && S.ale.trim())
   ? `<span class="cockpit-badge badge-allergy" title="${esc(S.ale.trim())}"><i class="ti ti-shield-alert"></i> Alergia: ${esc(S.ale.trim())}</span>`
   : '';

 el.innerHTML = `
   <div class="cockpit-info">
     <span style="display:flex;align-items:center;gap:6px">
       <i class="ti ti-id" style="color:var(--color-brand,#a32d2d);font-size:16px"></i>
       <span>${pNome ? `<strong>${pNome}</strong> • ` : ''}${pIdade}, ${pSexo}</span>
     </span>
     <span class="cockpit-meta">| <i class="ti ti-stethoscope"></i> ${pQueixa}</span>
   </div>
   <div class="cockpit-badges">
     ${statusBadge}
     ${allergyBadge}
     <button class="hdr-action-btn hdr-btn-decision" onclick="toggleCockpitDecisionPanel()" style="padding:3px 8px;font-size:11px" title="Abrir Apoio à Decisão Beira-leito (Alt + D)">
       <i class="ti ti-bolt"></i> <span>Apoio Beira-Leito</span>
     </button>
   </div>
 `;
}

