import fs from 'fs'
import path from 'path'
import pify from 'pify'
import { FileNode } from '../types'
import { readdir } from '../filesystem/queries/readdir'
import flatten from 'lodash/flatten'

export async function getFilesTree (rootPath: string): Promise<string[]> {
  const node = await readFileNode(rootPath)
  return nodeToFileList(node)
}

export async function readFileNode (pathname: string): Promise<FileNode> {
  const stat = await pify(fs.stat)(pathname)
  if (stat.isDirectory()) {
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
