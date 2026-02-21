import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"

import Project from "@/models/project.model"
import Skill from "@/models/skill.model"
import Experience from "@/models/experience.model"
import Education from "@/models/education.model"
import Contact from "@/models/contact.model"

export async function GET() {
  try {
    await connectDB()

    // Run queries in parallel (better performance)
    const [
      totalProjects,
      totalSkills,
      totalExperience,
      totalEducation,
      unreadMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Contact.countDocuments({ status: "new" }),
    ])

    return NextResponse.json({
      stats: {
        totalProjects,
        totalSkills,
        totalExperience,
        totalEducation,
        unreadMessages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}
