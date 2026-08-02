import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signoutApi } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { signout } from "../store/authSlice";

export const useSignout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      dispatch(signout());
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
