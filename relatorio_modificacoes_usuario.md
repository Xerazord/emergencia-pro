# Relatório de Modificações e Avaliação de Eficiência de Input

Este relatório documenta detalhadamente as solicitações realizadas pelo usuário, o racional clínico aplicado, a implementação técnica realizada no código-fonte ([`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html)) e a validação dos resultados obtidos no **Emergency Text**.

---

## 1. Quadro Comparativo: Solicitação do Usuário vs. Implementação

| # | Solicitação do Usuário | Racional Clínico / Operacional | Implementação Técnica no Código | Status |
|---|------------------------|--------------------------------|---------------------------------|:------:|
| **1** | Substituir **LKN** por **UVVB (Última Vez Visto Bem)** em déficit neurológico agudo | Adequação terminológica aos protocolos brasileiros de AVC (SBDCV / Protocolos Nacionais de Urgência) | Variáveis e textos atualizados de `LKN` para `UVVB` na UI, no estado de anamnese `neuQx`, nas opções de janela terapêutica e na composição de texto no prontuário (`neuHda()`). | **Concluído** |
| **2** | Inserir anamnese ginecológica direcionada para dor abdominal **apenas se paciente mulher** | Investigação obrigatória de gravidez ectópica, DIP, cisto ovariano roto ou torção anexial em idade fértil, sem poluir a interface quando o paciente for masculino. | Campo condicional `hidden: (S) => S.sexo !== 'F'` no bloco ginecológico de `abdQx`. Avaliação de DUM, atraso menstrual, sangramento vaginal anormal e beta-hCG. | **Concluído** |
| **3** | Incluir 2 escores para **Síncope** (Calgary e Canadian) em quadro adjacente clicável (como HEART e EDACS) | Estratificação validada para diferenciar síncope reflexa de alto risco cardiogênico ou arritmogênico em 30 dias. | Implementados `calcCalgaryScore()`, `calcCanadianScore()`, renderizadores interativos recolhíveis `#sc_calgary` e `#sc_canadian`, e exportação para o prontuário via `buildScoresSinc()`. | **Concluído** |
| **4** | **Unificação Global do Passo 4**: condutas de subssíndromes/diferenciais agregadas aos blocos da síndrome-mãe | Eliminar fragmentação de condutas (evitando que o médico veja múltiplos blocos de "Terapia Específica" espalhados na tela). | Criado `rUnifiedConductsBoard()` que agrupa todas as condutas ativas (mãe + diferencial) nas 5 seções padrão (`Suporte`, `Terapia Específica`, `Sintomáticos`, `Investigação`, `Disposição`) com badges de identificação (ex: `[SCA — OCA]`, `[TEP]`). | **Concluído** |
| **5** | Alertas de conflito terapêutico exibidos **apenas na coluna esquerda (UI)** e **removidos do texto final do prontuário** | O prontuário médico deve conter ordens médicas e registros clínicos objetivos. Avisos de segurança do sistema servem de apoio à decisão imediata do médico, não para o registro legal final. | Removida a injeção de alertas no gerador de texto `buildCondutas()`. Alertas permanecem em destaque visual âmbar/vermelho na coluna esquerda (`renderConflictAlertsHtml()`). | **Concluído** |
| **6** | Diagnóstico e expansão da história clínica para queixas vagas / não discriminadas | Prover semiologia estruturada em dor torácica, dor abdominal, déficit focal, RNC e intoxicações, permitindo anamnese rápida e rica em detalhes essenciais. | Adicionados componentes modulares: `dtHda()` (dor torácica aprofundada com irradiações anatômicas e alívio com prece maometana/nitrato), `neuQx` (AVC), `abdQx` (dor abdominal com migração de Kocher e sinais de peritonismo), `rncQx` (coma/RNC) e `intQx` (toxidromes). | **Concluído** |

---

## 2. Detalhamento das Modificações por Módulo

### 2.1. Déficit Neurológico Agudo: Transição LKN ➔ UVVB
- **Localização:** [`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html) linhas 2049–2180 (`neuQx` e `neuHda`).
- **Campos Disponíveis:**
  - Horário exato de UVVB (com seletor numérico de horas e checkbox de horário exato/testemunhado vs. aproximado/ao acordar).
  - Janela Terapêutica categorizada: `< 4,5h` (candidato à trombólise IV), `4,5–24h` (janela estendida para trombectomia mecânica segundo DAWN/DEFUSE-3), `> 24h` (fora de janela aguda).
  - Lateralidade e Dimídio acometido com correspondência cortical hemisférica.
  - Padrão motor: proporcional (facio-braquio-crural) vs. desproporcional.
  - Alterações de pares cranianos, fala e linguagem (afasia de Broca, Wernicke, disartria, negligência).
  - Investigação de Mimics de AVC e uso prévio de anticoagulantes orais/heparinas.
- **Exemplo de saída no prontuário:**
  ```text
  HDA: Paciente admitido(a) via Demanda Espontânea, com queixa de Déficit neurológico agudo,
  com UVVB (última vez visto bem) há 2 horas (horário de uvvb exato e testemunhado);
  classificado em janela < 4,5h (candidato à trombólise iv); déficit em dimídio direito
  (hemisfério e); apresentando hemiparesia proporcional (f=b=p); alterações de pares/linguagem:
  afasia motora (broca / expressão).
  ```

---

### 2.2. Dor Abdominal: Anamnese Ginecológica Direcionada Condicional
- **Localização:** [`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html) linhas 2182–2280 (`abdQx` e `abdHda`).
- **Regra de Renderização:** O bloco de anamnese ginecológica possui a guarda `hidden: (S) => S.sexo !== 'F'`. Se o sexo selecionado na admissão for Masculino (`'M'`) ou não for feminino, o accordion ginecológico não aparece, mantendo o formulário ágil e limpo.
- **Campos Ginecológicos (para `S.sexo === 'F'`):**
  - Data da Última Menstruação (DUM) com dias aproximados.
  - Presença de atraso menstrual.
  - Sangramento vaginal anormal ou metrorragia associada.
  - Dor com irradiação para região anorretal ou ombro (sinal de Kehr - irritação diafragmática por hemoperitônio).
  - Teste rápido de gravidez (Beta-hCG na sala de emergência).
- **Semiologia Cirúrgica Inclusa:**
  - Migração de dor: sinal clássico de Kocher (epigástrio/periumbilical ➔ FID).
  - Fatores de piora peritonial: piora à tosse, desaceleração do carro, deambulação.
- **Exemplo de saída no prontuário:**
  ```text
  HDA: Paciente admitido(a) via Demanda Espontânea, com queixa de Dor abdominal,
  de início súbito em facada / catastrófico (perfurativo / vascular); localizada em fossa
  ilíaca direita (fid), migrou de epigástrio/periumbilical para fid (sinal de kocher - apendicite);
  com fatores modificadores: piora à tosse e deambulação (peritonismo parietal);
  sinais de alarme/associados: febre com calafrios trepidantes (bacteremia);
  em anamnese ginecológica direcionada (DUM: há 35 dias): atraso menstrual relatado.
  ```

---

### 2.3. Síncope: Integração dos Escores de Calgary e Canadian
- **Localização:** [`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html) linhas 6160–6340 (`calcCalgaryScore`, `calcCanadianScore`, `sincAfter`).
- **Interface:** Posicionados logo abaixo dos botões de subssíndromes de síncope em cards recolhidos por padrão (`collapsed`), idênticos aos escores HEART e EDACS na dor torácica.
- **Calgary Syncope Score:**
  - Avalia pródromos autonômicos, histórico de cardiopatia estrutural, ECG e palpitações prévias.
  - Ponto de corte: Pontuação $\ge -2$ indica síncope vasovagal/reflexa (sensibilidade/especificidade $> 90\%$); Pontuação $< -2$ alerta para alto risco de síncope cardiogênica.
- **Canadian Syncope Risk Score:**
  - Avalia predisposição clínica, valores de PA na triagem, suspeita clínica inicial em emergência, ECG (bloqueios, desvios de eixo, QTc alargado) e marcadores (troponina).
  - Classificação direta de risco em 30 dias (Muito Baixo, Baixo, Médio, Alto, Muito Alto).
- **Exemplo de saída no prontuário:**
  ```text
  SCORES PREDITIVOS (SÍNCOPE)
  Score Calgary: -4 pts — Escore < −2: Alto risco cardiogênico — indicação de investigação arritmogênica/estrutural
  Canadian Syncope Risk Score: 5 pts — Médio risco (~ 9% a 13% risco em 30d)
  ```

---

### 2.4. Unificação Global das Condutas (Passo 4 - `rUnifiedConductsBoard`)
- **Problema anterior:** A seleção de uma síndrome-mãe gerava um painel de condutas e a seleção de um diferencial abria um segundo ou terceiro painel idêntico abaixo, repetindo títulos como "Terapia Específica" e gerando redundância visual.
- **Solução implementada:**
  - O componente `rUnifiedConductsBoard(S, currentSyn, activeSub)` consolida **todas as condutas** sob as 5 categorias canônicas:
    1. 🛡️ **Suporte & Monitorização** (`sup`)
    2. 🎯 **Terapia Específica** (`esp`)
    3. 💊 **Manejo Sintomático & Clínico** (`sin`)
    4. 🔬 **Investigação Complementar** (`inv`)
    5. 🚪 **Disposição & Encaminhamento** (`dsp`)
  - Itens originados da síndrome-mãe recebem visual padrão.
  - Itens incorporados a partir de um diferencial ou subssíndrome recebem uma tag clara de rastreabilidade (ex: `badge badge-purple: [SCA — OCA]` ou `badge badge-blue: [TEP]`).
  - As chaves de estado de seleção (`S.chk[key]`) preservam estrita compatibilidade com o checklist de prescrição rápida e a tela de pendências de exames.

---

### 2.5. Alertas de Segurança: Exclusão do Prontuário Escrito
- **Problema anterior:** Alertas de conflito (ex: *Atenção: Suspeita de Dissecção Aórtica - AAS/Heparina contraindicados antes de angio-TC*) eram impressos no texto gerado do relatório.
- **Solução implementada:**
  - Os alertas são diretrizes operacionais do sistema para o médico assistente.
  - O gerador de texto final (`buildCondutas`) foi limpo de qualquer string de conflito.
  - A exibição interativa na tela de trabalho (`renderConflictAlertsHtml(S)`) foi mantida e reforçada na **coluna da esquerda**, garantindo que o médico seja alertado em tempo real sem poluir a documentação medicolegal.

---

## 3. Validação e Testes Automatizados

O sistema foi submetido a uma bateria rigorosa de testes no ambiente Node.js simulando o DOM e as variáveis de sessão:

1. **`verify_all_user_requests.js`:**
   - Validação da ausência total de "LKN" e presença ativa de "UVVB".
   - Validação da ocultação de anamnese ginecológica em pacientes masculinos (`S.sexo = 'M'`) e exibição em femininos (`S.sexo = 'F'`).
   - Cálculo e renderização do Calgary Syncope Score e Canadian Syncope Risk Score.
   - Verificação de ausência de alertas de conflito no texto de saída do prontuário médico.
   - **Resultado:** **100% de sucesso (Aprovado).**

2. **`verify_conflicts_and_moments.js`:**
   - Detecção de conflitos conhecidos (Dissecção Aguda de Aorta vs. SCA OCA).
   - Bloqueio de duplicidades farmacológicas.
   - **Resultado:** **Aprovado.**

3. **`test_dtx_interactive.js`:**
   - Teste de fluxo completo com preenchimento simultâneo de sinais vitais, queixas clínicas e unificação de prescrições.
   - **Resultado:** **Aprovado.**

---

## 4. Conclusão

As alterações atenderam integralmente a todas as diretrizes solicitadas:
- Maior rigor terminológico nacional (UVVB).
- Relevância e foco na anamnese ginecológica orientada por sexo biológico.
- Adição de ferramentas consagradas de decisão clínica para síncope (Calgary e Canadian).
- Visual limpo e não redundante na prescrição e conduta (board unificado com badges).
- Prontuário médico conciso, limpo e livre de avisos de sistema.
