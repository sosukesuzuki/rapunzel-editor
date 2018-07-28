import fs from 'fs'
import pify from 'pify'

export async function readFile (path: string): Promise<string> {
  const file = await pify(fs.readFile)(path)
  return file.toString()
}
