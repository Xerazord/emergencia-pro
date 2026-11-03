/* ─── Antecedentes Pessoais, Comorbidades, Alergias & Sinais Vitais ─── */
function buildAntecedentes(){
 const extraHpp=QX_HPP[S.queixa]?QX_HPP[S.queixa](S):[];
 const allHpp=[...S.hpp,...extraHpp].map(h=>h==='Neo'?'Neoplasia':h);
 const hab=S.tab||S.etil||S.drog?'\n- Hábitos: '+[S.tab&&'Tabagismo: '+S.tab,S.etil&&'Etilismo: '+S.etil,S.drog&&'Drogas: '+S.drog].filter(Boolean).join(' | '):'';
 const hppStr = allHpp.length ? allHpp.join(', ') : 'Sem comorbidades prévias relatadas';
 const mucStr = S.muc && S.muc.trim() ? S.muc.trim() : 'Sem uso contínuo de medicações';
 const aleStr = S.ale && S.ale.trim() ? S.ale.trim() : 'Sem alergias medicamentosas conhecidas';
 return `# ANTECEDENTES PESSOAIS\n- Patológicos: ${hppStr}\n- Medicações em uso: ${mucStr}\n- Alergias: ${aleStr}${hab}`;
}
function buildVitais(){
 const va=vA();
 const n2=calcNEWS2(S);
 const n2Str=n2?` | NEWS2: ${n2.score} pts (${n2.nivelLabel})`:'';
 const alerts=va.length?'\n⚠ ALERTAS: '+va.join(' | '):'';
 return `# SINAIS VITAIS DE ENTRADA\n- FC: ${S.fc||'—'} bpm | SatO2: ${S.sat||'—'}% | PA: ${S.pa||'—'} mmHg | FR: ${S.fr||'—'} irpm | Temp: ${S.temp||'—'}°C | Glicemia: ${S.gli||'—'} mg/dL${S.peso?' | Peso: '+S.peso+' kg':''}${S.eva!==''&&S.eva!==null?' | EVA: '+S.eva+'/10':''}${n2Str}${alerts}`;
}
