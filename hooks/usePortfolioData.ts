"use client"

import { useEffect, useState } from "react"

interface About {
  _id: string
  title: string
  subtitle: string
  description: string
  profileImage?: {
    url: string
    public_id: string
  }
  resumeUrl?: string
  yearsExperience: number
  projectsCompleted: number
  skills: string[]
}

interface Project {
  _id: string
  title: string
  description: string
  githubUrl?: string
  liveUrl?: string
  image: {
    url: string
    public_id: string
  }
}

interface Skill {
  _id: string
  name: string
  category: string
  level: number
  icon?: string
  order: number
}

interface Experience {
  _id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  currentlyWorking: boolean
  location?: string
}

interface Education {
  _id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  currentlyStudying?: boolean
  description?: string
}

interface PortfolioData {
  about: About | null
  projects: Project[]
  skills: Skill[]
  experiences: Experience[]
  education: Education[]
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>({
    about: null,
    projects: [],
    skills: [],
    experiences: [],
    education: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await fetch("/api/home")
        const result = await res.json()
        
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.message || "Failed to load portfolio data")
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
        setError("Failed to load portfolio data")
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  return { data, loading, error }
}
