# REVOADA: decisões do projeto

> Documento vivo com tudo o que já foi decidido sobre a REVOADA.
> Última atualização: **18/09/2026**.
> Quando uma decisão mudar, atualize aqui e registre o motivo na seção [Histórico de decisões](#14-histórico-de-decisões).
> Pasta raiz do projeto: **`C:\Projects\revoada`** (todos os caminhos deste documento são relativos a ela).

---

## Sumário

1. [Contexto e origem](#1-contexto-e-origem)
2. [Visão do produto](#2-visão-do-produto)
3. [Funcionalidades](#3-funcionalidades)
4. [Princípios de gamificação](#4-princípios-de-gamificação)
5. [Stack tecnológica](#5-stack-tecnológica)
6. [Arquitetura das APIs](#6-arquitetura-das-apis)
7. [Arquitetura do front-end](#7-arquitetura-do-front-end)
8. [Banco de dados](#8-banco-de-dados)
9. [Testes e TDD](#9-testes-e-tdd)
10. [Convenções de código](#10-convenções-de-código)
11. [Forma de trabalho (mentoria)](#11-forma-de-trabalho-mentoria)
12. [Cronograma e marcos](#12-cronograma-e-marcos)
13. [Riscos e cuidados](#13-riscos-e-cuidados)
14. [Histórico de decisões](#14-histórico-de-decisões)
15. [Pendências e próximos passos](#15-pendências-e-próximos-passos)
16. [Referências](#16-referências)

---

## 1. Contexto e origem

- **Projeto original:** BIRD (*Base Institucional de Recursos Didáticos*), TCC de Tecnologia em Análise e Desenvolvimento de Sistemas no **IFSP Campus Capivari (2024)**.
  - Orientador: Prof. Rafael Wendel Pinheiro. Coorientador: Prof. Waldo Luis de Lucca.
  - Repositório: <https://github.com/cleitoncunha04/bird>
  - Stack: HTML, CSS e JavaScript (Fetch API), API REST em PHP 8.3 (PSRs, PDO, Composer) e MySQL.
  - Escopo: repositório de materiais **apenas entre professores do campus** (lista de e-mails permitidos), com disciplinas, temas e arquivos para download.
  - Melhorias que o próprio artigo sugeria: busca, subtópicos e áreas de estudo, tags por tipo de arquivo.
- **Nova proposta:** refazer o projeto como **projeto de estudo pós-formatura**, ampliando o escopo para uma **plataforma aberta a qualquer pessoa**.
- **Referencial teórico que continua valendo:** TIC na educação, aprendizagem colaborativa, gamificação (Barbosa et al., 2020) e inteligência coletiva e cibercultura (Pierre Lévy). Numa plataforma aberta, esses conceitos ficam ainda mais fortes.

---

## 2. Visão do produto

- **Nome:** **REVOADA** (escolhido em 16/09/2026).
  - Significado: o BIRD era "um pássaro", restrito aos professores. A REVOADA é o bando inteiro voando junto, aprendendo em conjunto (inteligência coletiva).
  - O shell do front pode se chamar **Ninho** (sugestão, ainda não decidido).
- **Lema:** levar o *"Ensino público, gratuito e de qualidade"* a outro nível.
- **Proposta:** um "cursinho" gamificado e gratuito em que **professores do IFSP publicam voluntariamente** seus materiais (videoaulas, apresentações, artigos, exercícios) e **qualquer pessoa** pode estudar, mesmo sem ter passado no processo seletivo.
- **Público principal:** a comunidade de fora do campus, muitas vezes sem uma boa base de ensino. Por isso a plataforma precisa ser **acolhedora e inclusiva**, sem ser elitista.
- **Natureza:** **projeto de estudo**. O aprendizado técnico pesa tanto quanto a entrega.

---

## 3. Funcionalidades

### 3.1 Perfis de usuário
| Perfil | O que faz |
|---|---|
| **Aluno** | Estuda, segue trilhas, faz testes, acompanha aptidões e missões |
| **Professor** | Cria disciplinas, unidades e tópicos, publica materiais, monta trilhas e o banco de questões |
| **Administrador** | Aprova professores, modera denúncias, configura as áreas e os eixos do hexágono |

- Contas de professor exigem **e-mail `@ifsp.edu.br`** e **aprovação** de um administrador.

### 3.2 Conteúdo
- Hierarquia: **Área de conhecimento → Disciplina → Unidade → Tópico → Materiais**.
- Tipos de material: videoaula, apresentação, artigo, exercícios e link externo.
- Todo material tem **licença explícita**: CC BY-NC-SA 4.0 (recomendada), CC BY 4.0 ou "todos os direitos reservados" (só visualização, sem download).
- O professor declara ser autor ou ter direito de publicar o material.
- Legendas são incentivadas (acessibilidade).

### 3.3 Trilha de aprendizagem
- Progressão predefinida pelos professores (ex.: somar antes de multiplicar).
- Modelada como um **grafo de pré-requisitos**, não como uma lista linear.
- **Decisão:** os pré-requisitos são **recomendações, não bloqueios**. O aluno pode abrir qualquer tópico, porque bloquear conteúdo contradiz a proposta de inclusão.

### 3.4 Testes ("colocar à prova")
- **Por habilidade** (ex.: Termodinâmica, 20 questões, 60 min), **por disciplina** (ex.: História geral) ou **simulados gerais**.
- O aluno pode **montar o próprio teste**: disciplina, habilidades, quantidade de questões, tempo e dificuldade.
- Questões **sorteadas** do banco dos professores. Cada questão é marcada com uma ou mais **habilidades** e tem uma **explicação** que aparece na revisão.
- **Decisão:** o **timer é controlado pelo servidor**. Ele grava o início e o prazo (`expiresAt`) e valida na entrega. O front só exibe a contagem.
- A tentativa devolve as questões **sem o gabarito**.

### 3.5 Aptidões (hexágono estilo FIFA)
- Página com um **card inspirado nos cards de jogadores do FIFA**: nota geral, 6 atributos e o **gráfico radar (hexágono)**.
- Os **6 eixos** são configuráveis pelo administrador (ex.: MAT, FÍS, QUÍ, BIO, HIS, POR).
- **Detalhamento:** ao clicar numa disciplina, o radar mostra as habilidades dela (ex.: *Física 86 = MRU 100 + MRUV 94 + … + Espelhos 52*). Nesse nível a quantidade de eixos varia; acima de uns 8 eixos, usar lista com barras.
- **Cálculo:** **média ponderada pela quantidade de questões** respondidas em cada habilidade.
- **Indicador de confiança:** com poucas questões (limite inicial de 12), a nota aparece tracejada ou como "poucos dados".
- Evoluções futuras: dar mais peso aos testes recentes e usar TRI (Teoria de Resposta ao Item, a mesma do ENEM).
- As aptidões servem para **orientar os estudos, não para julgar**. A tela destaca "pontos fortes" e "vale revisar".

### 3.6 Gamificação
- **Penas** são os pontos da plataforma (nome escolhido nos mockups).
- **Níveis** com nomes de pássaros (ex.: Andorinha → Sabiá).
- **Sequência de estudos** (dias seguidos) com **proteções de sequência**: um dia sem estudar não zera tudo.
- **Missões diárias, semanais e mensais.**
- **Conquistas** (ex.: 7 dias seguidos, 1ª unidade concluída, 10 testes).
- **Ranking semanal por dias estudados**, nunca por nota.

### 3.7 Moderação
- Fila de **pedidos de conta de professor** (e-mail verificado ou não institucional).
- **Denúncias** de conteúdo: direitos autorais, gabarito errado, comentário ofensivo.
- Ações: ocultar o material, encaminhar ao autor, descartar a denúncia.

---

## 4. Princípios de gamificação

1. **Constância supera talento:** pontuar **frequência**, nunca desempenho.
2. **Terminar um teste sempre vale penas**, seja qual for a nota.
3. Recompensar **ações com significado** (concluir tópico, terminar teste, revisar erro) e não ações fáceis de "farmar" (abrir e fechar um vídeo).
4. Evitar a ansiedade da sequência: **proteções**, metas semanais e mensagens acolhedoras ("Calma! Terminar o teste já vale +80 penas").
5. Missões diárias precisam tratar **fuso horário**.
6. **Garantia arquitetural:** o serviço de gamificação consome `attempt.submitted` (conclusão) e **nunca recebe a nota** (`attempt.graded` vai só para skills).

---

## 5. Stack tecnológica

| Camada | Tecnologia | Observação |
|---|---|---|
| API | **Node.js + TypeScript + Express** | Separada em módulos (microsserviços) com um HUB (gateway) |
| Banco | **PostgreSQL 18** via Docker | O usuário já tem o Postgres rodando em Docker |
| Acesso ao banco | **Drizzle** (recomendado) ou Kysely | Próximos do SQL. Prisma foi considerado pesado para monorepo com vários serviços |
| Arquivos | **Amazon S3** (MinIO ou LocalStack no desenvolvimento) | Alternativa em produção: Cloudflare R2 (mesma API, sem custo de saída) |
| Cache e broker | **Redis** (Redis Streams) | Entra no M5 |
| Front | **Quasar (Vue 3, Composition API)** | Com web components e um HUB (shell) |
| Testes | **Vitest** (recomendado) | Ver [seção 9](#9-testes-e-tdd) |
| Validação e contratos | **Zod** | Schemas compartilhados em `packages/contracts` |
| Monorepo | **pnpm workspaces** + Turborepo ou Nx | Ainda não fechado |

### 5.1 Docker e Postgres 18: atenção
- A imagem oficial `postgres:18` **mudou o caminho do volume**: montar em **`/var/lib/postgresql`**, e **não** em `/var/lib/postgresql/data`. Os dados ficam em `/var/lib/postgresql/18/docker`.
- **Fixar a versão da imagem** (`postgres:18`), nunca `latest`.
- Criar **banco e usuário próprios** para o projeto.
- **Pendente:** conferir versão e volume do container que já existe na máquina.

---

## 6. Arquitetura das APIs

> Diagrama visual: `mockups/arquitetura-api.html` (com o servidor dos mockups rodando: <http://localhost:5500/arquitetura-api.html>).

### 6.1 Visão geral
```
APP HUB (navegador)
   │  HTTPS /api/*            ▲ SSE /events (notificações)
   ▼                          │
API HUB (gateway) ────────────┘
   │ proxy HTTP /api/<módulo>
   ├── api-identity     (assina JWT, publica JWKS)
   ├── api-media        (URLs pré-assinadas do S3)
   ├── api-catalog
   ├── api-progress
   ├── api-assessment
   ├── api-skills
   ├── api-gamification
   └── api-moderation
        │                       │
   PostgreSQL 18           Redis Streams (broker)
   (um schema por serviço)  (eventos entre serviços + notification.* → HUB)

Navegador ⇄ S3: upload e download direto com URL pré-assinada (arquivos não passam pelo gateway)
```

### 6.2 API HUB (gateway): responsabilidades
- **Ponto único de entrada.** O front só conhece o HUB, e os serviços ficam na rede interna.
- **Proxy** para os serviços (`http-proxy-middleware`).
- **Valida o JWT** com a chave pública (JWKS em cache).
- Rate limit, CORS.
- **Remove cabeçalhos sensíveis** vindos do cliente (ex.: `x-user-id`) e só repassa dados extraídos do token validado.
- Adiciona **`x-request-id`** para rastrear a requisição em todos os serviços.
- **Escuta `notification.*`** no broker e envia ao navegador por **SSE**.
- **Decisão:** o HUB é **simples de propósito**. Não tem regra de negócio nem banco próprio.

### 6.3 Autenticação e tokens
- **Decisão:** quem **assina** os tokens é a **API Identity**, que é a única com a **chave privada**. A proposta inicial era o HUB assinar; mudou porque verificar senha exige tabela de usuários, e isso transformaria o HUB num serviço com regra de negócio.
- Algoritmo assimétrico: **EdDSA** ou **RS256**, com **`kid`** no cabeçalho para permitir troca de chave.
- A Identity publica as chaves públicas em **`/.well-known/jwks.json`**. O HUB e os serviços baixam e guardam em cache.
- **Validação dupla:** o HUB valida **e** cada serviço valida de novo (defesa em profundidade).
- Sempre validar `iss`, `aud` e `exp`.
- **Access token curto** (~15 min) e **refresh token em cookie `httpOnly`**. O APP HUB cuida da renovação, e os micro-frontends só pedem o token atual.
- Comunicação serviço a serviço fora de uma requisição de usuário: identidade própria do serviço (*client credentials*), se for necessária.

### 6.4 Comunicação entre serviços: broker de eventos
- **Decisão:** a comunicação **serviço → serviço** é por **eventos num broker**, não por chamadas HTTP ao HUB. A proposta inicial era "o filho chama a API do HUB", e mudou por causa de:
  - risco de **perder mensagens** se o HUB estiver fora do ar;
  - **acoplamento**: o HUB viraria um barramento feito à mão;
  - **autenticação** de chamadas feitas fora de uma requisição do usuário.
- **Broker escolhido:** **Redis Streams**, com abstração `publish`/`subscribe` na lib `api-core`. Se um dia for preciso trocar por RabbitMQ, muda só a lib.
- **Conceitos:** publisher, consumer, stream, **consumer group** (uma instância processa cada evento), **ack** e **idempotência** (a entrega é "pelo menos uma vez", então o consumidor precisa ignorar eventos repetidos).
- **Quando usar cada um:**
  - **HTTP:** quando é preciso a resposta na hora (ex.: listar disciplinas).
  - **Evento:** para avisar que algo aconteceu.
- Até o M4 não é preciso broker. Ele entra no **M5**.
- Se no começo houver chamadas HTTP internas, usar **tabela outbox** + retentativa, **rede ou porta interna separada** e autenticação do serviço.

### 6.5 SSE (notificações em tempo real)
- **Uma única conexão SSE** no APP HUB, repassada aos micro-frontends. Isso evita o limite de conexões por domínio no HTTP/1.1.
- O `EventSource` **não envia cabeçalho `Authorization`**. Usar cookie de sessão ou um **ticket de uso único**. **Nunca** colocar o JWT na URL.
- **Heartbeat** (`:ping`) a cada 20–30 s.
- **`id:` nos eventos** e **`Last-Event-ID`** para reenviar o que foi perdido durante a reconexão.
- Com várias instâncias do HUB, o broker resolve a distribuição, porque todas escutam o mesmo stream.

### 6.6 Serviços (módulos)

| Serviço | Responsabilidade | Schema | Publica | Consome | Marco |
|---|---|---|---|---|---|
| **api-identity** | Cadastro, login, papéis, aprovação de professor, LGPD, assina JWT, JWKS | `identity` | `user.registered`, `teacher.approved` | — | M1 |
| **api-media** | URLs pré-assinadas, metadados, licenças, conversão de vídeo | `media` | `material.published` | `content.hidden` | M2 |
| **api-catalog** | Áreas, disciplinas, unidades, tópicos, trilhas, pré-requisitos | `catalog` | — | `material.published`, `content.hidden` | M2 |
| **api-progress** | Tópicos concluídos, tempo assistido | `progress` | `topic.completed`, `material.watched` | — | M3 |
| **api-assessment** | Questões, habilidades, testes, tentativas, timer, correção | `assessment` | `attempt.submitted`, `attempt.graded` | — | M4 |
| **api-skills** | Cálculo das aptidões (radar e detalhamento) | `skills` | `notification.skill-updated` | `attempt.graded` | M5 |
| **api-gamification** | Penas, níveis, sequência, proteções, missões, conquistas, ranking | `gamification` | `notification.mission-completed`, `notification.level-up` | `user.registered`, `topic.completed`, `material.watched`, `attempt.submitted` | M6 |
| **api-moderation** | Denúncias, ocultar conteúdo | `moderation` | `content.hidden` | — | M7 |
| **notification** *(futuro)* | E-mail e avisos dentro da plataforma | — | — | `teacher.approved`, `notification.*` | — |

**Por que essa divisão:**
- **media separado de catalog:** upload, S3 e vídeo são um mundo à parte e podem servir outros módulos.
- **progress separado de catalog:** o catálogo quase só recebe leituras (dá para usar cache), enquanto o progresso recebe escritas constantes, por usuário.
- **skills separado de assessment:** a fórmula da aptidão pode mudar (e virar TRI) sem mexer nos testes.
- **gamification só escuta eventos.** Ninguém a chama diretamente.

**Regra de ouro:** um serviço **nunca lê as tabelas de outro**. Se precisar de um dado, pede pela API ou mantém uma cópia recebida por evento.

### 6.7 Rotas (esboço)
No gateway, as rotas ficam em `/api/<módulo>/...`.

- **identity:** `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `GET /me`, `POST /teacher-requests`, `PATCH /teacher-requests/:id`, `GET /.well-known/jwks.json`
- **catalog:** `GET /areas`, `GET /disciplines?area=`, `GET /disciplines/:slug`, `GET /disciplines/:id/trail`, `POST /disciplines`, `POST /units`, `POST /topics`, `PUT /topics/:id/prerequisites`
- **media:** `POST /uploads` (devolve a URL pré-assinada), `POST /uploads/:id/complete`, `GET /topics/:id/materials`, `GET /materials/:id/download`
- **progress:** `POST /topics/:id/complete`, `PUT /materials/:id/progress`, `GET /me/progress?discipline=`
- **assessment:** `GET /tests`, `POST /tests/custom`, `POST /attempts` (devolve `attemptId`, `expiresAt` e as questões sem gabarito), `PUT /attempts/:id/answers/:questionId`, `POST /attempts/:id/submit`, `GET /attempts/:id/result`, CRUD de `/questions` e `/skills`
- **skills:** `GET /me/skills`, `GET /me/skills/:disciplineId`
- **gamification:** `GET /me/summary`, `GET /me/missions?period=daily|weekly|monthly`, `POST /me/missions/:id/claim`, `GET /leaderboard/weekly`
- **moderation:** `POST /reports`, `GET /reports?status=open`, `PATCH /reports/:id`

### 6.8 Fluxos de referência

**Aluno termina um teste**
1. `POST /api/assessment/attempts/:id/submit` → o HUB valida o JWT e repassa ao Assessment.
2. O Assessment confere o prazo, corrige, grava e responde ao aluno.
3. Publica `attempt.submitted` e `attempt.graded`.
4. **Skills** consome `attempt.graded` e recalcula as aptidões. **Gamification** consome `attempt.submitted` e dá as penas, sem ver a nota.
5. A Gamification conclui a missão e publica `notification.mission-completed`.
6. O HUB consome `notification.*` e envia por SSE. O APP HUB avisa o `<rv-missions>`.

**Professor publica um vídeo**
1. `POST /api/media/uploads` → a Media valida o papel de professor e devolve uma URL pré-assinada (PUT, ~15 min).
2. O navegador envia o arquivo **direto para o S3**.
3. `POST /api/media/uploads/:id/complete` → a Media confere se o objeto existe e grava os metadados.
4. Publica `material.published`. O Catalog atualiza os contadores.
5. O aluno chama `GET /api/media/materials/:id/download` e recebe uma URL pré-assinada temporária.

### 6.9 Armadilhas já mapeadas
- **Não registrar `express.json()` antes do proxy:** ele consome o corpo da requisição e o proxy repassa vazio.
- Arquivos grandes **nunca passam pelo gateway** (URLs pré-assinadas).
- Vídeo tem **custo de tráfego de saída** na AWS. Considerar embeds do YouTube no início ou o Cloudflare R2.
- Conferir o **free tier atual da AWS** antes de criar a conta, porque ele mudou recentemente.

### 6.10 Estrutura interna de um serviço (sugestão)
```
src/
├─ routes/          # rotas do Express
├─ controllers/     # lê a requisição, chama o service, responde
├─ services/        # regras de negócio (classes testáveis com TDD)
├─ repositories/    # acesso ao banco, só ao schema do próprio serviço
├─ db/schema.ts
├─ events/          # publish / subscribe
└─ main.ts
```

---

## 7. Arquitetura do front-end

### 7.1 Decisões
- **Quasar (Vue 3, Composition API)** com **web components** e um **APP HUB** (shell) que centraliza tudo.
- **Web components são obrigatórios:** o usuário vai começar a usá-los no trabalho (setembro de 2026), então o projeto também serve de treino. A arquitetura do trabalho ainda não está definida, então o foco é **entender os conceitos**.
- **Caminho de aprendizado:**
  1. **Web components nativos** (Custom Elements, Shadow DOM, slots, `CustomEvent`, ciclo de vida, `ElementInternals`), escritos em TypeScript puro.
  2. **Vue `defineCustomElement`**, comparando com a versão nativa.
  3. **Integração com Quasar e o HUB** (estilos globais × Shadow DOM, plugins, estado compartilhado, registro duplicado).
- **Maior risco técnico do front:** Quasar dentro de web components. Os componentes do Quasar dependem da instância do app e de CSS global. O Vue 3.5 oferece `shadowRoot: false` e `configureApp`. **Fazer uma prova de conceito no M0.**
- Alternativa para os micro-frontends, se necessário: Module Federation (`@module-federation/vite`), **mantendo** os web components como objeto de estudo.

### 7.2 Conceitos a treinar
1. Shadow DOM e estilos (CSS custom properties, `::part`, `:host`).
2. Comunicação: atributos e propriedades para dentro, `CustomEvent` (`bubbles` e `composed`) para fora, event bus entre componentes independentes.
3. Ciclo de vida: `connectedCallback`, `disconnectedCallback` (limpar listeners) e `attributeChangedCallback`.
4. Slots.
5. Formulários com `ElementInternals` (form-associated custom elements).
6. Registro e versões (`customElements.define` duplicado).
7. Acessibilidade através do Shadow DOM.

### 7.3 Micro-frontends e componentes (prefixo `rv-`)
| Pacote | Componentes | Telas |
|---|---|---|
| **web-hub** | Shell (layout, menu, rotas, sessão, conexão SSE) | Todas |
| **wc-auth** | `<rv-login-form>`, `<rv-signup-form>` | Login |
| **wc-catalog** | `<rv-discipline-grid>`, `<rv-discipline-header>` | Disciplinas, Disciplina |
| **wc-learning** | `<rv-trail>`, `<rv-material-player>`, `<rv-topic-list>` | Trilha, Aula |
| **wc-assessment** | `<rv-test-builder>`, `<rv-test-runner>`, `<rv-test-result>` | Testes, Teste, Resultado |
| **wc-skills** | `<rv-skill-card>`, `<rv-skill-radar>`, `<rv-skill-breakdown>` | Aptidões, Disciplina |
| **wc-gamification** | `<rv-streak>`, `<rv-missions>`, `<rv-points-badge>` | Início, Missões, barra superior |
| **wc-studio** | `<rv-trail-editor>`, `<rv-uploader>`, `<rv-question-editor>` | Telas do professor |
| **wc-admin** | `<rv-teacher-requests>`, `<rv-report-queue>` | Moderação |

- **Independência no front:** os componentes se comunicam por eventos DOM pelo event bus da `wc-core` (ex.: `rv:topic-completed`), sem um componente conhecer o outro.
- Os micro-frontends **não abrem conexões SSE próprias**. O APP HUB repassa as notificações.
- Os micro-frontends chamam o API HUB usando um cliente HTTP da `wc-core`, com o token fornecido pelo APP HUB.
- Considerar **PWA** (o Quasar gera) e material leve, já que o público usa muito dados móveis.

### 7.4 Identidade visual (dos mockups)
- **Paleta herdada do BIRD:** verde escuro `#154324` (destaque), verde claro `#87E174`, gelo `#EEE5E9`, cinza `#d9d9d9`.
- **Fonte:** Montserrat.
- **`border-radius: 5px`** em tudo, exceto avatares, barras de progresso e botões flutuantes (círculos).
- **Ícones:** Tabler Icons.
- **Campos de formulário:** estilo **outlined com label flutuante**, como o `OutlineInputBorder` do Flutter. No Quasar, o equivalente é **`<q-input outlined>`**. Variantes: ícone no início, ícone no fim, erro, texto de ajuda, versão compacta.
- **Elementos herdados do BIRD:** menu lateral recolhível, cards de disciplina com capa, acordeão de tópicos, botão verde flutuante no canto inferior direito.

### 7.5 Mockups
- Pasta **`mockups/`**: 15 telas em HTML estático (Tailwind CDN + Tabler Icons), além do diagrama de arquitetura.
- Rodar com `node mockups/serve.mjs` e abrir <http://localhost:5500> (o `index.html` é o mapa de telas).
- **Telas:** página inicial, login e cadastro, início, disciplinas, disciplina e trilha, aula, testes, fazendo teste (modo foco), resultado, aptidões (card FIFA + radar com detalhamento), missões, estúdio do professor, publicar material, banco de questões, moderação.

---

## 8. Banco de dados

### 8.1 Decisões
- **PostgreSQL 18** em Docker.
- **Um schema por serviço** (`identity`, `catalog`, `media`, `progress`, `assessment`, `skills`, `gamification`, `moderation`). No início, todos no **mesmo container**.
- Idealmente **um usuário de banco por serviço**, com permissão só no próprio schema.
- **Sem chaves estrangeiras entre schemas.** Ex.: `catalog.discipline_author.user_id` **não** referencia `identity.users`. A consistência vem dos eventos (ex.: `user.deleted` → cada serviço limpa o que é seu).
- **`uuidv7()` nativo do Postgres 18** como chave primária (sugestão a confirmar no rascunho da identity). É ordenado por tempo, não espalha as inserções no índice e não expõe quantidades.
- **`timestamptz` sempre**, nunca `timestamp`.
- **JSONB com moderação:** para metadados de material. Questões, alternativas e respostas ficam em tabelas normais, por causa das agregações das aptidões.
- **Pré-requisitos** como tabela de arestas (`topic_id`, `prerequisite_id`), percorrida com `WITH RECURSIVE`.
- Aproveitar novidades do PG 18: `OLD`/`NEW` no `RETURNING` (útil para detectar mudança de sequência), E/S assíncrona, *skip scan* em B-tree, checksums ativos por padrão.

### 8.2 Estratégia de modelagem
- **Nível 1 (agora):** **modelo conceitual** de todos os módulos, para validar as fronteiras.
- **Nível 2:** **tabelas detalhadas só do módulo do marco atual**. Para o M1, apenas a **identity**. As tabelas dos marcos seguintes vão mudar até lá.

### 8.3 Modelo conceitual (nível 1)
| Schema | Entidades | IDs de outros serviços que guarda |
|---|---|---|
| **identity** | user, role, teacher_request, refresh_token | — |
| **catalog** | area, discipline, unit, topic, topic_prerequisite, discipline_author | `user_id` (autor) |
| **media** | material, upload | `topic_id`, `user_id` |
| **progress** | topic_progress, material_progress | `user_id`, `topic_id`, `material_id` |
| **assessment** | skill, question, alternative, test, test_question, attempt, attempt_answer | `user_id`, `discipline_id`, `topic_id` |
| **skills** | skill_score | `user_id`, `skill_id`, `discipline_id` |
| **gamification** | wallet, ledger_entry, streak, mission, user_mission, badge, user_badge | `user_id` |
| **moderation** | report | `user_id`, ID do conteúdo denunciado |

### 8.4 Perguntas para o rascunho da identity (tarefa do usuário)
1. **Chave primária:** `uuidv7()` ou `serial`? Por quê?
2. **Papéis:** um usuário pode ser aluno **e** professor? Isso decide entre uma coluna `role` e uma tabela `user_roles`.
3. **Pedido de professor:** tabela própria (`teacher_requests`, com status, quem aprovou e quando) ou coluna em `users`? E o histórico de pedidos recusados que são refeitos?
4. **E-mail único sem diferenciar maiúsculas e minúsculas:** `citext` ou índice em `lower(email)`?
5. **Refresh token:** guardar o token ou um **hash** dele? Como fazer "sair de todos os dispositivos"?
6. **LGPD:** onde registrar o aceite dos termos (qual versão e quando)?
7. **Exclusão:** *hard delete* ou *soft delete* (`deleted_at`)? O que a LGPD exige quando o usuário pede para excluir a conta?

---

## 9. Testes e TDD

- **Objetivo:** praticar **TDD** desde o início. O usuário **nunca trabalhou com testes**, então vamos começar pelo básico.
- **Framework recomendado: Vitest.** Suporte nativo a TypeScript, rápido e com a mesma API do Jest. Alternativa sem dependência: `node:test`.
- **Ciclo:** 🔴 **vermelho** (escreve o teste, que falha) → 🟢 **verde** (o mínimo de código para passar) → 🔵 **refatorar** (melhora o código com o teste garantindo que nada quebrou).
- **Pirâmide de testes:**
  - **Muitos testes de unidade:** regras de negócio em classes puras, sem banco (milissegundos).
  - **Alguns de integração:** repositório com Postgres real, rota com HTTP.
  - **Poucos de ponta a ponta.**
- **O TDD começa pelas regras de negócio.** Ex.: "a sequência não zera se houver proteção disponível". O banco entra depois.
- **Dublês de teste:** dependências externas (banco, Redis, S3, relógio, JWT) entram pelo **construtor**, para serem trocadas no teste (ex.: `FakeClock`, `InMemoryRepository`).
- **Relógio injetável** é essencial: missões diárias, sequência e timer dependem de "agora". Nunca usar `new Date()` direto dentro das regras.

---

## 10. Convenções de código

- **Preferência por classes.** O usuário **não gosta de exportar funções soltas** (`export function`).
- **Classes estáticas** apenas para **utilitários puros** (mesma entrada, mesma saída, sem efeitos colaterais). Ex.: `SlugHelper.from(...)`, `DateHelper.startOfDay(...)`.
  - Por isso, a regra **`complexity/noStaticOnlyClass` do Biome está desligada** no `biome.json`. Ela sugere trocar classes só com membros estáticos por funções soltas, o que vai contra essa convenção.
- **Instâncias com injeção de dependência pelo construtor** para tudo que acessa o mundo externo: repositórios, clientes de banco, Redis, S3, assinatura e validação de JWT, relógio, hash de senha.
- Camadas por serviço: `routes` → `controllers` → `services` → `repositories`. Sem exagerar na arquitetura.
- **Contratos compartilhados** (tipos, schemas Zod, eventos) em `packages/contracts`, para quem publica e quem consome usarem o mesmo tipo.
- **Não criar libs antes de precisar:** escrever no serviço e extrair para a lib quando um segundo serviço precisar da mesma coisa.
- **Registrar decisões em ADRs** (*Architecture Decision Records*) em `docs/decisions`: uma nota curta por decisão, com o motivo.

### 10.1 Monorepo (estrutura proposta)
```
revoada/
├─ apps/
│  ├─ api-gateway/  api-identity/  api-catalog/  api-media/
│  ├─ api-progress/ api-assessment/ api-skills/ api-gamification/ api-moderation/
│  ├─ web-hub/                  # shell Quasar (APP HUB)
│  └─ wc-*/                     # web components por domínio
└─ packages/
   ├─ ui/          # lib de componentes do front
   ├─ api-core/    # lib da API: token, banco, erros, logger, validação, publish/subscribe
   ├─ wc-core/     # lib de web components: define, event bus, estado, cliente HTTP
   └─ contracts/   # tipos, schemas Zod, eventos (4ª lib, sugerida)
```

---

## 11. Forma de trabalho (mentoria)

Combinado em **18/09/2026**:
- **O usuário escreve o código. O Claude não escreve o código do projeto.** Se o Claude codar, o projeto perde o sentido de ser de estudo.
- O Claude age **"em segundo plano"**: explica decisões arquiteturais, compara alternativas, indica **fontes de consulta** e mantém o projeto no rumo do cronograma.
- **Exemplos de código são permitidos só quando genéricos**, fora do domínio da REVOADA (ex.: um teste de uma classe `Calculator` ou `Wallet`).
- **Fluxo de revisão:** o usuário rascunha (tabelas, arquitetura, código) → o Claude revisa e aponta ajustes e melhorias.

---

## 12. Cronograma e marcos

- **Disponibilidade:** 20–30 h por semana. **Planejamento feito com ~22 h efetivas** por semana; as horas acima disso são folga.
- **Estimativa total:** ~720–1.100 h (planejado: ~940 h). Inclui ~20% para testes, ajustes e documentação.
- **Início:** 21/09/2026.

| Marco | Entrega | Horas | Até |
|---|---|---|---|
| **M0 · Fundação** | Monorepo, libs, Docker/Postgres, shell do HUB, prova de conceito de web components com Quasar | ~90 | 18/10/2026 |
| **M1 · Identidade** | Gateway, cadastro, login, papéis e aprovação de professor de ponta a ponta, com integração contínua (CI) | ~130 | 29/11/2026 |
| **M2 · BIRD refeito** | Disciplinas, unidades, tópicos, upload no S3 (MinIO), estúdio do professor. *Inclui 2 semanas de pausa no fim de ano* | ~170 | 07/02/2027 |
| **M3 · Trilhas** | Pré-requisitos, progresso, telas de trilha e aula | ~90 | 07/03/2027 |
| **M4 · Testes** | Banco de questões, montagem, timer no servidor, correção, resultado | ~175 | 02/05/2027 |
| **M5 · Aptidões** | Broker (primeiros eventos), cálculo das aptidões, card FIFA e radar | ~100 | 06/06/2027 |
| **M6 · Gamificação** | Penas, níveis, sequência, missões, conquistas | ~95 | 11/07/2027 |
| **M7 · Produção** | Moderação, admin, deploy na nuvem (domínio, CDN) | ~90 | 08/08/2027 |

- **Faixa realista:** maio/2027 (melhor caso, 30 h/semana) · **agosto/2027 (planejado)** · outubro/2027 (com imprevistos).
- **Por onde começar (M0/M1):** `packages/contracts` e `packages/api-core` → `api-gateway` e `api-identity` → `web-hub` e `wc-auth` (com o `<rv-login-form>` como primeiro web component).
- **Recalibrar** a estimativa ao final do M0 e do M1 com as horas reais registradas.
- **Semana leve** a cada 8–10 semanas, para evitar esgotamento.
- O M2 sozinho já é um **portfólio apresentável**.

### 12.1 Plano detalhado do M0 · Fundação

**Período:** 21/09 a 18/10/2026 (4 semanas) · **Esforço:** ~90 h (~22 h/semana)

**Objetivo:** preparar o terreno e **eliminar a maior incerteza técnica** antes de escrever funcionalidades.
Ao final do M0, **criar o próximo serviço deve ser "copiar o molde e começar a regra de negócio"**, sem dúvidas de configuração.

#### Os três tipos de trabalho do M0
| Tipo | O quê | Depois do M0 |
|---|---|---|
| **Fundação definitiva** | Monorepo, `tsconfig` base, lint, CI, `docker-compose` com o Postgres, `api-core` (`Clock`, erros, helper), esqueleto do `api-gateway` | **Fica no projeto** até o M7. Fazer com calma e com testes |
| **Experimento (prova de conceito)** | Web components nos 3 degraus, Quasar + HUB | **Pode ser descartado.** O que fica é a **decisão** registrada na ADR |
| **Treino** | Kata de TDD (String Calculator) | **Descartado.** Fica o hábito do ciclo |

#### Fora do escopo do M0
Login, cadastro, **tabelas da identity**, S3/MinIO, Redis, broker, telas da REVOADA. Se estiver criando tabela de usuário, saiu do M0.
*Exceção permitida:* **no papel**, em paralelo, listar os casos de uso e as regras da identity (preparação do M1).

#### Etapas

**Etapa 1: estudo dirigido (~10 h)**
- Vídeos de TDD **antes do kata**: Ian Cooper → Kent Beck (Cannon TDD) → Vitest Crash Course.
- **Antes da prova de conceito:** Traversy (Web Components Crash Course).
- **No fim do M0** (preparação do M1): Eric Evans (What is DDD).
- Anotar dúvidas e levar para a revisão.

**Etapa 2: monorepo (~12 h)**
- `git init` e repositório no GitHub (com `.gitignore` e `README`).
- **pnpm workspaces** + **Turborepo** (tarefas `lint`, `test`, `build` em todos os pacotes).
- Pastas `apps/` e `packages/` criadas (vazias onde ainda não houver código).
- `tsconfig` base na raiz, estendido pelos pacotes (modo `strict`).
- Lint e formatação: **ESLint + Prettier** ou **Biome**.
- `.editorconfig` e `.nvmrc` (fixar a versão do Node).
- ✅ **Pronto quando:** um único comando na raiz roda lint e testes em todos os pacotes.
- 📚 <https://pnpm.io/workspaces> · <https://turborepo.com/docs> · <https://biomejs.dev>

**Etapa 3: kata de TDD (~8 h)**
- **String Calculator Kata** com uma classe `StringCalculator`, num pacote de rascunho (ex.: `packages/sandbox`).
- Fazer **duas vezes, em dias diferentes, do zero**.
- Commits pequenos, idealmente um por ciclo (vermelho → verde → refatorar).
- ✅ **Pronto quando:** você explica, sem consultar, por que cada teste existe e qual foi o "mínimo para passar".
- 📚 <https://osherove.com/tdd-kata-1>

**Etapa 4: primeiras peças da `api-core` com TDD (~15 h)**
- **`Clock`:** interface com `SystemClock` (real) e `FixedClock` (testes). Base para missões, sequência, timer e expiração de token.
- **Erros da aplicação:** `AppError` → `ValidationError`, `NotFoundError`, `ConflictError`, `UnauthorizedError`, `ForbiddenError`, cada um com seu status HTTP e um código legível (ex.: `EMAIL_ALREADY_USED`).
- **Helper estático puro:** `SlugHelper` ("Física Básica" → `fisica-basica`: sem acento, minúsculas, hífens).
- Todos com **teste antes do código**, e usáveis a partir de outro pacote do monorepo.
- ✅ **Pronto quando:** as três peças existem, com testes, e são importadas por outro pacote sem gambiarra de caminho.

**Etapa 5: esqueleto de serviço + Docker (~15 h)**
- `apps/api-gateway` com Express e rota **`GET /health`** (responde status e versão).
- **Teste de integração** com Supertest (requisição HTTP real dentro do teste).
- Estrutura interna: `routes/`, `controllers/`, `services/`, `main.ts`. Separar a **criação do app** do **`listen`**, para o teste subir o app sem abrir porta.
- Middleware de erro que converte `AppError` em resposta HTTP (usa a etapa 4).
- `docker-compose.yml` na raiz com **`postgres:18`**, volume em **`/var/lib/postgresql`**, banco e usuário próprios. Conferir o container que já existe na máquina.
- Variáveis de ambiente num `.env` (fora do Git), com um `.env.example` versionado.
- ✅ **Pronto quando:** `docker compose up` sobe o banco, o gateway responde `/health`, e os testes passam.
- 📚 <https://github.com/ladjs/supertest> · <https://docs.docker.com/compose/> · <https://hub.docker.com/_/postgres>

**Etapa 6: prova de conceito de web components (~25 h)**, *a mais importante do M0*
1. **Nativo:** `<rv-counter>` em TypeScript puro, com Shadow DOM, um atributo de entrada (`start`), um `CustomEvent` de saída (`rv:changed`), e limpeza no `disconnectedCallback`.
2. **Vue:** o mesmo componente com `defineCustomElement`. Anotar as diferenças (tamanho do código, reatividade, estilos, eventos).
3. **Quasar + HUB:** o `web-hub` (shell Quasar) carregando **2 web components independentes** que:
   - [ ] trocam um evento entre si (botão num componente → contador no outro);
   - [ ] leem um dado compartilhado (ex.: nome do "usuário logado" vindo do shell);
   - [ ] mudam de tema via **CSS custom properties**;
   - [ ] usam **um componente do Quasar dentro** (ex.: `q-input outlined`).
- ✅ **Pronto quando:** os 4 itens funcionam **e** a ADR-003 registra o caminho escolhido, com o motivo:
  - (a) Quasar dentro dos web components, sem Shadow DOM;
  - (b) web components sem Quasar, com Quasar só no shell;
  - (c) Module Federation.
- 📚 <https://vuejs.org/guide/extras/web-components> · <https://developer.mozilla.org/en-US/docs/Web/API/Web_components>

**Etapa 7: CI e ADRs (~5 h)**
- **GitHub Actions** rodando lint + testes a cada push e pull request.
- `docs/decisions/` com:
  - **ADR-001:** monorepo (pnpm + Turborepo);
  - **ADR-002:** testes (Vitest);
  - **ADR-003:** resultado da prova de conceito de web components.
- ✅ **Pronto quando:** o badge do CI está verde no README.
- 📚 <https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs> · <https://adr.github.io>

#### Semana a semana
| Semana | Datas | Foco | Horas |
|---|---|---|---|
| **1** | 21–27/09 | Vídeos de TDD (6 h) · **Monorepo** (12 h) · Kata, 1ª vez (4 h) | ~22 |
| **2** | 28/09–04/10 | Kata, 2ª vez (4 h) · **`api-core` com TDD** (15 h) · Vídeo Traversy (2 h) | ~21 |
| **3** | 05–11/10 | **Gateway + Docker** (15 h) · Prova de conceito, degraus 1 e 2 (7 h) | ~22 |
| **4** | 12–18/10 | Prova de conceito, degrau 3 (18 h) · **CI + ADRs** (5 h) · Vídeo Eric Evans (opcional) | ~23 |

#### Checklist final do M0
- [ ] Um comando na raiz roda lint e testes de todo o monorepo
- [ ] Kata de TDD feito pelo menos 2 vezes
- [ ] `api-core` com `Clock`, erros da aplicação e `SlugHelper`, todos com TDD
- [ ] `api-gateway` respondendo `/health`, com teste de integração e middleware de erro
- [ ] Postgres 18 no `docker-compose`, com o volume correto
- [ ] Prova de conceito de web components nos 3 degraus + ADR-003
- [ ] CI verde no GitHub
- [ ] Horas registradas por semana
- [ ] *(Opcional)* Casos de uso e regras da identity listados no papel

#### Pontos de revisão com o mentor
- **Fim da semana 1:** estrutura do monorepo + dúvidas dos vídeos.
- **Fim da semana 2:** testes e classes da `api-core` (revisão de TDD: os testes descrevem comportamento?).
- **Fim da semana 3:** gateway, Docker e os 2 primeiros degraus da prova de conceito.
- **Fim da semana 4:** ADR-003 + retrospectiva (horas reais × planejadas → recalibrar o cronograma).
- **Regra:** travou por mais de 1 h numa coisa → pedir ajuda.

---

## 13. Riscos e cuidados

| Risco | Mitigação |
|---|---|
| **Escopo grande / não terminar** | Entregas em fatias que funcionam de ponta a ponta. Cada marco é uma versão utilizável |
| **Esgotamento** (20–30 h/semana além do trabalho) | Planejar com 22 h, semanas leves periódicas |
| **Quasar dentro de web components** | Prova de conceito no M0, antes de fechar a arquitetura do front |
| **Oferta de conteúdo** (banco de questões dá muito trabalho) | No estudo, usar dados de exemplo. Em produção é o gargalo principal |
| **Nota de aptidão enganosa** (1 teste = 100) | Média ponderada + indicador de confiança. Depois, peso para testes recentes e TRI |
| **Direitos autorais / LGPD / menores de idade** | Licença explícita, declaração de autoria, moderação, registro de consentimento. Verificar o uso da marca IFSP |
| **Custo de vídeo na AWS** | Embeds do YouTube no início ou Cloudflare R2 |
| **Perda de eventos** | Broker com ack, consumer groups, idempotência. Outbox se houver HTTP interno |
| **Ansiedade da sequência** | Proteções, metas semanais, mensagens acolhedoras |

---

## 14. Histórico de decisões

| Data | Decisão | Motivo |
|---|---|---|
| 16/09/2026 | Refazer o BIRD como plataforma aberta e gamificada | Projeto de estudo pós-formatura com propósito social |
| 16/09/2026 | Nome **REVOADA** | Continuidade com o BIRD, remete à inteligência coletiva |
| 16/09/2026 | Pontuação por **frequência**, não por desempenho | Não desestimular quem tem base mais fraca |
| 16/09/2026 | Pré-requisitos **recomendados, não bloqueantes** | Inclusão |
| 16/09/2026 | Timer do teste **no servidor** | Segurança e consistência |
| 16/09/2026 | **Web components obrigatórios** | Treino para o trabalho |
| 16/09/2026 | **PostgreSQL 18** via Docker, um schema por serviço | Aprendizado e isolamento dos serviços |
| 16/09/2026 | Campos **outlined com label flutuante** | Preferência visual (estilo Flutter) |
| 16/09/2026 | Assinatura do JWT sai do HUB e vai para a **API Identity** | O HUB não deve ter regra de negócio nem banco |
| 16/09/2026 | Serviço → serviço por **broker (Redis Streams)**, não por HTTP ao HUB | Evitar perda de mensagens e acoplamento |
| 16/09/2026 | **SSE** para notificações, com uma conexão no APP HUB | Comunicação num sentido só, reconexão automática |
| 18/09/2026 | **Mentoria sem código**: o usuário coda, o Claude orienta | Preservar o aprendizado |
| 18/09/2026 | **TDD com Vitest** (recomendado) | Primeiro contato com testes |
| 18/09/2026 | **Classes**; estáticas só para utilitários puros; injeção de dependência para o resto | Preferência do usuário + testabilidade |
| 18/09/2026 | Modelagem em **dois níveis** (conceitual agora, detalhada por marco) | Evitar retrabalho |
| 18/09/2026 | Pasta raiz movida para **`C:\Projects\revoada`** | Nome da pasta igual ao do projeto |
| 21/09/2026 | Monorepo: **pnpm 12 + Node 24.21.0**, TypeScript 7 (`tsconfig.base.json` + `extends` por pacote), **Biome** (tabs, aspas duplas) e **Vitest 5** | Etapa 2 do M0 concluída |
| 21/09/2026 | Regra `noStaticOnlyClass` do Biome **desligada** | Convenção do projeto: classes estáticas para utilitários puros |
| 21/09/2026 | Testes **ao lado do código**, com sufixo `.test.ts`; arquivos em **PascalCase** com o nome da classe | Padronização |

---

## 15. Pendências e próximos passos

- [ ] Conferir **versão e volume** do container Postgres que já existe (caminho novo do PG 18).
- [ ] Decidir a ferramenta do monorepo (**pnpm workspaces + Turborepo ou Nx**).
- [ ] Confirmar **Vitest** e **Drizzle**.
- [ ] **Rascunhar as tabelas da identity** respondendo às 7 perguntas da seção 8.4 → enviar para revisão.
- [ ] Fazer a **prova de conceito de web components com Quasar** (M0).
- [ ] Escrever o **primeiro teste** (TDD) na `api-core`.
- [ ] Criar a pasta `docs/decisions` e registrar as primeiras ADRs.
- [ ] Verificar no INPI e em registros de domínio se o nome "Revoada" está disponível, e evitar "IF"/"IFSP" no nome sem autorização.
- [ ] Definir o nome do shell (sugestão: **Ninho**) e confirmar "penas" e os níveis com nomes de pássaros.
- [ ] Registrar as **horas por semana** para recalibrar o cronograma.

---

## 16. Referências

### Testes e TDD
- Kent Beck, *Test-Driven Development: By Example* (Addison-Wesley, 2002)
- Martin Fowler, "The Practical Test Pyramid": <https://martinfowler.com/articles/practical-test-pyramid.html>
- Documentação do Vitest: <https://vitest.dev/guide/>

### Banco de dados
- PostgreSQL 18, schemas: <https://www.postgresql.org/docs/18/ddl-schemas.html>
- PostgreSQL 18, funções UUID (`uuidv7`): <https://www.postgresql.org/docs/18/functions-uuid.html>
- Imagem Docker oficial do Postgres: <https://hub.docker.com/_/postgres>
- Drizzle ORM: <https://orm.drizzle.team/docs/overview>

### Microsserviços e mensageria
- Database per service: <https://microservices.io/patterns/data/database-per-service.html>
- API Gateway: <https://microservices.io/patterns/apigateway.html>
- Transactional outbox: <https://microservices.io/patterns/data/transactional-outbox.html>
- Redis Streams: <https://redis.io/docs/latest/develop/data-types/streams/>
- `http-proxy-middleware`: <https://github.com/chimurai/http-proxy-middleware>

### Autenticação
- JSON Web Key Set (RFC 7517): <https://datatracker.ietf.org/doc/html/rfc7517>
- JWT (RFC 7519): <https://datatracker.ietf.org/doc/html/rfc7519>
- Biblioteca `jose` (JWT/JWKS no Node): <https://github.com/panva/jose>

### Tempo real
- MDN, Server-Sent Events: <https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events>

### Front-end
- MDN, Web Components: <https://developer.mozilla.org/en-US/docs/Web/API/Web_components>
- Vue, Vue and Web Components: <https://vuejs.org/guide/extras/web-components>
- Quasar Framework: <https://quasar.dev>
- Module Federation para Vite: <https://github.com/module-federation/vite>

### S3
- Amazon S3, URLs pré-assinadas: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html>
- MinIO: <https://min.io/docs/minio/container/index.html>
- Cloudflare R2: <https://developers.cloudflare.com/r2/>

### Monorepo, TypeScript e ferramentas (M0 · etapa 2)
- pnpm: [Workspaces](https://pnpm.io/workspaces) · [Filtering](https://pnpm.io/filtering) · [Settings/`.npmrc`](https://pnpm.io/settings) · [Catalogs](https://pnpm.io/catalogs) · [Motivation](https://pnpm.io/motivation)
- ⭐ Matt Pocock, **The TSConfig Cheat Sheet**: <https://www.totaltypescript.com/tsconfig-cheat-sheet>
- Referência do TSConfig: <https://www.typescriptlang.org/tsconfig/>
- TypeScript, *Modules – Theory* (`module`, `moduleResolution`, `NodeNext`): <https://www.typescriptlang.org/docs/handbook/modules/theory.html>
- Node, ESM: <https://nodejs.org/api/esm.html> · *Determining module system*: <https://nodejs.org/api/packages.html#determining-module-system>
- Corepack (campo `packageManager`): <https://nodejs.org/api/corepack.html>
- Biome: <https://biomejs.dev/guides/getting-started/> · projetos grandes: <https://biomejs.dev/guides/big-projects/>
- Vitest: <https://vitest.dev/guide/> · configuração: <https://vitest.dev/config/>
- EditorConfig: <https://editorconfig.org>
- Conventional Commits (pt-BR): <https://www.conventionalcommits.org/pt-br/v1.0.0/>
- Versões do Node (qual é LTS): <https://nodejs.org/en/about/previous-releases>

### Modelagem de domínio (entidades × tabelas)
- Martin Fowler, "Anemic Domain Model": <https://martinfowler.com/bliki/AnemicDomainModel.html>
- Martin Fowler, "Repository": <https://martinfowler.com/eaaCatalog/repository.html>
- Martin Fowler, "Value Object": <https://martinfowler.com/bliki/ValueObject.html>
- Vaughn Vernon, *Domain-Driven Design Distilled* (Addison-Wesley, 2016)

### Vídeos
> 🇧🇷 = em português · 🇺🇸 = em inglês (o YouTube gera legendas automáticas em português).
> Organizados pelo marco em que cada tema passa a ser útil. Links conferidos em 18/09/2026.

**Canais para acompanhar (conteúdo contínuo)**
| Canal | Idioma | Por que seguir |
|---|---|---|
| [Rodrigo Branas](https://www.youtube.com/c/RodrigoBranas) | 🇧🇷 | TDD, Clean Code, Clean Architecture e DDD com **TypeScript e classes**. É o que mais se parece com o estilo da REVOADA |
| [Otavio Lemos](https://www.youtube.com/channel/UC9cOiXh-RFR7KI61KcyTb0g) | 🇧🇷 | Professor da UNIFESP. TDD e Clean Architecture em Node/TypeScript, com didática de sala de aula |
| [Full Cycle](https://www.youtube.com/@FullCycle/videos) | 🇧🇷 | Microsserviços, API Gateway, mensageria, Docker e arquitetura |
| [Hussein Nasser](https://www.youtube.com/@hnasr) | 🇺🇸 | Back-end "por baixo do capô": HTTP, proxies, SSE, Postgres, índices |

**M0/M1: TDD e testes**
- 🇺🇸 Ian Cooper, **"TDD, Where Did It All Go Wrong"** (DevTernity 2017, ~1 h). A palestra mais recomendada sobre *o que* testar. Explica por que testar comportamento e não implementação: <https://www.youtube.com/watch?v=EZ05e7EMOLM>
- 🇺🇸 **Kent Beck on Cannon TDD**: o criador do TDD explicando o fluxo "lista de testes → um teste → passar → refatorar": <https://www.youtube.com/watch?v=hrBnT8xVovk>
- 🇺🇸 Kent Beck e Dave Farley, **The Engineering Room Ep. 16**: conversa sobre a origem do TDD e dos frameworks de teste: <https://www.youtube.com/watch?v=guycIP56YeY>
- 🇺🇸 Web Dev Simplified, **Vitest Crash Course** (Frontend Masters, gratuito): <https://frontendmasters.com/tutorials/webdevsimplified/vitest-crash-course/>
- 🇧🇷 Rodrigo Branas, **Palestra Clean Architecture** (RogaDX 2024): <https://www.youtube.com/watch?v=uyhGnY9cC5s>
- 🇧🇷 **Live Coding com Rodrigo Branas: Clean Code e Clean Architecture** (mostra TDD na prática): <https://www.youtube.com/watch?v=XxRgKq8wA-Y>

**M1: modelagem de domínio (entidades, objetos de valor)**
- 🇺🇸 Eric Evans, **"What is DDD"** (DDD Europe 2019). O criador do DDD explicando o essencial: <https://www.youtube.com/watch?v=pMuiVlnGqjk>

**M1: autenticação (JWT)**
- 🇺🇸 Web Dev Simplified, **"What Is JWT and Why Should You Use JWT"** (curto e direto): <https://www.youtube.com/watch?v=7Q17ubqLfaM>

**M1: gateway e microsserviços**
- 🇧🇷 Full Cycle, **"O que é API Gateway?"**: <https://www.youtube.com/watch?v=2YNelyDZBDM>
- 🇺🇸 Sam Newman, **"Principles Of Microservices"** (autor do livro *Building Microservices*): <https://www.youtube.com/watch?v=PFQnNFe27kU>
- 🇺🇸 Sam Newman e Martin Fowler, **"When To Use Microservices (And When Not To!)"** (GOTO 2020): <https://www.youtube.com/watch?v=GBTdnfD6s5Q>

**M0/M2: web components**
- 🇺🇸 Traversy Media, **"Web Components Crash Course"**: Custom Elements, Shadow DOM e templates do zero: <https://www.youtube.com/watch?v=PCWaFLy3VUo>

**M2+: banco de dados**
- 🇺🇸 Hussein Nasser, **playlist de PostgreSQL** (índices, pool de conexões, particionamento): <https://www.youtube.com/playlist?list=PLQnljOFTspQWGrOqslniFlRcwxyY94cjj>

**M5/M6: eventos, broker e tempo real**
- 🇺🇸 Martin Fowler, **"The Many Meanings of Event-Driven Architecture"** (GOTO 2017, ~50 min). Diferencia *event notification*, *event-carried state transfer*, *event sourcing* e *CQRS*. A REVOADA usa o primeiro: <https://www.youtube.com/watch?v=STKCRSUsyP0> · notas escritas: <https://martinfowler.com/articles/201701-event-driven.html>
- 🇺🇸 Hussein Nasser, **Server-Sent Events Crash Course** (~30 min, compara SSE × WebSocket × long polling). Está no canal [@hnasr](https://www.youtube.com/@hnasr), com resumo em <https://hnasr.substack.com/p/server-sent-events-crash-course-694>

**M0 · etapa 2: monorepo, TypeScript, lint e Vitest**
- 🇧🇷 [Como configurar um monorepo do zero com pnpm workspaces + Turborepo](https://www.youtube.com/watch?v=s1l8xrI_FIQ) (nov/2025) — usa NestJS/Next.js: aproveitar a **estrutura da raiz**, ignorar a stack
- 🇺🇸 [Learn Monorepos From Scratch · pnpm Workspaces + Turborepo](https://www.youtube.com/watch?v=IC8K0JsF8fM)
- 🇺🇸 [PNPM Workspaces Deep Dive](https://www.youtube.com/watch?v=2cW7aQ7CQcA) (fev/2026)
- 🇧🇷 [Biome.js: o linter e formatter moderno que substitui ESLint e Prettier](https://www.youtube.com/watch?v=-iiXStbN8bw)
- 🇺🇸 [Lint & Format JavaScript with Biome](https://www.youtube.com/watch?v=KvIMe69XO00) · [I replaced my linting & formatting setup with Biome](https://www.youtube.com/watch?v=dY2kyNdVw_4)

**Ordem sugerida para começar (antes de codar o M0):**
1. Ian Cooper: o que testar.
2. Kent Beck on Cannon TDD: o fluxo.
3. Vitest Crash Course: a ferramenta.
4. Traversy: web components (para a prova de conceito).
5. Eric Evans: entidades e domínio (para o M1).
