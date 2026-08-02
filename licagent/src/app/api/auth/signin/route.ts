import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';


export async function POST(req: Request) {
const { email, password } = await req.json();
if (!email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });


await connectToMongoDB();
const user = await User.findOne({ email });
if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });


const match = await bcrypt.compare(password, user.password);

const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });


const res = NextResponse.json({ message: 'Signed in', user: { name: user.name, email: user.email, role: user.role } });
// set httpOnly cookie
res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
return res;
}