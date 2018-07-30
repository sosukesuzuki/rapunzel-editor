export type FileNode =
  | {
    type: 'dir',
    pathname: string
    children: FileNode[]
  }
  | {
    type: 'file'
    pathname: string
  }

export interface File {
  path: string
  content: string
}
