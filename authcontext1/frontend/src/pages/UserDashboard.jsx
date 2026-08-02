import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AdminLogo from "../components/AdminLogo";

const UserDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError("Failed to fetch user profile.");
      }
    };
    fetchProfile();
  }, [auth]);

  return (
    <div className="container mx-auto mt-5 p-6 items-center justify-center shadow-lg rounded-lg bg-gray-100 max-w-md ">
      <h2 className="text-2xl font-bold mb-4 text-center">User Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {profile && (
        <div className="bg-white p-4 rounded shadow max-w-md mx-auto ">
          <div>
            <AdminLogo />
            {/* <img
              src={`https://ui-avatars.com/api/?name=${profile.username}&background=random&size=128`}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mx-auto mb-4"
            /> */}
          </div>
          <h3 className="text-xl font-semibold text-orange-600 text-center">Profile Information</h3>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
