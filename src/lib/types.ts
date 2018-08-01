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
  pathname: string
  content: string
}
