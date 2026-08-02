import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { useAuthInit } from "./hooks/useAuthInit";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "./components/ui/sonner";

export default function AppRoutes() {
  useAuthInit();

  return (
    <div>      
      <Router>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />

            {/* Admin only */}
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Routes>
      </Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} size="sm" style={{ zIndex: 9999 }} className="z-50 mt-4 color='ring-1 ring-black ring-opacity-5'"  />
    </div>
  );
}

// import { Routes, Route } from "react-router";
// import { useAuthInit } from "./hooks/useAuthInit";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AdminDashboard from "./pages/AdminDashboard";
// import RoleRoute from "./components/RoleRoute";

// export default function App() {
//   useAuthInit();
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Routes>
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <RoleRoute roles={["ADMIN"]}>
//                 <AdminDashboard />
//               </RoleRoute>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </QueryClientProvider>
//   );
// }
