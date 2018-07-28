import { observable, action } from 'mobx'
import { File } from '../types'

export class CurrentFileStore {
  @observable public currentFile: File

  constructor (file: File) {
    this.currentFile = file || null
  }

  @action setCurrentFile = (input: File) => {
    this.currentFile = input
  }
}
