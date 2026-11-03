/* ─── Queixas Abdominais & Digestivas ─── */
// ─── Dor abdominal ─────────────────────────────────────────────────────────
const ABD_INICIO=['Súbito em facada / catastrófico (perfurativo / vascular)','Progressivo e contínuo (inflamatório)','Em cólica paroxística (obstrutivo / calculoso)','Insidioso e intermitente'];
const ABD_LOC=['Epigástrio','Hipocôndrio direito','Hipocôndrio esquerdo','Periumbilical','Fossa ilíaca direita (FID)','Fossa ilíaca esquerda (FIE)','Hipogástrio','Difusa por todo o abdome','Migrou de epigástrio/periumbilical para FID (sinal de Kocher - apendicite)','Irradiação em faixa para o dorso (pancreatite)','Irradiação para escápula / dorso D (biliar)','Irradiação para região genital / virilha (cólica ureteral)'];
const ABD_FATORES=['Piora à tosse e deambulação (peritonismo parietal)','Piora com a palpação profunda','Melhora em posição fetal (pancreatite)','Alívio transitório após episódios de vômitos (obstrução alta)','Piora após ingesta alimentar / gordurosa','Sem posição ou manobra de alívio'];
const ABD_ALARME=['Parada de eliminação de gases e fezes > 24h (obstrução)','Vômitos incoercíveis / desidratação','Vômitos biliosos','Vômitos fecaloides / borráceos (obstrução distal)','Febre com calafrios trepidantes (bacteremia)','Icterícia e colúria associadas (obstrução biliar/colangite)','Hematêmese / melena / enterorragia','Distensão abdominal progressiva'];
const ABD_GIN=['DUM recente e habitual (sem atraso)','Atraso menstrual relatado','Sangramento vaginal anormal concomitante','Uso de método contraceptivo hormonal ou dispositivo intrauterino','História de gravidez ectópica prévia','Corrimento vaginal purulento / dor à mobilização de colo (DIP)','Dor anexial unilateral intensa','Beta-hCG de urina solicitado / positivo'];

