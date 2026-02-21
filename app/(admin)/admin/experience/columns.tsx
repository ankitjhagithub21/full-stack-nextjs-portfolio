"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Experience = {
  _id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  currentlyWorking: boolean
  location?: string
  createdAt: string
}

export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location || "-",
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
      const { endDate, currentlyWorking } = row.original
      return currentlyWorking ? "Present" : (endDate ? new Date(endDate).toLocaleDateString() : "-")
    },
  },
  {
    accessorKey: "currentlyWorking",
    header: "Current",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.original.currentlyWorking 
          ? "bg-green-100 text-green-800" 
          : "bg-gray-100 text-gray-800"
      }`}>
        {row.original.currentlyWorking ? "Yes" : "No"}
      </span>
    ),
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
      const experience = row.original

      const handleDelete = async () => {
        await fetch(`/api/experience/${experience._id}`, {
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
              const event = new CustomEvent('edit-experience', { 
                detail: experience 
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
