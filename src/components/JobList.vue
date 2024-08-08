<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useTagFilter } from "@/composables/useTagFilter";
import type { UseTagFilterRes } from "@/composables/useTagFilter";
import JobListItem from "@/components/JobListItem.vue";
import CurrentFilters from "@/components/CurrentFilters.vue";

import type { Job } from "@/types/JobList";
import data from "@/../data.json";

const keysToFilter = ["role", "level", "languages", "tools"];

const jobs = ref<Job[]>(data);

const { appliedFilters, toggleFilter, isResult, clearFilter }: UseTagFilterRes =
  useTagFilter(keysToFilter, data);

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
    <TransitionGroup name="slide-fade-group">
      <JobListItem v-for="job in listed" v-bind="job" :key="job.id" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.slide-fade-enter-from,
.slide-fade-leave-to,
.slide-fade-group-enter-from,
.slide-fade-group-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  overflow: hidden;
}
.slide-fade-enter-from,
.slide-fade-group-enter-from {
  transform: translateY(20px);
}
.slide-fade-leave-to,
.slide-fade-group-leave-to {
  transform: translateY(-20px);
}
.slide-fade-leave-active,
.slide-fade-group-leave-active,
.slide-fade-enter-active,
.slide-fade-group-enter-active {
  transition: all 0.3s linear;
}
.slide-fade-leave-from,
.slide-fade-enter-to,
.slide-fade-group-leave-from,
.slide-fade-group-enter-to {
  max-height: 100vh;
  opacity: 1;
}
</style>
