const JWT_TOKEN_KEY = 'roladin_dashboard';

export const JWTTokenService = {
  set: (token: string) => localStorage.setItem(JWT_TOKEN_KEY, token),
  get: () => localStorage.getItem(JWT_TOKEN_KEY),
  delete: () => localStorage.removeItem(JWT_TOKEN_KEY),
};
