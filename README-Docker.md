# Docker - Plataforma de Relatórios

## Visão Geral

Este projeto utiliza Docker para containerizar todas as aplicações, facilitando o desenvolvimento, teste e deployment da plataforma de geração de relatórios dinâmicos.

## Arquitetura dos Containers

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (Database)    │
│   Porta: 3000   │    │   Porta: 8000   │    │   Porta: 5432   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Redis         │
                    │   (Cache)       │
                    │   Porta: 6379   │
                    └─────────────────┘
```

## Serviços

### 1. Frontend (React)
- **Porta**: 3000 (dev) / 80 (prod)
- **Tecnologia**: React + TypeScript + Tailwind CSS
- **Build**: Multi-stage com Nginx para produção

### 2. Backend (FastAPI)
- **Porta**: 8000
- **Tecnologia**: FastAPI + Python 3.11 + Poetry
- **Build**: Multi-stage otimizado para produção

### 3. PostgreSQL
- **Porta**: 5432
- **Versão**: 15-alpine
- **Persistência**: Volume Docker local
- **Health Check**: Automático

### 4. Redis (Opcional)
- **Porta**: 6379
- **Versão**: 7-alpine
- **Uso**: Cache e sessões

## Comandos Básicos

### Desenvolvimento
```bash
# Iniciar todos os serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down
```

### Produção
```bash
# Usar configuração de produção
docker-compose -f docker-compose.prod.yml up -d

# Rebuild das imagens
docker-compose -f docker-compose.prod.yml up --build -d
```

### Manutenção
```bash
# Rebuild de um serviço específico
docker-compose build frontend

# Executar comando em container específico
docker-compose exec backend python manage.py migrate

# Ver status dos serviços
docker-compose ps

# Limpar volumes (CUIDADO: perde dados)
docker-compose down -v
```

## Variáveis de Ambiente

### Desenvolvimento
- `ENVIRONMENT=development`
- `DEBUG=true`
- `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/relatorios_db`

### Produção
- `ENVIRONMENT=production`
- `DEBUG=false`
- `SECRET_KEY=<chave-secreta-forte>`
- `POSTGRES_PASSWORD=<senha-forte>`

## Volumes e Persistência

### Volumes Criados
- `postgres_data`: Dados do PostgreSQL
- `redis_data`: Dados do Redis
- `./frontend:/app`: Código fonte do frontend (dev)
- `./backend:/app`: Código fonte do backend (dev)

### Backup
```bash
# Backup do banco
docker-compose exec postgres pg_dump -U postgres relatorios_db > backup.sql

# Restore do banco
docker-compose exec -T postgres psql -U postgres relatorios_db < backup.sql
```

## Redes

### Rede Padrão
- **Nome**: `app-network`
- **Subnet**: `172.20.0.0/16`
- **Driver**: Bridge

### Comunicação
- Todos os serviços estão na mesma rede
- Comunicação via nomes dos serviços
- Isolamento do host

## Troubleshooting

### Problemas Comuns

#### 1. Porta já em uso
```bash
# Verificar portas em uso
netstat -tulpn | grep :3000

# Parar serviço conflitante ou alterar porta no docker-compose.yml
```

#### 2. Container não inicia
```bash
# Ver logs do container
docker-compose logs frontend

# Verificar dependências
docker-compose ps
```

#### 3. Problemas de permissão
```bash
# Ajustar permissões dos volumes
sudo chown -R $USER:$USER ./frontend ./backend
```

#### 4. Limpeza completa
```bash
# Parar e remover tudo
docker-compose down -v --remove-orphans

# Limpar imagens não utilizadas
docker system prune -a
```

## Performance

### Otimizações Implementadas
- Multi-stage builds
- Alpine Linux (imagens menores)
- Health checks
- Volumes otimizados
- Compressão gzip no nginx

### Monitoramento
```bash
# Ver uso de recursos
docker stats

# Ver logs em tempo real
docker-compose logs -f --tail=100
```

## Segurança

### Boas Práticas
- Usuário não-root nos containers
- Health checks para validação
- Headers de segurança no nginx
- Isolamento de rede
- Variáveis de ambiente para secrets

### Para Produção
- Usar secrets do Docker ou variáveis de ambiente
- Configurar SSL/TLS
- Implementar rate limiting
- Configurar firewall
- Logs centralizados

## Próximos Passos

1. **CI/CD**: Implementar pipeline com GitHub Actions
2. **Monitoramento**: Adicionar Prometheus + Grafana
3. **Logs**: Centralizar logs com ELK Stack
4. **Backup**: Automatizar backups do banco
5. **Scaling**: Preparar para Kubernetes
