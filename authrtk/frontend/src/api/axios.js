import axios from "axios";
import store from "../store/store";
import { setAccessToken, signout } from "../store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 👈 required for refresh cookie
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If unauthorized & not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // If refresh already in progress → queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post("/refresh");
        const newToken = res.data.accessToken;

        store.dispatch(setAccessToken(newToken));
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(signout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;






// import axios from "axios";
// import store from "../store/store";
// import { setAccessToken, signout } from "../store/authSlice";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1/auth",
//   withCredentials: false, // true only if cookies
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.accessToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken =
//           store.getState().auth.refreshToken;

//         // Call refresh endpoint
//         const res = await axios.post(
//           "http://localhost:5000/api/v1/auth/refresh",
//           { refreshToken }
//         );

//         // Save new access token
//         store.dispatch(setAccessToken(res.data.accessToken));

//         // Retry original request
//         originalRequest.headers.Authorization =
//           `Bearer ${res.data.accessToken}`;

//         return api(originalRequest);
//       } catch (err) {
//         // Refresh failed → signout
//         store.dispatch(signout());
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


