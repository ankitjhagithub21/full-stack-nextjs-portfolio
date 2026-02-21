"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
  totalProjects: number
  totalSkills: number
  totalExperience: number
  totalEducation: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard")
        const data = await res.json()
        setStats(data.stats)
      } catch (error) {
        console.error("Failed to load stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {stats?.totalProjects ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {stats?.totalSkills ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {stats?.totalExperience ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unread Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {stats?.unreadMessages ?? 0}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
