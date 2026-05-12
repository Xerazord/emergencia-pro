# Emergência Pro — guia técnico

App single-file (`index.html`) para admissão e conduta em sala de emergência. JavaScript embutido. Deploy automático no GitHub Pages a cada push em `main`. Auth via Supabase (email/senha) com Row-Level Security; cada usuário só vê seus próprios relatórios.

## Onde as coisas vivem (em `index.html`)

| Seção | Linhas aproximadas | Conteúdo |
|---|---|---|
| `<style>` | 9–158 | CSS único — `.card`, `.tag`, `.ro`, `.xbtn`, `.chk`, `.grav-badge`, etc. |
| Auth (Supabase) | 192–235 | `initAuth`, `doLogin`, `doLogout`, RLS policies em `supabase_setup.sql` |
| Estado `S` | ~238 | Único objeto global de estado — tudo do paciente vive aqui |
| `QUEIXAS` / `CMAP` / `ALERTAS` | ~252–274 | Fallback genérico para queixas sem renderizador estruturado |
| `SLIST` | ~282 | Síndromes do passo 5 |
| `CT` | ~293–977 | Condutas por síndrome/subsíndrome — checklists baseados em evidência |
| Helpers | ~983– | `esc()`, `setQueixa()`, `ts()`, `selSub()`, `toggleSub()`, `tags()`, `radio()` etc. |
| Renderers por queixa | espalhados | `rDT()`, `rDispneia()`, `rCefaleia()` etc. |
| Passos `s0()`–`s5()` + `render()` | ~final | Cada passo é uma função que retorna HTML |
| Builders de relatório | ~final | `gRel()` (completo), `gResumo()` (5 linhas), `pSumH()`, `gResumo()`, `buildEcgText()`, `buildPocText()` |

## Convenções inegociáveis

**Segurança:**
- Todo `value="${S.x}"`, `${textarea-content}` e qualquer interpolação de input do usuário em `innerHTML` passa por `esc()`.
- Relatório (`relTxt`) é populado via `textContent` em `render()` — nunca via `innerHTML`.
- Tags `<script>` e `<link>` de CDN usam `integrity="sha384-…"` (SRI) com versões pinadas.

**Modelo CT (síndromes/condutas):**
- Cada entrada `CT.foo = { l, subExcl?, subAdd?, s: [seções] }`.
- `subExcl: [...]` — sub-seleção exclusiva, usa `S.subsind` (radio). Ex: `cho`, `sca`, `dsp`.
- `subAdd: [...]` — sub-seleção aditiva, usa `S.subsinds` (multi). Ex: `abd`, `emmi`, diferenciais do `dtx`.
- Uma síndrome pode ter ambos (ex: `dtx` = Dor torácica: probabilidade exclusiva + diferenciais aditivos).
- Sub-itens podem apontar para outras entradas CT (alias é a regra, não duplicação): `CT.tep_dsp = CT.tep`.

**Padrão de anamnese estruturada (queixas refinadas):**
Cada queixa "refinada" tem um renderizador (`r<Queixa>()`) com hierarquia em blocos sucessivos:
1. Início (radio)
2. Localização / padrão (multi)
3. Qualidade (multi)
4. Modificadores (multi)
5. Precipitantes (multi)
6. Sintomas associados (multi; alguns abrem campo livre)
7. Sinais de alarme (multi, sem redundância com blocos anteriores)
8. Antecedentes específicos da queixa (multi — vai para HPP, não HDA)

Queixas refinadas vivem em `S.<sigla>` (ex: `S.dt`, `S.dsp`, `S.cef`) com sub-objetos. Resetam em `setQueixa()`.

**Registries (em vez de cadeias `if/else if`):**
- `QX_ANAMNESE['<Queixa>'] = r<Queixa>` — usado em `s1()`.
- `QX_EF['<Queixa>'] = r<Queixa>EF` — usado em `s3()` (modo crítico).
- `QX_HDA['<Queixa>'] = (S) => string` — trecho de HDA, usado em `gRel()`.
- `QX_HPP['<Queixa>'] = (S) => [strings]` — antecedentes extras para HPP, usado em `gRel()`.
- `QX_BADGE['<Queixa>'] = () => htmlString` — badge não-textual no passo 6 (ou onde fizer sentido).

Queixas sem entrada no registry caem no fallback do CMAP.

**Helpers de UI (reduzem boilerplate):**
- `tags(label, options, arrRef, helperFn?)` — bloco multi-tag.
- `radio(label, options, fieldPath)` — bloco single-radio.

