import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./PrivateRoutes";
import { Home } from "@/pages/dashBoard";
import { LoginPage } from "@/Auth/Login";
import Search from "@/pages/Search";
import Profile from "@/pages/profile/Profile";
import Follows from "@/pages/FollowsPage";
import { Registerpage } from "@/Auth/Register";
import DetailThread from "@/pages/thread/DetailThread";
import ProfileById from "@/pages/User Prodile/userprofileById";

let router = createBrowserRouter([
  {
    Component: ProtectedRoutes,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/follows",
        Component: Follows,
      },
      {
        path: "/detail-thread/:id",
        Component: DetailThread,
      },
      {
        path: "/user-Profile/:id",
        Component: ProfileById,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: Registerpage,
  },
]);

export default router;
