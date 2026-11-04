// ─── Protocolos Sindrômicos: RESPIRATORIO ───
const CT_RESPIRATORIO = {
  "dsp": {
    "l": "Síndrome dispneica",
    "subExcl": [
      {
        "id": "dsp_ind",
        "l": "Dispneia indiferenciada / Suporte inicial"
      },
      {
        "id": "eap",
        "l": "IC aguda descompensada / EAP"
      },
      {
        "id": "dpoc_ag",
        "l": "DPOC agudizado"
      },
      {
        "id": "asma",
        "l": "Crise asmática aguda"
      },
      {
        "id": "pnm",
        "l": "Pneumonia grave"
      },
      {
        "id": "tep",
        "l": "Tromboembolismo pulmonar (TEP)"
      },
      {
        "id": "dep",
        "l": "Derrame pleural sintomático"
      },
      {
        "id": "pntx",
        "l": "Pneumotórax / Trauma torácico"
      }
    ],
    "subAdd": [
      {
        "id": "dtx",
        "l": "Suspeita de SCA associada (CHAMPIT)"
      },
      {
        "id": "cho_sep",
        "l": "Sepse / Foco infeccioso grave"
      },
      {
        "id": "pntx",
        "l": "Pneumotórax associado"
      }
    ],
    "s": []
  },
  "dsp_ind": {
    "l": "Dispneia indiferenciada / Suporte inicial",
    "s": [
      {
        "id": "sup",
        "t": "Suporte ventilatório e abordagem emergencial imediata",
        "it": [
          "Posicionamento sentado ou cabeceira elevada a 45–90° (posição de Fowler)",
          "Oximetria contínua com alvo de SpO₂: 94–98% na população geral (88–92% se suspeita de retenção crônica de CO₂)",
          "Ventilação Não Invasiva (VNI) precoce: CPAP 5–10 cmH₂O ou BiPAP (EPAP 4–6 cmH₂O, IPAP 10–15 cmH₂O) se FR > 25 irpm, tiragem ou SpO₂ < 90%",
          "Intubação Orotraqueal (IOT) em sequência rápida: se exaustão respiratória iminente, rebaixamento de consciência (Glasgow ≤ 8) ou acidose hipercápnica progressiva",
          "Monitor cardíaco contínuo de 12 derivações e acesso venoso periférico calibroso"
        ]
      },
      {
        "id": "esp",
        "t": "Terapêutica direcionada e rastreio etiológico (CHAMPIT)",
        "it": [
          "Rastreio etiológico emergencial CHAMPIT: Coronariana (SCA), Hipertensiva, Arritmia, Mecânica (valvopatia aguda/CIV), Pulmonar (TEP), Infecciosa (sepse/pneumonia), Tamponamento pericárdico",
          "Broncoespasmo ativo (sibilos/expiração prolongada): Salbutamol 2,5 mg inalatório + Brometo de Ipratrópio 0,5 mg inalatório a cada 20 min nas primeiras doses",
          "Morfina 2–4 mg IV titulada apenas com indicação precisa (ansiedade intensa/congestão pulmonar)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar no leito",
        "it": [
          "POCUS pulmonar (Protocolo BLUE): diferenciar perfil B (linhas B bilaterais = EAP) de perfil A (asma/DPOC/TEP), consolidação e pneumotórax",
          "Radiografia de tórax no leito (PA / AP): avaliar congestão hilofugal, consolidações, pneumotórax e derrame pleural",
          "ECG de 12 derivações na admissão",
          "Gasometria arterial com lactato sérico se insuficiência respiratória moderada a grave",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia",
          "Peptídeos natriuréticos (BNP ou NT-proBNP) se dúvida diagnóstica cardiopulmonar",
          "D-dímero se suspeita de TEP com probabilidade intermediária/baixa"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em Unidade de Terapia Intensiva (UTI) se necessidade de VNI mantida, IOT, instabilidade hemodinâmica ou disfunção orgânica",
          "Internação em leito semi-intensivo / enfermaria monitorizada se estabilização com oxigenoterapia de baixo fluxo"
        ]
      }
    ]
  },
  "dpoc_ag": {
    "l": "Agudização de DPOC",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e suporte",
        "it": [
          "Oxigenoterapia em cateter nasal",
          "VNI (BiPAP) com máscara facial: IPAP 12–16 cmH₂O, EPAP 4–6 cmH₂O (titular para pH > 7,35)",
          "IOT se falha da VNI, rebaixamento de consciência (Glasgow ≤ 8) ou apneia iminente"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacológico",
        "it": [
          "Salbutamol 2,5 mg NBZ + ipratrópio 0,5 mg",
          "Prednisolona 40 mg VO/dia por 5 dias (ou metilprednisolona 40 mg IV)",
          "ATB se ≥ 2 critérios de Anthonisen: ↑ dispneia, ↑ volume e ↑ purulência do escarro",
          "Magnésio 1,5–2 g IV em 20 min se broncoespasmo grave refratário"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Gasometria arterial com dosagem de lactato (avaliar pH, PaCO2 e retenção aguda de CO2)",
          "Laboratório de urgência: Hemograma completo, Ureia, Creatinina e Eletrólitos (Sódio e Potássio — vigiar hipocalemia induzida por beta-2)",
          "Radiografia de tórax no leito para descartar pneumotórax, pneumonia e congestão",
          "Eletrocardiograma de 12 derivações (pesquisar sobrecarga de câmaras direitas e arritmias)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta: melhora com SatO2 > 90% em ar ambiente, FR < 24, tolerância oral e suporte adequado em casa",
          "Internação: pH < 7,35, SatO2 < 90% persistente, comorbidade grave ou falha ao tratamento ambulatorial",
          "UTI: necessidade de VNI ou IOT, instabilidade hemodinâmica, confusão mental"
        ]
      }
    ]
  },
  "asma": {
    "l": "Crise asmática",
    "s": [
      {
        "id": "sup",
        "t": "Suporte e monitorização",
        "it": [
          "Monitorização multiparamétrica contínua (oximetria de pulso, FR, ritmo cardíaco) e cabeceira elevada",
          "Oxigenoterapia sob cateter nasal ou máscara para alvo de SpO₂ 93–95%",
          "Preparo imediato para via aérea avançada (IOT com sequência rápida) e suporte ventilatório se exaustão respiratória ou rebaixamento"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacológico",
        "it": [
          "Salbutamol 2,5 mg NBZ a cada 20 min por 3 doses; MDI 4–8 jatos com espaçador se cooperativo",
          "Ipratrópio 0,5 mg NBZ associado ao salbutamol nas primeiras 3h",
          "Prednisolona 40–50 mg VO (ou metilprednisolona 125 mg IV se grave)",
          "Magnésio 2 g IV em 20 min se grave ou refratário",
          "Epinefrina 0,3 mg IM coxa anterolateral se anafilaxia associada ou risco de vida",
          "Heliox 70:30 se disponível e grave"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Gasometria arterial com dosagem de lactato se SatO2 < 92% após broncodilatação inicial ou sinais de exaustão",
          "Eletrólitos com Potássio sérico (vigiar hipocalemia por altas doses de salbutamol) e glicemia",
          "Hemograma completo",
          "Radiografia de tórax no leito se suspeita de complicação (pneumotórax, pneumomediastino ou infecção pulmonar)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta após 1h: SatO2 > 94%, FR < 22, PEFR > 60–70% do previsto, tolerância oral de medicação",
          "Internação: PEFR 40–60%, resposta parcial, comorbidade grave, crise noturna, recurso limitado em casa",
          "UTI: falha da VNI, PEFR < 25%, rebaixamento de consciência, necessidade de IOT"
        ]
      }
    ]
  },
  "pnm": {
    "l": "Pneumonia grave",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e suporte",
        "it": [
          "O2 para SatO2 ≥ 94% (88–92% em DPOC)",
          "VNI se DPOC ou imunossuprimido com hipoxemia moderada",
          "IOT se FR > 35, uso intenso musculatura acessória, rebaixamento de consciência ou falha da VNI",
          "Cálculo do escore CURB-65 na admissão (Confusão, Ureia, FR, PA, Idade ≥ 65)"
        ]
      },
      {
        "id": "esp",
        "t": "Antibioticoterapia — iniciar em < 1h",
        "it": [
          "PNM adquirida na comunidade grave (UTI): ceftriaxona 1–2 g IV/dia + azitromicina 500 mg IV/dia",
          "Alternativa: β-lactâmico + fluoroquinolona respiratória (levofloxacino 750 mg IV/dia)",
          "MRSA suspeito (internação prévia < 90 dias, colonização, úlceras): adicionar vancomicina 25 mg/kg IV ou linezolida 600 mg 12/12h",
          "Pseudomonas suspeita (DPOC grave, bronquiectasias, imunossupressão, ATB recente): piperacilina-tazobactam 4,5 g 6/6h ou cefepime 2 g 8/8h",
          "Influenza suspeita ou confirmada: oseltamivir 75 mg 12/12h por 5 dias"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Radiografia de tórax no leito PA e perfil (ou TC de tórax se dúvida diagnóstica ou complicação)",
          "Coleta de 2 pares de hemoculturas pareadas antes do início do antimicrobiano",
          "Antígeno urinário para Legionella e Streptococcus pneumoniae se pneumonia grave",
          "Painel molecular respiratório (RT-PCR viral multiplex) se disponível",
          "Laboratório de urgência: Hemograma completo, Ureia (estratificação CURB-65), Creatinina, Eletrólitos, Glicemia, Gasometria com dosagem de lactato e Função hepática"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "CURB-65 0–1: ATB oral ambulatorial",
          "CURB-65 2: internação + ATB IV",
          "CURB-65 ≥ 3 ou critério ATS/IDSA major (IOT, choque) ou ≥3 critérios minor (FR≥30, PaO2/FiO2<250, infiltrado multilobar, confusão, uremia, leucopenia): UTI"
        ]
      }
    ]
  },
  "eap": {
    "l": "IC aguda descompensada / EAP",
    "s": [
      {
        "id": "sup",
        "t": "Suporte ventilatório e estabilização (ESC 2026)",
        "it": [
          "Posição ortopneica no leito (cabeceira a 90° com membros inferiores pendentes)",
          "VNI com CPAP 5–10 cmH₂O (ou BiPAP com EPAP 5 / IPAP 12–16 cmH₂O)",
          "Oxigenoterapia suplementar em cateter nasal",
          "IOT com ventilação protetora (VC 6 mL/kg de peso predito, PEEP 5–8) se falha de VNI, fadiga muscular respiratória ou rebaixamento do nível de consciência"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo por fenótipo hemodinâmico e farmacoterapia (ESC 2026)",
        "it": [
          "FENÓTIPO QUENTE E ÚMIDO (PAS > 110 mmHg — ~80% dos casos): Vasodilatador IV precoce (Nitroglicerina 10–200 mcg/min ou Dinitrato de Isossorbida) com titulação rápida para alívio imediato da contrapressão capilar",
          "Diurético de alça IV em bolus: Furosemida 40–80 mg IV (se virgem de diurético) OU 2 a 2,5 vezes a dose diária domiciliar se uso crônico prévio",
          "Avaliação precoce da resposta diurética em 2 horas: dosar sódio urinário isolado (meta > 50–70 mEq/L) ou diurese horária (meta > 100–150 mL/h); se inadequada, dobrar a dose de furosemida em bólus",
          "Inibidor de SGLT2 precoce (ESC 2026 Classe I): Iniciar Dapagliflozina 10 mg VO 1×/dia ou Empagliflozina 10 mg VO 1×/dia assim que estabilizado hemodinamicamente (reduz tempo de internação e reinternações)",
          "Manter medicações modificadoras de prognóstico domiciliares (iSGLT2, IECA/BRA/ARNI, Espironolactona, Betabloqueador), exceto se choque, bradicardia grave ou hipercalemia",
          "FENÓTIPO FRIO E ÚMIDO (Hipotensão / PAS < 90 mmHg / Choque Cardiogênico): Iniciar Dobutamina 2,5–20 mcg/kg/min IV + Norepinefrina para PAM ≥ 65 mmHg; POSTERGAR diuréticos até restaurar perfusão tecidual",
          "FENÓTIPO FRIO E SECO (Hipoperfusão sem congestão): Prova volêmica cautelosa com Ringer Lactato 100–250 mL IV e suspensão de diuréticos"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e biomarcadores",
        "it": [
          "POCUS cardiotorácico no leito: quantificar linhas B pulmonares (perfil de congestão), avaliar fração de ejeção de VE, contratilidade do VD e pesquisar valvopatias graves",
          "BNP / NT-proBNP na admissão para confirmação diagnóstica e prognóstico (cut-offs de descarte: BNP < 100 pg/mL, NT-proBNP < 300 pg/mL)",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h), Lactato sérico seriado"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição e metas",
        "it": [
          "Acionamento emergencial da hemodinâmica se EAP secundário a SCA com supradesnivelamento de ST ou equivalente",
          "Internação em UTI se necessidade de VNI contínua, choque cardiogênico ou drogas vasoativas",
          "Internação em enfermaria cardiológica / semi-intensivo se compensação rápida nas primeiras horas e diurese adequada"
        ]
      }
    ]
  },
  "dep": {
    "l": "Derrame pleural sintomático",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação clínica e estabilização",
        "it": [
          "Monitorização contínua de oximetria de pulso e frequência respiratória",
          "Oxigenoterapia sob cateter nasal ou máscara para manter SpO₂ 92–96%",
          "POCUS pulmonar para quantificação do derrame, pesquisa de septações e marcação do sítio de punção"
        ]
      },
      {
        "id": "esp",
        "t": "Procedimentos e condutas terapêuticas",
        "it": [
          "Toracocentese diagnóstica e de alívio guiada por POCUS (retirar ≤ 1.500 mL por punção para prevenção de edema pulmonar de reexpansão)",
          "Drenagem torácica em selo d'água se derrame parapneumônico complicado (pH < 7,2, glicose < 60 mg/dL, LDH > 1.000 UI/L), empiema purulento franco ou hemotórax",
          "Terapêutica etiológica direcionada: diuréticos de alça para transudatos cardiogênicos, antibioticoterapia parenteral para infecções"
        ]
      },
      {
        "id": "inv",
        "t": "Análise bioquímica e microbiológica do líquido pleural",
        "it": [
          "Bioquímica pleural para Critérios de Light: Proteína total, LDH pleural e sérico (relação > 0,5 e > 0,6)",
          "Citologia diferencial, pH, glicose, gram e cultura bacteriana com antibiograma do líquido pleural",
          "Citologia oncótica seriada se suspeita de etiologia neoplásica",
          "Dosagem de ADA (adenosina desaminase) se suspeita de tuberculose pleural (valor de corte ≥ 40 U/L)"
        ]
      }
    ]
  },
  "tep": {
    "l": "Tromboembolismo pulmonar (TEP)",
    "s": [
      {
        "id": "sup",
        "t": "Estratificação tripartite e suporte inicial (AHA 2026)",
        "it": [
          "Estratificação de risco imediata em 3 estratos: 1) Alto Risco (Choque/Hipotensão PAS < 90 ou PCR); 2) Risco Intermediário (Submaciço: disfunção VD e/ou troponina); 3) Baixo Risco (sPESI = 0, Hestia negativo)",
          "Monitorização cardíaca contínua, oximetria de pulso e pressão arterial a cada 5–15 min",
          "Oxigenoterapia com alvo SpO₂ ≥ 94% (a hipoxemia aguda agrava a vasoconstrição arterial pulmonar e a sobrecarga de VD)",
          "Restrição hídrica estrita de ventrículo direito"
        ]
      },
      {
        "id": "esp",
        "t": "Reperfusão e anticoagulação estratificada (AHA 2026)",
        "it": [
          "Tenecteplase (TNK) IV em bolus único 5–10s ajustado por peso (< 60kg: 30mg; 60–69kg: 35mg; 70–79kg: 40mg; 80–89kg: 45mg; ≥ 90kg: 50mg) OU Alteplase 100 mg IV em 2h",
          "Alternativa ao lítico no alto risco: Trombectomia percutânea assistida por cateter (CDT / aspiração mecânica) se contraindicação formal a trombolíticos sistêmicos ou choque persistente",
          "Anticoagulação no alto risco: Heparina Não Fracionada (HNF) bolus 80 UI/kg IV seguido de 18 UI/kg/h em BIC (alvo TTPa 1,5–2,5× controle; preferível por rápida reversibilidade)",
          "Suporte hemodinâmico de VD no alto risco: Norepinefrina 0,05–0,5 mcg/kg/min (mantém pressão de perfusão da coronária direita) + Dobutamina se choque com baixo débito",
          "RISCO INTERMEDIÁRIO-ALTO (Disfunção de VD + Troponina positiva): Anticoagulação plena imediata com Enoxaparina 1 mg/kg SC 12/12h; monitorização contínua e acionamento da equipe multidisciplinar (PERT); preparar trombólise de resgate se deterioração",
          "RISCO INTERMEDIÁRIO-BAIXO (Apenas VD dilatado OU troponina elevada, não ambos): Anticoagulação plena com Enoxaparina 1 mg/kg SC 12/12h ou DOAC oral",
          "BAIXO RISCO (Normotenso, sem disfunção de VD, troponina normal, sPESI=0): Apixabana 10 mg VO 12/12h por 7 dias (depois 5 mg 12/12h) OU Rivaroxabana 15 mg VO 12/12h por 21 dias (depois 20 mg 1×/dia com alimento)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e biomarcadores",
        "it": [
          "Angiotomografia computadorizada de artérias pulmonares (AngioTC): padrão-ouro diagnóstico; quantificar razão VD/VE (relação > 1,0 indica disfunção de VD)",
          "POCUS direcionado: pesquisa de Sinal de McConnell, retificação do septo interventricular (Sinal do D) e diâmetro de VCI",
          "D-dímero de alta sensibilidade com cut-off ajustado pela idade (idade × 10 mcg/L se > 50 anos) se Wells ≤ 4 ou Geneva ≤ 5",
          "Troponina ultrassensível e BNP / NT-proBNP para estratificação prognóstica e detecção de sobrecarga miocárdica de VD",
          "Análise eletrocardiográfica direcionada para sobrecarga aguda de VD: padrão S1Q3T3, inversão de onda T em V1–V4 e BRD transitório",
          "Ultrassonografia por compressão venosa de MMII (USG Doppler vascular) para identificação do trombo primário (TVP)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição e critérios de desospitalização",
        "it": [
          "Alto risco / Intermediário-alto: internação mandatória em UTI com vigilância hemodinâmica contínua",
          "Intermediário-baixo: internação em enfermaria monitorizada por pelo menos 48h",
          "Baixo risco elegível para alta precoce (< 24–48h): critérios de Hestia negativos, suporte social garantido, acesso a DOAC oral e retorno agendado em 72h"
        ]
      }
    ]
  }
};
