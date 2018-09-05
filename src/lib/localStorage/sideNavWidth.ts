import { getDataFromLocalStorage } from './getDataFromLocalStorage'
import { setDataToLocalStorage } from './setDataToLocalStorage'

const KEY = 'sideNavWidth'

export async function getSideNavWidth () {
  const data = await getDataFromLocalStorage(KEY)
  const sideNavWidth = parseInt(data, 10)
  return sideNavWidth
}

export async function setSideNavWidth (value: number) {
  const valueString = value.toString()
  await setDataToLocalStorage(KEY, valueString)
}
