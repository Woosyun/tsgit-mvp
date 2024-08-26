import React, { useState } from 'react'
import ChangeDetector from "@/components/ChangeDetector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Sidebar = ({
  path,
}: {
    path: string;
}) => {
  const [isCommit, setIsCommit] = useState(false);

  return (
    <div className='flex flex-col gap-2 w-1/5 h-full'>
      <ChangeDetector path={path} />
      {isCommit ? (
        <>
          <Input className='w-full h-full' />
          <Button onClick={() => alert('commit!')}>commit</Button>
          <Button onClick={() => setIsCommit(false)}>cancel</Button>
        </>
      ) : (
        <>
          <Button onClick={() => setIsCommit(true)}>write commit message</Button>
        </>
      )}
    </div>
  )
}

export default Sidebar