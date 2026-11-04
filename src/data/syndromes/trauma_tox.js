// ─── Protocolos Sindrômicos: TRAUMA_TOX ───
const CT_TRAUMA_TOX = {
  "int": {
    "l": "Intoxicação exógena",
    "subExcl": [
      {
        "id": "int_ind",
        "l": "Intoxicação exógena indiferenciada (manejo inicial)"
      },
      {
        "id": "int_opi",
        "l": "Toxídrome Opioide (Fentanil, Morfina, Metadona)"
      },
      {
        "id": "int_col",
        "l": "Toxídrome Colinérgica (Organofosforados, Carbamatos)"
      },
      {
        "id": "int_acol",
        "l": "Toxídrome Anticolinérgica (Anti-histamínicos, Atropina)"
      },
      {
        "id": "int_simp",
        "l": "Toxídrome Simpaticomimética (Cocaína, Crack, Anfetaminas)"
      },
      {
        "id": "int_ser",
        "l": "Síndrome Serotoninérgica (ISRS, IMAO, MDMA)"
      },
      {
        "id": "int_ad",
        "l": "Antidepressivos Tricíclicos (Amitriptilina, Nortriptilina)"
      },
      {
        "id": "int_pcm",
        "l": "Intoxicação por Paracetamol (Acetaminofeno)"
      },
      {
        "id": "int_cv",
        "l": "Cardiotóxicos (Bloqueadores de Cálcio e Betabloqueadores)"
      }
    ],
    "subAdd": [
      {
        "id": "rnc",
        "l": "Coma / Rebaixamento de consciência associado"
      },
      {
        "id": "con",
        "l": "Convulsões induzidas por toxinas"
      },
      {
        "id": "cho_hip",
        "l": "Choque / Hipotensão vasoplégica"
      },
      {
        "id": "pal",
        "l": "Arritmias cardíacas associadas"
      }
    ],
    "s": []
  },
  "int_ind": {
    "l": "Intoxicação exógena indiferenciada (manejo inicial)",
    "s": [
      {
        "id": "sup",
        "t": "Abordagem inicial e segurança (ABCDE toxicológico)",
        "it": [
          "Vigilância de via aérea: IOT precoce com balonete se hipoventilação, perda de reflexos ou risco de broncoaspiração",
          "Glicemia capilar IMEDIATA na admissão (< 5 min)",
          "Monitorização contínua de sinais vitais com atenção especial à TEMPERATURA CENTRAL (risco de hipertermia letal)",
          "ECG de 12 derivações: avaliar QRS (> 100 ms) e QTc (> 500 ms)"
        ]
      },
      {
        "id": "esp",
        "t": "Medidas gerais de suporte e descontaminação",
        "it": [
          "Carvão Ativado 1 g/kg (máx 50 g) VO/SNG: SOMENTE se ingestão há menos de 1 hora E paciente vigil e cooperativo com via aérea protegida",
          "Descontaminação cutânea: despir o paciente, descartar roupas em saco vedado e lavar com água morna e sabão",
          "Hidratação com cristaloides balanceados para manutenção de débito urinário"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria e coagulograma",
          "Dosagem sérica quantitativa de Paracetamol em qualquer tentativa de autoextermínio",
          "Painel toxicológico urinário qualitativo"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Período mínimo de observação na emergência de 6–8 horas (24h para liberação retard)",
          "Internação em UTI se instabilidade clínica ou necessidade de antídoto contínuo",
          "Avaliação psiquiátrica obrigatória antes da alta em tentativas de autoextermínio"
        ]
      }
    ]
  },
  "int_opi": {
    "l": "Toxídrome Opioide (Fentanil, Morfina, Metadona)",
    "s": [
      {
        "id": "sup",
        "t": "Reconhecimento da tríade e suporte ventilatório",
        "it": [
          "Posicionamento de via aérea, cânula de Guedel e ventilação assistida com bolsa-válvula-máscara a 100% de oxigênio"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia com antídoto (Naloxona)",
        "it": [
          "Naloxona 0,04 a 0,4 mg IV/IM/IN: titular a cada 2–3 minutos até restauração de ventilação espontânea adequada (se parada respiratória iminente: 0,4 a 2 mg direto)",
          "Atenção à meia-vida da Naloxona (30–60 min): substâncias como metadona e fentanil têm ação muito mais prolongada, podendo ocorrer renarcotização súbita!",
          "Infusão contínua em BIC de Naloxona: se doses repetidas forem necessárias, infundir 2/3 da dose de ataque eficaz por hora em SF 0,9%"
        ]
      }
    ]
  },
  "int_col": {
    "l": "Toxídrome Colinérgica (Organofosforados, Carbamatos)",
    "s": [
      {
        "id": "sup",
        "t": "Proteção da equipe e manifestações clínicas",
        "it": [
          "Identificar síndrome colinérgica muscarínica (DUMBELS: diarreia, aumento de urina, miose, broncorreia severa com broncoespasmo, vômitos, lacrimejamento, sialorreia profusa)",
          "Despir completamente o paciente e banho minucioso com água e sabão",
          "Aspiração contínua de secreções respiratórias abundantes"
        ]
      },
      {
        "id": "esp",
        "t": "Antídotos: Atropina em doses duplicadas e Pralidoxima",
        "it": [
          "Atropina: dose inicial de 1 a 2 mg IV em bólus (crianças: 0,02 mg/kg). Se sem resposta em 3–5 minutos, DOBRAR A DOSE SUCESSIVAMENTE (2 mg → 4 mg → 8 mg → 16 mg IV) até atingir vias aéreas secas e ausculta pulmonar limpa sem estertores",
          "Após atropinização: manter infusão contínua de Atropina calculada em 10% a 20% da dose total de ataque requerida por hora em BIC",
          "Pralidoxima (reativador da acetilcolinesterase): 1 a 2 g IV infundido em 30 min se organofosforado (eficaz nas primeiras 24–48h antes do envelhecimento da enzima)"
        ]
      }
    ]
  },
  "int_acol": {
    "l": "Toxídrome Anticolinérgica (Anti-histamínicos, Atropina)",
    "s": [
      {
        "id": "sup",
        "t": "Quadro clínico e exame físico",
        "it": [
          "Tríade clássica: Midríase não reagente + Pele seca e quente (anidrose) + Delírio agitado com alucinações visuais e retenção urinária aguda (bexigoma)",
          "Passagem imediata de Sonda Vesical de Demora para alívio de globo vesical",
          "Monitorização de ECG (pesquisar taquicardia sinusal e alargamento de QRS)"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo sintomático e antídoto",
        "it": [
          "Diazepam 5–10 mg IV lento ou Midazolam 5 mg IM/IV para sedação, controle da agitação psicomotora e prevenção de hipertermia",
          "Resfriamento físico passivo e ativo se temperatura axilar > 38,5°C",
          "Fisostigmina 0,5 a 2 mg IV lento em 5 min: antídoto específico de uso estrito sob monitorização contínua para delírio anticolinérgico grave refratário a benzodiazepínicos com QRS estritamente normal"
        ]
      }
    ]
  },
  "int_simp": {
    "l": "Toxídrome Simpaticomimética (Cocaína, Crack, Anfetaminas)",
    "s": [
      {
        "id": "sup",
        "t": "Hiperestimulação adrenérgica",
        "it": [
          "Quadro clínico: Taquicardia severa, crise hipertensiva, midríase fotorreagente, diaforese profusa (pele úmida — diferencial de anticolinérgico!), tremores e agitação psicomotora",
          "Avaliar sinais de complicações vasculares agudas: SCA / espasmo coronariano, dissecção aguda de aorta, AVC e rabdomiólise"
        ]
      },
      {
        "id": "esp",
        "t": "Controle simpático e contraindicação absoluta de betabloqueadores",
        "it": [
          "1ª Linha obrigatória: Benzodiazepínicos em doses generosas e repetidas (Diazepam 5–10 mg IV ou Midazolam 5 mg IV/IM a cada 5–10 min) até controle da agitação, FC e PA",
          "Crise hipertensiva persistente após sedação: Nitroglicerina IV ou Nitroprussiato de Sódio IV ou Fentolamina (bloqueador alfa direto)",
          "Dor torácica associada: tratar com Nitrato SL/IV + AAS 200 mg VO + Benzodiazepínico IV (ativar hemodinâmica se supra de ST persistente pós-nitrato)",
          "Hipertermia maligna (> 39–40°C): resfriamento ativo imediato com compressas de gelo e infusão de cristaloides gelados"
        ]
      }
    ]
  },
  "int_ser": {
    "l": "Síndrome Serotoninérgica (ISRS, IMAO, MDMA)",
    "s": [
      {
        "id": "sup",
        "t": "Critérios de Hunter para diagnóstico",
        "it": [
          "Verificar tríade: Alteração do estado mental (agitação, confusão) + Hiperatividade autonômica (diaforese, taquicardia, febre) + Hiperatividade neuromuscular (clônus espontâneo ou induzido, hiperreflexia patológica em MMII e rigidez)",
          "Avaliar temperatura central (hipertermia severa com risco de coagulopatia e falência de múltiplos órgãos)"
        ]
      },
      {
        "id": "esp",
        "t": "Terapêutica e antídoto específico",
        "it": [
          "Suspensão imediata de todos os agentes serotoninérgicos (antidepressivos, tramadol, fentanil, ondansetrona, linezolida)",
          "Benzodiazepínicos IV em doses tituladas (Diazepam 5–10 mg IV a cada 10 min) para controle muscular e tônus simpático",
          "Antagonista serotoninérgico específico: Ciproeptadina 12 mg VO/SNG dose de ataque, seguido de 2 mg a cada 2h se sintomas persistirem (ou manutenção 8 mg 6/6h)",
          "Hipertermia severa (> 41°C) ou rigidez torácica: Intubação em sequência rápida com bloqueador neuromuscular NÃO DESPOLARIZANTE (Rocurônio; Succinilcolina é CONTRAINDICADA pelo risco de hipercalemia maciça por rabdomiólise)"
        ]
      }
    ]
  },
  "int_ad": {
    "l": "Antidepressivos Tricíclicos (Amitriptilina, Nortriptilina)",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e cardiotoxicidade por bloqueio de canal de Na⁺",
        "it": [
          "Acesso venoso duplo e monitorização multiparamétrica contínua"
        ]
      },
      {
        "id": "esp",
        "t": "Alcalinização com Bicarbonato de Sódio 8,4%",
        "it": [
          "INDICAÇÃO DE BICARBONATO DE SÓDIO 8,4%: Complexo QRS > 100 ms, onda R > 3 mm em aVR, arritmias ventriculares ou hipotensão arterial refratária a fluidos",
          "Dose de ataque: Bicarbonato de Sódio 8,4% 1 a 2 mEq/kg (1–2 mL/kg da solução a 8,4%) IV em bólus rápido em 2–3 minutos",
          "Repetir bólus a cada 5–10 minutos até estreitamento do QRS (< 100 ms) e elevação do pH sérico para 7,45 a 7,55",
          "Manutenção: infusão contínua de 150 mEq de Bicarbonato em 850 mL de SG 5% a 150–200 mL/h, com dosagem seriada de gasometria e potássio sérico (repor K⁺ se hipocalemia induzida pela alcalose)",
          "Arritmias ventriculares refratárias: Lidocaína 1,0 a 1,5 mg/kg IV em bólus (antiarrítmico de escolha)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Eletrocardiograma seriado de 12 derivações: avaliar duração do QRS (> 100 ms) e amplitude da onda R em aVR (> 3 mm)",
          "Gasometria com dosagem de lactato e monitorização estrita de pH (alvo 7,45 a 7,55 sob bicarbonato)",
          "Painel metabólico: Eletrólitos (Sódio, Potássio), Glicemia e Função renal"
        ]
      }
    ]
  },
  "int_pcm": {
    "l": "Intoxicação por Paracetamol (Acetaminofeno)",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação de dose tóxica e tempo de exposição",
        "it": [
          "Calcular dose total ingerida: ingestão > 150 mg/kg (ou > 7,5 g em adultos) é potencialmente hepatotóxica",
          "Determinar o tempo exato decorrido desde a ingestão para interpretação no Nomograma de Rumack-Matthew"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia com N-Acetilcisteína (NAC) IV",
        "it": [
          "Protocolo de 21 horas de N-Acetilcisteína (NAC) IV:",
          "1ª Etapa (Ataque): 150 mg/kg diluídos em 200 mL de SG 5% infundidos em 1 hora",
          "2ª Etapa: 50 mg/kg diluídos em 500 mL de SG 5% infundidos nas 4 horas seguintes",
          "3ª Etapa: 100 mg/kg diluídos em 1.000 mL de SG 5% infundidos nas 16 horas seguintes",
          "Avaliar enzimas hepáticas (TGO/TGP) e coagulograma (INR) ao término da infusão antes de suspender"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Dosagem sérica quantitativa de Paracetamol coletada entre 4h e 24h pós-ingestão e plotada no Nomograma de Rumack-Matthew",
          "AST/TGO, ALT/TGP, Bilirrubinas, INR/TP, creatinina e gasometria com lactato"
        ]
      }
    ]
  },
  "int_cv": {
    "l": "Cardiotóxicos (Bloqueadores de Cálcio e Betabloqueadores)",
    "s": [
      {
        "id": "sup",
        "t": "Choque cardiogênico tóxico",
        "it": [
          "Bradicardia severa refratária com hipotensão profunda e colapso circulatório",
          "Diferencial laboratorial: Bloqueadores de Canal de Cálcio cursam frequentemente com HIPERGLICEMIA severa (inibição de insulina pancreática); Betabloqueadores cursam com normo ou hipoglicemia"
        ]
      },
      {
        "id": "esp",
        "t": "Protocolo escalonado de ressuscitação cardiotoxicológica",
        "it": [
          "Gluconato de Cálcio 10% 30–60 mL IV (ou Cloreto de Cálcio 10% 10–20 mL em cateter venoso central) em 5–10 min + Atropina 1 mg IV",
          "Glucagon 5 a 10 mg IV em 2–5 min seguido de infusão a 2–5 mg/h (mais eficaz em betabloqueadores por estímulo direto de AMPc)",
          "TERAPIA DE INSULINA EM ALTAS DOSES COM EUGLICEMIA (HIET): Insulina Regular 1 UI/kg IV em bólus + Glicose 50% 50 mL IV, seguido de infusão contínua de Insulina Regular a 1 UI/kg/h (titulando até 2–10 UI/kg/h) com SG 10% ou SG 50% contínuo para manter glicemia 150–250 mg/dL e monitorização horária de Potássio sérico (manter K⁺ 2,5–3,5 mEq/L sem reposição excessiva)",
          "EMULSÃO LIPÍDICA A 20% (Intralipid): bólus de 1,5 mL/kg IV em 2–3 min seguido de infusão a 0,25 mL/kg/min por 30–60 min se choque refratário ou PCR iminente",
          "Norepinefrina e Epinefrina em doses tituladas para manter PAM ≥ 65 mmHg"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Eletrocardiograma seriado de 12 derivações (monitorização de ritmo, intervalos PR e QTc)",
          "Glicemia capilar e sérica seriada de 1/1h a 2/2h (rastreio de hiperglicemia por BCC ou hipoglicemia por BB)",
          "Eletrólitos séricos (Potássio, Cálcio ionizado, Magnésio), Função renal e Gasometria com lactato"
        ]
      }
    ]
  }
};
