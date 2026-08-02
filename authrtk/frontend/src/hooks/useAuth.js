import { useMutation } from "@tanstack/react-query";
import { signinApi, signoutApi, signupApi } from "../api/auth.api";

export const useSignin = () =>
  useMutation({
    mutationFn: signinApi,
  });

export const useSignup = () =>
  useMutation({
    mutationFn: signupApi,
  });

export const useSignout = () =>
  useMutation({
    mutationFn: () => signoutApi(),
  });

export const useAuth = () => {};