const APP_API_USERS_URL =
  import.meta.env.VITE_APP_API_USERS_URL ?? 'http://localhost:1234/api/users'
const APP_API_TASKS_URL =
  import.meta.env.VITE_APP_API_TASKS_URL ?? 'http://localhost:1234/api/tasks'

export { APP_API_USERS_URL, APP_API_TASKS_URL }
