<script setup lang="ts">
import { inject } from "vue";
import BadgeSkills from "@/components/BadgeSkills.vue";

const { appliedFilters, toggleFilter, clearFilter } = inject("TagFilters");
</script>

<template>
  <div class="current-filters card">
    <div class="applied-list">
      <BadgeSkills v-for="filter in appliedFilters">
        {{ filter }}
        <button class="close-badge" @click="toggleFilter('', filter)">
          &#x2715;
        </button>
      </BadgeSkills>
    </div>
    <a href="javascript:void(0)" class="clear-btn" @click="clearFilter()">
      Clear
    </a>
  </div>
</template>

<style lang="scss" scoped>
.current-filters {
  display: flex;
  align-items: center;
}
.applied-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
.close-badge {
  color: #fff;
  padding: 10px;
  line-height: 1;
  border-radius: 0;
  margin: -10px;
  margin-left: 5px;

  &:hover {
    opacity: 1;
    background-color: $very-dark-grayish-cyan;
  }
}
.clear-btn {
  display: block;
  padding: 0.25em 0.625em 0em;
  margin-left: auto;
  text-decoration: underline;
}
</style>
