import { CurrentFileStore } from '../../../src/lib/stores'
import { File } from '../../../src/lib/types'

const KEY = 'currentFile'

describe('CurrentFileStore', () => {
  afterEach(localStorage.clear)

  it('creates new Store', async () => {
    // Given
    const file: File = {
      pathname: './hoge/hoge.md',
      content: 'hogehoge'
    }

    // When
    const store = new CurrentFileStore(file)

    // Then
    expect(store.currentFile.pathname).toBe('./hoge/hoge.md')
    expect(store.currentFile.content).toBe('hogehoge')
  })

  it('updates currentFile and localStorage', async () => {
    // Given
    const oldFile: File = {
      pathname: './old/file.md',
      content: 'oldfile'
    }
    const newFile: File = {
      pathname: './new/file.md',
      content: 'newfile'
    }

    // When
    const store = new CurrentFileStore(oldFile)
    await store.setCurrentFile(newFile)

    // Then
    expect(store.currentFile.pathname).toBe('./new/file.md')
    expect(store.currentFile.content).toBe('newfile')
    const data = localStorage.getItem(KEY)
    expect(data).toBe('./new/file.md')
  })

  it('updates to null', async () => {
    // Given
    const file: File = {
      pathname: './hoge/hoge.md',
      content: 'hogehoge'
    }

    // When
    const store = new CurrentFileStore(file)
    store.setNullAsCurrentFile()

    // Then
    expect(store.currentFile).toBeNull()
    const data = localStorage.getItem(KEY)
    expect(data).toBeNull()
  })
})
