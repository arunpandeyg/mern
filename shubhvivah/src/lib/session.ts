import { Request } from 'express';

export const getSession = async (req: Request) => {
    const token = req.cookies?.token;
    return token;
};