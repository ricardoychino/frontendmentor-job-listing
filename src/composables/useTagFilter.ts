import { ref } from 'vue'
import type { Filters } from '@/types/JobList'

type UseTagFilter = {
  filters: Filters;
  appliedFilters: Ref<Filters>;
  toggleFilter: (key: string, value: string) => void;
};

export const useTagFilter = (keys: string[], data: any[]): UseTagFilter => {

  const filters: Filters = {}
  const appliedFilters = ref<Filters>({})

  // Extract the tags per property
  for (let key of keys) {
    const entries = new Set<string>()
    data.forEach(item => {
      if (Array.isArray(item[key])) {
        item[key].forEach((el: string) => entries.add(el))
      } else {
        entries.add(item[key])
      }
    })

    filters[key] = [...entries.values()].sort()
    appliedFilters.value[key] = []
  }

  const toggleFilter = (key: string, value: string): void => {

    if (!filters[key].includes(value)) return;

    const list = appliedFilters.value[key]
    if (list.includes(value)) {
      appliedFilters.value[key] = list.filter((el: string) => el !== value)
    } else {
      appliedFilters.value[key].push(value)
    }
  }

  return { filters, appliedFilters, toggleFilter }
}