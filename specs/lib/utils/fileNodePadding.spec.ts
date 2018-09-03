import { fileNodePadding } from '../../../src/lib/utils'
import { FileNode } from '../../../src/lib/types'

describe('fileNodePadding', () => {
  it('returns 13 when path is root.', async () => {
    // Given
    const fileNode: FileNode = {
      pathname: '.',
      type: 'dir',
      children: []
    }

    // Then
    expect(fileNodePadding(fileNode)).toBe(13)
  })

  it('returns appropriate value', async () => {
    // Given
    const testFileNode1: FileNode = {
      pathname: './hoge',
      type: 'dir',
      children: []
    }
    const testFileNode2: FileNode = {
      pathname: './hoge/test',
      type: 'dir',
      children: []
    }
    const testFileNode3: FileNode = {
      pathname: './hoge/test/tom',
      type: 'dir',
      children: []
    }

    // Then
    expect(fileNodePadding(testFileNode1)).toBe(33)
    expect(fileNodePadding(testFileNode2)).toBe(48)
    expect(fileNodePadding(testFileNode3)).toBe(63)
  })
})
