# FunTodo Server

Node.js + Express API for authentication, tasks, and AI assistance.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/funtodo
JWT_SECRET=your-secret-key
PORT=3000
OPENAI_API_KEY=sk-...            # optional, enables AI
ADMIN_USERNAME=admin             # optional, for POST /api/auth/reset
ADMIN_PASSWORD_HASH=$2b$10$...   # bcrypt hash
```

3. Run development server:

```bash
npm run dev
```

4. Start production server:

```bash
npm start
```

## API Endpoints

- `GET /` — Welcome message
- `GET /api/health` — Health check
- `POST /api/auth/login` — Login, returns JWT
- `POST /api/auth/register` — Register, returns JWT
- `POST /api/auth/reset` — Admin reset (dangerous)
- `GET /api/tasks/getByUserId` — List tasks (JWT required)
- `POST /api/tasks/create` — Create task (JWT required)
- `PUT /api/tasks/update` — Update task (JWT required)
- `DELETE /api/tasks/delete` — Delete task (JWT required)
- `PUT /api/tasks/toggleIsDone` — Toggle completion (JWT required)
- `PUT /api/tasks/moveTask` — Move task date (JWT required)
- `POST /api/openai/ask` — Ask AI (optional)

## Technologies

- Express.js
- Drizzle ORM
- PostgreSQL
- OpenAI API (optional)
