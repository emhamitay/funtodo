// api.js
const BASE = import.meta.env.VITE_API_BASE;

export const TASKS_CREATE = `${BASE}/tasks/create`;
export const TASKS_GET_BY_USER_ID = `${BASE}/tasks/getByUserId`;
export const TASKS_UPDATE = `${BASE}/tasks/update`;
export const TASKS_DELETE = `${BASE}/tasks/delete`;
export const TASKS_TOGGLE_ISDONE = `${BASE}/tasks/toggleIsDone`;
export const TASKS_MOVE_TASK = `${BASE}/tasks/moveTask`;

export const USERS_REGISTER = `${BASE}/auth/register`;
export const USERS_LOGIN = `${BASE}/auth/login`;
export const OPENAI_API_ASK = `${BASE}/openai/ask`;
