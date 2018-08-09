import fs from 'fs'
import pify from 'pify'

export async function readdir (path: string): Promise<string[]> {
  const filenames = await pify(fs.readdir)(path)
  return filenames
}
