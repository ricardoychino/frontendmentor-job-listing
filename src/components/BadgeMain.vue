<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "#2c3a3a",
  },
);
</script>

<template>
  <span class="badge-main" :style="{ backgroundColor: color }">
    <slot></slot>
  </span>
</template>

<style scoped>
.badge-main {
  display: inline-flex;
  padding: 0.25em 0.625em 0em;
  border-radius: 100px;
  font-size: 0.75em;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
}
</style>
