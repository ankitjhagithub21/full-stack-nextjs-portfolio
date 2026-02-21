"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Project = {
  _id: string
  title: string
  description: string
  githubUrl: string
  liveUrl: string
  image: {
    url: string
    public_id: string
  }
  createdAt: string
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "githubUrl",
    header: "GitHub",
    cell: ({ row }) => {
      const githubUrl = row.original.githubUrl
      return githubUrl ? (
        <Button
          variant="link"
          size="sm"
          onClick={() => window.open(githubUrl, "_blank")}
        >
          View Code
        </Button>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    accessorKey: "liveUrl",
    header: "Live Demo",
    cell: ({ row }) => {
      const liveUrl = row.original.liveUrl
      return liveUrl ? (
        <Button
          variant="link"
          size="sm"
          onClick={() => window.open(liveUrl, "_blank")}
        >
          View Live
        </Button>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      const handleDelete = async () => {
        await fetch(`/api/projects/${project._id}`, {
          method: "DELETE",
        })
        window.location.reload()
      }

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // This will be handled by the parent component
              const event = new CustomEvent('edit-project', { 
                detail: project 
              })
              window.dispatchEvent(event)
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )
    },
  },
]
