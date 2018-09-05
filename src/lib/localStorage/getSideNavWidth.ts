import { getDataFromLocalStorage } from './getDataFromLocalStorage'

export async function getSideNavWidth () {
  const data = await getDataFromLocalStorage('sideNavWidth')
  const sideNavWidth = parseInt(data, 10)
  return sideNavWidth
}
