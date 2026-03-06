# Two-Step Registration App

Fullstack приложение с двухшаговой корпоративной регистрацией.

**Stack:** React 19 + TypeScript + Tailwind + shadcn · NestJS 10 · Prisma 6 · PostgreSQL 16

## Запуск

### Требования

- Node.js >= 18
- Docker & Docker Compose

### 1. Клонировать репозиторий

```bash
git clone <repo-url>
cd registration-app
```

### 2. Запустить PostgreSQL

```bash
docker-compose up -d
```

### 3. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run start:dev
```

Сервер запустится на http://localhost:3001/api

### 4. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Приложение запустится на http://localhost:5173

## API

| Метод  | Endpoint                 | Описание                      |
| ------ | ------------------------ | ----------------------------- |
| POST   | `/api/users/check-email` | Проверить доступность e-mail  |
| POST   | `/api/users/register`    | Зарегистрировать пользователя |
| GET    | `/api/users`             | Список пользователей          |
| DELETE | `/api/users/:id`         | Удалить пользователя          |
