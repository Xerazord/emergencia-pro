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

// 8.1 Carrega o catálogo de patologias de porta
const portaCatalogFile = path.join(SRC, 'data', 'porta_catalog.js');
let portaCatalogBundle = '';
if (fs.existsSync(portaCatalogFile)) {
  portaCatalogBundle = `\n/* ─── Porta Catalog: porta_catalog.js ─── */\n` + fs.readFileSync(portaCatalogFile, 'utf8') + '\n';
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
  path.join(SRC, 'views', 'porta_view.js'),
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
  portaCatalogBundle,
  cdsBundle,
  calculatorsBundle,
  generatorsBundle,
  viewsBundle,
  shortcutsBundle
].join('\n\n');

// 13. Injeta CSS e JS no template HTML
html = html.replace('/* CSS_BUNDLE */', () => cssBundle);
html = html.replace('/* SCRIPT_BUNDLE */', () => jsBundle);

// 14. Grava os arquivos finais do app principal
const distAppHtml = path.join(DIST, 'app.html');
const rootAppHtml = path.join(ROOT, 'app.html');

fs.writeFileSync(distAppHtml, html, 'utf8');
fs.writeFileSync(rootAppHtml, html, 'utf8');

// 15. Gera a versão standalone 100% offline do Guia de Porta (porta.html)
const portaViewFile = path.join(SRC, 'views', 'porta_view.js');
const portaViewContent = fs.existsSync(portaViewFile) ? fs.readFileSync(portaViewFile, 'utf8') : '';

const standalonePortaHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guia Rápido de Porta & Ambulatório — Emergência Pro</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' rx='10' fill='%23059669'/%3E%3Cpath d='M12 28V12L24 8V24M24 24L12 28M24 24V32M16 20V21' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
<style>
${cssBundle}
body { background: #0f172a; margin: 0; padding: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
.porta-standalone-shell { max-width: 1200px; margin: 0 auto; background: var(--color-background-primary, #ffffff); border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); overflow: hidden; display: flex; flex-direction: column; height: calc(100vh - 24px); border: 1px solid var(--color-border, #e2e8f0); }
.porta-standalone-hdr { padding: 12px 18px; border-bottom: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; background: var(--color-background-secondary, #f8fafc); }
</style>
</head>
<body>
<div class="porta-standalone-shell">
  <div class="porta-standalone-hdr">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:36px;height:36px;border-radius:8px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px">
        <i class="ti ti-door-enter" aria-hidden="true"></i>
      </div>
      <div>
        <div style="font-size:16px;font-weight:700;color:var(--color-text-primary,#0f172a);display:flex;align-items:center;gap:8px">
          Guia Rápido de Porta & Ambulatório
          <span class="sb" style="font-size:10.5px;background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:4px">20 Patologias</span>
        </div>
        <div style="font-size:11.5px;color:var(--color-text-secondary,#64748b)">Consulta beira-leito, prescrição SUS e gerador de atestado médico (Standalone Offline)</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <div style="position:relative;width:280px">
        <i class="ti ti-search" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:14px"></i>
        <input type="text" id="porta-search-input" placeholder="Buscar queixa, CID ou sintoma..." oninput="onPortaSearch(this.value)" style="width:100%;padding:6px 10px 6px 30px;font-size:12px;border:1px solid var(--color-border,#cbd5e1);border-radius:6px;background:var(--color-background-primary,#fff)">
      </div>
      <a href="app.html" class="btns" style="padding:6px 10px;font-size:12px;text-decoration:none;display:flex;align-items:center;gap:4px">
        <i class="ti ti-arrow-left"></i> Emergência Pro
      </a>
    </div>
  </div>
  <div id="porta-guide-modal-body" style="padding:16px;overflow:hidden;flex:1"></div>
</div>
<div id="toast" style="position:fixed;bottom:20px;right:20px;background:#1e293b;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;display:none;z-index:99999;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3)"></div>
<script>
function esc(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(()=>{ t.style.display = 'none'; }, 2500);
}
${portaCatalogBundle}
${portaViewContent}
document.addEventListener('DOMContentLoaded', ()=>{
  renderPortaGuideContent();
});
</script>
</body>
</html>`;

const distPortaHtml = path.join(DIST, 'porta.html');
const rootPortaHtml = path.join(ROOT, 'porta.html');

fs.writeFileSync(distPortaHtml, standalonePortaHtml, 'utf8');
fs.writeFileSync(rootPortaHtml, standalonePortaHtml, 'utf8');

const endTime = process.hrtime.bigint();
const durationMs = Number(endTime - startTime) / 1e6;
const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
const portaSizeKb = (Buffer.byteLength(standalonePortaHtml, 'utf8') / 1024).toFixed(1);

console.log(`⚡ Build modular concluído com sucesso em ${durationMs.toFixed(2)} ms!`);
console.log(`📦 dist/app.html gerado (${sizeKb} KB)`);
console.log(`📦 dist/porta.html gerado (${portaSizeKb} KB - Standalone Offline)`);
console.log(`🔄 app.html e porta.html sincronizados na raiz.`);
