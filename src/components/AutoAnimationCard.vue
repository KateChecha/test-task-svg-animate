<script setup lang="ts">
import CircularProgress from './CircularProgress.vue'
import { useAutoProgress } from '@/composables/useAutoProgress'

const { percentage: autoPercentage, isRunning: autoRunning, toggle: toggleAuto } =
  useAutoProgress({
    initialValue: 0,
    increment: 10,
    interval: 1000,
    maxValue: 100,
    minValue: 0,
  })
</script>

<template>
  <div class="gallery">
    <div class="gallery-item">
      <CircularProgress :percentage="autoPercentage" :width="150" />
    </div>
    <div class="gallery-item">
      <CircularProgress :percentage="autoPercentage" type="dashboard" :width="150" />
    </div>
  </div>
  <button class="action-btn" @click="toggleAuto">
    {{ autoRunning ? 'Остановить' : 'Запустить' }} анимацию
  </button>
</template>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-end;
}

.gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.action-btn {
  display: block;
  margin-block-start: 16px;
  margin-inline: auto;
  padding-block: 8px;
  padding-inline: 24px;
  background: $color-primary;
  color: $color-bg;
  border: none;
  border-radius: $radius-md;
  font-size: $font-size-base;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background: $color-primary-hover;
  }
}

@media (max-width: 640px) {
  .gallery {
    justify-content: center;
  }
}
</style>
