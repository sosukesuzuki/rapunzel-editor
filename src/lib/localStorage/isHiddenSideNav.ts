import { getDataFromLocalStorage } from './getDataFromLocalStorage'
import { setDataToLocalStorage } from './setDataToLocalStorage'
import { stringToBoolean } from '../utils'

const KEY = 'isHiddenSideNav'

export async function getIsHiddenSideNav () {
  const data = await getDataFromLocalStorage(KEY)
  const isHiddenSideNav = stringToBoolean(data)
  return isHiddenSideNav
}

export async function setIsHiddenSideNav (value: boolean) {
  const valueString = value.toString()
  await setDataToLocalStorage(KEY, valueString)
}
