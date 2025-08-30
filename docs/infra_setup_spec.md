# Especificação Técnica – Infraestrutura do Projeto

## 1. Visão Geral

Este documento detalha a estrutura inicial de diretórios, arquivos de configuração e as tecnologias padrão para o projeto de geração de relatórios, conforme a Task 1. O objetivo é estabelecer uma base sólida, consistente e alinhada com as regras de desenvolvimento definidas.

Esta especificação prevalece sobre informações conflitantes em outros documentos mais antigos.

## 2. Stack Tecnológica Oficial

| Camada | Tecnologia | Framework/Libs | Gerenciador de Pacotes/Build |
| :--- | :--- | :--- | :--- |
| **Frontend** | TypeScript | React, Tailwind CSS, Zustand | npm/yarn |
| **Backend** | Python | FastAPI, SQLAlchemy, Pydantic | pip |
| **Banco de Dados** | PostgreSQL | - | Alembic (Migrations) |
| **Testes** | - | Jest (Frontend), Pytest (Backend) | - |
| **Contêineres** | Docker | Docker Compose | - |

## 3. Estrutura de Diretórios

A estrutura de pastas principal foi organizada para separar claramente as responsabilidades do frontend e do backend.

```bash
/projeto-relatorios
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── connectors/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── services/
│   ├── migrations/  # Para Alembic
│   ├── tests/
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── .eslintrc.json
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── docs/
│   ├── context.md
│   ├── infra_setup_spec.md  # Este documento
│   └── ...
├── rules/
│   └── ...
├── tasks/
│   └── ...
├── .gitignore
├── Makefile
└── README.md
```

### Justificativa da Estrutura:

*   **`backend/`**: Contém a aplicação FastAPI.
    *   **`app/`**: Código-fonte da aplicação, seguindo a separação de responsabilidades ditada pelas regras (`routers`, `services`, `repositories`, etc.).
    *   **`migrations/`**: Diretório gerenciado pelo Alembic para versionamento do schema do banco de dados.
    *   **`tests/`**: Testes unitários e de integração para o backend com Pytest.
*   **`frontend/`**: Contém a aplicação React (SPA).
    *   **`src/`**: Código-fonte do frontend, com subdiretórios para componentes, hooks, páginas e serviços, conforme as regras.
*   **`database/`**: Este diretório foi omitido em favor da pasta `backend/migrations/` para centralizar a lógica de banco de dados junto à aplicação que a consome, seguindo as práticas recomendadas para frameworks com ORM e ferramentas de migration.

## 4. Arquivos de Configuração

*   **`.gitignore`**: Configurado para ignorar arquivos e pastas comuns de projetos Python (`__pycache__`, `.venv`) e Node.js (`node_modules`, `build`).
*   **`Makefile`**: Fornece comandos de atalho para simplificar o desenvolvimento.
    *   `make install`: Instala as dependências do backend e frontend.
    *   `make run-dev`: Inicia os servidores de desenvolvimento de ambas as aplicações.
    *   `make test`: Executa as suítes de testes.
*   **`requirements.txt`**: Lista as dependências Python para o backend.
*   **`package.json`**: Lista as dependências JavaScript/TypeScript para o frontend.

## 5. Próximos Passos

Com esta infraestrutura base, os próximos passos definidos no Kanban (`docs/kanban.md`) podem ser iniciados, como a implementação dos conectores de dados no backend e a criação dos componentes de UI no frontend.
