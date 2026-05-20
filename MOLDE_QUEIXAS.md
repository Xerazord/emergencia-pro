# Molde de Queixa — Emergência Pro

Este documento define o formato textual que você (usuário) preenche para que eu (Claude) implemente uma queixa nova ou reforme uma existente no `index.html`. O exemplo abaixo é **Dor torácica** como está hoje no app (sirva de referência); ao final há um molde em branco para copiar.

A sigla curta (ex.: `dt`, `dsp`, `cef`) será usada como chave no estado `S.<sigla>` e como prefixo dos seus helpers (`<sigla>Hda`, `<sigla>Hpp`, `<sigla>Badge`, `<sigla>EFText`). Reuso de constantes (ex.: `NEURO_PUPILAS`, `SIN_GERAIS`) entre queixas vai ser anotado por mim no plano de implementação.

---

## EXEMPLO PREENCHIDO — Dor torácica (sigla `dt`)

### 1. Queixa principal e seus discriminadores

> Bloco a bloco — cada item vira um accordion separado. `radio` = escolha única; `tags` = multi-seleção.

- **Início** (`radio`): Súbito; Progressivo
- **Qualidade** (`tags`): Opressiva; Pleurítica; Em facada; Queimação; Em aperto; Difusa
- **Irradiação** (`tags`): MMSS esquerdo; MMSS direito; Bilateral; Cervical/mandibular; Dorso/interescapular; Abdominal
- **Fatores modificadores** (`tags`): Piora ao esforço; Melhora com repouso; Piora ao decúbito; Piora com inspiração; Piora com movimento; Melhora com nitrato
- **Semelhante a evento prévio?** (`radio`): Sim; Não; Sem evento prévio
- **Pior à palpação?** (`radio`): Sim; Não
- **Sintomas associados** (`tags`): Dispneia; Sudorese; Náuseas/Vômitos; Pré-síncope; Palpitações; Cefaleia; Parestesia MMSS; Parestesia perioral; Parestesia MMII; Febre; Tosse; Hemoptise

Campos extras pós-anamnese (no `after`):
- **Tempo de início** — input livre
- **Score HEAR** (4 itens: H, E, R, T + idade auto) — accordion clicável com soma 0–10
- **Score EDACS** — accordion clicável

Antecedentes pertinentes que vão direto para HPP (lista checkbox no passo 4 ou puxados de blocos): _DT não tem antecedentes próprios; usa HPP geral._

### 2. Exame físico

#### 2a. Crítico (ABCDE) — pertinente à queixa

> Aparece **dentro** do passo 3 quando `S.ef === 'crit'`, abaixo do ABCDE base.

- _DT não tem EF crítico próprio hoje._ O ABCDE genérico cobre. (Sugestão minha: adicionar avaliação focada — sopros novos, atrito pericárdico, JVP, pulsos assimétricos, sinal de Hamman, dor à palpação reproduzível.)

#### 2b. Ambulatorial — pertinente à queixa

> Aparece quando `S.ef === 'amb'`. Hoje usa o padrão genérico (Geral / Cardio / Resp / Abdome / Neuro / Pele).

- _DT não acrescenta blocos próprios em ambulatorial._

### 3. Condutas pertinentes (síndromes no passo 5)

A partir da queixa, o usuário escolhe síndromes (`SLIST`). Para DT, as síndromes candidatas no `CT.dtx`:

**Probabilidade global (subExcl — escolha única):**
- Provavelmente cardíaca
- Provavelmente não cardíaca
- Definitivamente não cardíaca

**Diferenciais a marcar (subAdd — multi):**
- Dissecção de aorta → `CT.diss`
- TEP → `CT.tep`
- Pneumotórax → `CT.pntx`
- Síndrome esofágica aguda → `CT.esof`
- Pericardite → `CT.peri`
- Pneumonia → `CT.pnm`
- Dispepsia → `CT.disp`
- Ansiedade → `CT.ansi`
- Dor torácica inespecífica → `CT.inesp`

**Condutas no `CT.dtx` (estrutura `{id, t, it[]}` por seção):**

- **Monitorização e acesso**
  - Monitorização cardíaca contínua (ECG, SatO2, PA) — síndrome torácica sem diagnóstico exige vigilância de arritmias
  - ECG 12 derivações em < 10 min; repetir em 30 min se sem alterações e dor persistente
  - Acesso venoso periférico ≥ 18G
  - O2 somente se SatO2 < 90% — uso rotineiro sem hipoxemia sem benefício

