import { MaybeRefOrGetter, onUnmounted, ref, toValue, watchEffect } from "vue";
import type { Ref } from 'vue'

export const useLocalSetStorage = (key: string, initialValue: MaybeRefOrGetter<Set<string> | string[]>): Ref<Set<string>> => {

  const lsValue = localStorage.getItem(key) || '';

  const storageValue = ref<Set<string>>(new Set<string>(lsValue === '' ? toValue(initialValue) : lsValue.split(',')))

  watchEffect(() => {
    localStorage.setItem(key, [...storageValue.value].join(','))
  })

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === key) {
      if (event.newValue === '') {
        storageValue.value.clear()
      } else {
        storageValue.value = new Set<string>(event.newValue?.split(',') || [])
      }
    }
  }

  window.addEventListener('storage', handleStorageEvent)

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageEvent)
  })

  return storageValue
}