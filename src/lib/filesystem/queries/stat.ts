import fs from 'fs'
import pify from 'pify'

export async function stat (pathname): Promise<any> {
  const stat = await pify(fs.stat)(pathname)
  return stat
}
