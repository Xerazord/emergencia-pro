/**
 * CT Entries Amostra (15 entries)
 * Schema padronizado: sup/inv/sin/esp/dsp
 *
 * Uso: copiar cada entrada CT.xxx abaixo e colar em index.html (linhas 1627-2435)
 * Verificação: cada entrada deve ter exatamente 5 seções (sup, inv, sin, esp, dsp)
 *
 * Renomeações necessárias:
 * - SLIST: 'sin' → 'sinc' (linha 1621 em index.html)
 * - CT: aplicar 15 entradas abaixo
 */

// ============================================================================
// 1. CHO (Choque indiferenciado — Ressuscitação inicial genérica)
// ============================================================================
CT.cho = {
  l: 'Choque',
  subExcl: ['cho_sep', 'cho_hip', 'cho_car', 'cho_obs'],
  s: [
    {id:'sup', t:'Ressuscitação inicial', it:[
      'Monitorização contínua: Telemetria, PANI a cada 5 min, SpO₂, FR, FC, diurese (considerar Foley)',
      'Acesso venoso: 2 AVPS (16–18G) como primeira escolha; se falha, IO com técnica asséptica; CVC com técnica asséptica se choque refratário',
      'Oxigenoterapia com SatO₂ alvo ≥90% (individualizar conforme patologias e objetivos): CN / MNRL 10–15L/min ou flush-rate / CNAF / VNI',
      'Posicionamento: supino com membros inferiores elevados 30°, se tolerar',
      'Aquecimento passivo se hipotermia; evitar hipertermia iatrogênica',
      'Expansão volêmica: Ringer Lactato 500–1000mL IV agora (usuário edita volume conforme resposta clínica)',
      'Norepinefrina: 0,01–0,3 μg/kg/min IV (infusão contínua central) se PA sistólica <90 após fluido adequado',
      'Vasopressina: 0,04 U/min IV (titrável) se refratário a norepinefrina',
      'Hidrocortisona: 100mg IV 8/8h (dose de choque)',
      'Dobutamina: 2–20 μg/kg/min IV se sinais de disfunção cardíaca (redução de pós-carga, melhora de contratilidade)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Labs: hemograma, coagulograma (TP/INR, TTPa), glicemia, eletrólitos (Na, K, Cl, Ca, Mg, Phos), creatinina, urina tipo I',
      'Lactato sérico (tomar 0 e 6h): marcador de perfusão tecidual e prognóstico',
      'ECG 12-D: isquemia, ritmo, intervalo PR/QRS (descartar arritmia)',
      'Ecocardio (bedside se expertise): FE, movimentação de septo, sobrecarga de VD',
      'Raio-X de tórax: cardiomegalia, edema pulmonar, infiltrados',
      'POCUS: pulmonar (B-lines, derrame), abdominal (rastreio livre, perfusão)'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1–2g IV 6/6h ou paracetamol 500mg–1g IV 6/6h',
      'Ansiolítico se agitação: midazolam 2–5mg IV em bolus, repetir a cada 5–10 min conforme necessidade',
      'Antiemético: ondansetrão 4mg IV ou metoclopramida 10mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      '(Selecione um subtipo de choque — séptico, cardiogênico, obstrutivo ou hipovolêmico — para ver condutas específicas baseadas na fisiologia)'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação com solicitação imediata de vaga em UTI',
      'Solicitação de transferência via CROSS imediatamente (risco elevado de desfecho negativo se mantido em unidade pré-hospitalar fixa)'
    ]}
  ]
};

// ============================================================================
// 2. CHO_SEP (Choque séptico)
// ============================================================================
CT.cho_sep = {
  l: 'Choque séptico',
  s: [
    {id:'sup', t:'Ressuscitação inicial', it:[
      'Monitorização contínua: Telemetria, PANI a cada 5 min, SpO₂, FR, FC, diurese (Foley), lactato de repetição',
      'Acesso venoso: 2 AVPS (16–18G) como primeira escolha; se falha, IO com técnica asséptica; CVC com técnica asséptica se choque refratário',
      'Oxigenoterapia com SatO₂ alvo ≥92%: CN / MNRL 10–15L/min ou flush-rate / CNAF / VNI',
      'Posicionamento: supino com membros inferiores elevados 30°',
      'Aquecimento passivo se hipotermia',
      'Expansão volêmica: Ringer Lactato 500–1000mL IV agora (reavaliação contínua de PA, FC, perfusão periférica, diurese)',
      'Norepinefrina: 0,01–0,3 μg/kg/min IV (infusão contínua central) se PA sistólica <90 após fluido adequado',
      'Vasopressina: 0,04 U/min IV (titrável) se refratário a norepinefrina ou PA ainda <90',
      'Hidrocortisona: 100mg IV 8/8h (dose de choque)',
      'Dobutamina: 2–20 μg/kg/min IV se sinais de disfunção cardíaca (débito baixo)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Hemoculturas (2 frascos) ANTES de antibiótico',
      'Lactato sérico (0 e 6h): clearance de lactato prediz resposta terapêutica',
      'Hemograma, coagulograma (TP/INR, TTPa, plaquetas), função renal (creatinina, ureia), eletrólitos (Na, K, Ca, Mg, Phos)',
      'Procalcitonina (PCT): auxilia triagem infeccioso vs. não-infeccioso',
      'Cultura de urina, swab de ferida, líquidos corporais conforme sítio infeccioso suspeito',
      'Raio-X de tórax ou TC de tórax/abdômen se pneumonia/derrame/foco abdominal suspeito',
      'Gasometria arterial: avaliar pH, pCO₂, saturação'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1–2g IV 6/6h ou paracetamol 500mg–1g IV 6/6h',
      'Ansiolítico se agitação: midazolam 2–5mg IV em bolus, repetir conforme necessidade',
      'Antipiréticos conforme protocolo (paracetamol max 4g/dia)',
      'Antiemético: ondansetrão 4mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Antibioticoterapia empírica de amplo espectro (iniciar <1h de diagnóstico):',
      '  • Infecção comunitária não-grave: ceftriaxona 2g IV 12/12h + azitromicina 500mg IV 1x/dia',
      '  • Risco ESBL/gram-negativo: ceftazidima 1–2g IV 8/8h + fluoroquinolona (levofloxacina 750mg IV 1x/dia)',
      '  • Risco anaeróbio (abdominal, odontológico): adicionar metronidazol 500mg IV 6/6h',
      '  • Risco MRSA: adicionar vancomicina 15–20mg/kg IV 8/12h (target nível 15–20 μg/mL)',
      'Controle de foco: drenagem cirúrgica de abscesso, remoção de cateter/dispositivo infectado, desbridamento'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação com solicitação imediata de vaga em UTI',
      'Solicitação de transferência via CROSS imediatamente (risco elevado de desfecho negativo)'
    ]}
  ]
};

