# Estrutura e Diretrizes da Landing Page — Emergência Pro

Planejamento técnico e visual aprovado para a criação do arquivo `landing.html`.

---

## 1. Posicionamento e Diretrizes Centrais

* **Público:** Médicos plantonistas, emergencistas e residentes que atuam em pronto-socorro e sala vermelha.
* **Proposta Central (Sem "copiloto clínico"):**
  * O Emergência Pro é um **fluxograma estruturado e clicável**, rápido e objetivo.
  * Depende integralmente da **expertise e julgamento clínico do médico** que o aplica.
  * Foco em **ganho de tempo real à beira do leito** para examinar o paciente.
  * **Construção rápida e segura da história e conduta**, filtrando o ruído e sem deixar passar sinais vitais ou alarmes essenciais.
  * Respaldado nas **diretrizes mais recentes** (AHA 2026, ESC, Surviving Sepsis Campaign, etc.).

---

## 2. Identidade Visual e Estilo Gráfico ("Arte da Ressuscitação")

* **Conceito:** *Tactical Emergency & High-Contrast Dark Theme*.
* **Background:** Preto e carvão profundo (`#0d1117` / `#161b22`).
* **Paleta de Destaques:**
  * **Verde Elétrico / Menta Neônio:** `#10b981` / `#34d399` (vitalidade, pulso, monitor).
  * **Laranja Âmbar Queimado:** `#f97316` / `#fb923c` (alerta de gravidade, contraste, urgência).
  * **Toques Carmesim:** `#ef4444` (alarmes críticos e identificação do Emergência Pro).
* **Tipografia:**
  * Títulos: Estilo condensado/pesado, display marcante (`Cabinet Grotesk` / `Outfit` / `system-ui` bold).
  * Rótulos e Dados Clínicos: `SFMono-Regular`, `Courier New`, monoespaçada para parâmetros vitais e doses.
* **Elementos Ilustrativos:**
  * Stickers/ícones estilizados de sala de emergência (traçado de monitor multiparamétrico, laringoscópio, desfibrilador, máscara/ambu, cérebro com circulação).
  * Cards com bordas finas luminosas e efeito de relevo tático.

---

## 3. Arquitetura das Seções (na ordem definida)

### Seção 1: Topbar & Cadastro Imediato
* Logotipo oficial do Emergência Pro.
* Tag de status: `Diretrizes 2025/2026 · Sala Vermelha`.
* Botão primário direto de ação: `[Criar Conta de Profissional]` e `[Acessar Plantão]`.

### Seção 2: Hero Section Arrojada
* Título de alto impacto:
  > **ARTE DA RESSUSCITAÇÃO.**
  > *Menos tempo na burocracia do teclado. Mais tempo avaliando o doente grave.*
* Subtítulo direto:
  > *Fluxograma clínico estruturado para documentação ágil em sala de emergência. Informações vitais objetivas, condutas baseadas em diretrizes e relatórios prontos em segundos — construídos pela sua decisão médica.*
* Formulário / Botão de Cadastro em 1 clique: Campo rápido de e-mail e botão `[Cadastrar Profissional]`.
* Mockup dinâmico no estilo monitor: card interativo mostrando a velocidade da montagem da história.

### Seção 3: Rapidez na Construção da História Clínica
* Demonstração prática do método:
  * Como a anamnese estruturada (Início ➔ Qualidade ➔ Modificadores ➔ Alarmes) substitui a digitação manual de parágrafos confusos.
  * O que entra no relatório é apenas o que importa: texto limpo, técnico e médico-legalmente impecável para o prontuário.

### Seção 4: Fluxo Clínico Guiado (Passo 0 ao Passo 6)
* Visualização sequencial e sem ruído:
  * **Passo 0 & 1:** Idade no tambor, queixa principal e estratificação de alarmes.
  * **Passo 2 & 3:** Monitorização, ECG, POCUS e exame físico crítico (ABCDE, Glasgow, NIHSS).
  * **Passo 4 & 5:** Síndromes e checklists de conduta (Suporte, Sintomáticos, Investigação, Específica, Disposição).
  * **Passo 6:** Relatório completo ou resumo de 5 linhas pronto para copiar para o PEP.

### Seção 5: Painel de Síndromes Críticas
* Cards de alto contraste das principais síndromes com suas diretrizes:
  * *Dor Torácica:* SCA, TEP AHA 2026, Dissecção.
  * *Dispneia:* EAP, Asma/DPOC, Pneumonia.
  * *Neurovascular:* AVC TNK, HSA, Síncope ESC 2024, Convulsão AES.
  * *Sepse & Choque:* Bundle da 1ª hora SSC, metas de lactato.
  * *Abdome Agudo:* HDA/HDB, IHA, Abdome perfurativo.
  * *Toxicologia & Arritmias:* Antídotos rápidos e ACLS 2025.

### Seção 6: Módulo de Gestão do Plantão
* O controle da sala de emergência além da admissão individual:
  * Lista dinâmica de pacientes admitidos.
  * Cronômetro de reavaliações com alertas de atraso.
  * Acompanhamento de pendências (exames, pareceres cirúrgicos, vagas).
  * Exportação de censo e relatório consolidado do plantão em PDF.

### Seção 7: Segurança Médica & LGPD
* Cifragem PHI nos relatórios.
* Acesso restrito com Row-Level Security (RLS).
* Bloqueio por inatividade de 15 minutos para proteção de dados do paciente.
* Validação de perfil médico.

### Seção 8: Rodapé e Chamada Final
* Acesso direto à aplicação e atalhos de navegação.
