/**
 * Golden Master Test Runner — Emergência Pro
 * Suíte de testes e snapshots de regressão para garantir 100% de paridade clínica
 * durante e após o processo de modularização.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SNAPSHOT_PATH = path.join(__dirname, 'golden_master_snapshot.json');

function loadContext(htmlFilePath) {
  const html = fs.readFileSync(htmlFilePath, 'utf8');
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let fullScript = '';
  while ((match = scriptRegex.exec(html)) !== null) {
    fullScript += match[1] + '\n';
  }

  const mockSupabase = {
    createClient: () => ({
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    })
  };

  const FIXED_DATE = new Date('2026-11-02T23:00:00Z');
  class MockDate extends Date {
    constructor(...args) {
      if (args.length === 0) super(FIXED_DATE.getTime());
      else super(...args);
    }
    static now() {
      return FIXED_DATE.getTime();
    }
  }

  const context = {
    console: { log: () => {}, warn: () => {}, error: () => {} },
    Date: MockDate,
    supabase: mockSupabase,
    addEventListener: () => {},
    removeEventListener: () => {},
    document: {
      getElementById: () => ({ style: {}, value: '', addEventListener: () => {}, textContent: '' }),
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => ({ style: {}, setAttribute: () => {} }),
      addEventListener: () => {}
    },
    navigator: { userAgent: 'node', clipboard: { writeText: () => Promise.resolve() } },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval
  };
  context.window = context;
  context.global = context;

  vm.createContext(context);
  vm.runInContext(fullScript, context);

  const exports = vm.runInContext('({ S, CT, INITIAL_S, buildHeader, buildHDA, buildAntecedentes, buildEF, buildEcgText, buildPocText, buildCondutas, gRel, extractPepSection, alvaradoSc, wellsTepSc, wellsTvpSc, nihssSc })', context);
  Object.assign(context, exports);

  context.resetS = () => {
    Object.assign(context.S, JSON.parse(JSON.stringify(context.INITIAL_S)));
    context.S.chk = {};
    context.S.nts = {};
    context.S.subsinds = [];
  };

  return context;
}

function runScenarios(ctx) {
  const { S, CT, resetS, buildHeader, buildHDA, buildAntecedentes, buildEF, buildEcgText, buildPocText, buildCondutas, gRel, extractPepSection, alvaradoSc, wellsTepSc, wellsTvpSc, nihssSc } = ctx;

  const results = {};

  const scenarios = [
    {
      id: '01_sca',
      name: 'Dor Torácica - SCA sem supra',
      setup: () => {
        resetS();
        S.nome = 'Carlos Silva'; S.idade = 58; S.sexo = 'M'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Dor torácica'; S.tempo = '2 horas';
        Object.assign(S.dt, { qual: ['Opressiva / em aperto'], loc: ['Retroesternal'], irr: ['Membro superior esquerdo (MSE)', 'Mandíbula'], modif: ['Piora aos esforços', 'Alívio com repouso'] });
        S.hpp = ['HAS', 'DM tipo 2', 'Tabagismo'];
        S.muc = 'Losartana 50mg, Metformina 850mg';
        S.pa = '150/90'; S.fc = '88'; S.fr = '18'; S.sat = '97'; S.temp = '36.5'; S.gli = '130';
        S.sind = 'dtx'; S.subsind = 'sca_noca';
        S.chk['sca_noca_sup_0'] = true; S.chk['sca_noca_sup_1'] = true;
        S.chk['sca_noca_inv_0'] = true; S.chk['sca_noca_inv_1'] = true;
        S.chk['sca_noca_esp_0'] = true; S.chk['sca_noca_esp_1'] = true;
      }
    },
    {
      id: '02_disseccao_aorta',
      name: 'Dor Torácica - Dissecção Aguda de Aorta',
      setup: () => {
        resetS();
        S.nome = 'Marcos Pontes'; S.idade = 64; S.sexo = 'M'; S.orig = 'SAMU';
        S.queixa = 'Dor torácica'; S.tempo = '40 minutos';
        Object.assign(S.dt, { qual: ['Lancinante / rasgando'], loc: ['Precordial'], irr: ['Dorso'], ini: 'Súbito em repouso' });
        S.hpp = ['HAS de difícil controle'];
        S.pa = '190/110'; S.fc = '102'; S.fr = '22'; S.sat = '96'; S.temp = '36.2';
        S.sind = 'dtx'; S.subsind = 'dt_ind'; S.subsinds = ['diss'];
        S.chk['dt_ind_sup_0'] = true; S.chk['diss_inv_0'] = true;
      }
    },
    {
      id: '03_dpoc_agudizado',
      name: 'Dispneia - DPOC Agudizado',
      setup: () => {
        resetS();
        S.nome = 'Antônio Costa'; S.idade = 71; S.sexo = 'M'; S.orig = 'SAMU';
        S.queixa = 'Dispneia'; S.tempo = '3 dias';
        Object.assign(S.dsp, { padrao: ['Piora progressiva'], modif: ['Ortopneia'], assocResp: ['Tosse produtiva', 'Expectoração purulenta', 'Sibilância'] });
        S.hpp = ['DPOC grave', 'Tabagista pesado'];
        S.pa = '135/85'; S.fc = '108'; S.fr = '28'; S.sat = '87'; S.temp = '37.8';
        S.ef = 'crit';
        S.abc = { va: 'Pérvia e Patente', fon: 'Frases entrecortadas', col: 'Não indicado', exp: 'Reduzida', esf: ['Tiragem intercostal', 'Uso musc. acessória'], mv: 'Diminuído difusamente', rud: ['Sibilância difusa', 'Roncos'], tec: '2s', aus: ['Regular'], pul: 'Cheios', abd: ['Sem alterações'], ao: 4, rv: 5, rm: 6, pup: 'Isocóricas e Reativas', def: [], ede: 'Ausente', cac: 'Com cacifo', pel: ['Sudorese fria'] };
        S.sind = 'dsp'; S.subsind = 'dpoc_ag';
        S.chk['dpoc_ag_sup_0'] = true; S.chk['dpoc_ag_esp_0'] = true; S.chk['dpoc_ag_esp_1'] = true;
      }
    },
    {
      id: '04_choque_septico',
      name: 'Choque - Choque Séptico de Foco Pulmonar',
      setup: () => {
        resetS();
        S.nome = 'Geraldo Alencar'; S.idade = 68; S.sexo = 'M'; S.orig = 'Vaga Zero'; S.origInst = 'UPA Central'; S.origMotivo = 'Pneumonia grave + choque';
        S.queixa = 'Febre'; S.tempo = '4 dias';
        Object.assign(S.feb, { afericao: 'Febre alta aferida', padrao: 'Contínua', foco: ['Pulmonar (tosse/expectoração)'] });
        S.pa = '75/45'; S.fc = '124'; S.fr = '30'; S.sat = '89'; S.temp = '38.9'; S.gli = '160';
        S.ef = 'crit';
        S.abc = { va: 'Pérvia e Patente', fon: 'Preservada', col: 'Não indicado', exp: 'Reduzida', esf: ['Taquipneia importante'], mv: 'Diminuído em base D', rud: ['Crépitos'], tec: '> 3s', aus: ['Taquicárdico'], pul: 'Filiformes', abd: ['Sem alterações'], ao: 3, rv: 4, rm: 6, pup: 'Isocóricas e Reativas', def: [], ede: 'Ausente', cac: 'Com cacifo', pel: ['Pálido', 'Livedo'] };
        S.sind = 'cho'; S.subsind = 'cho_sep';
        S.chk['cho_sep_sup_0'] = true; S.chk['cho_sep_esp_0'] = true; S.chk['cho_sep_esp_1'] = true;
      }
    },
    {
      id: '05_avc_isquemico',
      name: 'Neurológico - AVC Isquêmico Agudo',
      setup: () => {
        resetS();
        S.nome = 'Maria José'; S.idade = 72; S.sexo = 'F'; S.orig = 'SAMU';
        S.queixa = 'Déficit motor / sensorial focal'; S.tempo = '90 minutos';
        Object.assign(S.neu, { motor: ['Hemiparesia'], lado: 'Direito' });
        S.pa = '175/95'; S.fc = '76'; S.fr = '16'; S.sat = '98'; S.temp = '36.6'; S.gli = '115';
        S.sind = 'neu'; S.subsind = 'avc_isq';
        S.nihss = { consc: 1, conscPerg: 1, conscCmd: 0, olhar: 1, campoVis: 0, paralisiaFac: 2, braçoE: 3, pernaE: 2, braçoD: 0, pernaD: 0, ataxia: 0, sensib: 1, ling: 1, disart: 1, extin: 0, evaluated: true };
        S.chk['avc_isq_sup_0'] = true; S.chk['avc_isq_esp_0'] = true;
      }
    },
    {
      id: '06_sincope_cardiogenica',
      name: 'Síncope - Perfil Cardiogênico Súbito',
      setup: () => {
        resetS();
        S.nome = 'Roberto Dias'; S.idade = 67; S.sexo = 'M'; S.orig = 'SAMU';
        S.queixa = 'Síncope'; S.tempo = '1 hora';
        Object.assign(S.sinc, {
          evento: 'Perda de consciência súbita e abrupta sem pródromos, com queda imediata por perda abrupta do tônus postural',
          post: 'Sentado',
          rec: 'Imediata e completa (sem confusão mental)',
          alar: ['Dor torácica associada / palpitações prévias ao evento']
        });
        S.hpp = ['Insuficiência Cardíaca', 'Infarto prévio'];
        S.pa = '110/70'; S.fc = '52'; S.fr = '16'; S.sat = '96'; S.temp = '36.4';
        S.sind = 'sinc';
        S.chk['sinc_sup_0'] = true; S.chk['sinc_inv_0'] = true;
      }
    },
    {
      id: '07_sincope_vasovagal',
      name: 'Síncope - Perfil Vasovagal / Ortostático',
      setup: () => {
        resetS();
        S.nome = 'Beatriz Lima'; S.idade = 23; S.sexo = 'F'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Síncope'; S.tempo = '3 horas';
        Object.assign(S.sinc, {
          evento: 'Turvação ou escurecimento visual progressivo associado a perda gradual do tônus postural e da consciência',
          gat: ['Ortostase prolongada', 'Ambiente quente/aglomerado'],
          prod: 'Sintomas autonômicos (sudorese fria, palidez, náusea, calor ascendente)',
          post: 'Em pé',
          rec: 'Recuperação gradual com astenia/cansaço residual'
        });
        S.pa = '105/65'; S.fc = '72'; S.fr = '14'; S.sat = '99'; S.temp = '36.5';
        S.sind = 'sinc';
      }
    },
    {
      id: '08_palpitacoes_paroxistica',
      name: 'Palpitações - Início Súbito e Taquicardia',
      setup: () => {
        resetS();
        S.nome = 'Larissa Mendes'; S.idade = 34; S.sexo = 'F'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Palpitações'; S.tempo = '2 horas';
        Object.assign(S.palQ, {
          inicio: 'Início súbito / paroxístico em "liga-desliga"',
          atividade: ['Em repouso absoluto', 'Pós-prandial'],
          gatilhos: ['Estresse emocional / ansiedade', 'Consumo de cafeína / energéticos'],
          termino: ['Ainda em curso na admissão'],
          piora: ['Ansiedade / estresse'],
          instab: ['Ausência de sintomas de baixo débito']
        });
        S.pa = '125/80'; S.fc = '165'; S.fr = '18'; S.sat = '98'; S.temp = '36.7';
        S.sind = 'pal'; S.subsind = 'pal_ind';
        S.chk['pal_ind_sup_0'] = true; S.chk['pal_ind_inv_0'] = true;
      }
    },
    {
      id: '09_edema_mmii_unilateral',
      name: 'Edema / Dor em MMII - MID Unilateral com Sinais Flogísticos',
      setup: () => {
        resetS();
        S.nome = 'Joaquim Nabuco'; S.idade = 59; S.sexo = 'M'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Edema / Dor em MMII'; S.tempo = '3 dias';
        Object.assign(S.edm, {
          lat: 'Unilateral em membro inferior direito (MID)',
          ext: 'Até joelho',
          loc: ['Dor local', 'Eritema / rubor', 'Calor local', 'Enduramento / empastamento', 'Presença de orifício / porta de entrada cutânea (ferimento/fissura)'],
          sis: ['Febre aferida', 'Calafrios', 'Astenia / inapetência']
        });
        S.pa = '130/80'; S.fc = '96'; S.fr = '18'; S.sat = '97'; S.temp = '38.4';
        S.sind = 'emmi'; S.subsind = 'emmi_cel';
        S.chk['emmi_cel_sup_0'] = true; S.chk['emmi_cel_esp_0'] = true;
      }
    },
    {
      id: '10_edema_mmii_tvp',
      name: 'Edema / Dor em MMII - Suspeita de TVP MIE',
      setup: () => {
        resetS();
        S.nome = 'Renata Freitas'; S.idade = 48; S.sexo = 'F'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Edema / Dor em MMII'; S.tempo = '2 dias';
        Object.assign(S.edm, {
          lat: 'Unilateral em membro inferior esquerdo (MIE)',
          ext: 'Até panturrilha',
          loc: ['Dor local', 'Enduramento / empastamento'],
          sis: ['Ausência de sintomas sistêmicos agudos']
        });
        S.wellsTvp = { cancer: false, paralisia: false, acamado: true, dorTrajeto: true, edemaMembro: true, edemaPant: true, cacifo: true, colaterais: false, tvpPrevia: false, diagAlt: false };
        S.pa = '120/75'; S.fc = '84'; S.fr = '16'; S.sat = '98'; S.temp = '36.5';
        S.sind = 'emmi'; S.subsind = 'emmi_tvp';
        S.chk['emmi_tvp_sup_0'] = true; S.chk['emmi_tvp_esp_0'] = true;
      }
    },
    {
      id: '11_cefaleia_primaria',
      name: 'Cefaleia - Migrânea Típica',
      setup: () => {
        resetS();
        S.nome = 'Camila Duarte'; S.idade = 29; S.sexo = 'F'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Cefaleia'; S.tempo = '6 horas';
        Object.assign(S.cef, { inicio: 'Progressivo', loc: ['Hemicraniana D'], qual: ['Pulsátil'], assoc: ['Náuseas / vômitos', 'Fotofobia', 'Fonofobia'], modif: ['Piora com esforço físico'] });
        S.pa = '120/70'; S.fc = '78'; S.fr = '14'; S.sat = '99'; S.temp = '36.4';
        S.sind = 'cef'; S.subsind = 'cef_prim';
        S.chk['cef_prim_sup_0'] = true; S.chk['cef_prim_sin_0'] = true;
      }
    },
    {
      id: '12_abdome_agudo_apendicite',
      name: 'Dor Abdominal - Suspeita de Apendicite com Alvarado',
      setup: () => {
        resetS();
        S.nome = 'Lucas Vasconcelos'; S.idade = 22; S.sexo = 'M'; S.orig = 'Demanda Espontânea';
        S.queixa = 'Dor abdominal'; S.tempo = '24 horas';
        Object.assign(S.abdQ, { loc: ['Fossa ilíaca direita (FID)'], inicio: 'Periumbilical migrando para FID', fatores: ['Piora com tosse / descompressão'] });
        S.alvarado = { mig: true, anox: true, nau: true, dorFid: true, descomp: true, febre: true, leuco: true, desvio: false };
        S.pa = '125/80'; S.fc = '92'; S.fr = '18'; S.sat = '98'; S.temp = '38.0';
        S.sind = 'abd'; S.subsind = 'dab_inf';
        S.chk['dab_inf_sup_0'] = true; S.chk['dab_inf_esp_0'] = true;
      }
    }
  ];

  scenarios.forEach(sc => {
    sc.setup();
    const rel = gRel();
    results[sc.id] = {
      name: sc.name,
      header: buildHeader(),
      hda: buildHDA(),
      antecedentes: buildAntecedentes(),
      ef: buildEF(),
      ecg: buildEcgText(),
      pocus: buildPocText(),
      condutas: buildCondutas(),
      gRel: rel,
      pep_anamnese: extractPepSection(rel, 'anamnese'),
      pep_ef: extractPepSection(rel, 'ef'),
      pep_conduta: extractPepSection(rel, 'conduta')
    };
  });

  return results;
}

function recordSnapshot(htmlFilePath) {
  console.log(`[Golden Master] Gerando snapshot de referência a partir de: ${htmlFilePath}`);
  const ctx = loadContext(htmlFilePath);
  const data = runScenarios(ctx);
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[Golden Master] Snapshot salvo com sucesso em: ${SNAPSHOT_PATH}`);
  console.log(`[Golden Master] Total de cenários clínicos gravados: ${Object.keys(data).length}`);
}

function verifySnapshot(htmlFilePath) {
  console.log(`[Golden Master] Verificando paridade para: ${htmlFilePath}`);
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    console.error(`[ERRO] Arquivo de snapshot não encontrado em: ${SNAPSHOT_PATH}`);
    process.exit(1);
  }
  const baseline = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
  const ctx = loadContext(htmlFilePath);
  const current = runScenarios(ctx);

  let errors = 0;
  const baseKeys = Object.keys(baseline);
  baseKeys.forEach(k => {
    const b = baseline[k];
    const c = current[k];
    if (!c) {
      console.error(`❌ [FALHA] Cenário ausente no resultado atual: ${k} (${b.name})`);
      errors++;
      return;
    }
    const fields = ['header', 'hda', 'antecedentes', 'ef', 'condutas', 'pep_anamnese', 'pep_ef', 'pep_conduta'];
    fields.forEach(f => {
      if (b[f] !== c[f]) {
        console.error(`❌ [DIVERGÊNCIA] Cenário '${k}' - campo '${f}':`);
        console.error(`--- Esperado (Snapshot): ---\n${b[f]}\n--- Obtido (Atual): ---\n${c[f]}\n-------------------`);
        errors++;
      }
    });
  });

  if (errors === 0) {
    console.log(`✅ [100% PARIDADE APROVADA] Todos os ${baseKeys.length} cenários clínicos passaram sem divergências!`);
    return true;
  } else {
    console.error(`❌ [ERRO] ${errors} divergência(s) detectada(s) em relação ao Golden Master.`);
    process.exit(1);
  }
}

// CLI dispatcher
const args = process.argv.slice(2);
const htmlTarget = args[1] || path.join(__dirname, '..', 'app.html');

if (args.includes('--record')) {
  recordSnapshot(htmlTarget);
} else {
  verifySnapshot(htmlTarget);
}