// ============================================================================
// 3. CHO_HIP (Choque hipovolêmico)
// ============================================================================
CT.cho_hip = {
  l: 'Choque hipovolêmico',
  s: [
    {id:'sup', t:'Ressuscitação inicial', it:[
      'Monitorização contínua: Telemetria, PANI a cada 5 min, SpO₂, FR, FC, diurese (Foley)',
      'Acesso venoso: 2 AVPS (16–18G) como primeira escolha; se falha, IO com técnica asséptica; CVC com técnica asséptica se choque refratário',
      'Oxigenoterapia com SatO₂ alvo ≥90%: CN / MNRL 10–15L/min ou flush-rate / CNAF / VNI',
      'Posicionamento: supino com membros inferiores elevados 30°',
      'Aquecimento: manta térmica se hipotermia',
      'Expansão volêmica: Ringer Lactato 500–1000mL IV agora (reavaliação contínua; aumentar volume conforme deficit estimado)',
      'Norepinefrina: 0,01–0,3 μg/kg/min IV (infusão central) se PA sistólica <90 após fluido adequado',
      'Vasopressina: 0,04 U/min IV (titrável) se refratário',
      'Hidrocortisona: 100mg IV 8/8h (dose de choque)',
      'Dobutamina: 2–20 μg/kg/min IV se sinais de disfunção cardíaca'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Hemograma seriado: Hb/Ht (não reflete sangramento agudo nas primeiras 2h)',
      'Coagulograma: TP/INR, TTPa, plaquetas, fibrinogênio (se sangramento significativo)',
      'Função renal: creatinina, ureia (elevada desproporcional sugere sangue no GI)',
      'Eletrólitos: Na, K, Cl, Ca, Mg',
      'Lactato sérico (0 e 6h): perfusão tecidual',
      'Tipo/cruzamento para possível transfusão (preparar sangue O negativo se exsanguinação)',
      'Imagiologia conforme sítio: TC com contraste (trauma abdominal, pélvico), endoscopia (HDA), FAST/ecocardio bedside'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h ou paracetamol 500mg–1g IV 6/6h (cautela com sangramento ativo)',
      'Ansiolítico se agitação: midazolam 2–5mg IV em bolus (cautela com depressão respiratória)',
      'Antiemético: ondansetrão 4mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Hemostasia definitiva: cirurgia (trauma abdominal, ruptura aneurisma), endoscopia (HDA, HDC), angiografia/embolização',
      'Transfusão de hemácias: meta Hb 7–9 g/dL (restritiva); se exsanguinação iminente, usar sangue O negativo e ativar protocolo massive transfusion',
      'Transfusão de plasma fresco congelado (FFP) se coagulopatia confirmada (INR >1,5, TTPa prolongado)',
      'Concentrado de plaquetas se plaquetas <50k (cirurgia) ou <20k (médico)',
      'Ácido tranexâmico (TXA): 1g IV em 3 min, depois 1g em 8h (se sangramento ativo <3h; reduz mortalidade em trauma)',
      'Evitar fluidos em excesso (permissive hypotension em trauma não-controlado): manter PA sistólica 70–80 mmHg até hemostasia cirúrgica'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação com solicitação imediata de vaga em UTI',
      'Solicitação de transferência via CROSS imediatamente (risco elevado de desfecho negativo)'
    ]}
  ]
};

// ============================================================================
// 4. CHO_CAR (Choque cardiogênico)
// ============================================================================
CT.cho_car = {
  l: 'Choque cardiogênico',
  s: [
    {id:'sup', t:'Ressuscitação inicial', it:[
      'Monitorização contínua: Telemetria, PANI a cada 5 min, SpO₂, FR, FC, diurese (Foley), lactato de repetição',
      'Acesso venoso: 2 AVPS (16–18G) como primeira escolha; se falha, IO com técnica asséptica; CVC com técnica asséptica para monitorização pressão venosa central',
      'Oxigenoterapia com SatO₂ alvo ≥92%: CN / MNRL 10–15L/min ou flush-rate / CNAF / VNI (VNI preferencial antes de intubação)',
      'Posicionamento: semi-recumbente (facilita diurese e repouso cardíaco)',
      'Aquecimento passivo se hipotermia',
      'Expansão volêmica cautelosa: Ringer Lactato 250–500mL IV agora (reavaliação rigorosa; parar se creptações, JVP elevada, edema periférico)',
      'Norepinefrina: 0,01–0,3 μg/kg/min IV (infusão central) se PA sistólica <90 após fluido mínimo',
      'Vasopressina: 0,04 U/min IV (titrável) se refratário',
      'Hidrocortisona: 100mg IV 8/8h (dose de choque)',
      'Dobutamina: 2–20 μg/kg/min IV (melhora contratilidade e vasodilatação periférica)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Troponina I ou T (ultrassensível): marcador de infarto miocárdico',
      'Lactato sérico (0 e 6h): perfusão tecidual',
      'BNP/NT-proBNP: estratificação de risco (prognóstico)',
      'Hemograma, coagulograma, função renal, eletrólitos',
      'ECG 12-D seriado (0, 30 min, 3h): desnivelamento ST, inversão T, arritmias',
      'Ecocardio (transtorácica ± transesofágica): FE, movimentação de septo, tamanho câmaras, sobrecarga de VD, derrame pericárdico, valvopatia',
      'Raio-X de tórax: cardiomegalia, edema pulmonar, infiltrados',
      'Cineangiocoronariografia: padrão ouro diagnóstico se IAM suspeito (realiza intervenção percutânea)'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h ou paracetamol 500mg–1g IV 6/6h (evitar AINE)',
      'Ansiolítico se agitação: midazolam 2–5mg IV em bolus (facilita VNI)',
      'Antiemético: ondansetrão 4mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Se infarto miocárdico agudo (STEMI/NSTEMI):',
      '  • Dual antiplatelet: AAS 300–500mg IV + P2Y12 inibidor (clopidogrel 600mg VO ou prasugrel 60mg VO)',
      '  • Anticoagulação: enoxaparina 0,5–1 mg/kg IV ou fondaparinux 2,5mg IV 1x/dia',
      '  • Reperfusão urgente: angioplastia primária (<120 min) ou trombolítico (tPA 0,9 mg/kg IV se angioplastia indisponível)',
      'Se cardiomiopatia dilatada descompensada:',
      '  • Diurético IV: furosemida 40–80mg IV (titulação para diurese 200–300 mL/h)',
      '  • Nitroglicerina IV contínua (se PA >100 mmHg): 12,5–25 μg/min, titragem a cada 5 min (máx 400 μg/min)',
      '  • IECA de ação rápida: enalapril 2,5mg IV 6/6h (após estabilização hemodinâmica)',
      'Se estenose aórtica severa: referência urgente para cirurgia (prognóstico fatal sem intervenção)',
      'Se derrame pericárdico com tamponamento: pericardiocentese (drenagem percutânea ou cirúrgica)'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação com solicitação imediata de vaga em UTI',
      'Solicitação de transferência via CROSS imediatamente (risco elevado de desfecho negativo)'
    ]}
  ]
};

