import fs, { write } from 'fs';
import path from 'path';
import os from 'os';
import { Directory } from './types';

const resolve = (filePath: string): string => {
  if (filePath.startsWith('~/')) {
    return path.resolve(path.join(os.homedir(), filePath.slice(2)));
  }
  return path.resolve(filePath);
};
export function checkPath(dir: string): string {
  const path = resolve(dir);
  
  if (!fs.existsSync(path)) {
    throw new Error('(checkPath) Given path does not exist');
  }

  const stat = fs.statSync(path);
  if (!stat.isDirectory())
    throw new Error('(checkPath) Given path is not a directory');

  return path;
}

const directoriesPath = '~/.tsgitDirectories.json';
function getDirectoriesPath(): string {
  const resolvedPath = resolve(directoriesPath);
  return resolvedPath;
}

export function writeDirectories(directories: Directory[]): void {
  try {
    fs.writeFileSync(getDirectoriesPath(), JSON.stringify(directories), 'utf-8');
  } catch (error: any) {
    throw new Error('(writeDirectories) ' + error.message);
  }
}
export function readDirectories(): Directory[] {
  try {
    const path = getDirectoriesPath();
    if (!fs.existsSync(path)) {
      writeDirectories([]);
    }
    const directoriesPrimitive = fs.readFileSync(getDirectoriesPath(), 'utf-8');
    return JSON.parse(directoriesPrimitive);
  } catch (error: any) {
    throw new Error('(readDirectories) ' + error.message);
  }
}

export function addDirectory(dir: string): string {
  try {
    const path = checkPath(dir);
  
    const oldDirs: Directory[] = readDirectories();
    const m = new Map(oldDirs.map((dir) => [dir.path, dir]));
    
    const currentTime = new Date().toLocaleString();
    const newDir: Directory = {
      path,
      lastUsed: currentTime
    };

    m.set(path, newDir);
    const newDirs: Directory[] = Array.from(m.values());
    writeDirectories(newDirs);

    return path;
  } catch (error: any) {
    throw new Error('(addDirectory) ' + error.message);
  }
}