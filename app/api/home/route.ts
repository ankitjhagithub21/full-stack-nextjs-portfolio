import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import About from "@/models/about.model"
import Project from "@/models/project.model"
import Skill from "@/models/skill.model"
import Experience from "@/models/experience.model"
import Education from "@/models/education.model"

export async function GET() {
  try {
    await connectDB()

    // Fetch all data in parallel
    const [
      about,
      projects,
      skills,
      experiences,
      education
    ] = await Promise.all([
      // About data
      About.findOne().sort({ createdAt: -1 }),
      
      // Projects data
      Project.find(),
      
      // Skills data
      Skill.find().sort({ order: 1, createdAt: -1 }),
      
      // Experience data
      Experience.find().sort({ startDate: -1 }),
      
      // Education data
      Education.find().sort({ startDate: -1 })
    ])

    return NextResponse.json({
      success: true,
      data: {
        about,
        projects,
        skills,
        experiences,
        education
      }
    })
  } catch (error) {
    console.error("Error fetching home data:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch portfolio data",
        data: {
          about: null,
          projects: [],
          skills: [],
          experiences: [],
          education: []
        }
      },
      { status: 500 }
    )
  }
}
