const TOKEN_KEY = "token";

export const AuthService = {
  getAuthToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  },

  setAuthToken(value: string) {
    return window.localStorage.setItem(TOKEN_KEY, value);
  },

  removeAuthToken() {
    return window.localStorage.removeItem(TOKEN_KEY);
  },
};
