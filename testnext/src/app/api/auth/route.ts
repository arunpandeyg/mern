// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { email, password } = data;
    const user = await User.findOne({ email }).lean();
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    if (user.role !== "admin")
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" }
    );
    return NextResponse.json({ token });
  } catch (err) {
    console.error("auth/login error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
