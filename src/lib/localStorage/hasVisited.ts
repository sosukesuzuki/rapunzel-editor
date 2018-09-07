import { getDataFromLocalStorage } from './getDataFromLocalStorage'
import { setDataToLocalStorage } from './setDataToLocalStorage'
import { stringToBoolean } from '../utils'
import { localStorageKeys } from './localStorageKeys'

const KEY = localStorageKeys.hasVisited

export async function getHasVisited () {
  const data = await getDataFromLocalStorage(KEY)
  const hasVisited = stringToBoolean(data)
  return hasVisited
}

export async function setHasVisited (value: boolean) {
  const valueString = value.toString()
  await setDataToLocalStorage(KEY, valueString)
}
