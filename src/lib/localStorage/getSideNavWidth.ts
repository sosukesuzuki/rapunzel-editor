import { getDataFromLocalStrage } from './getDataFromLocalStorage'

export async function getSideNavWidth () {
  const data = await getDataFromLocalStrage('sideNavWidth')
  const sideNavWidth = parseInt(data, 10)
  return sideNavWidth
}
