# Contexto do Projeto

## Contexto e Visão Geral

Este projeto tem como objetivo o desenvolvimento de uma aplicação web voltada à geração de relatórios dinâmicos e personalizados. A ferramenta será capaz de integrar múltiplas fontes de dados, incluindo arquivos CSV, planilhas XLSX, APIs JSON e bancos de dados PostgreSQL.

A aplicação será usada para facilitar a análise e visualização de dados por meio de relatórios interativos, responsivos e exportáveis, permitindo que usuários configurem visualmente o conteúdo e a estrutura dos relatórios com alto nível de personalização.

## O Problema

Atualmente, muitas organizações enfrentam dificuldades para gerar relatórios personalizados com flexibilidade e baixo custo. As ferramentas comerciais disponíveis no mercado, embora robustas, possuem preços elevados que inviabilizam seu uso em larga escala, especialmente por pequenas e médias empresas. Por outro lado, as soluções open-source existentes são frequentemente limitadas em funcionalidade, usabilidade e integração com múltiplas fontes de dados.

Esse cenário cria uma lacuna para ferramentas acessíveis, versáteis e adaptáveis a diferentes contextos de negócio, capazes de oferecer recursos avançados de visualização e personalização de relatórios sem custo elevado ou barreiras técnicas.

## Objetivos e Resultados Esperados

O principal objetivo do projeto é oferecer uma ferramenta acessível e versátil para criação de relatórios dinâmicos, com recursos similares aos encontrados em plataformas como o Stimulsoft Reports. A aplicação deve permitir ao usuário montar relatórios personalizados com facilidade, conectando diferentes fontes de dados e ajustando o conteúdo visual conforme suas necessidades.

## Objetivos específicos:

- Permitir a construção visual e interativa de relatórios com múltiplos tipos de dados.

- Garantir flexibilidade no design, filtros, agrupamentos e visualizações (gráficos, tabelas, etc).

- Oferecer uma alternativa mais acessível e aberta em relação às soluções comerciais.

- Possibilitar exportação dos relatórios em formatos compatíveis (ex: PDF com fidelidade de layout).

## Resultados esperados:

- Ferramenta funcional e estável para uso em diferentes contextos de negócio.

- Redução da dependência de ferramentas pagas.

- Ganho de produtividade na criação de relatórios.

- Facilidade de uso mesmo para usuários não técnicos.


## Escopo e Principais Funcionalidades

A aplicação terá como foco principal a criação de relatórios dinâmicos e personalizáveis, acessíveis a partir de diferentes fontes de dados. O escopo inicial contempla:

## Funcionalidades principais:

- Integração com múltiplas fontes de dados: CSV, XLSX, API JSON, bancos PostgreSQL e também uma fonte baseada em IA capaz de interpretar consultas em linguagem natural e transformar em dados estruturados.

- Montagem visual do relatório: seleção de colunas, filtros, agrupamentos, tipos de visualização (gráficos, tabelas, etc).

- Visualização responsiva e interativa dos relatórios.

- Exportação de relatórios em PDF, com fidelidade ao layout configurado.

## Fora do escopo (nesta primeira versão):

- Autenticação de usuários.

- Funcionalidades colaborativas (edição simultânea ou compartilhamento de relatórios).

- Agendamento ou envio automático de relatórios.

- Integrações com fontes de dados adicionais (como MongoDB ou Google Sheets).

O objetivo é desenvolver uma aplicação web que permita gerar relatórios dinâmicos e personalizados a partir de múltiplas fontes de dados.


## Objetivos Específicos (refinados)

- Desenvolver uma interface visual intuitiva para montagem de relatórios com suporte a filtros, agrupamentos e visualizações gráficas.

- Implementar conectores modulares para ingestão de dados de múltiplas fontes (CSV, XLSX, API JSON, PostgreSQL).

- Garantir exportação de relatórios em PDF com fidelidade ao layout configurado.

- Criar um mecanismo de interpretação de linguagem natural para geração de relatórios a partir de comandos textuais.

- Validar usabilidade com usuários não técnicos por meio de testes de uso e feedback iterativo.


## Arquitetura Técnica

1.Frontend (SPA - Single Page Application)

- Tecnologias: React + Tailwind + Zustand + Shadcn

- Interface para construção visual dos relatórios (drag-and-drop)

- Configuração de filtros, agrupamentos, visualizações

- Preview interativo

- Exportação via requisição para API

2.Backend (API Gateway + Orquestração)

- Tecnologias: FastAPI + SQLAlchemy + Pandas

- Orquestra o pipeline de criação de relatórios

- Integração com conectores de dados

- Aplicação de regras de transformação

- Geração de dados para visualização/exportação

- Interpretação de linguagem natural via módulo NLP

3.Conectores de Dados (Módulos Independentes)

- Tecnologia: Python (por tipo de fonte)

- Classes que tratam a extração de dados de: CSV, XLSX, PostgreSQL, APIs, etc.

- Interface padronizada (IDataConnector)

4.Módulo NLP (Natural Language Processing)

- Tecnologias: spaCy, transformers (opcional)

- Interpreta comandos como: "Mostrar vendas por mês do último trimestre"

- Converte comandos textuais em queries estruturadas

5.Serviço de Geração de PDF

- Tecnologias: WeasyPrint ou Puppeteer

- Recebe HTML + dados e retorna PDF com fidelidade visual

- Pode ser implementado como microserviço separado

6.Banco de Dados

- Tecnologia: PostgreSQL

- Armazena configurações de relatórios, cache, histórico

- Futuro suporte a controle de acesso e permissões

7.Pipeline de Dados (Ingestão → Transformação → Visualização/Exportação)

- Ingestão: via conector (retorna DataFrame)

- Transformação: aplicação de regras, agrupamentos, filtros

- Visualização: gera estrutura de dados para o frontend

- Exportação: opcional, PDF ou outro formato

8.Infraestrutura

- Docker + Docker Compose

- Nginx (reverse proxy)

- Gunicorn/Uvicorn (FastAPI)

- Volume compartilhado para PDFs

- CI/CD com GitHub Actions ou Jenkins

## Abordagem Técnica
- Modularidade: cada fonte de dados será tratada por um conector independente, facilitando futuras expansões.

- Pipeline de dados: ingestão → transformação → visualização/exportação.

- Configuração visual: interface baseada em componentes drag-and-drop para montar relatórios.

- Responsividade: design adaptável para desktop e mobile.

- Internacionalização: suporte a múltiplos idiomas (se for relevante para o público-alvo).

## Dependências e Ferramentas
- Frontend: React, Tailwind, Zustand (gerenciamento de estado)

- Backend: FastAPI, SQLAlchemy, Pandas

- PDF: WeasyPrint (mais integrado com HTML/CSS) ou Puppeteer (mais flexível com JS)

- Gráficos: Plotly (mais poderoso) ou Chart.js (mais leve)

- NLP: spaCy, transformers (se quiser algo mais avançado)

- Testes: Pytest (backend), Jest (frontend)

## Observações Gerais
- A ausência de autenticação na primeira versão é compreensível, mas vale prever uma arquitetura que permita adicionar isso facilmente depois.

- A funcionalidade de IA para interpretar linguagem natural pode ser um diferencial competitivo — talvez valha priorizar isso como MVP.

- A exportação em PDF com fidelidade ao layout é um desafio técnico importante. Testar com diferentes ferramentas desde o início pode evitar retrabalho.
