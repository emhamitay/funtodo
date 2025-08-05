# Contributing to FunTodo

Thank you for your interest in contributing to FunTodo! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd funtodo-fullstack
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
funtodo-fullstack/
├── cilent/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-specific components
│   │   ├── store/         # Zustand state management
│   │   └── lib/           # Utility functions
│   └── package.json
├── server/          # Node.js backend
│   ├── controllers/ # Route controllers
│   ├── routes/      # API routes
│   ├── prisma/      # Database schema and migrations
│   └── tests/       # Test files
└── README.md
```

## 🛠️ Development Guidelines

### Code Style
- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic

### Git Workflow
1. Create a feature branch from `main`
2. Make your changes
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Testing
- Write tests for new features
- Ensure existing tests pass
- Test both frontend and backend changes

### Database Changes
- Use Prisma migrations for schema changes
- Test migrations on development database
- Update Prisma client after schema changes

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser/OS information
- Console errors (if any)

## 💡 Feature Requests

When suggesting features:
- Describe the use case
- Explain the benefit
- Consider implementation complexity
- Provide examples if possible

## 📝 Pull Request Guidelines

1. **Title**: Use clear, descriptive titles
2. **Description**: Explain what and why, not how
3. **Tests**: Include tests for new features
4. **Documentation**: Update docs if needed
5. **Screenshots**: Include UI changes if applicable

## 🔧 Development Commands

```bash
# Install all dependencies
npm run install:all

# Start both servers
npm run dev

# Start only client
npm run dev:client

# Start only server
npm run dev:server

# Run server tests
npm run test:server

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio

# Build client
npm run build:client
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Questions?

If you have questions about contributing:
- Check existing issues and pull requests
- Ask in the project discussions
- Create an issue for clarification

Thank you for contributing to FunTodo! 🎉 