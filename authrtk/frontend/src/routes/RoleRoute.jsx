import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
