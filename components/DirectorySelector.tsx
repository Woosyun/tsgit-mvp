'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation';

const DirectorySelector = () => {
  const [dir, setDir] = useState<string>('');
  const router = useRouter();
  
  const handleClick = async () => {
    const res = await fetch('/api/dirs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: dir }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      alert(message);
      console.error('(DirectorySelector) Failed to add directory');
      return;
    }

    const { path } = await res.json();
    router.push(`/directory/${encodeURIComponent(path)}`);
  }
  
  return (
    <div className='flex flex-row gap-2'>
      <Input
        className="border-2"
        placeholder="directory" value={dir} onChange={(e) => setDir(e.target.value)} />
      <Button onClick={handleClick}>open</Button>
    </div>
  )
}

export default DirectorySelector