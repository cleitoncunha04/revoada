<div align="center">

# 🪶 REVOADA

**Ensino público, gratuito e de qualidade. Para todo mundo.**

Plataforma aberta e gamificada em que professores do IFSP publicam seus materiais de ensino
e qualquer pessoa pode estudar, seguir trilhas de aprendizagem e colocar os conhecimentos à prova.

![Status](https://img.shields.io/badge/status-M0%20·%20fundação-yellow)
![Node](https://img.shields.io/badge/node-24.21.0-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)
![Licença](https://img.shields.io/badge/licença-MIT-blue)

</div>

---

## 📖 Sobre o projeto

A REVOADA é a evolução do **[BIRD](https://github.com/cleitoncunha04/bird)** (*Base Institucional de Recursos Didáticos*), meu Trabalho de Conclusão de Curso em Análise e Desenvolvimento de Sistemas no **IFSP Campus Capivari (2024)**.

O BIRD era um repositório de materiais acadêmicos **restrito aos professores do campus**. A REVOADA amplia essa ideia: hoje só tem acesso ao ensino do instituto quem passa no processo seletivo, e a proposta é **abrir esse conteúdo para qualquer pessoa**, como um "cursinho" gratuito, construído voluntariamente pelos professores.

> **Por que "Revoada"?** O BIRD era um pássaro só. Uma revoada é o bando inteiro voando junto: professores e alunos construindo conhecimento coletivamente.

Este é um **projeto de estudo**. Além de entregar a plataforma, o objetivo é praticar arquitetura de microsserviços, web components, TDD e boas práticas de engenharia de software.

---

## ✨ Funcionalidades

### Para quem estuda
- 📚 **Conteúdo organizado:** áreas do conhecimento → disciplinas → unidades → tópicos, com videoaulas, apresentações, artigos e exercícios.
- 🧭 **Trilhas de aprendizagem:** uma ordem sugerida pelos professores (ex.: somar antes de multiplicar). Os pré-requisitos são **recomendações, não bloqueios**.
- 📝 **Testes:** por habilidade (ex.: *Termodinâmica, 20 questões, 60 min*), por disciplina ou simulados gerais. Também dá para **montar o próprio teste**.
- 🕸️ **Aptidões:** um card inspirado nos cards do FIFA, com um **hexágono de aptidões** (0 a 100 por área) e o detalhamento de cada disciplina (ex.: *Física 86 = MRU 100 + … + Espelhos 52*).
- 🔥 **Gamificação:** penas (pontos), níveis, sequência de estudos, missões diárias, semanais e mensais, e conquistas.

### Para quem ensina
- 🎓 Criação de disciplinas, unidades e tópicos, com um editor de trilha.
- ☁️ Publicação de materiais com **licença explícita** (Creative Commons recomendada).
- ❓ Banco de questões marcadas por habilidade, com explicação para a revisão do aluno.

### Princípio de gamificação
> **Constância supera talento.** A pontuação premia a **frequência** de estudo, nunca a nota.
> Terminar um teste sempre vale penas, seja qual for o resultado, para não desestimular quem ainda está construindo a própria base.

---

## 🛠️ Tecnologias

| Camada | Tecnologias |
|---|---|
| **Back-end** | Node.js 24 · TypeScript · Express · arquitetura de microsserviços com API Gateway |
| **Banco de dados** | PostgreSQL 18 (um schema por serviço) · Drizzle ORM |
| **Mensageria / cache** | Redis (Redis Streams) |
| **Arquivos** | Amazon S3 (MinIO no desenvolvimento), com upload por URL pré-assinada |
| **Front-end** | Quasar (Vue 3, Composition API) · Web Components · micro-frontends |
| **Testes** | Vitest · TDD |
| **Monorepo** | pnpm workspaces · Turborepo |
| **Infraestrutura** | Docker · GitHub Actions |

---

## 🏗️ Arquitetura

```
APP HUB (navegador)  ──HTTPS──▶  API HUB (gateway)  ──proxy──▶  microsserviços
        ▲                              │                         identity · catalog · media
        └────────── SSE ───────────────┘                         progress · assessment · skills
                                                                  gamification · moderation
                                                                        │
                                              PostgreSQL 18 (schema por serviço)
                                              Redis Streams (eventos entre serviços)
```

- **API HUB:** ponto único de entrada. Faz o proxy, valida o JWT (chave pública via JWKS) e envia notificações ao navegador por **SSE**.
- **API Identity:** única dona da chave privada. Assina os tokens.
- **Serviços independentes:** cada um com o próprio schema no banco. Eles se comunicam por **eventos** (Redis Streams), nunca lendo as tabelas uns dos outros.
- **Arquivos:** o navegador envia e baixa direto do S3, com URLs pré-assinadas. Arquivos grandes nunca passam pelo gateway.

📐 O diagrama completo está em [`mockups/arquitetura-api.html`](mockups/arquitetura-api.html), e todas as decisões estão em [`docs/REVOADA-decisoes.md`](docs/REVOADA-decisoes.md).

---

## 📂 Estrutura do repositório

> 🚧 Em construção. Esta é a estrutura **planejada**, que está sendo montada no marco M0.

```
revoada/
├─ apps/
│  ├─ api-gateway/          # API HUB (proxy, JWT, SSE)
│  ├─ api-identity/         # cadastro, login, papéis, JWKS
│  ├─ api-*/                # demais microsserviços
│  ├─ web-hub/              # APP HUB (shell Quasar)
│  └─ wc-*/                 # web components por domínio
├─ packages/
│  ├─ api-core/             # utilitários da API (erros, relógio, banco, eventos)
│  ├─ wc-core/              # utilitários dos web components (event bus, estado)
│  ├─ ui/                   # componentes visuais compartilhados
│  └─ contracts/            # tipos, schemas e eventos compartilhados
├─ docs/                    # decisões do projeto e ADRs
└─ mockups/                 # protótipos das telas em HTML estático
```

---

## 🚀 Como executar

### Pré-requisitos
- **Node.js 24.21.0** (a versão está no [`.nvmrc`](.nvmrc))
- **pnpm** (ativado pelo Corepack)
- **Docker** e Docker Compose

### Protótipos das telas (disponível agora)
Os mockups são páginas estáticas que mostram como o produto final deve ficar:

```bash
node mockups/serve.mjs
```

Depois, acesse **http://localhost:5500**. O `index.html` é um mapa com todas as telas.

### Aplicação
> 🚧 As instruções de instalação e execução serão adicionadas ao final do marco M0.

---

## 🗺️ Roadmap

| Marco | Entrega | Previsão | Status |
|---|---|---|---|
| **M0 · Fundação** | Monorepo, libs, Docker, CI, prova de conceito de web components | out/2026 | 🟡 Em andamento |
| **M1 · Identidade** | Gateway, cadastro, login, papéis e aprovação de professor | nov/2026 | ⚪ Planejado |
| **M2 · BIRD refeito** | Disciplinas, tópicos, upload de materiais, estúdio do professor | fev/2027 | ⚪ Planejado |
| **M3 · Trilhas** | Pré-requisitos, progresso, telas de trilha e aula | mar/2027 | ⚪ Planejado |
| **M4 · Testes** | Banco de questões, testes com timer, correção e resultado | mai/2027 | ⚪ Planejado |
| **M5 · Aptidões** | Eventos entre serviços, cálculo das aptidões, card e hexágono | jun/2027 | ⚪ Planejado |
| **M6 · Gamificação** | Penas, níveis, sequência, missões e conquistas | jul/2027 | ⚪ Planejado |
| **M7 · Produção** | Moderação, administração e deploy | ago/2027 | ⚪ Planejado |

O plano detalhado de cada marco está em [`docs/REVOADA-decisoes.md`](docs/REVOADA-decisoes.md#12-cronograma-e-marcos).

---

## 📚 Documentação

- [**Decisões do projeto**](docs/REVOADA-decisoes.md): visão, arquitetura, banco de dados, convenções, cronograma, riscos e referências.
- [**Diagrama da arquitetura**](mockups/arquitetura-api.html)
- [**Mapa de telas (mockups)**](mockups/index.html)
- `docs/decisions/`: registros de decisões de arquitetura (ADRs). *Em breve.*

---

## 🎓 Origem acadêmica

- **Projeto original:** [BIRD: Sistema Web para o compartilhamento de materiais acadêmicos entre docentes do IFSP Campus Capivari](https://github.com/cleitoncunha04/bird)
- **Instituição:** Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, Campus Capivari
- **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas
- **Orientador:** Prof. Rafael Wendel Pinheiro · **Coorientador:** Prof. Waldo Luis de Lucca

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE).

Os **materiais de ensino** publicados na plataforma seguem a licença escolhida por cada professor (ex.: Creative Commons BY-NC-SA 4.0).

---

<div align="center">

Feito por **[Cleiton dos Santos Cunha](https://github.com/cleitoncunha04)**

</div>
