"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Props {
  onSuccess: () => void
}

export function AddEducationDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [institution, setInstitution] = useState("")
  const [degree, setDegree] = useState("")
  const [fieldOfStudy, setFieldOfStudy] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/education", {
        method: "POST",
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
        throw new Error("Failed to create education")
      }

      // Reset form
      setInstitution("")
      setDegree("")
      setFieldOfStudy("")
      setStartDate("")
      setEndDate("")
      setDescription("")

      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Education</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Education</DialogTitle>
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
            {loading ? "Creating..." : "Create Education"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
