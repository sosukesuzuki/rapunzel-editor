import { getDataFromLocalStorage } from '../../../src/lib/localStorage/getDataFromLocalStorage'

describe('getDataFromLocalStorage', () => {
  afterEach(localStorage.clear)

  it('gets data from localStorage', async () => {
    // Given
    localStorage.setItem('test', 'test')

    // When
    const data = await getDataFromLocalStorage('test')

    // Then
    expect(data).toBe('test')
  })

  it('throws error', async () => {
    // When
    const getDataFromLocalStoragePromise = getDataFromLocalStorage('test')

    // Then
    expect(getDataFromLocalStoragePromise).rejects.toThrow('Key of test does not exists in localStorage')
  })
})
