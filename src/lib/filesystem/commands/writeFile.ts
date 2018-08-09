import fs from 'fs'
import pify from 'pify'

export async function writeFile (path: string, content: string): Promise<void> {
  await pify(fs.writeFile)(path, content)
}
