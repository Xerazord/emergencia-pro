# 🗺️ MAPA DE AÇÕES PENDENTES — EMERGÊNCIA PRO
> **Documento de Alinhamento e Execução Clínica / Técnica**  
> *Última atualização: 03/11/2026*  
> Este documento centraliza todas as definições, adaptações ao SUS e validações que dependem do médico-usuário para a evolução da plataforma.

---

## 📌 SUMÁRIO EXECUTIVO DO STATUS ATUAL

| Módulo / Frente | Status | Depende de Aprovação do Usuário? |
| :--- | :--- | :---: |
| **Passo 1: História Clínica (Anamnese)** | 🟢 Concluído e Estabilizado | Não |
| **Passo 2: Telemetria HUD (Sinais Vitais)** | 🟢 Concluído (Cards dinâmicos com classes vok/vw/vc) | Não |
| **Passo 3: Exame Físico (Segmented HUD Controls)** | 🟢 Concluído (`segRadio` + `segTags`) | Não |
| **Expurgo de Duplicações e Lixo Acadêmico** | 🟢 Concluído em Abdominal, Sistêmico, Respiratório e Neuro | Não |
| **Testes de Regressão e Paridade (Golden Master)** | 🟢 100% Aprovado (12 cenários clínicos) | Não |
| **Bundles Clínicos Rápidos adaptados ao SUS** | 🟡 Desenhados abaixo | **SIM (Checagem Item a Item)** |
| **Cockpit Beira-Leito (Protocolos Críticos)** | 🟡 Estruturados abaixo | **SIM (Validação de Texto Corrido)** |
| **Identidade Visual / Símbolo do Logo** | 🟡 3 Conceitos prontos | **SIM (Escolha de 1 Conceito)** |
| **Racionalização de Descritores de Alarme** | 🟡 Mapeados no catálogo | **SIM (Validação da Redução de Chips)** |

---

## 🏥 SEÇÃO 1: BUNDLES CLÍNICOS RÁPIDOS (PADRÃO SUS / RENAME)
*Aprovada a ideia de bundles compactos para acelerar a prescrição. Conforme diretriz do usuário, todas as medicações foram convertidas estritamente para a realidade de UPA / PS do SUS brasileiro (ex: Clopidogrel no lugar de Ticagrelor, Nitroprussiato/Nitroglicerina no lugar de Labetalol/Nicardipina).*

### 🔴 Bundle 1: Síndrome Coronariana Aguda (SCA com ou sem supra de ST)
- [ ] **AAS 200–300 mg (2 a 3 cp de 100 mg)** mastigável na admissão (manutenção: 100 mg/dia VO)
- [ ] **Clopidogrel 300 mg VO** (ataque habitual) OU **600 mg VO** se encaminhamento imediato para ICP primária / hemodinâmica
- [ ] **Anticoagulação plena adaptada ao SUS**:
  - *Opção 1 (Preferencial):* **Enoxaparina 1 mg/kg SC de 12/12h** (se IAM com supra em < 75 anos: dose de ataque IV de 30 mg antes da 1ª dose SC)
  - *Opção 2:* **Heparina Não Fracionada (HNF)** 60 U/kg IV bolus (máx 4.000 U) + infusão contínua 12 U/kg/h (máx 1.000 U/h) titulada por TTPa
- [ ] **Estatina potente**: Atorvastatina 80 mg VO (ou Sinvastatina 40 mg VO se indisponibilidade)
- [ ] **Alívio sintomático de dor / isquemia**:
  - **Dinitrato de Isossorbida 5 mg SL** a cada 5 min (máx 3 doses) — *contraindicado se PAS < 90 mmHg, FC < 50 ou > 100 bpm, suspeita de IAM de ventrículo direito ou uso de inibidores de PDE-5 nas últimas 24–48h*
  - **Nitroglicerina IV em BIC** (5 mcg/min titulada) se angina refratária, hipertensão grave ou congestão pulmonar associada
  - **Morfina 2–4 mg IV** reservada estritamente para dor refratária persistente após nitratos

---

