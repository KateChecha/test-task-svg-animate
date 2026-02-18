<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="demo-card">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.demo-card {
  background: var(--color-background-soft);
  border-radius: $radius-lg;
  padding: 24px;
  margin-block-end: 24px;

  h2 {
    font-size: $font-size-subtitle;
    font-weight: 600;
    margin-block-end: 16px;
  }
}
</style>
