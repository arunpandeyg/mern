import { NextResponse } from 'next/server';
import cloudinary from '../../../lib/cloudinary';


export const runtime = 'edge' in globalThis ? 'edge' : 'nodejs'; // best-effort runtime declaration


export async function POST(req: Request) {
try {
const formData = await req.formData();
const file = formData.get('file') as any;
if (!file) return NextResponse.json({ message: 'No file' }, { status: 400 });


// Read file as arrayBuffer
const buffer = await file.arrayBuffer();
const base64 = Buffer.from(buffer).toString('base64');
const dataUri = `data:${file.type};base64,${base64}`;


const uploadResult = await cloudinary.uploader.upload(dataUri, {
folder: 'user-profiles',
transformation: [{ width: 800, crop: 'limit' }],
});


return NextResponse.json({ url: uploadResult.secure_url });
} catch (err: any) {
return NextResponse.json({ message: err.message || 'Upload failed' }, { status: 500 });
}
}