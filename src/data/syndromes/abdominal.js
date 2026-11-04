// ─── Protocolos Sindrômicos: ABDOMINAL ───
const CT_ABDOMINAL = {
  "abd": {
    "l": "Síndrome abdominal aguda",
    "subExcl": [
      {
        "id": "dab_ind",
        "l": "Abdome agudo indiferenciado / Em elucidação"
      },
      {
        "id": "dab_perf",
        "l": "Perfurativo (Úlcera péptica rota, Perfuração de víscera, Colecistite rota)"
      },
      {
        "id": "dab_inf",
        "l": "Inflamatório / Infeccioso (Apendicite, Colecistite, Diverticulite)"
      },
      {
        "id": "dab_obs",
        "l": "Obstrutivo (Aderências, Hérnia encarcerada, Volvo)"
      },
      {
        "id": "dab_vasc",
        "l": "Vascular / Isquêmico (Isquemia mesentérica, Ruptura de AAA)"
      },
      {
        "id": "dab_hem",
        "l": "Hemorrágico / Ginecológico (Gravidez ectópica rota, Cisto roto)"
      }
    ],
    "subAdd": [
      {
        "id": "cho_sep",
        "l": "Choque séptico de foco abdominal"
      },
      {
        "id": "cho_hip",
        "l": "Choque hemorrágico associado"
      },
      {
        "id": "dab",
        "l": "Mapeamento de dor por quadrante"
      },
      {
        "id": "nv",
        "l": "Náuseas e vômitos incoercíveis"
      }
    ],
    "s": []
  },
  "dab_ind": {
    "l": "Abdome agudo indiferenciado / Em elucidação",
    "s": [
      {
        "id": "sup",
        "t": "Triagem e suporte hemodinâmico",
        "it": [
          "Monitorização multiparamétrica contínua (ECG, SpO₂, PANI a cada 5–15 min)",
          "Dois acessos venosos periféricos calibrosos (16–18G) imediatos",
          "Jejum absoluto (NPO) rigoroso",
          "Hidratação volêmica inicial com Ringer Lactato 500–1.000 mL IV",
          "Passagem de SNG aberta em sifonagem se vômitos incoercíveis ou distensão gástrica"
        ]
      },
      {
        "id": "sin",
        "t": "Analgesia precoce multimodal & Antieméticos",
        "it": [
          "Dipirona 1 a 2 g IV a cada 6h",
          "Morfina 2–4 mg IV fracionada se dor intensa (EVA ≥ 7) sem mascarar abdome cirúrgico",
          "Ondansetrana 4–8 mg IV se náuseas ou vômitos"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica urgente",
        "it": [
          "TC de abdome total com contraste venoso em caráter de urgência (ou USG se cólica biliar/criança/gestante)",
          "Rotina radiológica de abdome agudo no leito (tórax cúpulas + abdome)",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa, amilase e lipase",
          "β-hCG sérico ou urinário em mulheres em idade fértil"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição & Conduta cirúrgica",
        "it": [
          "Avaliação prioritária da Cirurgia Geral de plantão",
          "Internação em leito cirúrgico monitorizado ou UTI se instabilidade"
        ]
      }
    ]
  },
  "dab_inf": {
    "l": "Inflamatório / Infeccioso (Apendicite, Colecistite, Diverticulite)",
    "s": [
      {
        "id": "sup",
        "t": "Suporte",
        "it": [
          "Jejum absoluto (NPO)",
          "Acesso venoso calibroso e hidratação com Ringer Lactato 500–1.000 mL IV",
          "Analgesia com Dipirona 1 g IV e Morfina fracionada se dor intensa"
        ]
      },
      {
        "id": "esp",
        "t": "Antibioticoterapia direcionada & Conduta",
        "it": [
          "Ceftriaxona 2 g IV 12/12h + Metronidazol 500 mg IV 8/8h (ou Ciprofloxacino 400 mg IV se alergia grave)",
          "Acionamento da Cirurgia Geral de plantão para apendicectomia videolaparoscópica ou colecistectomia precoce (< 72h)",
          "Diverticulite aguda: antibioticoterapia conforme estadiamento clínico de Hinchey"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "USG de abdome superior (vias biliares e vesícula)",
          "TC de abdome e pelve com contraste venoso (urgência)",
          "Hemograma completo com contagem de plaquetas, Função renal (Ureia e Creatinina), Eletrólitos, Coagulograma e Lactato sérico"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação cirúrgica / leito monitorizado para programação de procedimento de urgência",
          "Cadastro em regulação CROSS / NIR se necessidade de transferência para hospital com centro cirúrgico"
        ]
      }
    ]
  },
  "dab_perf": {
    "l": "Perfurativo (Úlcera péptica rota, Perfuração colônica, Colecistite rota)",
    "s": [
      {
        "id": "sup",
        "t": "Emergência cirúrgica & Ressuscitação",
        "it": [
          "Jejum absoluto (NPO) rigoroso",
          "Ressuscitação volêmica: Ringer Lactato 1.000 mL IV em bólus agora",
          "Sonda Nasogástrica calibrosa (16–18F) aberta com drenagem livre em sifonagem",
          "Vigilância de via aérea: baixo limiar para IOT se fadiga ventilatória ou acidose grave"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo cirúrgico e farmacológico emergencial",
        "it": [
          "Acionamento imediato da Cirurgia Geral de plantão para laparotomia exploradora de urgência",
          "Ceftriaxona 2 g IV dose única diária + Metronidazol 500 mg IV 8/8h (iniciar na 1ª hora)",
          "Piperacilina-Tazobactam 4,5 g IV 6/6h (esquema alternativo se choque séptico associado)",
          "Norepinefrina em AVP (titular em BIC para PAM alvo ≥ 65 mmHg)",
          "Omeprazol 80 mg IV em bólus seguido de 8 mg/h contínuo"
        ]
      },
      {
        "id": "inv",
        "t": "Confirmação radiológica & Laboratório",
        "it": [
          "TC de abdome total com contraste venoso em caráter de urgência",
          "RX de tórax em cúpulas diafragmáticas (ortostase) e decúbito lateral esquerdo (Hjelm-Laurell)",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos (Na, K, Mg), glicemia, gasometria venosa e coagulograma (TP/INR, TTPa) + Lactato sérico seriado, 2 pares de hemoculturas"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição de emergência",
        "it": [
          "Encaminhamento imediato ao Centro Cirúrgico para laparotomia exploradora",
          "Regulação urgente de vaga / transferência via CROSS / NIR (Vaga Zero para UTI / Centro Cirúrgico)"
        ]
      }
    ]
  },
  "dab_obs": {
    "l": "Obstrutivo (Aderências, Hérnia encarcerada, Volvulo)",
    "s": [
      {
        "id": "sup",
        "t": "Manejo descompressivo e volêmico",
        "it": [
          "Sonda Nasogástrica calibrosa (16–18F) aberta em sifonagem ou aspiração suave imediata",
          "Hidratação IV agressiva com Ringer Lactato para reposição do sequestro de líquido no terceiro espaço e eletrólitos",
          "Correção rigorosa de distúrbios hidroeletrolíticos (hipocalemia, hipocloremia e alcalose metabólica por vômitos) continua"
        ]
      },
      {
        "id": "esp",
        "t": "Terapêutica específica",
        "it": [
          "Hérnia encarcerada/estrangulada: cirurgia imediata; não realizar redução forçada (taxis) se suspeita de sofrimento isquêmico",
          "Volvo de sigmoide: descompressão e desvolvulação por retossigmoidoscopia ou colonoscopia se sem sinais de perfuração/isquemia",
          "Obstrução por bridas: conduta conservadora com SNG, hidratação e contraste hidrossolúvel (Gastrografin) se sem peritonite; cirurgia se sem resolução em 48–72h"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica",
        "it": [
          "TC de abdome e pelve com contraste IV: método padrão-ouro para localizar o ponto de transição e avaliar sofrimento de alça",
          "RX simples de abdome (rotina de abdome agudo: deitado, em pé e cúpulas): níveis hidroaéreos em degraus, empilhamento de moedas, ausência de ar no reto",
          "Laboratório de emergência: Hemograma completo, Ureia, Creatinina, Eletrólitos (Sódio, Potássio, Cloreto) e Gasometria com dosagem de lactato"
        ]
      }
    ]
  },
  "dab_vasc": {
    "l": "Vascular / Isquêmico (Isquemia mesentérica, Ruptura de AAA)",
    "s": [
      {
        "id": "sup",
        "t": "Reanimação e alta suspeição clínica",
        "it": [
          "Monitorização contínua de sinais vitais e gasometria com lactato seriado",
          "Dois acessos venosos calibrosos e suporte vasopressor cauteloso (evitar vasoconstritores alfamiméticos puros que agravam a isquemia esplâncnica)",
          "Jejum absoluto e analgesia com opioides potentes (Fentanil/Morfina)"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia antitrombótica e revascularização emergencial",
        "it": [
          "Anticoagulação imediata com Heparina Não Fracionada (HNF) bolus 80 UI/kg seguido de 18 UI/kg/h em BIC (se excluído sangramento ativo na TC)",
          "Angiotomografia de artérias mesentéricas (AngioTC) IMEDIATA: diagnostica oclusão de tronco da artéria mesentérica superior (AMS), trombose venosa mesentérica ou sinais de necrose transmural (pneumatose intestinal, gás na veia porta)",
          "Revascularização vascular de emergência (embolectomia cirúrgica, angioplastia com stent ou laparotomia para ressecção de alças inviáveis)",
          "Antibioticoterapia de amplo espectro com cobertura de flora colônica entérica (Piperacilina-Tazobactam 4,5 g IV 6/6h)"
        ]
      },
      {
        "id": "inv",
        "t": "Laboratório e imagem",
        "it": [
          "AngioTC arterial e venosa abdominal em caráter de urgência",
          "Gasometria com dosagem de lactato e anion gap (pesquisa precoce de acidose lática e isquemia intestinal)",
          "Laboratório de emergência: Hemograma completo com contagem de plaquetas, Coagulograma (TP/INR, TTPa), Ureia, Creatinina, Eletrólitos e D-dímero sérico"
        ]
      }
    ]
  },
  "dab_hem": {
    "l": "Hemorrágico / Ginecológico (Gravidez ectópica rota, Cisto roto)",
    "s": [
      {
        "id": "sup",
        "t": "Estabilização e hemostasia",
        "it": [
          "Verificação imediata de β-hCG e estabilidade hemodinâmica",
          "Ressuscitação balanceada e tipagem sanguínea com prova cruzada de urgência",
          "Hipotensão permissiva se sangramento ativo enquanto a paciente é transportada ao bloco cirúrgico"
        ]
      },
      {
        "id": "esp",
        "t": "Intervenção de emergência",
        "it": [
          "Acionamento emergencial da equipe de Ginecologia e Obstetrícia",
          "Ácido Tranexâmico 1 g IV em 10 min se choque hemorrágico ativo",
          "Cirurgia hemostática urgente (salpingectomia / hemostasia ovariana)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "POCUS pélvico / FAST: presença de líquido livre no fundo de saco de Douglas e espaço de Morrison",
          "β-hCG quantitativo sérico urgente",
          "Hemograma seriado e coagulograma"
        ]
      }
    ]
  },
  "dab": {
    "l": "Dor abdominal (investigação / inespecífica)",
    "s": [
      {
        "id": "inv",
        "t": "Avaliação diagnóstica e condutas iniciais",
        "it": [
          "Avaliação seriada de abdome com palpação cuidadosa e checagem de sinais de peritonite",
          "Rotina de abdome agudo (Rx tórax PA em ortostase + Rx abdome simples em decúbito e ortostase)",
          "USG de abdome total / vias biliares no leito ou no setor conforme suspeita",
          "TC de abdome e pelve com contraste venoso se dúvida diagnóstica ou sinais de abdome agudo",
          "Dieta zero e hidratação venosa isotônica guiada por metas até definição etiológica",
          "Analgesia escalonada evitando mascarar sinais de abdome agudo cirúrgico"
        ]
      }
    ]
  },
  "hdg": {
    "l": "Hemorragia digestiva",
    "subExcl": [
      {
        "id": "hdg_ind",
        "l": "Hemorragia digestiva indiferenciada (alta vs. baixa)"
      },
      {
        "id": "hda",
        "l": "HDA — Hemorragia Digestiva Alta"
      },
      {
        "id": "hdb",
        "l": "HDB — Hemorragia Digestiva Baixa"
      }
    ],
    "subAdd": [
      {
        "id": "cho_hip",
        "l": "Choque hemorrágico / Instabilidade associada"
      }
    ],
    "s": []
  },
  "hdg_ind": {
    "l": "Hemorragia digestiva indiferenciada (alta vs. baixa)",
    "s": [
      {
        "id": "sup",
        "t": "Ressuscitação e estabilização inicial (ACG/ESGE)",
        "it": [
          "Monitorização multiparamétrica contínua (ECG, SpO₂, PANI a cada 5–15 min)",
          "Dois acessos venosos periféricos de grosso calibre (14–16G) imediatos",
          "Jejum absoluto (NPO) rigoroso",
          "Estratégia transfusional restritiva: meta de Hb entre 7,0 e 8,0 g/dL (Hb > 8,0 g/dL se coronariopatia grave)",
          "Controle térmico ativo: manter normotermia"
        ]
      },
      {
        "id": "sin",
        "t": "Sintomáticos",
        "it": [
          "Dipirona 1 g IV se dor (CONTRAINDICADO o uso de AINEs)",
          "Ondansetrana 4–8 mg IV se náuseas ou vômitos"
        ]
      },
      {
        "id": "esp",
        "t": "Manejo farmacológico inicial",
        "it": [
          "Omeprazol 80 mg IV em bólus seguido de infusão contínua 8 mg/h (ou 40 mg 12/12h)",
          "Terlipressina 2 mg IV em bólus (ou Octreotida 50 mcg bólus + 50 mcg/h) se suspeita de hipertensão portal / cirrose"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e estratificação",
        "it": [
          "Cálculo do Escore de Glasgow-Blatchford na admissão",
          "Tipagem sanguínea ABO/Rh, prova cruzada e reserva de concentrado de hemácias",
          "Painel Laboratorial de Emergência: Hemograma completo, creatinina, ureia, eletrólitos, glicemia, coagulograma (TP/INR, TTPa)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Endoscopia Digestiva Alta (EDA) de urgência em < 24h (< 12h se choque/sangramento ativo volumoso)",
          "Internação em leito monitorizado ou UTI conforme Glasgow-Blatchford e estabilidade"
        ]
      }
    ]
  },
  "hda": {
    "l": "HDA — Hemorragia Digestiva Alta",
    "s": [
      {
        "id": "sup",
        "t": "Manejo hemodinâmico e proteção de via aérea",
        "it": [
          "Intubação orotraqueal profilática recomendada antes da EDA se hematêmese volumosa ativa, rebaixamento de consciência ou risco elevado de aspiração pulmonar",
          "Passagem de Sonda Nasogástrica / Orogástrica com lavagem: opcional; NÃO é obrigatória, mas pode ser útil se dúvida diagnóstica ou preparo imediato da EDA"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacoterapia e timing da Endoscopia (ACG / ESGE)",
        "it": [
          "Inibidor de Bomba de Prótons (IBP): Omeprazol 80 mg IV em bolus seguido de 8 mg/h em infusão contínua por 72h (ou 40 mg IV 12/12h após hemostasia bem-sucedida)",
          "Se suspeita de HDA Varicosa / Hipertensão Portal: Terlipressina 2 mg IV em bolus a cada 4h (1ª escolha; reduz mortalidade) OU Octreotida 50 mcg IV bolus seguido de 50 mcg/h em BIC contínua por 2–5 dias",
          "Profilaxia antimicrobiana no cirrótico: Ceftriaxona 1 g IV 1×/dia por 7 dias (reduz sepse bacteriana e mortalidade em até 50%)",
          "Procinético pré-EDA: Eritromicina 250 mg IV em 30 min (administrada 30–90 min antes do exame) para promover esvaziamento de coágulos gástricos e otimizar visibilidade",
          "Timing da EDA: realizar em < 24h para todos os pacientes; em < 12h se choque hemorrágico, instabilidade pós-ressuscitação inicial ou suspeita de varizes de esôfago"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar e marcadores",
        "it": [
          "Endoscopia Digestiva Alta (EDA) de urgência para diagnóstico etiológico (úlcera péptica com classificação de Forrest, varizes esofagogástricas, Mallory-Weiss, neoplasia) e hemostasia terapêutica (ligadura elástica, clipagem, termocoagulação, hemospray)",
          "Razão Ureia / Creatinina: relação > 30 (com ureia em mg/dL) sugere forte probabilidade de sangramento proximal ao ângulo de Treitz"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Após hemostasia endoscópica de úlceras Forrest Ia, Ib ou IIa ou ligadura de varizes: internação em UTI por pelo menos 24–48h com monitorização contínua de ressangramento"
        ]
      }
    ]
  },
  "hdb": {
    "l": "HDB — Hemorragia Digestiva Baixa",
    "s": [
      {
        "id": "sup",
        "t": "Manejo inicial e diferenciação etiológica",
        "it": [
          "Diferenciar hematoquezia volumosa por HDA maciça: se instabilidade hemodinâmica importante associada a hematoquezia, considerar EDA de urgência prévia à colonoscopia para descartar HDA rápida com trânsito hiperativo",
          "Reposição volêmica guiada por metas de perfusão tecidual (alvo PAM ≥ 65 mmHg e TEC < 3s)"
        ]
      },
      {
        "id": "esp",
        "t": "Terapia hemostática e intervencionista (ACG 2023)",
        "it": [
          "Correção de coagulopatia grave: reverter anticoagulantes (4F-PCC para varfarina/NOACs) se sangramento persistente com risco à vida; manter plaquetas > 50.000/mcL",
          "Colonoscopia em regime de internação após preparo anterógrado oral/SNG com PEG (4 a 6 litros) nas primeiras 24 horas para diagnóstico e hemostasia de divertículos sangrantes, ectasias vasculares ou pólipos",
          "Angiotomografia computadorizada de abdome com protocolo trifásico: indicada imediatamente em pacientes com instabilidade hemodinâmica ou sangramento ativo volumoso que impede preparo de cólon (detecta sangramentos a partir de 0,3–0,5 mL/min)",
          "Angiografia intervencionista percutânea com embolização superseletiva: opção de escolha para sangramento arterial ativo identificado por angioTC"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "Escore de Oakland para HDB na admissão: escore ≤ 8 prediz probabilidade > 95% de alta segura sem eventos adversos para investigação ambulatorial",
          "Exame proctológico e toque retal na admissão: excluir causas anorretais imediatas (hemorroidas volumosas com sangramento ativo, fissura anal, neoplasia retal palpável)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Oakland ≤ 8 e sinais vitais normais: alta segura com orientação e encaminhamento para colonoscopia ambulatorial rápida",
          "Oakland > 8, sangramento contínuo ou necessidade transfusional: internação hospitalar para preparo de cólon e investigação intervencionista"
        ]
      }
    ]
  },
  "nv": {
    "l": "Náusea e Vômitos",
    "s": [
      {
        "id": "esp",
        "t": "Manejo antiemético e hidroeletrolítico",
        "it": [
          "Ondansetrana 4–8 mg IV",
          "Metoclopramida 10 mg IV lento se náuseas por gastroparesia ou estase gástrica (evitar se suspeita de obstrução intestinal mecânica)",
          "Dimenidrinato 30–50 mg IV ou Clorpromazina 12,5–25 mg IV se vômitos incoercíveis refratários",
          "Reposição de perdas hidroeletrolíticas com Ringer Lactato 500–1.000 mL IV + reposição de Potássio se hipocalemia induzida por vômitos"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação conforme contexto",
        "it": [
          "Glicemia capilar",
          "β-hCG",
          "Lipase sérica",
          "Eletrólitos completos (Na, K, Cl, Mg) e gasometria venosa"
        ]
      }
    ]
  },
  "dia": {
    "l": "Diarreia aguda / Enterite",
    "s": [
      {
        "id": "esp",
        "t": "Manejo e hidratação",
        "it": [
          "Hidratação oral vigorosa com Soro de Reidratação Oral (SRO) ou IV com Ringer Lactato se desidratação moderada a grave",
          "Loperamida 2–4 mg VO apenas em diarreia aquosa não invasiva sem febre",
          "Antibioticoterapia empírica (Ciprofloxacino 500 mg VO 12/12h ou Azitromicina 500 mg VO 1×/dia por 3 dias): indicada apenas se disenteria com febre, paciente idoso, imunossuprimido ou sepse",
          "Reposição oral ou parenteral de potássio conforme dosagem sérica"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação",
        "it": [
          "Coprocultura e pesquisa de leucócitos fecais se diarreia sanguinolenta ou febril prolongada",
          "Pesquisa de toxina A/B e GDH para Clostridioides difficile se uso prévio de antibióticos nos últimos 3 meses ou internação hospitalar recente",
          "Hemograma completo, função renal e eletrólitos"
        ]
      }
    ]
  },
  "ict": {
    "l": "Icterícia / Insuficiência Hepática Aguda",
    "subExcl": [
      {
        "id": "ict_ind",
        "l": "Icterícia indiferenciada / Hepatopatia aguda em investigação"
      },
      {
        "id": "ict_iha",
        "l": "Insuficiência Hepática Aguda (IHA / Falência Fulminante)"
      },
      {
        "id": "ict_col",
        "l": "Colangite Aguda / Icterícia Obstrutiva"
      },
      {
        "id": "ict_cir",
        "l": "Cirrose Descompensada / Hepatopatia Crônica Agudizada (ACLF)"
      }
    ],
    "subAdd": [
      {
        "id": "cho_sep",
        "l": "Sepse / Choque séptico associado"
      },
      {
        "id": "hdg",
        "l": "HDA varicosa / Sangramento digestivo associado"
      }
    ],
    "s": []
  },
  "ict_ind": {
    "l": "Icterícia indiferenciada / Hepatopatia aguda em investigação",
    "s": [
      {
        "id": "sup",
        "t": "Avaliação de gravidade e suporte",
        "it": [
          "Avaliação de Encefalopatia Hepática (flapping, desorientação, sonolência)",
          "Glicemia capilar de 2/2h a 4/4h (alto risco de hipoglicemia grave por falência hepática)",
          "Monitorização de sinais vitais e diurese horária",
          "Suspensão imediata de fármacos potencialmente hepatotóxicos (paracetamol, AINEs, sedativos)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e etiológica",
        "it": [
          "Perfil hepático e colestático: Bilirrubinas total e frações, TGO/AST, TGP/ALT, FA, GGT e Albumina",
          "Coagulograma urgente: TP/INR (marcador precoce de falência de síntese hepática)",
          "USG de abdome com Doppler de vasos hepáticos no leito (avaliar dilatação de vias biliares e trombose portal)",
          "Painel viral agudo: Anti-HAV IgM, HBsAg, Anti-HBc IgM, Anti-HCV",
          "Função renal (ureia, creatinina), eletrólitos e gasometria com lactato"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em leito monitorizado ou UTI se encefalopatia, alargamento de INR ou disfunção renal",
          "Avaliação conjunta da Gastroenterologia / Cirurgia do Aparelho Digestivo"
        ]
      }
    ]
  },
  "ict_iha": {
    "l": "Insuficiência Hepática Aguda (IHA)",
    "s": [
      {
        "id": "sup",
        "t": "Manejo em UTI",
        "it": [
          "Monitorização contínua de sinais vitais, glicemia capilar horária e nível de consciência",
          "Cabeceira elevada a 30° em posição neutra"
        ]
      },
      {
        "id": "esp",
        "t": "Terapêutica específica",
        "it": [
          "N-acetilcisteína (NAC) IV em protocolo contínuo",
          "Glicose 10% IV em infusão de manutenção contínua se glicemia < 90 mg/dL",
          "Salina Hipertônica 3% para manter sódio 145–150 mEq/L se encefalopatia grau 3/4"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e prognóstica",
        "it": [
          "Perfil hepático completo e coagulograma urgente (TP/INR, Fator V sérico)",
          "Gasometria com dosagem de lactato, Glicemia seriada de 2/2h e Eletrólitos com Sódio e Potássio",
          "Amônia sérica (avaliar risco de edema cerebral difuso)",
          "Painel toxicológico urinário e dosagem sérica de Paracetamol"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação obrigatória em UTI de transplante hepático"
        ]
      }
    ]
  },
  "ict_col": {
    "l": "Colangite Aguda / Obstrutiva",
    "s": [
      {
        "id": "sup",
        "t": "Manejo inicial",
        "it": [
          "Ressuscitação volêmica com Ringer Lactato",
          "Monitorização hemodinâmica"
        ]
      },
      {
        "id": "esp",
        "t": "Antimicrobianos e drenagem",
        "it": [
          "Piperacilina-Tazobactam 4,5 g IV 6/6h OU Ceftriaxona 2 g IV + Metronidazol 500 mg IV",
          "Descompressão biliar urgente por CPRE ou drenagem percutânea trans-hepática em < 12–24h"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação complementar",
        "it": [
          "2 pares de hemoculturas pareadas de sítios periféricos distintos antes do antimicrobiano",
          "Painel hepático e canalicular: Bilirrubinas total e frações, TGO/TGP, FA e GGT",
          "Laboratório de urgência: Hemograma completo com plaquetas, Coagulograma, Ureia, Creatinina, Eletrólitos e Gasometria com lactato",
          "USG de abdome superior e vias biliares no leito (ou TC de abdome com contraste se estabilizado)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação em UTI ou centro cirúrgico / endoscópico"
        ]
      }
    ]
  },
  "ict_cir": {
    "l": "Cirrose Descompensada / ACLF",
    "s": [
      {
        "id": "sup",
        "t": "Manejo",
        "it": [
          "Pesquisa ativa de gatilhos: infecção (PBE, ITU, pneumonia), HDA, constipação, desidratação",
          "Paracentese diagnóstica imediata em todo paciente cirrótico admitido com ascite"
        ]
      },
      {
        "id": "esp",
        "t": "Farmacoterapia",
        "it": [
          "Lactulose 20–30 mL VO/SNG + Rifaximina 550 mg VO 12/12h se encefalopatia",
          "Ceftriaxona 2 g IV se suspeita de PBE (PMN no líquido ascítico ≥ 250/mm³)",
          "Albumina 20% 1,5 g/kg no D1 e 1,0 g/kg no D3 se PBE confirmada (previne síndrome hepatorrenal)"
        ]
      },
      {
        "id": "inv",
        "t": "Investigação diagnóstica e rastreio de descompensação",
        "it": [
          "Hemograma com plaquetas, Coagulograma (TP/INR, TTPa), Função renal (Creatinina e Ureia), Eletrólitos (Sódio sérico e urinário) e Albumina",
          "Gasometria com dosagem de lactato (pesquisa de choque séptico/vasoplégico oculto)",
          "Paracentese diagnóstica imediata (GASA, citologia total e diferencial, bacterioscopia e cultura em frasco de hemocultura)"
        ]
      },
      {
        "id": "dsp",
        "t": "Disposição",
        "it": [
          "Internação hospitalar monitorizada"
        ]
      }
    ]
  }
};
