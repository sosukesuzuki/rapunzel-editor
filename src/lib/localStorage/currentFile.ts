import { getDataFromLocalStorage } from './getDataFromLocalStorage'
import { setDataToLocalStorage } from './setDataToLocalStorage'
import { localStorageKeys } from './localStorageKeys'

const KEY = localStorageKeys.currentFile

export async function getCurrentFile () {
  const data = await getDataFromLocalStorage(KEY)
  return data
}

export async function setCurrentFile (value: string) {
  await setDataToLocalStorage(KEY, value)
}
