import jwt from "jsonwebtoken";
import  User  from "../models/user.model.js";
import { CustomError } from "./custom.error.js";

export const generateAccessTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

    if (res && typeof res.cookie === 'function'){
    res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
  }else{
	return token;
  }
	
};

export const generateRefreshTokenAndSetCookie = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
};

export const verifyRefreshToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
};

export const isTokenExpired = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.exp < Date.now() / 1000;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
};

export const isRefreshTokenExpired = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.exp < Date.now() / 1000;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
};

export const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return user;
    } catch (error) {
        throw new CustomError("Unauthorized", 401);
    }
};

export const getRefreshTokenFromToken = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		return user.refreshToken;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
};

export const getUserFromRefreshToken = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		return user;
	} catch (error) {
		throw new CustomError("Unauthorized", 401);
	}
}

export const removeToken = (res) => {
	res.cookie("jwt", "", {
		maxAge: 0,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});
};

export const removeRefreshToken = (res) => {
	res.cookie("refreshToken", "", {
		maxAge: 0,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});
};

export const removeTokens = (res) => {
	removeToken(res);
	removeRefreshToken(res);
};

export const setAccessTokenCookie = (res, token) => {
	if (res && typeof res.cookie === 'function'){
    res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
  }else{
	return token;
  }
	
};

export const setRefreshTokenCookie = (res, token) => {
	if (res && typeof res.cookie === 'function'){
    res.cookie("refreshToken", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
  }else{
	return token;
  }
	
};

export const setTokens = (res, token, refreshToken) => {
	setTokenCookie(res, token);
	setRefreshTokenCookie(res, refreshToken);
};