# FunTodo — Full‑Stack Task Management

A modern task manager with offline‑first UX and cloud sync.

## 🏗️ Project Structure

```
funtodo/
├── client/          # React + Vite frontend
├── server/          # Node.js + Express + Drizzle backend
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Quick Setup (Recommended)

```bash
# Install all dependencies
npm run install:all

# Configure environment files
# client/.env: VITE_API_BASE=http://localhost:3000/api
# server/.env: see Env Vars section below

# Set up database (Drizzle schema already included)
# If you need to generate SQL snapshots:
# npx drizzle-kit generate:pg

# Start both servers
npm run dev
```

### Alternative Setup (Manual)

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Ensure server/.env has DATABASE_URL set to your Postgres instance

# Start servers (in separate terminals)
# Terminal 1:
cd server && npm run dev
# Terminal 2:
cd client && npm run dev
```

## 🔧 Available Commands

### Development

```bash
npm run dev              # Start both client and server
npm run dev:client       # Start only client
npm run dev:server       # Start only server
```

### Installation

```bash
npm run install:all      # Install dependencies for all packages
```

### Database

- Drizzle ORM with Postgres‑JS is used. Migrations are checked in under `server/drizzle/`.
- Configure `DATABASE_URL` in `server/.env` and run the server; Drizzle will use the existing schema.
- For schema changes, use `drizzle-kit` (optional):
  - `npx drizzle-kit generate:pg` to generate SQL from schema changes
  - Apply SQL using your preferred tool (psql, GUI, etc.)

### Build & Test

```bash
npm run build:client     # Build the React app
npm run test:server      # Run server tests
```

## ✨ Features

### 🔄 **Offline Functionality**

- Create and manage tasks without internet connection
- All changes saved to local storage
- Automatic sync when logging in

### ☁️ **Cloud Sync**

- User authentication and registration
- Automatic merge of local tasks with cloud account
- Real-time synchronization

### 🎯 **Task Management**

- Create tasks in inbox
- Drag & drop to organize by date
- Edit, delete, and mark tasks as complete
- Visual status indicators

## 🛠️ Technology Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zustand** - State management
- **bhi-dnd** - Drag & drop
- **date-fns** - Date utilities

### Backend

- **Node.js** — Runtime
- **Express** — Web framework
- **Drizzle ORM** — Database access
- **PostgreSQL** — Database
- **bcrypt** — Password hashing
- **OpenAI** — Optional AI assistant

## 📁 Project Structure Details

### `/client/` — Frontend Application

- Modern React app with offline capabilities
- Local storage integration
- Drag & drop task organization
- User authentication UI

### `/server/` — Backend API

- RESTful API endpoints
- User authentication
- Task CRUD operations
- Database management with Prisma

## 🔧 Development

### Running the Backend

```bash
cd server
npm install
npm run dev
```

### Running the Frontend

```bash
cd cilent
npm install
npm run dev
```

### Environment Variables

Create `client/.env`:

```env
VITE_API_BASE=http://localhost:3000/api
```

Create `server/.env`:

```env
# Postgres connection
DATABASE_URL=postgresql://username:password@localhost:5432/funtodo

# JWT signing
JWT_SECRET=your-secret-key

# Server port
PORT=3000

# Admin reset (optional; used by POST /api/auth/reset)
ADMIN_USERNAME=admin
# Generate hash: node -e "(async()=>{const bcrypt=require('bcrypt');console.log(await bcrypt.hash('your-password',10))})()"
ADMIN_PASSWORD_HASH=$2b$10$...yourBcryptHash...

# OpenAI (optional; enable AI features)
OPENAI_API_KEY=sk-...
```

## 📝 Environment Variables

Create `.env` file in the server directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/funtodo"
JWT_SECRET="your-secret-key"
PORT=3001
```

## 🧪 Testing

- Server tests: if configured, run from `server/` with `npm test`.
- Client tests: run from `client/` with `npm test` (if set up).

## 📄 License

This project is licensed under the ISC License.
