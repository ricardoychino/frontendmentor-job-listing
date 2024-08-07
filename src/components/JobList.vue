<script setup lang="ts">
import { ref, computed, Ref, provide } from "vue";
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
    <CurrentFilters v-show="hasFilter" />
    <JobListItem v-for="job in listed" v-bind="job" :key="job.id" />
  </div>
</template>
