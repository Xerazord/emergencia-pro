/* ─── Estado Reativo Central (S), Catálogos e Templates ─── */
const S={step:0,nome:'',idade:30,sexo:'',orig:'Demanda Espontânea',origInst:'',origMotivo:'',queixa:null,tempo:'',
 caract:[],
 hpp:[],muc:'',ale:'Nega',tab:'',etil:'',drog:'',fc:'',sat:'',pa:'',fr:'',gli:'',temp:'',eva:'',peso:'',
 ef:null,amb:{g:'',cv:'',re:'',ab:'',ne:'',pe:''},
 abc:{va:'Pérvia e Patente',fon:'Preservada',col:'Não indicado',exp:'Simétrica',
 mv:'Presente e Simétrico',rud:[],esf:[],tec:'< 3s',aus:[],pul:'Simétricos',
 abd:[],ao:4,rv:5,rm:6,pup:'Isocóricas e Reativas',def:[],ede:'Ausente',cac:'Com cacifo',pel:[]},
 hear:{h:null,e:null,r:null,t:null},
 edacs:{sx:'M',cad:false,dia:false,rad:false,ins:false,pal:false,t0:'',t2:''},
 sind:null,subsind:null,subsinds:[],chk:{},nts:{},imp:'',
 pocS:{pulmao:'',coracao:'',abdome:'',mmii:'',outros:''},
 ecgS:{normal:false,ritmo:'',fcEcg:'',pr:'',qrs:'',qtc:'',st:[],ondaT:[],padroes:[]},
 ecgSOpen:{ritmo:true},
 itDrug:'',
 dt:{loc:[],ini:'',qual:[],irr:[],modif:[],sem:null,pal:null,sin:[]},
 dtOpen:{loc:true,ini:true},
 dsp:{inicio:'',padrao:[],modif:[],assocCV:[],assocResp:[],assocInf:[],ctx:[]},
 dspOpen:{inicio:true},
 dspEF:{fala:'',posic:'',cianose:'',aus:[],sinaisCV:[]},
 dspEFOpen:{fala:true},
 cef:{inicio:'',loc:[],qual:[],modif:[],precip:[],assoc:[],alarm:[],antec:[],descr:{auraMot:'',deficit:'',conv:'',sinc:''}},
 cefOpen:{inicio:true},
 cefEF:{mental:[],motor:[],coord:[],regional:[]},
 cefEFOpen:{mental:true},
 sinc:{evento:null,prod:null,post:null,gat:[],car:[],rec:null,alar:[],ante:[]},
 sincOpen:{evento:true,prod:false,post:false,gat:false,car:false,rec:false,alar:false,ante:false},
 sincEF:{orto:null,sop:[],nf:[]},
 sincEFOpen:{orto:true,sop:false,nf:false},
 cv:{inicio:null,padrao:[],dur:null,pos:[],evento:[],alarm:[],antec:[],descrAura:''},
 cvOpen:{inicio:true,padrao:false,dur:false,pos:false,evento:false,alarm:false,antec:false},
 cvEF:{nivel:null,foco:[],men:[]},
 cvEFOpen:{nivel:true,foco:false,men:false},
 neu:{tempoUvvb:'',tipoUvvb:'',janela:'',motor:[],lado:'',linguagem:[],fossa:[],mimics:[],anticoag:[]},
 neuOpen:{uvvb:true},
 abdQ:{inicio:'',loc:[],fatores:[],alarme:[],gin:[],dum:''},
 abdQOpen:{inicio:true},
 rncQ:{instalacao:'',contexto:[],sinais:[],funcional:''},
 rncQOpen:{instalacao:true},
 intQ:{circunstancia:'',tempoVia:[],doseCo:[],toxidromes:[]},
 intQOpen:{circunstancia:true},
 trm:{mec:'',altaEnergia:[],protecao:[],cena:[],ativas:[]},
 trmOpen:{mec:true},
 agi:{evolucao:'',padrao:[],psicoticos:[],organica:[],psiqHpp:[]},
 agiOpen:{evolucao:true},
 tos:{tipo:'',duracao:'',padrao:[],assoc:[],risco:[]},
 tosOpen:{tipo:true},
 feb:{afericao:'',pico:'',padrao:'',foco:[],alarme:[],risco:[]},
 febOpen:{afericao:true},
 nau:{freq:'',aspecto:[],relacao:[],desidrat:[]},
 nauOpen:{freq:true},
 dia:{aspecto:'',duracao:'',assoc:[],epidem:[],volemia:[]},
 diaOpen:{aspecto:true},
 san:{sitio:[],vol:'',coag:[]},
 sanOpen:{sitio:true},
 lom:{carac:[],caudaEquina:[],alarme:[]},
 lomOpen:{carac:true},
 ictQ:{crono:'',colestase:[],gravidade:[],colangite:[],toxicos:[]},
 ictQOpen:{crono:true},
 ver:{tipo:'',duracao:'',redflags:[],auditivo:[]},
 verOpen:{tipo:true},
 palQ:{inicio:'',atividade:[],gatilhos:[],piora:[],termino:[],instab:[]},
 palQOpen:{inicio:true,atividade:false,gatilhos:false,piora:false,termino:false,instab:false},
 edm:{lat:'',ext:'',locais:[],sist:[],wells:[],flogose:[],toracicos:[]},
 edmOpen:{lat:true,ext:false,locais:false,sist:false,wells:false},
 sincCalgary:{bivent:false,palp:false,esforco:false,supina:false,prod:false,orto:false,situac:false},
 sincCanadian:{histCard:false,paEmerg:false,tropo:false,ecgAnorm:false,dxEmerg:''},
 wellsTep:{tvp:false,alt:false,fc:false,imob:false,prev:false,hemo:false,neo:false,evaluated:false},
 wellsTvp:{neo:false,paral:false,imob:false,dor:false,edemaMembro:false,assimetria:false,cacifo:false,colaterais:false,prev:false,altMenos:false,evaluated:false},
 nihss:{loc:0,qLoc:0,cLoc:0,olhar:0,campo:0,face:0,bracoE:0,bracoD:0,pernaE:0,pernaD:0,ataxia:0,sensib:0,ling:0,disart:0,extin:0,evaluated:false},
 alvarado:{mig:false,anox:false,nau:false,dorFid:false,descomp:false,febre:false,leuco:false,desvio:false,evaluated:false},
 tokyo:{locais:false,sist:false,img:false,disfunc:false,grau2:false,evaluated:false},
 psiPort:{asilo:false,neo:false,hepato:false,icc:false,dcv:false,renal:false,rnc:false,fr:false,pas:false,temp:false,fc:false,ph:false,ureia:false,na:false,gli:false,ht:false,pao2:false,derrame:false,evaluated:false},
 mascc:{sintomas:'5',pa:false,dpoc:false,solido:false,desid:false,amb:false,evaluated:false},
 trmRules:{cct:{gcs:false,base:false,afund:false,vomit:false,idoso:false,amnesia:false,energia:false,evaluated:false}, cspine:{idoso:false,mecanismo:false,parestesia:false,baixoRisco:false,rotacao:false,evaluated:false}, nexus:{dor:false,focal:false,gcs15:false,intox:false,distracao:false,evaluated:false}},
 childPugh:{bili:'1',alb:'1',inr:'1',ascite:'1',encef:'1'},
 meld:{bili:'',cr:'',inr:'',na:'',dialise:false},
 abcOpen:{a:true},
 relMode:'full',
 syndromeGridCollapsed:false,
 condStatus:'em_conduta',condReavalMin:null,condPendDesc:'',condPendCat:'outros',condPendPrazoMin:null,cardOpen:{},customExams:[]};

