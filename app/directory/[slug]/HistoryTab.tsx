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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HistoryTab({
  branchName,
  commits,
}: {
    branchName: string,
  commits: Commit[]
  }) {
  return (
    <ScrollArea>
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
              <TableRow key={commit.entry.hash} className='cursor-pointer'>
                <TableCell>{commit.message}</TableCell>
                <TableCell>{commit.entry.hash}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}