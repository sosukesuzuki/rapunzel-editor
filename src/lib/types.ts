export interface DirectoryOrFile {
  name: string
  files?: DirectoryOrFile[]
}

export type Directories = DirectoryOrFile[]
