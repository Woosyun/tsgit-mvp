import { Commit, Hash, HeadType, EntryStatus, StatusType } from '@woosy2207/tsgit/dist/types';
export type { Commit, Hash, HeadType, EntryStatus, StatusType };

export type Directory = {
  path: string;
  lastUsed: string;
}

export type Branch = [string, Commit[]];

