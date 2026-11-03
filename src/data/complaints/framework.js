// Registries — preenchidos abaixo conforme cada queixa é refinada
const QX_ANAMNESE={},QX_EF={},QX_HDA={},QX_HPP={},QX_BADGE={},QX_EF_TEXT={};

// Helpers de UI (reduzem boilerplate em renderers de queixa)
function tags(label,opts,arrRef,action){return `${label?`<div class="sl">${label}</div>`:''}<div class="tags" style="margin-bottom:8px">${opts.map(v=>{const s=String(v).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");return `<span class="tag ${arrRef.includes(v)?'on':''}" onclick="${action.replace(/%V/g,s)}">${esc(v)}</span>`;}).join('')}</div>`;}
function radio(label,opts,curr,action){return `${label?`<div class="sl">${label}</div>`:''}<div class="rg" style="margin-bottom:8px">${opts.map(v=>{const s=String(v).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");return `<span class="ro ${curr===v?'on':''}" onclick="${action.replace(/%V/g,s)}">${esc(v)}</span>`;}).join('')}</div>`;}
function segRadio(label,opts,curr,action){
 return `<div class="seg-row">
  <div class="seg-label">${esc(label)}</div>
  <div class="seg-control">${opts.map(v=>{
    const s=String(v).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");
    const isOn=curr===v;
    const isAlert=isOn&&['Obstruída','Prejudicada/Ausente','Colocado/Mantido','Assimétrica','Reduzido','Abolido','> 3s','> 5s','Em flush','Filiformes','Ausentes','Anisocóricas','Midriáticas','Mióticas','Não reagentes','Presente'].includes(v);
    return `<button type="button" class="seg-btn ${isOn?'on':''} ${isAlert?'alert':''}" onclick="${action.replace(/%V/g,s)}">${esc(v)}</button>`;
  }).join('')}</div>
 </div>`;
}
function segTags(label,opts,arrRef,action){
 const arr=arrRef||[];
 return `<div class="seg-row">
  <div class="seg-label">${esc(label)}</div>
  <div class="seg-tags">${opts.map(v=>{
    const s=String(v).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,"&quot;");
    const isOn=arr.includes(v);
    return `<button type="button" class="seg-tag-btn ${isOn?'on':''}" onclick="${action.replace(/%V/g,s)}">${esc(v)}</button>`;
  }).join('')}</div>
 </div>`;
}

const QX_SPEC={},QX_SPEC_BY_SIGLA={};
function qxSpec(sigla){return QX_SPEC_BY_SIGLA[sigla];}
function qxBlockDef(sigla,k){const s=qxSpec(sigla);const bls=s?(typeof s.blocks==='function'?s.blocks(S):s.blocks||[]):[];return bls.find(b=>b.key===k)||null;}
function qxAutoOpenNext(sigla,k){
 const b=qxBlockDef(sigla,k);
 if(!b||!b.autoOpenNext)return;
 if(!S[sigla+'Open']) S[sigla+'Open']={};
 S[sigla+'Open'][b.autoOpenNext]=true;
}
function qxTag(sigla,k,v){const sp=qxSpec(sigla);const arr=S[sigla][k];const i=arr.indexOf(v);if(i>-1){arr.splice(i,1);if(sp&&sp.onRemove)sp.onRemove(k,v);}else{arr.push(v);if(sp&&sp.onAdd)sp.onAdd(k,v);}if(arr.length>0)qxAutoOpenNext(sigla,k);render();}
function qxRadio(sigla,k,v){S[sigla][k]=v;const sp=qxSpec(sigla);if(sp&&sp.onAdd)sp.onAdd(k,v);qxAutoOpenNext(sigla,k);render();}
function qxToggle(sigla,k){const o=S[sigla+'Open'];if(o)o[k]=!o[k];render();}
function qxBlockBody(sigla,b){const val=S[sigla][b.key];let body='';
 if(b.type==='radio')body=radio('',b.options,val,`qxRadio('${sigla}','${b.key}','%V')`);
 else if(b.type==='tags')body=tags('',b.options,val,`qxTag('${sigla}','${b.key}','%V')`);
 if(b.extra)body+=b.extra(S);
 return body;}
