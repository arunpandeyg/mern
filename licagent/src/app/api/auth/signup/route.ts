import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';


export async function POST(req: Request) {
const body = await req.json();
const { name, email, phone, password, image } = body;
if (!name || !email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });


await connectToMongoDB();
const existing = await User.findOne({ email });
if (existing) return NextResponse.json({ message: 'Email already in use' }, { status: 400 });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


const user = new User({ name, email, phone, image, password: hashed });
await user.save();


// Return created user id for client redirection to profile edit
return NextResponse.json({ message: 'User created', userId: user._id });
}




// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { connectToMongoDB } from '../../../../lib/mongodb';
// import User from '../../../../models/User';


// export async function POST(req: Request) {
// const body = await req.json();
// const { name, email, phone, password, image } = body;
// if (!name || !email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });


// await connectToMongoDB();
// const existing = await User.findOne({ email });
// if (existing) return NextResponse.json({ message: 'Email already in use' }, { status: 400 });


// const salt = await bcrypt.genSalt(10);
// const hashed = await bcrypt.hash(password, salt);


// const user = new User({ name, email, phone, image, password: hashed });
// await user.save();


// return NextResponse.json({ message: 'User created' });
// }