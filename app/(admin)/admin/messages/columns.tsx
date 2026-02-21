"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Message = {
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

export const columns: ColumnDef<Message>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => row.original.subject || "-",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original.message}>
        {row.original.message}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const statusConfig = {
        new: { label: "New", className: "bg-blue-100 text-blue-800" },
        read: { label: "Read", className: "bg-yellow-100 text-yellow-800" },
        replied: { label: "Replied", className: "bg-green-100 text-green-800" },
      }
      
      const config = statusConfig[status]
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
          {config.label}
        </span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const message = row.original

      const handleDelete = async () => {
        await fetch(`/api/contact/${message._id}`, {
          method: "DELETE",
        })
        window.location.reload()
      }

      const handleStatusUpdate = async (newStatus: "read" | "replied") => {
        await fetch(`/api/contact/${message._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        })
        window.location.reload()
      }

      return (
        <div className="flex gap-2 flex-wrap">
          {message.status === "new" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusUpdate("read")}
            >
              Mark Read
            </Button>
          )}
          {message.status === "read" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusUpdate("replied")}
            >
              Mark Replied
            </Button>
          )}
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
