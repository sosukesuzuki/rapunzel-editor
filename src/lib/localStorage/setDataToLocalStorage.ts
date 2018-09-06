export function setDataToLocalStorage (key: string, value: string) {
  return new Promise<void>((resolve, reject) => {
    localStorage.setItem(key, value)
    resolve()
  })
}
