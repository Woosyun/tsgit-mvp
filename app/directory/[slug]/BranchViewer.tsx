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


export default function BranchTab({
  branches,
}: {
  branches: Map<string, Commit[]>
}) {
  return (
    <Table>
      <TableCaption>Branches</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>branch name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from(branches).map(([branchName, commits]) => {
          return (
            <TableRow key={branchName}>
              <TableCell>{branchName}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}