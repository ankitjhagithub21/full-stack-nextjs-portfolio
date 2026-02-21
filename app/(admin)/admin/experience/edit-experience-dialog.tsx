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
import { Experience } from "./columns"

interface Props {
  experience: Experience | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditExperienceDialog({ 
  experience, 
  open, 
  onOpenChange, 
  onSuccess 
}: Props) {
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (experience) {
      setCompany(experience.company)
      setPosition(experience.position)
      setDescription(experience.description)
      setStartDate(new Date(experience.startDate).toISOString().split('T')[0])
      setEndDate(experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : "")
      setCurrentlyWorking(experience.currentlyWorking)
      setLocation(experience.location || "")
    }
  }, [experience])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!experience) return

    setLoading(true)

    try {
      const res = await fetch(`/api/experience/${experience._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          position,
          description,
          startDate,
          endDate: currentlyWorking ? null : endDate,
          currentlyWorking,
          location,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update experience")
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
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div className="space-y-2">
            <Label>Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
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

          {/* Currently Working */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={currentlyWorking}
              onChange={(e) => setCurrentlyWorking(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="currentlyWorking">Currently working here</Label>
          </div>

          {/* End Date */}
          {!currentlyWorking && (
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Experience"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
