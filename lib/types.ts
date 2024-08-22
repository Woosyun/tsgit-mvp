import { Commit, Hash, HeadType } from '@woosy2207/tsgit/dist/types';
export type { Commit, Hash, HeadType };

export type Directory = {
  path: string;
  lastUsed: string;
}

export type Branch = [string, Commit[]];