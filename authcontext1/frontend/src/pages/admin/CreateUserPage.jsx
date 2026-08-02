// pages/UpdateUserPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser, resetUserState } from "../../rtk/userSlice";

const CreateUserPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.user);

  // Get passed user data
  const userData = location.state;

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    password: "",
    image: null,
  });

  // Pre-fill form
  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || "",
        gender: userData.gender || "",
        password: "",
        image: null,
      });
    }
  }, [userData]);

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-xl mb-2 text-center text-orange-600">Create User</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-3 ">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="User Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading} className="cursor-pointer bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded">
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateUserPage;









// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { updateUserProfile } from '../../rtk/userSlice';
// import { selectUser } from '../../rtk/userSelectors';

// const UpdateUserPage = () => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const user = useSelector(selectUser);

//   const onSubmit = (data) => {
//     dispatch(updateUserProfile(data));
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
//       <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-bold">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ref={register}
//             defaultValue={user.name}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-bold">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ref={register}
//             defaultValue={user.email}
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUserPage;