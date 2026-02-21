import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Experience from "@/models/experience.model"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const body = await req.json()
    const { id } = await params

    const updated = await Experience.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    if (!updated) {
      return NextResponse.json(
        { message: "Experience not found" },
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await params
  const experience = await Experience.findById(id)

  if (!experience) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    )
  }

  await experience.deleteOne()

  return NextResponse.json({
    success: true,
    message: "Experience deleted",
  })
}
