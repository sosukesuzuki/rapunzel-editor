import { getSideNavWidth, setSideNavWidth } from '../../../src/lib/localStorage'

const KEY = 'sideNavWidth'

describe('getSideNavWidth', () => {
  afterEach(localStorage.clear)

  it('returns side nav from localStroage', async () => {
    // Given
    localStorage.setItem(KEY, (10).toString())

    // When
    const sideNavWidth = await getSideNavWidth()

    // Then
    expect(sideNavWidth).toBe(10)
  })

  it('throws error when key is not found', async () => {
    // When
    const sideNavWidthPromise = getSideNavWidth()

    // Then
    expect(sideNavWidthPromise).rejects.toThrow()
    expect(sideNavWidthPromise).rejects.toThrow('Key of sideNavWidth does not exists in localStorage')
  })
})

describe('setSideNavWidth', () => {
  afterEach(localStorage.clear)

  it('sets sideNavWidth', async () => {
    // When
    await setSideNavWidth(100)
    const data = localStorage.getItem(KEY)

    // Then
    expect(data).toBe('100')
  })
})
