import { SignOptions as JwtSignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { IUser } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) throw new Error('Please define JWT_SECRET in env');

export function signToken(payload: Partial<IUser>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as JwtSignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { foo: string, bar: number, role: string };
}

