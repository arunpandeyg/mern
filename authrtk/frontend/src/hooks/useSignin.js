import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signinApi } from "../api/auth.api";
import { signinSuccess } from "../store/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: signinApi,
    onSuccess: (res) => {
      dispatch(signinSuccess(res.data));
    },
  });
};






// import { useMutation } from "@tanstack/react-query";
// import { signinApi } from "../api/auth.api";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/authSlice";

// export const useLogin = () => {
//   const dispatch = useDispatch();

//   return useMutation({
//     mutationFn: signinApi,
//     onSuccess: (res) => {
//       dispatch(loginSuccess(res.data));
//     },
//   });
// };
