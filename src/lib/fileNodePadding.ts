import { FileNode } from './types'

export function fileNodePadding (fileNode: FileNode): number {
  const { pathname } = fileNode
  if (pathname === '.') {
    return 13
  } else {
    return (pathname.split('/').length - 1) * 5 + 25
  }
}
