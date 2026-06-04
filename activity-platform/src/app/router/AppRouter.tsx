import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import { LoginPage } from "../../pages/LoginPage";
import { FeedPage } from "../../pages/FeedPage";
import { ProfilePage } from "../../pages/ProfilePage";

import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";

import { ROUTES } from "../../shared/config/routes";
import { AnalyticsTracker } from "../../analytics";
import { NotFoundPage } from "../../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.FEED} element={<FeedPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
