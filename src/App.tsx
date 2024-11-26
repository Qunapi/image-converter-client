import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "react-oidc-context";
import "./App.css";
import { Root } from "./Root";

const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
const VITE_AUTHORITY = import.meta.env.VITE_AUTHORITY;
const VITE_COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const cognitoAuthConfig = {
  authority: VITE_AUTHORITY,
  client_id: VITE_COGNITO_CLIENT_ID,
  redirect_uri: VITE_REDIRECT_URL,
  response_type: "code",
  scope: "email openid phone",
};

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider {...cognitoAuthConfig}>
        <Root />
      </AuthProvider>
    </QueryClientProvider>
  );
}
