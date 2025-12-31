/**
 * API Endpoint Definitions
 *
 * Centralizes client-side endpoint URLs for the FunTodo backend.
 * Configure the server base in the client `.env` using `VITE_API_BASE`,
 * for example: `VITE_API_BASE=http://localhost:3000/api`.
 */
//const BASE = import.meta.env.VITE_API_BASE;
const BASE = "https://funtodo.onrender.com/api";

console.log("ENV CHECK", {
  VITE_API_BASE: import.meta.env.VITE_API_BASE,
  MODE: import.meta.env.MODE,
  ALL: import.meta.env,
});

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
