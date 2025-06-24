import Layout from "@/layout/layout";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const token = Cookies.get("token");
  if (token) {
    return (
      <main>
        <Layout>
          <Outlet />
        </Layout>
      </main>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
export default ProtectedRoutes;
