<script setup lang="ts">
import { ref, computed, Ref, provide } from "vue";
import { useTagFilter } from "@/composables/useTagFilter";
import JobListItem from "@/components/JobListItem.vue";

import type { Job } from "@/types/JobList";
import data from "@/../data.json";

const keysToFilter = ["role", "level", "languages", "tools"];

const jobs = ref<Job[]>(data);

const { filters, appliedFilters, toggleFilter } = useTagFilter(
  keysToFilter,
  data,
);

const hasFilter = computed(() =>
  Object.values(appliedFilters.value).some((values) => values.length > 0),
);

const listed = computed(() =>
  !hasFilter.value
    ? jobs.value
    : jobs.value.filter((job: Job) => {
        for (let key of keysToFilter) {
          if (appliedFilters.value[key].length === 0) continue;
          if (
            !Array.isArray(job[key]) &&
            !appliedFilters.value[key].includes(job[key])
          ) {
            return false;
          }
          if (
            Array.isArray(job[key]) &&
            !appliedFilters.value[key].some((f: string) => job[key].includes(f))
          ) {
            return false;
          }
        }
        return true;
      }),
);

provide("TagFilters", { appliedFilters, toggleFilter });
</script>

<template>
  <div class="job-list">
    <JobListItem v-for="job in listed" v-bind="job" :key="job.id" />
  </div>
</template>