// ============================================================================
// 5. CHO_OBS (Choque obstrutivo)
// ============================================================================
CT.cho_obs = {
  l: 'Choque obstrutivo',
  s: [
    {id:'sup', t:'Ressuscitação inicial', it:[
      'Monitorização contínua: Telemetria, PANI a cada 5 min, SpO₂, FR, FC, diurese (Foley)',
      'Acesso venoso: 2 AVPS (16–18G) como primeira escolha; se falha, IO com técnica asséptica; CVC com técnica asséptica para PVC/drenagem',
      'Oxigenoterapia com SatO₂ alvo ≥92%: CN / MNRL 10–15L/min ou flush-rate / CNAF / VNI',
      'Posicionamento: supino ou semi-recumbente conforme etiologia',
      'Aquecimento passivo se hipotermia',
      'Expansão volêmica: Ringer Lactato 500–1000mL IV agora (reavaliação contínua; fluido pode piorar alguns casos como asma/DPOC)',
      'Norepinefrina: 0,01–0,3 μg/kg/min IV (infusão central) se PA sistólica <90 após fluido adequado',
      'Vasopressina: 0,04 U/min IV (titrável) se refratário',
      'Hidrocortisona: 100mg IV 8/8h (dose de choque)',
      'Dobutamina: 2–20 μg/kg/min IV se sinais de disfunção cardíaca'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Ecocardio (transtorácica ± transesofágica): derrame pericárdico? Tamponamento? Dilatação VD (TEP)? Movimentação de septo?',
      'Troponina: descartar IEM coexistente',
      'Lactato sérico (0 e 6h): perfusão',
      'Hemograma, coagulograma, função renal, eletrólitos',
      'ECG 12-D: S1Q3T3 (TEP, inespecífico), RDAB (sobrecarga VD)',
      'D-dímero: alta sensibilidade (~98%); negativa praticamente exclui TEP',
      'Angiotomografia pulmonar (ATCO): padrão ouro para TEP; identifica nível de oclusão',
      'Raio-X de tórax: silhueta cardíaca, pulmões, mediastino',
      'Gasometria arterial: hipoxemia, hipocapnia em TEP massiva'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h ou paracetamol 500mg–1g IV 6/6h',
      'Ansiolítico se agitação: midazolam 2–5mg IV em bolus (cautela com depressão respiratória)',
      'Antiemético: ondansetrão 4mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Se tamponamento cardíaco: pericardiocentese urgente (drenagem percutânea) ou pericardiotomia cirúrgica (drenagem definitiva)',
      'Se tromboembolismo pulmonar (TEP) massivo:',
      '  • Anticoagulação: enoxaparina 1 mg/kg IV ou fondaparinux 5–10mg IV 1x/dia',
      '  • Trombolítico: alteplase 10mg IV bolus + 90mg infusão em 2h (total 100mg) se choque/instabilidade',
      '  • Alternativa: estreptoquinase 1,5 MU IV em 1h (menos específica)',
      '  • Trombectomia percutânea/cirúrgica se trombolítico contraindicado + choque refratário',
      'Se pneumotórax hipertensivo: descompressão imediata (agulha 2º espaço intercostal midclavicular, depois tubo de tórax)',
      'Se asma/DPOC agudo com broncoespasmo severo: beta-2 agonista inalatório, corticosteroide IV, brometo de ipratrópio, magnesium IV, ketamina se intubação'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação com solicitação imediata de vaga em UTI',
      'Solicitação de transferência via CROSS imediatamente (risco elevado de desfecho negativo)'
    ]}
  ]
};

// ============================================================================
// 6. HDG (Hemorragia digestiva)
// ============================================================================
CT.hdg = {
  l: 'Hemorragia digestiva',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso duplo (16–18G periférica); considerar cateter central se instabilidade extrema',
      'Monitorização contínua: FC, PA (cada 5 min), SpO₂, diurese (sonda Foley)',
      'Oxigenoterapia: alvo SpO₂ ≥92%',
      'Posicionamento: supino, elevação leve da cabeça (15–30°) se consciente para prevenir aspiração',
      'Repouso absoluto: nada per os até endoscopia',
      'Aquecimento: manta térmica se hipotermia'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Hemograma: Hb/Ht (não reflete sangramento agudo nas primeiras 2h)',
      'Coagulograma: TP/INR, TTPa, plaquetas, fibrinogênio',
      'Função renal: creatinina, ureia (ureia elevada desproporcional sugere sangue no trato GI)',
      'Eletrólitos: Na, K, Cl, albumina',
      'Tipo/cruzamento para possível transfusão',
      'Endoscopia digestiva alta (EDA) — padrão ouro para HDA, terapêutica + diagnóstica',
      'Se sangramento persistente/refratário: tomografia angio-CT abdominal ou cintilografia'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h (cautela com sangramento ativo) ou paracetamol 500mg–1g 6/6h',
      'Antiemético se vômitos: ondansetrão 4mg IV ou metoclopramida 10mg IV',
      'Ansiolítico: midazolam 1–2mg IV se agitação (cautela com depressão respiratória)'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Fluidoterapia: cristalóide isotônico (Ringer Lactato) com objetivo PAM ≥65 mmHg',
      '  • Primeira bolus: 500–1000 mL em 15–30 min',
      '  • Reavaliação: se Hb <7 g/dL e sangramento ativo → transfusão de PFC (meta Hb 7–9)',
      'Inibidor de bomba de prótons (IBP) IV:',
      '  • Omeprazol 40mg IV 12/12h (após bolus inicial 80mg em 15 min)',
      '  • Pantoprazol 80mg bolus → 8mg/h infusão contínua',
      'Hemostasia endoscópica: injeção de epinefrina, ligadura elástica (varizes), argumento, etc.',
      'Transfusão de hemácias: unidades O positivas se Rh desconhecido, ou tipo/cruzado se tempo permite',
      'Profilaxia antibiótica em cirrose/varizes: ceftriaxona 1g IV 1x/dia por 7 dias (baixa evidência para HDA não-varicosa)'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação mínimo 6h pós-EDA com repouso relativo',
      'Internação em enfermaria se controle endoscópico alcançado, Hb estável, tolerando dieta leve',
      'Internação UTI: sangramento refratário (>2 tentativas endoscópicas), choque refratário, ou falência de múltiplos órgãos',
      'Transfer para centro endoscópico se não houver expertise local'
    ]}
  ]
};

