# Plano Arquitetural de Modularização — Emergência Pro

**Arquiteto de Software:** Antigravity AI  
**Alvo:** `/Users/mateustcandido/Desktop/Emergency Text/app.html` (~11.232 linhas, 646 KB)  
**Objetivo:** Transição de monólito para base de código modular de alto padrão, mantendo execução offline 100% autossuficiente (single-file / `file://`), zero dependências pesadas e garantia de não regressão clínica.

---

## 1. Diagnóstico da Estrutura Atual de `app.html`

| Seção / Domínio | Linhas Aprox. | Volume | Responsabilidade e Acoplamento |
|---|---|---|---|
| **CSS & Design System** | L19 – L890 | ~871 linhas | Variáveis CSS `:root`, tema escuro/claro, grid split-screen desktop, badges de gravidade e modais. |
| **HTML Base & Modais** | L891 – L1231 | ~341 linhas | Estrutura DOM: `#app`, `#con`, `#relCol`, overlays de autenticação (login, KYC, inatividade, plantão). |
| **Infraestrutura, Auth, LGPD & Plantão** | L1234 – L2324 | ~1.090 linhas | Supabase client, Turnstile, fluxo KYC, timer de inatividade de 15 min (LGPD) e Painel de Plantão (Shift Manager). |
| **Estado Global & Helpers Core** | L2325 – L2573 | ~249 linhas | Objeto mestre reativo `S`, listas de queixas (`QX_CATS`, `QUEIXAS`, `SLIST`, `STEPS`), sanitização XSS (`esc`). |
| **Base de Dados de Condutas `CT`** | L2574 – L6334 | **~3.761 linhas** | Dicionário com mais de 50 protocolos sindrômicos estruturados em `sup`, `inv`, `sin`, `esp`, `dsp`, `subExcl` e `subAdd`. |
| **Framework de Queixas `QX_SPEC` / `registerQx`** | L6335 – L7933 | **~1.599 linhas** | Acórdions progressivos (`accordionRender`, `qxTag`, `qxRadio`), registries e especificações de 21 queixas. |
| **Apoio à Decisão (CDS), Alertas & Conflitos** | L7934 – L8234 e L9241 – L10390 | ~1.450 linhas | Regras `CT_ALERT_RULES`, motor de contraindicações farmacológicas e Cockpit de Decisão Beira-Leito (10 grandes síndromes). |
| **Escores Preditivos & Calculadoras** | L8235 – L8551 | ~317 linhas | Wells TEP, Wells TVP, NIHSS detalhado (11 domínios), Alvarado, Tokyo Guidelines, PSI/PORT, MASCC, Canadian CT Head, NEXUS, MELD. |
| **Renderização de Passos (`s0` a `s5`) & Geração PEP** | L8552 – L9240 e L10391 – L11232 | ~1.530 linhas | Passos lineares da anamnese ao relatório, construtores textuais (`buildHDA`, `buildEF`, `buildCondutas`, `gRel`), deduplicação de exames e atalhos. |

---

## 2. Proposta de Estrutura de Diretórios Modular (`src/`)

