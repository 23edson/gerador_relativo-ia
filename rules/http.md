## 1. Padrão de Comunicação

A comunicação entre frontend e backend será feita exclusivamente via HTTP(S) com payloads em JSON.

As respostas da API devem seguir o padrão:

{
  "success": true,
  "data": {...},
  "message": "Operação realizada com sucesso"
}

Em caso de erro:

{
  "success": false,
  "error": "Mensagem de erro",
  "code": "ERR_EXEMPLO"
}

## 2. Status Codes HTTP

200 OK: Requisição bem-sucedida.

201 Created: Recurso criado com sucesso.

400 Bad Request: Erro do cliente (validação, dados malformados).

401 Unauthorized: Autenticação necessária ou inválida.

403 Forbidden: Acesso negado.

404 Not Found: Recurso não encontrado.

500 Internal Server Error: Erro inesperado no servidor.

## 3. Rotas RESTful

Use padrão REST sempre que possível:

GET /reports: lista de relatórios

POST /reports: cria novo relatório

GET /reports/{id}: detalhe de relatório

PUT /reports/{id}: atualiza relatório

DELETE /reports/{id}: remove relatório

## 4. Timeouts e Retentativas

Todas as chamadas HTTP no frontend devem ter timeout padrão de 10 segundos.

Requisições críticas podem implementar retry com backoff exponencial (ex: consultas de dados grandes ou chamadas para a IA).

## 5. Erros e Feedback ao Usuário

O frontend deve sempre tratar erros da API e exibir mensagens amigáveis ao usuário.

Logs técnicos devem ser capturados em background para diagnóstico, mas não exibidos diretamente.

## 6. Controle de Erros no Backend

O backend deve centralizar o tratamento de exceções com handlers globais.

Sempre que possível, retornar códigos e mensagens claras e documentadas.

## 7. Headers Obrigatórios

Requisições devem incluir:

Content-Type: application/json

(Futuramente) Authorization: Bearer <token> para endpoints autenticados

## 8. Paginação e Filtros

Para listas grandes, usar parâmetros:

GET /reports?page=1&limit=20

GET /reports?filter[name]=vendas&filter[year]=2024

O backend deve retornar metadados de paginação:

{
  "data": [...],
  "meta": {
    "page": 1,
    "total_pages": 5,
    "total_items": 100
  }
}

## 9. Padronização de Endpoints

Todos os endpoints devem estar sob o prefixo de versão:

Ex: /api/v1/reports

Evitar abreviações ou nomes genéricos. Usar nomes claros e no plural.

## 10. Segurança

Validar input rigorosamente no backend (tamanho, tipo, valores).

Limitar tamanho máximo de payloads (ex: 2MB por padrão).

Escapar e sanitizar parâmetros que vão para SQL ou comandos internos.