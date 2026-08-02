import { useMe } from "./useMe";
import { useSelector } from "react-redux";

export const useAuthReady = () => {
  const token = useSelector((s) => s.auth.accessToken);
  const { isLoading } = useMe({ enabled: !!token });

  return !token || !isLoading;
};
