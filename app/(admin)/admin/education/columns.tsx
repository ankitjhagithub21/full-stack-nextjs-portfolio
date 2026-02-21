"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Education = {
  _id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  description?: string
  createdAt: string
}

export const columns: ColumnDef<Education>[] = [
  {
    accessorKey: "institution",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Institution
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "degree",
    header: "Degree",
  },
  {
    accessorKey: "fieldOfStudy",
    header: "Field of Study",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const endDate = row.original.endDate
      return endDate ? new Date(endDate).toLocaleDateString() : "Present"
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
      const education = row.original

      const handleDelete = async () => {
        await fetch(`/api/education/${education._id}`, {
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
              const event = new CustomEvent('edit-education', { 
                detail: education 
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
