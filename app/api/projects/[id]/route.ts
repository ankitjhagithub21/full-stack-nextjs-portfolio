import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Project from "@/models/project.model"
import cloudinary from "@/lib/cloudinary"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const formData = await req.formData()
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const githubUrl = formData.get("githubUrl") as string
    const liveUrl = formData.get("liveUrl") as string
    const image = formData.get("image") as File

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      )
    }

    // Find existing project
    const existingProject = await Project.findById(id)
    if (!existingProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      )
    }

    let imageData = existingProject.image

    // If new image is provided, upload it
    if (image) {
      // Delete old image from Cloudinary if it exists
      if (existingProject.image?.public_id) {
        await cloudinary.uploader.destroy(existingProject.image.public_id)
      }

      // Upload new image
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: "portfolio_projects",
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

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        githubUrl,
        liveUrl,
        image: imageData,
      },
      { new: true }
    )

    return NextResponse.json({
      success: true,
      data: updatedProject,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await params
  const project = await Project.findById(id)

  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  // Delete image from Cloudinary
  if (project.image?.public_id) {
    await cloudinary.uploader.destroy(project.image.public_id)
  }

  await project.deleteOne()

  return NextResponse.json({
    success: true,
    message: "Project deleted",
  })
}
