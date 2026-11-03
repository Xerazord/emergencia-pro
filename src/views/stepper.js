/* ─── Navegação por Passos (Stepper) & Controle de Idade ─── */
function isCardOpen(id, defaultOpen = true){
 if(!S.cardOpen) S.cardOpen = {};
 return S.cardOpen[id] !== undefined ? S.cardOpen[id] : defaultOpen;
}
function tog(id){
 if(!S.cardOpen) S.cardOpen = {};
 S.cardOpen[id] = !isCardOpen(id, true);
 const b = document.getElementById(id);
 if(b) b.classList.toggle('open', S.cardOpen[id]);
}
function cyc(k){if(!S.chk[k])S.chk[k]='done';else delete S.chk[k];render();}
function selSub(id){S.subsind=S.subsind===id?null:id;render();}
function toggleSub(id){const i=S.subsinds.indexOf(id);if(i>-1){S.subsinds.splice(i,1);Object.keys(S.chk).filter(k=>k.startsWith(id+'_inv_')).forEach(k=>delete S.chk[k]);}else{S.subsinds.push(id);}render();}
function rSindBlock(sid){const T=CT[sid];if(!T)return'';if(!T.s||T.s.length===0){if(T.subExcl||T.subAdd)return'';return `<div class="card"><div class="st"><i class="ti ti-list-check" aria-hidden="true"></i> Conduta — ${T.l}</div><div class="abox ai"><i class="ti ti-info-circle" aria-hidden="true"></i> Conduta em desenvolvimento. Registre a abordagem específica no campo "Impressão clínica livre" acima.</div></div>`;}const totSel=T.s.reduce((a,sec)=>a+(sec.it||[]).filter((_,i)=>S.chk[sid+'_'+sec.id+'_'+i]).length,0);const inlineAlerts=getInlineAlerts();const alertsHtml=inlineAlerts.length?`<div class="abox aw" style="margin-bottom:8px;font-size:12.5px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>Alertas de Antecedentes e Medicações:</strong><ul style="margin:4px 0 0 18px;padding:0">${inlineAlerts.map(a=>`<li style="margin-bottom:3px">${esc(a)}</li>`).join('')}</ul></div>`:'';return`<div class="card"><div class="st"><i class="ti ti-list-check" aria-hidden="true"></i> Conduta — ${T.l}</div>${alertsHtml}<div class="ai" style="margin-bottom:10px;font-size:12px"><i class="ti ti-info-circle" aria-hidden="true"></i> Seleção direta de 1 clique: selecione para prescrever / incluir na conduta</div>${totSel?`<div class="psm" style="background:#f0fdf4;border-color:#bbf7d0;margin-bottom:10px"><span class="psml" style="color:#15803d"><i class="ti ti-clipboard-check" aria-hidden="true"></i> Prescrição ativa:</span><span class="psmb" style="background:#dcfce7;color:#15803d">${totSel} ite${totSel>1?'ns':'m'} selecionado${totSel>1?'s':''}</span></div>`:''}${T.s.map(sec=>rCSec(sid,sec)).join('')}</div>`;}
function cico(k){return S.chk[k]?'ti-check':'ti-check';}
function ccls(k){return S.chk[k]?'done':'';}
function cAge(d){S.idade=Math.min(119,Math.max(0,S.idade+d));render();}
function cAgeDig(place,dir){const t=Math.floor(S.idade/10),u=S.idade%10;if(place===10){const nt=(t+dir+13)%13;S.idade=Math.min(119,nt*10+u);}else{const nu=(u+dir+10)%10;S.idade=Math.min(119,Math.floor(S.idade/10)*10+nu);}render();}
let _pendingScroll=null;
let _isProgrammaticScrolling=false;
function rs(){
 const el = document.getElementById('sBar');
 if(!el) return;
 el.innerHTML=STEPS.map((s,i)=>`<div class="step ${i===S.step?'active':i<S.step?'done':''}" onclick="gs(${i})" role="button" tabindex="0" title="Ir para ${s.l} (Passo ${i+1})"><span class="step-num">${i<S.step?'✓':(i+1)}</span><i class="ti ${i<S.step?'ti-check':s.i}" aria-hidden="true"></i>${s.l}</div>`).join('');
}

function gs(n){
 S.step = n;
 rs();
 const el = document.getElementById('step-' + n);
 if(el){
  _isProgrammaticScrolling = true;
  el.scrollIntoView({behavior:'smooth', block:'start'});
  setTimeout(()=>{ _isProgrammaticScrolling = false; }, 600);
 }
}
function nx(){if(S.step<5){gs(S.step+1);}}
function pv(){if(S.step>0){gs(S.step-1);}}

if(typeof window !== 'undefined'){
 let _scrollSpyTimeout = null;
 window.addEventListener('scroll', ()=>{
  if(_isProgrammaticScrolling) return;
  if(_scrollSpyTimeout) return;
  _scrollSpyTimeout = setTimeout(()=>{
   _scrollSpyTimeout = null;
   const stepIds = ['step-0','step-1','step-2','step-3','step-4','step-5'];
   const scrollPos = window.scrollY + 130;
   for(let i = stepIds.length - 1; i >= 0; i--){
    const el = document.getElementById(stepIds[i]);
    if(el && el.offsetTop <= scrollPos){
     if(S.step !== i){
      S.step = i;
      rs();
     }
     break;
    }
   }
  }, 80);
 }, {passive: true});
}
