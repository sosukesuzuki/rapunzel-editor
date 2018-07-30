import { observable, action } from 'mobx'
import { FileNode } from '../types'

export class FileTreeStore {
  @observable public fileTree: FileNode

  constructor (fileTree: FileNode) {
    this.fileTree = fileTree
  }

  @action setFileTree = (fileTree: FileNode) => {
    this.fileTree = fileTree
  }
}
