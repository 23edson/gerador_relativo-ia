## Regras para Testes

### 1. Frameworks recomendados

Backend Node.js: Jest ou Vitest

Frontend (React/Next): Testing Library + Jest

Python (NLP/IA): Pytest

E2E (integração total): Playwright ou Cypress

### 2. Organização dos testes

Estrutura de pastas:

src/
  └── modulo/
      ├── index.ts
      ├── index.test.ts
tests/
  └── e2e/
      └── fluxo-completo.test.ts


Cada módulo/componente deve ter seu próprio arquivo de teste.

Testes de integração/E2E ficam fora do src/.

### 3. Tipos de testes exigidos

Unitário: Toda função ou componente isolado
Integração: Módulos que dependem de outros
E2E: Pelo menos 1 fluxo completo principal
Snapshot: Usar com cautela, só onde faz sentido
Testes NLP: Cobertura mínima de entrada/saída esperada

### 4. Cobertura mínima

Cobertura de 80% global obrigatória antes de deploy.

Cobertura por módulo: mínimo de 70% por pasta/arquivo.

Ferramentas de cobertura:

Node.js: jest --coverage

Python: pytest --cov

### 5. Boas práticas

Nome dos testes deve descrever o comportamento:

it('retorna erro se usuário não estiver autenticado', () => { ... })


Cada teste deve ser isolado e independente.

Evitar mocks desnecessários em testes de integração.

Usar beforeEach e afterEach com cautela.

### 6. Testes de IA e NLP

Para cada prompt, criar conjunto de testes com entrada e saída esperada.

Testar comportamento do parser, respostas da IA, formatação dos dados.

Validação de regressão: salvar saídas esperadas em arquivos .json.

### 7. Execução automática

Testes devem rodar em:

Commits na branch principal

Pull Requests

Antes do deploy (via CI/CD)

### 8. Falhas

Nenhum teste pode ser marcado como skip na branch principal.

CI deve bloquear merge se houver falhas ou cobertura abaixo do mínimo.