// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Import all your page components
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Homepage from "./pages/Homepage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PublicShareView from "./pages/PublicShareView.tsx"; // The public share view

// Import your custom components used for routing/layout
import AuthenticatedLayout from "./components/AuthenticatedLayout.tsx";
import PrivateRoute from "./components/PrivateRoute .tsx";
import ContentLibrary from "./pages/ContentLibrary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.tsx acts as the top-level layout with <Outlet />
    children: [
      {
        path: "", // This matches the root path: '/'
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
      // You can add more protected child routes here if needed
    ],
  },
  // Public Share Link View - MUST BE OUTSIDE PrivateRoute
  {
    path: "/brain/:shareLink", // Route to capture the shareLink hash
    element: <PublicShareView />, // Publicly accessible component
  },
  {
    path: "*", // Catch-all route for any unmatched paths
    element: <Navigate to="/login" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
