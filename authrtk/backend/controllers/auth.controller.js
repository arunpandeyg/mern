import * as authService from "../services/auth.service.js";
import { sendEmail } from "../utils/email.js";

export const signup = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    if (!user || !user.email) {
      throw new Error("Invalid user object");
    }
    await sendEmail({
      to: user.email,
      subject: "Verify Email",
      html: `Token: ${user.emailVerifyToken}`,
    });

    res.status(201).json({ message: "Signup success, verify email" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);

    res.json({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: {
        id: data.user._id,
        name: data.user.name,
        role: data.user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signout = async (req, res) => {
  await authService.logoutUser(req.body.refreshToken);  
  res.json({ message: "Signed out" });
};

export const refresh = async (req, res, next) => {
  try {
    const data = await authService.refreshToken(req.body.refreshToken);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await authService.verifyEmail(req.params.token);
    res.json({ message: "Email verified" });
  } catch (err) {
    next(err);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const user = await authService.resendVerifyEmail(req.body.email);
    await sendEmail({
      to: user.email,
      subject: "Verify Email",
      html: `Token: ${user.emailVerifyToken}`,
    });
    res.json({ message: "Email sent" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await authService.forgotPassword(req.body.email);
    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: `Token: ${user.passwordResetToken}`,
    });
    res.json({ message: "Email sent" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const user = await authService.resetPassword(req.params.token, req.body.password);
    res.json({ message: "Password reset" });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await authService.changePassword(req.user.id, req.body.password, req.body.newPassword);
    res.json({ message: "Password changed" });
  } catch (err) {
    next(err);
  }
};

export const changeEmail = async (req, res, next) => {
  try {
    const user = await authService.changeEmail(req.user.id, req.body.email);
    await sendEmail({
      to: user.email,
      subject: "Verify Email",
      html: `Token: ${user.emailVerifyToken}`,
    });
    res.json({ message: "Email sent" });
  } catch (err) {
    next(err);
  }
};

export const changeName = async (req, res, next) => {
  try {
    const user = await authService.changeName(req.user.id, req.body.name);
    res.json({ message: "Name changed" });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const user = await authService.changeRole(req.user.id, req.body.role);
    res.json({ message: "Role changed" });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const user = await authService.deleteAccount(req.user.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    next(err);
  }
};

export const blockAccount = async (req, res, next) => {
  try {
    const user = await authService.blockAccount(req.user.id);
    res.json({ message: "Account blocked" });
  } catch (err) {
    next(err);
  }
};

export const unblockAccount = async (req, res, next) => {
  try {
    const user = await authService.unblockAccount(req.user.id);
    res.json({ message: "Account unblocked" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await authService.deleteUser(req.user.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await authService.getUser(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers(req.user.id);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await authService.updateUser(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await authService.updateMe(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};