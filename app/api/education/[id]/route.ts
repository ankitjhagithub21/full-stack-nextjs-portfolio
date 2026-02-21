import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Education from "@/models/education.model"

//
// UPDATE EDUCATION
//
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const body = await req.json()

    const { id } = await params
 

    const updated = await Education.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    if (!updated) {
      return NextResponse.json(
        { message: "Education not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Education updated",
      education: updated,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update education" },
      { status: 500 }
    )
  }
}

//
// DELETE EDUCATION
//
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    
    const deleted = await Education.findByIdAndDelete(
      id
    )

    if (!deleted) {
      return NextResponse.json(
        { message: "Education not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Education deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete education" },
      { status: 500 }
    )
  }
}
