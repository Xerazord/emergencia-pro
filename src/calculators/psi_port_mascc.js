// ─── PSI / PORT (Tosse) ───────────────────────────────────────────────────
function psiPortSc(){
 const p=S.psiPort||{};let s=0;
 const masc=S.sexo!=='F';
 s+=masc?(S.idade||0):Math.max(0,(S.idade||0)-10);
 if(p.asilo)s+=10;if(p.neo)s+=30;if(p.hepato)s+=20;if(p.icc)s+=10;if(p.dcv)s+=10;if(p.renal)s+=10;
 if(p.rnc)s+=20;if(p.fr)s+=20;if(p.pas)s+=20;if(p.temp)s+=15;if(p.fc)s+=10;
 if(p.ph)s+=30;if(p.ureia)s+=20;if(p.na)s+=20;if(p.gli)s+=10;if(p.ht)s+=10;if(p.pao2)s+=10;if(p.derrame)s+=10;
 return s;
}
function psiPortClass(s){
 if(s<=70)return'Classe I–II (Mortalidade ≤ 0,6%) — Tratamento ambulatorial seguro';
 if(s<=90)return'Classe III (Mortalidade ~2,8%) — Observação breve / enfermaria selecionada';
 if(s<=130)return'Classe IV (Mortalidade ~8,2%) — Internação hospitalar recomendada';
 return 'Classe V (Mortalidade ~29,2%) — Internação em UTI recomendada';
}
function psiPortBadgeClass(s){return s<=70?'sok':s<=90?'smod':'sgr';}
function rPsiPort(){
 const p=S.psiPort;
 const masc=S.sexo!=='F';
 const idadePts=masc?S.idade:Math.max(0,S.idade-10);
 const items=[
  {k:'asilo',l:'Residente em asilo / casa de repouso',d:'+10 pts'},
  {k:'neo',l:'Doença neoplásica ativa',d:'+30 pts'},
  {k:'hepato',l:'Doença hepática crônica',d:'+20 pts'},
  {k:'icc',l:'Insuficiência cardíaca congestiva (ICC)',d:'+10 pts'},
  {k:'dcv',l:'Doença cerebrovascular (AVC prévio)',d:'+10 pts'},
  {k:'renal',l:'Doença renal crônica',d:'+10 pts'},
  {k:'rnc',l:'Alteração do estado mental / confusão',d:'+20 pts'},
  {k:'fr',l:'FR ≥ 30 irpm',d:'+20 pts'},
  {k:'pas',l:'PAS < 90 mmHg',d:'+20 pts'},
  {k:'temp',l:'Temp < 35 °C ou ≥ 40 °C',d:'+15 pts'},
  {k:'fc',l:'FC ≥ 125 bpm',d:'+10 pts'},
  {k:'ph',l:'pH arterial < 7,35',d:'+30 pts'},
  {k:'ureia',l:'Ureia ≥ 64 mg/dL (BUN ≥ 30)',d:'+20 pts'},
  {k:'na',l:'Sódio sérico < 130 mEq/L',d:'+20 pts'},
  {k:'gli',l:'Glicemia ≥ 250 mg/dL',d:'+10 pts'},
  {k:'ht',l:'Hematócrito < 30%',d:'+10 pts'},
  {k:'pao2',l:'PaO2 < 60 mmHg ou SatO2 < 90%',d:'+10 pts'},
  {k:'derrame',l:'Derrame pleural no RX de tórax',d:'+10 pts'}
 ];
 return `<div class="srow"><div style="flex:1"><div class="slbl">Idade / Sexo (${S.idade} anos, ${masc?'Masc':'Fem'})</div><div class="sdsc">Auto calculado</div></div><div class="sopts"><span class="sopt auto">${idadePts} pts</span></div></div>`+items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(p[x.k])===v?'on':''}" onclick="S.psiPort['${x.k}']=${v};S.psiPort.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}

// ─── MASCC (Febre / Neutropenia Febril) ─────────────────────────────────────
function masccSc(){
 const m=S.mascc||{};let s=+(m.sintomas||0);
 if(m.pa)s+=5;if(m.dpoc)s+=4;if(m.solido)s+=4;if(m.desid)s+=3;if(m.amb)s+=3;
 if((S.idade||0)<60)s+=2;
 return s;
}
function masccInterp(pts){
 if(pts>=21)return '≥ 21 pts — Baixo risco de complicações graves (< 5% mortalidade). Avaliar conduta ambulatorial supervisionada.';
 return '< 21 pts — Alto risco de complicações (~14% mortalidade). Hospitalização imediata + ATB antipseudomonas venoso em < 60 min.';
}
function masccBadgeClass(pts){return pts>=21?'sok':'sgr';}
function rMascc(){
 const m=S.mascc;
 const agePts=S.idade<60?2:0;
 return `
  <div class="srow"><div style="flex:1"><div class="slbl">Gravidade dos sintomas clínicos</div><div class="sdsc">Impacto da febre e toxemia</div></div><div class="sopts">${[['5','Leve/Assintomático (+5)'],['3','Moderado (+3)'],['0','Grave (0)']].map(([v,lb])=>`<span class="sopt ${m.sintomas===v?'on':''}" onclick="S.mascc.sintomas='${v}';S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Ausência de hipotensão arterial (PAS > 90 mmHg)</div><div class="sdsc">+5 pts</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(m.pa)===v?'on':''}" onclick="S.mascc.pa=${v};S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Ausência de DPOC prévio</div><div class="sdsc">+4 pts</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(m.dpoc)===v?'on':''}" onclick="S.mascc.dpoc=${v};S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Tumor sólido OU hematológico sem infecção fúngica prévia</div><div class="sdsc">+4 pts</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(m.solido)===v?'on':''}" onclick="S.mascc.solido=${v};S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Ausência de desidratação grave necessitando de hidratação parenteral</div><div class="sdsc">+3 pts</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(m.desid)===v?'on':''}" onclick="S.mascc.desid=${v};S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Início da febre em ambiente ambulatorial (fora do hospital)</div><div class="sdsc">+3 pts</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(m.amb)===v?'on':''}" onclick="S.mascc.amb=${v};S.mascc.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Idade < 60 anos (${S.idade} anos)</div><div class="sdsc">Auto calculado (+2 pts)</div></div><div class="sopts"><span class="sopt auto">${agePts} pts</span></div></div>
 `;
}
