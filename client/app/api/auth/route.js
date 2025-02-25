import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../../server/config/db";
import User from "../../../../server/models/User";

export async function POST(req) {
  console.log("API called!");
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  // Log JWT_SECRET to check if it's loaded
  console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ message: "JWT_SECRET is not defined in env" }, { status: 500 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return NextResponse.json({ token, userId: user._id, name: user.name });
}