// ============================================================================
// 4. DTX (Dor torácica)
// ============================================================================
CT.dtx = {
  l: 'Dor torácica',
  subAdd: ['sca', 'tep', 'eap', 'peri'],
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso periférico (18–20G)',
      'Monitorização contínua: ECG de 12 derivações (imediatamente), FC, PA, SpO₂',
      'Oxigenoterapia: alvo SpO₂ ≥92% (não usar se DPOC com retenção CO₂)',
      'Repouso relativo em poltrona/leito semi-recumbente'
    ]},
    {id:'inv', t:'Investigação', it:[
      'ECG 12-D: ST, T, intervalo PR/QRS (obrigatório em <10 min)',
      'Troponina I ou T (ultrassensível) — pode negativizar em infarte transmural antigo',
      'Hemograma, coagulograma (se suspeita tromboembolismo ou anticoagulação)',
      'D-dímero (se baixa probabilidade clínica de TEP, pode excluir TEP em ambulatório)',
      'Raio-X de tórax: silhueta cardíaca, campos pulmonares (edema, pneumotórax?)',
      'Ecocardio transtorácica: fração ejeção, movimentação parede (se IM suspeito)'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h ou paracetamol 1g IV 6/6h (evitar AINE se IM agudo)',
      'Nitroglicerina sublingual 0,5mg (max 3 doses q5min) se dor isquêmica e PA >90/60',
      'Ansiolítico se agitação: midazolam 1–2mg IV'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Se SCA (STEMI/NSTEMI): dual antiplatelet (AAS 300mg + clopidogrel 600mg), anticoagulação (enoxaparina), reperfusão (angioplastia ou trombolítico)',
      'Se TEP: anticoagulação com HBPM (enoxaparina 1mg/kg 12/12h) ou fondaparinux',
      'Se etiologia mecânica (dissecção, espontânea): manejo conservador ou cirúrgico conforme gravidade',
      'Se pericardite: AINE (ibuprofeno 400mg 6/6h) + colchicina se recorrência'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'SCA: internação em unidade coronariana com monitorização',
      'Dor pleurítica benigna com ECG normal: observação 4–6h, alta se troponina negativa x2 (0 e 3h)',
      'Pneumotórax: drenagem ou conservador conforme tamanho/sintomas',
      'Pericardite: internação se efusão/tamponamento; alta se pain control e sem complicações'
    ]}
  ]
};

// ============================================================================
// 5. SCA (Síndrome coronária aguda)
// ============================================================================
CT.sca = {
  l: 'Síndrome coronária aguda',
  subExcl: ['sca_oca'],
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso duplo (18G)',
      'Monitorização ECG 12-D contínua: repetir a cada 30 min se dor persistente',
      'SpO₂ ≥92%, oxigenação suplementar se necessário',
      'PA sistólica mantida >90 mmHg'
    ]},
    {id:'inv', t:'Investigação', it:[
      'ECG serial (0, 30 min, 3h): desnivelamento ST, inversão T',
      'Troponina I/T ultrassensível (0h, 3h, resenção conforme protocolo)',
      'Hemograma, coagulograma, função renal, eletrólitos',
      'Cineangiocoronariografia: padrão ouro diagnóstico + intervenção'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia potente: dipirona 1g IV + paracetamol 1g IV, ou petidina 25–50mg IM/IV se dor intensa',
      'Nitroglicerina SL 0,5mg (repetir q5 min × 3 doses se dor persiste e PA >90/60)',
      'Ansiolítico: midazolam 1–2mg IV (facilita cooperação)'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Dual antiplatelet (DAP): AAS 300–500mg IV + P2Y12 inibidor (clopidogrel 600mg VO ou prasugrel 60mg VO)',
      'Anticoagulação: enoxaparina 0,5–1 mg/kg IV ou fondaparinux 2,5mg IV 1x/dia',
      'Beta-bloqueador (se FC >70 e PA estável): metoprolol 25–50mg VO/IV 12/12h',
      'Reperfusão urgente (ativação de cateterismo <120 min):',
      '  • STEMI anterior: angioplastia primária + stent',
      '  • STEMI inferolateral: idem',
      '  • NSTEMI: cateterismo eletivo em 24h (ou urgente se alto risco)',
      'IBP profilático: omeprazol 40mg IV 12/12h'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'STEMI com reperfusão sucesso: internação unidade coronariana 48–72h, transfer para reabilitação',
      'NSTEMI: internação com monitorização; alta em 48–72h se low risk e troponina negativa',
      'Complicações (cardiogênico, arritmia grave): UTI'
    ]}
  ]
};

