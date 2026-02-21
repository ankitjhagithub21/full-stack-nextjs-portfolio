

"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { columns, Skill } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddSkillDialog } from "./add-skill-dialog"
import { EditSkillDialog } from "./edit-skill-dialog"

export default function SkillsPage() {
  const [data, setData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const fetchSkills = async () => {
    const res = await fetch("/api/skills")
    const result = await res.json()
    setData(result.skills || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSkills()

    // Listen for edit skill events
    const handleEditSkill = (event: CustomEvent) => {
      setEditingSkill(event.detail)
      setEditDialogOpen(true)
    }

    window.addEventListener('edit-skill', handleEditSkill as EventListener)

    return () => {
      window.removeEventListener('edit-skill', handleEditSkill as EventListener)
    }
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>

        <AddSkillDialog onSuccess={fetchSkills} />
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>

      <EditSkillDialog
        skill={editingSkill}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchSkills}
      />
    </Card>
  )
}
