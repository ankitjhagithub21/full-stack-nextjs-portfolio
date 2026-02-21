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

export function AddExperienceDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [location, setLocation] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/experience", {
        method: "POST",
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
        throw new Error("Failed to create experience")
      }

      // Reset form
      setCompany("")
      setPosition("")
      setDescription("")
      setStartDate("")
      setEndDate("")
      setCurrentlyWorking(false)
      setLocation("")

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
        <Button>Add Experience</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Experience</DialogTitle>
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
            {loading ? "Creating..." : "Create Experience"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
