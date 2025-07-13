import { useAuth } from "@/Auth/AuthContext/AuthContext";
import { Home, Search, Heart, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export function BotBar() {
  const location = useLocation();
  const Navigate = useNavigate();
  const { logOut: keluar } = useAuth();
  const onLogout = () => {
    keluar();
    Navigate("/login");
  };
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 text-white bg-gray-950 border-t border-green-600 shadow md:hidden">
        <div className="flex justify-between items-center px-6 py-3">
          <NavLink to={"/"} className="flex flex-col items-center text-sm">
            {location.pathname === "/" ? (
              <Home className="w-5 h-5 mb-1 text-green-500" />
            ) : (
              <Home className="w-5 h-5 mb-1" />
            )}
            <p
              className={
                location.pathname === "/" ? "text-green-500" : "text-white"
              }
            >
              Home
            </p>
          </NavLink>
          <NavLink
            to={"/search"}
            className="flex flex-col items-center text-sm"
          >
            {location.pathname === "/search" ? (
              <Search className="w-5 h-5 mb-1 text-green-500" />
            ) : (
              <Search className="w-5 h-5 mb-1 " />
            )}
            <p
              className={
                location.pathname === "/search"
                  ? "text-green-500"
                  : "text-white"
              }
            >
              Search
            </p>
          </NavLink>
          <button
            onClick={onLogout}
            className="flex flex-col items-center text-sm"
          >
            <LogOut className="w-5 h-5 mb-1" />
            LogOut
          </button>
          <NavLink
            to={"/follows"}
            className="flex flex-col items-center text-sm"
          >
            {location.pathname === "/follows" ? (
              <Heart className="w-5 h-5 mb-1 text-green-500" />
            ) : (
              <Heart className="w-5 h-5 mb-1" />
            )}
            <p
              className={
                location.pathname === "/follows"
                  ? "text-green-500"
                  : "text-white"
              }
            >
              Follow
            </p>
          </NavLink>
          <NavLink
            to={"/profile"}
            className="flex flex-col items-center text-sm"
          >
            {location.pathname === "/profile" ? (
              <User className="w-5 h-5 mb-1 text-green-500" />
            ) : (
              <User className="w-5 h-5 mb-1" />
            )}
            <p
              className={
                location.pathname === "/profile"
                  ? "text-green-500"
                  : "text-white"
              }
            >
              Profile
            </p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
