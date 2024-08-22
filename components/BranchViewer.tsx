import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Branch } from "@/lib/types"

export default function BranchViewer({
  isOpen,
  branch
}: {
  isOpen: boolean,
  branch: Branch
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Dialog description</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}