// Snapshot do estado inicial para resetCase()
const INITIAL_S=JSON.parse(JSON.stringify(S));

const EF_TEMPLATES={
 M:{
  g:'BEG, LOTE, corado, hidratado, eupneico em ar ambiente, afebril',
  cv:'Ritmo regular em 2 tempos, bulhas normofonéticas, sem sopros. Pulsos periféricos cheios e simétricos',
  re:'MV presente e simétrico bilateralmente, sem ruídos adventícios',
  ab:'Abdome plano, flácido, RHA presentes, sem visceromegalias, sem massas palpáveis, indolor à palpação',
  ne:'Consciente, orientado em tempo e espaço, Glasgow 15. Força e sensibilidade preservadas. Sem déficits focais',
  pe:'MMII sem edema, sem sinais flogísticos, pulsos tibiais e pediosos simétricos. Pele íntegra'
 },
 F:{
  g:'BEG, LOTE, corada, hidratada, eupneica em ar ambiente, afebril',
  cv:'Ritmo regular em 2 tempos, bulhas normofonéticas, sem sopros. Pulsos periféricos cheios e simétricos',
  re:'MV presente e simétrico bilateralmente, sem ruídos adventícios',
  ab:'Abdome plano, flácido, RHA presentes, sem visceromegalias, útero não palpável, sem massas, indolor à palpação',
  ne:'Consciente, orientada em tempo e espaço, Glasgow 15. Força e sensibilidade preservadas. Sem déficits focais',
  pe:'MMII sem edema, sem sinais flogísticos, pulsos tibiais e pediosos simétricos. Pele íntegra'
 }
};
function deepMergeDefaults(defaults,override){
 if(override===null||override===undefined)return JSON.parse(JSON.stringify(defaults));
 if(typeof defaults!=='object'||defaults===null)return (override!==undefined?override:defaults);
 if(Array.isArray(defaults)){
  return Array.isArray(override)?override:JSON.parse(JSON.stringify(defaults));
 }
 if(typeof override!=='object'||override===null||Array.isArray(override)){
  return JSON.parse(JSON.stringify(defaults));
 }
 const out={};
 const hasOwn=Object.prototype.hasOwnProperty;
 for(const k of Object.keys(defaults)){
  if(k==='__proto__'||k==='constructor'||k==='prototype')continue;
  out[k]=hasOwn.call(override,k)?deepMergeDefaults(defaults[k],override[k]):JSON.parse(JSON.stringify(defaults[k]));
 }
 for(const k of Object.keys(override)){
  if(k==='__proto__'||k==='constructor'||k==='prototype')continue;
  if(!hasOwn.call(defaults,k))out[k]=override[k];
 }
 return out;
}

