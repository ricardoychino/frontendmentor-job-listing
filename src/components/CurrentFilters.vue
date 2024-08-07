<script setup lang="ts">
import { inject } from "vue";
import BadgeSkills from "@/components/BadgeSkills.vue";

const { appliedFilters, toggleFilter, clearFilter } = inject("TagFilters");
</script>

<template>
  <div class="current-filters card">
    <div class="applied-list">
      <BadgeSkills v-for="filter in appliedFilters">{{ filter }}</BadgeSkills>
    </div>
    <a href="javascript:void(0)" @click="clearFilter()">Clear</a>
  </div>
</template>

<style lang="scss" scoped>
.current-filters {
}
</style>
