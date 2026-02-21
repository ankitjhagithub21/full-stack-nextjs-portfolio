import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Contact from "@/models/contact.model"

//
// UPDATE (Mark as Read)
//
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { status } = await req.json()
    const { id } = await params
    
    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json(
        { message: "Message not found" },
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
// DELETE MESSAGE
//
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await params
  const message = await Contact.findById(id)

  if (!message) {
    return NextResponse.json(
      { message: "Message not found" },
      { status: 404 }
    )
  }

  await message.deleteOne()

  return NextResponse.json({
    success: true,
    message: "Message deleted",
  })
}
