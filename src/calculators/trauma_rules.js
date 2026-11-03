// ─── Trauma Rules (Canadian CT Head, C-Spine, NEXUS) ────────────────────────
function rTraumaRules(){
 const r=S.trmRules;
 const cct=r.cct,csp=r.cspine,nex=r.nexus;
 const cctIndicated=cct.gcs||cct.base||cct.afund||cct.vomit||cct.idoso||cct.amnesia||cct.energia;
 const cspIndicated=csp.idoso||csp.mecanismo||csp.parestesia||(!csp.baixoRisco)||(!csp.rotacao);
 const nexLiberado=(!nex.dor)&&(!nex.focal)&&nex.gcs15&&(!nex.intox)&&(!nex.distracao)&&nex.evaluated;

 return `
  <div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--color-text-primary)"><i class="ti ti-scan"></i> Canadian CT Head Rule (TCE Leve Glasgow 13–15)</div>
  <div class="srow"><div style="flex:1"><div class="slbl">Critérios de Alto Risco para Neurocirurgia</div><div class="sdsc">Glasgow &lt; 15 após 2h, fratura aberta/afundada, sinais de fratura de base (Battle, guaxinim, hemotímpano, rinoliquorreia), ≥ 2 vômitos ou idade ≥ 65a</div></div><div class="sopts">${[['true','Presente'],['false','Ausente']].map(([v,lb])=>`<span class="sopt ${(cct.gcs||cct.base||cct.afund||cct.vomit||cct.idoso)=== (v==='true')?'on':''}" onclick="S.trmRules.cct.gcs=${v};S.trmRules.cct.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Critérios de Médio Risco para Lesão Cerebral</div><div class="sdsc">Amnésia retrógrada &gt; 30 min ou mecanismo de alta energia (atropelamento, ejeção, queda &gt; 1m)</div></div><div class="sopts">${[['true','Presente'],['false','Ausente']].map(([v,lb])=>`<span class="sopt ${(cct.amnesia||cct.energia)=== (v==='true')?'on':''}" onclick="S.trmRules.cct.amnesia=${v};S.trmRules.cct.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div style="padding:6px 10px;margin-bottom:12px;border-radius:6px;background:${cctIndicated?'#fef2f2':'#f0fdf4'};color:${cctIndicated?'#991b1b':'#15803d'};font-size:12px"><strong>Resultado TC Crânio:</strong> ${cctIndicated?'TC DE CRÂNIO SEM CONTRASTE INDICADA':'Sem indicação mandatória de TC crânio por Canadian Rule'}</div>

  <div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--color-text-primary)"><i class="ti ti-bone"></i> Canadian C-Spine Rule (Coluna Cervical)</div>
  <div class="srow"><div style="flex:1"><div class="slbl">Fator de Alto Risco (Idade ≥ 65a, mecanismo perigoso, parestesias)</div><div class="sdsc">Se presente: Exame de imagem obrigatório</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(csp.idoso)===v?'on':''}" onclick="S.trmRules.cspine.idoso=${v};S.trmRules.cspine.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Fator de Baixo Risco presente para avaliar ADM?</div><div class="sdsc">Colisão traseira simples, deambulando, sentado na emergência, início tardio, sem dor linha média</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(csp.baixoRisco)===v?'on':''}" onclick="S.trmRules.cspine.baixoRisco=${v};S.trmRules.cspine.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div class="srow"><div style="flex:1"><div class="slbl">Consegue rodar pescoço 45° ativamente (E e D)?</div><div class="sdsc">Rotação ativa sem dor limitante</div></div><div class="sopts">${[['true','Sim (45°)'],['false','Não / Dor']].map(([v,lb])=>`<span class="sopt ${String(csp.rotacao)===v?'on':''}" onclick="S.trmRules.cspine.rotacao=${v};S.trmRules.cspine.evaluated=true;render()">${lb}</span>`).join('')}</div></div>
  <div style="padding:6px 10px;margin-bottom:12px;border-radius:6px;background:${cspIndicated?'#fef2f2':'#f0fdf4'};color:${cspIndicated?'#991b1b':'#15803d'};font-size:12px"><strong>Resultado Coluna Cervical (Canadian):</strong> ${cspIndicated?'EXAME DE IMAGEM CERVICAL OBRIGATÓRIO':'Coluna cervical liberada sem imagem por Canadian C-Spine Rule'}</div>

  <div style="font-size:13px;font-weight:600;margin:12px 0 6px 0;color:var(--color-text-primary)"><i class="ti ti-shield-check"></i> Critérios NEXUS (Liberação Clínica da Coluna Cervical)</div>
  ${[
   {k:'dor',l:'1. Dor na linha média cervical posterior à palpação',inv:true},
   {k:'focal',l:'2. Presença de déficit neurológico focal',inv:true},
   {k:'gcs15',l:'3. Nível normal de alerta (Glasgow 15)',inv:false},
   {k:'intox',l:'4. Evidência de intoxicação por álcool ou drogas',inv:true},
   {k:'distracao',l:'5. Presença de lesão dolorosa de distração',inv:true}
  ].map(x=>`<div class="srow"><div style="flex:1"><div class="slbl">${x.l}</div></div><div class="sopts">${[['true','Sim'],['false','Não']].map(([v,lb])=>`<span class="sopt ${String(nex[x.k])===v?'on':''}" onclick="S.trmRules.nexus['${x.k}']=${v};S.trmRules.nexus.evaluated=true;render()">${lb}</span>`).join('')}</div></div>`).join('')}
  <div style="padding:6px 10px;margin-top:6px;border-radius:6px;background:${nexLiberado?'#f0fdf4':'#fef2f2'};color:${nexLiberado?'#15803d':'#991b1b'};font-size:12px"><strong>Critérios NEXUS:</strong> ${nexLiberado?'Coluna cervical liberada clinicamente (sem exames de imagem)':'Critérios não preenchidos — manter imobilização cervical e solicitar imagem'}</div>
 `;
}
