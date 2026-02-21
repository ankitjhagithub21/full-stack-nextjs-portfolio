import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/project.model";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find();

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const image = formData.get("image") as File;

    if (!title || !description || !image) {
      return NextResponse.json(
        { message: "All required fields missing" },
        { status: 400 },
      );
    }

    // Convert file to buffer for Cloudinary upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: "portfolio_projects",
          resource_type: "auto"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const project = await Project.create({
      title,
      description,
      githubUrl,
      liveUrl,
      image: {
        url: (uploadedImage as any).secure_url,
        public_id: (uploadedImage as any).public_id,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
