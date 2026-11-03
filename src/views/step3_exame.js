/* ─── Passo 3: Exame Físico (Ambulatorial vs. ABCDE), ECG & POCUS ─── */
function abcH(){
 const a=S.abc,g=gcs();
 const aContent=`${segRadio('Estado da VA:',['Pérvia e Patente','Obstruída'],a.va,"S.abc.va='%V';render()")}${segRadio('Fonação:',['Preservada','Prejudicada/Ausente'],a.fon,"S.abc.fon='%V';render()")}${segRadio('Colar cervical:',['Não indicado','Colocado/Mantido'],a.col,"S.abc.col='%V';render()")}${a.va==='Obstruída'?`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> VA comprometida — manejo imediato</div>`:''}`;
 const bContent=`${segRadio('Expansibilidade:',['Simétrica','Assimétrica'],a.exp,"S.abc.exp='%V';render()")}${segTags('Esforço respiratório:',['Taquipneia','Dispneia','Uso de musculatura acessória','Respiração paradoxal'],a.esf,"ts(S.abc.esf,'%V')")}${segRadio('Murmúrio vesicular:',['Presente e Simétrico','Reduzido','Abolido'],a.mv,"S.abc.mv='%V';render()")}${segTags('Ruídos adventícios:',['Crépitos','Sibilos','Roncos','Atrito pleural'],a.rud,"ts(S.abc.rud,'%V')")}`;
 const cContent=`${segRadio('TEC:',['< 3s','> 3s','> 5s','Em flush'],a.tec,"S.abc.tec='%V';render()")}${segTags('Ausculta cardíaca:',['Regular','Irregular','Reduzida','Sopro','Bulhas hipofonéticas'],a.aus,"ts(S.abc.aus,'%V')")}${segRadio('Pulsos periféricos:',['Simétricos','Assimétricos','Filiformes','Ausentes'],a.pul,"S.abc.pul='%V';render()")}${segTags('Abdome:',['Flácido','Dor à palpação','Defesa','Descompressão dolorosa','Distendido','Ruídos abolidos'],a.abd,"ts(S.abc.abd,'%V')")}${(a.tec==='> 5s'||a.pul==='Filiformes'||a.pul==='Ausentes')?`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> Sinais de choque — ressuscitação imediata</div>`:''}`;
 const dContent=`<div class="gcsg"><div class="gcsc"><label>Ab. Ocular</label><select onchange="S.abc.ao=+this.value;render()"><option value="4" ${a.ao==4?'selected':''}>4-Espontânea</option><option value="3" ${a.ao==3?'selected':''}>3-Comando</option><option value="2" ${a.ao==2?'selected':''}>2-Dor</option><option value="1" ${a.ao==1?'selected':''}>1-Ausente</option></select></div><div class="gcsc"><label>R. Verbal</label><select onchange="S.abc.rv=+this.value;render()"><option value="5" ${a.rv==5?'selected':''}>5-Orientado</option><option value="4" ${a.rv==4?'selected':''}>4-Confuso</option><option value="3" ${a.rv==3?'selected':''}>3-Palavras</option><option value="2" ${a.rv==2?'selected':''}>2-Sons</option><option value="1" ${a.rv==1?'selected':''}>1-Ausente</option></select></div><div class="gcsc"><label>R. Motora</label><select onchange="S.abc.rm=+this.value;render()"><option value="6" ${a.rm==6?'selected':''}>6-Obedece</option><option value="5" ${a.rm==5?'selected':''}>5-Localiza</option><option value="4" ${a.rm==4?'selected':''}>4-Flex.N</option><option value="3" ${a.rm==3?'selected':''}>3-Flex.A</option><option value="2" ${a.rm==2?'selected':''}>2-Extensão</option><option value="1" ${a.rm==1?'selected':''}>1-Ausente</option></select></div></div><div class="gcst"><small style="color:var(--color-text-secondary)">Glasgow Coma Scale</small><div class="big">${g}/15</div><div style="margin-top:3px"><span class="sb ${gcsC(g)}">${gcsL(g)}</span></div></div>${g<=8?`<div class="abox aw"><i class="ti ti-alert-circle" aria-hidden="true"></i> Glasgow ≤ 8 — Vigilância de patência de VA (avaliar IOT se associada a HIC, disfagia grave ou insuficiência respiratória)</div>`:''}${segRadio('Pupilas:',['Isocóricas e Reativas','Anisocóricas','Midriáticas','Mióticas','Não reagentes'],a.pup,"S.abc.pup='%V';render()")}${segTags('Déficits focais:',['Hemiparesia','Hemihipoestesia','PF central','Disartria','Afasia','Ataxia'],a.def,"ts(S.abc.def,'%V')")}${qxEFInCritical()}`;
 const eContent=`${segRadio('Edema MMII:',['Ausente','Presente'],a.ede,"S.abc.ede='%V';render()")}${a.ede==='Presente'?segRadio('Cacifo:',['Com cacifo','Sem cacifo'],a.cac,"S.abc.cac='%V';render()"):''}${segTags('Pele / Ectoscopia:',['Palidez','Frialdade','Icterícia','Cianose','Lesões','Petéquias','Equimoses'],a.pel,"ts(S.abc.pel,'%V')")}`;
 return abcBlock('a','A — Via aérea',aContent)+abcBlock('b','B — Respiração',bContent)+abcBlock('c','C — Circulação',cContent)+abcBlock('d',`D — Neurológico · Glasgow ${g}/15`,dContent)+abcBlock('e','E — Exposição',eContent);
}
const ECG_RITMO=['Sinusal','FA','Flutter atrial','TSV','TV monomórfica','TV polimórfica','FV','BAV 2º Mobitz I','BAV 2º Mobitz II','BAVT','Marca-passo','Outro'];
const ECG_PR=['Normal','BAV 1º grau','Curto (< 120 ms)'];
const ECG_QRS=['Normal','BRE','BRD','Delta (WPW)','Largo inespecífico'];
const ECG_QTC=['Normal','Limítrofe (440–500 ms)','Prolongado (> 500 ms)'];
const ECG_ST=['Supra anterior (V1–V4)','Supra inferior (II,III,aVF)','Supra lateral (I,aVL,V5–V6)','Supra posterior (V7–V9)','Supra aVR','Infradesnivelamento difuso','Infradesnivelamento anterior','Normal'];
const ECG_T=['Normal','Inversão anterior (Wellens)','Inversão difusa','Apiculada (De Winter)','Achatada','Negativação transitória'];
const ECG_PADROES=['Brugada tipo 1','Sgarbossa','Repolarização precoce','Alternância elétrica'];
QX_SPEC_BY_SIGLA['ecgS']={
 sigla:'ecgS',
 blocks:[
  {key:'ritmo',label:'Ritmo',type:'radio',options:ECG_RITMO,autoOpenNext:'pr'},
  {key:'pr',label:'Intervalo PR',type:'radio',options:ECG_PR,autoOpenNext:'qrs'},
  {key:'qrs',label:'QRS',type:'radio',options:ECG_QRS,autoOpenNext:'qtc'},
  {key:'qtc',label:'QTc',type:'radio',options:ECG_QTC,autoOpenNext:'st'},
  {key:'st',label:'Segmento ST',type:'tags',options:ECG_ST,autoOpenNext:'ondaT'},
  {key:'ondaT',label:'Onda T',type:'tags',options:ECG_T,autoOpenNext:'padroes'},
  {key:'padroes',label:'Padrões específicos',type:'tags',options:ECG_PADROES}
 ],
 onAdd(){S.ecgS.normal=false;}
};
function ecgSetNormal(){
 S.ecgS={normal:true,ritmo:'Sinusal',fcEcg:'',pr:'Normal',qrs:'Normal',qtc:'Normal',st:[],ondaT:[],padroes:[]};
 S.ecgSOpen={};
 render();
}
function rECG(){
 const e=S.ecgS;
 return `<div class="card"><div class="st"><i class="ti ti-activity-heartbeat" aria-hidden="true"></i> ECG</div><button class="xbtn ${e.normal?'on':''}" style="width:100%;margin-bottom:10px" onclick="ecgSetNormal()"><i class="ti ti-check" aria-hidden="true"></i> ECG Normal</button><div style="margin-bottom:10px"><label>FC (bpm)</label><input type="number" inputmode="numeric" min="0" max="300" value="${esc(e.fcEcg)}" oninput="S.ecgS.normal=false;S.ecgS.fcEcg=this.value" placeholder="bpm"></div>${accordionRender('ecgS')}</div>`;
}
function rPOCUS(){const p=S.pocS;return`<div class="card"><div class="st"><i class="ti ti-wave-sine" aria-hidden="true"></i> POCUS</div>${[['pulmao','Pulmão'],['coracao','Coração'],['abdome','Abdome'],['mmii','MMII'],['outros','Outros']].map(([k,l])=>`<div style="margin-bottom:8px"><label>${l}</label><input type="text" value="${esc(p[k])}" oninput="S.pocS['${k}']=this.value;updateRelCol();if(typeof autoSave==='function')autoSave();" placeholder="${l}..."></div>`).join('')}</div>`;}
function dispGrav(){const fr=parseFloat(S.fr),sat=parseFloat(S.sat),fala=S.dspEF.fala,cian=S.dspEF.cianose;let pts=0;if(S.fr&&(fr>30||fr<12))pts+=2;else if(S.fr&&fr>24)pts+=1;if(S.sat&&sat<90)pts+=2;else if(S.sat&&sat<94)pts+=1;if(fala==='Palavras soltas'||fala==='Impossível falar')pts+=2;else if(fala==='Frases incompletas')pts+=1;if(cian==='Central (lábios/língua)')pts+=2;if(pts>=4)return'grave';if(pts>=2)return'mod';return'leve';}
function dispGravBadge(){if(S.queixa!=='Dispneia')return'';const hasData=S.fr||S.sat||S.dspEF.fala||S.dspEF.cianose;if(!hasData)return'';const g=dispGrav();const[level,txt]=g==='grave'?['grave','Gravidade sugerida: GRAVE — IOT/VNI considerar imediatamente']:g==='mod'?['mod','Gravidade sugerida: MODERADA — monitorização intensa, O2 alto fluxo']:['leve','Gravidade sugerida: LEVE — tratar e reavaliar'];return gravBadge(level,txt,{noMargin:true});}
function setNormalPhysicalExam(){
 const s=(S.sexo==='M'||S.sexo==='F')?S.sexo:'M';
 const tpl=EF_TEMPLATES[s];
 S.amb={
  g:tpl.g,
  cv:tpl.cv,
  re:tpl.re,
  ab:tpl.ab,
  ne:tpl.ne,
  pe:tpl.pe
 };
 S.abc={
  va:'Pérvia e Patente',
  fon:'Preservada',
  col:'Não indicado',
  exp:'Simétrica',
  mv:'Presente e Simétrico',
  rud:[],
  esf:[],
  tec:'< 3s',
  aus:['Regular'],
  pul:'Simétricos',
  abd:['Flácido'],
  ao:4,
  rv:5,
  rm:6,
  pup:'Isocóricas e Reativas',
  def:[],
  ede:'Ausente',
  cac:'Sem cacifo',
  pel:[]
 };
 if(!S.ef)S.ef='amb';
 render();
 showToast('Exame físico preenchido como sem alterações agudas! Edite eventuais particularidades.');
}

