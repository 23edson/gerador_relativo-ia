# Backlog Desenvolvimento

Este arquivo define as principais tarefas iniciais para transformar o contexto do projeto em um sistema funcional. As tarefas estão agrupadas por áreas e ordenadas por prioridade sugerida.

---

## Infraestrutura e Setup Inicial

### `infra/setup-projeto`

- [ ] Criar estrutura de diretórios: `frontend/`, `backend/`, `database/`, `docs/`
- [ ] Adicionar `context.md` ao repositório
- [ ] Criar `.gitignore`, `README.md`, `Makefile` (opcional)

### `infra/docker`

- [ ] Criar `Dockerfile` para frontend (React)
- [ ] Criar `Dockerfile` para backend (FastAPI)
- [ ] Criar `docker-compose.yml` com serviços: frontend, backend, PostgreSQL
- [ ] Definir volumes, redes e variáveis de ambiente

---

## Frontend (React + Tailwind)

### `frontend/layout-base`

- [ ] Criar layout inicial com Header, Sidebar e área de trabalho
- [ ] Incluir TailwindCSS com Shadcn, Zustand para estado global, react-router

### `frontend/report-builder`

- [ ] Implementar componente drag-and-drop para montagem de relatórios
- [ ] Permitir seleção de colunas, filtros e agrupamentos

### `frontend/report-preview`

- [ ] Criar componente de preview dinâmico com dados simulados (mock)
- [ ] Suporte a tabelas e gráficos interativos

### `frontend/export-pdf`

- [ ] Adicionar botão para exportação de relatório em PDF (chama backend)

---

## Backend (FastAPI)

### `backend/setup-base`

- [ ] Criar estrutura inicial com FastAPI e SQLAlchemy
- [ ] Criar endpoint `/health` para teste
- [ ] Configurar estrutura de rotas, serviços e repositórios

### `backend/csv-connector`

- [ ] Criar classe conector `CSVConnector` que retorna DataFrame
- [ ] Criar endpoint `POST /report/csv` que aceita arquivo CSV e retorna JSON com preview de dados

### `backend/pdf-service`

- [ ] Criar endpoint `POST /report/pdf` que recebe dados e retorna PDF (usando WeasyPrint ou Puppeteer)

### `backend/pipeline-basico`

- [ ] Criar serviço que executa pipeline: ingestão → transformação → resposta JSON
- [ ] Iniciar com filtros simples e agrupamento via Pandas

### `backend/nlp-parser`

- [ ] Protótipo inicial com spaCy para interpretar queries como texto
- [ ] Converter para comandos estruturados (dataset, agrupamento, filtro)

---

## Banco de Dados (PostgreSQL)

### `db/models-iniciais`

- [ ] Criar modelo `ReportTemplate`: nome, descrição, estrutura JSON
- [ ] Criar modelo `ReportInstance`: timestamp, dados gerados, link do PDF (opcional)
- [ ] Criar `init.sql` para carga inicial

---

## Testes

### `test/backend`

- [ ] Criar testes com Pytest para:

  - [ ] CSVConnector
  - [ ] Endpoint `/report/csv`
  - [ ] Pipeline de dados

### `test/frontend`

- [ ] Criar testes com Jest/React Testing Library para:

  - [ ] ReportBuilder
  - [ ] Preview de relatórios
  - [ ] Botão de exportação

---

## Tarefas Futuras (Próximas Iterações)

- [ ] Conectores adicionais: XLSX, API JSON, PostgreSQL
- [ ] Autenticação de usuários (JWT ou OAuth2)
- [ ] Modo colaborativo: compartilhamento de relatórios
- [ ] Agendamento de exportações e envio por e-mail
- [ ] Interface para salvar modelos de relatório