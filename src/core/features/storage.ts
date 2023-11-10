export function setStorage(key: string, data: any) {
  const dataRaw = JSON.stringify({ data, date: Date.now() })
  localStorage.setItem(key, dataRaw)
}

export function getStorage<D>(key: string): D | null {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '')
    return data.data
  } catch (err) {
    return null
  }
}
