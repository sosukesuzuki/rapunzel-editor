import { rmdir } from '../filesystem/commands/rmdir'
import { readdir } from '../filesystem/queries/readdir'
import { stat } from '../filesystem/queries/stat'
import { unlink } from '../filesystem/commands/unlink'
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
