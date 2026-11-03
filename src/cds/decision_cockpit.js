/* ─── Painel Beira-Leito: Crunch Time & Pitfalls (10 Grandes Síndromes) ─── */
let _isCockpitPanelOpen = false;
let _selectedCockpitSyndromeId = null;
let _cockpitSearchQuery = '';

// ─── APOIO À DECISÃO BEIRA-LEITO (10 GRANDES SÍNDROMES / CRUNCH TIME & PITFALLS) ───
const DECISION_SYNDROMES = [
  {
    id: 'dtx',
    title: 'Dor torácica',
    icon: 'ti-heart-rate-monitor',
    subsindromes: ['Síndrome Coronariana Aguda (SCA)', 'Dissecção Aguda de Aorta', 'Equivalentes de Oclusão (OCA)'],
    acoes: [
      'Porta-ECG ≤ 10 min com interpretação médica imediata',
      'Monitorização contínua + acesso venoso periférico calibroso + SpO₂',
      'Na suspeita de Dissecção Aguda de Aorta: controle estrito e imediato de FC antes de qualquer vasodilatador'
    ],
    metas: [
      'SCA: Reperfusão imediata (Porta-Balão ≤ 90 min ou Porta-Agulha ≤ 30 min se ICP indisponível)',
      'Dissecção Aguda de Aorta: FC < 60 bpm e PAS 100–120 mmHg nos primeiros 20 minutos',
      'SpO₂ alvo 90–96% (evitar hiperóxia > 96% de rotina: risco de vasoconstrição coronariana)'
    ],
    pitfalls: [
      'NUNCA iniciar vasodilatador puro em dissecção de aorta sem betabloqueio prévio (aumento do estresse de cisalhamento dP/dt e risco de progressão da falsa luz)',
      'Evitar nitratos se PAS < 100 mmHg ou uso de inibidores da PDE-5 nas últimas 24–48 horas',
      'AINEs aumentam risco de rotura miocárdica em vigência de SCA; evitar rotineiramente'
    ],
    doses: [
      'AAS 200–300 mg mastigado na admissão (antiagregação inicial)',
      'Ticagrelor 180 mg VO ou Clopidogrel 300–600 mg VO conforme protocolo da instituição',
      'Metoprolol 5 mg IV em bólus a cada 5 min (em dissecção de aorta) se FC > 60 bpm e ausência de sinais de choque/bloqueio'
    ]
  },
  {
    id: 'dsp',
    title: 'Dispneia',
    icon: 'ti-lungs',
    subsindromes: ['Edema Agudo de Pulmão (EAP)', 'Crise Asmática / DPOC Exacerbado', 'Tromboembolismo Pulmonar (TEP)'],
    acoes: [
      'Avaliação imediata do padrão respiratório, esforço e estabilidade da via aérea (A-B)',
      'Ventilação Não-Invasiva (VNI - CPAP ou BiPAP) precoce no EAP e na exacerbação grave de DPOC hipercápnica',
      'POCUS beira-leito pulmonar direcionado (protocolo BLUE: linhas B, deslizamento pleural, consolidação) e ecocardiograma focado'
    ],
    metas: [
      'DPOC / Retentor crônico: SpO₂ alvo 88–92% (evitar abolição do drive respiratório por hiperóxia)',
      'EAP / Asma / TEP: SpO₂ alvo 92–96%',
      'EAP Hipertensivo: redução de 20–25% da PAM na 1ª hora para alívio imediato da pós-carga'
    ],
    pitfalls: [
      'Hiperóxia descontrolada em retentores crônicos induz perda de vasoconstrição hipóxica e narcose por CO₂',
      'Atrasar VNI em insuficiência respiratória com acidose respiratória moderada (pH 7,25–7,35)',
      'Regra PERC para TEP só é clinicamente segura se probabilidade pré-teste for baixa'
    ],
    doses: [
      'Salbutamol spray 4–8 jatos com espaçador ou 10–20 gotas em nebulização a cada 20 min',
      'Ipratrópio 20–40 gotas em nebulização associado ao beta-2-agonista na crise',
      'Nitroglicerina IV 10–200 mcg/min em BIC titulada no EAP hipertensivo (PAS > 110 mmHg)'
    ]
  },
  {
    id: 'abd',
    title: 'Dor abdominal',
    icon: 'ti-shield',
    subsindromes: ['Abdome Agudo Inflamatório', 'Abdome Agudo Obstrutivo', 'Abdome Agudo Perfurativo', 'Isquemia Mesentérica'],
    acoes: [
      'Exame abdominal imediato com busca ativa de sinais de peritonite (defesa involuntária, descompressão brusca)',
      'Jejum / Dieta zero imediata e acesso venoso periférico calibroso',
      'Beta-hCG obrigatório em qualquer mulher em idade fértil (12 a 55 anos) para exclusão de prenhez ectópica rota'
    ],
    metas: [
      'Ressuscitação volêmica precoce com cristaloide guiada por perfusão e débito urinário ≥ 0,5 mL/kg/h',
      'Porta-antibiótico ≤ 1 hora se suspeita de peritonite ou sepse abdominal',
      'Alívio efetivo da dor com analgesia multimodal sem retardar conduta cirúrgica'
    ],
    pitfalls: [
      'Analgesia precoce NÃO mascara o exame físico nem atrasa o diagnóstico cirúrgico; aliviar a dor é conduta humanizada obrigatória',
      'Dor abdominal intensa desproporcional ao exame físico em idosos ou vasculopatas exige investigação de isquemia mesentérica',
      'Omitir teste de gravidez em mulher jovem com queixa abdominal'
    ],
    doses: [
      'Dipirona 1 g IV diluída em 100 mL SF 0,9% correr em 15–20 min',
      'Morfina 2–4 mg IV em alíquotas lentas para dor moderada a severa',
      'Ceftriaxona 1–2 g IV + Metronidazol 500 mg IV se suspeita de infecção intra-abdominal bacteriana'
    ]
  },
  {
    id: 'trauma',
    title: 'Trauma',
    icon: 'ti-first-aid-kit',
    subsindromes: ['Politrauma com Choque Hemorrágico', 'Traumatismo Cranioencefálico (TCE) Grave'],
    acoes: [
      'Sistematização do protocolo X-ABCDE com controle prioritário e agressivo de sangramento exanguinante externo',
      'Imobilização cervical com colar e prancha sob critérios indicados',
      'POCUS e-FAST beira-leito imediato para rastreio de líquido livre peritoneal, pericárdico e pleural'
    ],
    metas: [
      'Ressuscitação hemostática proporcional (1:1:1 de CH, PFC e plaquetas) se choque hemorrágico grave',
      'Ácido Tranexâmico administrado nas primeiras 3 horas do trauma com sangramento significativo ou choque',
      'TCE Grave: PAS ≥ 100–110 mmHg, PPC 60–70 mmHg e normocapnia (PaCO₂ 35–40 mmHg)'
    ],
    pitfalls: [
      'Episódio único de hipotensão (PAS < 90 mmHg) ou hipóxia em TCE duplica a mortalidade',
      'Sobrecarga maciça de cristaloides no choque hemorrágico agrava coagulopatia dilucional e hipotermia',
      'Ácido tranexâmico administrado após 3 horas do trauma perde benefício e pode aumentar morbidade'
    ],
    doses: [
      'Ácido Tranexâmico 1 g IV em 10 min na admissão, seguido de 1 g IV infundido em 8 horas',
      'Ativação de Protocolo de Transfusão Maciça (PTM) com sangue total ou proporção balanceada 1:1:1'
    ]
  },
  {
    id: 'neu',
    title: 'Déficit neurológico focal',
    icon: 'ti-brain',
    subsindromes: ['AVC Isquêmico (AVCI)', 'AVC Hemorrágico (AVCH)', 'Ataque Isquêmico Transitório (AIT)'],
    acoes: [
      'Glicemia capilar imediata na chegada (regra de ouro mandatória: descartar hipoglicemia)',
      'Determinar horário exato do início dos sintomas ou último momento visto bem (last known well)',
      'TC de crânio sem contraste em regime de urgência absoluta (porta-TC ≤ 20 min) + aplicação da escala NIHSS'
    ],
    metas: [
      'AVCI elegível à trombólise: PA < 185/110 mmHg antes da infusão e < 180/105 mmHg nas primeiras 24h',
      'AVCI não candidato à reperfusão: hipertensão permissiva (tratar apenas se PA > 220/120 mmHg; queda máx. 15% em 24h)',
      'AVCH agudo: controle precoce da PAS com alvo < 140 mmHg com anti-hipertensivo titulável'
    ],
    pitfalls: [
      'Queda abrupta e agressiva da PA no AVCI sem reperfusão prejudica perfusão da penumbra isquêmica',
      'Atrasar trombólise aguardando exames laboratoriais (exceto se uso de anticoagulantes ou suspeita de plaquetopenia)',
      'Administrar AAS ou anticoagulante antes da TC descartar evento hemorrágico'
    ],
    doses: [
      'Alteplase (rt-PA) 0,9 mg/kg (máx 90 mg; 10% bólus em 1 min e restante em 60 min) ou Tenecteplase 0,25 mg/kg bólus único',
      'Nitroprussiato de Sódio ou Labetalol para titulação rápida de PA se PAS > 185 ou PAD > 110 mmHg pré-lise'
    ]
  },
  {
    id: 'sepse',
    title: 'Sepse e choque séptico',
    icon: 'ti-virus',
    subsindromes: ['Sepse — Protocolo da 1ª Hora (Golden Hour)', 'Choque Séptico / Vasopressores Precoces'],
    acoes: [
      'Coleta de 2 pares de hemoculturas de sítios distintos antes de iniciar antimicrobiano (sem atrasar início)',
      'Dosagem imediata de lactato sérico na admissão (repetir em 2–4 horas se inicial alterado)',
      'Expansão volêmica inicial com cristaloide balanceado (30 mL/kg se hipotensão ou lactato ≥ 4 mmol/L)'
    ],
    metas: [
      'Início de antimicrobiano parenteral de amplo espectro em ≤ 1 hora da identificação',
      'Pressão Arterial Média (PAM) alvo ≥ 65 mmHg',
      'Clareamento de lactato sérico > 20% em 2–4 horas e tempo de enchimento capilar (TEC) ≤ 3 segundos'
    ],
    pitfalls: [
      'Atrasar antibiótico para aguardar resultados de exames de imagem ou vaga de internação',
      'Insistir em infusão excessiva de cristaloides se hipotensão mantida (iniciar vasopressor precocemente)',
      'Grandes volumes de SF 0,9% induzem acidose metabólica hiperclorêmica; preferir cristaloide balanceado'
    ],
    doses: [
      'Noradrenalina: iniciar a 0,05–0,1 mcg/kg/min IV em BIC titulada para PAM ≥ 65 mmHg',
      'Cristaloide balanceado (Ringer Lactato ou similar) em alíquotas de 500 mL avaliando responsividade volêmica'
    ]
  },
  {
    id: 'vert',
    title: 'Vertigem',
    icon: 'ti-rotate-clockwise',
    subsindromes: ['Síndrome Vestibular Aguda Contínua', 'Diferenciação Periférica vs Central (AVC Fossa Posterior)', 'VPPB'],
    acoes: [
      'Diferenciar vertigem aguda contínua espontânea com nistagmo da vertigem episódica posicional',
      'Aplicar o exame HINTS (Head Impulse, Nystagmus, Test of Skew) SOMENTE se nistagmo espontâneo ativo presente',
      'Pesquisa direcionada de sinais de tronco/cerebelo (dismetria, ataxia de marcha, disdiadococinesia)'
    ],
    metas: [
      'Identificação rápida de sinais centrais (HINTS central tem sensibilidade superior à RNM nas primeiras 24–48h)',
      'Exclusão de isquemia de circulação posterior / cerebelar em idosos e vasculopatas'
    ],
    pitfalls: [
      'Aplicar o teste HINTS em paciente sem nistagmo ativo (perda total da acurácia diagnóstica)',
      'Assumir etiologia periférica exclusivamente pela presença de náuseas intensas ou vômitos',
      'TC de crânio inicial normal NÃO descarta AVC isquêmico de fossa posterior nas primeiras 24 horas'
    ],
    doses: [
      'Dimenidrinato 50 mg IV ou Ondansetrona 8 mg IV para alívio sintomático de êmese e náusea',
      'Manobra de Epley direcionada quando confirmado diagnóstico de VPPB de canal semicircular posterior'
    ]
  },
  {
    id: 'rnc',
    title: 'Rebaixamento do nível de consciência',
    icon: 'ti-mood-empty',
    subsindromes: ['Abordagem MOVE e Patência de Via Aérea', 'Encefalopatia Metabólica / Hipoglicemia', 'Toxíndromes'],
    acoes: [
      'Glicemia capilar imediata na admissão (regra mandatória em qualquer alteração de consciência)',
      'Avaliação da permeabilidade de via aérea, drive respiratório e oximetria de pulso (A-B)',
      'Exame pupilar (tamanho, simetria e fotorreatividade) e busca de sinais de trauma cranioencefálico'
    ],
    metas: [
      'Glicemia capilar corrigida para ≥ 70–100 mg/dL imediatamente',
      'Patência de via aérea e ventilação alveolar preservadas',
      'Identificação e reversão de causas metabólicas e toxicológicas reversíveis'
    ],
    pitfalls: [
      'Glasgow ≤ 8 isolado não é indicação mandatória cega de IOT se a causa for reversível de imediato (ex: hipoglicemia, pós-ictal breve)',
      'Não administrar glicose hipertônica sem tiamina prévia em desnutridos ou etilistas crônicos (risco de Wernicke)',
      'Hipotermia grave e hipercapnia grave mimetizam morte encefálica ou coma profundo'
    ],
    doses: [
      'Glicose 50% 40–80 mL IV em bólus se hipoglicemia < 70 mg/dL',
      'Naloxona 0,04 a 0,4 mg IV a cada 2–3 min se suspeita de overdose por opioides (alvo: drive respiratório)',
      'Tiamina 100–500 mg IV antes ou concomitante à glicose se suspeita de desnutrição/etilismo crônico'
    ]
  },
  {
    id: 'ict',
    title: 'Icterícia',
    icon: 'ti-droplet',
    subsindromes: ['Insuficiência Hepática Aguda (IHA)', 'Colangite Aguda Obstrutiva', 'Cirrose Descompensada'],
    acoes: [
      'Avaliar presença de encefalopatia hepática e coagulopatia aguda (TAP/INR e plaquetas)',
      'Buscar febre e dor em HCD (Tríade de Charcot / Pêntade de Reynolds para colangite aguda)',
      'POCUS para avaliar dilatação de vias biliares intra/extra-hepáticas e ascite'
    ],
    metas: [
      'Glicemia > 100 mg/dL mantida (vigilância horária na IHA por comprometimento da gliconeogênese)',
      'Sódio sérico estrito 140–145 mEq/L na IHA (hiponatremia agrava o edema cerebral e hipertensão intracraniana)',
      'Colangite Aguda: descompressão biliar urgente (CPRE ou drenagem percutânea) se sepse'
    ],
    pitfalls: [
      'Atrasar antibiótico e drenagem biliar em colangite aguda com sepse ou choque',
      'Administrar benzodiazepínicos ou sedativos em suspeita de encefalopatia hepática',
      'Ignorar hipoglicemia inadvertida em hepatite fulminante'
    ],
    doses: [
      'N-acetilcisteína (NAC) precoce se suspeita de intoxicação por paracetamol ou hepatite aguda fulminante',
      'Ceftriaxona 1–2 g IV + Metronidazol 500 mg IV na colangite aguda infecciosa',
      'Lactulose 20–30 mL VO/SNG titulada se encefalopatia hepática no cirrótico'
    ]
  },
  {
    id: 'hdg',
    title: 'Hemorragia digestiva',
    icon: 'ti-droplets',
    subsindromes: ['HDA Varicosa (Hipertensão Portal)', 'HDA Não-Varicosa (Úlcera Péptica)', 'Hemorragia Digestiva Baixa'],
    acoes: [
      'Dois acessos venosos periféricos calibrosos imediatos (16G ou 18G) e monitorização contínua',
      'Tipagem sanguínea imediata e reserva precoce de concentrado de hemácias',
      'Estratificação precoce de gravidade (Glasgow-Blatchford) e preparo para endoscopia'
    ],
    metas: [
      'Ressuscitação volêmica permissiva: PAM alvo de aproximadamente 65 mmHg (evitar elevação excessiva da pressão portal)',
      'Gatilho transfusional restritivo: concentrado de hemácias se Hb < 7,0 g/dL (alvo 7–8 g/dL), exceto coronariopatia aguda ativa',
      'Endoscopia Digestiva Alta (EDA): nas primeiras 12–24h após estabilização hemodinâmica inicial'
    ],
    pitfalls: [
      'Hiper-ressuscitação com cristaloides aumenta a pressão na veia porta e precipita ressangramento de varizes',
      'Transfusão liberal (alvo Hb > 9–10 g/dL) comprovadamente aumenta a mortalidade em sangramento gastrointestinal agudo',
      'Omitir antibiótico profilático em hemorragia digestiva no paciente cirrótico'
    ],
    doses: [
      'Terlipressina 2 mg IV em bólus (ou Octreotide 50 mcg bólus + 50 mcg/h BIC) na suspeita de sangramento varicoso',
      'Omeprazol 80 mg IV em bólus seguido de infusão contínua 8 mg/h ou 40 mg IV 12/12h',
      'Ceftriaxona 1 g IV/dia para profilaxia antibiótica em cirróticos com hemorragia digestiva alta'
    ]
  }
];

