// ─── Alvarado & Tokyo (Dor abdominal) ──────────────────────────────────────
function alvaradoSc(){
 const a=S.alvarado;let p=0;
 if(a.mig)p+=1;if(a.anox)p+=1;if(a.nau)p+=1;if(a.dorFid)p+=2;if(a.descomp)p+=1;if(a.febre)p+=1;if(a.leuco)p+=2;if(a.desvio)p+=1;
 return p;
}
function alvaradoInterp(pts){
 if(pts<=4)return 'Baixa probabilidade (apendicite improvável — buscar outro foco)';
 if(pts<=6)return 'Probabilidade intermediária (indicação de imagem / TC de abdome)';
 return 'Alta probabilidade (≥ 7 pts — avaliação cirúrgica direta recomendada)';
}
function alvaradoBadgeClass(pts){return pts<=4?'sok':pts<=6?'smod':'sgr';}
function rAlvarado(){
 const a=S.alvarado;
 const items=[
  {k:'mig',l:'Migração da dor para FID',d:'Sinal de Kocher (+1 pt)'},
  {k:'anox',l:'Anorexia / Inapetência',d:'Perda súbita de apetite (+1 pt)'},
  {k:'nau',l:'Náuseas ou vômitos',d:'Episódios associados à dor (+1 pt)'},
  {k:'dorFid',l:'Dor à palpação em FID',d:'Sensibilidade no ponto de McBurney (+2 pts)'},
  {k:'descomp',l:'Descompressão dolorosa em FID',d:'Sinal de Blumberg positivo (+1 pt)'},
  {k:'febre',l:'Temperatura ≥ 37,3 °C',d:'Febre ou febrícula aferida (+1 pt)'},
  {k:'leuco',l:'Leucocitose > 10.000 /mm³',d:'Hemograma com leucocitose (+2 pts)'},
  {k:'desvio',l:'Desvio à esquerda de neutrófilos > 75%',d:'Neutrofilia / bastonetes (+1 pt)'}
 ];
 return items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(a[x.k])===v?'on':''}" onclick="S.alvarado['${x.k}']=${v};S.alvarado.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}

function tokyoStatus(){
 const t=S.tokyo||{};
 if(t.disfunc)return{c:'sgr',cls:'sgr',txt:'Colecistite Grau III (Grave — Disfunção orgânica: choque/DVA, RNC, PaO2/FiO2 < 300, Cr > 2 ou Plaquetas < 100k)',text:'Colecistite Grau III (Grave — Disfunção orgânica: choque/DVA, RNC, PaO2/FiO2 < 300, Cr > 2 ou Plaquetas < 100k)'};
 if(t.grau2)return{c:'smod',cls:'smod',txt:'Colecistite Grau II (Moderada — Leuco > 18k, massa dolorosa palpável ou duração > 72h)',text:'Colecistite Grau II (Moderada — Leuco > 18k, massa dolorosa palpável ou duração > 72h)'};
 if(t.locais&&t.sist&&t.img)return{c:'smod',cls:'smod',txt:'Colecistite Grau I (Leve — Diagnóstico definitivo: Sinais locais + sistêmicos + imagem)',text:'Colecistite Grau I (Leve — Diagnóstico definitivo: Sinais locais + sistêmicos + imagem)'};
 if(t.locais&&t.sist)return{c:'smod',cls:'smod',txt:'Suspeita clínica de Colecistite (Sinais locais + sistêmicos — aguarda confirmação por USG)',text:'Suspeita clínica de Colecistite (Sinais locais + sistêmicos — aguarda confirmação por USG)'};
 return{c:'sok',cls:'sok',txt:'Critérios de Tokyo não preenchidos',text:'Critérios de Tokyo não preenchidos'};
}
function rTokyo(){
 const t=S.tokyo;
 const items=[
  {k:'locais',l:'A. Sinais locais de inflamação',d:'Sinal de Murphy positivo ou dor/massa em HCD'},
  {k:'sist',l:'B. Sinais sistêmicos de inflamação',d:'Febre, leucocitose ou PCR elevada'},
  {k:'img',l:'C. Achados de imagem compatíveis',d:'USG/TC: espessamento de parede > 4mm, cálculo impactado, líquido pericolecístico'},
  {k:'grau2',l:'Critérios de Gravidade Grau II',d:'Leuco > 18.000, massa dolorosa QSD, queixa > 72h'},
  {k:'disfunc',l:'Critérios de Gravidade Grau III (Disfunção)',d:'Choque com DVA, RNC, insuficiência respiratória ou renal'}
 ];
 return items.map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div><div class="sdsc">${x.d}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(t[x.k])===v?'on':''}" onclick="S.tokyo['${x.k}']=${v};S.tokyo.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('');
}
