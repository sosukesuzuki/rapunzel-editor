import fs from 'fs'
import pify from 'pify'
import { existsPath } from '../utils'

export async function rmdir (dirpath: string): Promise<void> {
  if (await existsPath(dirpath)) {
    await pify(fs.rmdir)(dirpath)
  } else {
    throw Error(`${dirpath} does not exists.`)
  }
}
