# Documento Técnico – Plataforma de Geração Dinâmica de Relatórios

## 1. Visão Geral Técnica

A plataforma permite a criação de relatórios dinâmicos baseados em múltiplas fontes de dados, com possibilidade de inserção manual ou integração com uma IA de interpretação de linguagem natural. Os relatórios são montados de forma visual, com campos, tabelas, gráficos e filtros.

### Objetivos:

* Substituir ferramentas caras e engessadas como Stimulsoft, Metabase, etc.
* Permitir que qualquer usuário crie relatórios de forma simples e intuitiva.
* Exportar relatórios com fidelidade visual para PDF.
* Acessar relatórios de forma pública via link compartilhável.

---

## 2. Stack Tecnológica

| Camada         | Tecnologia                        |
| -------------- | --------------------------------- |
| Frontend       | React com Material UI             |
| Backend        | Node.js (NestJS ou Express)       |
| Banco de Dados | PostgreSQL                        |
| Autenticação   | JWT com autenticação em 2 fatores |
| PDF Export     | Puppeteer ou WeasyPrint           |
| Containers     | Docker                            |
| Deploy         | Jenkins CI/CD + Docker Compose    |

---

## 3. Arquitetura Geral

* **Frontend**: SPA em React. Comunicação com backend via REST. Layout drag-and-drop para montagem dos relatórios.
* **Backend**: API RESTful. Gerencia usuários, modelos de relatórios, permissões, armazenamento de relatórios gerados e exportações.
* **Database**: Armazena metainformações sobre relatórios, usuários, permissões e logs.
* **Exportação PDF**: Renderização headless do relatório e conversão fiel para PDF.
* **IA (futuro)**: Interpretação de linguagem natural e geração automatizada de relatórios.

---

## 4. Estrutura de Pastas Padrão

```bash
/frontend
/backend
/tasks
/rules
/docs
├── techspec.md
├── context.md
├── kanban.md
```

---

## 5. Padrões e Convenções

### Backend

* Padrão MVC
* Arquivos em TypeScript
* DTOs para todas as entradas de API
* Respostas no padrão JSON API
* Autenticação com middleware JWT + verificação TOTP

### Frontend

* Componentização via Material UI
* Controle de estado com Context API ou Zustand
* Formulários com `react-hook-form`

### Infraestrutura

* Um container por serviço (`frontend`, `backend`, `db`, `jenkins`)
* `.env` compartilhado entre backend e frontend via volume Docker
* Deploys baseados em branch (`homologacao`, `producao`)

---

## 6. Especificações por Módulo

### Usuários

* Cadastro, login, autenticação 2FA
* Perfis com permissões

### Relatórios

* Criar modelo de relatório via editor visual
* Adicionar campos, gráficos e filtros dinamicamente
* Salvar rascunhos e versões publicadas

### Exportação

* Botão “Exportar como PDF” no frontend
* Endpoint de exportação no backend
* Manutenção de estilo CSS no arquivo PDF

### Compartilhamento

* Gerar link público de acesso
* Endpoint: `/public/:reportId`

---

## 7. Boas Práticas e Requisitos Não-Funcionais

* Todos os métodos devem gerar logs de erro centralizados
* Dados sensíveis (ex: senhas, tokens) não são armazenados em logs
* Desempenho mínimo aceitável para exportação: < 5s
* Relatórios devem ser renderizados de forma idêntica em tela e PDF
* Testes automatizados com cobertura mínima de 70%

---

## 8. Futuras Expansões

* Integração com IA para análise de linguagem natural
* Templates prontos por setor (financeiro, RH, etc.)
* Automações baseadas em eventos (ex: enviar relatório por e-mail toda sexta)

---

Este documento serve como referência principal para implementação do sistema. Atualizações futuras devem manter a estrutura e serem versionadas.
