import { getIsHiddenSideNav, setIsHiddenSideNav } from '../../../src/lib/localStorage'

const KEY = 'isHiddenSideNav'

describe('getIsHiddenSideNav', () => {
  afterEach(localStorage.clear)

  it('returns isHiddenSideNav from localStorage', async () => {
    // Given
    localStorage.setItem(KEY, (true).toString())

    // When
    const isHiddenSideNav = await getIsHiddenSideNav()

    // Then
    expect(isHiddenSideNav).toBeTruthy()
  })

  it('throws error when key if not found', async () => {
    // When
    const isHiddenSideNavPromise = getIsHiddenSideNav()

    // Then
    expect(isHiddenSideNavPromise).rejects.toThrow('Key of isHiddenSideNav does not exists in localStorage')
  })
})

describe('setIsHiddenSideNav', () => {
  afterEach(localStorage.clear)

  it('sets isHiddenSideNav', async () => {
    // When
    await setIsHiddenSideNav(true)
    const data = localStorage.getItem(KEY)

    // Then
    expect(data).toBe('true')
  })
})