function abdHda(S) {
  const a = S.abdQ;
  if (!a.inicio && !a.loc.length && !a.fatores.length && !a.alarme.length && !a.gin.length && !a.dum) return '';
  const car = [];
  if (a.inicio) car.push(`com padrão de instalação ${a.inicio.toLowerCase()}`);
  if (a.loc.length) car.push(`localizada em ${joinAnd(a.loc).toLowerCase()}`);

  let out = car.length ? `caracterizada por dor abdominal ${joinAnd(car)}` : 'apresentando dor abdominal';
  if (a.fatores.length) out += `. Refere fatores modificadores como: ${joinAnd(a.fatores).toLowerCase()}`;
  if (a.alarme.length) out += `. Ao interrogatório sintomático, relata ${joinAnd(a.alarme).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const alSet = (a.alarme || []).map(x => x.toLowerCase());
  if (!alSet.some(x => x.includes('febre'))) unselected.push('febre');
  if (!alSet.some(x => x.includes('vômitos'))) unselected.push('vômitos fecalóides ou incoercíveis');
  if (!alSet.some(x => x.includes('parada de eliminação') || x.includes('obstrução'))) unselected.push('parada de eliminação de gases ou fezes');
  if (!alSet.some(x => x.includes('síncope'))) unselected.push('síncope');
  if (unselected.length) out += `. Ao interrogatório direcionado, ausência de ${joinAnd(unselected)}.`;

  if (S.sexo === 'F' && (a.gin.length || a.dum)) {
    let g = 'Histórico ginecológico';
    if (a.dum) g += `: DUM em ${a.dum}`;
    if (a.gin.length) g += ` (${joinAnd(a.gin).toLowerCase()})`;
    out += `. ${g}.`;
  }
  if (S.alvarado && S.alvarado.evaluated) out += ` Escore de Alvarado: ${alvaradoSc()}/10 pts (${alvaradoInterp(alvaradoSc())}).`;
  if (S.tokyo && S.tokyo.evaluated) {
    const tSt = tokyoStatus();
    out += ` Critérios de Tokyo: ${tSt.text}.`;
  }
  return out;
}

function abdAfter(S){
 const a=S.abdQ;let out='';
 if(a.alarme.includes('Febre com calafrios trepidantes (bacteremia)')&&a.alarme.includes('Icterícia e colúria associadas (obstrução biliar/colangite)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA: TRÍADE DE CHARCOT / PÊNTADE DE REYNOLDS</strong> — Suspeita de colangite aguda obstrutiva. Antibioticoterapia venosa imediata + ressuscitação + descompressão biliar de emergência (CPRE / cirurgia).</div>`;
 }
 if(a.loc.includes('Migrou de epigástrio/periumbilical para FID (sinal de Kocher - apendicite)')){
  out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> <strong>CRONOLOGIA DE KOCHER</strong> — Alta probabilidade clínica de Apendicite Aguda. Jejum, hidratação venosa e avaliação da Cirurgia Geral.</div>`;
 }
 if(S.sexo==='F'&&a.gin.includes('Atraso menstrual relatado')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>MULHER EM IDADE FÉRTIL COM ATRASO MENSTRUAL E DOR ABDOMINAL</strong> — Excluir gestação ectópica rota de imediato. Solicitar β-hCG urgente e POCUS/USG transvaginal.</div>`;
 }
 const alvSc=alvaradoSc();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_alvarado')"><span style="font-weight:500"><i class="ti ti-calculator"></i> Escore de Alvarado (Apendicite Aguda)</span><span class="sb ${alvaradoBadgeClass(alvSc)}">${alvSc}/10 pts</span></div><div class="sbd ${isCardOpen('sc_alvarado',true)?'open':''}" id="sc_alvarado">${rAlvarado()}<div class="sres"><div class="snum">${alvSc}<span style="font-size:13px;color:var(--color-text-secondary)">/10 pts</span></div><div style="font-size:13px">${alvaradoInterp(alvSc)}</div></div></div></div>`;
 const tok=tokyoStatus();
 out+=`<div class="scard" style="margin-top:10px"><div class="shdr" onclick="tog('sc_tokyo')"><span style="font-weight:500"><i class="ti ti-clipboard-check"></i> Critérios de Tokyo — TG18/TG20 (Colecistite Aguda)</span><span class="sb ${tok.cls}">${tok.text}</span></div><div class="sbd ${isCardOpen('sc_tokyo',true)?'open':''}" id="sc_tokyo">${rTokyo()}<div class="sres"><div style="font-size:13px;font-weight:600">${tok.text}</div></div></div></div>`;
 return out;
}

registerQx('Dor abdominal',{
 anamnese:{
  sigla:'abdQ',
  blocks:[
   {key:'inicio',label:'Início e Cronologia',type:'radio',options:ABD_INICIO,autoOpenNext:'loc'},
   {key:'loc',label:'Localização Inicial e Padrão de Migração',type:'tags',options:ABD_LOC,autoOpenNext:'fatores'},
   {key:'fatores',label:'Fatores Modificadores e Posturais',type:'tags',options:ABD_FATORES,autoOpenNext:'alarme'},
   {key:'alarme',label:'Sinais de Alarme e Sintomas Associados',type:'tags',options:ABD_ALARME,autoOpenNext:'gin'},
   {key:'gin',label:'Anamnese Ginecológica (Mulher em Idade Fértil)',type:'tags',options:ABD_GIN,hidden:S=>S.sexo!=='F',extra:S=>`<div style="margin-top:8px"><label>Data da Última Menstruação (DUM)</label><input type="text" value="${esc(S.abdQ.dum||'')}" oninput="S.abdQ.dum=this.value" placeholder="Ex: 10/09/2026, ou atrasada há 45 dias"></div>`}
  ],
  after:abdAfter
 },
 hda:abdHda
});


