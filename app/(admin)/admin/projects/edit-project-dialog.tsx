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
import { Project } from "./columns"

interface Props {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditProjectDialog({ 
  project, 
  open, 
  onOpenChange, 
  onSuccess 
}: Props) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (project) {
      setTitle(project.title)
      setDescription(project.description)
      setGithubUrl(project.githubUrl || "")
      setLiveUrl(project.liveUrl || "")
      setImagePreview(project.image?.url || "")
    }
  }, [project])

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
    if (!project) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("githubUrl", githubUrl)
      formData.append("liveUrl", liveUrl)
      if (imageFile) formData.append("image", imageFile)

      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to update project")
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
          <DialogTitle>Edit Project</DialogTitle>
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

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label>Live URL</Label>
            <Input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://example.com"
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

          {/* Image */}
          <div className="space-y-2">
            <Label>Project Image</Label>
            
            {imagePreview ? (
              <div className="space-y-2">
                <div className="relative w-full h-48 border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Project preview"
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

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
