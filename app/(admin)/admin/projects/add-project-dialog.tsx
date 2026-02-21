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

export function AddProjectDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(file)
      setImagePreview(reader.result as string)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("githubUrl", githubUrl)
      formData.append("liveUrl", liveUrl)
      if (image) formData.append("image", image)

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to create project")
      }

      // Reset form
      setTitle("")
      setDescription("")
      setGithubUrl("")
      setLiveUrl("")
      setImage(null)
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
        <Button>Add Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
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
                required
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
