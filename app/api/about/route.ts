import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import About from "@/models/about.model"
import cloudinary from "@/lib/cloudinary"

export async function GET() {
  try {
    await connectDB()

    const about = await About.findOne().sort({ createdAt: -1 })

    if (!about) {
      return NextResponse.json({
        success: true,
        about: null,
      })
    }

    return NextResponse.json({
      success: true,
      about,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch about information" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

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

    // Find existing about to check for old format
    const existingAbout = await About.findOne()
    let imageData: { url: string; public_id: string } | undefined = undefined

    // If image is provided, upload it to Cloudinary
    if (image) {
      // Delete old image from Cloudinary if it exists and is in new format
      if (existingAbout?.profileImage?.public_id) {
        await cloudinary.uploader.destroy(existingAbout.profileImage.public_id)
      }

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

    const newAbout = await About.create({
      title,
      subtitle,
      description,
      resumeUrl,
      yearsExperience: parseInt(yearsExperience) || 0,
      projectsCompleted: parseInt(projectsCompleted) || 0,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      ...(imageData && { profileImage: imageData }),
    })

    return NextResponse.json(
      {
        message: "About information created successfully",
        about: newAbout,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}


