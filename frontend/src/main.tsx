import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Homepage from "./pages/Homepage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PrivateRoute from "./components/PrivateRoute .tsx";
import AuthenticatedLayout from "./components/AuthenticatedLayout.tsx";
import ContentLibrary from "./pages/ContentLibrary.tsx";
import PublicShareView from "./pages/PublicShareView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "content",
        element: (
          <PrivateRoute>
            <AuthenticatedLayout>
              <ContentLibrary />
            </AuthenticatedLayout>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/brain/:shareLink", 
    element: <PublicShareView />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
