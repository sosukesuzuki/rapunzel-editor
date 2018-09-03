import fs from 'fs'
import pify from 'pify'
import { existsPath } from '../utils'

export async function mkdir (dirpath: string): Promise<void> {
  if (await existsPath(dirpath)) {
    throw Error(`${dirpath} is already exists.`)
  } else {
    await pify(fs.mkdir)(dirpath)
  }
}
