import fs from 'fs'
import pify from 'pify'
import { existsPath } from '../../utils/existsPath'

export async function unlink (pathname: string) {
  if (await existsPath(pathname)) {
    await pify(fs.unlink)(pathname)
  } else {
    throw Error(`${pathname} does not exists.`)
  }
}
