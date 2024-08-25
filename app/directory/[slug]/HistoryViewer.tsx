'use client'
import { Commit } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function HistoryViewer({
  branchName,
  commits,
}: {
    branchName: string,
  commits: Commit[]
  }) {
  return (
    <Table>
      <TableCaption>Commit History</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>commit message</TableHead>
          <TableHead>commit hash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commits.map((commit: Commit) => {
          return (
            <TableRow key={commit.entry.hash}>
              <TableCell>{commit.message}</TableCell>
              <TableCell>{commit.entry.hash}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}