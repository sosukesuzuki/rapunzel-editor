import fs from 'fs'
import pify from 'pify'
import { existsPath } from '../../utils/existsPath'

export async function rename (oldPathname: string, newPathname: string): Promise<void> {
  if (!await existsPath(newPathname)) {
    await pify(fs.rename)(oldPathname, newPathname)
  } else {
    throw Error(`${newPathname} does exists.`)
  }
}
