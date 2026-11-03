// ─── Protocolos Sindrômicos: SISTEMICO ───
const CT_SISTEMICO = {
  "cho": {
    "l": "Choque indiferenciado",
    "subExcl": [
      {
        "id": "cho_sep",
        "l": "Choque séptico / vasoplégico"
      },
      {
        "id": "cho_hip",
        "l": "Choque hipovolêmico / hemorrágico"
      },
      {
        "id": "cho_car",
        "l": "Choque cardiogênico"
      },
      {
        "id": "cho_obs",
        "l": "Choque obstrutivo"
      }
    ],
    "subAdd": [
      {
        "id": "tep",
        "l": "TEP maciço associado"
      },
      {
        "id": "pntx",
        "l": "Pneumotórax hipertensivo"
      },
      {
        "id": "peri",
        "l": "Tamponamento cardíaco"
      },
      {
        "id": "hdg",
        "l": "Hemorragia digestiva ativa"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "MOMENTO ZERO: Suporte vital & Exame físico focado de perfusão",
        "it": [
          "Monitorização multiparamétrica contínua: ECG, oximetria de pulso contínua, PANI a cada 3–5 min",
          "Acesso vascular imediato: 2 acessos venosos periféricos calibrosos 16–18G (< 2 min); se insucesso, punção intraóssea (IO) imediata em tíbia ou úmero proximal",
          "Exame físico focado da macro e microcirculação: Tempo de Enchimento Capilar (TEC — meta ≤ 3 segundos) + gradiente térmico e perfusão cutânea (mottling score / livedo reticular)",
          "Avaliação seriada do nível de consciência (Escala de Coma de Glasgow / agitação / sonolência patológica), frequência respiratória e sinais de esforço ventilatório",
          "Cateter vesical de demora (Foley) para monitorização horária estrita de débito urinário (meta ≥ 0,5 mL/kg/h)",
          "Oxigenoterapia com alvo SpO₂ 92–96% (evitar hiperóxia iatrogênica; titular VNI ou IOT com hemodinâmica protegida se exaustão respiratória)"
        ]
      },
      {
        "id": "inv",
        "t": "MOMENTO ZERO: POCUS protocolar & Investigação laboratorial de entrada",
        "it": [
          "POCUS protocolar à beira-leito — Débito e causas obstrutivas óbvias: contratilidade de VE, sinais de TEP maciço (Sinal de McConnell / dilatação aguda de VD), tamponamento cardíaco (derrame pericárdico com colapso de câmaras direitas) e pneumotórax hipertensivo (ausência de lung sliding)",
          "POCUS protocolar — Avaliação inferencial de PVC e congestão venosa sistêmica: aferição do diâmetro e colapsabilidade da VCI + Doppler venoso de veias jugulares e femorais (pesquisa de padrão pulsátil congestivo retrógrado estilo VExUS)",
          "Coleta imediata de gasometria com dosagem de lactato sérico na admissão e controle seriado em 2–4 horas (tendência de queda indica melhora da perfusão; não constitui meta isolada para volume ou vasopressor)",
          "Laboratório de triagem imediata: hemograma completo, plaquetas, função renal (ureia, creatinina), eletrólitos, coagulograma (TP/INR, TTPa) e troponina"
        ]
      },
      {
        "id": "esp",
        "t": "MOMENTO ZERO: Protocolo de falha diagnóstica inicial (Choque críptico sem causa óbvia)",
        "it": [
          "Coleta imediata de 2 pares de hemoculturas de sítios venosos distintos (antes de iniciar o antibiótico, sem atrasar infusão)",
          "Antibioticoterapia empírica de amplo espectro na 1ª hora — Opção A: Piperacilina-Tazobactam 4,5 g IV 6/6h (cobertura ampla nosocomial e Pseudomonas)",
          "Antibioticoterapia empírica de amplo espectro na 1ª hora — Opção B: Ceftriaxona 2 g IV 12/12h ou 24/24h + Vancomicina 15–20 mg/kg IV 12/12h (cobertura combinada para comunitário grave e MRSA)",
          "ECG de 12 derivações com derivações direitas/posteriores na busca ativa de Síndrome Coronariana Aguda oculta ou equivalente isquêmico",
          "Vasopressor inicial precoce: Norepinefrina 0,05–0,5 mcg/kg/min em BIC para restaurar PAM alvo ≥ 65 mmHg e recrutar volume estressado"
        ]
      },
      {
        "id": "sin",
        "t": "MOMENTO ZERO: Medidas de conforto e controle térmico",
        "it": [
          "Controle térmico ativo/passivo: aquecimento se temperatura central < 36°C (hipotermia piora coagulopatia e disfunção ventricular)",
          "Analgesia parcimoniosa com Dipirona 1 g IV se dor (evitar AINEs e doses altas de sedativos/opioides que deprimem o tônus simpático compensatório)"
        ]
      },
      {
        "id": "dsp",
        "t": "MOMENTO ZERO: Disposição e alocação",
        "it": [
          "Internação prioritária imediata em leito de Unidade de Terapia Intensiva (UTI) com vaga zero / prioridade 1",
          "Instalação precoce de Linha Arterial (PAI) para monitorização invasiva contínua de PAM e coleta seriada de gasometria"
        ]
      }
    ]
  },
  "cho_sep": {
    "l": "Choque séptico / vasoplégico",
    "s": [
      {
        "id": "sup",
        "t": "Suporte e metas de ressuscitação (Surviving Sepsis / ESICM)",
        "it": [
          "Abertura de protocolo sepse, coleta de laboratoriais e 2 pares de hemocultura",
          "Se choque séptico, início de ATB < 1h da admissão, se sepse suspeita, início em até 3h, após descartar diferenciais",
          "Se hipotensão, expansão volêmica possível com até 30ml/kg de cristaloide balanceado",
          "Caso PAD < 40 ou refratariedade a bolus de cristaloide, início precoce de vasopressor em acesso periférico"
        ]
      },
      {
        "id": "esp",
        "t": "Controle de foco e antibioticoterapia imediata (< 1 hora)",
        "it": [
          "Antibioticoterapia empírica imediata (< 1 hora): Ceftriaxona 2 g IV 12/12h OU Piperacilina-Tazobactam 4,5 g IV 6/6h (se foco nosocomial/abdominal)",
          "Adicionar Vancomicina 15–20 mg/kg IV (dose de ataque de 25–30 mg/kg se choque grave) se suspeita de MRSA ou dispositivo invasivo prévio",
          "Adicionar Metronidazol 500 mg IV 8/8h se foco abdominal ou anaeróbio não coberto por Piperacilina-Tazobactam",
          "Controle cirúrgico ou percutâneo de foco infeccioso em < 6–12h (drenagem de abscesso, desbridamento de infecção necrosante, desobstrução de via urinária ou biliar)",
          "Remoção imediata de acessos vasculares ou cateteres infectados com suspeita de serem o foco primário",
          "Vasopressina 0,03–0,04 U/min fixo se dose de Norepinefrina > 0,25 mcg/kg/min",
          "Hidrocortisona 200 mg/dia IV (50 mg IV 6/6h ou infusão contínua) em choque refratário a vasopressores em doses crescentes",
          "Dobutamina 2,5–20 mcg/kg/min IV se cardiomiopatia induzida por sepse com hipocinesia miocárdica e baixa saturação venosa central (ScvO₂ < 70%)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação etiológica e exames complementares",
        "it": [
          "Painel Laboratorial da Sepse: Hemograma completo com plaquetas, Coagulograma (TP/INR, TTPa), Ureia, Creatinina, Eletrólitos, Glicemia e Gasometria com dosagem de lactato",
          "Coleta de 2 pares de hemoculturas pareadas de sítios periféricos distintos antes do início do antimicrobiano",
          "Coleta de culturas de sítios suspeitos: urocultura com antibiograma, cultura de secreção traqueal/escarro, cultura de líquor ou feridas",
          "Radiografia de tórax no leito e/ou TC contrastada direcionada ao foco suspeito (abdome, pelve, tórax, SNC)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Reavaliação contínua da descalonamento de vasopressores conforme normalização do TEC e clearance de lactato"
        ]
      }
    ]
  },
  "cho_hip": {
    "l": "Choque hipovolêmico / hemorrágico",
    "s": [
      {
        "id": "sup",
        "t": "Estabilização e controle volêmico",
        "it": [
          "Posicionamento supino com elevação de membros inferiores a 30° se tolerado",
          "Hipotensão permissiva (alvo PAM 50–60 mmHg / PAS 80–90 mmHg) no sangramento ativo não controlado, EXCETO em traumatismo cranioencefálico (meta PAS ≥ 100–110 mmHg)",
          "Aquecimento ativo com mantas térmicas e infusão de fluidos aquecidos a 38–40°C para prevenir a tríade letal (hipotermia, acidose e coagulopatia)"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia hemostática e transfusional específica",
        "it": [
          "Ativação do Protocolo de Transfusão Maciça (PTM): relação balanceada 1:1:1 de Concentrado de Hemácias : Plasma Fresco Congelado : Plaquetas",
          "Ácido Tranexâmico (TXA): 1 g IV em 10 min seguido de 1 g IV em infusão contínua por 8h (iniciar em até 3h do início do sangramento/trauma)",
          "Reposição de Cálcio: Gluconato de Cálcio 10% (10–20 mL IV) ou Cloreto de Cálcio 10% (5–10 mL IV) a cada 4 bolsas de hemocomponentes (manter Ca ionizado > 1,1 mmol/L)",
          "Concentrado de Complexo Protrombínico (4F-PCC) se uso prévio de varfarina ou NOACs com sangramento com risco à vida",
          "Choque hipovolêmico não hemorrágico (desidratação/perdas GI): expansão rápida com Ringer Lactato 1000–2000 mL IV com reavaliação de responsividade",
          "Norepinefrina 0,05–0,5 mcg/kg/min se hipotensão extrema como ponte temporária enquanto os hemoderivados são preparados"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e controle hemostático",
        "it": [
          "Tipagem sanguínea ABO/Rh, teste de compatibilidade cruzada e reserva de sangue de emergência (sangue O negativo imediato se choque exsanguinante)",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Lactato sérico seriado",
          "POCUS FAST / eFAST imediato para pesquisa de líquido livre em abdome, pelve e hemitórax",
          "Endoscopia digestiva alta urgente se suspeita de hemorragia digestiva alta ou angiotomografia se hemorragia baixa/traumática"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Acionamento urgente da Cirurgia Geral / Vascular / Hemodinâmica para controle hemostático definitivo da fonte de sangramento",
          "Internação em UTI cirúrgica / trauma"
        ]
      }
    ]
  },
  "cho_car": {
    "l": "Choque cardiogênico",
    "s": [
      {
        "id": "sup",
        "t": "Suporte ventilatório e proteção miocárdica",
        "it": [
          "Posicionamento com cabeceira elevada a 30–45° (reduz congestão pulmonar e pré-carga de VE)",
          "VNI precoce (CPAP 5–10 cmH₂O ou BiPAP com PEEP 5–8) se edema agudo de pulmão com esforço respiratório, mantendo PAS > 90 mmHg",
          "IOT com sequência rápida adaptada à hemodinâmica (reduzir dose do sedativo em 50% — Cetamina ou Etomidato + Fentanil) se exaustão respiratória ou rebaixamento",
          "NÃO realizar expansão volêmica rotineira"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia inotrópica, vasopressora e de reperfusão (SCAI / ESICM)",
        "it": [
          "Norepinefrina 0,05–0,4 mcg/kg/min IV em BIC: vasopressor de escolha para restaurar PAM alvo de 65–70 mmHg sem taquicardia excessiva",
          "Dobutamina 2,5–20 mcg/kg/min IV em BIC: inotrópico de 1ª escolha para aumentar o débito cardíaco e reduzir pressões de enchimento",
          "Milrinona 0,25–0,75 mcg/kg/min IV em BIC (sem bólus): alternativa se choque cardiogênico com hipertensão pulmonar ou uso prévio crônico de betabloqueador (atenção à hipotensão)",
          "Se etiologia isquêmica (IAM): encaminhamento IMEDIATO para Cateterismo / Angioplastia Primária (< 90 min)",
          "Terapia antiplaquetária no IAM: AAS 200–300 mg mastigado + Ticagrelor 180 mg VO (ou Prasugrel 60 mg) + Heparina HNF IV bolus 60–70 UI/kg",
          "Vasodilatador IV (Nitroglicerina 10–200 mcg/min): introduzir apenas após estabilização da PAM (PAS > 100 mmHg) para reduzir pós-carga de VE e congestão",
          "Considerar Suporte Circulatório Mecânico temporário (Balão Intra-aórtico, Impella ou ECMO VA) em choque cardiogênico refratário (SCAI D e E)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e estratificação",
        "it": [
          "Derivações direitas (V3R, V4R) e posteriores (V7–V9) no ECG para descarte de IAM de VD associado",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h), Lactato sérico seriado, BNP / NT-proBNP"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Transferência emergencial para o laboratório de hemodinâmica (sala de cateterismo)",
          "Internação prioritária em Unidade de Terapia Intensiva Coronariana (UCO)"
        ]
      }
    ]
  },
  "cho_obs": {
    "l": "Choque obstrutivo",
    "s": [
      {
        "id": "sup",
        "t": "Manejo das interfaces e contrapressões (Crager 2025)",
        "it": [
          "Reconhecer e distinguir os dois grandes mecanismos: 1) Contrapressão intratorácica/pericárdica externa (Pneumotórax, Tamponamento); 2) Contrapressão de pós-carga ao VD (TEP maciço)",
          "Monitorização contínua de sinais vitais, oximetria de pulso e ECG",
          "Evitar ventilação com pressão positiva / PEEP elevado em pneumotórax e tamponamento antes da descompressão mecânica (reduz retorno venoso e precipita PCR)",
          "CUIDADO COM FLUIDOS EM FALÊNCIA DE VD: a sobrecarga hídrica dilata o VD, desvia o septo interventricular para a esquerda, restringe o enchimento de VE e derruba o débito cardíaco!"
        ]
      },
      {
        "id": "esp",
        "t": "Descompressão e intervenções etiológicas de emergência",
        "it": [
          "Pneumotórax hipertensivo: DESCOMPRESSÃO TORÁCICA POR AGULHA (14–16G) no 4º/5º EIC linha axilar média ou 2º EIC hemiclavicular imediatamente, seguida de drenagem tubular em selo d'água (24–28F)",
          "Tamponamento cardíaco: PERICARDIOCENTESE DE EMERGÊNCIA guiada por POCUS (punção subxifoide ou apical) com drenagem de alívio de 20–50 mL para restaurar hemodinâmica",
          "TEP maciço (choque / PAS < 90 mmHg): Trombólise química imediata com Tenecteplase (TNK por peso) ou Alteplase 100 mg IV em 2h (50 mg em bolus em caso de PCR iminente)",
          "Anticoagulação plena no TEP: Heparina Não Fracionada (HNF) bolus 80 UI/kg IV seguido de 18 UI/kg/h em BIC (preferível por meia-vida curta e reversibilidade rápida)",
          "Suporte inotrópico e de pós-carga de VD: Norepinefrina para manter perfusão da artéria coronária direita (PAM ≥ 65–70 mmHg) + Dobutamina 2,5–10 mcg/kg/min se choque refratário",
          "Considerar Trombectomia percutânea assistida por cateter (CDT) ou embolectomia cirúrgica se trombolítico contraindicado ou falha de reperfusão"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar no leito",
        "it": [
          "POCUS imediato à beira-leito: janela pericárdica (derrame com colapso diastólico de VD), janela pulmonar (ausência de lung sliding no pneumotórax), coração direito (dilatação de VD / McConnell sign no TEP)",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h), Lactato sérico seriado, BNP / NT-proBNP",
          "Angiotomografia de artérias pulmonares (se paciente estabilizado com vasopressor para confirmar extensão do TEP)",
          "ECG de 12 derivações: padrão S1Q3T3, inversão de onda T de V1 a V4, desvio de eixo para a direita, alternância elétrica (tamponamento)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Acionamento urgente da Cirurgia Geral / Torácica (pneumotórax/tamponamento) ou Cirurgia Cardíaca / Hemodinâmica (TEP com indicação de trombectomia mecânica)",
          "Internação imediata em leito de Terapia Intensiva (UTI)"
        ]
      }
    ]
  },
  "feb": {
    "l": "Síndrome febril / Sepse",
    "subAdd": [
      {
        "id": "cho_sep",
        "l": "Choque séptico associado"
      },
      {
        "id": "rnc",
        "l": "Encefalopatia / Rebaixamento associado"
      },
      {
        "id": "pnm",
        "l": "Pneumonia / Infecção respiratória"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Rastreio de sepse e bundle da 1ª hora (Surviving Sepsis Campaign)",
        "it": [
          "Abertura de protocolo sepse, coleta de laboratoriais e 2 pares de hemocultura",
          "Se choque séptico, início de ATB < 1h da admissão, se sepse suspeita, início em até 3h, após descartar diferenciais",
          "Se hipotensão, expansão volêmica possível com até 30ml/kg de cristaloide balanceado",
          "Caso PAD < 40 ou refratariedade a bolus de cristaloide, início precoce de vasopressor em acesso periférico"
        ]
      },
      {
        "id": "sin",
        "t": "Controle térmico e sintomáticos",
        "it": [
          "Medidas físicas de resfriamento passivo (despir paciente, compressas mornas)"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antimicrobiana e controle de foco (< 1 hora)",
        "it": [
          "Foco pulmonar comunitário: Ceftriaxona 2 g IV 12/12h + Azitromicina 500 mg IV 1×/dia (adicionar Vancomicina 15–20 mg/kg 12/12h se risco de MRSA)",
          "Foco abdominal / biliar: Ceftriaxona 2 g IV 12/12h + Metronidazol 500 mg IV 8/8h OU Piperacilina-Tazobactam 4,5 g IV 6/6h",
          "Foco urinário / urossepsse: Ceftriaxona 2 g IV 1×/dia (adicionar Amicacina 15 mg/kg IV se choque séptico) OU Meropenem 1 g IV 8/8h se histórico de germe ESBL",
          "Foco em partes moles / infecção de cateter: Oxacilina 2 g IV 4/4h OU Vancomicina 15–20 mg/kg IV se risco de MRSA",
          "Controle mecânico do foco infeccioso em < 6–12h (remoção de cateter infectado, drenagem cirúrgica de abscesso, desbridamento de infecção necrosante, desobstrução de via biliar/urinária)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e microbiológica",
        "it": [
          "Coleta de 2 pares de hemoculturas de sítios venosos periféricos distintos com técnica estéril rigorosa",
          "Culturas direcionadas ao foco clínico suspeito: urocultura com antibiograma, cultura de escarro/secreção traqueal, cultura de líquido sinovial ou líquor",
          "Urina tipo 1 (sedimento urinário) e pesquisa de antígenos urinários para Legionella e Pneumococo se pneumonia grave",
          "Radiografia de tórax no leito e/ou Tomografia Computadorizada do segmento corpóreo suspeito (tórax, abdome, pelve ou crânio)",
          "Laboratório de urgência: Hemograma completo com plaquetas, Coagulograma (TP/INR, TTPa), Ureia, Creatinina, Eletrólitos, Glicemia e Gasometria com dosagem de lactato"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Sepse com disfunção orgânica ou hipotensão requerendo vasopressor: internação obrigatória em UTI",
          "Infecção bacteriana estável sem disfunções orgânicas: internação em enfermaria monitorizada para completar esquema parenteral",
          "Infecção de baixo risco (ex: infecção urinária baixa, bronquite aguda): alta orientada com antibioticoterapia oral e retorno em 48h"
        ]
      }
    ]
  },
  "dlb": {
    "l": "Dor lombar aguda",
    "subExcl": [
      {
        "id": "dlb_mec",
        "l": "Lombalgia Mecânica / Lombociatalgia Aguda"
      },
      {
        "id": "dlb_ceu",
        "l": "Síndrome da Cauda Equina (Emergência Cirúrgica)"
      },
      {
        "id": "dlb_inf",
        "l": "Infecção Espinhal (Abscesso Epidural / Espondilodiscite)"
      },
      {
        "id": "dlb_vasc",
        "l": "Aneurisma de Aorta Abdominal (AAA) / Vascular"
      },
      {
        "id": "dlb_col",
        "l": "Cólica Nefrética / Urolitíase Aguda"
      }
    ],
    "subAdd": [
      {
        "id": "feb",
        "l": "Febre associada / Sepse"
      },
      {
        "id": "cho_hip",
        "l": "Choque hemorrágico / Hipotensão"
      },
      {
        "id": "rnc",
        "l": "Rebaixamento de consciência / Delirium"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Rastreio sistemático de Red Flags (Sinais de Alarme)",
        "it": [
          "Avaliação neurológica focada em membros inferiores: força motora (L4-extensão do joelho, L5-dorsiflexão do hálux, S1-flexão plantar), sensibilidade de dermátomos e reflexos patelar e aquileu",
          "Pesquisa de anestesia em sela e palpação de globo vesical (retenção urinária aguda)",
          "Palpação cuidadosa do abdome: busca ativa de massa aórtica pulsátil em pacientes com mais de 50 anos",
          "Aferição de temperatura axilar e sinais vitais completos"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia multimodal e orientações na lombalgia mecânica",
        "it": [
          "Dipirona 1 a 2 g IV a cada 6h OU Paracetamol 750–1.000 mg VO a cada 6h",
          "Anti-inflamatório Não Esteroidal (AINE): Cetoprofeno 100 mg IV 12/12h ou Ibuprofeno 600 mg VO 8/8h por curto período (3 a 5 dias), se função renal preservada e sem risco hemorrágico",
          "Relaxante muscular adjuvante se espasmo paravertebral intenso: Ciclobenzaprina 5 a 10 mg VO à noite por 5 a 7 dias",
          "Aplicação de calor local úmido na região lombar por 15 a 20 minutos várias vezes ao dia"
        ]
      },
      {
        "id": "esp",
        "t": "Conduta e intervenção específica",
        "it": [
          "Lombalgia mecânica simples sem red flags: analgesia oral ambulatorial, orientações ergonômicas e desmistificação do quadro",
          "Suspeita de Cauda Equina ou Abscesso Epidural: NPO absoluto, leito monitorizado e acionamento emergencial da Neurocirurgia / Ortopedia de coluna",
          "Suspeita de Aneurisma de Aorta Abdominal roto ou sintomático: acionamento imediato da Cirurgia Vascular com hipotensão permissiva e reposição com hemoderivados"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar racional",
        "it": [
          "Ressonância Magnética (RM) de coluna lombossacra de emergência: exame padrão-ouro indicado imediatamente se suspeita de Cauda Equina, déficit neurológico focal progressivo ou infecção espinhal",
          "Tomografia Computadorizada (TC) de coluna ou abdome: indicada se RM contraindicada ou para avaliar trauma ósseo / cólica renal / aneurisma aórtico",
          "Laboratório na suspeita de alarme: Hemograma completo, Função renal (Ureia e Creatinina) e Urina tipo 1 (sedimento urinário)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Cauda Equina / Abscesso Epidural / AAA roto: encaminhamento cirúrgico imediato e internação hospitalar/UTI",
          "Lombalgia mecânica sem critérios de alarme: alta médica orientada com analgésicos orais, manutenção da marcha e orientação formal de retorno se retenção urinária, anestesia em sela, febre ou fraqueza nas pernas"
        ]
      }
    ]
  },
  "dlb_mec": {
    "l": "Lombalgia Mecânica / Lombociatalgia Aguda",
    "s": [
      {
        "id": "sup",
        "t": "Exame físico biomecânico",
        "it": [
          "Manobra de Lasègue (elevação da perna retificada): positiva se dor ciática irradiada abaixo do joelho entre 30° e 70° (sugestivo de compressão radicular L4-L5 ou L5-S1)",
          "Teste de Lasègue cruzado: alta especificidade para hérnia discal se positivo"
        ]
      },
      {
        "id": "sin",
        "t": "Farmacoterapia ambulatorial",
        "it": [
          "Dipirona 1 g VO 6/6h + Cetoprofeno 100 mg VO 12/12h por 3–5 dias",
          "Ciclobenzaprina 5–10 mg VO à noite para alívio do espasmo paravertebral agudo",
          "Calor local úmido e deambulação leve estimulada"
        ]
      },
      {
        "id": "dsp",
        "t": "Critérios de alta",
        "it": [
          "Alta com orientações de postura e agendamento de fisioterapia ambulatorial se sintomas persistirem por > 4–6 semanas"
        ]
      }
    ]
  },
  "dlb_ceu": {
    "l": "Síndrome da Cauda Equina (Emergência Cirúrgica)",
    "s": [
      {
        "id": "sup",
        "t": "Reconhecimento emergencial",
        "it": [
          "Documentar no prontuário: sensibilidade perianal em sela, tônus do esfíncter anal ao toque retal e volume residual pós-miccional (> 200 mL no USG ou sondagem vesical)",
          "Jejum absoluto (NPO) e preparo pré-operatório imediato"
        ]
      },
      {
        "id": "esp",
        "t": "Conduta neurocirúrgica emergencial",
        "it": [
          "Acionamento prioritário da equipe de Neurocirurgia / Cirurgia de Coluna",
          "Dexametasona 10 mg IV (se etiologia compressiva neoplásica/edema medular associado)",
          "Passagem de Sonda Vesical de Demora para drenagem vesical protetora e balanço hídrico"
        ]
      },
      {
        "id": "inv",
        "t": "Confirmação por imagem",
        "it": [
          "Ressonância Magnética (RM) de coluna lombossacra de emergência: confirma hérnia discal maciça, hematoma peridural ou lesão tumoral compressiva"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Transferência direta para o Centro Cirúrgico / Internação hospitalar de emergência"
        ]
      }
    ]
  },
  "dlb_inf": {
    "l": "Infecção Espinhal (Abscesso Epidural / Espondilodiscite)",
    "s": [
      {
        "id": "sup",
        "t": "Suspeita clínica e monitorização",
        "it": [
          "Tríade clássica: dor lombar severa localizada + febre + déficit neurológico progressivo",
          "Investigar fatores de risco: uso de drogas injetáveis, diabetes mellitus, imunossupressão, infecção cutânea ou procedimento raquidiano recente"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antimicrobiana e descompressão",
        "it": [
          "Antibioticoterapia parenteral de amplo espectro em < 1h (após coleta de hemoculturas): Vancomicina 15–20 mg/kg IV 12/12h (cobertura de MRSA) + Cefepime 2 g IV 8/8h (ou Ceftriaxona 2 g IV 12/12h)",
          "Avaliação cirúrgica imediata da Neurocirurgia"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica",
        "it": [
          "Ressonância Magnética com contraste de coluna total (método de escolha)",
          "2 pares de hemoculturas de sítios periféricos distintos",
          "PCR sérica quantitativa e VHS para acompanhamento de resposta terapêutica"
        ]
      }
    ]
  },
  "dlb_vasc": {
    "l": "Aneurisma de Aorta Abdominal (AAA) / Vascular",
    "s": [
      {
        "id": "sup",
        "t": "Alta suspeição e estabilização hemodinâmica",
        "it": [
          "Tipagem sanguínea e prova cruzada para concentrados de hemácias, plasma e plaquetas"
        ]
      },
      {
        "id": "esp",
        "t": "Cirurgia vascular de emergência",
        "it": [
          "Acionamento IMEDIATO da Cirurgia Vascular para reparo cirúrgico aberto de emergência ou endovascular (EVAR)",
          "Ácido Tranexâmico 1 g IV em 10 min se choque hemorrágico ativo"
        ]
      },
      {
        "id": "inv",
        "t": "Imagem confirmatória",
        "it": [
          "POCUS de aorta abdominal na sala de emergência (diâmetro > 3 cm confirma aneurisma; líquido livre intraperitoneal ou retroperitoneal indica rotura)",
          "Angiotomografia de abdome e pelve com contraste se paciente hemodinamicamente estável"
        ]
      }
    ]
  },
  "dlb_col": {
    "l": "Cólica Nefrética / Urolitíase Aguda",
    "s": [
      {
        "id": "sup",
        "t": "Apresentação e suporte",
        "it": [
          "Dor lombar em cólica, intensa, súbita, irradiando para fossa ilíaca, bolsa escrotal ou grandes lábios",
          "Sinais de gravidade: febre associada (risco de pielonefrite obstrutiva / urossepsse!), anúria ou rim único"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia de 1ª linha",
        "it": [
          "Cetorolaco 30 mg IV lento OU Cetoprofeno 100 mg IV em 100 mL SF",
          "Dipirona 2 g IV associada",
          "Morfina 2–4 mg IV se dor severa refratária ao AINE",
          "Ondansetrana 4–8 mg IV se náuseas ou vômitos associados"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia expulsiva e conduta urológica",
        "it": [
          "Cálculos ureterais distais de 5 a 10 mm em paciente estável: Tansulosina 0,4 mg VO 1×/dia (facilita eliminação espontânea)",
          "Sinais de ITU associada / sepse obstrutiva: URGÊNCIA UROLÓGICA para descompressão imediata com cateter Duplo J ou Nefrostomia percutânea + Ceftriaxona 2 g IV"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Tomografia Computadorizada de abdome e pelve sem contraste (TC de baixa dose): padrão-ouro para cálculo, dimensões e hidronefrose",
          "Urina tipo 1 (hematúria microscópica presente em > 85%, leucocitúria, nitrito) e creatinina sérica"
        ]
      }
    ]
  },
  "emmi": {
    "l": "Edema / Dor em Membros Inferiores",
    "subExcl": [
      {
        "id": "emmi_tvp",
        "l": "Trombose Venosa Profunda (TVP de MMII)"
      },
      {
        "id": "emmi_art",
        "l": "Isquemia Arterial Aguda (Os 6 \"P\"s de Pratt)"
      },
      {
        "id": "emmi_fas",
        "l": "Infecção Necrosante de Partes Moles / Fasciíte"
      },
      {
        "id": "emmi_cel",
        "l": "Celulite / Erisipela (Infecção não necrosante)"
      },
      {
        "id": "emmi_edem",
        "l": "Edema Bilateral Sistêmico (Cardíaco / Hepático / Renal)"
      }
    ],
    "subAdd": [
      {
        "id": "tep",
        "l": "TEP suspeito ou associado"
      },
      {
        "id": "cho_sep",
        "l": "Sepse / Choque de partes moles"
      },
      {
        "id": "cho_hip",
        "l": "Choque hipovolêmico / Isquêmico"
      },
      {
        "id": "eap",
        "l": "Edema agudo de pulmão / IC associada"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Avaliação sistemática e diagnóstico diferencial vascular",
        "it": [
          "Exame físico comparativo bilateral minucioso: palpação de pulsos periféricos (femoral, poplíteo, tibial posterior e pedioso dorsal)",
          "Medição da circunferência das panturrilhas com fita métrica a 10 cm abaixo da tuberosidade tibial (assimetria ≥ 3 cm é sugestiva de TVP)",
          "Avaliação de temperatura local, perfusão capilar distal, coloração cutânea (palidez, cianose, eritema), presença de bolhas e empastamento muscular"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia e posicionamento adequado",
        "it": [
          "Elevação do membro a 30° se TVP ou celulite/insuficiência venosa (facilita o retorno venoso e reduz o edema)",
          "Manter membro na horizontal ou levemente pendente se suspeita de isquemia arterial aguda",
          "Dipirona 1 g IV a cada 6h + Morfina 2–4 mg IV se dor isquêmica aguda severa"
        ]
      },
      {
        "id": "esp",
        "t": "Diretriz de intervenção por etiologia",
        "it": [
          "Suspeita de TVP com escore de Wells provável (≥ 2): iniciar anticoagulação plena enquanto aguarda confirmação ultrassonográfica, se sem contraindicações hemorrágicas",
          "Isquemia arterial aguda: heparinização sistêmica imediata com Heparina Não Fracionada (HNF) bolus e acionamento vascular emergencial",
          "Infecção necrosante de partes moles: desbridamento cirúrgico de emergência e antibioticoterapia tripla imediata"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar escalonada",
        "it": [
          "Ultrassonografia com Doppler venoso de compressão de MMII: padrão-ouro para TVP (incompressibilidade da veia, ausência de fluxo fásico)",
          "D-dímero de alta sensibilidade com ponto de corte ajustado pela idade (idade × 10 mcg/L se > 50 anos): utilizar APENAS se probabilidade de TVP improvável (Wells ≤ 1) para exclusão diagnóstica",
          "Doppler arterial de MMII ou Angiotomografia arterial se suspeita de oclusão arterial aguda",
          "Escore LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) se sinais atípicos, bolhas ou crepitação: hemograma, PCR, sódio, glicose, creatinina"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Isquemia arterial aguda e infecção necrosante: centro cirúrgico de emergência e UTI pós-operatória",
          "TVP proximal não complicada de baixo risco com suporte adequado: elegível para anticoagulação domiciliar com DOAC oral seguro e acompanhamento ambulatorial",
          "Edema bilateral por IC descompensada, sepse de partes moles ou flebite complicada: internação hospitalar"
        ]
      }
    ]
  },
  "emmi_tvp": {
    "l": "Trombose Venosa Profunda (TVP de MMII)",
    "s": [
      {
        "id": "sup",
        "t": "Estratificação de probabilidade clínica pré-teste (Wells TVP)",
        "it": [
          "Se Wells improvável (< 2): solicitar D-dímero; se normal (< 500 ou ajustado pela idade), TVP descartada sem necessidade de Doppler. Se elevado: USG Doppler venoso",
          "Se Wells provável (≥ 2): solicitar USG Doppler venoso de MMII direto"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia anticoagulante plena (CHEST 2021/2024)",
        "it": [
          "Rivaroxabana 15 mg VO 12/12h por 21 dias com alimentos (seguido de 20 mg 1×/dia) OU Apixabana 10 mg VO 12/12h por 7 dias (seguido de 5 mg 12/12h)",
          "Alternativa parenteral: Enoxaparina 1 mg/kg SC 12/12h (ou Fondaparinux 7,5 mg SC 1×/dia)",
          "Insuficiência renal grave (ClCr < 15–30 mL/min) ou Phlegmasia cerulea dolens: Heparina Não Fracionada (HNF) bolus 80 UI/kg IV seguido de 18 UI/kg/h em BIC (alvo TTPa 1,5–2,5×)",
          "Filtro de Veia Cava Inferior (FVCI): indicação restrita a contraindicação absoluta à anticoagulação ou TVP recorrente em anticoagulação plena terapêutica"
        ]
      },
      {
        "id": "inv",
        "t": "Exames de imagem",
        "it": [
          "USG Doppler venoso de MMII: avaliação do sistema venoso profundo proximal (femoral comum, femoral profunda, poplítea) e distal"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "TVP não complicada de membro inferior: tratamento ambulatorial seguro se paciente estável, sem dor incoercível, com função renal adequada e suporte familiar"
        ]
      }
    ]
  },
  "emmi_art": {
    "l": "Isquemia Arterial Aguda (Os 6 \"P\"s de Pratt)",
    "s": [
      {
        "id": "sup",
        "t": "Reconhecimento dos 6 \"P\"s e janela terapêutica",
        "it": [
          "Palpação comparativa rigorosa de todos os pulsos periféricos",
          "Proteção térmica passiva com algodão ortopédico (NÃO aplicar compressas quentes ou bolsas térmicas!)",
          "Manter membro na horizontal ou levemente pendente (NUNCA elevar o membro!)"
        ]
      },
      {
        "id": "esp",
        "t": "Heparinização de emergência e revascularização cirúrgica",
        "it": [
          "Anticoagulação imediata em bólus: Heparina Não Fracionada (HNF) 5.000 a 10.000 UI IV (ou 80 UI/kg IV) em bólus imediato para prevenir propagação e trombose retrógrada, seguido de infusão contínua a 18 UI/kg/h",
          "Acionamento IMEDIATO da Cirurgia Vascular de emergência para embolectomia cirúrgica por cateter de Fogarty, trombólise intra-arterial farmacomecânica ou bypass",
          "Analgesia venosa potente com opioides (Morfina 2–4 mg IV ou Fentanil 50–100 mcg IV)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Angiotomografia arterial de membros inferiores se paciente estável e sem retardo para o bloco cirúrgico",
          "Laboratório de emergência: Hemograma completo, coagulograma (TP/INR, TTPa), ureia, creatinina, potássio sérico, CPK sérica e gasometria com dosagem de lactato"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Transferência direta e imediata para Centro Cirúrgico / UTI vascular"
        ]
      }
    ]
  },
  "emmi_fas": {
    "l": "Infecção Necrosante de Partes Moles / Fasciíte",
    "s": [
      {
        "id": "sup",
        "t": "Reconhecimento de sinais de necrose tecidual",
        "it": [
          "Monitorização contínua de sinais vitais e rastreio de choque séptico",
          "Dois acessos venosos periféricos de grosso calibre e ressuscitação volêmica vigorosa com Ringer Lactato"
        ]
      },
      {
        "id": "esp",
        "t": "Desbridamento cirúrgico de emergência e antibioticoterapia tripla (< 1h)",
        "it": [
          "Acionamento IMEDIATO da Cirurgia Geral / Vascular para DESBRIDAMENTO CIRÚRGICO EXTENSO de todo o tecido e fáscia necróticos (a intervenção precoce é o único determinante isolado de sobrevida)",
          "Antibioticoterapia empírica tripla imediata:",
          "Piperacilina-Tazobactam 4,5 g IV 6/6h (ou Meropenem 1 g IV 8/8h) +",
          "Vancomicina 15–20 mg/kg IV 12/12h (cobertura de MRSA) +",
          "Clindamicina 600 a 900 mg IV 8/8h (efeito antitoxina: inibe a síntese de toxinas eritrogênicas por Streptococcus pyogenes do grupo A)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação laboratorial e imagem",
        "it": [
          "Escore LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis): avalia PCR, leucócitos, hemoglobina, sódio, creatinina e glicose (pontuação ≥ 6 indica alto risco de infecção necrosante)",
          "Coleta de 2 pares de hemoculturas e cultura do aspirado tecidual cirúrgico profundo",
          "Radiografia simples ou TC: presença de gás nos planos fasciais profundos confirma o diagnóstico"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Centro cirúrgico de emergência imediato seguido de internação em UTI"
        ]
      }
    ]
  },
  "emmi_cel": {
    "l": "Celulite / Erisipela (Infecção não necrosante)",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação e demarcação da área infectada",
        "it": [
          "Demarcação dos limites do eritema com caneta dermográfica na admissão",
          "Demarcar os limites do eritema com caneta dermográfica na admissão para acompanhar a resposta clínica nas primeiras 24–48h",
          "Pesquisa de porta de entrada: tinea pedis interdigital, fissuras nos pés, úlceras ou ferimentos prévios"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antimicrobiana e medidas de suporte",
        "it": [
          "Casos leves/moderados elegíveis para tratamento oral ambulatorial: Cefalexina 500 mg VO 6/6h OU Amoxicilina-Clavulanato 875/125 mg VO 12/12h por 5 a 7 dias",
          "Casos moderados a graves com indicação de antibioticoterapia parenteral hospitalar: Cefazolina 1 a 2 g IV 8/8h OU Oxacilina 2 g IV 4/4h (adicionar Vancomicina 15–20 mg/kg se fatores de risco para MRSA)",
          "Elevação do membro afetado acima do nível do coração durante o repouso para favorecer a drenagem venolinfática",
          "Tratamento tópico de portas de entrada fúngicas interdigitais (cetoconazol ou miconazol tópico)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Laboratório de avaliação: Hemograma completo, Glicemia capilar e sérica, Ureia e Creatinina",
          "2 pares de hemoculturas pareadas se sinais de toxemia sistêmica, febre alta (> 38°C) ou imunossupressão"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta orientada se ausência de toxicidade sistêmica, tolerância oral e suporte domiciliar adequado",
          "Internação hospitalar se falha do tratamento oral, imunossuprimido, sinais de sepse ou rápida progressão"
        ]
      }
    ]
  },
  "emmi_edem": {
    "l": "Edema Bilateral Sistêmico (Cardíaco / Hepático / Renal)",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação de sobrecarga sistêmica",
        "it": [
          "Exame físico cardiorrespiratório completo: estase jugular patológica a 45°, refluxo hepatojugular, estertoração crepitante bibasal, ascite e edema de parede abdominal/sacro",
          "Verificação de perda ponderal e pesquisa de uso de fármacos causadores de edema (especialmente bloqueadores de canais de cálcio como anlodipino)"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo descongestivo",
        "it": [
          "Restrição de sódio na dieta e restrição hídrica se hiponatremia hipervolêmica associada",
          "Furosemida 20 a 40 mg IV ou VO conforme sinais clínicos de congestão pulmonar ou sistêmica exuberante",
          "Suspensão ou substituição de drogas vasodilatadoras periféricas associadas a edema maleolar isolado"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação etiológica",
        "it": [
          "BNP / NT-proBNP séricos + ecocardiograma (descarte de insuficiência cardíaca descompensada)",
          "Função renal (creatinina, ureia) e urina tipo 1 com quantificação de proteinúria (descarte de síndrome nefrótica/nefrítica)",
          "Perfil hepático completo, albumina sérica e INR (descarte de cirrose hepática com insuficiência sintética)"
        ]
      }
    ]
  }
};
