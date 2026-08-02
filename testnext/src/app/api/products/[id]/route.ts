// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectDB } from '@/lib/mongoose';


export async function GET(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
const prod = await Product.findById(params.id).lean();
if (!prod) return NextResponse.json({ error: 'Not found' }, { status: 404 });
return NextResponse.json({ product: prod });
} catch (err) {
console.error('GET /api/products/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
const body = await req.json();
const updated = await Product.findByIdAndUpdate(params.id, body, { new: true }).lean();
return NextResponse.json({ updated });
} catch (err) {
console.error('PUT /api/products/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
try {
await connectDB();
await Product.findByIdAndDelete(params.id);
return NextResponse.json({ ok: true });
} catch (err) {
console.error('DELETE /api/products/[id]', err);
return NextResponse.json({ error: String(err) }, { status: 500 });
}
}