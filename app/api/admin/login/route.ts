import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Admin from "@/models/admin.model"
import { signToken } from "@/lib/jwt"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = signToken({
      id: admin._id,
      email: admin.email,
    })

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    })

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
