"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { columns, Project } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddProjectDialog } from "./add-project-dialog"
import { EditProjectDialog } from "./edit-project-dialog"

export default function ProjectsPage() {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const fetchProjects = async () => {
    const res = await fetch("/api/projects")
    const result = await res.json()
    setData(result.projects || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()

    // Listen for edit project events
    const handleEditProject = (event: CustomEvent) => {
      setEditingProject(event.detail)
      setEditDialogOpen(true)
    }

    window.addEventListener('edit-project', handleEditProject as EventListener)

    return () => {
      window.removeEventListener('edit-project', handleEditProject as EventListener)
    }
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>

        <AddProjectDialog onSuccess={fetchProjects} />
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>

      <EditProjectDialog
        project={editingProject}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchProjects}
      />
    </Card>
  )
}
