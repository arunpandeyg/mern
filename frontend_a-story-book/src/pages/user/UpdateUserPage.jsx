// pages/UpdateUserPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser, resetUserState } from "../../store/userSlice";

const UpdateUserPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.user);

  // Get passed user data
  const userData = location.state;
  console.log("userData:", userData);
  const [form, setForm] = useState({
  name: userData?.name || "",
  email: userData?.email || "",
  password: "",
  phone: userData?.phone || "",  
  gender: userData?.gender || "",
  
  image: null,
});

//   // Form state
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "",
//     image: null,
//   });

//   // Pre-fill form
//   useEffect(() => {
//     if (userData) {
//       setForm({
//         name: userData.name || "",
//         email: userData.email || "",
//         phone: userData.phone || "",
//         password: "",
//         gender: userData.gender || "",        
//         image: null,
//       });
//     }
//   }, [userData]);

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    dispatch(updateUser({ id, formData }));
  };

  // Redirect after success
  useEffect(() => {
    if (success) {
      dispatch(resetUserState());
      navigate("/users");
    }
  }, [success, dispatch, navigate]);

  return (
    <div>
      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="New Password"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateUserPage;