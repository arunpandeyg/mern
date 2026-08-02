import { Navigate } from "react-router";
import { useMe } from "../hooks/useMe";

export default function RoleRoute({ roles, children }) {
  const { data, isLoading } = useMe();

  if (isLoading) return null;

  if (!roles.includes(data.data.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
