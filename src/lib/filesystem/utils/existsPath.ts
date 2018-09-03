import fs from 'fs'
import pify from 'pify'

export async function existsPath (path: string): Promise<boolean> {
  try {
    await pify(fs.stat)(path)
    return true
  } catch (e) {
    return false
  }
}
