# FunTodo — Full-Stack Task Management

A modern task manager with offline-first UX, cloud sync, and AI assistance.

## 🏗️ Project Structure

```
funtodo/
├── client/          # React 19 + Vite 7 frontend
├── server/          # Node.js + Express + Drizzle ORM backend
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Setup Instructions

1. **Install Dependencies**

```bash
# Install all dependencies (root + client + server)
npm run install:all
```

2. **Configure Environment Variables**

**Client** (`client/.env`):
Create a `client/.env` file with the following variables:

```env
# API Configuration (required)
VITE_PROTOCOL=http://
VITE_HOST=localhost:3000
VITE_PATH=api

# For production, change to your domain:
# VITE_PROTOCOL=https://
# VITE_HOST=yourdomain.com
# VITE_PATH=api
```

**Server** (`server/.env`):
Create a `server/.env` file:

```env
# Database (required)
DATABASE_URL=postgresql://username:password@localhost:5432/funtodo

# JWT Authentication (required)
JWT_SECRET=your-secret-key-change-in-production

# Server Configuration
PORT=3000

# CORS Configuration (optional, defaults to http://localhost:5173)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173

# OpenAI Integration (optional, for AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Admin Reset (optional)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...yourBcryptHash...
```

3. **Setup Database**

```bash
# Generate Drizzle types
cd server
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push
```

4. **Start Development Servers**

```bash
# Start both client and server
npm run dev

# Or start individually:
npm run dev:server    # Server on http://localhost:3000
npm run dev:client    # Client on http://localhost:5173
```

## 🔧 Available Commands

### Development

```bash
npm run dev              # Start both client and server concurrently
npm run dev:client       # Start only client (Vite dev server)
npm run dev:server       # Start only server (Node with --watch)
```

### Installation

```bash
npm run install:all      # Install dependencies for root, client, and server
```

### Build & Production

```bash
npm run build            # Build client for production
npm run build:all        # Build both client and server
npm run build:client     # Build only client

npm start                # Start both in production
npm run start:server     # Start only server in production
npm run start:client     # Start only client preview (after build)
```

### Testing

```bash
npm test                 # Run all tests (client + server)
npm run test:client      # Run client tests (Vitest)
npm run test:server      # Run server tests (Node test runner)
```

### Database Management

```bash
cd server

# Generate migrations from schema changes
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
```

## ✨ Features

### 🔄 **Offline Functionality**

- Create and manage tasks without internet connection
- All changes saved to local storage
- Automatic sync when logging in

### ☁️ **Cloud Sync**

- User authentication and registration
- Automatic merge of local tasks with cloud account
- Real-time synchronization across devices

### 🎯 **Task Management**

- Create tasks in inbox
- Drag & drop to organize by date
- Edit, delete, and mark tasks as complete
- Visual status indicators
- Task calendar view

### 🤖 **AI Assistant** (Optional)

- AI-powered task suggestions
- Natural language task creation
- Requires OpenAI API key

## 🛠️ Technology Stack

### Frontend

- **React 19.1** - UI framework with latest features
- **Vite 7.0** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zustand 5.0** - Lightweight state management
- **bhi-dnd** - Drag & drop functionality
- **date-fns 4.1** - Modern date utilities
- **Vitest** - Unit testing framework

### Backend

- **Node.js (ESM)** - JavaScript runtime
- **Express 4.18** - Web framework
- **Drizzle ORM 0.45** - TypeScript ORM for SQL
- **PostgreSQL** - Relational database
- **Postgres.js 3.4** - PostgreSQL client
- **bcrypt 6.0** - Password hashing
- **jsonwebtoken 9.0** - JWT authentication
- **OpenAI 6.15** - AI integration (optional)

## 📁 Detailed Project Structure

### `/client/` — Frontend Application

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-specific components
│   │   ├── dialogs/      # Task modals
│   │   ├── ai/           # AI assistant UI
│   │   └── login/        # Authentication UI
│   ├── lib/              # Utilities and helpers
│   ├── models/           # Data models (mTask)
│   ├── services/         # API and service layer
│   ├── store/            # Zustand state management
│   └── test/             # Unit tests
├── public/               # Static assets
└── vite.config.js        # Vite configuration with proxy
```

**Key Features:**

- Vite proxy for API calls in development (`/api` → `http://localhost:3000`)
- Local storage for offline task management
- Zustand store for state management

### `/server/` — Backend API

```
server/
├── controllers/          # Request handlers
├── db/
│   ├── client.js         # Drizzle client setup
│   └── schema/           # Database schema definitions
├── drizzle/              # Generated migrations
├── routes/               # Express route definitions
├── services/             # Business logic layer
└── index.js              # Express app entry point
```

**Key Features:**

- RESTful API with Express
- JWT-based authentication
- Drizzle ORM with PostgreSQL
- CORS configuration for cross-origin requests

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks

- `POST /api/tasks/create` - Create new task
- `GET /api/tasks/getByUserId` - Get user's tasks
- `PUT /api/tasks/update` - Update task
- `DELETE /api/tasks/delete` - Delete task
- `PUT /api/tasks/toggleIsDone` - Toggle task completion
- `PUT /api/tasks/moveTask` - Move task to different date

### AI Assistant

- `POST /api/openai/ask` - Send prompt to AI assistant

### Health Check

- `GET /api/health` - Server health status

## 📝 Production Deployment

### Building for Production

```bash
# Build the client
npm run build

# The built files will be in client/dist/
```

### Environment Configuration

**Client Production Environment:**
Update `client/.env` for production:

```env
VITE_PROTOCOL=https://
VITE_HOST=yourdomain.com
VITE_PATH=api
```

**Server Production Environment:**
Ensure `server/.env` is configured:

```env
DATABASE_URL=your-production-database-url
JWT_SECRET=strong-random-secret
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com
OPENAI_API_KEY=sk-your-key
```

### Running in Production

```bash
npm start
```

This will:

1. Start the Express server on the configured PORT
2. Serve the client preview (for testing)

**Note:** For production, consider:

- Serving the built client files through a CDN or static hosting
- Using a process manager like PM2 for the server
- Setting up a reverse proxy (nginx/Apache)
- Enabling HTTPS

## 🧪 Testing

### Client Tests

```bash
cd client
npm test              # Run tests once
npm run test:ui       # Run with UI
npm run test:coverage # Run with coverage report
```

Tests use Vitest with React Testing Library.

### Server Tests

```bash
cd server
npm test              # Run Node.js test runner
```

## 🔒 Security Notes

- Always use strong, unique values for `JWT_SECRET` in production
- Never commit `.env` files to version control
- Use HTTPS in production
- Configure CORS `ALLOWED_ORIGINS` appropriately
- Keep dependencies updated regularly

## 🐛 Troubleshooting

### "Cannot find module" errors

Run `npm run install:all` to install all dependencies.

### Database connection errors

Verify `DATABASE_URL` in `server/.env` is correct and PostgreSQL is running.

### API requests fail in development

Ensure server is running on port 3000. Vite proxy is configured for `/api` → `http://localhost:3000`.

### Client can't connect to API

Check `client/.env` has correct `VITE_PROTOCOL`, `VITE_HOST`, and `VITE_PATH` values.

## 📄 License

This project is licensed under the ISC License.
