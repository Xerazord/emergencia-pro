/* ─── Regras de Conflito Farmacológico & Alertas Clínicos (CDS) ─── */
const CT_ALERT_RULES=[
 {id:'aine-irc',when:S=>S.hpp.includes('IRC'),msg:'IRC prévia: evitar AINE (Cetorolaco/Ibuprofeno) — preferir Dipirona/Paracetamol/opioide. Ajustar doses de ATB por TFG (Vancomicina, Aminoglicosídeos, Piperacilina-Tazo).'},
 {id:'fa-anticoag',when:S=>S.hpp.includes('FA'),msg:'FA prévia: avaliar CHA₂DS₂-VASc + HAS-BLED; manter anticoagulação se já em uso (cuidado se procedimento invasivo iminente).'},
 {id:'dpoc-o2',when:S=>S.hpp.includes('DPOC'),msg:'DPOC retentor: alvo SpO₂ 88–92% (evitar O₂ > 92% — risco de retenção de CO₂ e narcose).'},
 {id:'icc-fluido',when:S=>S.hpp.includes('ICC'),msg:'ICC prévia: ressuscitação volêmica cautelosa (250–500 mL bolus); reavaliar JVP, B3, creptações antes de novo bolus.'},
 {id:'dac-aine',when:S=>S.hpp.includes('DAC'),msg:'DAC prévia: AINE aumenta risco cardiovascular; preferir Paracetamol/opioides. Manter dupla antiagregação se em uso.'},
 {id:'cirr-renal',when:S=>S.hpp.includes('Cirrose'),msg:'Cirrose: ajustar doses por Child-Pugh; evitar AINE (risco de síndrome hepatorrenal); preferir Octreotida + Ceftriaxona se HDA + cirrose.'},
 {id:'alergia-explicit',when:S=>S.ale&&S.ale.toLowerCase()!=='nega'&&S.ale.toLowerCase()!=='nenhuma'&&S.ale.trim(),msg:S=>`Alergia relatada: ${S.ale}. Conferir antes de prescrever qualquer fármaco.`}
];
function getInlineAlerts(){return CT_ALERT_RULES.filter(r=>r.when(S)).map(r=>typeof r.msg==='function'?r.msg(S):r.msg);}

const MOMENTO_2_SYNDROMES=['cho','dtx','neu','rnc','abd','int'];

