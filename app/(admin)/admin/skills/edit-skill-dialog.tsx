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
import { Label } from "@/components/ui/label"
import { Skill } from "./columns"

interface Props {
  skill: Skill | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditSkillDialog({ 
  skill, 
  open, 
  onOpenChange, 
  onSuccess 
}: Props) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [icon, setIcon] = useState("")
  const [order, setOrder] = useState("")

  useEffect(() => {
    if (skill) {
      setName(skill.name)
      setCategory(skill.category)
      setLevel(skill.level.toString())
      setIcon(skill.icon || "")
      setOrder(skill.order.toString())
    }
  }, [skill])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!skill) return

    setLoading(true)

    try {
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          level: parseInt(level),
          icon,
          order: parseInt(order) || 0,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update skill")
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
          <DialogTitle>Edit Skill</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label>Level (0-100)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label>Icon (optional)</Label>
            <Input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Icon name or URL"
            />
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="Display order"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Skill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
