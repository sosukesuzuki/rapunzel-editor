import { FileNode } from './types'

export function fileNodePadding (fileNode: FileNode): number {
  const { pathname } = fileNode
  if (pathname === '.') {
    return 5 
  } else {
    return (pathname.split('/').length - 1) * 5 + 6
  }
}
