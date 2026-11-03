// ─── Wells para TVP ────────────────────────────────────────────────────────
function wellsTvpSc(){
 const w=S.wellsTvp;let p=0;
 if(w.neo)p+=1;if(w.paral)p+=1;if(w.imob)p+=1;if(w.dor)p+=1;if(w.edemaMembro)p+=1;if(w.assimetria)p+=1;if(w.cacifo)p+=1;if(w.colaterais)p+=1;if(w.prev)p+=1;if(w.altMenos)p-=2;
 return p;
}
function wellsTvpInterp(pts){
 if(pts<=0)return 'Baixo risco (~5%) — TVP improvável (D-Dímero descarta)';
 if(pts<=2)return 'Risco moderado (~17%) — Solicitar USG Doppler venoso ou D-Dímero';
 return 'Alto risco (~53%–73%) — TVP provável (USG Doppler venoso de MMII imediato)';
}
function wellsTvpBadgeClass(pts){return pts<=0?'sok':pts<=2?'smod':'sgr';}
function rWellsTvp(){
 const w=S.wellsTvp;
 const items=[
  {k:'neo',l:'Câncer ativo',d:'Em tratamento ativo ou paliativo < 6 meses (+1 pt)'},
  {k:'paral',l:'Paralisia, paresia ou imobilização gessada de MMII',d:'Restrição motora recente de membro inferior (+1 pt)'},
  {k:'imob',l:'Acamamento recente > 3 dias ou cirurgia de grande porte < 12 sem',d:'Pós-operatório ou restrito ao leito (+1 pt)'},
  {k:'dor',l:'Dor localizada ao longo do trajeto venoso profundo',d:'Hipersensibilidade em cordão venoso profundo (+1 pt)'},
  {k:'edemaMembro',l:'Edema de todo o membro inferior',d:'Envolvimento de toda a perna afetada (+1 pt)'},
  {k:'assimetria',l:'Assimetria de panturrilha > 3 cm',d:'Medida 10 cm abaixo da tuberosidade tibial anterior (+1 pt)'},
  {k:'cacifo',l:'Edema depressível com cacifo no membro sintomático',d:'Cacifo presente apenas no lado afetado (+1 pt)'},
  {k:'colaterais',l:'Veias superficiais colaterais não varicosas',d:'Circulação colateral visível (+1 pt)'},
  {k:'prev',l:'TVP prévia documentada',d:'História de trombose venosa profunda (+1 pt)'},
  {k:'altMenos',l:'Diagnóstico alternativo tão ou mais provável que TVP',d:'Ex: celulite, rotura de cisto de Baker, estase venosa crônica (−2 pts)'}
 ];
 return items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(w[x.k])===v?'on':''}" onclick="S.wellsTvp['${x.k}']=${v};S.wellsTvp.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}
