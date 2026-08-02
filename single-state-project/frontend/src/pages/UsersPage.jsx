
import UserCard from "../components/UserCard";
import React, { useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  React.useEffect(() => {
    const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
  }, []);

  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full min-h-screen p-8">
      <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3  gap-4">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        users && users.length > 0 ? (
          users.map((user) => {
            return <UserCard key={user.id} users={user} />;
          })
        ) : (
          <p>No users found.</p>
        )
      )}
     
      </div>
    </div>
  );
};

export default UsersPage;
