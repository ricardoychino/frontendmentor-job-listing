<script setup lang="ts">
import BadgeMain from "@/components/BadgeMain.vue";
import BadgeSkills from "@/components/BadgeSkills.vue";
import type { Job } from "../types/JobList.d.ts";
import { computed } from "vue";

type JobProps = Job & {
  isActive?: boolean;
};

const props = withDefaults(defineProps<JobProps>(), {
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
  isActive: false,
});

const companyLogo = computed(() =>
  props.logo !== "" ? props.logo : "@/assets/images/placeholder.jpg",
);
</script>

<template>
  <!-- Item Start -->
  <div class="job-item" :class="{ active: isActive }">
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
      <BadgeSkills v-if="role !== ''">{{ role }}</BadgeSkills>
      <!-- Level -->
      <BadgeSkills v-if="level !== ''">{{ level }}</BadgeSkills>
      <!-- Languages & Tools -->
      <BadgeSkills v-for="item of [...languages, ...tools]">
        {{ item }}
      </BadgeSkills>
    </div>
  </div>
  <!-- Item End -->
</template>

<style lang="scss" scoped>
.job-item {
  $round: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: $round;
  box-shadow: 0 5px 20px -10px $primary;

  @media screen and (min-width: $bp-small) {
    flex-direction: row;
    margin-bottom: 20px;
  }

  &.active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    border-radius: $round 0 0 $round;
    background-color: var(--primary);
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

  @media screen and (min-width: $bp-small) {
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

  @media screen and (min-width: $bp-small) {
    padding: 0 20px;
    border: none;
    margin: 0;
  }
}
.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: $bp-small) {
    margin-left: auto;
  }
}
</style>