// ============================================================================
// 6. SCA_OCA (Síndrome coronária aguda — outros critérios)
// ============================================================================
CT.sca_oca = {
  l: 'SCA — outros critérios',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Monitorização contínua ECG, FC, PA, SpO₂ (idem SCA clássica)',
      'Repouso reativo em poltrona/leito'
    ]},
    {id:'inv', t:'Investigação', it:[
      'ECG: pode ser normal ou com achados inespecíficos (subdesnivelamento ST <1mm)',
      'Troponina ultrassensível (0h, 3h): teste cedo-diagnóstico',
      'Biomarcadores: BNP/NT-proBNP (insuficiência diastólica), D-dímero (risco tromboembólico)',
      'Cateterismo: angiografia se troponina elevada ou teste não-invasivo sugestivo'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h (cautela: pode mascarar progressão)',
      'Nitroglicerina SL se hipertensão associada (PA >140/90)',
      'Ansiolítico conforme estado psicológico'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'DAP: AAS 300mg + clopidogrel 600mg VO (mesmo protocolo SCA clássica)',
      'Anticoagulação enoxaparina conforme peso',
      'Cateterismo emergente se troponina elevada (confirmando SCA verdadeira)',
      'Considerar terapia conservadora se troponina serial negativa e ECG persistentemente normal'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação 6–12h com troponina serial negativa → alta em APS se SCA descartada',
      'Internação se troponina positiva (manejo como NSTEMI)',
      'Avaliação cardiológica ambulatorial em 5–7 dias se teste não-invasivo necessário'
    ]}
  ]
};

// ============================================================================
// 7. TEP (Tromboembolismo pulmonar)
// ============================================================================
CT.tep = {
  l: 'Tromboembolismo pulmonar',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso duplo (18G periférica, cateter central se instabilidade)',
      'Monitorização contínua: FC, PA, SpO₂ (alvo ≥92%), ECG (procurar S1Q3T3, embora inespecífico)',
      'Posicionamento: supino ou semi-recumbente, membros inferiores elevados se possível',
      'Oxigenoterapia: máscara 100% O₂ se hipoxemia (<92% em ar ambiente)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'D-dímero: alta sensibilidade (~98%), baixa especificidade; negativa praticamente exclui TEP',
      'Angiotomografia pulmonar (ATCO): padrão ouro para diagnóstico; embolia em artérias segmentares/subsegmentares',
      'ECG: S1Q3T3 inespecífico; mais comum: taquicardia sinusal, bloqueio incompleto RDAB',
      'Troponina, BNP: prognóstico (BNP elevado = risco maior de morte)',
      'Gasometria: hipoxemia, hipocapnia em TEP massiva',
      'Ecocardio: dilatação VD se TEP grande'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: dipirona 1g IV 6/6h; evitar AINE (sangramento?)',
      'Ansiolítico se agitação/dispneia: midazolam 1–2mg IV'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Anticoagulação imediata (não esperar confirmação diagnóstica se alta probabilidade clínica):',
      '  • HBPM: enoxaparina 1mg/kg IV ou 1,5mg/kg SC 12/12h',
      '  • Fondaparinux 5–10mg IV 1x/dia (atenção: contraindicado se peso <50kg)',
      '  • Heparina não-fracionada (0,8 U/kg bolus, seguida 18 U/kg/h infusão)',
      'Trombolítico se TEP massiva com instabilidade hemodinámica:',
      '  • Alteplase 10mg IV bolus + 90mg infusão em 2h (total 100mg)',
      '  • Ou estreptoquinase 1,5 MU IV em 1h (menos específico)',
      'Trombectomia percutânea/cirúrgica se trombolítico contraindicado + choque',
      'Compressão sequencial de MMII se varizes/trombose de perna'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'TEP com choque: UTI, monitorização contínua, possível ecocardiografia seriada',
      'TEP sem choque: internação em enfermaria com anticoagulação, alta em 3–5 dias se estável',
      'Profilaxia secundária: warfarina (INR 2–3) ou DOAC por ≥3 meses (extendido se idiopático)',
      'Transfer para centro com cirurgia se candidato a trombectomia'
    ]}
  ]
};

// ============================================================================
// 8. EAP (Edema agudo pulmonar)
// ============================================================================
CT.eap = {
  l: 'Edema agudo pulmonar',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Posicionamento: semi-recumbente a recumbente (facilitador de diurese e repouso cardíaco)',
      'Oxigenoterapia: máscara 100% O₂; CPAP 5–8 cmH₂O se PaO₂ <60 mmHg',
      'Monitorização contínua: FC, PA (cada 5 min), SpO₂, diurese',
      'Acesso venoso: periférico 18G (preparado para possível inotrópico)',
      'VNI (BiPAP/CPAP) preferencial a intubação se possível'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Raio-X de tórax: infiltrados bilaterais, distribuição central (típica EAP cardiogênico)',
      'ECG: ritmo, isquemia, hipertrofia, BRE',
      'Troponina, BNP/NT-proBNP: estratificação de risco',
      'Hemograma, coagulograma, função renal (creatinina baseline)',
      'Eletrólitos: K, Na, Mg (ajuste de medicações)',
      'Ecocardio: FE, dilatação de câmaras, valvopatia (avaliar antes de alta)'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia leve: dipirona 500mg IV 6/6h (evitar doses altas — hipotensão)',
      'Ansiolítico: midazolam 1–2mg IV se agitação/taquipneia (facilita VNI)',
      'Antiemético: ondansetrão 4mg IV se náuseas'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Diurético IV: furosemida 40–80mg IV bolus (repetir 20–40mg q1–2h conforme diurese)',
      '  • Alvo: diurese 200–300 mL/h',
      '  • Monitorizar K⁺ (risco hipocaliemia)',
      'Nitroglicerina IV contínua (se PA sistólica >100 mmHg):',
      '  • Bolo 12,5–25 μg/min, titragem a cada 5 min até alívio de falta ar',
      '  • Max 400 μg/min; taquifilaxia possível em >24h',
      'Beta-bloqueador: metoprolol 25mg IV 6/6h (se FC >90, PA estável)',
      'Antagonista de aldosterona: espironolactona 25mg VO 1x/dia (se hipokalemia)',
      'Inotrópico se choque cardiogênico coexistente (dobutamina 2–20 μg/kg/min)',
      'Controle de pressão arterial: mantê-la 100–140 mmHg sistólica'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação mínimo 6–8h com monitorização; possibilidade transfer para UTI se piora/intubação',
      'Internação em enfermaria cardíaca se melhora com terapia farmacológica',
      'Alta após 48–72h se euvolêmico, FE estável, tolerando VO',
      'Ecocardio antes de alta para estratificar risco readmissão',
      'Encaminhamento cardião para ajuste crônico de medicações (IECA, BB, diurético)'
    ]}
  ]
};

