/* ─── Cabeçalho do Prontuário & Identificação do Paciente ─── */
const _sep=()=>'';
function buildHeader(){
 const ori=['Vaga Zero','Transferência'].includes(S.orig)&&(S.origInst||S.origMotivo)?' ('+[S.origInst,S.origMotivo].filter(Boolean).join(' / ')+')':'';
 const d=new Date();
 const pad=(n)=>String(n).padStart(2,'0');
 const nowStr=`${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
 return `# ADMISSÃO EM SALA DE EMERGÊNCIA\n- Paciente: ${S.nome||'Não informado'} | Sexo: ${S.sexo||'Não informado'} | Idade: ${S.idade} anos\n- Admissão: ${nowStr} | Origem: ${S.orig}${ori}`;
}
