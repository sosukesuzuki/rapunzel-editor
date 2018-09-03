import { rmdir } from '../commands/rmdir'
import { readdir, stat } from '../queries'
import { unlink } from '../commands/unlink'
import { join } from 'path'

export async function removeDirectory (dirpath: string): Promise<void> {
  if (dirpath === '.') throw Error('You cannot remove root directory.')
  const fileList = await readdir(dirpath)
  await Promise.all(
    fileList.map(async file => {
      const filename = join(dirpath, file)
      const stats = await stat(filename)
      if (stats.isDirectory()) {
        await removeDirectory(filename)
      } else {
        await unlink(filename)
      }
    })
  )
  await rmdir(dirpath)
}
