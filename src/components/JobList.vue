<script setup lang="ts">
import { ref, computed } from "vue";
import JobListItem from "@/components/JobListItem.vue";

import type { Job } from "@/types/JobList";
import data from "@/../data.json";

const jobs = ref<Job[]>(data);

const listed = computed(() => jobs.value);
</script>

<template>
  <div class="job-list">
    <JobListItem v-for="job in listed" v-bind="job" :key="job.id" />
  </div>
</template>
