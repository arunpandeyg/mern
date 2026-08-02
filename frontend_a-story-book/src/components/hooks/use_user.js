// import { useEffect, useState } from "react";
// import { api } from "../../components/lib/axios"
// import { fetchMe } from "../../store/authSlice";

// // import axios from "axios";

// // IMPORTANT: allow cookies to be sent
// // axios.defaults.withCredentials = true;

// const useUser = () => {
//   const [isLoaded, setIsLoaded] = useState(true);
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         setIsLoaded(true);

//         // Call backend (cookie automatically sent)
//         // const res = await api.get("/users/me");
//         const res = await fetchMe();

//         setUser(res.data.user);
//         setIsSignedIn(true);
//       } catch (err) {
//         console.error("Auth check failed:", err?.response?.data || err.message);
//         setIsSignedIn(false);
//         setUser(null);
//       } finally {
//         setIsLoaded(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   return { isLoaded, isSignedIn, user };
// };

// export default useUser;
