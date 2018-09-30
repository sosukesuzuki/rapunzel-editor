import { EditorStateStore } from '../../../src/lib/stores'
import { setSideNavWidth, setIsHiddenSideNav, getSideNavWidth, getIsHiddenSideNav } from '../../../src/lib/localStorage'

describe('EditorStateStore', () => {
  afterEach(localStorage.clear)

  it('creates new Store', async () => {
    // When
    const store = new EditorStateStore()

    // Then
    expect(store.isHiddenSideNav).toBeFalsy()
    expect(store.sideNavWidth).toBe(250)
    expect(store.scrollY).toBe(0)
  })

  it('gets sideNavWidth from localStorage', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await setSideNavWidth(300)
    await store.getSideNavWidthFormStorage()

    // Then
    expect(store.sideNavWidth).toBe(300)
  })

  it('sets 250 to sideNavWidth when localStorage data is empty', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await store.getSideNavWidthFormStorage()

    // Then
    expect(store.sideNavWidth).toBe(250)
  })

  it('gets isHiddenSideNav from localStorage', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await setIsHiddenSideNav(true)
    await store.getIsHiddenSideNav()

    // Then
    expect(store.isHiddenSideNav).toBeTruthy()
  })

  it('sets false to isHiddenSideNav when localStorage data is empty', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await store.getIsHiddenSideNav()

    // Then
    expect(store.isHiddenSideNav).toBeFalsy()
  })

  it('sets SideNavWidth', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await store.setSideNavWidth(300)

    // Then
    expect(store.sideNavWidth).toBe(300)
    jest.useFakeTimers()
    setTimeout(async () => {
      const data = await getSideNavWidth()
      expect(data).toBe(300)
    }, 100)
    jest.runAllTimers()
  })

  it('sets isHiddenSideNav', async () => {
    // Given
    const store = new EditorStateStore()

    // When
    await store.setIsHiddenSideNav(true)

    // Then
    expect(store.isHiddenSideNav).toBeTruthy()
    const data = await getIsHiddenSideNav()
    expect(data).toBeTruthy()
  })

  it('sets scrollY', () => {
    // Given
    const store = new EditorStateStore()

    // When
    store.setScrollY(100)

    // Then
    expect(store.scrollY).toBe(100)
  })
})
