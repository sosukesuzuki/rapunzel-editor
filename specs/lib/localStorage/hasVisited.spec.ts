import { getHasVisited, setHasVisited } from '../../../src/lib/localStorage'

const KEY = 'hasVisited'

describe('getHasVisited', () => {
  afterEach(localStorage.clear)

  it('returns hasVisited from localStroage', async () => {
    // Given
    localStorage.setItem('hasVisited', 'true')

    // When
    const hasVisited = await getHasVisited()

    // Then
    expect(hasVisited).toBeTruthy()
  })

  it('throws error when key is not found', async () => {
    // When
    const hasVisitedPromise = getHasVisited()

    // Then
    expect(hasVisitedPromise).rejects.toThrow('Key of hasVisited does not exists in localStorage')
  })
})

describe('setHasVisited', () => {
  afterEach(localStorage.clear)

  it('sets hasVisitted', async () => {
    // When
    await setHasVisited(true)
    const dataTruthy = localStorage.getItem(KEY)
    await setHasVisited(false)
    const dataFalsy = localStorage.getItem(KEY)

    // Then
    expect(dataTruthy).toBe('true')
    expect(dataFalsy).toBe('false')
  })
})