function detectActiveSyndromeId(){
  const q = (S.queixa || '').toLowerCase();
  const s = (S.sind || '').toLowerCase();
  const sub = (S.subsind || '').toLowerCase();

  if (q.includes('torác') || q.includes('torac') || s === 'dtx' || s === 'sca' || sub.includes('sca')) return 'dtx';
  if (q.includes('dispne') || q.includes('falta de ar') || s === 'dsp' || s === 'tep' || s === 'dpoc') return 'dsp';
  if (q.includes('abdom') || s === 'abd') return 'abd';
  if (q.includes('trauma') || s === 'trauma') return 'trauma';
  if (q.includes('focal') || q.includes('avc') || q.includes('fraqueza') || s === 'neu' || sub.includes('avc')) return 'neu';
  if (q.includes('sepse') || q.includes('febre') || s === 'sepse' || s === 'cho') return 'sepse';
  if (q.includes('vertig') || q.includes('tontur') || s === 'vert') return 'vert';
  if (q.includes('rebaixa') || q.includes('consci') || q.includes('coma') || s === 'rnc') return 'rnc';
  if (q.includes('icter') || s === 'ict') return 'ict';
  if (q.includes('hemorrag') || q.includes('melena') || q.includes('hematêm') || s === 'hdg' || s === 'hda') return 'hdg';
  return 'dtx';
}

