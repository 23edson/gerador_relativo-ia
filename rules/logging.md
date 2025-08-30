## Regras de Padrão de Logs

### 1. Diretrizes Gerais

Todos os logs devem seguir o formato estruturado (JSON preferencialmente, no backend).

Cada log deve conter:

Timestamp

Nível (INFO, WARNING, ERROR, DEBUG)

Nome do módulo/serviço

Mensagem descritiva

Contexto adicional (userId, requestId, etc., quando aplicável)

Nunca logar dados sensíveis (senhas, tokens, CPF, etc.).

Logs de erro devem conter stack trace.

Logs devem permitir rastrear uma requisição ponta-a-ponta.

### 2. Backend (Python - FastAPI)
Ferramentas

Utilizar structlog ou loguru para logging estruturado.

Exportar logs em JSON (para facilitar leitura via ELK, Loki, etc).

Um request_id deve ser gerado em cada requisição e incluído em todos os logs dessa requisição.

Exemplo de log estruturado
{
  "timestamp": "2025-08-20T18:23:45Z",
  "level": "INFO",
  "module": "report_service",
  "message": "Relatório gerado com sucesso",
  "userId": 123,
  "requestId": "ab12cd34"
}

Boas práticas

INFO: operações bem-sucedidas.

WARNING: algo inesperado, mas não crítico.

ERROR: falhas em execuções ou integrações.

DEBUG: detalhes para diagnóstico (logar apenas em dev/staging).

### 3. Frontend (React)

Usar console.log apenas em ambiente de desenvolvimento.

Para ambientes de produção, usar um serviço de log (ex: Sentry, LogRocket).

Toda exceção não tratada deve ser capturada com contexto da interface (componente, ação do usuário, etc).

Exemplo (em dev):
console.error("Erro ao gerar relatório", {
  error,
  userId,
  reportId,
})

Exemplo (produção):
import * as Sentry from "@sentry/react"

Sentry.captureException(error, {
  tags: { module: "ReportModule" },
  extra: { userId, reportId },
})

### 4. Formato Padrão de Mensagens

As mensagens de log devem ser claras e completas:

[INFO] [report_service] Geração de relatório concluída (reportId=987, userId=123)
[ERROR] [auth_service] Falha na autenticação do usuário (userId=456) - Token expirado

### 5. Armazenamento e Rotação

Os logs do backend devem ser salvos em disco (ou enviados a um coletor) com rotação automática.

Frontend deve centralizar erros críticos em uma plataforma de log (Sentry, etc).

### 6. Logs por Ambiente
Ambiente	Verbosidade	Destino
development	Alta (DEBUG)	Console local, stdout
staging	Média (INFO)	JSON + ferramenta de log externa
production	Baixa (INFO/ERROR)	JSON + ferramenta externa