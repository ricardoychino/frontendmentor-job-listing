<script setup lang="ts">
import { computed, inject } from "vue";
import BadgeMain from "@/components/BadgeMain.vue";
import BadgeSkills from "@/components/BadgeSkills.vue";
import type { Job } from "@/types/JobList.d.ts";
import type { UseTagFilterRes } from "@/composables/useTagFilter.ts";

const props = withDefaults(defineProps<Job>(), {
  logo: "",
  new: false,
  featured: false,
  role: "",
  level: "",
  postedAt: "",
  contract: "",
  location: "",
  languages: () => [],
  tools: () => [],
});

const companyLogo = computed(() =>
  props.logo !== "" ? props.logo : "@/assets/images/placeholder.jpg",
);

const { appliedFilters, toggleFilter } = inject(
  "TagFilters",
) as UseTagFilterRes;
</script>

<template>
  <!-- Item Start -->
  <div class="job-item card" :class="{ highlighted: featured }">
    <figure class="logo">
      <img :src="companyLogo" :alt="`${company} logo`" />
    </figure>

    <div class="main-info">
      <div class="heading">
        <h4 class="sub">
          {{ company }}
        </h4>
        <BadgeMain v-if="$props.new" color="#5ba4a4">New!</BadgeMain>
        <BadgeMain v-if="featured">Featured</BadgeMain>
      </div>
      <h3 class="position">{{ position }}</h3>

      <div class="details">
        <span>{{ postedAt }}</span>
        <span>{{ contract }}</span>
        <span>{{ location }}</span>
      </div>
    </div>

    <div class="tags">
      <!-- Role -->
      <BadgeSkills
        v-if="role !== ''"
        :isSelected="appliedFilters.includes(role)"
        @click="toggleFilter('role', role)"
      >
        {{ role }}
      </BadgeSkills>
      <!-- Level -->
      <BadgeSkills
        v-if="level !== ''"
        :isSelected="appliedFilters.includes(level)"
        @click="toggleFilter('level', level)"
      >
        {{ level }}
      </BadgeSkills>
      <!-- Languages -->
      <BadgeSkills
        v-for="item of languages"
        :isSelected="appliedFilters.includes(item)"
        @click="toggleFilter('languages', item)"
      >
        {{ item }}
      </BadgeSkills>
      <!-- Tools -->
      <BadgeSkills
        v-for="item of tools"
        :isSelected="appliedFilters.includes(item)"
        @click="toggleFilter('tools', item)"
      >
        {{ item }}
      </BadgeSkills>
    </div>
  </div>
  <!-- Item End -->
</template>

<style lang="scss" scoped>
.job-item {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 50px;

  @media screen and (min-width: $bp-medium) {
    flex-direction: row;
    margin-bottom: 20px;
  }

  &.highlighted::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    border-radius: $card-radius 0 0 $card-radius;
    background-color: $primary;
  }
}
.logo {
  --logo-width: 50px;

  display: flex;
  margin-top: calc(-1 * (var(--logo-width) - 10px));
  margin-left: 0;
  height: var(--logo-width);
  width: var(--logo-width);
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: $bp-medium) {
    --logo-width: 80px;
    justify-content: center;
    align-items: center;
    margin: auto 10px;
  }
}
.main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #{$sub-text}80;
  margin-bottom: 20px;

  .heading {
    display: flex;
    align-items: center;
    gap: 0.5em;
    height: 24px;
  }
  .sub {
    margin: 0;
    color: $primary;
  }
  .position {
    margin: 20px 0;
    margin-bottom: 20px;
  }

  .details {
    display: flex;
    font-weight: 500;
    font-size: 0.95em;
    color: $sub-text;

    & > span {
      display: flex;
      align-items: center;

      &:not(:first-child)::before {
        content: "·"; /* &middot; */
        font-size: 24px;
        display: inline-block;
        width: 40px;
      }
    }
  }

  @media screen and (min-width: $bp-medium) {
    padding: 0 20px;
    border: none;
    margin: 0;
  }
}
.tags {
  display: flex;
  gap: 0.5em;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: $bp-medium) {
    margin-left: auto;
  }
}
</style>