// ============================================================================
// 9. ASMA (Asma agudo)
// ============================================================================
CT.asma = {
  l: 'Asma agudo',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Posicionamento: semi-recumbente (facilita expansão diafragmática)',
      'Oxigenoterapia: alvo SpO₂ ≥90% (não restringir em asma)',
      'Monitorização: SpO₂, FC, FR (contar), ausculta pulmonar seriada',
      'Acesso venoso periférico (18G)',
      'Umidificação: nebulizador com aerossol (aumenta umidade inspirada)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Espirometria/pico fluxo: não recomendado em crise aguda grave (risco broncoespasmo)',
      'Gasometria arterial: se grave ou após tratamento inicial (avaliar pCO₂)',
      'Raio-X de tórax: hiperinsuflação, excluir pneumotórax/pneumomediastino',
      'Hemograma, eletrólitos básicos',
      'Considerar cultura de escarro se suspeita infeccioso'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: paracetamol 500mg–1g VO 6/6h (evitar AINEs, podem triggerizar crise)',
      'Ansiolítico cuidadoso: midazolam apenas se agitação severa (depressão respiratória?)'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Beta-2 agonista inalatório (LABA): salbutamol/albuterol 2–5 mg em nebulizador contínuo',
      '  • Ou 1–2 jatos MDI a cada 5 min × 3–4 doses em 1h',
      'Corticosteroide sistêmico: prednisolona 40–50 mg VO ou metilprednisolona 125 mg IV imediato',
      '  • Taper em 5–7 dias conforme melhora clínica',
      'Brometo de ipratrópio: 250–500 μg inalado 6/6h (bloqueador M3 colinérgico)',
      'Sulfato de magnésio: 1–2 g IV em 20–30 min (suplemento em refratariedade)',
      'Cetamina baixa dose (0,1–0,2 mg/kg IV) se intubação necessária (preserva vias aéreas)',
      'Antibiótico: amoxicilina-clavulanato ou fluoroquinolona se suspeita infeccioso (ex: infecção viral + bacterial overinfection)'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação 4–6h com beta-2 agonista + corticosteroide; alta se pico fluxo ≥80% previsto',
      'Internação se refratariedade após 1–2h tratamento agressivo',
      'Intubação (ventilação mecânica): apenas em falha respiratória iminente',
      'Encaminhamento pneumologia para otimizar controle crônico após alta'
    ]}
  ]
};

// ============================================================================
// 10. DPOC_AG (DPOC agudizado)
// ============================================================================
CT.dpoc_ag = {
  l: 'DPOC agudizado',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Oxigenoterapia cautelosa: alvo SpO₂ 88–92% (risco retenção CO₂)',
      '  • Começar com cânula nasal 2 L/min; titular conforme SpO₂',
      'Posicionamento: semi-recumbente (posição com peso corporal em tórax anterior)',
      'Monitorização: SpO₂, FR, FC, ausculta seriada',
      'Acesso venoso periférico (18G)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Gasometria arterial (se SpO₂ <90% ou em repouso): pCO₂, pH, HCO₃ (avaliar retenção)',
      'Raio-X de tórax: pneumonia?, derrame?, outras complicações?',
      'Hemograma, eletrólitos, função renal',
      'BNP se dilatação cardíaca suspeita',
      'Cultura de escarro se mudança de coloração/volume'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia leve: paracetamol 500mg–1g VO 6/6h (cautela com hipoxemia)',
      'Tosse: considerar mucolítico (bromexina 8mg VO 3x/dia) se escarro espesso'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Beta-2 agonista: salbutamol 2–5 mg nebulizado 6/6h',
      'Brometo de ipratrópio: 250–500 μg 6/6h (efeito sinérgico com beta-2)',
      'Corticosteroide sistêmico: prednisolona 30–40 mg VO 1x/dia × 5–7 dias',
      '  • Ou metilprednisolona 125 mg IV se não tolerar VO',
      'Antibiótico empírico (se suspeita infeccioso):',
      '  • Amoxicilina-clavulanato 875/125 mg VO 12/12h × 7 dias',
      '  • Ou fluoroquinolona (levofloxacina 750 mg VO 1x/dia) se alergia ou resistência',
      'Oxigenoterapia: manter SpO₂ 88–92% (não objetivar >94%)',
      'Fluidoterapia: manter hidratação adequada (descongestionante); cuidado com sobrecarga se cor pulmonale'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação 4–6h com melhora clínica → alta se tolerando VO, SpO₂ 88–92%',
      'Internação se piora progressiva (FR >30, SpO₂ não melhorando, acidose progressiva)',
      'Transfer para UTI se falha respiratória iminente (intubação), insuficiência cardíaca descompensada',
      'Encaminhamento pulmonologia para otimizar terapia domiciliar (LABA/LAMA, reabilitação pulmonar)'
    ]}
  ]
};

// ============================================================================
// 11. CEF_HSA (Cefaleia — hemorragia subaracnoide)
// ============================================================================
CT.cef_hsa = {
  l: 'Cefaleia — hemorragia subaracnoide',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso duplo (18–16G)',
      'Posicionamento: cabeceira elevada 30°, cabeça neutra (evitar hipoxemia/hipercapnia)',
      'Monitorização contínua: FC, PA, SpO₂, temperatura, nível de consciência (escala Glasgow)',
      'Oxigenoterapia: alvo SpO₂ ≥95%',
      'Repouso absoluto em ambiente escuro e silencioso'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Tomografia de crânio sem contraste: hemoaracnoide, localização sangue, hidrocefalia?',
      '  • Se TC negativa mas suspeita alta: PL (fluid xantocrômico = sangue)',
      'Angiografia por TC (CT-A) ou ressonância: aneurisma, malformação vascular',
      'Angiografia digital: referência ouro se aneurisma confirmado',
      'PL (se CT negativa): xantocromia em tubo 4, RBC >100k (confirmação)',
      'Hemograma, coagulograma, função renal, eletrólitos',
      'ECG: alterações por simpatotomia (onda U, QT prolongado)'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia potente: dipirona 1g IV 6/6h + paracetamol 1g VO 6/6h',
      'Ou petidina 25–50mg IM/IV se dor refratária',
      'Antieméticos: ondansetrão 4mg IV 8/8h (náusea comum)',
      'Sedação moderada: midazolam 1–2mg IV conforme agitação/ansiedade'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Manejo de pressão intracraniana:',
      '  • Elevar cabeceira 30–45°',
      '  • Manter pCO₂ 35–40 mmHg (não hiperventilar excessivamente)',
      '  • Manitol 0,25–1 g/kg IV se edema cerebral (max 4 doses/dia)',
      'Nimodipina oral 60 mg 4x/dia × 21 dias (neuroprotection contra vasoespasmo)',
      'Controle de pressão: antihipertensivo se PA >140/90 (mantém perfusão cerebral, evita re-sangramento)',
      '  • Labetalol 20mg IV inicial, repetir q10 min até alvo',
      'Anticonvulsão profiláctica: fenitoína 15–20 mg/kg IV em 30 min (ou valproato)',
      'Tratamento definitivo: clipagem cirúrgica ou coiling endovascular (timing depende gravidade/instituição)',
      'Repouso completo: evitar fatores que aumentem PIC (valsalva, tosse, esforço)'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Internação obrigatória em unidade neurocrítica (UTI, CCO)',
      'Transfer urgente para neurocirurgia se aneurisma confirmado',
      'Acompanhamento com TC seriadas (risco re-sangramento 24h–14 dias)',
      'Monitorização de complicações: vasoespasmo cerebral (dias 4–14), hidrocefalia, convulsões',
      'Reabilitação neurológica conforme sequelas pós-alta'
    ]}
  ]
};