function s3(){
 const badge = (S.queixa === 'Dispneia' && QX_BADGE[S.queixa]) ? QX_BADGE[S.queixa]() : '';
 const curTab = S.s3Tab || 'ef';

 const e = S.ecgS;
 const hasEcg = !!(e.normal || e.ritmo || e.fcEcg || (e.st && e.st.length) || (e.ondaT && e.ondaT.length) || (e.padroes && e.padroes.length));
 const p = S.pocS;
 const hasPoc = !!(p.pulmao || p.coracao || p.abdome || p.mmii || p.outros);

 const ecgBadge = hasEcg ? `<span class="sb sok" style="font-size:10px;padding:2px 6px;margin-left:5px">Preenchido</span>` : '';
 const pocBadge = hasPoc ? `<span class="sb sok" style="font-size:10px;padding:2px 6px;margin-left:5px">Preenchido</span>` : '';

 const tabBar = `
  <div class="s3-tabs-bar" style="display:flex;gap:6px;margin-bottom:12px;background:#f3f4f6;padding:4px;border-radius:8px">
   <button type="button" class="xbtn ${curTab==='ef'?'on':''}" style="flex:1;justify-content:center;font-size:13px;padding:8px" onclick="S.s3Tab='ef';render()">
    <i class="ti ti-stethoscope" aria-hidden="true"></i> Exame Físico
   </button>
   <button type="button" class="xbtn ${curTab==='ecg'?'on':''}" style="flex:1;justify-content:center;font-size:13px;padding:8px" onclick="S.s3Tab='ecg';render()">
    <i class="ti ti-activity-heartbeat" aria-hidden="true"></i> ECG${ecgBadge}
   </button>
   <button type="button" class="xbtn ${curTab==='pocus'?'on':''}" style="flex:1;justify-content:center;font-size:13px;padding:8px" onclick="S.s3Tab='pocus';render()">
    <i class="ti ti-wave-sine" aria-hidden="true"></i> POCUS${pocBadge}
   </button>
  </div>
 `;

 let mainContent = '';
 if(curTab === 'ef'){
  mainContent = `
   <div id="step-3" class="card">
    <div class="st" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
     <span><i class="ti ti-search" aria-hidden="true"></i> Exame Físico</span>
     <button type="button" class="xbtn" style="background:#f0fdf4;border-color:#86efac;color:#15803d;font-weight:600;padding:6px 12px;font-size:12px" onclick="setNormalPhysicalExam()" title="Preenche todos os campos com padrão fisiológico normal">
      <i class="ti ti-circle-check" aria-hidden="true"></i> Exame Sem Alterações Agudas (1 toque)
     </button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1rem">
     <button class="xbtn ${S.ef==='amb'?'on':''}" onclick="S.ef='amb';render()"><i class="ti ti-walk" aria-hidden="true"></i> Ambulatorial</button>
     <button class="xbtn ${S.ef==='crit'?'on':''}" onclick="S.ef='crit';render()"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Exame Físico Crítico</button>
    </div>
   </div>
   ${S.ef==='amb'?`<div class="card"><div class="st">Padrão ambulatorial</div>${[['g','Geral'],['cv','AP Cardiovascular'],['re','AP Respiratório'],['ab','Abdome'],['ne','Neurológico'],['pe','Pele e MMII']].map(([k,l])=>{const tpl=(S.sexo==='M'||S.sexo==='F')?EF_TEMPLATES[S.sexo][k]:null;const ph=tpl||l+'...';const sug=tpl?`<button type="button" class="ef-sug-btn" onclick="if(!S.amb['${k}']){S.amb['${k}']=EF_TEMPLATES[S.sexo]['${k}'];render()}" title="Preencher com sugestão para o sexo selecionado">Sugestão</button>`:'';return`<div style="margin-bottom:10px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><label style="margin:0">${l}</label>${sug}</div><input type="text" value="${esc(S.amb[k])}" oninput="S.amb['${k}']=this.value" placeholder="${esc(ph)}"></div>`}).join('')}</div>`:''}
   ${S.ef==='crit'?`<div class="card"><div class="st">Avaliação Primária Sistematizada</div>${abcH()}</div>`:''}
   ${S.ef&&QX_EF[S.queixa]?QX_EF[S.queixa]():''}
  `;
 } else if(curTab === 'ecg'){
  mainContent = rECG();
 } else if(curTab === 'pocus'){
  mainContent = rPOCUS();
 }

 return `${badge}${tabBar}${mainContent}`;
}
