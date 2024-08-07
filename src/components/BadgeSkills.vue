<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "#5ba4a4",
  },
);
</script>

<template>
  <span class="badge-skills" :style="{ backgroundColor: `${color}33`, color }">
    <slot></slot>
  </span>
</template>

<style scoped>
.badge-skills {
  display: inline-flex;
  margin: 0 0.25em 0.5em;
  padding: 0.25em 0.625em 0em;
  border-radius: 2.5px;
  font-size: 0.85em;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 1px;
}
</style>