// ============================================================================
// 12. PERI (Pericardite)
// ============================================================================
CT.peri = {
  l: 'Pericardite',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso periférico (18G)',
      'Monitorização contínua: ECG (série), FC, PA, SpO₂',
      'Posicionamento: supino ou semi-recumbente conforme conforto',
      'Oxigenoterapia: alvo SpO₂ ≥92% (se derrame/tamponamento → suplementar)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'ECG: PR depressed, ST elevado difuso (concordante), sem reciprocal changes (diferencia de IEM)',
      'Troponina: pode estar elevada (pericardite com miocardite)',
      'Ecocardio: efusão pericárdica? Tamponamento? Tamanho VD/VE?',
      'Radiografia de tórax: cardiomegalia (silhueta globosa), derrame?',
      'Marcadores inflamação: PCR, VHS elevados',
      'Hemograma, eletrólitos, função renal',
      'Culturas (sangue, escarro) se suspeita infeccioso'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: ibuprofeno 400–600 mg VO 8/8h (anti-inflamatório)',
      'Ou naproxeno 500 mg VO 12/12h se contra-indicação ibuprofeno',
      'Paracetamol 1g IV 6/6h complementar se dor refratária',
      'Ansiolítico: midazolam 1–2 mg IV se agitação/taquicardia'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'AINE: ibuprofeno 400–600 mg VO 6/6h × 7–14 dias (dose alvo anti-inflamação)',
      'Colchicina (se recorrência): 0,5–1 mg VO 2x/dia × 3 meses (reduz recidivas)',
      'Corticosteroide (apenas se AINE falha/contraindicação): prednisolona 0,25–0,5 mg/kg VO 1x/dia, taper lento em 4–6 semanas',
      'Protetor gástrico: omeprazol 20 mg VO 1x/dia enquanto em AINE',
      'Pericardiocentese: se derrame com tamponamento (pressão venosa central elevada, hipotensão)',
      'Pericardiotomia/janelamento: drenagem cirúrgica se recorrência/tamponamento frequente'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação 6–12h com monitorização; alta se troponina negativa, ECG estável, sem derrame significativo',
      'Internação se derrame progressivo, tamponamento, ou troponina elevada (suspeita miocardite coexistente)',
      'Seguimento cardião em 1–2 semanas para ajuste AINE, monitorizar recidiva',
      'Ecocardio controle em 1–2 meses se derrame inicial presente'
    ]}
  ]
};

// ============================================================================
// 13. NEU (Acidente vascular cerebral / Stroke)
// ============================================================================
CT.neu = {
  l: 'Acidente vascular cerebral',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Acesso venoso duplo (18–16G)',
      'Monitorização contínua: ECG, FC, PA (cada 5 min), SpO₂, glicemia (bedside)',
      'Posicionamento: supino ou semi-recumbente (evitar elevação cabeça >30° nas primeiras 24h)',
      'Oxigenoterapia: alvo SpO₂ ≥94% (risco hipoxemia em AVC)',
      'Prevenção de aspiração: NPO até avaliação fonoaudiologia'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Tomografia de crânio sem contraste (urgente): isquemia? Hemorragia? Volume infarto?',
      'RM encefálica/SWI: melhor definição lesão, diferenciar infarto agudo de crônico',
      'ECG: fibrilação atrial? Isquemia miocárdica?',
      'Troponina: descartar IEM concomitante',
      'Hemograma, coagulograma (TP/INR, TTPa), função renal, eletrólitos, glicemia',
      'Gasometria: avaliar oxigenação/ventilação',
      'Ecodopplercarrotídeo ou angio-CT: grau estenose carotídea'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia leve: paracetamol 500mg–1g VO 6/6h (evitar AINE)',
      'Controle de pressão: se PA >220/120, reduzir gradualmente 10–20% em 1h',
      '  • Usar labetalol ou nifedipino de liberação rápida',
      'Antiemético se náusea: ondansetrão 4mg IV'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Se isquemia aguda (<4.5h de início):',
      '  • tPA: alteplase 0,9 mg/kg IV (max 90 mg) — bolus 10% em 1 min, resto em 60 min',
      '  • Ou trombectomia mecânica (até 24h em selecionados)',
      'Se isquemia crônica (>4.5h):',
      '  • Aspirina 300–500 mg VO (loading dose), depois 100 mg/dia',
      '  • Se risco cardioembólico: adicionar clopidogrel 600 mg VO',
      'Se hemorragia intracerebral:',
      '  • Reverter anticoagulação se necessário (vitamin K, FFP)',
      '  • Controle PA (mantém PIC, evita expansão hematoma)',
      '  • Considerar drenagem cirúrgica se volume >30 mL ou efeito de massa'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação em CTI/unidade neuro-crítica com reavaliação seriada de déficit neurológico',
      'Internação neurocirurgia se hemorragia com edema/efeito de massa',
      'Transfer para hospital com trombolítico/trombectomia mecânica se elegível e não disponível localmente',
      'Reabilitação neuromuscular/fonoaudiologia assim que estável',
      'Pesquisa de etiologia: TEE se risco cardioembólico, arteriografia se dissecção vascular suspeita'
    ]}
  ]
};

