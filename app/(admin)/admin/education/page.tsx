"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { columns, Education } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddEducationDialog } from "./add-education-dialog"
import { EditEducationDialog } from "./edit-education-dialog"

export default function EducationPage() {
  const [data, setData] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const fetchEducation = async () => {
    const res = await fetch("/api/education")
    const result = await res.json()
    setData(result.education || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEducation()

    // Listen for edit education events
    const handleEditEducation = (event: CustomEvent) => {
      setEditingEducation(event.detail)
      setEditDialogOpen(true)
    }

    window.addEventListener('edit-education', handleEditEducation as EventListener)

    return () => {
      window.removeEventListener('edit-education', handleEditEducation as EventListener)
    }
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>

        <AddEducationDialog onSuccess={fetchEducation} />
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>

      <EditEducationDialog
        education={editingEducation}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchEducation}
      />
    </Card>
  )
}
