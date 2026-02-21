"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { columns, Experience } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddExperienceDialog } from "./add-experience-dialog"
import { EditExperienceDialog } from "./edit-experience-dialog"

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const fetchExperiences = async () => {
    const res = await fetch("/api/experience")
    const result = await res.json()
    setData(result.experiences || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchExperiences()

    // Listen for edit experience events
    const handleEditExperience = (event: CustomEvent) => {
      setEditingExperience(event.detail)
      setEditDialogOpen(true)
    }

    window.addEventListener('edit-experience', handleEditExperience as EventListener)

    return () => {
      window.removeEventListener('edit-experience', handleEditExperience as EventListener)
    }
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experience</CardTitle>

        <AddExperienceDialog onSuccess={fetchExperiences} />
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>

      <EditExperienceDialog
        experience={editingExperience}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchExperiences}
      />
    </Card>
  )
}