import { Commit, Graph, Hash } from "./types";
import VCS from '@woosy2207/tsgit';

const vcs = new VCS();

export function getGraph(dir: string): Graph {
  try {
    vcs.init(dir);
    
    const commits: Map<Hash, Commit> = new Map();
    const edges: Map<Hash, Set<Hash>> = new Map();
    const branches: Map<string, Hash> = new Map();

    const getBranch = (head: Hash) => {
      const headCommit = vcs.readObject(head);
      const branch = headCommit.branch;
      branches.set(branch, head);

      const ascendCommit = (hash: Hash): void => {
        const commit = vcs.readObject(hash);
        if (commit.branch !== branch)
          return;

        commits.set(hash, commit);
        if (commit.parentHash) {
          addEdge(edges, commit.parentHash, hash);
          ascendCommit(commit.parentHash);
        }
      }

      ascendCommit(head);
    }
    vcs.mapHeads(0, getBranch);

    return {
      commits,
      edges: new Map(Array.from(edges).map(([from, toS]) => [from, Array.from(toS)])),
      branches
    };
  } catch (error: any) {
    throw new Error('(getGraph)' + error.message);
  }
}

function addEdge(edges: Map<Hash, Set<Hash>>, from: Hash, to: Hash) {
  if (!edges.has(from)) {
    edges.set(from, new Set());
  }
  edges.get(from)?.add(to);
}