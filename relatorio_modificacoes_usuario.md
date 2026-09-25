# Relatório de Modificações e Avaliação de Eficiência de Input

Este relatório documenta detalhadamente as solicitações realizadas pelo usuário, o racional clínico aplicado, a implementação técnica realizada no código-fonte ([`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html) e [`app.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/app.html)) e a validação dos resultados obtidos no **Emergency Text**.

---

## 1. Quadro Comparativo: Solicitação do Usuário vs. Implementação

| # | Solicitação do Usuário | Racional Clínico / Operacional | Implementação Técnica no Código | Status |
|---|------------------------|--------------------------------|---------------------------------|:------:|
| **1** | Substituir **LKN** por **UVVB (Última Vez Visto Bem)** e eliminar duplicidades textuais | Adequação terminológica aos protocolos brasileiros de AVC e remoção da redundância *"com UVVB (última vez visto bem) (uvvb indeterminada...)"*. | Variáveis atualizadas; `neuHda()` gera frases concisas: `"com UVVB indeterminada (sem testemunhas do ictus)"` ou `"com UVVB testemunhada há..."`. | **Concluído** |
| **2** | Substituir `"mimics/risco"` por terminologia médica formal | Linguagem técnica mais precisa para comunicação interprofissional e documentação em prontuário. | Substituído por `"fatores sugestivos de diagnósticos diferenciais"` na UI e no texto gerado da HDA. | **Concluído** |
| **3** | Rigor semiológico estrito: afastar construções errôneas como "dispneia de padrão pleurítico" | Padrão pleurítico caracteriza dor torácica que piora com ventilação/tosse, e não padrão intrínseco de dispneia. | Padrões de dispneia calibrados para parâmetros posturais/esforço (*Ortopneia, DPN, Repouso, Esforços*). Dor pleurítica mantida estritamente como *sintoma torácico associado* (`"associada a dor torácica de caráter pleurítico..."`). | **Concluído** |
| **4** | Antecedente `"Neo"` transcrito como `"Neoplasia"` por extenso | Evitar abreviações ambíguas no registro oficial do prontuário médico. | Mapeamento em `buildAntecedentes()` e no seletor de HPP (`HPP: Neoplasia`). | **Concluído** |
| **5** | Condutas pré-formatadas de diferenciais (ex: RNC em AVC) incluídas no texto do prontuário com tag | O médico precisa documentar as ordens ativas para diferenciais sem perda de dados na prescrição final. | Em `buildCondutas()`, liberada a coleta irrestrita de todas as seções de `subAdd`, incluindo os itens marcados com a tag correspondente (ex: `[RNC]`). | **Concluído** |
| **6** | Revisão crítica de IOT em Não-Trauma: afastar a indicação mecânica isolada de Glasgow $\le 8$ | No coma clínico/metabólico e intoxicações não traumáticas, GCS isolado não é indicação obrigatória de intubação profilática. | Redação atualizada em `rnc.sup`, `int.sup`, `avc_hem.sup` e exame físico: *"Vigilância de proteção e patência de VA para necessidade de IOT se RNC associada a HIC OU disfagia intensa OU insuficiência respiratória"*. | **Concluído** |
| **7** | Desduplicação de TC de crânio na síndrome neurovascular | Eliminar a dupla solicitação do mesmo exame de imagem na admissão. | Removida a ordem duplicada do bloco de Suporte Inicial (`neu.sup`), mantendo-a de forma única e prioritária em Investigação Diagnóstica (`neu.inv`). | **Concluído** |
| **8** | Desacoplar parâmetros clínicos (como clareamento de lactato) de metas cegas de prescrição | O lactato é marcador dinâmico de perfusão tecidual, não uma meta que justifique por si sobrecarga hídrica ou vasopressor. | Reformulado em `cho.inv` como coleta seriada e nota interpretativa de microcirculação. | **Concluído** |
| **9** | Enquadramento harmônico do layout da página inicial no computador | Corrigir proporções e distorções visuais do ícone/logo e botões na tela inicial para desktop. | Logotipo substituído por asset de alta resolução (`logo-96.png`, 38x38px), alinhamento harmonizado com `btn-ghost` e `btn-primary`. | **Concluído** |
| **10** | Substituição de nomes textuais de dispositivos por renderização visual direta no navegador | Transmitir a sensação real dos equipamentos de sala vermelha presentes. | Criada a **Barra de Equipamentos Táticos** com 5 dispositivos estilizados em SVG/CSS (Monitor ECG dinâmico, Laringoscópio óptico, Desfibrilador bifásico 200J, Reanimador AMBU com PEEP e Perfusão Encefálica). | **Concluído** |

---

## 2. Detalhamento Técnico das Modificações

