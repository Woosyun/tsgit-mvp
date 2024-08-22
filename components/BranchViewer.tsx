import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Branch, Commit } from "@/lib/types"
import React from "react"

export default function BranchViewer({
  isOpen,
  setIsOpen,
  branch
}: {
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  branch: Branch,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{branch[0]}</DialogTitle>
        </DialogHeader>
        <DialogDescription>commit history</DialogDescription>
        <Table>
        <TableCaption>Commit History</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>commit message</TableHead>
              <TableHead>commit hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branch[1].map((commit) => <CommitRow key={commit.hash} commit={commit} />)}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

function CommitRow({ commit }: { commit: Commit }) {
  return (
    <TableRow>
      <TableCell>{commit.message}</TableCell>
      <TableCell>{commit.hash}</TableCell>
    </TableRow>
  )
}