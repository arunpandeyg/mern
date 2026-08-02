import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/user.api";

export const useMe = (options = {}) =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
    staleTime: 5 * 60 * 1000,
    ...options, // 👈 important
  });






// import { useQuery } from "@tanstack/react-query";
// import { getMeApi } from "../api/user.api";

// export const useMe = () =>
//   useQuery({
//     queryKey: ["me"],
//     queryFn: getMeApi,
//     retry: false,
//     staleTime: 5 * 60 * 1000,
//   });
