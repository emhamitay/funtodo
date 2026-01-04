# FunTodo Server

Node.js + Express backend API for FunTodo task management application.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure:

```env
# Database (Required)
DATABASE_URL=postgresql://username:password@localhost:5432/funtodo

# JWT Authentication (Required)
JWT_SECRET=your-secret-key-change-in-production

# Server Configuration
PORT=3000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173

# OpenAI Integration (Optional)
OPENAI_API_KEY=sk-your-openai-api-key

# Admin Reset (Optional)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...yourBcryptHash...
```

### 3. Setup Database

```bash
# Generate Drizzle types
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# Or open Drizzle Studio to manage database
npx drizzle-kit studio
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### 5. Production Mode

```bash
npm start
```

## 📚 API Endpoints

### General

- `GET /` — Welcome message
- `GET /api/health` — Server health check

### Authentication

- `POST /api/auth/register` — Register new user
  - Body: `{ username, password }`
  - Returns: JWT token
- `POST /api/auth/login` — Login existing user
  - Body: `{ username, password }`
  - Returns: JWT token

### Tasks (All require JWT in Authorization header)

- `GET /api/tasks/getByUserId` — Get all tasks for authenticated user
  - Headers: `Authorization: Bearer <token>`
- `POST /api/tasks/create` — Create new task
  - Body: Task object
- `PUT /api/tasks/update` — Update existing task
  - Body: `{ id, ...updates }`
- `DELETE /api/tasks/delete` — Delete task
  - Body: `{ id }`
- `PUT /api/tasks/toggleIsDone` — Toggle task completion status
  - Body: `{ id }`
- `PUT /api/tasks/moveTask` — Move task to different date
  - Body: `{ id, newDate }`

### AI Assistant (Optional - requires OPENAI_API_KEY)

- `POST /api/openai/ask` — Send prompt to AI assistant
  - Body: `{ prompt }`

## 🛠️ Technology Stack

- **Express 4.18** — Web framework
- **Drizzle ORM 0.45** — TypeScript-first ORM
- **Postgres.js 3.4** — PostgreSQL client
- **bcrypt 6.0** — Password hashing
- **jsonwebtoken 9.0** — JWT authentication
- **OpenAI 6.15** — AI integration (optional)
- **dotenv 16.6** — Environment variable management
- **cors 2.8** — Cross-origin resource sharing

## 📁 Project Structure

```
server/
├── controllers/          # Request handlers
│   ├── aiController.js
│   ├── authController.js
│   └── tasksController.js
├── db/
│   ├── client.js         # Drizzle client setup
│   └── schema/           # Database schema definitions
│       ├── tasks.js
│       └── users.js
├── drizzle/              # Generated migrations
├── routes/               # Express route definitions
│   ├── aiRoute.js
│   ├── authRoute.js
│   └── tasksRoute.js
├── services/             # Business logic layer
│   ├── aiLogic.js
│   ├── aiService.js
│   ├── authService.js
│   └── tasksService.js
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment template
├── drizzle.config.js     # Drizzle configuration
├── index.js              # Express app entry point
└── package.json
```

## 🔒 Security

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens for stateless authentication
- CORS configured to allow specific origins only
- Environment variables for sensitive data

### Generating Secure Values

**JWT Secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Admin Password Hash:**

```bash
node -e "(async()=>{const bcrypt=require('bcrypt');console.log(await bcrypt.hash('your-password',10))})()"
```

## 🗄️ Database Management

### Using Drizzle Kit

```bash
# Generate migration files from schema changes
npx drizzle-kit generate

# Push schema changes directly to database (development)
npx drizzle-kit push

# Open Drizzle Studio (visual database browser)
npx drizzle-kit studio
```

### Schema Files

Database schema is defined in `db/schema/`:

- `users.js` — User accounts table
- `tasks.js` — Tasks table with user relationships

## 🧪 Testing

```bash
npm test
```

Uses Node.js built-in test runner.

## 🐛 Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:pass@host:port/dbname`
- Ensure database exists

### JWT Errors

- Verify `JWT_SECRET` is set in `.env`
- Check token format: `Bearer <token>`
- Ensure token hasn't expired

### CORS Errors

- Add client origin to `ALLOWED_ORIGINS` in `.env`
- Format: `http://localhost:5173,https://yourdomain.com`

## 📄 License

ISC License
