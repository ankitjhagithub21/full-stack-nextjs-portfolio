import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Admin from "@/models/admin.model"

export async function POST(req: NextRequest) {
  await connectDB()

  const { email, password } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await Admin.create({
    email,
    password: hashedPassword,
  })

  return NextResponse.json(admin)
}
