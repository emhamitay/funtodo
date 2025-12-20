# Testing Guide

This directory contains comprehensive tests for the FunTodo application.

## Test Structure

```
src/test/
├── setup.js                 # Global test setup and mocks
├── components/              # Component tests
│   ├── Login.test.jsx      # Login component tests
│   └── Register.test.jsx   # Register component tests
├── store/                   # Store tests
│   └── TasksStore.test.js  # Zustand store tests
├── models/                  # Model tests
│   └── mTask.test.js       # Task model tests
└── utils/                   # Utility tests
    └── utils.test.js       # Utility function tests
```

## Running Tests

### All Tests
```bash
npm test
```

### Tests with UI
```bash
npm run test:ui
```

### Tests with Coverage
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm test Login.test.jsx
```

## Test Categories

### Component Tests
- **Login.test.jsx**: Tests login form validation, submission, and password visibility
- **Register.test.jsx**: Tests registration form validation, submission, and password visibility

### Store Tests
- **TasksStore.test.js**: Tests Zustand store functionality including:
  - Local storage integration
  - Server synchronization
  - Task CRUD operations
  - Offline/online mode handling

### Model Tests
- **mTask.test.js**: Tests task model functionality including:
  - Task creation with different parameters
  - Server data conversion
  - Property validation

### Utility Tests
- **utils.test.js**: Tests utility functions including:
  - Class name combination (cn function)
  - Conditional class handling

## Test Coverage

The tests cover:
- ✅ **Component rendering** - All components render correctly
- ✅ **User interactions** - Form submissions, button clicks, input changes
- ✅ **Validation** - Email format, password length, required fields
- ✅ **API integration** - Server requests and responses
- ✅ **Local storage** - Data persistence and retrieval
- ✅ **State management** - Zustand store operations
- ✅ **Error handling** - Network errors, validation errors
- ✅ **Accessibility** - Form labels, button roles

## Mocking

The tests use comprehensive mocking:
- **localStorage** - Mocked for testing data persistence
- **fetch** - Mocked for testing API calls
- **toast** - Mocked for testing notifications
- **ResizeObserver** - Mocked for component rendering
- **IntersectionObserver** - Mocked for component rendering

## Best Practices

1. **Test isolation** - Each test is independent
2. **Clean setup** - Mocks are cleared between tests
3. **Realistic data** - Tests use realistic test data
4. **Error scenarios** - Both success and failure cases are tested
5. **User interactions** - Tests simulate real user behavior

## Adding New Tests

When adding new tests:
1. Follow the existing naming convention
2. Use descriptive test names
3. Test both success and failure scenarios
4. Mock external dependencies
5. Clean up after each test
6. Add tests to the appropriate category 