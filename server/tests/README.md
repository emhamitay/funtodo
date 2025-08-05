# Server Testing Guide

This directory contains comprehensive tests for the FunTodo server API.

## Test Structure

```
server/tests/
├── auth.test.js           # Authentication tests
├── tasks.test.js          # Task management tests
├── integration.test.js    # End-to-end integration tests
└── README.md             # This file
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Integration Tests Only
```bash
npm run test:integration
```

### Specific Test File
```bash
npx jest auth.test.js
```

## Test Categories

### Authentication Tests (auth.test.js)
Tests for user registration and login functionality:

**Registration Tests:**
- ✅ Valid user registration
- ✅ Invalid email format validation
- ✅ Short password validation
- ✅ Missing email validation
- ✅ Missing password validation
- ✅ Duplicate user registration

**Login Tests:**
- ✅ Valid login credentials
- ✅ Invalid password
- ✅ Non-existent email
- ✅ Invalid email format
- ✅ Missing email
- ✅ Missing password

### Task Management Tests (tasks.test.js)
Tests for task CRUD operations:

**Task Creation:**
- ✅ Create task with all fields
- ✅ Create task with minimal fields
- ✅ Validation for missing userId
- ✅ Validation for missing title
- ✅ Validation for invalid userId

**Task Retrieval:**
- ✅ Get all tasks for user
- ✅ Empty tasks for new user
- ✅ Validation for missing userId
- ✅ Validation for invalid userId

**Task Updates:**
- ✅ Update task title
- ✅ Update task description
- ✅ Update task due date
- ✅ Validation for non-existent task
- ✅ Validation for missing taskId

**Task Completion:**
- ✅ Toggle task completion status
- ✅ Validation for non-existent task

**Task Deletion:**
- ✅ Delete task
- ✅ Validation for non-existent task
- ✅ Validation for missing taskId

### Integration Tests (integration.test.js)
End-to-end workflow tests:

**Full User Workflow:**
- ✅ Complete user journey: register → login → create → update → delete
- ✅ Data consistency across operations

**Error Handling:**
- ✅ Invalid JSON handling
- ✅ Missing required fields
- ✅ Non-existent routes

**Data Validation:**
- ✅ Email format validation
- ✅ Password length validation
- ✅ Task title validation

**Concurrent Operations:**
- ✅ Multiple simultaneous task creations
- ✅ Data integrity under load

## Test Coverage

The tests cover:
- ✅ **API endpoints** - All routes are tested
- ✅ **Request validation** - Input validation and error handling
- ✅ **Database operations** - CRUD operations with Prisma
- ✅ **Authentication** - User registration and login
- ✅ **Error scenarios** - Network errors, validation errors
- ✅ **Data integrity** - Data consistency across operations
- ✅ **Integration** - End-to-end workflows

## Test Data

Tests use isolated test data:
- **Test emails**: `testuser@example.com`, `taskuser@example.com`, etc.
- **Test passwords**: `test123456` (meets minimum requirements)
- **Test tasks**: Various task configurations for different scenarios

## Best Practices

1. **Test isolation** - Each test is independent
2. **Clean setup** - Test data is cleaned up between tests
3. **Realistic data** - Tests use realistic test data
4. **Error scenarios** - Both success and failure cases are tested
5. **API standards** - Tests follow REST API conventions

## Adding New Tests

When adding new tests:
1. Follow the existing naming convention
2. Use descriptive test names
3. Test both success and failure scenarios
4. Clean up test data after tests
5. Add tests to the appropriate category
6. Update this README with new test information

## Test Environment

Tests run in a test environment with:
- **Test database** - Separate from development database
- **Mocked external services** - No external API calls
- **Isolated test data** - No interference with production data
- **Fast execution** - Optimized for quick feedback 