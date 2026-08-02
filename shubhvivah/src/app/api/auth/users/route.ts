
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/connectToMongoDB";
import cloudinary from "@/lib/cloudinary";

 
export async function POST(req: Request) {
    const { name, email, password, phone, image, dob } = await req.json();
    try {
        await connectToMongoDB();
        // Upload the image to Cloudinary
        if (image) {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'user-profiles',
            });
            const user = await User.create({ name, email, password, phone, image: result.secure_url, dob });
            return NextResponse.json({ user }, { status: 200 });
        }
        const user = await User.create({ name, email, password, phone, dob });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


// export async function POST(req: Request) {
//     const { name, email, password, phone, image, dob } = await req.json();
//     try {
//         await connectToMongoDB();
//         const user = await User.create({ name, email, password, phone, image, dob });
//         return NextResponse.json({ user }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 });
//     }
    
// }



export async function GET(req: Request) {
    try {
        await connectToMongoDB();
        const users = await User.find();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}




