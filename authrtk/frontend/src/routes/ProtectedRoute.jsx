import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { user, accessToken } = useSelector((s) => s.auth);

  if (!accessToken || !user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
