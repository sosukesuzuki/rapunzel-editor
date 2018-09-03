import { getSideNavWidth } from '../../../src/lib/localStorage'

describe('getSideNavWidth', () => {
  it('returns side nav from localStroage', async () => {
    // Given
    localStorage.setItem('sideNavWidth', (10).toString())

    // Then
    expect(getSideNavWidth()).toBe(10)
  })
})
