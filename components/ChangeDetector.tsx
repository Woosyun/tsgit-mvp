import { EntryStatus, StatusType } from "@/lib/types";
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./ui/button";

const ChangeDetector = ({
  path
}: {
  path: string
}) => {
  const [status, setStatus] = useState<EntryStatus | null>(null);
  
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/vcs/get-current-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error('(fetchStatus)->' + message);
      }
      
      const { status: temp } = await res.json();
      setStatus(JSON.parse(temp)[0]);
    };

    fetchStatus();
  }, [path]);
  
  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      {status && status.children.map((child) => {
        if (child.type === 'blob') {
          return <FileChange key={child.hash} status={child} />;
        } else {
          return <FolderChange key={child.hash} status={child} />;
        }
      })}
    </ScrollArea>
  )
}

function FileChange({
  status
}: {
  status: EntryStatus
  }) {
  return (
    <p className={`ml-2 pl-2 ${IndicateStatus(status)}`}>{status.name}</p>
  );
}

function FolderChange({
  status
}: {
  status: EntryStatus
  }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <div className="ml-1">
      <p onClick={handleClick} className={`w-full border-solid border border-black ${IndicateStatus(status)} pl-2`}>{status.name}</p>
      {isOpen && status.children.map((child) => {
        if (child.type === 'blob') {
          return <FileChange key={child.hash} status={child} />;
        } else {
          return <FolderChange key={child.hash} status={child} />;
        }
      })}
    </div>
  );
}

function IndicateStatus(entryStatus: EntryStatus) {
  const status: StatusType = entryStatus.status;
  switch (status) {
    case 'added':
      return 'text-blue-500';
    case 'modified':
      return 'text-red-500';
    case 'deleted':
      return 'text-yellow-500';
    case 'unmodified':
      return 'text-gray-900';
    case 'unstaged':
      return 'text-gray-400';
    default:
      return 'text-gray-500';
  }
}

export default ChangeDetector