## Regras de Padrão para Banco de Dados

### 1. Banco de Dados Utilizado

PostgreSQL (versão mínima recomendada: 13+)

### 2. Modelagem e Nomeação
Nomes de Tabelas e Colunas

Usar nomes em minúsculo e snake_case.

Exemplo: user_reports, report_template_fields

Nomes devem ser semânticos e descritivos, mesmo que longos.

Evitar abreviações como usr, tmp, cfg.

Chaves primárias

Sempre usar campo id SERIAL PRIMARY KEY ou UUID (se precisar de geração distribuída).

Evitar chaves compostas.

Chaves estrangeiras

Nome padrão: nome_tabela_origem_id

Exemplo: report_template_id, user_id

Todas devem ter ON DELETE CASCADE quando aplicável.

### 3. Padrões de Colunas Comuns
Nome	Tipo	Observações
id	SERIAL ou UUID	Chave primária
created_at	TIMESTAMP	DEFAULT NOW()
updated_at	TIMESTAMP	Atualizado via trigger ou aplicação
deleted_at	TIMESTAMP	Para soft delete
is_active	BOOLEAN	Controle de ativação lógica

### 4. Migrations

Usar ferramenta de versionamento de migrations, como:

Python: Alembic

Node.js: Sequelize, Knex.js ou Prisma Migrate

Toda alteração de schema deve ser feita via migration.

Cada migration deve ter nome claro, com prefixo de data:

2025_08_20_create_user_table.sql

### 5. Integridade e Restrições

Definir NOT NULL onde aplicável.

Usar CHECK, UNIQUE, ENUM quando apropriado.

Aplicar FOREIGN KEY sempre que houver relacionamento entre tabelas.

Usar INDEX em colunas frequentemente filtradas ou ordenadas.

### 6. Relações

1:N: usar FK na tabela N (ex: cada relatório pertence a um usuário).

N:N: usar tabelas de junção com nomes compostos (ex: user_roles, report_tags).

Todas as tabelas de junção devem ter created_at.

### 7. Performance

Usar INDEX em:

Campos de busca (ex: email, username, title)

FKs

Campos usados em ordenação ou filtros frequentes

Avaliar uso de GIN/GiST para buscas em JSON ou texto.

### 8. Boas Práticas

Nunca usar SELECT * em produção.

Evitar NULL desnecessário (use defaults).

Padronizar o uso de ENUM para campos com poucos valores fixos (ex: status, tipo).

### 9. Dump e Restore

Dump com:

pg_dump -Fc -f dump_file.dump nome_banco


Restore com:

pg_restore -C -d postgres dump_file.dump