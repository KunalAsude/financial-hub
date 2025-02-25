import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ valid: false }, { status: 401 });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ valid: true });
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
