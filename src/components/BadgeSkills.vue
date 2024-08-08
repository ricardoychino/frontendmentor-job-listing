<script setup lang="ts">
withDefaults(
  defineProps<{
    isSelected?: boolean;
  }>(),
  {
    isSelected: false,
  },
);
</script>

<template>
  <span class="badge-skills" :class="{ selected: isSelected }">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.badge-skills {
  display: inline-flex;
  padding: 0.25em 0.625em 0em;
  border-radius: 2.5px;
  font-size: 0.85em;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 1px;
  cursor: pointer;
  color: $primary;
  background-color: #{$primary}33;
  overflow: hidden;

  &.selected {
    color: #fff;
    background-color: $primary;
  }
}
</style>
