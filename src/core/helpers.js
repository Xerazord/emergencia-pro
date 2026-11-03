// ─── Core Helpers & Formatters — Emergência Pro ───

const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };
function esc(s) {
  return s == null ? '' : String(s).replace(/[&<>"'`]/g, c => ESC_MAP[c]);
}

function joinAnd(arr) {
  if (!arr || arr.length === 0) return '';
  if (arr.length === 1) return String(arr[0]);
  return arr.slice(0, -1).join(', ') + ' e ' + String(arr[arr.length - 1]);
}

function joinClinical(parts, opts) {
  const o = opts || {};
  const sep = o.sep || ', ';
  const last = o.last || ' e ';
  const f = parts.filter(p => p && String(p).trim());
  if (f.length === 0) return '';
  if (f.length === 1) return String(f[0]);
  if (f.length === 2) return f.join(last);
  return f.slice(0, -1).join(sep) + last + f.slice(-1);
}

function lcFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function gravBadge(level, label, opts) {
  const o = opts || {};
  const cls = { leve: 'grav-leve', mod: 'grav-mod', grave: 'grav-grave' }[level] || 'grav-leve';
  const ico = { leve: 'ti-info-circle', mod: 'ti-alert-circle', grave: 'ti-alert-triangle' }[level] || 'ti-info-circle';
  const mt = o.noMargin ? '' : ' style="margin-top:10px"';
  const sub = o.sublabel ? `<div style="margin-top:4px;font-weight:600">${esc(o.sublabel)}</div>` : '';
  return `<div class="grav-badge ${cls}"${mt}><i class="ti ${ico}" aria-hidden="true"></i> ${esc(label)}${sub}</div>`;
}

function setQueixa(q) {
  S.queixa = q;
  S._qxSearch = '';
  S.caract = [];
  S.tempo = '';
  S.itDrug = '';
  S.imp = '';
  S.chk = {};
  S.nts = {};
  S.sind = null;
  S.subsind = null;
  S.subsinds = [];
  for (const name in QX_SPEC) {
    const sp = QX_SPEC[name];
    if (sp.anamnese && sp.anamnese._initialShape) {
      S[sp.anamnese.sigla] = JSON.parse(JSON.stringify(sp.anamnese._initialShape));
      if (sp.anamnese._initialOpen) S[sp.anamnese.sigla + 'Open'] = JSON.parse(JSON.stringify(sp.anamnese._initialOpen));
    }
    if (sp.ef && sp.ef._initialShape) {
      S[sp.ef.sigla] = JSON.parse(JSON.stringify(sp.ef._initialShape));
      if (sp.ef._initialOpen) S[sp.ef.sigla + 'Open'] = JSON.parse(JSON.stringify(sp.ef._initialOpen));
    }
  }
  render();
}

function ts(arr, v) {
  const i = arr.indexOf(v);
  if (i > -1) arr.splice(i, 1);
  else arr.push(v);
  render();
}
