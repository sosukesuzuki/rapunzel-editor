import path from 'path'
import { FileNode } from '../types'
import { readdir } from '../filesystem/queries/readdir'
import { stat } from '../filesystem/queries/stat'
import flatten from 'lodash/flatten'

export async function getFilesTree (rootPath: string): Promise<string[]> {
  const node = await readFileNode(rootPath)
  return nodeToFileList(node)
}

export async function readFileNode (pathname: string): Promise<FileNode> {
  const stats = await stat(pathname)
  if (stats.isDirectory()) {
    const pathList: string[] = await readdir(pathname)
    const children = await Promise.all(
      pathList.map(childPath => readFileNode(path.join(pathname, childPath)))
    )
    return {
      children,
      pathname,
      type: 'dir'
    }
  } else {
    return {
      pathname,
      type: 'file'
    }
  }
}

function nodeToFileList (node: FileNode): string[] {
  if (node.type === 'file') {
    return [node.pathname]
  } else if (node.type === 'dir') {
    const ret = node.children.map(childNode => nodeToFileList(childNode))
    return flatten(ret)
  } else {
    return []
  }
}
