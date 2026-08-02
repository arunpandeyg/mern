import { Request } from 'express';

export const isAuthenticated = async (req: Request) => {
    const token = req.cookies?.token;
    return token;
};

export const isNotAuthenticated = async (req: Request) => {
    const token = req.cookies?.token;
    return !token;
};

export const isAdmin = async (req: Request) => {
    const token = req.cookies?.token;
    return token;
};

export const isNotAdmin = async (req: Request) => {
    const token = req.cookies?.token;
    return !token;
};

export const getCurrentUser = async (req: Request) => {
    const token = req.cookies?.token;
    return token;
};