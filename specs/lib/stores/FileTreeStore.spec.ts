import { FileTreeStore } from '../../../src/lib/stores'
import { FileNode } from '../../../src/lib/types'

describe('FileTreeStore', () => {
  it('creates new Store', async () => {
    // Given
    const fileTree: FileNode = {
      type: 'dir',
      pathname: './hoge/',
      children: [{
        type: 'file',
        pathname: './hoge/hoge.md'
      }]
    }

    // When
    const store = new FileTreeStore(fileTree)

    // Then
    expect(store.fileTree).toEqual(fileTree)
  })

  it('updates fileTree', async () => {
    // Given
    const oldFileTree: FileNode = {
      type: 'dir',
      pathname: './old/',
      children: [{
        type: 'file',
        pathname: './old/old.md'
      }]
    }
    const newFileTree: FileNode = {
      type: 'dir',
      pathname: './new/',
      children: [{
        type: 'file',
        pathname: './new/new.md'
      }]
    }
    const store = new FileTreeStore(oldFileTree)

    // When
    store.setFileTree(newFileTree)

    // Then
    expect(store.fileTree).toEqual(newFileTree)
  })
})
