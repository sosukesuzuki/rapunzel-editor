export function getDataFromLocalStrage (key = '') {
  return new Promise<string>((resolve, reject) => {
    const loaded = localStorage.getItem(key)
    if (loaded != null) {
      resolve(loaded)
    } else {
      reject(new Error(`Key of ${key} does not exists in localStorage`))
    }
  })
}
