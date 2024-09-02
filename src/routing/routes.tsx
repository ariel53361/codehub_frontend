import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import RoomPage from "../pages/RoomPage";
import LoginForm from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CreateRoomPage from "../pages/CreateRoomPage";
import UserDetailsPage from "../pages/UserDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/room/:roomId", element: <RoomPage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/create-room", element: <CreateRoomPage /> },
      { path: "/user-details/:userId", element: <UserDetailsPage /> },
    ],
  },
]);

export default router;
