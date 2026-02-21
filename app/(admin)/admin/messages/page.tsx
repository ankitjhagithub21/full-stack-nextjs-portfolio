"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { columns, Message } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MessagesPage() {
  const [data, setData] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const res = await fetch("/api/contact")
    const result = await res.json()
    setData(result.messages || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Messages</CardTitle>
        
        <div className="text-sm text-muted-foreground">
          {data.filter(m => m.status === "new").length} new messages
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>
    </Card>
  )
}