### 2.1. Landing Page e Dispositivos Renderizados ([`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html))
- **Logo e Header:** A imagem de 32px foi substituída pelo asset cristalino `logo-96.png` com proporção de 38x38px, bordas arredondadas e sombra de néon controlada, alinhando-se perfeitamente com a tipografia do cabeçalho.
- **Hardware Bar de Sala de Emergência:** Os 5 stickers com nomes textuais foram substituídos pela grade `.tactical-hardware-grid`:
  1. *Monitor Multiparamétrico:* Exibe traçado SVG de onda eletrocardiográfica com marcadores digitais em tempo real (`FC 124 bpm`, `SpO₂ 91%`, `PA 85/50 mmHg`) e indicador pulsante de sinal vital ativo.
  2. *Vídeo-Laringoscópio Óptico:* Silhueta vetorial de lâmina óptica com feixe de luz LED e status de patência de via aérea.
  3. *Desfibrilador Bifásico:* Marcador em destaque de 200J Biphasic com indicador de prontidão de carga.
  4. *Reanimador AMBU com Válvula PEEP:* Vetor com bolsa de silicone e manômetro com alvo de PEEP a 8 cmH₂O.
  5. *Circulação Encefálica / Doppler:* Monitor de perfusão com alvo de PPC > 60 mmHg e PAM > 80 mmHg.

---

### 2.2. Rigor Semiológico e Conectivos ([`app.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/app.html))
- **Déficit Neurológico Agudo:**
  ```text
  HDA: Paciente admitido(a) via Demanda Espontânea, com queixa de Déficit neurológico agudo,
  com UVVB indeterminada (sem testemunhas do ictus); classificado em janela > 24h ou fora de janela;
  déficit em dimídio direito (hemisfério e); apresentando hemiparesia proporcional (f=b=p);
  alterações de pares cranianos/linguagem: disartria pura; fatores sugestivos de diferenciais:
  glicemia capilar normal no ictus (descarta hipoglicemia); anticoagulação/contraindicações: varfarina / marevan em uso.
  ```
- **Dispneia com Sintoma Torácico Associado:**
  ```text
  HDA: Paciente admitido(a) via Demanda Espontânea, com queixa de Dispneia, de início súbito,
  em repouso, com ortopneia, com piora ao decúbito, associada a dor torácica de caráter
  pleurítico (ventilatório-dependente), hemoptise, em contexto de tvp/tep prévio.
  ```
- **Antecedentes Pessoais (HPP):**
  - Mapeamento formal: `'Neo' ➔ 'Neoplasia'`.
  - Saída: `ANTECEDENTES\nHPP: HAS, DM2, Neoplasia | MUC: Nega | Alergias: Nega`.

---

### 2.3. Prescrição e Condutas de Diferenciais ([`app.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/app.html))
- **Inclusão com Tag do Diferencial:** Ao selecionar o diagnóstico diferencial (ex: RNC sob suspeita de AVC), as condutas checadas são capturadas e prefixadas com sua tag de rastreabilidade:
  ```text
  CONDUTA E PRESCRIÇÃO MÉDICA DE ADMISSÃO
  Hipótese: Síndrome neurovascular (AVC / AIT) (AVC Isquêmico Agudo (AVCi))
  Diferenciais considerados: Rebaixamento de consciência associado

  1. CUIDADOS GERAIS, RESSUSCITAÇÃO & TERAPIA ESPECÍFICA:
     - Ativação imediata do Código AVC e determinação estrita da UVVB (Última Vez Visto Bem)
     - [RNC] Vigilância de proteção e patência de VA para necessidade de IOT se RNC associada a HIC OU disfagia intensa OU insuficiência respiratória (GCS isolado não indica intubação mandatória em coma não-traumático)

  2. EXAMES SOLICITADOS (INVESTIGAÇÃO):
     - TC de crânio sem contraste imediata: excluir sangramento intracraniano e avaliar precocemente o escore ASPECTS
  ```
- **Desduplicação de TC de Crânio:** A duplicidade que existia entre `neu.sup` e `neu.inv` foi zerada. A ordem de suporte foi transformada em acionamento operacional da equipe de neuroimagem, mantendo uma única solicitação de exame em `inv`.
- **Manejo da Via Aérea:** Eliminação da conduta de IOT cega por Glasgow $\le 8$ em etiologias não-traumáticas, privilegiando a avaliação fisiológica de proteção, patência, insuficiência respiratória ou hipertensão intracraniana.

---

## 3. Validação Automatizada

O arquivo de teste `scratch/verify_all_new_requests.js` foi executado no ambiente de sandbox Node.js, cobrindo:
1. Validação visual e estrutural de [`index.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/index.html).
2. Validação sintática e de conectivos de [`app.html`](file:///Users/mateustcandido/Desktop/Emergency%20Text/app.html).
3. Teste de geração textual de UVVB e exclusão da duplicidade.
4. Teste de semiologia estrita em Dispneia e dor pleurítica associada.
5. Teste de substituição de antecedentes (`Neo` ➔ `Neoplasia`).
6. Teste de inclusão de condutas pré-formatadas de diferenciais (`[RNC]`).
7. Teste de ausência de duplicidade de TC de crânio em AVC.
8. Teste de lactato como parâmetro clínico de perfusão.

**Resultado:** **100% de sucesso (8/8 testes aprovados).**