### 🟠 Bundle 2: Sepse e Choque Séptico (Surviving Sepsis Campaign adaptado ao SUS)
- [ ] **Abertura de Protocolo Sepse** e monitorização contínua (sinais vitais, oximetria e débito urinário)
- [ ] **Coleta imediata de 2 pares de hemoculturas** periféricas pareadas antes do antibiótico (não atrasar início do ATB)
- [ ] **Ressuscitação volêmica guiada por resposta**: Cristaloide balanceado (Ringer Lactato ou SF 0,9%) até 30 mL/kg nas primeiras 3h, interrompendo se sinais de congestão (POCUS)
- [ ] **Antibioticoterapia parenteral na 1ª hora (focos mais frequentes no SUS)**:
  - *Foco Pulmonar:* Ceftriaxona 2 g IV 1×/dia + Azitromicina 500 mg IV/VO 1×/dia
  - *Foco Urinário:* Ceftriaxona 2 g IV 1×/dia (adicionar Amicacina 15 mg/kg IV se choque)
  - *Foco Abdominal:* Ceftriaxona 2 g IV 1×/dia + Metronidazol 500 mg IV 8/8h (ou Piperacilina-Tazobactam 4,5 g IV 6/6h se ambiente hospitalar prévio)
  - *Foco Cutâneo:* Oxacilina 2 g IV 4/4h (ou Vancomicina 15–20 mg/kg IV se risco de MRSA)
- [ ] **Vasopressor precoce**: **Norepinefrina em BIC** (0,05 a 0,5 mcg/kg/min) via periférica provisória ou central se PAD < 40 mmHg ou refratariedade volêmica inicial, meta de PAM ≥ 65 mmHg
- [ ] **Controle metabólico**: Dosagem de lactato sérico na admissão e seriado em 2–4h para avaliar clearance de lactato

---

### 🟡 Bundle 3: AVC Isquêmico Agudo / Crise Hipertensiva Permissiva
- [ ] **Abertura de Protocolo de AVC Agudo** com registro exato do horário de início dos sintomas / *delta T* (ou último momento visto bem)
- [ ] **Glicemia capilar imediata** no leito (descartar hipoglicemia como causa mimetizadora)
- [ ] **TC de Crânio sem contraste** prioritária em < 20 minutos
- [ ] **Controle pressórico adaptado ao SUS**:
  - *Se candidato à trombólise e PA > 185/110 mmHg:* **Nitroprussiato de Sódio IV em BIC** (0,25 a 10 mcg/kg/min) titulado continuamente para manter PA < 185/110 mmHg antes do rt-PA e < 180/105 mmHg pós-trombólise
  - *Se não candidato à trombólise:* Manejo pressórico permissivo (tratar apenas se PA > 220/120 mmHg com redução gradual de 15% em 24h)
- [ ] **Trombólise química se elegível (< 4,5 horas e sem contraindicações)**: **Alteplase (rt-PA) 0,9 mg/kg** (máx 90 mg) — 10% da dose em bolus IV em 1 minuto e os 90% restantes infundidos em 60 minutos em BIC
- [ ] **Cabeceira a 0°–30°**, jejum oral até avaliação fonoaudiológica de deglutição, prevenção de hipertermia e hiperglicemia

---

### 🔵 Bundle 4: Crise Asmática Grave / Exacerbação de DPOC
- [ ] **Oxigenoterapia controlada**: Alvo SpO₂ 93–95% em asmáticos; alvo SpO₂ 88–92% em DPOC (evitar hiperóxia induzida com retenção de CO₂)
- [ ] **Broncodilatação inalatória intensiva**:
  - **Fenoterol (Berotec) ou Salbutamol**: 10 a 20 gotas (ou 2,5 a 5 mg) em nebulização com SF 0,9% a cada 20 min nas primeiras 3 doses (ou spray dosimetrado 4–8 jatos com espaçador)
  - **Brometo de Ipratrópio (Atrovent)**: 20 a 40 gotas (ou 0,5 mg) associado nas nebulizações iniciais
- [ ] **Corticoide sistêmico precoce**:
  - Prednisona 40 a 60 mg VO OU Hidrocortisona 200 mg IV bolus (ou Metilprednisolona 60–125 mg IV)
- [ ] **Terapia de resgate para crise refratária de Asma**:
  - **Sulfato de Magnésio 2 g IV** diluído em 100 mL de SF 0,9% infundido em 20 minutos
- [ ] **Suporte ventilatório não invasivo (VNI)**: Indicado prioritariamente na exacerbação de DPOC com acidose respiratória (pH < 7,35 e PaCO₂ > 45 mmHg)
- [ ] **Antibioticoterapia se DPOC com escarro purulento / volume aumentado**: Amoxicilina-Clavulanato 875/125 mg VO 12/12h ou Azitromicina 500 mg VO 1×/dia por 5 dias

---

