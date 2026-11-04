// ─── Protocolos Sindrômicos: CARDIOVASCULAR ───
const CT_CARDIOVASCULAR = {
  "dtx": {
    "l": "Dor torácica",
    "subExcl": [
      {
        "id": "dt_ind",
        "l": "Dor torácica indiferenciada / Em investigação"
      },
      {
        "id": "sca_oca",
        "l": "SCA — OCA (Oclusão / Equivalente STEMI)"
      },
      {
        "id": "sca_noca",
        "l": "SCA — NOCA (Não-Oclusão / NSTEMI)"
      },
      {
        "id": "dt_ncard",
        "l": "Não Cardíaca / Pleurítica / Inflamatória"
      },
      {
        "id": "dt_baixo",
        "l": "Baixa Probabilidade / Musculoesquelética"
      }
    ],
    "subAdd": [
      {
        "id": "diss",
        "l": "Dissecção aguda de aorta"
      },
      {
        "id": "tep",
        "l": "Tromboembolismo pulmonar (TEP)"
      },
      {
        "id": "pntx",
        "l": "Pneumotórax hipertensivo"
      },
      {
        "id": "peri",
        "l": "Tamponamento cardíaco / Pericardite"
      },
      {
        "id": "esof",
        "l": "Ruptura esofágica (Boerhaave)"
      },
      {
        "id": "pnm",
        "l": "Pneumonia / Infecção pulmonar"
      },
      {
        "id": "disp",
        "l": "Dispepsia / Refluxo gastroesofágico"
      }
    ],
    "s": []
  },
  "dt_ind": {
    "l": "Dor torácica indiferenciada / Em investigação",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e suporte inicial",
        "it": [
          "Monitorização cardíaca contínua (ECG, SatO₂, PA não-invasiva)",
          "ECG de 12 derivações realizado e interpretado em < 10 min da admissão",
          "Repetir ECG a cada 15–30 min se dor persistente, recorrência ou alteração clínica",
          "Acesso venoso periférico calibroso (18G ou 16G em MSD)",
          "Oxigenoterapia apenas se SatO₂ < 90%"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia e alívio sintomático",
        "it": [
          "Dipirona 1–2 g IV lento se dor leve a moderada",
          "Nitrato SL (Isossorbida 5 mg) se dor isquêmica persistente e PAS > 100 mmHg [CONTRAINDICADO se uso de inibidor de PDE-5 em 24–48h ou suspeita de IAM de VD]",
          "Morfina 2–4 mg IV titulada apenas para dor intensa refratária [atenção: retarda absorção de antiplaquetários orais]"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação laboratorial e imagem",
        "it": [
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h)",
          "Radiografia de tórax PA e perfil no leito (avaliar mediastino alargado, pneumotórax, congestão)",
          "POCUS focado: contratilidade segmentar VE, sobrecarga de VD, derrame pericárdico e raiz da aorta",
          "D-dímero se suspeita de TEP (Wells ≥ 2) ou protocolo ADD-RS de dissecção aórtica"
        ]
      },
      {
        "id": "dsp",
        "t": "Estratificação de risco e disposição",
        "it": [
          "Calcular escores de risco na admissão: HEART Score e EDACS",
          "Dor torácica sem OCA: HEART ≤ 3 + hs-cTn normal em 0h/1h indica baixo risco para MACE (< 1%), observação e seguimento ambulatorial",
          "Dor torácica sem OCA: HEART 4–6 indica risco intermediário, observação monitorizada por 6–12h com troponina seriada",
          "Dor torácica sem OCA: HEART ≥ 7 ou troponina dinâmica positiva indica alto risco, internação em leito monitorizado/UTI e coronariografia"
        ]
      }
    ]
  },
  "sca": {
    "l": "Síndrome coronariana aguda (ver Dor Torácica)",
    "subExcl": [
      {
        "id": "sca_oca",
        "l": "OCA (Oclusão / Equivalente STEMI)"
      },
      {
        "id": "sca_noca",
        "l": "NOCA (Não-Oclusão / NSTEMI)"
      }
    ],
    "s": []
  },
  "sca_oca": {
    "l": "SCA — OCA (Oclusão / Equivalente STEMI)",
    "s": [
      {
        "id": "sup",
        "t": "Ativação imediata e suporte",
        "it": [
          "Ativar equipe de hemodinâmica imediatamente",
          "Desfibrilador bifásico colado e pronto à beira-leito",
          "ECG de 12 derivações em até 10 min [SBC/AHA Classe I] com derivações direitas (V3R, V4R) e posteriores (V7–V9)"
        ]
      },
      {
        "id": "esp",
        "t": "Antiagregação, anticoagulação e reperfusão (ESC 2023/2024)",
        "it": [
          "AAS 200–300 mg VO mastigado imediatamente (ou 150–250 mg IV)",
          "Inibidor P2Y12 imediato (ICP iminente): Ticagrelor 180 mg VO (1ª escolha) OU Prasugrel 60 mg VO (se anatomia coronariana conhecida, sem AVC prévio e peso > 60 kg). Clopidogrel 300–600 mg apenas se contraindicação",
          "Anticoagulação: Enoxaparina 30 mg IV bolus + 1 mg/kg SC após 15 min [se ≥ 75 anos: sem bolus IV, 0,75 mg/kg SC 12/12h; se ClCr < 30: 1 mg/kg SC 24/24h] OU HNF 70–100 UI/kg IV bolus (máx 5.000 UI)",
          "Trombólise com Tenecteplase (TNK) bolus único em 5–10s se ICP indisponível em < 120 min (iniciar < 30 min da chegada). Dose por peso: <60kg→30mg; 60–69kg→35mg; 70–79kg→40mg; 80–89kg→45mg; ≥90kg→50mg [se ≥ 75 anos: reduzir dose em 50%]",
          "Estatina de alta potência imediata: Atorvastatina 80 mg VO ou Rosuvastatina 40 mg VO"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Painel Laboratorial de Urgência: Troponina ultrassensível, Função renal (ureia e creatinina) para contraste iodado, Eletrólitos (sódio, potássio, magnésio), Hemograma completo, Coagulograma (TP/INR, TTPa) e Glicemia"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição e encaminhamento",
        "it": [
          "Transferência direta para a sala de hemodinâmica (porta-balão < 90 min)",
          "Se trombólise realizada: transferir imediatamente para centro terciário com hemodinâmica (estratégia farmacoinvasiva em 2–24h)",
          "Internação pós-angioplastia primária em Unidade de Terapia Intensiva Coronariana (UCO)",
          "Equivalentes STEMI que exigem conduta de OCA: Padrão de De Winter, Wellens tipo A/B evolutivo, Sgarbossa modificado de Smith em BRE/marcapasso, supra em aVR com infra difuso"
        ]
      }
    ]
  },
  "sca_noca": {
    "l": "SCA — NOCA (Não-Oclusão / NSTEMI)",
    "s": [
      {
        "id": "sup",
        "t": "Estratificação de risco e vigilância",
        "it": [
          "Calcular escore GRACE 2.0 na admissão para definir timing de coronariografia invasiva",
          "Repouso no leito durante a fase de dor ativa"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antitrombótica e anti-isquêmica (ESC 2023/2024)",
        "it": [
          "AAS 200–300 mg VO mastigado na admissão",
          "Anticoagulação plena: Enoxaparina 1 mg/kg SC 12/12h (1ª escolha) OU Fondaparinux 2,5 mg SC 1×/dia OU HNF IV",
          "Estratégia P2Y12 no NSTEMI (ESC 2023): NÃO pré-tratar de rotina com P2Y12 se estratificação invasiva precoce (< 24h) planejada; carregar Ticagrelor 180 mg VO se estratégia conservadora ou atraso no cateterismo",
          "Nitrato IV (Nitroglicerina 10–200 mcg/min) se dor isquêmica persistente e PAS > 100 mmHg [evitar se uso de inibidor PDE-5]",
          "Betabloqueador VO precoce (Metoprolol 25–50 mg VO ou Carvedilol 6,25 mg VO) se FC > 70 bpm, sem sinais de IC descompensada ou BAV",
          "Atorvastatina 80 mg VO dose de ataque"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Protocolo 0h/1h ESC: estratificação por curva dinâmica de troponina ultrassensível seriada",
          "Painel Laboratorial de Urgência: Hemograma completo, Função renal (ureia e creatinina), Eletrólitos (sódio, potássio, magnésio), Glicemia e Coagulograma (TP/INR, TTPa)",
          "Ecocardiograma transtorácico em < 24h para avaliação de FEVE e valvopatias"
        ]
      },
      {
        "id": "dsp",
        "t": "Timing de intervenção coronariana por GRACE",
        "it": [
          "Estratégia invasiva muito precoce (< 2h): instabilidade hemodinâmica, choque cardiogênico, arritmias ventriculares malignas ou dor refratária",
          "Estratégia invasiva precoce (< 24h): GRACE > 140, elevação/queda dinâmica de troponina ou alterações dinâmicas do segmento ST",
          "Estratégia invasiva seletiva (< 72h): GRACE 109–140 ou pacientes de risco intermediário",
          "Baixo risco (GRACE < 109, troponinas normais seriadas): teste funcional não invasivo ambulatorial"
        ]
      }
    ]
  },
  "dt_ncard": {
    "l": "Não Cardíaca / Pleurítica / Inflamatória",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e exame focado",
        "it": [
          "Exame físico torácico focado: atrito pleural, atrito pericárdico, percussão torácica e ausculta pulmonar comparativa",
          "Pesquisar sinais de TEP (taquicardia desproporcional, taquipneia, dor pleurítica súbita)"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia direcionada",
        "it": [
          "Cetoprofeno 100 mg IV ou Cetorolaco 30 mg IV"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação etiológica",
        "it": [
          "Radiografia de tórax no leito para rastreio de pneumopatias e derrame pleural",
          "Eletrocardiograma de 12 derivações para exclusão de alterações isquêmicas ou de repolarização",
          "D-dímero quantitativo se probabilidade clínica intermediária/alta de TEP (Wells ≥ 2)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta orientada se dor controlada, sinais vitais normais e causas graves descartadas",
          "Internação ou seguimento ambulatorial conforme foco (pleurite viral, pneumonia comunitária, derrame pleural)"
        ]
      }
    ]
  },
  "dt_baixo": {
    "l": "Baixa Probabilidade / Musculoesquelética",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação inicial",
        "it": [
          "Palpação dirigida de arcos costais, articulações condroesternais e musculatura paravertebral",
          "Reprodução precisa dos sintomas à palpação ou movimentação do tronco (sugestivo de síndrome de Tietze/miofascial)"
        ]
      },
      {
        "id": "sin",
        "t": "Tratamento sintomático",
        "it": [
          "Anti-inflamatório oral (Ibuprofeno 400 mg VO 8/8h por 3–5 dias) se dor condroesternal e sem contraindicações",
          "Calor local úmido na região dolorosa"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Eletrocardiograma de 12 derivações para documentar ausência de isquemia aguda",
          "Troponina ultrassensível (0h) para cálculo e validação de escores de descarte rápido (HEART / EDACS)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Critérios de descarte rápido por HEART Score ≤ 3 e troponina normal",
          "Alta com analgésicos orais e orientações claras de retorno se surgirem opressão, irradiação, dispneia ou diaforese"
        ]
      }
    ]
  },
  "disp": {
    "l": "Dispepsia / Refluxo gastroesofágico",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação e triagem",
        "it": [
          "Exclusão mandatória de SCA",
          "Posicionamento em cabeceira elevada a 30–45°"
        ]
      },
      {
        "id": "sin",
        "t": "Alívio farmacológico",
        "it": [
          "Omeprazol 40 mg IV em bolus ou Pantoprazol 40 mg IV",
          "Hidróxido de Alumínio / Magnésio 10–15 mL VO",
          "Dimeticona / Simeticona 40 gotas VO se plenitude pós-prandial ou meteorismo"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Alta com prescrição ambulatorial de IBP (Omeprazol 40 mg/dia pela manhã) se ECG e troponinas normais e dor controlada",
          "Encaminhamento para Endoscopia Digestiva Alta (EDA) eletiva ambulatorial",
          "Orientar retorno imediato se opressão retroesternal, irradiação para mandíbula/braço, síncope ou diaforese"
        ]
      }
    ]
  },
  "diss": {
    "l": "Dissecção de aorta",
    "s": [
      {
        "id": "sup",
        "t": "Monitorização e estabilização",
        "it": [
          "Dois acessos calibrosos ≥ 16G; PA não invasiva contínua em ambos os MMSS (assimetria > 20 mmHg sugestiva)",
          "Suporte O2 alvo SatO2 ≥ 94%; analgesia agressiva (morfina 2–5 mg IV) reduz tônus simpático e progressão",
          "Avaliar comprometimento de ramos: pulsos distais, déficit neurológico, isquemia visceral"
        ]
      },
      {
        "id": "esp",
        "t": "Controle de pressão e FC (alvo PAS 100–120, FC < 60)",
        "it": [
          "beta-bloqueador IV ANTES de qualquer vasodilatador",
          "2ª linha após beta-bloqueador: nitroprussiato 0,3–10 mcg/kg/min ou nicardipina IV se PAS persistir > 120 mmHg",
          "NUNCA iniciar vasodilatador sem beta-bloqueador prévio",
          "Evitar anticoagulação até descartar dissecção em qualquer suspeita de dor torácica + alarme"
        ]
      },
      {
        "id": "inv",
        "t": "Diagnóstico e laboratório de urgência",
        "it": [
          "Angiotomografia de aorta (tórax, abdome e pelve com contraste)",
          "Tipagem sanguínea com Prova Cruzada e reserva de concentrado de hemácias (mínimo 4 unidades)",
          "Painel Laboratorial de Urgência: Hemograma completo, Coagulograma (TP/INR, TTPa), Função renal (ureia e creatinina), Eletrólitos, Gasometria venosa com lactato sérico e Troponina ultrassensível",
          "D-dímero quantitativo (se ADD-RS ≤ 1 e suspeita intermediária)",
          "Ecocardiograma transtorácico à beira-leito (rastreio de tamponamento, insuficiência aórtica e retalho intimal)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Stanford A: cirurgia cardíaca de emergência",
          "Stanford B não complicada: tratamento clínico em UTI; cirurgia/TEVAR se isquemia visceral, expansão rápida ou refratariedade",
          "Toda dissecção deve ir para UTI cardiovascular com PA invasiva"
        ]
      }
    ]
  },
  "peri": {
    "l": "Pericardite",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação inicial",
        "it": [
          "Confirmar critérios diagnósticos (≥ 2): dor pleurítica torácica, atrito pericárdico, alterações ECG difusas (supra côncavo + depressão PR), derrame pericárdico novo",
          "Ecocardiograma transtorácico em todos os casos",
          "PA, FC, JVP"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacológico",
        "it": [
          "AINE alta dose: ibuprofeno 600 mg VO 8/8h ou AAS 750–1000 mg VO 8/8h por 1–2 semanas, redução gradual",
          "Colchicina 0,5 mg VO 12/12h por 3 meses (0,5 mg/dia se < 70 kg)",
          "Corticoide (prednisona 0,2–0,5 mg/kg/dia) apenas se contraindicação aos AINEs ou doença autoimune; risco de cronificação",
          "EVITAR anticoagulação",
          "Restrição de exercício até resolução de sintomas e biomarcadores (mínimo 3 meses se atleta)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Marcadores inflamatórios e de lesão miocárdica: Proteína C-Reativa (PCR) sérica quantitativa, VHS, Troponina ultrassensível seriada e Hemograma completo",
          "Eletrocardiograma de 12 derivações seriado para acompanhamento dos estágios evolutivos",
          "Radiografia de tórax no leito para avaliação de silhueta cardíaca e acometimento pleuropulmonar",
          "Ecocardiograma transtorácico à beira-leito para avaliação de derrame pericárdico e sinais de tamponamento",
          "Investigação etiológica conforme contexto: TST/IGRA (TB), FAN (autoimune), HIV, painel viral, função tireoidiana"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internar se ≥ 1 fator de mau prognóstico: febre > 38°C, início subagudo, derrame moderado-grande, tamponamento, miopericardite, falha ao AINE em 7 dias, imunossuprimido, anticoagulação, trauma",
          "Sem fatores: tratamento ambulatorial com retorno em 7 dias para reavaliação clínica e PCR"
        ]
      }
    ]
  },
  "esof": {
    "l": "Síndrome esofágica aguda",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação",
        "it": [
          "Diferenciar etiologias: Boerhaave (ruptura espontânea pós-vômito), impactação alimentar, laceração de Mallory-Weiss, ingestão cáustica, perfuração iatrogênica",
          "Sinais de Boerhaave: dor torácica/epigástrica intensa pós-vômito + enfisema subcutâneo + sinal de Hamman (atrito mediastinal)",
          "NPO absoluto até definir etiologia; posição semi-sentada se cáustico (não induzir vômito)"
        ]
      },
      {
        "id": "esp",
        "t": "Suporte e ATB se perfuração",
        "it": [
          "Acesso venoso ≥ 18G; analgesia (morfina 2–5 mg IV) e antiemético (ondansetrona 4 mg IV)",
          "Boerhaave / perfuração: ATB IV amplo espectro (piperacilina-tazobactam 4,5 g 6/6h ou meropenem 1 g 8/8h) + IBP IV (omeprazol 80 mg bolus → 8 mg/h)",
          "Mallory-Weiss: suporte, IBP IV, EDA se sangramento ativo (hemoclipagem, escleroterapia)",
          "Cáustico: NÃO induzir vômito, NÃO usar carvão ativado; EDA em < 24h para classificação de Zargar"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "TC tórax e abdome com contraste hidrossolúvel oral",
          "Pesquisa radiológica de pneumomediastino, derrame pleural e sinal de Naclerio (V invertido) no Rx de tórax",
          "EDA é diagnóstica em impactação, Mallory-Weiss e cáusticos; contraindicada em Boerhaave (risco de ampliar perfuração)",
          "Hemograma, lactato, função renal/hepática"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Boerhaave / perfuração: cirurgia em < 24h reduz mortalidade de > 50% para < 10%",
          "Impactação alimentar: EDA em < 24h (< 6h se obstrução completa, sialorreia ou desconforto respiratório)",
          "Mallory-Weiss: alta após 24h se sangramento contido e Hb estável",
          "Cáustico: internação em UTI, jejum, NUTRI, EDA classificação, vigilância de estenose tardia"
        ]
      }
    ]
  },
  "pntx": {
    "l": "Pneumotórax hipertensivo / Espontâneo",
    "s": [
      {
        "id": "sup",
        "t": "Descompressão emergencial e monitorização",
        "it": [
          "Pneumotórax hipertensivo: DESCOMPRESSÃO IMEDIATA POR AGULHA (14G–16G) no 4º/5º EIC linha axilar anterior/média (ou 2º EIC hemiclavicular)",
          "Toracostomia com drenagem tubular em selo d'água (dreno de tórax 20F–28F) no 5º EIC entre a linha axilar anterior e média",
          "Oxigenoterapia em alto fluxo por máscara não reinalante com reservatório a 10–15 L/min"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia e conforto",
        "it": [
          "Anestesia local infiltrativa ampla com Lidocaína 1% ou 2% sem vasoconstritor (pele, subcutâneo, periósteo costal e pleura parietal)"
        ]
      },
      {
        "id": "inv",
        "t": "Diagnóstico e controle",
        "it": [
          "POCUS pleuropulmonar: pesquisa de lung point patognomônico e confirmação de ausência de lung sliding e linhas B",
          "Radiografia de tórax PA no leito PÓS-drenagem para confirmar expansão pulmonar e posicionamento do dreno",
          "Gasometria arterial se insuficiência respiratória ou hipoxemia persistente"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em leito de enfermaria cirúrgica ou UTI conforme estabilidade clínica",
          "Avaliação urgente pela Cirurgia Torácica / Cirurgia Geral",
          "Manter dreno sob selo d'água funcional; verificar oscilação e débito a cada plantão"
        ]
      }
    ]
  },
  "pal": {
    "l": "Palpitações / Arritmias",
    "subExcl": [
      {
        "id": "pal_ind",
        "l": "Arritmia / Palpitação indiferenciada (estabilização inicial)"
      },
      {
        "id": "pal_tsv",
        "l": "TSV (Reentrada Nodal / Via Acessória)"
      },
      {
        "id": "pal_fa",
        "l": "Fibrilação Atrial / Flutter Atrial"
      },
      {
        "id": "pal_tv",
        "l": "TV Monomórfica com pulso"
      },
      {
        "id": "pal_tvp",
        "l": "TV Polimórfica / Torsades de Pointes"
      },
      {
        "id": "pal_bra",
        "l": "Bradiarritmias Instáveis (BAV 2º/3º grau)"
      }
    ],
    "subAdd": [
      {
        "id": "sinc",
        "l": "Síncope associada"
      },
      {
        "id": "dtx",
        "l": "Dor torácica / Isquemia miocárdica"
      },
      {
        "id": "cho_car",
        "l": "Choque cardiogênico associado"
      },
      {
        "id": "eap",
        "l": "Edema agudo de pulmão / IC associada"
      }
    ],
    "s": []
  },
  "pal_ind": {
    "l": "Arritmia / Palpitação indiferenciada (estabilização inicial)",
    "s": [
      {
        "id": "sup",
        "t": "Triagem imediata de instabilidade hemodinâmica (ACLS / ESC)",
        "it": [
          "Monitorização cardíaca multiparamétrica contínua (ECG de 3 derivações na tela, SpO₂ contínua, PA a cada 3–5 min)",
          "Desfibrilador bifásico posicionado à beira-leito com pás adesivas anteroposteriores acopladas ao paciente",
          "Eletrocardiograma de 12 derivações com DII longo obtido e interpretado em < 10 minutos (sem postergar choque se choque iminente)",
          "Acesso venoso periférico calibroso (18G ou 16G em fossa antecubital direita preferencial para rápida circulação central de fármacos)",
          "Oxigenoterapia suplementar com alvo SpO₂ ≥ 94% se hipoxemia"
        ]
      },
      {
        "id": "esp",
        "t": "Diretriz de intervenção e conduta por estabilidade",
        "it": [
          "TAQUIARRITMIA INSTÁVEL COM PULSO: Cardioversão Elétrica Sincronizada (CVES) de emergência. Sedação rápida se consciente (Etomidato 0,2 mg/kg IV ou Midazolam 2–5 mg IV + Fentanil 50 mcg IV). Energia inicial bifásica: TSV/Flutter: 50–100 J; FA: 120–200 J; TV monomórfica: 100 J",
          "BRADIARRITMIA INSTÁVEL: Atropina 1 mg IV em bolus a cada 3–5 min (dose máx 3 mg). Se refratária ou BAV avançado: Marcapasso Transcutâneo imediato OU Dopamina 5–20 mcg/kg/min IV OU Epinefrina 2–10 mcg/min IV em infusão contínua",
          "ARRITMIA ESTÁVEL: Diagnóstico eletrocardiográfico sistemático: ritmo regular vs irregular; complexo QRS estreito (< 120 ms) vs largo (≥ 120 ms); selecionar o subtipo clínico correspondente para conduta farmacológica direcionada"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar etiológica",
        "it": [
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Troponina de alta sensibilidade (0h/1h), Lactato sérico seriado",
          "TSH e T4 livre (rastreio de tireotoxicose/hipertireoidismo como causa de FA ou taquicardia sinusal persistente)",
          "POCUS ecocardiográfico à beira-leito: contratilidade ventricular global, fração de ejeção, dimensões do átrio esquerdo e descarte de derrame pericárdico"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Arritmia instável, TV sustentada, pós-cardioversão elétrica ou necessidade de suporte vasoativo/marcapasso: internação mandatória em UTI / UCO",
          "FA/Flutter de início recente revertida ou com FC controlada: observação monitorizada por 12–24h ou internação em enfermaria cardiológica",
          "TSV revertida com sucesso com manobra vagal ou adenosina em paciente jovem sem cardiopatia e com ECG normal pós-reversão: alta orientada após 4–6h de observação com encaminhamento ambulatorial à Arritmologia"
        ]
      }
    ]
  },
  "pal_tsv": {
    "l": "TSV (Reentrada Nodal / Via Acessória)",
    "s": [
      {
        "id": "sup",
        "t": "Manobras vagais de 1ª linha (Estudo REVERT)",
        "it": [
          "Registro contínuo em fita de ECG durante toda a realização das manobras vagais e injeção de fármacos"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia farmacológica escalonada (AHA/ESC)",
        "it": [
          "Adenosina 6 mg IV em bólus hiper-rápido (técnica de duas seringas com torneirinha de 3 vias: adenosina seguida imediatamente por flush vigoroso de 20 mL de SF 0,9% com elevação súbita do membro)",
          "Se não reverter em 1–2 minutos: Adenosina 12 mg IV em bólus hiper-rápido com flush de 20 mL de SF",
          "Se falha persistente: repetir uma segunda dose de Adenosina 12 mg IV",
          "Avisar o paciente sobre sintomas transitórios esperados da adenosina (sensação de opressão torácica, calor facial, pausa no ECG por 2–4s)",
          "2ª Escolha se refratariedade à adenosina e paciente estável: Diltiazem 0,25 mg/kg IV em 2 min (ou Verapamil 2,5–5 mg IV em 2 min) OU Metoprolol 5 mg IV lento a cada 5 min (máx 15 mg)",
          "Cardioversão Elétrica Sincronizada 50–100 J bifásica se surgir qualquer sinal de instabilidade hemodinâmica a qualquer momento"
        ]
      },
      {
        "id": "inv",
        "t": "ECG pós-reversão",
        "it": [
          "ECG de 12 derivações completo pós-reversão para ritmo sinusal: busca ativa de onda Delta e intervalo PR curto (< 120 ms) sugestivos de Síndrome de Wolff-Parkinson-White (WPW)"
        ]
      }
    ]
  },
  "pal_fa": {
    "l": "Fibrilação Atrial / Flutter Atrial",
    "s": [
      {
        "id": "sup",
        "t": "Estratificação clínica e tempo de evolução",
        "it": [
          "Determinar o início exato dos sintomas: < 48 horas vs ≥ 48 horas (ou tempo indeterminado)",
          "Calcular o escore CHA₂DS₂-VASc para risco tromboembólico e HAS-BLED para risco de sangramento",
          "Confirmar estabilidade hemodinâmica (se instável: Cardioversão Elétrica Sincronizada 120–200 J IMEDIATA!)"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo agudo: Controle de FC vs Controle de Ritmo (ESC 2024)",
        "it": [
          "CONTROLE DE FREQUÊNCIA CARDÍACA (Meta inicial: FC < 110 bpm em repouso):",
          "Se FEVE preservada (≥ 40%) e sem IC: Metoprolol 2,5–5 mg IV lento em 2 min (repetir até 3 doses a cada 5 min) OU Diltiazem 0,25 mg/kg IV em 2 min (pode repetir 0,35 mg/kg após 15 min seguido de BIC 5–15 mg/h)",
          "Se FEVE reduzida (< 40%) ou sinais de insuficiência cardíaca congestiva: Amiodarona 150 mg IV em 10–30 min (seguida de 1 mg/min por 6h e 0,5 mg/min por 18h) OU Deslanosídeo / Digoxina 0,25–0,5 mg IV lento",
          "ANTICOAGULAÇÃO IMEDIATA: Iniciar Enoxaparina 1 mg/kg SC 12/12h ou DOAC oral (Apixabana 5 mg 12/12h ou Rivaroxabana 20 mg 1×/dia) se indicação por CHA₂DS₂-VASc ≥ 2 em homens ou ≥ 3 em mulheres",
          "CONTROLE DE RITMO (Apenas se início < 48h documentado e baixo risco embólico): Cardioversão química com Amiodarona 300 mg IV em 1h + infusão de 900 mg em 24h OU CVES sincronizada 120–200 J bifásica"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação etiológica",
        "it": [
          "Ecocardiograma transtorácico: diâmetro atrial esquerdo, hipertrofia ventricular, disfunção sistólica/diastólica e valvopatias",
          "Painel tireoidiano (TSH, T4 livre) para pesquisa de tireotoxicose/hipertireoidismo",
          "Eletrólitos (K⁺, Mg²⁺ basais) e hemograma"
        ]
      }
    ]
  },
  "pal_tv": {
    "l": "Taquicardia Ventricular Monomórfica com pulso",
    "s": [
      {
        "id": "sup",
        "t": "Abordagem prioritária e segurança",
        "it": [
          "Desfibrilador ligado ao paciente com pás adesivas em modo sincronizado ativado"
        ]
      },
      {
        "id": "esp",
        "t": "Intervenção farmacológica vs elétrica",
        "it": [
          "SE INSTABILIDADE (Hipotensão, dor torácica, confusão, dispneia aguda): Cardioversão Elétrica Sincronizada IMEDIATA com 100 J bifásicos (escalonar para 200 J se falha)",
          "SE ESTÁVEL: Terapia farmacológica antiarrítmica de 1ª linha:",
          "Amiodarona 150 mg IV diluída em 100 mL de SG 5% infundida em 10 minutos. Se a arritmia persistir, repetir 150 mg IV em 10 min. Seguir com manutenção contínua de 1 mg/min por 6 horas (360 mg) e depois 0,5 mg/min por 18 horas (540 mg)",
          "Alternativa em isquemia miocárdica aguda comprovada: Lidocaína 1,0 a 1,5 mg/kg IV em bolus lento (repetir 0,5–0,75 mg/kg em 5–10 min se necessário, até máx 3 mg/kg), seguida de infusão contínua a 1–4 mg/min",
          "Se refratariedade farmacológica: realizar Cardioversão Elétrica Sincronizada sob sedação e analgesia"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica",
        "it": [
          "ECG de 12 derivações: critérios de Brugada, Vereckei (aVR) e Santos para confirmação de TV",
          "Troponina ultrassensível seriada e gasometria com eletrólitos (K⁺, Mg²⁺ séricos)",
          "Ecocardiograma transtorácico: avaliação de fração de ejeção, acinesia/aneurisma ventricular prévio"
        ]
      }
    ]
  },
  "pal_tvp": {
    "l": "TV Polimórfica / Torsades de Pointes",
    "s": [
      {
        "id": "sup",
        "t": "Diferenciação crítica pelo intervalo QTc",
        "it": [
          "Desfibrilador posicionado e pronto para choque em modo de desfibrilação assincrônica"
        ]
      },
      {
        "id": "esp",
        "t": "Terapêutica específica para Torsades de Pointes",
        "it": [
          "Sulfato de Magnésio 2 g IV diluído em 100 mL SG 5% infundido em 10–15 minutos (ou em bólus direto se instável). Pode ser repetido em 10–15 min se persistência",
          "Correção agressiva da hipocalemia associada: manter Potássio sérico em níveis elevados (meta K⁺ 4,5–5,0 mEq/L)",
          "Se bradicardia desencadeante ou pausas dependentes: Overdrive pacing (estimulação com marcapasso provisório a 90–110 bpm) OU infusão contínua de Isoproterenol 2–10 mcg/min (titular para FC > 90–100 bpm) para encurtar o intervalo QTc",
          "Suspensão imediata de todos os fármacos que prolongam o intervalo QT (antiarrítmicos, psicotrópicos, antibióticos macrolídeos/quinolonas, antieméticos)",
          "TV POLIMÓRFICA COM QT NORMAL: A causa primordial é ISQUEMIA MIOCÁRDICA AGUDA! Tratar como SCA: Betabloqueador IV + Lidocaína 1–1,5 mg/kg IV + cateterismo cardíaco emergencial"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Painel eletrolítico completo: K⁺, Mg²⁺, Ca²⁺ ionizado séricos urgentes",
          "Troponina hs seriada para descartar SCA",
          "Revisão exaustiva da lista de medicamentos de uso contínuo"
        ]
      }
    ]
  },
  "pal_bra": {
    "l": "Bradiarritmias Instáveis (BAV 2º/3º grau)",
    "s": [
      {
        "id": "sup",
        "t": "Reconhecimento de gravidade e monitorização",
        "it": [
          "Fixação imediata dos eletrodos do marcapasso transcutâneo (preferencialmente anteroposterior: anterior sobre o precórdio e posterior entre a escápula esquerda e coluna)",
          "Acesso venoso periférico calibroso e monitorização multiparamétrica de oximetria e PA"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacoterapia e Marcapasso Transcutâneo (ACLS 2025)",
        "it": [
          "1ª Linha (em bradicardia sinusal ou BAV nodal): Atropina 1 mg IV em bolus rápido a cada 3–5 min (dose máxima acumulada: 3 mg)",
          "MARCAPASSO TRANSCUTÂNEO (TCP): Ligar o modo pacing sob demanda, fixar FC alvo de 60–80 bpm, aumentar gradualmente a corrente (mA) até a captura elétrica (espícula precedendo complexo QRS alargado e onda T oposta) e CONFIRMAR pulso arterial compatível. Adicionar 5–10 mA acima do limiar de captura para segurança",
          "Analgesia e sedação obrigatórias para conforto das contrações torácicas: Fentanil 50–100 mcg IV + Midazolam 2–5 mg IV ou Cetamina",
          "Drogas cronotrópicas em infusão contínua (se falha de atropina ou enquanto prepara marcapasso): Epinefrina 2 a 10 mcg/min IV em BIC OU Dopamina 5 a 20 mcg/kg/min IV em BIC",
          "Acionamento urgente da Cardiologia para implante de Marcapasso Transvenoso Provisório"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Derivações direitas (V3R, V4R) no ECG para descartar infarto de VD concomitante como etiologia do BAV",
          "Potássio sérico (descartar hipercalemia grave simulando BAVT), Digoxina sérica (descartar intoxicação digitálica)"
        ]
      }
    ]
  },
  "sinc": {
    "l": "Síncope",
    "subAdd": [
      {
        "id": "pal",
        "l": "Arritmia / Palpitações associadas"
      },
      {
        "id": "dtx",
        "l": "Dor torácica / SCA associada"
      },
      {
        "id": "neu",
        "l": "Déficit neurológico / AIT associado"
      }
    ],
    "s": [
      {
        "id": "sup",
        "t": "Triagem de risco e monitorização imediata (ESC 2024)",
        "it": [
          "ECG de 12 derivações na admissão: obrigatório em 100% dos pacientes com síncope para busca ativa de canalopatias e arritmias",
          "Pesquisa ativa de Red Flags de síncope cardíaca: síncope durante o esforço físico ou em decúbito, palpitações precedendo o evento, ausência de pródromos autonômicos, cardiopatia estrutural conhecida ou história familiar de morte súbita precoce (< 40 anos)",
          "Aferição de PA e FC em decúbito dorsal e após 1 e 3 minutos em ortostase (pesquisa de hipotensão ortostática: queda de PAS ≥ 20 mmHg ou PAD ≥ 10 mmHg)",
          "Glicemia capilar na admissão para descartar hipoglicemia como causa do evento sincopal",
          "Monitorização cardíaca contínua em leito monitorizado se critérios de risco intermediário ou alto"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e estratificação",
        "it": [
          "Ecocardiograma transtorácico: indicado se suspeita de cardiopatia estrutural (sopro cardíaco novo, estenose aórtica, disfunção ventricular ou ECG alterado)",
          "Eletrocardiograma seriado: buscar intervalo QTc prolongado (> 460–480 ms), padrão de Brugada (tipo 1 ou 2), onda delta / PR curto (Wolf-Parkinson-White), ondas epsilon (DAED), bloqueio bifascicular ou BAV avançado",
          "Hemograma completo (descartar anemia aguda/hemorragia oculta), eletrólitos séricos (K, Mg, Ca) e troponina se suspeita isquêmica associada",
          "Escore de Risco Canadense de Síncope (CSRS) / San Francisco Rule para orientar necessidade de internação hospitalar"
        ]
      },
      {
        "id": "dsp",
        "t": "Estratificação de risco e disposição",
        "it": [
          "Alto Risco (Internação hospitalar obrigatória em leito monitorizado/telemetria): cardiopatia estrutural conhecida, síncope de esforço, ECG com achados de alto risco, PA sistólica < 90 mmHg persistente ou hemoglobina < 9 g/dL",
          "Baixo Risco (Elegível para alta da sala de emergência): características típicas de síncope vasovagal/reflexa (pródromos clássicos: náusea, palidez, sudorese, calor; gatilho situacional ou dor/estresse), paciente jovem, sem cardiopatia prévia e com ECG estritamente normal",
          "Orientações de alta no baixo risco: hidratação oral vigorosa (2–2,5 L/dia), manobras de contrapressão física isométrica (cruzar pernas e tensionar membros) aos primeiros pródromos e seguimento ambulatorial"
        ]
      }
    ]
  }
};
