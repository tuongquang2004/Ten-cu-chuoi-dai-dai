export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    CURRENT_USER: "api/auth/me",
  },
  USERS: {
    ROOT: "api/users",
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  REF: {
    ROOT: "http://localhost:9999/referral",
    BY_ID: (id: string) => `http://localhost:9999/referral/${id}`,
  },
  PAYMENT_METHODS: {
    ROOT: "http://localhost:9999/payment_methods",
    BY_ID: (id: string) => `http://localhost:9999/payment_methods/${id}`,
  },
};
