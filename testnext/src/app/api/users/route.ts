// app/api/users/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';


export async function GET(req: Request) {
try {
await connectDB();
const url = new URL(req.url);
const page = parseInt(url.searchParams.get('page') || '1', 10);
const limit = parseInt(url.searchParams.get('limit') || '10', 10);
const skip = Math.max(0, page - 1) * limit;
const total = await User.countDocuments();
const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
return NextResponse.json({ total, users, page, limit });
} catch (err) {
console.error('GET /api/users', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}


export async function POST(req: Request) {
try {
await connectDB();
const body = await req.json();
// Hash password
if (body.password) body.password = await bcrypt.hash(body.password, 10);
const created = await User.create(body);
return NextResponse.json({ created });
} catch (err) {
console.error('POST /api/users', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}