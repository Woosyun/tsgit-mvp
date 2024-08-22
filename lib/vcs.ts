import { Branch, Commit, Hash, HeadType } from "./types";
import VCS from '@woosy2207/tsgit';

export const vcs = new VCS();

export function getBranches(headType: HeadType): Branch[]{
  const headNames: string[] = vcs.getHeadNames(headType);
  const heads: [string, Hash][] = headNames.map((headName: string) => [headName, vcs.getHead(headType, headName)]);
  return heads.map(getBranch);
}

function getBranch([headName, head]: [headName: string, head: Hash]): Branch {
  const ascendCommit = (hash: Hash): Commit[] => {
    const commit: Commit = vcs.readObject(hash);
    
    if (commit.branch !== headName) return [];
    if (!commit.parentHash) return [commit];

    return [commit, ...ascendCommit(commit.parentHash)];
  }

  const commits: Commit[] = ascendCommit(head);
  return [headName, commits];
}