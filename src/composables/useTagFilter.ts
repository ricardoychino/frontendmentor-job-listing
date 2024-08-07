import { ref, computed } from 'vue'
import type { Filters } from '@/types/JobList'

type UseTagFilter = {
  filters: Filters;
  appliedFilters: Ref<Filters>;
  toggleFilter: (key: string, value: string) => void;
  isResult: (data: any) => boolean,
  isTagSelected: (key: string, value: string) => boolean,
  clearFilter: () => void
};

export const useTagFilter = (keysForTags: string[], initialData: any[]): UseTagFilter => {

  const filters: Filters = {}
  const internalList = ref(new Set<string>())

  // Extract the tags per property
  for (let key of keysForTags) {
    const entries = new Set<string>()
    initialData.forEach(item => {
      if (Array.isArray(item[key])) {
        item[key].forEach((el: string) => entries.add(el))
      } else {
        entries.add(item[key])
      }
    })

    filters[key] = [...entries.values()].sort()
  }
  const appliedFilters = computed(() => [...internalList.value].map(str => str.split('-')[1]))

  const toggleFilter = (key: string, value: string): void => {

    if (!filters[key].includes(value)) return;

    const storeValue = `${key}-${value}`

    if (internalList.value.has(storeValue)) {
      internalList.value.delete(storeValue)
    } else {
      internalList.value.add(storeValue)
    }
  }

  const isResult = (data: any) => {
    return [...internalList.value].every((filter: string) => {
      const [key, value] = filter.split('-')

      return Array.isArray(data[key]) ? data[key].includes(value) : data[key] === value
    })
  }

  const isTagSelected = (key: string, value: string) => {
    return internalList.value.has(`${key}-${value}`)
  }

  const clearFilter = () => {
    internalList.value.clear()
  }

  return { filters, appliedFilters, toggleFilter, isResult, isTagSelected, clearFilter }
}