// ============================================================================
// 14. RNC (Rebaixamento de nível de consciência)
// ============================================================================
CT.rnc = {
  l: 'Rebaixamento de nível de consciência',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Airway protection: posição lateral de recuperação, disponibilizar tubo oro-traqueal à cabeceira',
      'Acesso venoso duplo (18–16G periférica ou central se difícil)',
      'Monitorização contínua: neurológica (pupilas, Glasgow, reflexos) q15 min, FC, PA, SpO₂, temperatura',
      'Oxigenoterapia: alvo SpO₂ ≥95% (cérebro demanda elevada)',
      'Glicemia capilar imediata (hipoglicemia causa rebaixamento reversível)',
      'Prevenção de aspiração: NPO até avaliação completa'
    ]},
    {id:'inv', t:'Investigação', it:[
      'Tomografia de crânio sem contraste (URGENTE): trauma, hemorragia, edema?',
      'Glicemia capilar: <50 mg/dL? Hipoglicemia?',
      'Hemograma, coagulograma, função renal, eletrólitos, gasometria arterial',
      'Troponina, BNP: descartar IEM/edema pulmonar',
      'Teste de drogas (urina): cocaína? Opioides? Benzodiazepinas?',
      'PL (se meningite suspeita após descartar massa/edema em TC)',
      'Ecocardio: êmbolo cardíaco? Arritmia com baixo débito?'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia cautelosa: paracetamol VO (se consciente) ou paracetamol 1g IV (evitar depressão respiratória)',
      'Sedação mínima: só se agitação extrema, sob monitorização'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Se hipoglicemia (<50 mg/dL): dextrose 25–50 mL IV 50% bolus',
      'Se opioides suspeitos: naloxona 0,4–0,8 mg IV (cuidado: pode precipitar abstinência)',
      'Se benzodiazepina excessiva: flumazenil 0,2 mg IV em 15–30 seg (max 3 mg em 1h)',
      'Se infecção meníngea: antibióticos empíricos (ceftriaxona 2g IV 12/12h + vancomicina 15–20 mg/kg 8/12h)',
      'Se AVC: manejo conforme tipo isquêmico vs hemorragia (vide entrada "neu")',
      'Se choque: fluidoterapia + vasopressor conforme etiologia',
      'Se trauma craniencefálico: neurocirurgia se hematoma epidural/subdural/contusão progressiva'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação contínua em UTI com reavaliação neurológica q15–30 min',
      'Transfer para neurocirurgia se lesão estrutural cirurgicamente tratável',
      'Investigação de causa (etiologia traumática, infeccioso, vascular, tóxica-metabólica)',
      'Reabilitação assim que estável; possibilidade de sequelas neurológicas permanentes'
    ]}
  ]
};

// ============================================================================
// 15. SINC (Síncope)
// ============================================================================
CT.sinc = {
  l: 'Síncope',
  s: [
    {id:'sup', t:'Suporte e monitorização', it:[
      'Posicionamento: supino com membros inferiores elevados 45° (decúbito lateral em caso vômitos)',
      'Monitorização contínua: ECG (série), FC, PA (cada 5 min), SpO₂',
      'Acesso venoso periférico (18G)',
      'Oxigenoterapia: alvo SpO₂ ≥92%',
      'Observação cardiorrespiratória rigorosa (risco de convulsão anóxica)'
    ]},
    {id:'inv', t:'Investigação', it:[
      'ECG: prolongação QT? Síndrome de Brugada? Wolf-Parkinson-White? Bloqueios? (suspeita arritmia)',
      'Troponina: descartar IEM (síncope pode ser apresentação de IEM)',
      'Hemograma, eletrólitos (K, Mg, Ca), glicemia',
      'Monitorização contínua/Holter se sintomas recorrentes (procurar arritmia)',
      'Ecocardio: miocardiopatia? Estenose aórtica? Tamponamento?',
      'Teste de inclinação (tilt test): se síncope vasovagal suspeita'
    ]},
    {id:'sin', t:'Tratamento sintomático', it:[
      'Analgesia: paracetamol 500mg–1g VO 6/6h se dor por queda',
      'Tratamento de lesões secundárias conforme avaliação traumatológica'
    ]},
    {id:'esp', t:'Tratamento específico', it:[
      'Manejo específico conforme etiologia:',
      '  • Vasovagal: educação (evitar gatilhos), aumento ingestão fluido/sal, postura supina ao presságio',
      '  • Posicional/ortoestática: educação, aumento volume intravascular, meias compressivas',
      '  • Arritmia (taquicardia paroxística): beta-bloqueador ou antiarrítmico conforme tipo',
      '  • Estenose aórtica severa: referência para cirurgia (prognóstico ruim sem correção)',
      '  • IEM: manejo como SCA (vide entrada "sca")',
      'Restrições: não dirigir até diagnóstico estabelecido e controle da causa'
    ]},
    {id:'dsp', t:'Disposição', it:[
      'Observação 4–6h com monitorização ECG contínua; alta se primeira síncope vasovagal provável e ECG normal',
      'Internação se ECG anormal, troponina elevada, síncope recorrente em <24h, ou etiologia cardíaca suspeita',
      'Transfer para cardiologia eletiva em 1–2 semanas para teste de inclinação/Holter se recorrência',
      'Acompanhamento neurólogo se suspeita convulsão anóxica durante síncope'
    ]}
  ]
};

// ============================================================================
// FIM DAS 15 ENTRADAS
// ============================================================================

/**
 * PRÓXIMOS PASSOS:
 * 1. Copiar cada CT.xxx acima
 * 2. Colar em index.html (linhas 1627–2435, substituindo entradas antigas)
 * 3. Verificar browser: cada entrada deve renderizar 5 seções (sup/inv/sin/esp/dsp)
 * 4. Testar clique em checkbox para confirmar estado-chave em S.chk
 * 5. Validar relatório: cada seção deve aparecer quando checkbox marcado
 *
 * VALIDAÇÃO ESPERADA:
 * - Nenhuma entrada orfã (todas têm 5 seções)
 * - Nenhuma seção vazia (it: [...] com mínimo 1 item)
 * - IDs únicos (sup, inv, sin, esp, dsp)
 * - Sintaxe JavaScript correta (sem trailing commas, parênteses balanceados)
 */
