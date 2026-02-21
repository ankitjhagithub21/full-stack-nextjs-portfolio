import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Education from "@/models/education.model"

//
// GET ALL EDUCATION
//
export async function GET() {
  try {
    await connectDB()

    const education = await Education.find().sort({
      startDate: -1,
    })

    return NextResponse.json({
      success: true,
      education,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch education" },
      { status: 500 }
    )
  }
}

//
// CREATE EDUCATION
//
export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const newEducation = await Education.create(body)

    return NextResponse.json(
      {
        message: "Education added successfully",
        education: newEducation,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create education" },
      { status: 500 }
    )
  }
}
