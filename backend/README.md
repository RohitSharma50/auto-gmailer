# Backend (Node.js + Express + MongoDB)

## Setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env (MONGODB_URI, JWT_SECRET, CORS_ORIGIN, N8N_SIGNUP_WEBHOOK_URL)
npm run dev
```
API base path: `/api`

Routes:
- `POST /api/auth/register` { name, email, password } -> 201
- `POST /api/auth/login` { email, password } -> { token }
- `GET /api/auth/me` with `Authorization: Bearer <token>` -> { user }