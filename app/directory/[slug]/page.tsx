'use client'
import { useEffect, useState } from "react";
import { Commit } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangeDetector from "@/components/ChangeDetector";
import BranchViewer from "./BranchViewer";
import HistoryViewer from "./HistoryViewer";
import { Button } from "@/components/ui/button";


export default function Page({ params }: { params: { slug: string } }) {
  const path = decodeURIComponent(params.slug);
  const [branches, setBranches] = useState<Map<string, Commit[]>>(new Map());
  const [currentBranchName, setCurrentBranchName] = useState<string>("");

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

      const { branches, currentBranchName } = await res.json();
      
      setBranches(new Map(branches));
      setCurrentBranchName(currentBranchName);
    };

    fetchBranches();
  }, []);

  return (
    <div className='flex flex-row gap-2 w-screen h-screen p-2'>
      <div className='flex flex-col gap-2 w-1/5 h-full'>
        <ChangeDetector path={path} />
        <Button>commit</Button>
      </div>
      
      <Tabs className='w-full h-full'>
        <TabsList>
          <TabsTrigger value='branches'>branches</TabsTrigger>
          <TabsTrigger value="history">commit history</TabsTrigger>
        </TabsList>
        <TabsContent value='branches'>
          <BranchViewer branches={branches} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryViewer branchName={currentBranchName} commits={branches.get(currentBranchName)!} />
        </TabsContent>
      </Tabs>
    </div>
  )
}