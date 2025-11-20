// app/lib/whitelist.ts
import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY = "@intruder:whitelist_v1"

export type TrustedDevice = {
  id: string
  name?: string | null
  addedAt: number
}

// devuelve array
export async function getWhitelist(): Promise<TrustedDevice[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as TrustedDevice[]
  } catch (e) {
    console.warn("getWhitelist error", e)
    return []
  }
}

export async function saveWhitelist(list: TrustedDevice[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list))
  } catch (e) {
    console.warn("saveWhitelist error", e)
    throw e
  }
}

export async function addToWhitelist(device: {
  id: string
  name?: string | null
}) {
  const list = await getWhitelist()
  const exists = list.some((d) => d.id === device.id)
  if (exists) return list
  const newList = [
    ...list,
    {
      id: device.id,
      name: device.name ?? null,
      addedAt: Date.now(),
    } as TrustedDevice,
  ]
  await saveWhitelist(newList)
  return newList
}

export async function removeFromWhitelist(id: string) {
  const list = await getWhitelist()
  const newList = list.filter((d) => d.id !== id)
  await saveWhitelist(newList)
  return newList
}

export async function isTrusted(id: string): Promise<boolean> {
  const list = await getWhitelist()
  return list.some((d) => d.id === id)
}
