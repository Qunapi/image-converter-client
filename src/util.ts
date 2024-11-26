const VITE_LOGOUT_URL = import.meta.env.VITE_LOGOUT_URL;
const VITE_COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;
const VITE_COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

export const signOutRedirect = () => {
  const clientId = VITE_COGNITO_CLIENT_ID;
  const logoutUri = VITE_LOGOUT_URL;
  window.location.href = `${VITE_COGNITO_DOMAIN}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};