- **Analgesia e farmacológico inicial**
  - Dipirona 1g IV; morfina reservada para dor intensa refratária
  - Nitrato SL (isossorbida 5 mg) se PAS > 90 mmHg e sem PDE-5 em 24–48h
  - Evitar AINEs em suspeita coronariana

- **Investigação inicial**
  - Troponina hs basal + 1h (protocolo 0/1h ESC 2020)
  - Hemograma, função renal, eletrólitos, glicemia
  - RX tórax PA — excluir pneumotórax, dissecção, congestão
  - D-dímero se Wells ≥ 2 ou ADD-RS
  - POCUS: função VE, derrame pericárdico, sobrecarga VD

- **Estratificação e disposição**
  - HEART ≤ 3 + EDACS < 16 + delta hs-Tn < 3 ng/L → alta + retorno < 72h
  - HEART 4–6 → observação 3–6h + reteste troponina
  - HEART ≥ 7 ou hs-Tn dinâmica → internação + estratégia invasiva < 72h
  - SCA confirmada → migrar para `CT.sca` (subtipos OCA/NOCA)

> **Para refatorar essa síndrome:** liste as condutas no novo formato (seção / item / referência bibliográfica entre parênteses).

### 4. Alertas visuais (condições que disparam um alerta amarelo)

> Cada alerta tem **condição lógica** + **texto** + **onde aparece** (após anamnese; topo do passo 3; topo do passo 6; etc.).

| # | Condição | Texto | Onde |
|---|---|---|---|
| A1 | `sin` inclui Parestesia perioral OU MMSS, E início Súbito | "Considerar etiologia neurológica ou hiperventilação" | após anamnese DT (`dtAfter`) |
| A2 | `irr` inclui Dorso/interescapular | "Irradiação para dorso — excluir dissecção aórtica" | após anamnese DT (`dtAfter`) |

> Sem badge numérico de gravidade hoje. (Sugestão minha: adicionar contagem "DT com N sinais de alarme" — perfil semelhante ao da Cefaleia.)

---

## MOLDE EM BRANCO — copie e preencha

```
## QUEIXA — <nome legível> (sigla `<sigla curta>`)

### 1. Queixa principal e seus discriminadores
- <Rótulo do bloco> (radio|tags): opção1; opção2; opção3; ...
- <Rótulo do bloco> (radio|tags): ...
- ...

Campos extras (pós-anamnese):
- <Nome do campo extra — input livre, score, texto curto>

Antecedentes que vão para HPP (não para HDA):
- <Lista de antecedentes específicos da queixa, marcados pelo usuário>

### 2. Exame físico
#### 2a. Crítico (ABCDE) — blocos próprios da queixa
- <Bloco> (radio|tags): opção1; opção2; ...
- ...
#### 2b. Ambulatorial — blocos próprios da queixa
- <Bloco> (radio|tags): opção1; opção2; ...
- (deixar vazio se reusar padrão genérico)

### 3. Condutas pertinentes (síndromes)
**subExcl (escolha única — probabilidade ou subtipo principal):**
- <id> — <rótulo>
- ...

**subAdd (multi — diferenciais a investigar):**
- <id> — <rótulo> → `CT.<chave>`
- ...

**Conduta global da queixa (CT.<chave-pai>), em seções:**
- **<Seção>** (ex.: Monitorização e acesso)
  - Item 1 (referência guideline)
  - Item 2 (...)
- **<Seção>**
  - Item ...
- ...

### 4. Alertas visuais
| # | Condição lógica | Texto a mostrar | Onde aparece |
|---|---|---|---|
| A1 | ex.: `sin` inclui X E `ini==='Súbito'` | "..." | após anamnese / topo passo 3 / etc. |
| A2 | ... | ... | ... |

(Badge de gravidade? sim/não — se sim, descreva critério: N sinais de alarme, score X em faixa Y, etc.)
```

---

## Notas operacionais

- **Bibliografia entre parênteses** em toda conduta: `(ESC 2020, I-A)`, `(GOLD 2024)`, `(IDSA/ATS 2019)`, `(SSC 2021)`, etc. — Claude não inventa: se não tiver, eu pergunto antes de implementar.
- **Doses** sempre com via, frequência e ajuste em populações especiais.
- Quando seu texto da queixa tiver ambiguidade (dois sinônimos para a mesma opção, ordem incerta de blocos, condição de alerta dúbia), eu pergunto antes de codar.
- Quando duas queixas compartilham o mesmo bloco (ex.: mini-neuro, sintomas gerais), eu extraio em constante reutilizável e te aviso.
