/* ─── Catálogo de Patologias de Porta / Baixa e Moderada Complexidade ─── */
/* Estrutura arquitetural com slots limpos para preenchimento de conteúdo clínico pelo médico-usuário */

const PORTA_CATEGORIES = [
  { id: 'todos', label: 'Todas as Queixas', icon: 'ti-grid-dots' },
  { id: 'urinario', label: 'Urinário & Ginecológico', icon: 'ti-droplet' },
  { id: 'respiratorio', label: 'Otorrino & Respiratório', icon: 'ti-lungs' },
  { id: 'infeccioso', label: 'Infecciosas & Tropicais', icon: 'ti-virus' },
  { id: 'gastro', label: 'Gastrointestinal', icon: 'ti-stomach' },
  { id: 'osteomuscular', label: 'Osteomuscular & Trauma Leve', icon: 'ti-bone' },
  { id: 'cardiopsq', label: 'Cardiovascular & Psíquico', icon: 'ti-heartbeat' },
  { id: 'dermatooft', label: 'Dermatologia & Oftalmo', icon: 'ti-eye' }
];

const PORTA_CATALOG = [
  // ─── Urinário & Ginecológico ───
  {
    id: 'cistite',
    title: 'Cistite Aguda Não Complicada',
    cid10: 'N30.0',
    category: 'urinario',
    categoryLabel: 'Urinário & Ginecológico',
    icon: 'ti-droplet',
    searchKeywords: ['itu', 'infeccao urinaria', 'disuria', 'bexiga', 'polaciuria', 'ardor para urinar'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },
  {
    id: 'colica_renal',
    title: 'Cólica Nefrética Não Complicada (Urolitíase)',
    cid10: 'N23',
    category: 'urinario',
    categoryLabel: 'Urinário & Ginecológico',
    icon: 'ti-ripple',
    searchKeywords: ['colica renal', 'calculo renal', 'pedra nos rins', 'dor lombar em colica', 'hematuria'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },
  {
    id: 'uretrite',
    title: 'Uretrite Masculina / Corrimento Uretral',
    cid10: 'N34.1',
    category: 'urinario',
    categoryLabel: 'Urinário & Ginecológico',
    icon: 'ti-shield-alert',
    searchKeywords: ['ist', 'gonorreia', 'clamidia', 'corrimento uretral', 'disuria masculina', 'secrecao peniana'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 0
    }
  },
  {
    id: 'vulvovaginite',
    title: 'Vulvovaginite Aguda (Candidíase / Vaginose / Tricomoníase)',
    cid10: 'N76.0',
    category: 'urinario',
    categoryLabel: 'Urinário & Ginecológico',
    icon: 'ti-shield-check',
    searchKeywords: ['corrimento vaginal', 'candidiase', 'vaginose bacteriana', 'prurido vulvar', 'leucorreia'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 0
    }
  },

  // ─── Otorrino & Respiratório ───
  {
    id: 'faringite',
    title: 'Faringoamigdalite Aguda',
    cid10: 'J03.9',
    category: 'respiratorio',
    categoryLabel: 'Otorrino & Respiratório',
    icon: 'ti-temperature',
    searchKeywords: ['dor de garganta', 'amigdalite', 'faringite', 'centor', 'placas na garganta', 'pus na garganta'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },
  {
    id: 'sinusite',
    title: 'Rinossinusite Aguda',
    cid10: 'J01.9',
    category: 'respiratorio',
    categoryLabel: 'Otorrino & Respiratório',
    icon: 'ti-headset',
    searchKeywords: ['sinusite', 'congestao nasal', 'pressao facial', 'secrecao nasal purulenta', 'dor de cabeca'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },
  {
    id: 'otite',
    title: 'Otite Média Aguda / Otite Externa',
    cid10: 'H66.9',
    category: 'respiratorio',
    categoryLabel: 'Otorrino & Respiratório',
    icon: 'ti-volume',
    searchKeywords: ['dor de ouvido', 'otalgia', 'otite externa', 'otite media', 'secrecao no ouvido'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },
  {
    id: 'bronquite',
    title: 'Bronquite Aguda / Tosse Pós-Infecciosa',
    cid10: 'J20.9',
    category: 'respiratorio',
    categoryLabel: 'Otorrino & Respiratório',
    icon: 'ti-lungs',
    searchKeywords: ['tosse seca', 'tosse produtiva', 'catarro', 'bronquite', 'peito cheio'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },
  {
    id: 'sindrome_gripal',
    title: 'Síndrome Gripal / COVID-19 Leve',
    cid10: 'J11.1',
    category: 'respiratorio',
    categoryLabel: 'Otorrino & Respiratório',
    icon: 'ti-mask',
    searchKeywords: ['gripe', 'resfriado', 'covid', 'coriza', 'mialgia', 'febre e tosse'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 3
    }
  },

  // ─── Infecciosas & Tropicais ───
  {
    id: 'dengue_leve',
    title: 'Dengue sem Sinais de Alarme (Grupo A / B)',
    cid10: 'A90',
    category: 'infeccioso',
    categoryLabel: 'Infecciosas & Tropicais',
    icon: 'ti-virus',
    searchKeywords: ['dengue', 'arbovirose', 'febre alta', 'dor retroorbitaria', 'prova do laco', 'mialgia intensa'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 3
    }
  },

  // ─── Gastrointestinal ───
  {
    id: 'geca',
    title: 'Gastroenterite Aguda (GECA) / Diarreia Aguda',
    cid10: 'A09',
    category: 'gastro',
    categoryLabel: 'Gastrointestinal',
    icon: 'ti-stomach',
    searchKeywords: ['diarreia', 'vomito', 'intoxicacao alimentar', 'gastroenterite', 'desidratacao'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },
  {
    id: 'dispepsia',
    title: 'Dispepsia Aguda / DRGE Agudizada',
    cid10: 'K30',
    category: 'gastro',
    categoryLabel: 'Gastrointestinal',
    icon: 'ti-flame',
    searchKeywords: ['queimacao no estomago', 'azia', 'refluxo', 'gastrite', 'dor epigastrica'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },
  {
    id: 'hemorroida',
    title: 'Crise Hemorroidária Externa Leve',
    cid10: 'K64.0',
    category: 'gastro',
    categoryLabel: 'Gastrointestinal',
    icon: 'ti-circle-dot',
    searchKeywords: ['hemorroida', 'dor anal', 'trombose hemorroidaria', 'sangramento anal'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },

  // ─── Osteomuscular & Trauma Leve ───
  {
    id: 'lombalgia',
    title: 'Lombalgia Mecânica Aguda / Lombociatalgia',
    cid10: 'M54.5',
    category: 'osteomuscular',
    categoryLabel: 'Osteomuscular & Trauma Leve',
    icon: 'ti-bone',
    searchKeywords: ['dor nas costas', 'dor lombar', 'ciatico', 'travou a coluna', 'lombalgia'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 2
    }
  },
  {
    id: 'entorse_tornozelo',
    title: 'Entorse de Tornozelo Leve / Moderada',
    cid10: 'S93.4',
    category: 'osteomuscular',
    categoryLabel: 'Osteomuscular & Trauma Leve',
    icon: 'ti-walk',
    searchKeywords: ['virou o pe', 'entorse', 'tornozelo inchado', 'ottawa', 'pisou em falso'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 3
    }
  },
  {
    id: 'cervicalgia',
    title: 'Cervicalgia Aguda / Torcicolo',
    cid10: 'M54.2',
    category: 'osteomuscular',
    categoryLabel: 'Osteomuscular & Trauma Leve',
    icon: 'ti-user-exclamation',
    searchKeywords: ['torcicolo', 'dor no pescoco', 'cervicalgia', 'espásmo muscular'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },

  // ─── Cardiovascular & Psíquico ───
  {
    id: 'pseudocrise_pa',
    title: 'Pseudocrise Hipertensiva / Hipertensão Assintomática',
    cid10: 'I10',
    category: 'cardiopsq',
    categoryLabel: 'Cardiovascular & Psíquico',
    icon: 'ti-heartbeat',
    searchKeywords: ['pressao alta', 'pa elevada', 'pseudocrise', 'pressao subiu', 'hipertensao assintomatica'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 0
    }
  },
  {
    id: 'ansiedade_panico',
    title: 'Crise de Ansiedade Aguda / Ataque de Pânico',
    cid10: 'F41.0',
    category: 'cardiopsq',
    categoryLabel: 'Cardiovascular & Psíquico',
    icon: 'ti-activity',
    searchKeywords: ['panico', 'ansiedade', 'falta de ar ansiosa', 'palpitacao ansiosa', 'angustia'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 1
    }
  },

  // ─── Dermatologia & Oftalmo ───
  {
    id: 'celulite_leve',
    title: 'Erisipela / Celulite Leve Não Complicada',
    cid10: 'A46',
    category: 'dermatooft',
    categoryLabel: 'Dermatologia & Oftalmo',
    icon: 'ti-bandage',
    searchKeywords: ['perna vermelha', 'erisipela', 'celulite infecciosa', 'calor local', 'porta de entrada'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 3
    }
  },
  {
    id: 'conjuntivite',
    title: 'Conjuntivite Aguda (Viral / Bacteriana)',
    cid10: 'H10.9',
    category: 'dermatooft',
    categoryLabel: 'Dermatologia & Oftalmo',
    icon: 'ti-eye',
    searchKeywords: ['olho vermelho', 'secrecao ocular', 'conjuntivite', 'remela', 'prurido ocular'],
    diagnosticCriteria: [],
    redFlags: [],
    prescription: {
      firstLine: [],
      secondLine: [],
      symptomatic: []
    },
    nonPharm: [],
    discharge: {
      alarmCriteria: '',
      defaultCertDays: 3
    }
  }
];
