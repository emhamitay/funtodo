# FunTodo - Full Stack Task Management App

A modern task management application with offline functionality and cloud sync capabilities.

## 🏗️ Project Structure

```
funtodo fullstack/
├── cilent/          # React frontend application
├── server/          # Node.js backend API
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

# Set up database
npm run db:migrate
npm run db:generate

# Start both servers
npm run dev
```

### Alternative Setup (Without Root Package)
```bash
# Install dependencies
cd server && npm install
cd ../cilent && npm install

# Set up database
cd ../server && npx prisma migrate dev && npx prisma generate

# Start servers (in separate terminals)
# Terminal 1:
cd server && npm run dev
# Terminal 2:
cd cilent && npm run dev
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
```bash
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
```

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
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **Jest** - Testing

## 📁 Project Structure Details

### `/cilent/` - Frontend Application
- Modern React app with offline capabilities
- Local storage integration
- Drag & drop task organization
- User authentication UI

### `/server/` - Backend API
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

### Database Setup
```bash
cd server
npx prisma migrate dev
npx prisma generate
```

## 📝 Environment Variables

Create `.env` file in the server directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/funtodo"
JWT_SECRET="your-secret-key"
PORT=3001
```

## 🧪 Testing

```bash
cd server
npm test
```

## 📄 License

This project is licensed under the ISC License. 