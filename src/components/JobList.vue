<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useTagFilter } from "@/composables/useTagFilter";
import JobListItem from "@/components/JobListItem.vue";
import CurrentFilters from "@/components/CurrentFilters.vue";

import type { Job } from "@/types/JobList";
import data from "@/../data.json";

const keysToFilter = ["role", "level", "languages", "tools"];

const jobs = ref<Job[]>(data);

const { appliedFilters, toggleFilter, isResult, clearFilter } = useTagFilter(
  keysToFilter,
  data,
);

const hasFilter = computed(() => appliedFilters.value.length > 0);

const listed = computed(() =>
  !hasFilter.value
    ? jobs.value
    : jobs.value.filter((job: Job) => isResult(job)),
);

provide("TagFilters", { appliedFilters, toggleFilter, clearFilter });
</script>

<template>
  <div class="job-list">
    <Transition name="slide-fade">
      <CurrentFilters v-show="hasFilter" />
    </Transition>
    <JobListItem v-for="job in listed" v-bind="job" :key="job.id" />
  </div>
</template>

<style scoped>
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  margin-bottom: 0;
}
.slide-fade-leave-active {
  transition: all 0.15s linear;
}
.slide-fade-enter-active {
  transition: all 0.3s linear;
}
.slide-fade-leave-from,
.slide-fade-enter-to {
  max-height: 100vh;
  opacity: 1;
  transform: none;
}
</style>
