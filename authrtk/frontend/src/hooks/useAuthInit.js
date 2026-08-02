import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMe } from "./useMe";
import { setUser, signout } from "../store/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);

  const { data, isError } = useMe({
    enabled: !!accessToken, // only call /me if token exists
  });

  // When /me succeeds
  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  // When token is invalid
  useEffect(() => {
    if (isError) {
      dispatch(signout());
    }
  }, [isError, dispatch]);
};







// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useMe } from "./useMe";
// import { setUser, signout } from "../store/authSlice";

// export const useAuthInit = () => {
//   const dispatch = useDispatch();
//   const accessToken = useSelector((s) => s.auth.accessToken);

//   const { data, isError } = useMe({
//     enabled: !!accessToken,
//   });

//   useEffect(() => {
//     if (data?.data) {
//       dispatch(setUser(data.data));
//     }
//   }, [data, dispatch]);

//   useEffect(() => {
//     if (isError) {
//       dispatch(signout());
//     }
//   }, [isError, dispatch]);
// };