function getConflictAlerts(S){
 const alerts=[];
 const sind=S.sind;
 const sub=S.subsind;
 const subs=S.subsinds||[];

 const hasChecked=(kwList)=>{
  return Object.keys(S.chk).some(k=>{
   if(!S.chk[k])return false;
   const lastIdx=k.lastIndexOf('_');
   if(lastIdx===-1)return false;
   const secondLastIdx=k.lastIndexOf('_',lastIdx-1);
   if(secondLastIdx===-1)return false;
   const sid=k.substring(0,secondLastIdx);
   const sec=k.substring(secondLastIdx+1,lastIdx);
   const idx=parseInt(k.substring(lastIdx+1),10);
   const obj=CT[sid];
   if(!obj||!obj.s)return false;
   const sSec=obj.s.find(s=>s.id===sec);
   if(!sSec||!sSec.it||!sSec.it[idx])return false;
   const itemTxt=sSec.it[idx].toLowerCase();
   return kwList.some(kw=>itemTxt.includes(kw.toLowerCase()));
  });
 };

 // 1. SCA x Dissecção Aguda de Aorta
 if((sub==='sca_oca'||sub==='sca_noca'||sind==='sca')&&(subs.includes('diss')||sub==='diss')){
  alerts.push({
   id:'sca-diss',
   title:'Conflito Crítico: SCA vs Dissecção Aguda de Aorta',
   text:'Suspeita simultânea de SCA e Dissecção Aguda de Aorta! A anticoagulação plena (heparina) e antiagregação plaquetária dupla (AAS + Clopidogrel/Ticagrelor) são FATAIS em caso de dissecção de aorta. É MANDATÓRIO realizar AngioTC de tórax/aorta ou Ecocardiograma Transesofágico antes de iniciar antitrombóticos agressivos se houver assimetria de pulsos/pressões, dor dorsal/rasgante ou alargamento de mediastino.'
  });
 }

 // 2. Reperfusão Isquêmica / Trombolítico x AVC Hemorrágico ou Sangramento Ativo
 if((sub==='avc_isq'||sind==='neu')&&(subs.includes('avc_hem')||sub==='avc_hem'||subs.includes('hdg')||subs.includes('dab_perf')||subs.includes('dab_hem'))){
  alerts.push({
   id:'avc-hem',
   title:'Conflito Crítico: Reperfusão Isquêmica vs Lesão Hemorrágica / Sangramento Ativo',
   text:'O uso de agentes trombolíticos (Tenecteplase / Alteplase) em paciente com suspeita de sangramento ativo (AVCh, HSA, hemorragia digestiva alta ou abdome hemorrágico/perfurativo) é absolutamente contraindicado e acarreta risco iminente de óbito. Confirme ausência de hemorragia por TC de crânio e hemostasia antes de qualquer lise.'
  });
 }

 // 3. Expansão Volêmica Agressiva x Choque Cardiogênico / Disfunção de VD / Edema Pulmonar
 if((sub==='cho_car'||sub==='cho_obs'||subs.includes('peri'))&&(hasChecked(['30 ml/kg','ressuscitação volêmica','bolus de ringer','ringer lactato 1.000','ringer lactato 2.000','expansão volêmica vigorosa']))){
  alerts.push({
   id:'fluido-cardiogenico',
   title:'Conflito Crítico: Ressuscitação Volêmica Agressiva no Choque Cardiogênico / Congestão',
   text:'Risco de sobrecarga hídrica grave e piora de edema pulmonar/falência ventricular. No choque cardiogênico ou choque obstrutivo (tamponamento, cor pulmonale agudo), infusão em bólus de grande volume eleva a PVC e a pressão diastólica final do VE, precipitando insuficiência respiratória. Priorize vasopressores (Norepinefrina) e inotrópicos (Dobutamina) guiados por POCUS.'
  });
 }

 // 4. Betabloqueador IV x Intoxicação por Cocaína / Simpaticomiméticos
 if((sub==='int_simp'||subs.includes('int_simp')||(S.queixa==='Intoxicação exógena'&&(S.itDrug||'').toLowerCase().includes('coca')))){
  if(hasChecked(['metoprolol','labetalol','esmolol','atenolol','betabloq','propranolol'])){
   alerts.push({
    id:'bb-cocaina',
    title:'Conflito Crítico: Betabloqueador em Intoxicação por Cocaína / Simpaticomiméticos',
    text:'Atenção no manejo da intoxicação por cocaína / simpaticomiméticos: a primeira linha para taquicardia, hipertensão e vasoespasmo é a sedação com Benzodiazepínicos IV e Nitratos. O uso de betabloqueadores puros é desaconselhado na fase hiperaguda (risco de estímulo alfa desoposto e vasoconstrição paradoxal); se necessário controle pressórico refratário, priorizar vasodilatadores ou alfabloqueadores.'
   });
  }
 }

 // 5. AINE x SCA ou Abdome Perfurativo / Sangramento Ativo
 if((sub==='sca_oca'||sub==='sca_noca'||sub==='dab_perf'||subs.includes('dab_perf')||sub==='hdg'||subs.includes('hdg'))){
  if(hasChecked(['cetoprofeno','cetorolaco','ibuprofeno','piroxicam','tenoxicam','diclofenaco','aine'])){
   alerts.push({
    id:'aine-sca-sangramento',
    title:'Conflito Crítico: Uso de AINE em Síndrome Isquêmica ou Risco de Sangramento / Perfuração',
    text:'AINEs aumentam a mortalidade e o risco de rotura miocárdica em vigência de SCA, além de inibirem cicatrização e agravarem o sangramento gastrointestinal e perfuração de víscera oca. Prefira Dipirona ou analgésicos opioides titulados.'
   });
  }
 }

 return alerts;
}

function renderConflictAlertsHtml(S){
 const alerts=getConflictAlerts(S);
 if(!alerts.length)return '';
 return alerts.map(a=>`
  <div class="abox ad" style="margin-bottom:12px;font-size:13px;line-height:1.45;border-left:4px solid #a32d2d">
   <div style="font-size:18px;margin-top:1px"><i class="ti ti-alert-triangle" aria-hidden="true"></i></div>
   <div style="flex:1">
    <strong style="display:block;font-size:13.5px;margin-bottom:3px">${esc(a.title)}</strong>
    <div>${esc(a.text)}</div>
   </div>
  </div>
 `).join('');
}

function updateDecisionConflictBadge(){
  const alerts = (typeof getConflictAlerts === 'function') ? getConflictAlerts(S) : [];
  const count = alerts.length;
  ['decConflictCount', 'hdrConflictCount', 'fabDecisionConflictCount'].forEach(id => {
    const el = document.getElementById(id);
    if(el){
      if(count > 0){
        el.textContent = count;
        el.style.display = 'inline-flex';
      } else {
        el.style.display = 'none';
      }
    }
  });
}


