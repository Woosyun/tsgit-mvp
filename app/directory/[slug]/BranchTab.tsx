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
import BranchSetting from './BranchSetting';

export default function BranchTab({
  branches,
}: {
  branches: Map<string, Commit[]>
}) {
  return (
    <ScrollArea>
      <Table>
        <TableCaption>Branches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>branch name</TableHead>
            <TableHead className='w-10'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(branches).map(([branchName, commits]) => {
            return (
              <TableRow key={branchName}>
                <TableCell className='cursor-pointer'>
                  {branchName}
                </TableCell>
                <TableCell>
                  <BranchSetting />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}