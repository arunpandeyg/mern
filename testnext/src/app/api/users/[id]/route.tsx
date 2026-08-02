// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';


export async function GET(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
const user = await User.findById(params.id).lean();
if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
return NextResponse.json({ user });
} catch (err) {
console.error('GET /api/users/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
const body = await req.json();
if (body.password) body.password = await bcrypt.hash(body.password, 10);
const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).lean();
return NextResponse.json({ updated });
} catch (err) {
console.error('PUT /api/users/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
await User.findByIdAndDelete(params.id);
return NextResponse.json({ ok: true });
} catch (err) {
console.error('DELETE /api/users/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}