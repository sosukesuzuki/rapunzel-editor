import { setDataToLocalStorage } from '../../../src/lib/localStorage/setDataToLocalStorage'

describe('setDataToLocalStorage', () => {
  afterEach(localStorage.clear)

  it('sets data to localStorage', async () => {
    // When
    await setDataToLocalStorage('test', 'test')
    const data = localStorage.getItem('test')

    // Then
    expect(data).toBe('test')
  })
})