function qxBlock(sigla,b){const o=S[sigla+'Open']||{};const isOpen=!!o[b.key];return `<div class="abcs"><div class="abch" onclick="qxToggle('${sigla}','${b.key}')"><span style="font-weight:500">${esc(b.label)}</span><i class="ti ti-chevron-${isOpen?'up':'down'}" style="margin-left:auto" aria-hidden="true"></i></div>${isOpen?`<div class="abcb open">${qxBlockBody(sigla,b)}</div>`:''}</div>`;}
function accordionRender(sigla){const s=qxSpec(sigla);if(!s)return '';const bls=(typeof s.blocks==='function'?s.blocks(S):s.blocks||[]);return bls.filter(b=>!b.hidden||!b.hidden(S)).map(b=>qxBlock(sigla,b)).join('');}
function registerQx(name,spec){
 QX_SPEC[name]=spec;
 if(spec.anamnese){
  QX_SPEC_BY_SIGLA[spec.anamnese.sigla]=spec.anamnese;
  if(S[spec.anamnese.sigla]!==undefined)spec.anamnese._initialShape=JSON.parse(JSON.stringify(S[spec.anamnese.sigla]));
  if(S[spec.anamnese.sigla+'Open']!==undefined)spec.anamnese._initialOpen=JSON.parse(JSON.stringify(S[spec.anamnese.sigla+'Open']));
  QX_ANAMNESE[name]=()=>accordionRender(spec.anamnese.sigla)+(spec.anamnese.after?spec.anamnese.after(S):'');
 }
 if(spec.ef){
  QX_SPEC_BY_SIGLA[spec.ef.sigla]=spec.ef;
  if(S[spec.ef.sigla]!==undefined)spec.ef._initialShape=JSON.parse(JSON.stringify(S[spec.ef.sigla]));
  if(S[spec.ef.sigla+'Open']!==undefined)spec.ef._initialOpen=JSON.parse(JSON.stringify(S[spec.ef.sigla+'Open']));
  QX_EF[name]=()=>{
   const modes=spec.ef.showIn||['amb']; // 'amb' (card abaixo do EF ambulatorial), 'crit' (card depois do ABCDE), ou ambos
   if(!modes.includes(S.ef))return '';
   const ttl=(S.ef==='crit'?spec.ef.critTitle:spec.ef.ambTitle)||spec.ef.ambTitle||`Exame físico específico — ${name}`;
   const ico=(S.ef==='crit'?spec.ef.critIcon:spec.ef.ambIcon)||spec.ef.ambIcon||'ti-stethoscope';
   return `<div class="card"><div class="st"><i class="ti ${ico}" aria-hidden="true"></i> ${esc(ttl)}</div>${accordionRender(spec.ef.sigla)}</div>`;
  };
 }
 if(spec.hda)QX_HDA[name]=spec.hda;
 if(spec.hpp)QX_HPP[name]=spec.hpp;
 if(spec.badge)QX_BADGE[name]=spec.badge;
 if(spec.efText)QX_EF_TEXT[name]=spec.efText;
}
// Embute o EF específico da queixa atual dentro do bloco D do ABCDE.
function qxEFInCritical(){
 const sp=QX_SPEC[S.queixa];
 if(!sp||!sp.ef||!sp.ef.inCritical)return '';
 const title=sp.ef.criticalTitle||`Exame específico — ${S.queixa}`;
 const ico=sp.ef.criticalIcon||'ti-stethoscope';
 return `<div style="margin-top:14px;padding-top:12px;border-top:.5px solid var(--color-border-tertiary)"><div class="sl" style="font-weight:500;color:var(--color-text-primary);margin-bottom:8px"><i class="ti ${ico}" aria-hidden="true"></i> ${esc(title)}</div>${accordionRender(sp.ef.sigla)}</div>`;
}

// Accordion progressivo — ABCDE
function abcToggle(key){S.abcOpen[key]=!S.abcOpen[key];render();}
function abcBlock(key,label,content){const isOpen=S.abcOpen[key];return `<div class="abcs" data-abc-sec="${key}"><div class="abch" onclick="abcToggle('${key}')"><strong>${label}</strong><i class="ti ti-chevron-${isOpen?'up':'down'}" style="margin-left:auto" aria-hidden="true"></i></div>${isOpen?`<div class="abcb open">${content}</div>`:''}</div>`;}
// Listener uma vez: clicar dentro de uma seção ABC abre a próxima (capture phase, antes do render())
function setupAbcAutoNext(){
 if(typeof window !== 'undefined' && window._abcAutoNextSetup) return;
 if(typeof window !== 'undefined') window._abcAutoNextSetup = true;
 if(typeof document !== 'undefined'){
  document.addEventListener('click',(e)=>{
   if(e.target.closest('.abch'))return; // chevron/header não auto-abre próximo
   const el=e.target.closest('[data-abc-sec]');
   if(!el)return;
   const next={a:'b',b:'c',c:'d',d:'e'}[el.dataset.abcSec];
   if(next&&S.abcOpen[next]===undefined)S.abcOpen[next]=true;
  },true);
 }
}
setupAbcAutoNext();

