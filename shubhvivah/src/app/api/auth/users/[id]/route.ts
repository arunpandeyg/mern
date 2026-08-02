import {v2 as cloudinary} from "cloudinary";
import connectToMongoDB from "@/lib/connectToMongoDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToMongoDB();
        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove the related image from Cloudinary
    if (user.image) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//     try {
//         await connectToMongoDB();
//         const user = await User.findByIdAndDelete(params.id);
//         if (!user) {
//             return NextResponse.json({ error: 'User not found' }, { status: 404 });
//         }
//         return NextResponse.json({ user }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 });
//     }
// }

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name, email, password, phone, image, dob } = await req.json();
    try {
        await connectToMongoDB();
        const user = await User.findByIdAndUpdate(params.id, { name, email, password, phone, image, dob }, { new: true });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}