### 🟣 Bundle 5: Hemorragia Digestiva Alta (HDA)
- [ ] **Estabilização hemodinâmica imediata**: 2 acessos venosos periféricos calibrosos 16–18G, reposição volêmica cautelosa com cristaloide (evitar hiper-hidratação que aumente pressão portal)
- [ ] **Estratégia transfusional restritiva**: Concentrado de hemácias se Hb < 7,0 g/dL (ou Hb < 8,0 g/dL se coronariopatia ativa associada)
- [ ] **Supressão ácida venosa**: **Omeprazol 80 mg IV bolus** seguido de 8 mg/h em BIC contínua por 72h (ou Omeprazol 40 mg IV 12/12h em serviços sem bomba dedicada)
- [ ] **Medidas para suspeita de HDA Varicosa (Hipertensão Portal / Cirrose)**:
  - **Octreotide 50 mcg IV bolus** seguido de 50 mcg/h em BIC contínua OU **Terlipressina 2 mg IV bolus** a cada 4 horas
  - **Ceftriaxona 1 g IV 1×/dia** por 7 dias (profilaxia precoce de PBE e translocação bacteriana)
- [ ] **Procinético pré-EDA**: Ondansetrona 8 mg IV (ou Metoclopramida se peristalse gástrica necessária para clareamento)
- [ ] **Endoscopia Digestiva Alta (EDA) diagnóstica e terapêutica** em até 12 a 24 horas após estabilização hemodinâmica inicial

---

### ⚪ Bundle 6: Hipertensão Intracraniana (HIC) / Neuroemergência
- [ ] **Posicionamento e proteção de via aérea**: Cabeceira elevada a 30° em posição neutra / linha média (otimizar retorno venoso jugular); IOT precoce se ECG ≤ 8
- [ ] **Terapia osmótica de urgência adaptada ao SUS**:
  - *Opção 1:* **Manitol 20%**: 0,5 a 1,0 g/kg (2,5 a 5 mL/kg) IV em infusão rápida por 15 a 20 minutos
  - *Opção 2:* **Solução Salina Hipertônica 3%**: 250 a 500 mL IV em bolus rápido (ou NaCl 10% / 20% diluído)
- [ ] **Sedação e analgesia otimizadas**: Fentanil contínuo + Midazolam/Propofol para evitar assincronia e elevação de PIC por tosse ou agitação
- [ ] **Hiperventilação transitória de resgate**: Alvo de pCO₂ 30 a 35 mmHg exclusivamente como ponte de resgate em caso de herniação cerebral iminente
- [ ] **Prevenção de lesão secundária**: Alvo glicêmico 140–180 mg/dL, normotermia rigorosa (evitar febre com Dipirona 1g IV e resfriamento físico), PA controlada para garantir Pressão de Perfusão Cerebral (PPC) > 60–70 mmHg
- [ ] **Acionamento imediato da Neurocirurgia** e regulação de leito de UTI neurocrítica

---

## ⚡ SEÇÃO 2: PROTOCOLOS DO COCKPIT BEIRA-LEITO (TEXTO CORRIDO)
*O Cockpit Beira-Leito é a área de ação rápida com cálculo de doses automáticas e passos sequenciais. O usuário deve validar o fluxo sequencial:*

### 1. Crise Convulsiva / Estado de Mal Epiléptico (EME)
- **Minuto 0 a 5 (Fase Inicial):** ABCDE, oximetria, glicemia capilar imediata (corrigir se < 70 com Glicose 50% 40–60 mL IV).
- **Minuto 5 a 10 (Benzodiazepínico):**
  - **Diazepam 10 mg IV puro** (lento, 2–5 mg/min), podendo repetir 1 vez após 5 min se persistir; OU
  - **Midazolam 10 mg IM** se sem acesso venoso imediato.
- **Minuto 10 a 20 (Anticonvulsivante de 2ª Linha):**
  - **Fenitoína 20 mg/kg IV** diluída em SF 0,9% (máximo 50 mg/min, sob monitorização de ECG e PA pelo risco de arritmias/hipotensão).
- **Minuto 20 a 40 (Estado Refratário - 3ª Linha):**
  - Intubação orotraqueal e início de anestésico contínuo em BIC: **Midazolam** (0,2 mg/kg ataque seguido de 0,1–2 mg/kg/h) OU **Propofol** (1–2 mg/kg ataque seguido de 2–10 mg/kg/h) OU **Fenobarbital 20 mg/kg IV**.

