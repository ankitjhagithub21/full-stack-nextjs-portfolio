"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditAboutDialog } from "./edit-about-dialog"
import { AddAboutDialog } from "./add-about-dialog"

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
  createdAt: string
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const fetchAbout = async () => {
    const res = await fetch("/api/about")
    const result = await res.json()
    setAbout(result.about)
    setLoading(false)
  }

  useEffect(() => {
    fetchAbout()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p>Loading about information...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">About Information</h1>
          <p className="text-muted-foreground">
            Manage your portfolio's about section
          </p>
        </div>
        
        {about ? (
          <Button onClick={() => setEditDialogOpen(true)}>
            Edit About
          </Button>
        ) : (
          <Button onClick={() => setAddDialogOpen(true)}>
            Create About
          </Button>
        )}
      </div>

      {/* Content */}
      {about ? (
        <Card>
          <CardHeader>
            <CardTitle>{about.title}</CardTitle>
            <p className="text-muted-foreground">{about.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{about.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{about.yearsExperience}</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{about.projectsCompleted}+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{about.skills.length}</div>
                <div className="text-sm text-muted-foreground">Skills</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">
                  {about.profileImage ? "✓" : "✗"}
                </div>
                <div className="text-sm text-muted-foreground">Profile Image</div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="grid md:grid-cols-2 gap-4">
              {about.profileImage && (
                <div>
                  <h3 className="font-semibold mb-2">Profile Image</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {about.profileImage.url}
                  </p>
                </div>
              )}
              {about.resumeUrl && (
                <div>
                  <h3 className="font-semibold mb-2">Resume URL</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {about.resumeUrl}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No About Information</h3>
              <p className="text-muted-foreground">
                Create your about section to display on your portfolio
              </p>
            </div>
            <Button onClick={() => setAddDialogOpen(true)}>
              Create About Section
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <EditAboutDialog
        about={about}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchAbout}
      />
      
      <AddAboutDialog
        onSuccess={() => {
          fetchAbout()
          setAddDialogOpen(false)
        }}
      />
    </div>
  )
}
