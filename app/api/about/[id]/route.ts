
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import About from "@/models/about.model"
import cloudinary from "@/lib/cloudinary"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const formData = await req.formData()
    
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const description = formData.get("description") as string
    const resumeUrl = formData.get("resumeUrl") as string
    const yearsExperience = formData.get("yearsExperience") as string
    const projectsCompleted = formData.get("projectsCompleted") as string
    const skills = formData.get("skills") as string
    const image = formData.get("image") as File

    if (!title || !subtitle || !description) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      )
    }

    // Find existing about
    const existingAbout = await About.findById(id)
    if (!existingAbout) {
      return NextResponse.json(
        { message: "About information not found" },
        { status: 404 }
      )
    }

    let imageData = existingAbout.profileImage

    // Handle case where profileImage is stored as a string (old format)
    if (typeof existingAbout.profileImage === 'string') {
      imageData = undefined // Reset to undefined so new image can replace it
    }

    // If new image is provided, upload it
    if (image) {
      // Delete old image from Cloudinary if it exists
      if (existingAbout.profileImage?.public_id) {
        await cloudinary.uploader.destroy(existingAbout.profileImage.public_id)
      }

      // Upload new image
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: "portfolio_about",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      })

      imageData = {
        url: (uploadedImage as any).secure_url,
        public_id: (uploadedImage as any).public_id,
      }
    }

    const updatedAbout = await About.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        resumeUrl,
        yearsExperience: parseInt(yearsExperience) || 0,
        projectsCompleted: parseInt(projectsCompleted) || 0,
        skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        ...(imageData && { profileImage: imageData }),
      },
      { returnDocument: 'after' }
    )

    return NextResponse.json({
      success: true,
      about: updatedAbout,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    
    const deletedAbout = await About.findByIdAndDelete(id)

    if (!deletedAbout) {
      return NextResponse.json(
        { message: "About information not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "About information deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete about information" },
      { status: 500 }
    )
  }
}