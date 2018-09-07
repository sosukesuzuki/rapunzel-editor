import { observable, action } from 'mobx'
import { File } from '../types'
import { setCurrentFile } from '../localStorage'

export class CurrentFileStore {
  @observable public currentFile: File

  constructor (file: File) {
    this.currentFile = file || null
  }

  @action setCurrentFile = async (input: File) => {
    this.currentFile = input
    await setCurrentFile(input.pathname)
  }
}
