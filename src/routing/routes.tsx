import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import RoomPage from "../pages/RoomPage";
import LoginForm from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CreateRoomPage from "../pages/CreateRoomPage";
import UserDetailsPage from "../pages/UserDetailsPage";
import PrivateRoutes from "./PrivateRoutes";
import ActivateAccountPage from "../pages/ActivateAccountPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { SetPasswordPage } from "../pages/SetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/room/:roomId", element: <RoomPage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/user-details/:profileId", element: <UserDetailsPage /> },
      { path: "/activate/:uid/:token", element: <ActivateAccountPage /> },
      { path: "/check-email", element: <CheckEmailPage /> },
      { path: "/reset-password/:uid/:token", element: <ResetPasswordPage /> },
      { path: "/set-password", element: <SetPasswordPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/create-room",
            element: <CreateRoomPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
