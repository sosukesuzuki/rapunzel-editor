import { readdir } from '../filesystem/queries/readdir'
import { Directories } from '../types'

export async function readDirectories (path: string): Promise<Directories> {
  const directories: Directories = (await readdir(path)).map(dir => ({
    name: dir
  }))
  return directories
}