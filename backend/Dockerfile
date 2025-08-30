# Dockerfile para Backend FastAPI
# Multi-stage build para otimização

# Stage 1: Dependencies
FROM python:3.11-slim AS deps

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar Poetry
RUN pip install poetry

# Configurar Poetry para não criar ambiente virtual
RUN poetry config virtualenvs.create false

# Copiar arquivos de dependências
COPY pyproject.toml poetry.lock ./

# Instalar dependências
RUN poetry install --no-dev --no-interaction --no-ansi

# Stage 2: Production
FROM python:3.11-slim AS production

# Instalar dependências do sistema para runtime
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Criar usuário não-root
RUN useradd --create-home --shell /bin/bash app

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências instaladas
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# Copiar código fonte
COPY --chown=app:app . .

# Mudar para usuário não-root
USER app

# Expor porta 8000
EXPOSE 8000

# Comando para produção
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# Stage 3: Development
FROM python:3.11-slim AS development

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar Poetry
RUN pip install poetry

# Configurar Poetry para não criar ambiente virtual
RUN poetry config virtualenvs.create false

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY pyproject.toml poetry.lock ./

# Instalar todas as dependências (incluindo dev)
RUN poetry install --no-interaction --no-ansi

# Copiar código fonte
COPY . .

# Expor porta 8000
EXPOSE 8000

# Comando para desenvolvimento
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