// ─── Náusea e Vômitos ──────────────────────────────────────────────────────
const NAU_FREQ=['Episódios isolados (1 a 2 vezes)','Frequentes (3 a 5 vezes ao dia)','Incoercíveis (repetidos, intolerância completa a líquidos/VO)'];
const NAU_ASPECTO=['Conteúdo alimentar pós-prandial','Conteúdo bilioso (amarelado/esverdeado)','Conteúdo com rajas de sangue / hematêmese viva','Conteúdo em borra de café','Conteúdo fecaloide (odor pútrido / obstrução distal)'];
const NAU_RELACAO=['Precedidos de náusea intensa e plenitude gástrica','Vômitos súbitos sem náusea prévia ("em jato" — alerta de HIC)','Associados a vertigem rotatória e nistagmo','Precedidos de dor abdominal intensa em cólica','Associados a diarreia líquida profusa'];
const NAU_DESIDRAT=['Sede intensa e boca seca','Tontura postural ao levantar / lipotimia','Redução expressiva do débito urinário (oligúria)','Boa tolerância hídrica mantida entre os episódios'];

function nauHda(S) {
  const n = S.nau;
  if (!n.freq && !n.aspecto.length && !n.relacao.length && !n.desidrat.length) return '';
  let out = 'caracterizada por náuseas e episódios de vômitos';
  if (n.freq) out += ` ${n.freq.toLowerCase()}`;
  if (n.aspecto.length) out += `, com aspecto predominantemente ${joinAnd(n.aspecto).toLowerCase()}`;
  if (n.relacao.length) out += `. Relação cronológica: ${joinAnd(n.relacao).toLowerCase()}`;
  if (n.desidrat.length) out += `. Estado de hidratação: ${joinAnd(n.desidrat).toLowerCase()}`;
  
  // Negações ativas
  const unselected = [];
  const asSet = (n.aspecto || []).map(x => x.toLowerCase());
  if (!asSet.some(x => x.includes('sangue') || x.includes('hematêmese') || x.includes('borra'))) unselected.push('hematêmese ou borra de café');
  if (!asSet.some(x => x.includes('fecaloide'))) unselected.push('odor ou aspecto fecaloide');
  if (unselected.length) out += `. Sem relato de ${joinAnd(unselected)}.`;

  return out;
}
function nauAfter(S){
 const n=S.nau;let out='';
 if(n.aspecto.includes('Conteúdo fecaloide (odor pútrido / obstrução distal)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE OBSTRUÇÃO INTESTINAL BAIXA / ÍLEO COMPLICADO</strong> — Jejum oral absoluto, sondagem nasogástrica (SNG) aberta para descompressão em sifonagem, hidratação venosa vigorosa e avaliação urgente do Cirurgião Geral.</div>`;
 }
 if(n.relacao.includes('Vômitos súbitos sem náusea prévia ("em jato" — alerta de HIC)')){
  out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-circle" aria-hidden="true"></i> <strong>VÔMITOS EM JATO (SUSPEITA DE HIPERTENSÃO INTRACRANIANA)</strong> — Exame neurológico detalhado (fundoscopia / pupilas) e indicação de TC de crânio sem contraste de urgência.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de início dos sintomas</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 6 horas, há 24 horas"></div>`;
 return out;
}

registerQx('Náusea e Vômitos',{
 anamnese:{
  sigla:'nau',
  blocks:[
   {key:'freq',label:'Frequência e Incoercibilidade',type:'radio',options:NAU_FREQ,autoOpenNext:'aspecto'},
   {key:'aspecto',label:'Aspecto do Material Emitido',type:'tags',options:NAU_ASPECTO,autoOpenNext:'relacao'},
   {key:'relacao',label:'Mecanismo e Sintomas Concomitantes',type:'tags',options:NAU_RELACAO,autoOpenNext:'desidrat'},
   {key:'desidrat',label:'Sinais de Desidratação e Depleção',type:'tags',options:NAU_DESIDRAT}
  ],
  after:nauAfter
 },
 hda:nauHda
});


// ─── Diarreia ──────────────────────────────────────────────────────────────
const DIA_ASPECTO=['Aquosa profusa (sem sangue ou muco)','Pastosa com restos alimentares','Disenteria franca (fezes com sangue vivo, muco e pus)','Fezes escurecidas pastosas / melena'];
const DIA_DURACAO=['Aguda (< 14 dias)','Persistente (14 a 30 dias)','Crônica (> 30 dias)'];
const DIA_ASSOC=['Dor abdominal difusa em cólica','Tenesmo retal e urgência evacuatória','Febre diária associada com calafrios','Náuseas e vômitos concomitantes','Síncope ou pré-síncope ao evacuar'];
const DIA_EPIDEM=['Ingestão de alimentos suspeitos / refeições fora de casa','Casos semelhantes no domicílio ou comunidade próxima','Uso recente de antibióticos nas últimas 8 semanas (suspeita de C. difficile)','Viagem recente para área com saneamento precário','Doença inflamatória intestinal conhecida'];
const DIA_VOLEMIA=['Boa aceitação de líquidos por via oral','Sinais clínicos de desidratação (sede, boca seca, astenia intensa)','Oligúria perceptível pelo paciente'];

function diaHda(S) {
  const d = S.dia;
  if (!d.aspecto && !d.duracao && !d.assoc.length && !d.epidem.length && !d.volemia.length) return '';
  let out = 'apresentando episódios de diarreia';
  if (d.duracao) out += ` de evolução ${d.duracao.toLowerCase()}`;
  if (d.aspecto) out += `, com fezes de aspecto ${d.aspecto.toLowerCase()}`;
  if (d.assoc.length) out += `. Manifestações acompanhantes: ${joinAnd(d.assoc).toLowerCase()}`;
  if (d.epidem.length) out += `. Dados epidemiológicos: ${joinAnd(d.epidem).toLowerCase()}`;
  if (d.volemia.length) out += `. Balanço hídrico: ${joinAnd(d.volemia).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  if (!d.aspecto.toLowerCase().includes('sangue') && !d.aspecto.toLowerCase().includes('disenteria') && !d.aspecto.toLowerCase().includes('melena')) {
    unselected.push('sangue macroscópico nas fezes (melena ou hematoquezia)');
  }
  const asSet = (d.assoc || []).map(x => x.toLowerCase());
  if (!asSet.includes('febre diária associada com calafrios')) unselected.push('febre alta');
  if (!asSet.includes('síncope ou pré-síncope ao evacuar')) unselected.push('síncope');
  if (unselected.length) out += `. Negação de ${joinAnd(unselected)}.`;

  return out;
}
function diaAfter(S){
 const d=S.dia;let out='';
 if(d.aspecto.includes('Disenteria franca (fezes com sangue vivo, muco e pus)')){
  out+=`<div class="abox aw" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>DISENTERIA AGUDA INVASIVA</strong> — Avaliar toxemia; hidratação venosa / oral rigorosa. Evitar antidiarreicos inibidores de motilidade (Loperamida) pelo risco de megacólon tóxico.</div>`;
 }
 if(d.epidem.includes('Uso recente de antibióticos nas últimas 8 semanas (suspeita de C. difficile)')){
  out+=`<div class="abox ai" style="margin-top:8px"><i class="ti ti-info-circle" aria-hidden="true"></i> <strong>USO RECENTE DE ANTIBIÓTICOS</strong> — Considerar colite por Clostridioides difficile. Solicitar pesquisa de toxina A/B nas fezes; hidratação e isolamento de contato entérico.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de duração da diarreia</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 2 dias, há 1 semana"></div>`;
 return out;
}

registerQx('Diarreia',{
 anamnese:{
  sigla:'dia',
  blocks:[
   {key:'aspecto',label:'Aspecto das Fezes',type:'radio',options:DIA_ASPECTO,autoOpenNext:'duracao'},
   {key:'duracao',label:'Duração e Cronologia',type:'radio',options:DIA_DURACAO,autoOpenNext:'assoc'},
   {key:'assoc',label:'Sintomas Associados',type:'tags',options:DIA_ASSOC,autoOpenNext:'epidem'},
   {key:'epidem',label:'Epidemiologia e Fatores de Risco',type:'tags',options:DIA_EPIDEM,autoOpenNext:'volemia'},
   {key:'volemia',label:'Avaliação de Hidratação e Volemia',type:'tags',options:DIA_VOLEMIA}
  ],
  after:diaAfter
 },
 hda:diaHda
});


// ─── Sangramento ───────────────────────────────────────────────────────────
const SAN_SITIO=['Gastrointestinal alto (hematêmese viva / fezes em melena)','Gastrointestinal baixo (enterorragia / sangue vivo nas fezes)','Trato respiratório (hemoptise franca com tosse)','Trato urinário (hematúria macroscópica com ou sem coágulos)','Otorrinolaringológico (epistaxe profusa / gengivorragia ativa)','Ginecológico (sangramento vaginal anormal volumoso)','Cutâneo-mucoso (petéquias disseminadas, púrpuras, equimoses espontâneas)'];
const SAN_VOL=['Pequeno volume autolimitado sem tontura','Moderado volume recorrente','Volumoso com repercussão hemodinâmica'];
const SAN_COAG=['Em uso regular de Varfarina','Em uso de anticoagulante oral direto (DOAC)','Em uso de antiagregante plaquetário','Cirrose hepática ou coagulopatia conhecida','Trombocitopenia prévia relatada','Nega uso de anticoagulantes ou coagulopatias conhecidas'];

function sanHda(S) {
  const s = S.san;
  if (!s.sitio.length && !s.vol && !s.coag.length) return '';
  let out = 'apresentando sangramento ativo';
  if (s.sitio.length) out += ` com exteriorização em ${joinAnd(s.sitio).toLowerCase()}`;
  if (s.vol) out += `, de volume estimado como ${s.vol.toLowerCase()}`;
  if (s.coag.length) out += `. Fatores hemostáticos e anticoagulação: ${joinAnd(s.coag).toLowerCase()}`;
  return out;
}
function sanAfter(S){
 const s=S.san;let out='';
 if(s.vol==='Volumoso com repercussão hemodinâmica'||s.sitio.includes('Gastrointestinal alto (hematêmese viva / fezes em melena)')||s.sitio.includes('Gastrointestinal baixo (enterorragia / sangue vivo nas fezes)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA DE HEMORRAGIA POTENCIALMENTE GRAVE</strong> — Garantir 2 acessos venosos periféricos calibrosos (16G/18G). Solicitar tipagem sanguínea com Prova Cruzada e reserva de concentrado de hemácias. Monitorização hemodinâmica contínua. Iniciar IBP venoso em dose de ataque se suspeita de HDA.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de início do sangramento</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: há 1 hora, há 6 horas"></div>`;
 return out;
}

registerQx('Sangramento',{
 anamnese:{
  sigla:'san',
  blocks:[
   {key:'sitio',label:'Sítio Anatômico Exteriorizado',type:'tags',options:SAN_SITIO,autoOpenNext:'vol'},
   {key:'vol',label:'Volume Estimado e Repercussão',type:'radio',options:SAN_VOL,autoOpenNext:'coag'},
   {key:'coag',label:'Anticoagulação e Coagulopatias',type:'tags',options:SAN_COAG}
  ],
  after:sanAfter
 },
 hda:sanHda
});


// ─── Icterícia ─────────────────────────────────────────────────────────────
const ICT_CRONO=['Início hiperagudo (< 7 dias) em paciente sem hepatopatia prévia (suspeita de IHA)','Início subagudo a progressivo há semanas','Curso flutuante e recorrente'];
const ICT_COLESTASE=['Colúria franca (urina escura cor de refrigerante)','Acolia fecal (fezes claras/esbranquiçadas)','Prurido cutâneo difuso generalizado'];
const ICT_GRAVIDADE=['Alteração do sono / inversão do ciclo sono-vigília','Lentificação psicomotora / confusão mental (encefalopatia)','Presença de flapping / asterixe','Sangramentos espontâneos (gengivorragia, equimoses)','Ausência de sinais de encefalopatia ou coagulopatia'];
const ICT_COLANGITE=['Dor intensa em hipocôndrio direito','Febre com calafrios trepidantes (Tríade de Charcot)','Hipotensão ou choque associado (Pêntade de Reynolds)','Ausência de dor biliar ou febre associada'];
const ICT_TOXICOS=['Ingestão de Paracetamol em dose excessiva','Uso de fitoterápicos / chás emagrecedores / anabolizantes','Uso recente de antibióticos (Amoxicilina-Clavulanato)','Consumo abusivo recente de bebidas alcoólicas','Histórico de cirrose ou hepatite viral B/C'];

function ictQHda(S) {
  const i = S.ictQ;
  if (!i.crono && !i.colestase.length && !i.gravidade.length && !i.colangite.length && !i.toxicos.length) return '';
  let out = 'com quadro de icterícia';
  if (i.crono) out += ` de surgimento ${i.crono.toLowerCase()}`;
  if (i.colestase.length) out += `. Sinais de colestase associados: ${joinAnd(i.colestase).toLowerCase()}`;
  if (i.colangite.length) out += `. Rastreio de colangite: ${joinAnd(i.colangite).toLowerCase()}`;
  if (i.gravidade.length) out += `. Manifestações de disfunção hepática: ${joinAnd(i.gravidade).toLowerCase()}`;
  if (i.toxicos.length) out += `. Fatores de risco / hepatotoxinas: ${joinAnd(i.toxicos).toLowerCase()}`;

  // Negações ativas
  const unselected = [];
  const colSet = (i.colangite || []).map(x => x.toLowerCase());
  const grSet = (i.gravidade || []).map(x => x.toLowerCase());
  if (!colSet.some(x => x.includes('charcot') || x.includes('febre'))) unselected.push('febre com calafrios (Charcot)');
  if (!grSet.some(x => x.includes('flapping') || x.includes('asterixe') || x.includes('encefalopatia') || x.includes('confusão'))) unselected.push('asterixe ou encefalopatia aparente');
  if (unselected.length) out += `. Ao interrogatório, ausência de ${joinAnd(unselected)}.`;

  return out;
}
function ictQAfter(S){
 const i=S.ictQ;let out='';
 if(i.colangite.includes('Febre com calafrios trepidantes (Tríade de Charcot)')||i.colangite.includes('Hipotensão ou choque associado (Pêntade de Reynolds)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>ALERTA: SUSPEITA DE COLANGITE AGUDA OBSTRUTIVA</strong> — Antibioticoterapia venosa empírica de amplo espectro imediata (ex: Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) + descompressão biliar urgente (CPRE ou drenagem percutânea/cirúrgica).</div>`;
 }
 if(i.crono.includes('Início hiperagudo (< 7 dias) em paciente sem hepatopatia prévia (suspeita de IHA)')){
  out+=`<div class="abox ad" style="margin-top:8px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> <strong>SUSPEITA DE INSUFICIÊNCIA HEPÁTICA AGUDA (IHA)</strong> — Dosar coagulograma (INR), função renal e transaminases imediatamente. Vigilância rigorosa de encefalopatia e edema cerebral. Contatar centro de transplante hepático precoce se INR > 1,5.</div>`;
 }
 out+=`<div style="margin-top:8px"><label>Tempo de evolução da icterícia</label><input type="text" value="${esc(S.tempo)}" oninput="S.tempo=this.value" placeholder="Ex: 5 dias, 2 semanas"></div>`;
 return out;
}

registerQx('Icterícia',{
 anamnese:{
  sigla:'ictQ',
  blocks:[
   {key:'crono',label:'Cronologia da Instalação',type:'radio',options:ICT_CRONO,autoOpenNext:'colestase'},
   {key:'colestase',label:'Sinais de Síndrome Colestática',type:'tags',options:ICT_COLESTASE,autoOpenNext:'gravidade'},
   {key:'gravidade',label:'Rastreio de Encefalopatia e Falência Hepática',type:'tags',options:ICT_GRAVIDADE,autoOpenNext:'colangite'},
   {key:'colangite',label:'Rastreio de Colangite Aguda (Tríade de Charcot / Reynolds)',type:'tags',options:ICT_COLANGITE,autoOpenNext:'toxicos'},
   {key:'toxicos',label:'Exposição a Hepatotoxinas e Antecedentes',type:'tags',options:ICT_TOXICOS}
  ],
  after:ictQAfter
 },
 hda:ictQHda
});

