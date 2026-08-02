import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  await connectToMongoDB();

  const { params } = context;
  const id = params.id; // ✅ No await here

  const user = await User.findById(id).select("-password");

  if (!user) {
    return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}




// export async function GET(req: Request, { params }: { params: { id: string } }) {
// await connectToMongoDB();
// const user = await User.findById(params.id).select('-password');
// if (!user) return NextResponse.json({ message: 'Not found' }, { status: 404 });
// return NextResponse.json(user);
// }


export async function PUT(req: Request, { params }: { params: { id: string } }) {
await connectToMongoDB();
const body = await req.json();
// Only allow specific fields to be updated
const { name, phone, image } = body;
const user = await User.findByIdAndUpdate(params.id, { name, phone, image }, { new: true }).select('-password');
if (!user) return NextResponse.json({ message: 'Not found' }, { status: 404 });
return NextResponse.json(user);
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
await connectToMongoDB();
const user = await User.findByIdAndDelete(params.id);
if (!user) return NextResponse.json({ message: 'Not found' }, { status: 404 });
return NextResponse.json({ message: 'Deleted' });
}