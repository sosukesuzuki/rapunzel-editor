import { observable, action } from 'mobx'
import { Directories } from '../types'

export class DirectoriesStore {
  @observable public directories: Directories

  constructor (directories: Directories) {
    this.directories = directories
  }

  @action setDirectories = (input: Directories) => {
    this.directories = input
  }
}
