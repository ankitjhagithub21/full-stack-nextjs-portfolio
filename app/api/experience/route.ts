import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Experience from "@/models/experience.model"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    const {
      company,
      position,
      description,
      startDate,
      endDate,
      currentlyWorking,
      location,
    } = body

    if (!company || !position || !description || !startDate) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      )
    }

    const experience = await Experience.create({
      company,
      position,
      description,
      startDate,
      endDate: currentlyWorking ? null : endDate,
      currentlyWorking,
      location,
    })

    return NextResponse.json({
      success: true,
      data: experience,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()

    const experiences = await Experience.find().sort({
      startDate: -1,
    })

    return NextResponse.json({
      success: true,
      experiences,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const body = await req.json()

    const {
      company,
      position,
      description,
      startDate,
      endDate,
      currentlyWorking,
      location,
    } = body

    if (!company || !position || !description || !startDate) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      )
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      {
        company,
        position,
        description,
        startDate,
        endDate: currentlyWorking ? null : endDate,
        currentlyWorking,
        location,
      },
      { new: true }
    )

    if (!updatedExperience) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedExperience,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
