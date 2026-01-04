# FunTodo Client

React 19 + Vite 7 frontend for FunTodo task management application with offline-first capabilities.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on `http://localhost:5173`

### Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Built files output to `dist/` directory.

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📝 Configuration

### Environment Variables

Create a `.env` file (or copy from `.env.example`):

```env
# API Configuration
VITE_PROTOCOL=http://
VITE_HOST=localhost:3000
VITE_PATH=api
```

**Development:** The Vite dev server uses a proxy (configured in `vite.config.js`) to forward `/api` requests to `http://localhost:3000`.

**Production:** Update to your production API:

```env
VITE_PROTOCOL=https://
VITE_HOST=yourdomain.com
VITE_PATH=api
```

The API endpoints are constructed dynamically from these environment variables in `src/services/api.js`.

## ✨ Features

### Offline-First Architecture

- Local storage persistence for tasks
- Works without internet connection
- Automatic sync when online

### Task Management

- Create, edit, delete tasks
- Drag & drop to organize by date
- Mark tasks as complete
- Calendar view
- Inbox for unscheduled tasks

### Authentication

- User registration and login
- JWT-based authentication
- Automatic merge of local tasks with cloud account

### AI Assistant (Optional)

- AI-powered task suggestions
- Natural language task creation

## 🛠️ Technology Stack

### Core

- **React 19.1.0** — Latest React with modern features
- **Vite 7.0.0** — Ultra-fast build tool and dev server
- **Tailwind CSS 4.1.11** — Utility-first CSS framework

### UI Components

- **Radix UI** — Accessible component primitives
  - Dialog, Dropdown Menu, Checkbox, Label, etc.
- **Lucide React** — Beautiful icon library
- **date-fns 4.1.0** — Modern date utilities
- **sonner 2.0** — Toast notifications

### State & Data

- **Zustand 5.0.6** — Lightweight state management
- **bhi-dnd 1.1.9** — Drag & drop functionality

### Testing

- **Vitest 1.3** — Fast unit test framework
- **@testing-library/react 15.0** — React testing utilities
- **jsdom 24.0** — DOM implementation for Node.js

### Build & Development

- **@vitejs/plugin-react-swc** — Fast Refresh with SWC
- **ESLint 9.29** — Code linting
- **@tailwindcss/vite 4.1.11** — Tailwind integration

## 📁 Project Structure

```
client/
├── src/
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   ├── components/             # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── UpdatedCalendar.jsx
│   │   └── ui/                 # shadcn/ui components
│   ├── features/               # Feature-specific components
│   │   ├── Inbox.jsx
│   │   ├── Task.jsx
│   │   ├── TasksView.jsx
│   │   ├── Toolbar.jsx
│   │   ├── ai/                 # AI assistant UI
│   │   ├── dialogs/            # Task modals
│   │   │   ├── NewTaskDialog.jsx
│   │   │   ├── EditTaskDialog.jsx
│   │   │   └── ViewTaskDialog.jsx
│   │   └── login/              # Authentication UI
│   │       ├── AuthenticationModal.jsx
│   │       ├── LoginForm.jsx
│   │       └── RegisterForm.jsx
│   ├── lib/
│   │   ├── utils.js            # Utility functions
│   │   └── tutorial/           # Tutorial system
│   ├── models/
│   │   └── mTask.js            # Task model
│   ├── services/
│   │   ├── api.js              # API endpoint definitions
│   │   ├── authService.js      # Authentication service
│   │   └── aiService.js        # AI service
│   ├── store/
│   │   └── TasksStore.js       # Zustand state management
│   └── test/                   # Unit tests
│       ├── setup.js
│       ├── components/
│       ├── models/
│       └── store/
├── public/                     # Static assets
├── .env                        # Environment variables
├── .env.example                # Environment template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## 🎨 UX: Loading Feedback

The app uses [sonner](https://sonner.emilkowal.ski/) to display elegant toast notifications:

### Authentication Loading States

- **Login:** Shows "Signing you in..." toast
- **Registration:** Shows "Creating your account..." toast
- **Post-auth sync:** Indicates task syncing after authentication

Components with loading states:

- `src/features/login/LoginForm.jsx`
- `src/features/login/RegisterForm.jsx`
- `src/features/login/AuthenticationModal.jsx`

### Task Operations

Loading states are handled in:

- `src/store/TasksStore.js` — State management
- `src/features/dialogs/` — Dialog components

## 🔧 Development Notes

### Vite Configuration

The `vite.config.js` includes:

- **Proxy:** `/api` → `http://localhost:3000` for development
- **React SWC:** Fast Refresh for instant updates
- **Vitest:** Test configuration with jsdom environment
- **Path Alias:** `@` → `/src` for clean imports

### State Management

Zustand store (`src/store/TasksStore.js`) manages:

- Tasks array
- User authentication state
- Local storage persistence
- Server synchronization
- Offline/online state

### API Integration

API endpoints are defined in `src/services/api.js`:

- Constructed from `VITE_PROTOCOL`, `VITE_HOST`, `VITE_PATH`
- Support both development and production environments
- Handle authentication headers automatically

## 🧪 Testing

Tests are located in `src/test/`:

- Component tests using React Testing Library
- Store tests for Zustand
- Model tests for data structures
- Utility function tests

Run with:

```bash
npm test              # Run once
npm run test:ui       # Interactive UI
npm run test:coverage # With coverage report
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized files in `dist/`:

- Minified JavaScript bundles
- Optimized CSS
- Asset optimization
- Source maps (optional)

### Environment Configuration

Before building, ensure `.env` has production values:

```env
VITE_PROTOCOL=https://
VITE_HOST=api.yourdomain.com
VITE_PATH=api
```

### Hosting Options

The built files can be hosted on:

- **Vercel** — Automatic deployments from Git
- **Netlify** — Continuous deployment
- **AWS S3 + CloudFront** — Static hosting with CDN
- **GitHub Pages** — Free hosting for public repos
- **Any static file server** — nginx, Apache, etc.

### Server Configuration

For single-page apps, configure your server to:

1. Serve `index.html` for all routes (SPA routing)
2. Set proper CORS headers
3. Enable HTTPS in production
4. Configure caching for assets

## 📄 License

ISC License
