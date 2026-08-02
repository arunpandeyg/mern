import { NextResponse } from 'next/server';
import { connectToMongoDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';


export async function GET(req: Request) {
await connectToMongoDB();
const url = new URL(req.url);
const page = parseInt(url.searchParams.get('page') || '1', 10);
const limit = parseInt(url.searchParams.get('limit') || '5', 10);
const skip = (page - 1) * limit;


const [total, users] = await Promise.all([
User.countDocuments({}),
User.find({}).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
]);


return NextResponse.json({ total, page, limit, users });
}


export async function POST(req: Request) {
await connectToMongoDB();
const body = await req.json();
const { name, email, phone, password, image } = body;
if (!name || !email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });


const existing = await User.findOne({ email });
if (existing) return NextResponse.json({ message: 'Email already in use' }, { status: 400 });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
const user = new User({ name, email, phone, image, password: hashed });
await user.save();
return NextResponse.json({ message: 'User created', user });
}