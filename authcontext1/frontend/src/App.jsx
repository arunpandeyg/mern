import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SearchPage from "./pages/SearchPage";
import EditUser from "./pages/admin/EditUser";
import CreateUserPage from "./pages/admin/CreateUserPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {(auth) =>
                  console.log(auth) ||
                  (auth.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  ))
                }
              </PrivateRoute>
            }
          />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />
          <Route path="/admin/create" element={ <CreateUserPage />}/>
          <Route path="/search" element={ <SearchPage />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
