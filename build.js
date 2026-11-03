/**
 * Build Script — Emergência Pro
 * Empacotador standalone ultra-leve (Zero-Dependency Node.js)
 * Concatena CSS, Serviços, Core State, Síndromes (CT), Queixas, CDS, Calculadoras, Geradores e Views gerando dist/app.html e app.html
 */

const fs = require('fs');
const path = require('path');

const startTime = process.hrtime.bigint();

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

// Garante que o diretório dist existe
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

// 1. Carrega os módulos CSS em ordem topológica
const cssFiles = [
  path.join(SRC, 'css', 'variables.css'),
  path.join(SRC, 'css', 'layout.css'),
  path.join(SRC, 'css', 'components.css'),
  path.join(SRC, 'css', 'overlays.css')
];

let cssBundle = '';
for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    cssBundle += `\n/* ─── File: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  } else {
    console.warn(`[AVISO] Arquivo CSS não encontrado: ${file}`);
  }
}

// 2. Carrega a Camada de Serviços (Supabase, Inatividade LGPD, Auth, Plantão, Storage)
const serviceFiles = [
  path.join(SRC, 'services', 'supabase.js'),
  path.join(SRC, 'services', 'inactivity.js'),
  path.join(SRC, 'services', 'auth.js'),
  path.join(SRC, 'services', 'shift.js'),
  path.join(SRC, 'services', 'storage.js')
];

let servicesBundle = '';
for (const file of serviceFiles) {
  if (fs.existsSync(file)) {
    servicesBundle += `\n/* ─── Service Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 3. Carrega o Estado Reativo Central e Helpers Core
const coreFiles = [
  path.join(SRC, 'core', 'state.js'),
  path.join(SRC, 'core', 'helpers.js')
];

let coreBundle = '';
for (const file of coreFiles) {
  if (fs.existsSync(file)) {
    coreBundle += `\n/* ─── Core Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 4. Carrega os módulos sindrômicos (CT)
const syndromeFiles = [
  path.join(SRC, 'data', 'syndromes', 'cardiovascular.js'),
  path.join(SRC, 'data', 'syndromes', 'respiratorio.js'),
  path.join(SRC, 'data', 'syndromes', 'neurologico.js'),
  path.join(SRC, 'data', 'syndromes', 'abdominal.js'),
  path.join(SRC, 'data', 'syndromes', 'sistemico.js'),
  path.join(SRC, 'data', 'syndromes', 'trauma_tox.js'),
  path.join(SRC, 'data', 'syndromes', 'index.js')
];

let syndromesBundle = '';
for (const file of syndromeFiles) {
  if (fs.existsSync(file)) {
    syndromesBundle += `\n/* ─── Syndrome Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 5. Carrega framework e módulos de queixas
const complaintFiles = [
  path.join(SRC, 'data', 'complaints', 'framework.js'),
  path.join(SRC, 'data', 'complaints', 'cardiovascular.js'),
  path.join(SRC, 'data', 'complaints', 'respiratorio.js'),
  path.join(SRC, 'data', 'complaints', 'neurologico.js'),
  path.join(SRC, 'data', 'complaints', 'abdominal.js'),
  path.join(SRC, 'data', 'complaints', 'sistemico.js'),
  path.join(SRC, 'data', 'complaints', 'trauma_tox.js'),
  path.join(SRC, 'data', 'complaints', 'index.js')
];

let complaintsBundle = '';
for (const file of complaintFiles) {
  if (fs.existsSync(file)) {
    complaintsBundle += `\n/* ─── Complaint Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 6. Carrega módulos de apoio à decisão clínica (CDS beira-leito)
const cdsFiles = [
  path.join(SRC, 'cds', 'vital_alerts.js'),
  path.join(SRC, 'cds', 'conflict_rules.js'),
  path.join(SRC, 'cds', 'evidence_registry.js'),
  path.join(SRC, 'cds', 'decision_cockpit.js'),
  path.join(SRC, 'cds', 'index.js')
];

let cdsBundle = '';
for (const file of cdsFiles) {
  if (fs.existsSync(file)) {
    cdsBundle += `\n/* ─── CDS Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 7. Carrega as calculadoras clínicas
const calculatorFiles = [
  path.join(SRC, 'calculators', 'hear_edacs.js'),
  path.join(SRC, 'calculators', 'wells_tep.js'),
  path.join(SRC, 'calculators', 'wells_tvp.js'),
  path.join(SRC, 'calculators', 'nihss.js'),
  path.join(SRC, 'calculators', 'alvarado_tokyo.js'),
  path.join(SRC, 'calculators', 'psi_port_mascc.js'),
  path.join(SRC, 'calculators', 'trauma_rules.js'),
  path.join(SRC, 'calculators', 'child_pugh_meld.js')
];

let calculatorsBundle = '';
for (const file of calculatorFiles) {
  if (fs.existsSync(file)) {
    calculatorsBundle += `\n/* ─── Calculator Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 8. Carrega geradores de prontuário clínico (PEP)
const generatorFiles = [
  path.join(SRC, 'generators', 'prescription_rules.js'),
  path.join(SRC, 'generators', 'header.js'),
  path.join(SRC, 'generators', 'hda.js'),
  path.join(SRC, 'generators', 'antecedentes.js'),
  path.join(SRC, 'generators', 'exame_fisico.js'),
  path.join(SRC, 'generators', 'scores.js'),
  path.join(SRC, 'generators', 'condutas.js'),
  path.join(SRC, 'generators', 'relatorio.js'),
  path.join(SRC, 'generators', 'index.js')
];

let generatorsBundle = '';
for (const file of generatorFiles) {
  if (fs.existsSync(file)) {
    generatorsBundle += `\n/* ─── Generator Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 9. Carrega módulos de visualização (Views) e ciclo de renderização
const viewFiles = [
  path.join(SRC, 'views', 'stepper.js'),
  path.join(SRC, 'views', 'step0_id.js'),
  path.join(SRC, 'views', 'step1_queixa.js'),
  path.join(SRC, 'views', 'step2_dados.js'),
  path.join(SRC, 'views', 'step3_exame.js'),
  path.join(SRC, 'views', 'step4_conduta.js'),
  path.join(SRC, 'views', 'step5_relatorio.js'),
  path.join(SRC, 'views', 'index.js'),
  path.join(SRC, 'core', 'render.js')
];

let viewsBundle = '';
for (const file of viewFiles) {
  if (fs.existsSync(file)) {
    viewsBundle += `\n/* ─── View Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 10. Carrega atalhos de teclado, ergonomia e inicialização
const shortcutFiles = [
  path.join(SRC, 'core', 'shortcuts.js')
];

let shortcutsBundle = '';
for (const file of shortcutFiles) {
  if (fs.existsSync(file)) {
    shortcutsBundle += `\n/* ─── Shortcuts Module: ${path.basename(file)} ─── */\n` + fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 11. Carrega o template HTML base
const templatePath = path.join(SRC, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error(`[ERRO] Template não encontrado: ${templatePath}`);
  process.exit(1);
}
let html = fs.readFileSync(templatePath, 'utf8');

// 12. Monta o bundle JavaScript completo em ordem topológica
const jsBundle = [
  servicesBundle,
  coreBundle,
  syndromesBundle,
  complaintsBundle,
  cdsBundle,
  calculatorsBundle,
  generatorsBundle,
  viewsBundle,
  shortcutsBundle
].join('\n\n');

// 13. Injeta CSS e JS no template HTML
html = html.replace('/* CSS_BUNDLE */', () => cssBundle);
html = html.replace('/* SCRIPT_BUNDLE */', () => jsBundle);

// 14. Grava os arquivos finais
const distAppHtml = path.join(DIST, 'app.html');
const rootAppHtml = path.join(ROOT, 'app.html');

fs.writeFileSync(distAppHtml, html, 'utf8');
fs.writeFileSync(rootAppHtml, html, 'utf8');

const endTime = process.hrtime.bigint();
const durationMs = Number(endTime - startTime) / 1e6;
const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);

console.log(`⚡ Build modular concluído com sucesso em ${durationMs.toFixed(2)} ms!`);
console.log(`📦 dist/app.html gerado (${sizeKb} KB)`);
console.log(`🔄 app.html sincronizado na raiz.`);
