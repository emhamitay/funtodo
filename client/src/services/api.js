/**
 * API Endpoint Definitions
 */

/*
Note build at vercel falls becouse of linux
there for we solved the problem by combining the strings
*/

const PROTOCOL = import.meta.env.VITE_PROTOCOL;
const HOST = import.meta.env.VITE_HOST;
const PATH = import.meta.env.VITE_PATH || "";
const BASE = `${PROTOCOL}${HOST}/${PATH}`;

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