function openCockpitDecisionPanel(targetSyndromeId){
  _isCockpitPanelOpen = true;
  if(targetSyndromeId) _selectedCockpitSyndromeId = targetSyndromeId;
  else if(!_selectedCockpitSyndromeId) _selectedCockpitSyndromeId = detectActiveSyndromeId();
  const panel = document.getElementById('cockpitDecisionPanel');
  if(panel){
    panel.style.display = 'block';
    renderCockpitDecisionPanel();
    panel.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
  const btn = document.querySelector('.hdr-btn-decision');
  if(btn) btn.classList.add('active');
}

function closeCockpitDecisionPanel(){
  _isCockpitPanelOpen = false;
  const panel = document.getElementById('cockpitDecisionPanel');
  if(panel) panel.style.display = 'none';
  const btn = document.querySelector('.hdr-btn-decision');
  if(btn) btn.classList.remove('active');
}

function toggleCockpitDecisionPanel(){
  if(_isCockpitPanelOpen) closeCockpitDecisionPanel();
  else openCockpitDecisionPanel();
}

function selectCockpitSyndrome(id){
  _selectedCockpitSyndromeId = id;
  renderCockpitDecisionPanel();
}

function onCockpitSearch(val){
  _cockpitSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('cockpitSearchClearBtn');
  if(clearBtn) clearBtn.style.display = _cockpitSearchQuery ? 'block' : 'none';
  const container = document.querySelector('.cockpit-syndromes-container');
  if(container){
    const searchQ = _cockpitSearchQuery.toLowerCase();
    const activeDetectedId = detectActiveSyndromeId();
    const curSyndromeId = _selectedCockpitSyndromeId || activeDetectedId;
    const selectedSyndromeObj = DECISION_SYNDROMES.find(x => x.id === curSyndromeId) || DECISION_SYNDROMES[0];
    let filteredSyndromes = DECISION_SYNDROMES;
    if(searchQ){
      filteredSyndromes = DECISION_SYNDROMES.filter(s => {
        const matchTitle = s.title.toLowerCase().includes(searchQ);
        const matchSub = s.subsindromes.some(sub => sub.toLowerCase().includes(searchQ));
        const matchMetas = s.metas.some(m => m.toLowerCase().includes(searchQ));
        const matchAcoes = s.acoes.some(a => a.toLowerCase().includes(searchQ));
        const matchPitfalls = s.pitfalls.some(p => p.toLowerCase().includes(searchQ));
        const matchDoses = s.doses.some(d => d.toLowerCase().includes(searchQ));
        return matchTitle || matchSub || matchMetas || matchAcoes || matchPitfalls || matchDoses;
      });
    }
    container.innerHTML = searchQ ? renderCockpitSearchResults(filteredSyndromes, searchQ) : renderCockpitSingleSyndrome(selectedSyndromeObj);
    return;
  }
  renderCockpitDecisionPanel();
}

function clearCockpitSearch(){
  _cockpitSearchQuery = '';
  const input = document.getElementById('cockpitSearchInput');
  if(input) input.value = '';
  const clearBtn = document.getElementById('cockpitSearchClearBtn');
  if(clearBtn) clearBtn.style.display = 'none';
  const container = document.querySelector('.cockpit-syndromes-container');
  if(container){
    const curSyndromeId = _selectedCockpitSyndromeId || detectActiveSyndromeId();
    const selectedSyndromeObj = DECISION_SYNDROMES.find(x => x.id === curSyndromeId) || DECISION_SYNDROMES[0];
    container.innerHTML = renderCockpitSingleSyndrome(selectedSyndromeObj);
    if(input) input.focus();
    return;
  }
  renderCockpitDecisionPanel();
}

function renderCockpitDecisionPanel(){
  const panel = document.getElementById('cockpitDecisionPanel');
  if(!panel) return;

  const activeDetectedId = detectActiveSyndromeId();
  const activeSyndromeObj = DECISION_SYNDROMES.find(x => x.id === activeDetectedId) || DECISION_SYNDROMES[0];
  const curSyndromeId = _selectedCockpitSyndromeId || activeDetectedId;
  const selectedSyndromeObj = DECISION_SYNDROMES.find(x => x.id === curSyndromeId) || DECISION_SYNDROMES[0];

  const searchQ = (_cockpitSearchQuery || '').trim().toLowerCase();

  let filteredSyndromes = DECISION_SYNDROMES;
  if(searchQ){
    filteredSyndromes = DECISION_SYNDROMES.filter(s => {
      const matchTitle = s.title.toLowerCase().includes(searchQ);
      const matchSub = s.subsindromes.some(sub => sub.toLowerCase().includes(searchQ));
      const matchMetas = s.metas.some(m => m.toLowerCase().includes(searchQ));
      const matchAcoes = s.acoes.some(a => a.toLowerCase().includes(searchQ));
      const matchPitfalls = s.pitfalls.some(p => p.toLowerCase().includes(searchQ));
      const matchDoses = s.doses.some(d => d.toLowerCase().includes(searchQ));
      return matchTitle || matchSub || matchMetas || matchAcoes || matchPitfalls || matchDoses;
    });
  }

  const conflictAlerts = (typeof getConflictAlerts === 'function') ? getConflictAlerts(S) : [];
  let conflictAlertsHtml = '';
  if(conflictAlerts.length){
    conflictAlertsHtml = `
      <div style="background:#fef2f2;border:1.5px solid #dc2626;border-radius:8px;padding:9px 12px;margin-bottom:12px">
        <div style="font-weight:700;color:#991b1b;font-size:12.5px;display:flex;align-items:center;gap:6px">
          <i class="ti ti-shield-alert" style="color:#dc2626;font-size:16px"></i>
          Conflitos Farmacológicos Detectados no Paciente (${conflictAlerts.length})
        </div>
        ${conflictAlerts.map(a => `
          <div style="margin-top:4px;font-size:11.5px;color:#7f1d1d;line-height:1.4">
            <strong>${esc(a.title)}:</strong> ${esc(a.text)}
          </div>
        `).join('')}
      </div>
    `;
  }

  panel.innerHTML = `
    <div class="cockpit-decision-hdr">
      <div class="cockpit-decision-title">
        <i class="ti ti-bolt" style="color:#38bdf8"></i>
        <span>Apoio à Decisão Beira-Leito — Crunch Time & Pitfalls</span>
      </div>
      <div class="cockpit-decision-controls">
        <span style="font-size:11px;opacity:0.8;margin-right:4px">100% Interativo</span>
        <button type="button" class="cockpit-close-btn" onclick="closeCockpitDecisionPanel()" title="Fechar painel de apoio">
          <i class="ti ti-x"></i> Fechar
        </button>
      </div>
    </div>
    <div class="cockpit-decision-body">
      ${conflictAlertsHtml}

      <!-- Pinned Active Case Syndrome -->
      <div class="cockpit-pinned-alert">
        <div style="display:flex;align-items:center;gap:8px">
          <i class="ti ti-pin" style="font-size:15px"></i>
          <div>
            <strong>Síndrome Ativa no Caso:</strong> ${esc(activeSyndromeObj.title)}
            <span style="font-size:11px;opacity:0.85;margin-left:6px">(${esc(activeSyndromeObj.subsindromes.join(', '))})</span>
          </div>
        </div>
        ${activeSyndromeObj.id !== curSyndromeId ? `
          <button type="button" class="btns" style="padding:2px 8px;font-size:11px;background:#2563eb;color:#fff;border:none;border-radius:4px;cursor:pointer" onclick="selectCockpitSyndrome('${activeSyndromeObj.id}')">
            Ver Ativa
          </button>
        ` : ''}
      </div>

      <!-- Search Bar -->
      <div class="cockpit-search-bar">
        <input type="text" class="cockpit-search-input" id="cockpitSearchInput" placeholder="🔍 Buscar nas 10 síndromes (ações, metas, subssíndromes, pitfalls, doses)..." oninput="onCockpitSearch(this.value)" value="${esc(_cockpitSearchQuery)}">
        <button type="button" class="cockpit-search-clear" id="cockpitSearchClearBtn" onclick="clearCockpitSearch()" style="${_cockpitSearchQuery ? '' : 'display:none'}">&times;</button>
      </div>

      <!-- Chips horizontal scroll -->
      <div class="cockpit-chips-scroll">
        ${DECISION_SYNDROMES.map(synd => `
          <button type="button" class="cockpit-chip ${synd.id === curSyndromeId ? 'active' : ''}" onclick="selectCockpitSyndrome('${synd.id}')">
            <i class="ti ${synd.icon || 'ti-notes'}"></i>
            <span>${esc(synd.title)}</span>
          </button>
        `).join('')}
      </div>

      <!-- Main Syndromes Presentation -->
      <div class="cockpit-syndromes-container">
        ${searchQ ? renderCockpitSearchResults(filteredSyndromes, searchQ) : renderCockpitSingleSyndrome(selectedSyndromeObj)}
      </div>

      <!-- Real-time weight calculators (SRI & Nora) at footer -->
      <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--color-border-tertiary,#e2e8f0)">
        <details style="font-size:12px;color:var(--color-text-secondary,#475569)">
          <summary style="cursor:pointer;font-weight:600;color:var(--color-brand,#1e40af);user-select:none">
            <i class="ti ti-calculator"></i> Calculadora Rápida por Peso (SRI & Noradrenalina)
          </summary>
          <div style="margin-top:10px">
            ${renderCockpitCalculators()}
          </div>
        </details>
      </div>
    </div>
  `;
}

function renderCockpitSingleSyndrome(s){
  return `
    <div class="cockpit-syndrome-card" style="background:var(--color-background-primary,#ffffff);border:1px solid var(--color-border-secondary,#cbd5e1);border-radius:10px;padding:12px 14px;margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--color-border-tertiary,#e2e8f0);padding-bottom:8px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="background:#eff6ff;color:#2563eb;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px">
            <i class="ti ${s.icon || 'ti-heart-rate-monitor'}"></i>
          </div>
          <div>
            <h4 style="margin:0;font-size:14px;color:var(--color-text-primary,#0f172a);font-weight:700">${esc(s.title)}</h4>
            <div style="font-size:11px;color:var(--color-text-secondary,#64748b);margin-top:2px">${esc(s.subsindromes.join(' • '))}</div>
          </div>
        </div>
        <span class="sb" style="font-size:10.5px;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0">Crunch Time Beira-Leito</span>
      </div>

      <!-- 1. Ações Críticas Imediatas (< 30s) -->
      <div style="margin-bottom:10px">
        <div style="font-size:12px;font-weight:700;color:#b91c1c;margin-bottom:4px;display:flex;align-items:center;gap:5px">
          <i class="ti ti-bolt"></i> Ações Críticas Imediatas (&lt; 30s / Primeiros 5 min):
        </div>
        ${s.acoes && s.acoes.length > 0 ? `
          <ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.55;color:var(--color-text-primary,#1e293b)">
            ${s.acoes.map(a => `<li>${esc(a)}</li>`).join('')}
          </ul>
        ` : `
          <div class="cockpit-empty-slot"><em>(Aguardando inserção de texto do especialista)</em></div>
        `}
      </div>

      <!-- 2. Metas Fisiológicas & Hemodinâmicas -->
      <div style="margin-bottom:10px">
        <div style="font-size:12px;font-weight:700;color:#2563eb;margin-bottom:4px;display:flex;align-items:center;gap:5px">
          <i class="ti ti-target"></i> Metas Hemodinâmicas & Fisiológicas Imediatas:
        </div>
        ${s.metas && s.metas.length > 0 ? `
          <ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.55;color:var(--color-text-primary,#1e293b)">
            ${s.metas.map(m => `<li>${esc(m)}</li>`).join('')}
          </ul>
        ` : `
          <div class="cockpit-empty-slot"><em>(Aguardando inserção de texto do especialista)</em></div>
        `}
      </div>

      <!-- 3. Banner de Prevenção / Pitfalls Integrado -->
      <div style="margin-bottom:10px">
        ${s.pitfalls && s.pitfalls.length > 0 ? `
          <div class="cockpit-pitfall-banner">
            <div class="cockpit-pitfall-title">
              <i class="ti ti-alert-triangle"></i> Atenção / Armadilhas / O que NÃO fazer:
            </div>
            <ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.55;color:#92400e">
              ${s.pitfalls.map(p => `<li>${esc(p)}</li>`).join('')}
            </ul>
          </div>
        ` : `
          <div class="cockpit-empty-slot" style="background:#fffbeb;border-color:#fde68a;color:#b45309">
            <i class="ti ti-alert-triangle" style="margin-right:4px"></i>
            <em>(Aguardando inserção de texto do especialista — Armadilhas / O que NÃO fazer)</em>
          </div>
        `}
      </div>

      <!-- 4. Doses de Ataque e Diluições Rápidas -->
      <div>
        <div style="font-size:12px;font-weight:700;color:#059669;margin-bottom:4px;display:flex;align-items:center;gap:5px">
          <i class="ti ti-pill"></i> Doses de Ataque & Diluições de Emergência:
        </div>
        ${s.doses && s.doses.length > 0 ? `
          <ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.55;color:var(--color-text-primary,#1e293b)">
            ${s.doses.map(d => `<li>${esc(d)}</li>`).join('')}
          </ul>
        ` : `
          <div class="cockpit-empty-slot"><em>(Aguardando inserção de texto do especialista)</em></div>
        `}
      </div>
    </div>
  `;
}

function renderCockpitSearchResults(list, q){
  if(list.length === 0){
    return `
      <div style="text-align:center;padding:32px 14px;color:var(--color-text-secondary,#64748b)">
        <i class="ti ti-search-off" style="font-size:32px;color:#94a3b8;display:block;margin-bottom:8px"></i>
        <strong style="color:var(--color-text-primary,#0f172a)">Nenhuma síndrome encontrada para "${esc(q)}"</strong>
        <p style="font-size:12px;margin:4px 0 10px 0">Tente buscar por termos como "aorta", "hints", "choque", "sepse" ou limpe a busca.</p>
        <button type="button" class="btns" style="padding:4px 10px;font-size:11.5px" onclick="clearCockpitSearch()">Limpar filtro</button>
      </div>
    `;
  }
  return list.map(s => renderCockpitSingleSyndrome(s)).join('');
}

function renderCockpitCalculators(){
  const currentWeight = (parseFloat(S.peso) > 0) ? parseFloat(S.peso) : 70;
  const isDefaultWeight = !parseFloat(S.peso);
  const sriK1 = (currentWeight * 1.5).toFixed(0);
  const sriK2 = (currentWeight * 2.0).toFixed(0);
  const sriR = (currentWeight * 1.2).toFixed(0);
  const sriF1 = (currentWeight * 2.0).toFixed(0);
  const sriF2 = (currentWeight * 3.0).toFixed(0);
  const sriM1 = (currentWeight * 0.2).toFixed(1);
  const sriM2 = (currentWeight * 0.3).toFixed(1);
  const sriE = (currentWeight * 0.3).toFixed(1);
  const sriS = (currentWeight * 1.5).toFixed(0);

  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <strong style="color:#1e3a8a">Doses por Peso: ${currentWeight} kg ${isDefaultWeight ? '(padrão)' : ''}</strong>
        <span style="font-size:11px;color:#64748b">Calculado em tempo real</span>
      </div>
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between">
        <span>Sequência Rápida de Intubação (SRI)</span>
        <button type="button" class="btng" style="padding:2px 7px;font-size:10.5px;background:#2563eb" onclick="copySriDoses(${currentWeight})">
          <i class="ti ti-copy"></i> Copiar para Conduta
        </button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px;margin-bottom:10px">
        <div style="background:#fff;padding:4px 6px;border-radius:4px;border:1px solid #e2e8f0">Quetamina (1,5–2 mg/kg): <strong>${sriK1} a ${sriK2} mg</strong></div>
        <div style="background:#fff;padding:4px 6px;border-radius:4px;border:1px solid #e2e8f0">Rocurônio (1,2 mg/kg): <strong>${sriR} mg</strong></div>
        <div style="background:#fff;padding:4px 6px;border-radius:4px;border:1px solid #e2e8f0">Fentanil (2–3 mcg/kg): <strong>${sriF1} a ${sriF2} mcg</strong></div>
        <div style="background:#fff;padding:4px 6px;border-radius:4px;border:1px solid #e2e8f0">Etomidato (0,3 mg/kg): <strong>${sriE} mg</strong></div>
      </div>
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between">
        <span>Noradrenalina (Solução 64 mcg/mL: 4 amp em 234 mL SG5%)</span>
        <button type="button" class="btng" style="padding:2px 7px;font-size:10.5px;background:#dc2626" onclick="copyNoraDose(${currentWeight})">
          <i class="ti ti-copy"></i> Copiar para Conduta
        </button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:10.5px;text-align:center">
        ${[0.05, 0.1, 0.2, 0.5, 1.0].map(rate => {
          const mlh = ((rate * currentWeight * 60) / 64).toFixed(1);
          return `<div style="background:#fff;padding:3px;border-radius:4px;border:1px solid #fecaca"><strong>${rate}</strong><br><span style="color:#dc2626;font-weight:700">${mlh} mL/h</span></div>`;
        }).join('')}
      </div>
    </div>
  `;
}


function copySriDoses(w){
  const kDose = (w * 1.5).toFixed(0);
  const rDose = (w * 1.2).toFixed(0);
  const fDose = (w * 2.0).toFixed(0);
  const txt = `[Prescrição SRI — Peso ${w} kg]\n- Quetamina ${kDose} mg (${(kDose/50).toFixed(1)} mL) IV em bólus\n- Rocurônio ${rDose} mg (${(rDose/10).toFixed(1)} mL) IV em bólus\n- Fentanil ${fDose} mcg (${(fDose/50).toFixed(1)} mL) IV em bólus pré-procedimento`;
  if(!S.imp) S.imp = txt; else S.imp += '\n\n' + txt;
  navigator.clipboard.writeText(txt).then(()=>{
    showToast(`Doses de SRI para ${w} kg copiadas e adicionadas à conduta!`);
    render();
  });
}

function copyNoraDose(w){
  const mlh = ((0.1 * w * 60) / 64).toFixed(1);
  const txt = `[DVA — Noradrenalina 64 mcg/mL]\n- Noradrenalina 4 ampolas (16 mg) em 234 mL SG 5% IV em BIC contínua.\n- Iniciar vazão a ${mlh} mL/h (dose inicial 0,1 mcg/kg/min para ${w} kg).\n- Titular a cada 2–5 min para alvo de PAM >= 65 mmHg e TEC <= 3s.`;
  if(!S.imp) S.imp = txt; else S.imp += '\n\n' + txt;
  navigator.clipboard.writeText(txt).then(()=>{
    showToast(`Prescrição de Noradrenalina para ${w} kg copiada e adicionada!`);
    render();
  });
}

// Aliases para compatibilidade legada
let _activeDecisionTab = 'metas';
function openDecisionDrawer(tab){ openCockpitDecisionPanel(); }
function closeDecisionDrawer(){ closeCockpitDecisionPanel(); }
function toggleDecisionDrawer(){ toggleCockpitDecisionPanel(); }
function setDecisionTab(tab){ openCockpitDecisionPanel(); }
function onDecisionSearch(q){ onCockpitSearch(q); }
function clearDecisionSearch(){ clearCockpitSearch(); }
function renderDecisionSupportContent(tab){ renderCockpitDecisionPanel(); }


