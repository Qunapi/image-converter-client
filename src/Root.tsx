import { useAuth } from "react-oidc-context";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { ImagesPage } from "./pages/ImagesPage/ImagesPage";
import { LoginPage } from "./pages/LoginPage";

export const Root = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/images" element={<ImagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