**Sinais de alarme (badge numérico):**
Cada queixa pode definir sua própria contagem de alarmes. Badge mostra "Queixa com N sinais de alarme" acima do relatório no passo 6, mas **não compõe** o texto do relatório. Estilo: `.grav-badge`.

## Status das queixas (Fase 1 — anamnese estruturada)

| Queixa | Status | Renderer | Builder HDA | Builder HPP | Badge |
|---|---|---|---|---|---|
| Dor torácica | refinada | `rDT` | inline `gRel` | — | — |
| Dispneia | refinada | `rDispneia` | inline `gRel` | — | `dispGravBadge` (severidade) |
| Cefaleia | **conduta em andamento (3/11 subtipos)** | `rCefaleia` + `rCefEF` (em D do ABCDE) | `cefHda` | `cefHpp` | `cefAlarmBadge` (contagem) |
| Síncope | pendente | — | — | — | — |
| Convulsão | pendente | — | — | — | — |
| Síndrome abdominal | pendente | — | — | — | — |
| Síndrome febril | pendente | — | — | — | — |
| Hemorragia digestiva | pendente | — | — | — | — |
| Icterícia / IHA | pendente | — | — | — | — |
| Intoxicação exógena | parcial (campo livre `S.itDrug`) | — | — | — | — |
| Dor lombar | pendente | — | — | — | — |
| Palpitações | pendente | — | — | — | — |
| RNC | pendente | — | — | — | — |
| Síndrome neurovascular (AVC) | pendente | — | — | — | — |

Tosse, Sangramento, Agitação psicomotora: ficam com tags genéricas (CMAP) por enquanto.
Trauma, Vertigem: deferred.

## Roadmap (fases acordadas)

- **Fase 1 (em curso):** refinar cada queixa individualmente (anamnese + exame físico + conduta).
- **Fase 2:** otimizar geração de texto e proposta de condutas — reaproveitamento de dados entre passos, auto-sugestão de síndrome, prescrição por peso, modo de disposição explícito.
- **Fase 3:** evolução clínica detalhada (reavaliações pós-admissão), edição de relatórios salvos, memória/timeline por paciente.

## Cronograma Fase 1 — uma síndrome por dia (a partir de 12/05/2026)

| Dia | Síndrome |
|---|---|
| 12/05 (hoje) | Cefaleia — encerrar os 8 subtipos restantes (`cef_tvc`, `cef_dac`, `cef_avch`, `cef_ppl`, `cef_hii`, `cef_tce`, `cef_sin`, `cef_trig`) |
| 13/05 | Convulsão |
| 14/05 | Síncope |
| 15/05 | Síndrome neurovascular (AVC) |
| 16/05 | Rebaixamento de consciência |
| 17/05 | Choque indiferenciado (+ 4 subtipos) |
| 18/05 | Síndrome abdominal (+ 3 subtipos) |
| 19/05 | Hemorragia digestiva |
| 20/05 | Icterícia / IHA |
| 21/05 | Síndrome febril / Infecciosa |
| 22/05 | Intoxicação exógena |
| 23/05 | Dor lombar |
| 24/05 | Palpitações / Arritmia |
| 25/05 | Edema / Dor MMII (+ 3 subtipos) |

Cefaleia já tem `cef_prim`, `cef_hsa`, `cef_men` preenchidos. Quando todos os subtipos do dia da Cefaleia estiverem fechados, atualizar status da tabela acima e prosseguir.

## Padrões de redação clínica

- Condutas em **`CT[*].s`** sempre carregam referência bibliográfica entre parênteses: `(ESC 2020, I-A)`, `(SSC 2021)`, `(GOLD 2024)`, `(GINA 2024)`, `(IDSA/ATS 2019)`, etc.
- Dose por extenso, com via, frequência e ajustes em populações especiais quando aplicável.
- Comentar contraindicações relevantes ao item.
- **Não inserir condutas baseadas em guideline sem consultar o usuário** — fontes podem divergir; prática local manda.

## Testes / verificação

Sem suíte automatizada (single-file HTML). Testes são manuais no navegador. Para checagem estática local, posso pedir:

```bash
python3 -c "
import re
with open('index.html') as f: h=f.read()
print('CT entries:', len(re.findall(r'^[a-z_]+:{', h, re.M)))
"
```

## Deploy

```bash
git add -A && git commit -m "<mensagem>" && git push
```

GitHub Pages publica em ~1–2 min. Recarregar com Cmd+Shift+R para limpar cache.

## SQL Supabase

`supabase_setup.sql` é idempotente. Política RLS: cada user só lê/escreve/edita/apaga seus próprios relatórios. Rodar no SQL Editor do dashboard Supabase quando alterado.
