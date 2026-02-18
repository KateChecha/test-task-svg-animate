<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <nav>
        <RouterLink to="/progress">Прогресс-бар</RouterLink>
        <RouterLink to="/chart">Круговая диаграмма</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding-inline: 16px;
}

nav {
  max-width: 1000px;
  margin-inline: auto;
  display: flex;
  gap: 4px;
  height: 52px;
  align-items: center;
}

nav a {
  padding-block: 6px;
  padding-inline: 16px;
  border-radius: $radius-md;
  font-size: $font-size-base;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.2s;
}

nav a:hover {
  background: var(--color-background-soft);
}

nav a.router-link-active {
  background: $color-primary;
  color: $color-bg;
}
</style>
