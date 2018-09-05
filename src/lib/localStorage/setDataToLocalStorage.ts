export function setDataToLocalStorage (key, value) {
  return new Promise<void>((resolve, reject) => {
    localStorage.setItem(key, value)
    resolve()
  })
}
