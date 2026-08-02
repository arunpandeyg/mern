import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
 const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form, {
        withCredentials: true,
      });
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-xl mb-2 text-center text-orange-600">Update User</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-3">
        <div>
          <input
            type="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
        
      </form>
    </div>
  )
}

export default EditUser