```
Emergency Text/
├── index.html                           # Landing page institucional do produto
├── package.json                         # Scripts de automação (build, dev, test, watch)
├── build.js                             # Empacotador standalone ultra-leve (Zero-Dependency Node.js)
├── dist/
│   └── app.html                         # Build final standalone (arquivo único 100% offline)
├── src/
│   ├── index.html                       # Template HTML esqueleto (containers, overlays)
│   ├── css/
│   │   ├── variables.css                # Tokens de design, cores, tema escuro
│   │   ├── layout.css                   # Grid desktop split-screen, scroll contínuo
│   │   ├── components.css               # Cards, botões, tags, accordions, steppers
│   │   └── overlays.css                 # Modais (login, KYC, inatividade, plantão)
│   ├── core/
│   │   ├── state.js                     # Objeto global S, resetS()
│   │   ├── helpers.js                   # esc(), ts(), joinAnd(), formatação
│   │   ├── navigation.js                # gs(), nx(), pv(), controle de scroll
│   │   └── render.js                    # Loop principal render() e sincronização
│   ├── data/
│   │   ├── constants.js                 # STEPS, QX_CATS, QUEIXAS, SLIST
│   │   ├── syndromes/                   # Protocolos sindrômicos (CT) por área
│   │   │   ├── index.js                 # Agregador do objeto CT
│   │   │   ├── cardiovascular.js        # SCA/OCA, Choque, etc.
│   │   │   ├── respiratorio.js          # Asma, DPOC, EAP, TEP, etc.
│   │   │   ├── neurologico.js           # AVC, Cefaleia, Coma, Convulsão
│   │   │   ├── abdominal.js             # Abdome inflamatório, obstrutivo, etc.
│   │   │   ├── trauma_tox.js            # Trauma e Intoxicações
│   │   │   └── sistemico.js             # Sepse, Dor lombar, MMII
│   │   └── complaints/                  # Framework QX_SPEC e 21 queixas
│   │       ├── registry.js              # registerQx, accordionRender
│   │       ├── cefaleia.js
│   │       ├── dor_toracica.js
│   │       ├── dispneia.js
│   │       ├── sincope.js
│   │       ├── palpitacoes.js
│   │       └── ...
│   ├── calculators/                     # Wells, NIHSS, NEWS2, Alvarado, etc.
│   ├── cds/                             # Regras de conflito, Cockpit de Decisão, dedup de exames
│   ├── generators/                      # buildHDA, buildEF, buildCondutas, gRel, tríade PEP
│   ├── views/                           # s0() até s5()
│   └── services/                        # Supabase, Auth, KYC, Inatividade LGPD, Plantão
└── tests/
    ├── suite_golden_master.js           # Snapshots de paridade do relatório em 100% dos cenários
    ├── test_calculators.js              # Testes unitários dos escores clínicos
    └── test_build_parity.js             # Validação estrutural de dist/app.html
```

---

## 3. Estratégia de Build: Bundler Ultra-Leve Zero-Dependency

* **Problema dos Módulos Nativos (`<script type="module">`):** Navegadores modernos barram módulos locais abertos via duplo clique (`file:///`) por políticas de CORS, quebrando o uso em computadores hospitalares travados sem internet ou sem servidor local.
* **Solução Ideal (Opção C):** Um script nativo `build.js` de ~120 linhas usando apenas `node:fs` e `node:path`.
  * **Zero dependências** externas (sem risco de quebra de pacotes npm).
  * Concatena CSS e JS na ordem topológica correta em **menos de 30 ms**.
  * Gera tanto `dist/app.html` quanto `app.html` na raiz, mantendo compatibilidade total com o deploy do GitHub Pages e com o uso offline em arquivo único.

---

## 4. Plano de Execução por Fases Sem Regressão

1. **Fase 0 (Harness de Testes Golden Master):** [CONCLUÍDO] Congelados 12 cenários clínicos em `tests/golden_master_runner.js` e `golden_master_snapshot.json` com MockDate determinístico.
2. **Fase 1 (Isolamento de CSS e HTML Base):** [CONCLUÍDO] CSS desacoplado em `src/css/` (4 módulos) e casca do documento em `src/index.html`. Bundler standalone `build.js` (< 4ms).
3. **Fase 2 (Dados Puros e Calculadoras):** [CONCLUÍDO] Catálogo sindrômico `CT` fatiado em `src/data/syndromes/` (7 módulos, 89 síndromes) e 8 calculadoras em `src/calculators/`.
4. **Fase 3 (Framework de Queixas e CDS):** [CONCLUÍDO] 21 queixas clínicas modularizadas em `src/data/complaints/` (8 módulos) e CDS beira-leito em `src/cds/` (5 módulos: vital_alerts, conflict_rules, evidence_registry, decision_cockpit, index). 100% de paridade aprovada no Golden Master.
5. **Fase 4 (Geradores de Prontuário):** [CONCLUÍDO] Módulos `prescription_rules.js`, `header.js`, `hda.js`, `antecedentes.js`, `exame_fisico.js`, `scores.js`, `condutas.js`, `relatorio.js` e `index.js` isolados em `src/generators/`.
6. **Fase 6 (Camada de Serviços, Estado e Atalhos):** [CONCLUÍDO] Módulos `supabase.js`, `inactivity.js`, `auth.js`, `shift.js`, `storage.js` isolados em `src/services/` e estado reativo central (`state.js`, `helpers.js`, `shortcuts.js`) isolados em `src/core/`. O antigo monólito `src/app_bundle.js` foi 100% eliminado!
7. **Fase 7 (CI/CD Automático via GitHub Actions):** [CONCLUÍDO] Workflow `.github/workflows/ci.yml` configurado para testar build standalone, validação Golden Master (12 cenários) e testes de laboratório em Node 18 e 20 a cada push e PR. Paridade clínica estrita mantida em 100%.
