export interface DirectoryOrFile {
  name: string
  files?: DirectoryOrFile[]
}

export type Directories = DirectoryOrFile[]

export interface File {
  path: string
  content: string
}
