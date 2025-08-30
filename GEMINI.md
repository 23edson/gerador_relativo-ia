# Project Overview

This project is a web application for generating dynamic and personalized reports. It can integrate with multiple data sources, including CSV files, XLSX spreadsheets, JSON APIs, and PostgreSQL databases. The application allows users to visually configure the content and structure of reports, which can then be exported as PDFs.

## Key Technologies

*   **Frontend:** React, TypeScript, Tailwind CSS, Material UI, Zustand
*   **Backend:** Python, FastAPI, SQLAlchemy, Pandas
*   **Database:** PostgreSQL
*   **PDF Generation:** WeasyPrint or Puppeteer
*   **Containerization:** Docker

# Building and Running

## Installation

```bash
make install
```

## Running in Development

```bash
make run-dev
```

This will start the backend server (FastAPI) and the frontend development server (React).

## Testing

```bash
make test
```

This will run the tests for both the backend and the frontend.

# Development Conventions

## Code Style

*   **Backend (Python):**
    *   Follows PEP8.
    *   Uses `black` for formatting and `isort` for import sorting.
    *   `snake_case` for variables, functions, and files.
    *   `PascalCase` for classes.
*   **Frontend (React):**
    *   Uses `eslint` and `prettier`.
    *   `camelCase` for variables and functions.
    *   `PascalCase` for components.

## Directory Structure

*   `backend/`: FastAPI application
    *   `routes/`: API routes
    *   `services/`: Business logic
    *   `repositories/`: Data access
    *   `schemas/`: Pydantic models
    *   `models/`: ORM models
*   `frontend/`: React application
    *   `components/`: Reusable components
    *   `pages/`: Application pages
    *   `hooks/`: Reusable logic
    *   `services/`: HTTP calls
    *   `types/`: TypeScript types

## Commit Messages

Commits should follow the conventional commit format:

`<type>(scope): <description>`

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
