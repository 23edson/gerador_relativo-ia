
.PHONY: install run-dev test

install:
	@echo "Instalando dependências do backend..."
	@pip install -r backend/requirements.txt
	@echo "Instalando dependências do frontend..."
	@cd frontend && npm install

run-dev:
	@echo "Iniciando servidor de desenvolvimento do backend..."
	@cd backend && uvicorn app.main:app --reload &
	@echo "Iniciando servidor de desenvolvimento do frontend..."
	@cd frontend && npm run dev

test:
	@echo "Executando testes do backend..."
	@cd backend && pytest
	@echo "Executando testes do frontend..."
	@cd frontend && npm test
