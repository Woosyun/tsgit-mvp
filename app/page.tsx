'use client'
import DirectorySelector from "@/components/DirectorySelector";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Directory } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const page = () => {
  const [dirs, setDirs] = useState<Directory[]>([]);
  const router = useRouter();

  const redirectToDirectory = async (dir: string) => {
    // alert(dir);
    const res = await fetch('/api/dir/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: dir }),
    });
    if (!res.ok) {
      const { message } = await res.json();
      alert(message);
      console.error('(redirectToDirectory) Failed to check directory');
      return;
    }
    const { path } = await res.json();
    router.push(`/directory/${encodeURIComponent(path)}`);
  }

  useEffect(() => {
    const fetchDirs = async () => {
      const res = await fetch('/api/dirs/get');
      if (!res.ok) {
        const message = await res.json();
        console.error('(fetchDirs)' + message);
        return;
      }

      const { directories: data } = await res.json();
      const directories = JSON.parse(data);
      setDirs(directories);
    }
    
    fetchDirs();
  }, []);
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <DirectorySelector />

      <Table>
        <TableCaption>A list of directories you have used</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>directory</TableHead>
            <TableHead>last used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dirs.map((dir: Directory) => <Row key={dir.path} dir={dir} handleClick={redirectToDirectory}/>)}
        </TableBody>
      </Table>
    </div>
  )
}

function Row({ dir, handleClick }: { dir: Directory, handleClick: (dir: string) => void }) {
  return (
    <TableRow onClick={() => handleClick(dir.path)}>
      <TableCell>{dir.path}</TableCell>
      <TableCell>{dir.lastUsed}</TableCell>
    </TableRow>
  )
}

export default page;