// ─── Protocolos Sindrômicos: NEUROLOGICO ───
const CT_NEUROLOGICO = {
  "neu": {
    "l": "Síndrome neurovascular (AVC / AIT)",
    "subExcl": [
      {
        "id": "avc_isq",
        "l": "AVC Isquêmico Agudo (AVCi)"
      },
      {
        "id": "avc_hem",
        "l": "AVC Hemorrágico (AVCh / HSA)"
      },
      {
        "id": "ait",
        "l": "Ataque Isquêmico Transitório (AIT)"
      }
    ],
    "subAdd": [
      {
        "id": "rnc",
        "l": "Rebaixamento de consciência associado"
      },
      {
        "id": "con",
        "l": "Crise convulsiva associada"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Triagem imediata e protocolo código AVC (AHA/ASA 2026)",
        "it": [
          "Ativação imediata do Código AVC e determinação estrita da UVVB (Última Vez Visto Bem)",
          "Acionamento prioritário da equipe de Neuroimagem / Radiologia para meta porta-TC < 20 minutos",
          "Glicemia capilar imediata na admissão (< 5 min)",
          "Avaliação e registro formal do escore NIHSS completo para determinar elegibilidade terapêutica",
          "Acesso venoso calibroso (18G) exclusivo, monitorização cardíaca contínua e oximetria de pulso (manter SpO₂ ≥ 94%)",
          "Jejum absoluto (NPO) rigoroso e teste formal de deglutição à beira-leito antes de qualquer oferta oral"
        ]
      },
      {
        "id": "sin",
        "t": "Manejo de suporte e neuroproteção",
        "it": [
          "Posicionamento no leito: manter cabeceira a 0° se AVCi sem sinais de hipertensão intracraniana (otimiza fluxo cerebral penumbral); elevar a 30° se suspeita de AVCh, vômitos ou risco de broncoaspiração",
          "Controle estrito de temperatura: tratar febre (Temp ≥ 37,5°C) imediatamente com Dipirona 1 g IV ou Paracetamol 1 g IV (hipertermia acelera a apoptose neuronal isquêmica)",
          "Controle glicêmico rigoroso: manter glicemia entre 140–180 mg/dL com insulina regular conforme escala; tratar hipoglicemia imediatamente (< 70 mg/dL)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar urgente",
        "it": [
          "TC de crânio sem contraste imediata: excluir sangramento intracraniano e avaliar precocemente o escore ASPECTS",
          "Angiotomografia arterial de crânio e vasos cervicais (AngioTC) em < 30 min se candidato a Trombectomia Mecânica (pesquisa de oclusão de grande vaso: carótida interna e ACM-M1)",
          "Hemograma completo, plaquetas, coagulograma (TP/INR, TTPa), glicemia e função renal",
          "ECG de 12 derivações na admissão: pesquisar fibrilação atrial aguda, isquemia miocárdica concomitante ou arritmias"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação obrigatória em Unidade de Cuidado Integral ao AVC (Unidade de AVC / UTI Neurológica)",
          "Acionamento urgente da Neurologia Vascular e da equipe de Neurorradiologia Intervencionista / Neurocirurgia"
        ]
      }
    ]
  },
  "avc_isq": {
    "l": "AVC Isquêmico Agudo (AVCi)",
    "s": [
      {
        "id": "sup",
        "t": "Manejo hemodinâmico e metas de pressão (AHA/ASA 2026)",
        "it": [
          "Controle de PA em candidatos a trombólise: ALVO PRÉ-LÍTICO < 185/110 mmHg. Administrar Labetalol 10–20 mg IV em bolus lento (1–2 min) OU Nicardipina 5–15 mg/h OU Nitroprussiato de Sódio se refratário",
          "Alvo pressórico pós-trombólise: MANTER PA < 180/105 mmHg nas primeiras 24h com monitorização a cada 15 min nas primeiras 2h, a cada 30 min por 6h e a cada 60 min até 24h",
          "Em NÃO candidatos a reperfusão: tolerar níveis de PA até 220/120 mmHg (permissive hypertension para perfusão da penumbra); tratar apenas se PA > 220/120 mmHg com redução cautelosa de 15% em 24h"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia de reperfusão química e endovascular (AHA/ASA 2026)",
        "it": [
          "Trombólise Endovenosa (Janela ≤ 4,5h do início dos sintomas / último visto bem): Tenecteplase (TNK) 0,25 mg/kg bolus IV único em 5–10 segundos (dose máxima de 25 mg) OU Alteplase (rtPA) 0,9 mg/kg IV (máx 90 mg; 10% bolus em 1 min e 90% restante em 60 min)",
          "Trombectomia Mecânica (TM): indicada até 6 horas para oclusão de grande vaso (carótida terminal ou segmento M1 da cerebral média) com ASPECTS ≥ 6; estendida até 24 horas se mismatch em neuroimagem (critérios DAWN/DEFUSE-3) ou núcleos isquêmicos extensos (large core ASPECTS 3–5)",
          "Estatina de alta potência imediata: Atorvastatina 80 mg VO dose de ataque (efeito pleiotrópico neuroprotetor e estabilizador de placa)",
          "Se NÃO candidato a trombólise nem TM com AVC menor (NIHSS ≤ 3) ou AIT de alto risco (ABCD2 ≥ 4): iniciar DAPT precoce (AAS 100 mg + Clopidogrel 300 mg dose de ataque, depois AAS 100 mg + Clopidogrel 75 mg/dia por 21 dias — Protocolo POINT/CHANCE)",
          "TC de crânio sem contraste de controle em 24 horas pós-trombólise (obrigatória antes de liberar qualquer antiplaquetário ou profilaxia para TVP farmacológica)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação etiológica e monitorização",
        "it": [
          "Ecocardiograma transtorácico com Doppler (± transesofágico) para pesquisa de fonte cardioembólica (trombo intracavitário, forame oval patente, endocardite)",
          "Doppler de carótidas e vertebrais se angioTC não realizada para avaliar estenose carotídea sintomática",
          "Holter 24h ou monitorização cardíaca hospitalar contínua para detecção de fibrilação atrial paroxística oculta",
          "Perfil lipídico, hemoglobina glicada (HbA1c) e função renal"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação obrigatória em Unidade de AVC (Stroke Unit) com vigilância neurológica rigorosa",
          "Fisioterapia motora e fonoaudiologia precoces (< 24–48h) após estabilização hemodinâmica"
        ]
      }
    ]
  },
  "avc_hem": {
    "l": "AVC Hemorrágico (AVCh / HSA)",
    "s": [
      {
        "id": "sup",
        "t": "Manejo inicial e neuroproteção na emergência",
        "it": [
          "Posicionamento com cabeceira elevada a 30° e cabeça em posição neutra (facilita drenagem venosa jugular e reduz a pressão intracraniana)",
          "Vigilância de proteção e patência de VA para necessidade de IOT se associada a sinais de HIC/herniação iminente, disfagia intensa/perda de reflexos protetores ou insuficiência respiratória (controle de PaCO₂ 35–40 mmHg se IOT indicada)",
          "Evitar hipotensão e hipoxemia (manter PAS > 110 mmHg durante intubação e SpO₂ ≥ 95%)"
        ]
      },
      {
        "id": "esp",
        "t": "Controle pressórico e reversão imediata de anticoagulantes (AHA 2026)",
        "it": [
          "Anti-hipertensivo IV contínuo: Nitroprussiato de Sódio 0,3–5 mcg/kg/min IV em BIC OU Nicardipina 5–15 mg/h OU Labetalol 10–20 mg IV a cada 10–20 min para manter PAS alvo entre 130 e 140 mmHg",
          "Reversão de Varfarina (INR > 1,4): Concentrado de Complexo Protrombínico 4 Fatores (4F-PCC) 25–50 UI/kg IV (correção em minutos) + Vitamina K 10 mg IV lento em 30 min (mantém síntese hepática)",
          "Reversão de Inibidores do Fator Xa (Rivaroxabana / Apixabana): Andexanet alfa IV ou 4F-PCC na dose fixa de 50 UI/kg IV (máx 4.000 UI)",
          "Reversão de Dabigatrana: Idarucizumabe 5 g IV (2 frascos de 2,5 g IV em bólus com intervalo de 15 min)",
          "Reversão de Heparina HNF: Sulfato de Protamina 1 mg para cada 100 UI de heparina administrada nas últimas 2 horas (dose máx 50 mg IV lento)",
          "Manejo de Hipertensão Intracraniana (HIC) aguda / herniação: Salina Hipertônica a 3% (150–250 mL IV em 15 min) OU Manitol 20% (0,5–1 g/kg IV em 20 min) como medida de resgate transitória"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e etiológica",
        "it": [
          "TC de crânio sem contraste imediata: mensurar volume do hematoma pela regra ABC/2 e calcular o ICH Score",
          "AngioTC de crânio imediata: pesquisa de \"Spot Sign\" (extravasamento ativo de contraste preditor de expansão do hematoma) e rastreio de malformações arteriovenosas (MAV) ou aneurismas rotos",
          "Coagulograma completo urgente: TP/INR, TTPa, plaquetas e tempo de trombina",
          "Painel toxicológico urinário (pesquisa de cocaína e anfetaminas em pacientes jovens sem histórico de HAS)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Acionamento emergencial da Neurocirurgia para drenagem ventricular externa (DVE se hidrocefalia aguda), craniectomia descompressiva ou evacuação de hematoma cerebelar (> 3 cm com compressão de tronco)",
          "Internação prioritária em UTI Neurocrítica"
        ]
      }
    ]
  },
  "ait": {
    "l": "Ataque Isquêmico Transitório (AIT)",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação imediata e estratificação de risco (ABCD2)",
        "it": [
          "Calcular o escore ABCD2 na admissão: Idade ≥ 60a (1pt); PA ≥ 140/90 mmHg (1pt); Fraqueza unilateral (2pts) ou Fala sem fraqueza (1pt); Duração ≥ 60 min (2pts) ou 10–59 min (1pt); Diabetes (1pt)",
          "Classificação: Baixo risco = 0–3 pontos (risco de AVC em 48h de ~1%); Alto risco = 4–7 pontos (risco de AVC em 48h de até 10%)",
          "Repouso e monitorização contínua de sinais vitais e ritmo cardíaco na sala de observação"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antiplaquetária e neuroproteção precoce (AHA 2026)",
        "it": [
          "Alto risco (ABCD2 ≥ 4) ou estenose vascular: DAPT IMEDIATA nas primeiras 24h com AAS 100–300 mg VO + Clopidogrel 300 mg VO (dose de ataque), seguido de AAS 100 mg + Clopidogrel 75 mg/dia por 21 dias",
          "Baixo risco (ABCD2 0–3): Monoterapia com AAS 100–200 mg VO ao dia",
          "Estatina de alta intensidade: Atorvastatina 80 mg VO dose única ao dia, independente do valor basal de colesterol",
          "Controle estrito de PA (meta ambulatorial < 130/80 mmHg após fase hiperaguda) e cessação imediata de tabagismo"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar urgente em < 24h",
        "it": [
          "Ressonância Magnética de Crânio (RM) com difusão (DWI)",
          "AngioTC ou AngioRM ou Doppler de artérias carótidas e vertebrais para pesquisa de estenose carotídea significativa (> 50–70% é indicação de endarterectomia/stent em < 7–14 dias)",
          "Ecocardiograma e monitorização eletrocardiográfica contínua (mínimo 24–48h) para descarte de fibrilação atrial"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "ABCD2 ≥ 4 ou déficit flutuante ou estenose carotídea > 50%: internação hospitalar para investigação acelerada",
          "ABCD2 ≤ 3 com exames de imagem e ECG normais: elegível para alta com investigação ambulatorial rápida (< 48h)"
        ]
      }
    ]
  },
  "rnc": {
    "l": "Rebaixamento de consciência / Coma",
    "subExcl": [
      {
        "id": "rnc_met",
        "l": "Encefalopatia Tóxico-Metabólica (Uremia, Hepática, Hipoglicemia)"
      },
      {
        "id": "rnc_hic",
        "l": "Hipertensão Intracraniana Aguda / Efeito de Massa / Herniação"
      },
      {
        "id": "rnc_inf",
        "l": "Meningoencefalite Aguda / Infecção SNC"
      }
    ],
    "subAdd": [
      {
        "id": "con",
        "l": "Crise epiléptica associada / EMENC"
      },
      {
        "id": "int",
        "l": "Intoxicação exógena associada"
      },
      {
        "id": "feb",
        "l": "Foco infeccioso / Sepse associada"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "MOMENTO ZERO: Manejo inicial do coma e proteção de via aérea (NCS)",
        "it": [
          "Posicionamento e aspiração de vias aéreas: decúbito lateral se sem suspeita de trauma cervical; cabeceira a 30° se suspeita de hipertensão intracraniana",
          "Vigilância de proteção e patência de VA para necessidade de IOT se RNC associada a HIC OU disfagia intensa OU insuficiência respiratória (Glasgow isolado não indica intubação mandatória em coma não-traumático)",
          "Glicemia capilar IMEDIATA na admissão (< 5 min)",
          "Monitorização contínua: oximetria de pulso (meta SpO₂ ≥ 94%), ECG contínuo, PA não invasiva a cada 5–15 min e temperatura central",
          "Coleta imediata de gasometria arterial e lactato sérico (pesquisar acidose metabólica grave com gap aumentado, hipóxia ou hipercapnia)"
        ]
      },
      {
        "id": "esp",
        "t": "MOMENTO ZERO: Terapêutica empírica reversível e neuroproteção inicial",
        "it": [
          "Hipoglicemia confirmada (Glicemia < 70 mg/dL): Tiamina 100 mg IV lento SEGUIDA IMEDIATAMENTE de Glicose a 50% 50 mL IV (25 g de glicose) em bólus; reavaliar dextro em 15 min",
          "Suspeita de toxídrome opioide (miose puntiforme + depressão respiratória + coma): Naloxona 0,04 a 0,4 mg IV/IM/IN, repetindo a cada 2–3 min até restauração do drive respiratório (dose de até 2 mg se parada iminente)",
          "Hipertensão Intracraniana (HIC) aguda / herniação iminente (anisocoria, tríade de Cushing, postura de descerebração): Salina Hipertônica 3% 150–250 mL IV em 15 min OU Manitol 20% 0,5–1 g/kg IV",
          "Suspeita de meningoencefalite (febre + rigidez de nuca + coma): Ceftriaxona 2 g IV 12/12h + Ampicilina 2 g IV 4/4h (se > 50 anos ou imunossuprimido) + Vancomicina 15–20 mg/kg 12/12h + Dexametasona 10 mg IV (iniciar ANTES ou junto do 1º ATB)"
        ]
      },
      {
        "id": "inv",
        "t": "MOMENTO ZERO: Investigação complementar urgente",
        "it": [
          "TC de crânio sem contraste em < 30 minutos: descartar hemorragia intracraniana, efeito de massa, hidrocefalia aguda e edema cerebral difuso",
          "Painel laboratorial completo: eletrólitos (Na, K, Ca ionizado, Mg), função renal (ureia, creatinina), função hepática e amônia sérica (encefalopatia hepática)",
          "Screening toxicológico urinário e sérico (álcool, benzodiazepínicos, opioides, antidepressivos, cocaína)",
          "Eletroencefalograma (EEG) urgente: mandatório se coma inexplicado sem lesão estrutural na TC para descartar Estado de Mal Epiléptico Não Convulsivo (EMENC)",
          "Punção lombar (PL) para análise bioquímica, citológica e microbiológica do líquor (realizar após TC descartar lesão expansiva com desvio de linha média)"
        ]
      },
      {
        "id": "dsp",
        "t": "MOMENTO ZERO: Disposição e leito monitorizado",
        "it": [
          "Internação imediata em leito de Terapia Intensiva (UTI geral ou neurocrítica)",
          "Acionamento prioritário da Neurologia / Neurocirurgia"
        ]
      }
    ]
  },
  "rnc_met": {
    "l": "Encefalopatia Tóxico-Metabólica (Uremia, Hepática, Hipoglicemia)",
    "s": [
      {
        "id": "sup",
        "t": "Suporte metabólico e correção hidroeletrolítica",
        "it": [
          "Manutenção de cabeceira a 30° e monitorização respiratória rigorosa (risco de broncoaspiração)",
          "Hidratação venosa criteriosa com cristaloides balanceados (evitar sobrecarga em nefropatas e hepatopatas)",
          "Controle glicêmico estrito com dextro seriada de 1/1h a 2/2h"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo específico por etiologia metabólica",
        "it": [
          "Encefalopatia Hepática: Lactulose 20–30 mL VO/SNG 8/8h (alvo: 2–3 evacuações pastosas/dia); Rifaximina 550 mg VO 12/12h como adjuvante se refratário; suspender diuréticos e sedativos",
          "Encefalopatia Urêmica: Indicação de Hemodiálise de urgência (critérios: acidose grave, hipercalemia refratária, sobrecarga volêmica, pericardite urêmica, uremia > 200 mg/dL)",
          "Hipoglicemia prolongada/refratária (induzida por sulfonilureia): Manter infusão contínua de SG 10% (evitar bólus repetidos de SG 50% isolados que estimulam secreção rebote de insulina); considerar Octreotida 50 mcg SC 12/12h",
          "Hiponatremia sintomática grave (Na < 120 mEq/L com coma ou convulsão): Cloreto de Sódio 3% 100–150 mL IV em 10–20 min; repetir até 2x se persistência de sintomas; limitar elevação máxima de Na a 8–10 mEq/L em 24h"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar metabólica",
        "it": [
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Lactato sérico seriado",
          "Amônia sérica (na suspeita de encefalopatia hepática)",
          "Enzimas hepáticas (TGO, TGP), bilirrubinas totais e frações, albumina e INR",
          "EAS / Urocultura e Radiografia de tórax (pesquisa de foco infeccioso descompensador)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em Unidade de Terapia Intensiva (UTI) ou Semi-intensiva até estabilidade metabólica e resolução do coma",
          "Avaliação conjunta com Nefrologia (se hemodiálise de urgência) ou Gastroenterologia/Hepatologia"
        ]
      }
    ]
  },
  "rnc_hic": {
    "l": "Hipertensão Intracraniana Aguda / Efeito de Massa / Herniação",
    "s": [
      {
        "id": "sup",
        "t": "Neuroproteção e suporte hemodinâmico estrito (Neurocritical Care Society)",
        "it": [
          "Medidas de tratamento para HIC: Cabeceira elevada a 30; PAM alvo de 65 ou mais; pCO2 alvo entre 35-45; meta de glicemia 140-180; alvo de saturação 94% ou mais; evitar e tratar agressivamente a febre; controle rigoroso de dor e agitação para evitar elevações da PIC e dano neurológico secundário"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia hiperosmolar de emergência e controle de crise",
        "it": [
          "Salina Hipertônica 3% 150 a 250 mL IV em bólus rápido (10–15 min)",
          "Manitol 20% 0,5 a 1,0 g/kg IV em infusão rápida (15–20 min) como alternativa osmolar (evitar se PAS < 90 mmHg ou hipotensão franca; monitorar osmolaridade sérica < 320 mOsm/L)",
          "Anticonvulsivante profilático: Levetiracetam 20–30 mg/kg IV (máx 3.000 mg) ou Fenitoína 20 mg/kg IV para prevenir crises epilépticas que elevam dramaticamente a PIC"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar urgente",
        "it": [
          "TC de Crânio imediata sem contraste (< 15–20 min): avaliar desvio de linha média (> 5 mm é critério cirúrgico), apagamento de cisternas da base, efeito de massa e hematomas",
          "Angiotomografia arterial e venosa de crânio (AngioTC) para avaliar etiologia vascular (malformações, aneurismas rotos, trombose venosa de seio dural)",
          "POCUS da Bainha do Nervo Óptico (DNO): mensurar diâmetro retrobulbar a 3 mm da retina (valor > 5,8–6,0 mm possui alta sensibilidade para PIC > 20 mmHg)",
          "Eletrólitos com sódio sérico e osmolaridade sérica de 2/2h a 4/4h durante terapia hiperosmolar",
          "Laboratório de urgência: Gasometria com lactato e pCO2, Glicemia, Hemograma completo e Coagulograma (TP/INR, TTPa)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Acionamento IMEDIATO da Neurocirurgia de plantão para avaliação cirúrgica emergencial (craniectomia descompressiva, drenagem de hematoma ou DVE)",
          "Internação obrigatória em leito de UTI Neurocrítica com linha arterial instalada para monitorização invasiva contínua de PAM e PPC"
        ]
      }
    ]
  },
  "rnc_inf": {
    "l": "Meningoencefalite Aguda / Infecção SNC",
    "s": [
      {
        "id": "sup",
        "t": "Isolamento e estabilização de via aérea",
        "it": [
          "Instalar isolamento de contato e gotículas imediatamente na chegada à sala de emergência",
          "Proteção de via aérea com intubação orotraqueal se Glasgow ≤ 8 ou hipoxemia / instabilidade hemodinâmica",
          "Estabilização hemodinâmica com cristaloides (Ringer Lactato) e norepinefrina se sinais de choque séptico"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antimicrobiana e adjuvante de emergência (< 1 hora)",
        "it": [
          "Dexametasona 10 mg IV em bólus a cada 6h por 4 dias (iniciar antes ou junto com o antibiótico; reduz sequelas auditivas e mortalidade no Pneumococo)",
          "Ceftriaxona 2 g IV de 12/12h (dose meníngea plena para Streptococcus pneumoniae e Neisseria meningitidis)",
          "Ampicilina 2 g IV de 4/4h: ADICIONAR obrigatoriamente se idade > 50 anos, imunossuprimido, etilista, neoplasia ou gestante (cobertura empírica para Listeria monocytogenes)",
          "Vancomicina 15–20 mg/kg IV de 12/12h: associar se suspeita de Pneumococo resistente à penicilina, internação prévia recente ou foco de cateter/pós-operatório",
          "Aciclovir 10 mg/kg IV de 8/8h: associar IMEDIATAMENTE se encefalite (confusão mental proeminente, crises epilépticas focais, alterações comportamentais, febre) para cobertura de Herpes Simplex (HSV-1)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e líquor urgente",
        "it": [
          "Coleta imediata de 2 pares de hemoculturas pareadas de sítios distintos ANTES da infusão de antimicrobianos",
          "Laboratório de urgência: Hemograma completo com plaquetas, Coagulograma (TP/INR, TTPa), Ureia, Creatinina, Eletrólitos e Gasometria com dosagem de lactato",
          "Indicações de TC de crânio ANTES da punção lombar: Glasgow < 12, imunossupressão, déficit focal novo, crise convulsiva recente (< 1 semana), papiledema ou história de lesão do SNC",
          "Punção Lombar (PL) urgente (se sem contraindicações): citologia e contagem celular, glicose e proteínas, lactato liquórico, bacterioscopia (Gram), cultura com TSA, látex/antígenos bacterianos e PCR Multiplex (painel viral e bacteriano meningoencefálico)",
          "Glicemia sérica concomitante à punção lombar (para cálculo da relação glicose líquor/sangue; relação < 0,4 é típica de infecção bacteriana ou fúngica)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação obrigatória em leito de Terapia Intensiva (UTI) em isolamento de gotículas",
          "Notificação compulsória imediata à Vigilância Epidemiológica (meningite é agravo de notificação rápida)"
        ]
      }
    ]
  },
  "cef": {
    "l": "Cefaleia",
    "subExcl": [
      {
        "id": "cef_prim",
        "l": "Suspeita de cefaleia primária"
      },
      {
        "id": "cef_hsa",
        "l": "Suspeita de HSA"
      },
      {
        "id": "cef_men",
        "l": "Meningoencefalite"
      },
      {
        "id": "cef_tvc",
        "l": "Trombose venosa cerebral"
      },
      {
        "id": "cef_dac",
        "l": "Dissecção de artéria cervical"
      },
      {
        "id": "cef_avch",
        "l": "AVC hemorrágico"
      },
      {
        "id": "cef_ppl",
        "l": "Cefaleia pós-punção dural"
      },
      {
        "id": "cef_hii",
        "l": "Hipertensão intracraniana idiopática"
      },
      {
        "id": "cef_tce",
        "l": "Cefaleia pós-TCE"
      },
      {
        "id": "cef_sin",
        "l": "Rinossinusite aguda"
      },
      {
        "id": "cef_trig",
        "l": "Neuralgia do trigêmeo"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Triagem / monitorização",
        "it": [
          "Monitor de sinais vitais e EVA na chegada",
          "Documentar escala de dor e resposta à analgesia a cada 30 minutos",
          "Acesso venoso periférico se houver indicação de medicação IV ou exames com contraste",
          "Avaliação neurológica focada (Glasgow, pupilas, força, fala, marcha)",
          "Alocar em ambiente calmo, com pouca luz e sem ruídos, se hipótese de cefaleia migranosa"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia inespecífica",
        "it": [
          "Dipirona 2 g EV agora",
          "Cetoprofeno 100 mg EV agora (ou outro AINE)",
          "Dexametasona 10 mg EV agora se suspeita de cefaleia migranosa",
          "Metoclopramida 10 mg IV",
          "Hidratação EV parcimoniosa se sinais de desidratação"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "TC de crânio sem contraste em < 1h se ≥ 1 sinal de alarme (SNNOOP10)",
          "Punção lombar após TC normal se HSA suspeita (especialmente > 6h do início)",
          "Laboratório de admissão completo para triagem de disfunções orgânicas; coagulograma e culturas se suspeita de meningite ou sepse",
          "AngioTC se TC normal mas suspeita persistente de HSA, dissecção ou TVC",
          "Glicemia capilar",
          "Considerar NS1 se clínica sugestiva de dengue"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta médica após melhora da queixa",
          "Observação 4–6h se alarme isolado com TC negativa, melhora parcial ou dúvida diagnóstica",
          "Internação se Glasgow alterado, déficit focal, suspeita de HSA / meningite / TVC / dissecção ou dor refratária",
          "Encaminhamento à neurologia ambulatorial se ≥ 4 crises/mês, cefaleia diária persistente, padrão atípico ou primeira crise > 50 anos",
          "Retorno imediato se cefaleia que piora, febre, déficit novo ou alteração de consciência",
          "Orientar diário de cefaleia, identificação de gatilhos e uso racional de analgésicos"
        ]
      }
    ]
  },
  "cef_prim": {
    "l": "Suspeita de cefaleia primária",
    "s": [
      {
        "id": "esp",
        "t": "Terapia direcionada",
        "it": [
          "Sumatriptano 6 mg SC ou 50–100 mg VO se enxaqueca provável e sem contraindicações",
          "Clorpromazina 12,5–25 mg EV em 100 mL SF em 30 min",
          "O₂ 100% por máscara não-reinalante 12–15 L/min por 15–20 min",
          "Bloqueio do nervo occipital maior com lidocaína 2% (2–3 mL bilateral)",
          "Considerar bloqueio do gânglio esfenopalatino"
        ]
      },
      {
        "id": "dsp",
        "t": "Alta e orientação",
        "it": [
          "Receita de analgésico de resgate (paracetamol 750 mg ou ibuprofeno 400 mg até 8/8h por ≤ 2–3 dias)",
          "Receita de antiemético VO/SL (metoclopramida ou ondansetrona) se vômitos",
          "Receita de triptano de resgate VO se padrão migranoso recorrente",
          "Orientar diário de cefaleia (frequência, intensidade, gatilhos, resposta)",
          "Limitar analgésicos a < 10–15 dias/mês para evitar cefaleia por uso excessivo",
          "Encaminhar à neurologia ambulatorial se ≥ 4 crises/mês, refratariedade ou indicação de profilaxia",
          "Medidas não farmacológicas: sono regular, hidratação, manejo de estresse, evitar gatilhos"
        ]
      }
    ]
  },
  "cef_hsa": {
    "l": "Suspeita de HSA",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação imediata",
        "it": [
          "Monitor cardíaco + oximetria contínua + acesso venoso ≥ 18G em todos os casos",
          "Aferir PA em ambos os MMSS",
          "Glasgow + escala WFNS (Hunt-Hess) para estratificação prognóstica",
          "Cabeceira elevada a 30° se rebaixamento ou suspeita de PIC alta",
          "Jejum até definição de procedimento"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo medicamentoso",
        "it": [
          "Nimodipina 60 mg VO 4/4h por 21 dias",
          "Controle pressórico se PAS > 160 mmHg: nitroprussiato de sódio 0,5–10 mcg/kg/min EV contínuo, titulado conforme alvo. Alvo PAS 140–160 antes do clipping; depois, 140–180",
          "Analgesia: dipirona 2 g EV + paracetamol 1 g EV. Evitar AAS / AINE (risco hemorrágico)",
          "Antiemético: ondansetrona 4–8 mg EV (preferência sobre metoclopramida em pacientes com risco neurológico)",
          "Anticonvulsivante de resgate apenas se crise convulsiva documentada (Fenitoína 20 mg/kg EV em infusão lenta ou Levetiracetam 60 mg/kg EV; não indicada profilaxia rotineira)",
          "Reversão de anticoagulação se em uso (vitamina K, complexo protrombínico, idarucizumabe, andexanet — conforme agente)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "TC de crânio sem contraste em < 30 min da chegada",
          "Punção lombar se TC negativa e suspeita persistente, especialmente > 6h do início",
          "AngioTC cerebral assim que HSA confirmada",
          "Arteriografia digital se AngioTC inconclusiva ou planejamento endovascular",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h)",
          "Doppler transcraniano seriado para monitorar vasoespasmo (dia 3–14)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Ativar neurocirurgia / hemodinâmica imediatamente após confirmação",
          "Internação em UTI neurológica em todos os casos",
          "Hidratação para euvolemia (não hipervolemia — abandonada nos guidelines recentes)",
          "Monitorar diurese, Na sérico 6/6h, lactato",
          "Iniciar prevenção de TVP com compressão pneumática; HBPM somente após segurança da hemostasia (geralmente > 24h pós-tratamento do aneurisma)"
        ]
      }
    ]
  },
  "cef_men": {
    "l": "Meningoencefalite",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação imediata",
        "it": [
          "Isolamento respiratório por gotículas até descartar meningite meningocócica (primeiras 24h de ATB)",
          "Monitor + acesso venoso ≥ 18G + jejum"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo medicamentoso",
        "it": [
          "Dexametasona 10 mg EV imediatamente antes ou junto da 1ª dose de ATB",
          "Ceftriaxona 2 g EV 12/12h + Vancomicina 15–20 mg/kg EV 8/8h",
          "Adicionar Ampicilina 2 g EV 4/4h se > 50 anos, imunossuprimido ou gestante (cobertura para Listeria)",
          "Aciclovir 10 mg/kg EV 8/8h se suspeita de encefalite herpética (alteração de comportamento/cognição, convulsão, febre, LP com perfil viral)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "TC de crânio antes da LP se: Glasgow < 11, déficit focal, papiledema, convulsão recente, imunossupressão grave, > 60 anos",
          "Punção lombar com manometria assim que possível",
          "Hemoculturas (2 pares) antes do ATB se sem atraso > 45 min",
          "Hemograma, função renal, hepática, eletrólitos, lactato sérico, gasometria, coagulograma",
          "NS1 / sorologia para dengue se contexto epidemiológico",
          "Considerar HIV teste rápido se status sorológico desconhecido"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em UTI se GCS ≤ 12, convulsão, sinais de choque, instabilidade hemodinâmica ou sinais de HIC",
          "Internação em enfermaria com isolamento se estável",
          "Notificação compulsória à vigilância epidemiológica (meningite é doença de notificação imediata)",
          "Profilaxia para contatos íntimos se meningite meningocócica confirmada: rifampicina 600 mg VO 12/12h por 2 dias OU ciprofloxacino 500 mg VO dose única OU ceftriaxona 250 mg IM dose única",
          "Acompanhamento neurológico após alta (avaliar sequelas auditivas, cognitivas, motoras)",
          "Considerar vacinação após recuperação se etiologia bacteriana imunoprevenível"
        ]
      }
    ]
  },
  "cef_tvc": {
    "l": "Trombose venosa cerebral",
    "s": [
      {
        "id": "inv",
        "t": "Diagnóstico por neuroimagem e laboratório",
        "it": [
          "AngioTC venosa ou Angio-RM venosa de crânio: padrão-ouro para defeito de enchimento dos seios durais",
          "TC de crânio sem contraste imediata: rastreio de infarto venoso hemorrágico ou edema cerebral",
          "Coagulograma completo (TP/INR, TTPa), D-dímero sérico e hemograma completo"
        ]
      }
    ]
  },
  "cef_dac": {
    "l": "Dissecção de artéria cervical",
    "s": [
      {
        "id": "inv",
        "t": "Diagnóstico vascular",
        "it": [
          "Angiotomografia arterial cervical e de crânio (AngioTC) ou Angio-RM: método de escolha para visualização de hematoma intramural e flap intimal"
        ]
      }
    ]
  },
  "cef_avch": {
    "l": "AVC hemorrágico",
    "s": []
  },
  "cef_ppl": {
    "l": "Cefaleia pós-punção dural",
    "s": []
  },
  "cef_hii": {
    "l": "Hipertensão intracraniana idiopática",
    "s": [
      {
        "id": "inv",
        "t": "Investigação diagnóstica",
        "it": [
          "Ressonância Magnética de Crânio com Angio-RM venosa (excluir lesão expansiva e TVC)",
          "Punção Lombar diagnóstica com manometria de pressão de abertura (pressão > 25 cmH2O)",
          "Fundoscopia / POCUS da bainha do nervo óptico para avaliação de papiledema"
        ]
      }
    ]
  },
  "cef_tce": {
    "l": "Cefaleia pós-TCE",
    "s": [
      {
        "id": "inv",
        "t": "Neuroimagem de emergência",
        "it": [
          "TC de crânio sem contraste imediata: descartar hematoma subdural, epidural, contusão hemorrágica e fratura de crânio conforme critérios de Ottawa/New Orleans"
        ]
      }
    ]
  },
  "cef_sin": {
    "l": "Rinossinusite aguda",
    "s": []
  },
  "cef_trig": {
    "l": "Neuralgia do trigêmeo",
    "s": []
  },
  "con": {
    "l": "Convulsão / Estado de Mal Epiléptico",
    "subAdd": [
      {
        "id": "rnc",
        "l": "Rebaixamento pós-ictal prolongado / Coma"
      },
      {
        "id": "feb",
        "l": "Febre / Suspeita de infecção de SNC"
      },
      {
        "id": "int",
        "l": "Intoxicação / Abstinência associada"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Manejo inicial e fase de estabilização (0–5 min)",
        "it": [
          "Proteção imediata contra trauma: posicionamento em decúbito lateral para evitar broncoaspiração, aspiração suave de secreções e remoção de objetos ao redor (NUNCA introduzir objetos ou dedos na boca)",
          "Oxigenoterapia suplementar sob máscara não reinalante a 10–15 L/min (manter SpO₂ ≥ 94%; a hipoxemia durante a crise agrava lesão neuronal)",
          "Acesso vascular calibroso e coleta imediata de glicemia capilar (< 5 min)",
          "Se hipoglicemia (glicemia < 70 mg/dL): administrar Tiamina 100 mg IV seguido de Glicose 50% 50 mL IV em bólus",
          "Monitorização contínua de ECG, SpO₂ e pressão arterial"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia farmacológica escalonada por fases (AES / Neurocritical Care)",
        "it": [
          "Benzodiazepínicos de 1ª linha: Midazolam 10 mg IM (se peso > 40 kg; 5 mg se 13–40 kg) se sem acesso venoso OU Diazepam 10 mg IV (0,15–0,2 mg/kg) lento em 2 min OU Lorazepam 4 mg IV lento; repetir uma única dose em 5–10 min se crise mantida",
          "Antiepilépticos IV de 2ª linha (iniciar se crise > 5 min apesar do benzo): Levetiracetam 60 mg/kg IV em 10 min (dose máx 4.500 mg — 1ª escolha por ausência de cardiotoxicidade e interações)",
          "Alternativas na Fase 2: Valproato de Sódio 40 mg/kg IV em 10 min (máx 3.000 mg) OU Fosfenitoína / Fenitoína 20 mg/kg IV (máx 1.500 mg) infundida em SF a < 50 mg/min com monitorização de ECG/PA",
          "Estado de Mal Epiléptico Refratário: Intubação orotraqueal imediata com sequência rápida + anestésicos IV contínuos em BIC para supressão de surtos no EEG",
          "Opções de infusão na Fase 3: Propofol (bolus 1–2 mg/kg seguido de 2–10 mg/kg/h) OU Midazolam (bolus 0,2 mg/kg seguido de 0,1–2 mg/kg/h) OU Cetamina (bolus 1–2 mg/kg seguido de 1–5 mg/kg/h)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar etiológica",
        "it": [
          "Painel metabólico urgente: glicemia, sódio sérico (pesquisar hiponatremia aguda como gatilho), cálcio ionizado, magnésio, ureia, creatinina e gasometria com lactato",
          "Dosagem de níveis séricos de drogas antiepilépticas de uso crônico (pesquisar subdosagem ou interrupção inadvertida)",
          "TC de crânio sem contraste de urgência: indicada em primeira crise convulsiva na vida, déficit neurológico pós-ictal persistente (paresia de Todd > 2h), história de trauma craniano ou neoplasia prévia",
          "Eletroencefalograma (EEG) precoce: essencial se rebaixamento de consciência não recuperado para excluir Estado de Mal Epiléptico Não Convulsivo (EMENC)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Estado de mal epiléptico ou necessidade de segunda linha de antiepilépticos: internação obrigatória em UTI",
          "Primeira crise convulsiva isolada com TC e laboratório normais e exame neurológico restaurado: observação por 4–6h e encaminhamento ambulatorial à Neurologia",
          "Crise em epiléptico conhecido por falha terapêutica transitória corrigida: ajuste posológico e alta orientada após recuperação plena"
        ]
      }
    ]
  }
};