### 2. Anafilaxia Grave
- **Adrenalina (Epinefrina) 1:1.000 (1 mg/mL) IM imediata na face anterolateral da coxa**:
  - Dose adulto: **0,5 mg IM** (repetir a cada 5–15 min se ausência de resposta).
- Decúbito dorsal horizontal com elevação de membros inferiores (evitar ortostase súbita que causa colapso cardiovascular por esvaziamento de VE).
- Expansão volêmica rápida com cristaloide (SF 0,9% ou RL 1.000–2.000 mL abertos).
- Oxigenoterapia sob máscara reservatório com alto fluxo.
- Terapias adjuvantes (após adrenalina): Prometazina 25–50 mg IM/IV lenta + Hidrocortisona 200–500 mg IV.

### 3. Taquiarritmias com Instabilidade Hemodinâmica
- Checar sinais de instabilidade: hipotensão/choque, dor torácica anginosa, dispneia/congestão pulmonar aguda, rebaixamento do nível de consciência.
- **Se instável:** **Cardioversão Elétrica Sincronizada (CVES)** imediata sob sedação rápida (Midazolam 2–5 mg ou Etomidato 0,15–0,3 mg/kg ou Fentanil 50 mcg):
  - QRS estreito e regular (ex: TPSV, Flutter): 50–100 J
  - QRS estreito e irregular (ex: FA): 120–200 J bifásico
  - QRS largo e monomórfico (ex: TV monomórfica com pulso): 100 J

### 4. Parada Cardiorrespiratória (PCR - Suporte Avançado / ACLS)
- RCP de alta qualidade (100–120 compressões/min, profundidade 5–6 cm, retorno completo do tórax, mínima interrupção).
- Ritmos chocáveis (FV / TVSP): Desfibrilação precoce (200 J bifásico) + Adrenalina 1 mg IV a cada 3–5 min após o 2º choque + Amiodarona 300 mg IV em bolus após o 3º choque (dose adicional de 150 mg após o 5º choque).
- Ritmos não chocáveis (AESP / Assistolia): Adrenalina 1 mg IV imediata a cada 3–5 min + Investigação e correção agressiva dos 5 Hs e 5 Ts.

---

## 🎨 SEÇÃO 3: IDENTIDADE VISUAL / SÍMBOLO DO LOGO
*Três opções visuais projetadas para aprovação:*

1. **Opção 1: Cruz Médica com Traçado Vetorial Integrado**
   - Cruz de proporção áurea com uma linha de pulso QRS contínua estilizada atravessando o centro horizontal em negativo / gradiente ciano-esmeralda.
   - *Estilo:* Moderno, corporativo de alto nível e limpo.
2. **Opção 2: Estrela da Vida Minimalista com Pulso**
   - Silhueta geométrica de 6 pontas com linhas fluidas e traçado de pulso no eixo horizontal.
   - *Estilo:* Universalmente reconhecido em emergências médicas, com desenho contemporâneo sem excesso de detalhes.
3. **Opção 3: Escudo Clínico Pro**
   - Escudo protetor com contorno fino abrigando uma onda QRS e nódulo de árvore de decisão clínica.
   - *Estilo:* Transmite rigor, confiabilidade, retaguarda médica e proteção jurídica.

---

## 📋 SEÇÃO 4: AÇÕES PENDENTES PARA VALIDAÇÃO DO USUÁRIO

Por favor, revise os itens abaixo e sinalize como deseja proceder:

- [ ] **Validação 1: Aprovação dos 6 Bundles SUS**: Você concorda com as posologias e drogas da Seção 1 (AAS + Clopidogrel, Enoxaparina, Nitroprussiato, etc.)? Deseja alterar ou acrescentar alguma droga específica?
- [ ] **Validação 2: Aprovação dos Protocolos do Cockpit Beira-Leito**: O fluxo de ações sequenciais de Convulsão, Anafilaxia, Taquiarritmias e PCR na Seção 2 atende à sua prática de emergência?
- [ ] **Validação 3: Escolha do Símbolo / Logo**: Qual das 3 opções da Seção 3 prefere que seja integrada ao header, favicon e tela de carregamento (Opção 1 - Cruz QRS, Opção 2 - Estrela da Vida, Opção 3 - Escudo Clínico)?
- [ ] **Validação 4: Descritores de Alarme na Cefaleia**: Na Cefaleia, atualmente aparecem 7 descritores de alarme na abertura. Podemos condensar em 3 eixos essenciais (1. Súbita/Thunderclap < 1 min; 2. Febre + Sinais Meníngeos; 3. Déficit Focal / Rebaixamento / Edema de Papila)?
