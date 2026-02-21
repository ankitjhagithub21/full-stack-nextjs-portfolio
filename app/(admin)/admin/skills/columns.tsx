"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Skill = {
  _id: string
  name: string
  category: string
  level: number
  icon?: string
  order: number
  createdAt: string
}

export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${row.original.level}%` }}
          />
        </div>
        <span className="text-sm font-medium">{row.original.level}%</span>
      </div>
    ),
  },
  {
    accessorKey: "order",
    header: "Order",
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
      const skill = row.original

      const handleDelete = async () => {
        await fetch(`/api/skills/${skill._id}`, {
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
              const event = new CustomEvent('edit-skill', { 
                detail: skill 
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
