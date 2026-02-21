import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Skill from "@/models/skill.model"

//
// CREATE SKILL (Admin)
//
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { name, category, level, icon, order } = await req.json()

    if (!name || !category || level === undefined) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      )
    }

    if (level < 0 || level > 100) {
      return NextResponse.json(
        { message: "Level must be between 0 and 100" },
        { status: 400 }
      )
    }

    const skill = await Skill.create({
      name,
      category,
      level,
      icon,
      order: order || 0,
    })

    return NextResponse.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

//
// GET ALL SKILLS (Public)
//
export async function GET() {
  try {
    await connectDB()

    const skills = await Skill.find()
      .sort({ order: 1, createdAt: -1 })

    return NextResponse.json({
      success: true,
      skills,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

