import {
  createUserService,
  currentUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import asyncHandler from "express-async-handler";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await getUsersService(req, res);
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
   console.log("req.params.id:", req.params.id);
  if (!id) {
    throw new Error("User ID is required");
  }
  const user = await getUserByIdService(id);
  res.status(200).json(user);
});

// export const getUserById = asyncHandler(async (req, res) => {
//   const user = await getUserByIdService(id); 
//   res.status(200).json(user);
// });

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await updateUserService(req.params.id, req.body);
  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  await deleteUserService(userId);
  res.status(200).json({ message: "User deleted successfully" });
});

export const createUser = asyncHandler(async (req, res) => {
  const user = await createUserService(req.body);
  res.status(201).json(user);
});

export const currentUser = asyncHandler(async (req, res) => {
  const user = await currentUserService(req);
  res.status(200).json(user);
});
