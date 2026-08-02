import { NextRequest, NextResponse } from "next/server";


export const middleware = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    const isAuth = !!token;

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (isAuth) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }
}