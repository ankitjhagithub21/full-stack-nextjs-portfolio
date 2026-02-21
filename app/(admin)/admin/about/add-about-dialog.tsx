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

export function AddAboutDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [projectsCompleted, setProjectsCompleted] = useState("")
  const [skills, setSkills] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImageFile(file)
      setImagePreview(reader.result as string)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("subtitle", subtitle)
      formData.append("description", description)
      formData.append("resumeUrl", resumeUrl)
      formData.append("yearsExperience", yearsExperience)
      formData.append("projectsCompleted", projectsCompleted)
      formData.append("skills", skills)
      if (imageFile) formData.append("image", imageFile)

      const res = await fetch("/api/about", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to create about")
      }

      // Reset form
      setTitle("")
      setSubtitle("")
      setDescription("")
      setResumeUrl("")
      setYearsExperience("")
      setProjectsCompleted("")
      setSkills("")
      setImageFile(null)
      setImagePreview("")

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
        <Button>Add About</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add About Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>

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

          {/* Profile Image */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            
            {imagePreview ? (
              <div className="space-y-2">
                <div className="relative w-full h-48 border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleImageUpload(e.target.files[0])
                }
              />
            )}
          </div>

          {/* Resume URL */}
          <div className="space-y-2">
            <Label>Resume URL</Label>
            <Input
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://example.com/resume.pdf"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Years Experience</Label>
              <Input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Projects Completed</Label>
              <Input
                type="number"
                value={projectsCompleted}
                onChange={(e) => setProjectsCompleted(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills (comma-separated)</Label>
            <Textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={3}
              placeholder="React, TypeScript, Node.js, MongoDB"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create About"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
