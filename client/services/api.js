/**
 * API Endpoint Definitions
 *
 * Centralizes client-side endpoint URLs for the FunTodo backend.
 * Configure the server base in the client `.env` using `VITE_API_BASE`,
 * for example: `VITE_API_BASE=http://localhost:3000/api`.
 */
const BASE_CURRENT = import.meta.env.VITE_API_BASE;
const BASE = "https://funtodo.onrender.com/api";

console.log("testing at start ...");
console.log("BASE_CURRENT:", BASE_CURRENT);
console.log("BASE:", BASE);

// Task endpoints
export const TASKS_CREATE = `${BASE}/tasks/create`;
export const TASKS_GET_BY_USER_ID = `${BASE}/tasks/getByUserId`;
export const TASKS_UPDATE = `${BASE}/tasks/update`;
export const TASKS_DELETE = `${BASE}/tasks/delete`;
export const TASKS_TOGGLE_ISDONE = `${BASE}/tasks/toggleIsDone`;
export const TASKS_MOVE_TASK = `${BASE}/tasks/moveTask`;

// Auth endpoints
export const USERS_REGISTER = `${BASE}/auth/register`;
export const USERS_LOGIN = `${BASE}/auth/login`;

// AI endpoint
export const OPENAI_API_ASK = `${BASE}/openai/ask`;

console.log("testing at end ...");
console.log("String as is [BASE]:", BASE);
console.log("TASKS_CREATE:", TASKS_CREATE);
console.log("BASE_CURRENT:", BASE_CURRENT);

const test_1 = import.meta.env.VITE_TEST_1 || "no value";
console.log("test_1:", test_1);
const test_2 = import.meta.env.VITE_TEST_2 || "no value";
console.log("test_2:", test_2);
const test_3 = import.meta.env.VITE_TEST_3 || "no value";
console.log("test_3:", test_3);
const test_4 = import.meta.env.VITE_TEST_4 || "no value";
console.log("test_4:", test_4);
const test_5 = import.meta.env.VITE_TEST_5 || "no value";
console.log("test_5:", test_5);

console.log(
  "!!! TEST BASE !!!",
  "https://funtodo.onrender.com/api/tasks/create"
);
