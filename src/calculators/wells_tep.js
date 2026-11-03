// ─── Wells para TEP ────────────────────────────────────────────────────────
function wellsTepSc(){
 const w=S.wellsTep;let p=0;
 if(w.tvp)p+=3.0;if(w.alt)p+=3.0;if(w.fc)p+=1.5;if(w.imob)p+=1.5;if(w.prev)p+=1.5;if(w.hemo)p+=1.0;if(w.neo)p+=1.0;
 return p;
}
function wellsTepInterp(pts){
 if(pts<=1.5)return 'Baixo risco (~1,3% risco) — TEP improvável (avaliar PERC / D-Dímero)';
 if(pts<=6.0)return 'Risco intermediário (~16% risco) — TEP provável (D-Dímero ou AngioTC)';
 return 'Alto risco (~40% risco) — Alta probabilidade (AngioTC de tórax imediata / Anticoagulação)';
}
function wellsTepBadgeClass(pts){return pts<=1.5?'sok':pts<=6.0?'smod':'sgr';}
function rWellsTep(){
 const w=S.wellsTep;
 const items=[
  {k:'tvp',l:'Sinais clínicos de TVP',d:'Dor à palpação profunda ou edema unilateral (+3.0 pts)'},
  {k:'alt',l:'Diagnóstico alternativo menos provável que TEP',d:'Gestalt do médico assistente (+3.0 pts)'},
  {k:'fc',l:'FC > 100 bpm',d:'Taquicardia na admissão (+1.5 pts)'},
  {k:'imob',l:'Imobilização ≥ 3 dias ou cirurgia recente < 4 sem',d:'Acamado no leito ou pós-operatório (+1.5 pts)'},
  {k:'prev',l:'TVP ou TEP prévio documentado',d:'Histórico pessoal de evento tromboembólico (+1.5 pts)'},
  {k:'hemo',l:'Hemoptise',d:'Expectoração sanguinolenta (+1.0 pt)'},
  {k:'neo',l:'Neoplasia maligna ativa',d:'Em tratamento ativo ou paliativo < 6 meses (+1.0 pt)'}
 ];
 return items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(w[x.k])===v?'on':''}" onclick="S.wellsTep['${x.k}']=${v};S.wellsTep.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}
