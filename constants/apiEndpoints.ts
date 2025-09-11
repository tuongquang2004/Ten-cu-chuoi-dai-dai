export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        CURRENT_USER: 'api/auth/me'
    },
    USERS: {
        ROOT: 'api/users',
        BY_ID: (id: string) => `/api/users/${id}`
    }
}