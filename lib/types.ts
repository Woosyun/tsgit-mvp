import { Commit, Hash } from '@woosy2207/tsgit/dist/types';

export type Directory = {
  path: string;
  lastUsed: string;
}

export type { Commit, Hash };
export type Graph = {
  commits: Map<Hash, Commit>
  edges: Map<Hash, Hash[]>;
  branches: Map<string, Hash>;
}