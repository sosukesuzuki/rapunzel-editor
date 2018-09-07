import { getCurrentFile, setCurrentFile } from '../../../src/lib/localStorage'

const KEY = 'currentFile'

describe('getCurrentFile', () => {
  afterEach(localStorage.clear)

  it('returns curretFile pathname from localStorage', async () => {
    // Given
    localStorage.setItem(KEY, '/path/to/test.md')

    // When
    const currentFilePathname = await getCurrentFile()

    // Then
    expect(currentFilePathname).toBe('/path/to/test.md')
  })

  it('throws error when key is not found', async () => {
    // When
    const currentFilePromise = getCurrentFile()

    // Then
    expect(currentFilePromise).rejects.toThrow('Key of currentFile does not exists in localStorage')
  })
})

describe('setCurrentFile', () => {
  afterEach(localStorage.clear)

  it('sets currentFile', async () => {
    // When
    await setCurrentFile('/path/to/test.md')
    const data = localStorage.getItem(KEY)

    // Then
    expect(data).toBe('/path/to/test.md')
  })
})
