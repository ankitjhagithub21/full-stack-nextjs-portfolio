import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Contact from "@/models/contact.model"

//
// PUBLIC: Send Message
//
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      )
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

//
// ADMIN: Get All Messages
//
export async function GET() {
  try {
    await connectDB()

    const messages = await Contact.find().sort({
      createdAt: -1,
    })

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

