import { getSideNavWidth } from '../../../src/lib/localStorage'

describe('getSideNavWidth', () => {
  afterEach(localStorage.clear)

  it('returns side nav from localStroage', async () => {
    // Given
    localStorage.setItem('sideNavWidth', (10).toString())

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
