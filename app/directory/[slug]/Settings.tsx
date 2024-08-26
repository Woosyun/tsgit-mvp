import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Settings() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <Label>ignore</Label>
        <div className='flex flex-row gap-2'>
          <Input />
          <Button>Add</Button>
        </div>
      </div>
    </div>
  )
}