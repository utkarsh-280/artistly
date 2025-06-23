"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle, XCircle } from "lucide-react"

interface ArtistSubmission {
  id: string
  name: string
  categories: string[]
  location: string
  feeRange: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

// Mock data for artist submissions with Indian artists
const mockSubmissions: ArtistSubmission[] = [
  {
    id: "1",
    name: "Arijit Singh",
    categories: ["singers"],
    location: "Mumbai, Maharashtra",
    feeRange: "₹5,00,000-10,00,000",
    status: "approved",
    submittedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Shakti Mohan",
    categories: ["dancers"],
    location: "Mumbai, Maharashtra",
    feeRange: "₹2,00,000-4,00,000",
    status: "pending",
    submittedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "DJ Chetas",
    categories: ["djs"],
    location: "Mumbai, Maharashtra",
    feeRange: "₹2,00,000-4,00,000",
    status: "approved",
    submittedAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Sadhguru",
    categories: ["speakers"],
    location: "Coimbatore, Tamil Nadu",
    feeRange: "₹10,00,000-25,00,000",
    status: "pending",
    submittedAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Neha Kakkar",
    categories: ["singers"],
    location: "Mumbai, Maharashtra",
    feeRange: "₹3,00,000-6,00,000",
    status: "rejected",
    submittedAt: "2024-01-11",
  },
]

export default function DashboardTable() {
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>(mockSubmissions)

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setSubmissions((prev) =>
      prev.map((submission) => (submission.id === id ? { ...submission, status: newStatus } : submission)),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Artist Submissions</CardTitle>
        <p className="text-gray-600">Manage and review Indian artist applications</p>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fee Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {submission.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{submission.location}</TableCell>
                  <TableCell>{submission.feeRange}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {submission.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(submission.id, "approved")}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(submission.id, "rejected")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
