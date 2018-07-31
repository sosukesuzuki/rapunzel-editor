import { rmdir } from '../filesystem/commands/rmdir'
import { readdir } from '../filesystem/queries/readdir'
import { stat } from '../filesystem/queries/stat'
import { unlink } from '../filesystem/commands/unlink'
import { join } from 'path'

export async function removeDirectory (dirpath: string): Promise<void> {
  const fileList = await readdir(dirpath)
  fileList.forEach(async file => {
    const filename = join(dirpath, file)
    const stats = await stat(filename)

    if (filename === '.' || filename === '..') {
      return
    } else if (stats.isDirectory()) {
      removeDirectory(filename)
    } else {
      await unlink(filename)
    }
  })
  rmdir(dirpath)
}
