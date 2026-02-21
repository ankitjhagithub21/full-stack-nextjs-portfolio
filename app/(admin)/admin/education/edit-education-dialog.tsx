"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Education } from "./columns"

interface Props {
  education: Education | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditEducationDialog({ 
  education, 
  open, 
  onOpenChange, 
  onSuccess 
}: Props) {
  const [loading, setLoading] = useState(false)
  const [institution, setInstitution] = useState("")
  const [degree, setDegree] = useState("")
  const [fieldOfStudy, setFieldOfStudy] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (education) {
      setInstitution(education.institution)
      setDegree(education.degree)
      setFieldOfStudy(education.fieldOfStudy)
      setStartDate(new Date(education.startDate).toISOString().split('T')[0])
      setEndDate(education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : "")
      setDescription(education.description || "")
    }
  }, [education])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!education) return

    setLoading(true)

    try {
      const res = await fetch(`/api/education/${education._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institution,
          degree,
          fieldOfStudy,
          startDate,
          endDate: endDate || null,
          description,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update education")
      }

      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Institution */}
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>

          {/* Degree */}
          <div className="space-y-2">
            <Label>Degree</Label>
            <Input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          {/* Field of Study */}
          <div className="space-y-2">
            <Label>Field of Study</Label>
            <Input
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              required
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label>End Date (optional)</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Leave empty if currently studying"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Achievements, activities, etc."
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Education"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
