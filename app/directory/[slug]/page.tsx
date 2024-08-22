'use client'
import { useEffect, useState } from "react";
import { Branch } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LocationIndicator from "@/components/LocationIndicator";
import BranchViewer from "@/components/BranchViewer";


export default function Page({ params }: { params: { slug: string } }) {
  const path = decodeURIComponent(params.slug);
  const [branches, setBranches] = useState<Branch[]>([]);

  const locationList: [string, string][] = [
    ['Home', '/'],
    ['Directory', '/directory/' + encodeURIComponent(path)],
  ];

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await fetch('/api/vcs/get-branches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
      });

      if (!res.ok) {
        const message = await res.json();
        throw new Error('(fetchBranches)' + message);
      }

      const { branches } = await res.json();
      setBranches(branches);
    };

    fetchBranches();
  }, []);

  return (
    <div>
      <LocationIndicator locationList={locationList}/>
      <Table>
        <TableCaption>Branches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>branch name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch, i) => (
            <BranchRow key={i} branch={branch}/>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BranchRow({
  branch,
}: {
    branch: Branch,
}) {
  const [isBranchViewerOpen, setIsBranchViewerOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setIsBranchViewerOpen(true)}>
        <TableCell>{branch[0]}</TableCell>
      </TableRow>
      <BranchViewer
        isOpen={isBranchViewerOpen}
        setIsOpen={setIsBranchViewerOpen}
        branch={branch}
      />
    </>
  )
}