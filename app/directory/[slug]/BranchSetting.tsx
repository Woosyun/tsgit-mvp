import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const BranchSettingIcon = ({
  handleClick
}: {
  handleClick: () => void
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width='24px'
    height='24px'
    viewBox="0 0 24 24"
    fill='#000'
    onClick={handleClick}
    className='cursor-pointer'
  >
    <circle cx="12" cy="12" r="10" fill='transparent' stroke='black' stroke-width='4px'/>
  </svg>
);

const BranchSetting = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div>
      <BranchSettingIcon handleClick={() => setIsOpen(!isOpen) }/>
      <Dialog open={isOpen} onOpenChange={(prev)=>setIsOpen(prev)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Branch Setting</DialogTitle>
            <DialogDescription>Setting for branch</DialogDescription>
          </DialogHeader>
          <div>
            <button>delete</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BranchSetting;