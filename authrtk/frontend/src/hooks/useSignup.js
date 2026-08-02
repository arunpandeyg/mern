import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../api/auth.api";

export const useSignup = () =>
  useMutation({
    mutationFn: signupApi,    
 });

