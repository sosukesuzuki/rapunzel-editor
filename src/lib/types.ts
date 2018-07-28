export interface Directory {
  name: string
  files?: File[]
}

export interface File {
  name: string
  content: string
}

export type Directories = (Directory | File)[]