function sanitizeState(target){
 if(!target || typeof target !== 'object') return;
 for(const k of Object.keys(INITIAL_S)){
  if(k==='__proto__'||k==='constructor'||k==='prototype') continue;
  const defVal = INITIAL_S[k];
  if(target[k] === undefined || target[k] === null){
   target[k] = (defVal !== null && typeof defVal === 'object')
    ? JSON.parse(JSON.stringify(defVal))
    : defVal;
  } else if(typeof defVal === 'object' && defVal !== null && !Array.isArray(defVal)){
   if(typeof target[k] !== 'object' || Array.isArray(target[k])){
    target[k] = JSON.parse(JSON.stringify(defVal));
   } else {
    for(const subK of Object.keys(defVal)){
     if(subK==='__proto__'||subK==='constructor'||subK==='prototype') continue;
     if(target[k][subK] === undefined || target[k][subK] === null){
      target[k][subK] = (defVal[subK] !== null && typeof defVal[subK] === 'object')
       ? JSON.parse(JSON.stringify(defVal[subK]))
       : defVal[subK];
     }
    }
   }
  } else if(Array.isArray(defVal) && !Array.isArray(target[k])){
   target[k] = [];
  }
 }
}


const QX_CATS=[
 {id:'cardio',label:'Cardiovascular',icon:'ti-heart',items:['Dor torácica','Síncope','Palpitações','Edema / Dor em MMII']},
 {id:'resp',label:'Respiratório',icon:'ti-lungs',items:['Dispneia','Tosse']},
 {id:'neuro',label:'Neurológico & Psiquiátrico',icon:'ti-brain',items:['Cefaleia','Déficit neurológico agudo','Convulsão','Rebaixamento de consciência','Vertigem','Agitação psicomotora']},
 {id:'digest',label:'Digestivo & Abdominal',icon:'ti-stomach',items:['Dor abdominal','Náusea e Vômitos','Diarreia','Icterícia','Sangramento']},
 {id:'geral',label:'Sistêmico, Infeccioso & Geral',icon:'ti-virus',items:['Febre','Intoxicação exógena','Dor lombar']},
 {id:'trauma',label:'Trauma & Causas Externas',icon:'ti-ambulance',items:['Trauma']}
];
const QUEIXAS=QX_CATS.flatMap(c=>c.items);
const CMAP={
'Dispneia':['Início súbito','Progressiva','Crônica agudizada','Ortopneia','DPN','Aos esforços','Em repouso','Edema de MMII associado','Dor torácica associada','Sibilos','Crepitações','Uso de musculatura acessória','Febre associada','Hemoptise','Prostração'],
'Tosse':['Seca','Produtiva','Hemoptise','Febre associada','Início súbito','Progressiva','Noturna','Pós-infecciosa'],
'Febre':['Início agudo (< 3 dias)','Subagudo (3–14 dias)','Crônico (> 14 dias)','Calafrios / Tremores','Tosse associada','Dor abdominal associada','Náusea / Vômitos','Diarreia','Lesões cutâneas','Hipotensão','Disúria','Rigidez de nuca','Fotofobia'],
'Dor abdominal':['Em cólica','Contínua','Em queimação','Em pontada','Epigástrio','FID','FIE','Hipocôndrio D','Hipocôndrio E','Periumbilical','Difusa','Hipogástrio','Irradiação para dorso','Irradiação para MMII','Murphy +','Defesa','Descompressão dolorosa','Sinal de Psoas','Náusea / Vômitos','Parada de flatos','Febre','Icterícia','Hematúria'],
'Náusea e Vômitos':['Início agudo','Repetido','Incoercível','Conteúdo alimentar','Conteúdo bilioso','Conteúdo hemático','Dor abdominal associada','Febre associada','Cefaleia associada','Vertigem associada'],
'Diarreia':['Início agudo (< 14 dias)','Persistente (> 14 dias)','Aquosa','Mucossanguinolenta','Com sangue','> 6 episódios/dia','3–6 episódios/dia','Febre associada','Dor abdominal associada','Sinais de desidratação'],
'Sangramento':['Epistaxe','Gengivorragia','Hematúria','Hematêmese','Melena','Hematoquezia','Sangramento vaginal','Equimoses espontâneas','Hematoma'],
'Dor lombar':['Início súbito','Progressiva','Pós-trauma','Irradiação para MMII','Irradiação para virilha','Déficit neurológico','Febre associada','Hematúria','Massa pulsátil palpável'],
'Icterícia':['Início agudo (< 4 sem)','Progressiva','Colúria','Acolia','Prurido','Perda de peso','Encefalopatia hepática','Coagulopatia','Ascite','Febre associada','Dor abdominal associada'],
'Cefaleia':['Início trovão','Pior cefaleia da vida','Rigidez nuca','Fotofobia','Febre associada','Déficit focal'],
'Déficit neurológico agudo':['Hemiparesia','Afasia','Desvio de rima','Janela < 4,5h','Hemihipoestesia','Diplopia','Ataxia'],
'Vertigem':['Início súbito','Posicional','Contínua','Náusea / Vômitos','Déficit auditivo','Nistagmo','Ataxia','Déficit neurológico focal'],
'Rebaixamento de consciência':['Início súbito','Progressivo','Febre associada','Trauma prévio','Uso de drogas / álcool','Convulsão prévia','Cefaleia prévia','Déficit focal'],
'Agitação psicomotora':['Início agudo','Antecedente psiquiátrico','Uso de drogas','Febre associada','Déficit neurológico','Agressividade','Alucinações'],
'Convulsão':['1ª crise','Crise recorrente','Focal','Generalizada / TCG','Pós-ictal prolongado','Estado de mal (> 5 min)','Febre associada','Trauma na queda','Uso de drogas / álcool'],
'Síncope':['PCB','Palpitações prévias','Pós-esforço','Posicional','Sem pródromo','Trauma na queda'],
'Trauma':['Alta energia','Queda de nível','Atropelamento','TCE','Agressão','MOC','Deformidade'],
'Palpitações':['Início súbito','Ritmo irregular','Regular','Duração em segundos','Duração em minutos','Horas / Contínua','Síncope associada','Pré-síncope','Dor torácica associada','Dispneia','Em repouso','Ao esforço'],
'Intoxicação exógena':['Acidental','Intencional','Tentativa de autoextermínio','Via oral','Via inalatória','Via cutânea','Via IV','Toxíndrome simpaticomimética','Toxíndrome colinérgica','Toxíndrome anticolinérgica','Síndrome opioide','Síndrome sedativo-hipnótica'],
'Edema / Dor em MMII':['Unilateral','Bilateral','Edema predominante','Dor predominante','Eritema / Calor local','Assimetria de membros','Início agudo','Progressivo','Dispneia associada','Dor torácica associada','Imobilização recente','Cirurgia recente']};
const ALERTAS={'Déficit neurológico agudo':{m:'Protocolo AVC — verificar janela para trombólise (< 4,5h)',c:'ad'},'Convulsão':{m:'Via aérea + acesso venoso. Se > 5 min: protocolo estado de mal epiléptico',c:'aw'},'Dispneia':{m:'Oximetria contínua. Considerar: TEP, DPOC agudizado, EAP',c:'aw'},'Intoxicação exógena':{m:'Avaliar nível de consciência e via aérea — depressão respiratória pode ser rápida',c:'ad'},'Icterícia':{m:'Verificar INR e nível de consciência — encefalopatia + icterícia recente pode indicar IHA',c:'aw'},'Edema / Dor em MMII':{m:'Excluir TVP — D-dímero se Wells baixo; Doppler venoso se suspeita moderada/alta',c:'aw'}};
const SLIST=[
{id:'dtx',l:'Dor torácica'},
{id:'cho',l:'Choque indiferenciado'},
{id:'dsp',l:'Síndrome dispneica'},
{id:'neu',l:'Síndrome neurovascular'},{id:'rnc',l:'Rebaixamento de consciência'},{id:'cef',l:'Cefaleia'},{id:'con',l:'Convulsão'},
{id:'pal',l:'Palpitações / Arritmias'},{id:'sinc',l:'Síncope'},
{id:'abd',l:'Síndrome abdominal aguda'},{id:'hdg',l:'Hemorragia digestiva'},{id:'ict',l:'Icterícia / IHA'},
{id:'feb',l:'Síndrome febril / Sepse'},
{id:'int',l:'Intoxicação exógena'},{id:'dlb',l:'Dor lombar aguda'},{id:'emmi',l:'Edema / Dor em MMII'}];
const STEPS=[{l:'Identificação',i:'ti-user'},{l:'Queixa',i:'ti-stethoscope'},{l:'Dados clínicos',i:'ti-heart-rate-monitor'},{l:'Exame físico',i:'ti-search'},{l:'Impressão / Conduta',i:'ti-clipboard-check'},{l:'Relatório',i:'ti-file-text'}];

