import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Skill from "@/models/skill.model"

//
// UPDATE SKILL
//
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const body = await req.json()
    const { id } = await params

    if (body.level !== undefined) {
      if (body.level < 0 || body.level > 100) {
        return NextResponse.json(
          { message: "Level must be between 0 and 100" },
          { status: 400 }
        )
      }
    }

    const updated = await Skill.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    if (!updated) {
      return NextResponse.json(
        { message: "Skill not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

//
// DELETE SKILL
//
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const skill = await Skill.findById(id)

    if (!skill) {
      return NextResponse.json(
        { message: "Skill not found" },
        { status: 404 }
      )
    }

    await skill.deleteOne()

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
