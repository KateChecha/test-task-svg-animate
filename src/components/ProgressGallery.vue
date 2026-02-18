<script setup lang="ts">
import CircularProgress from './CircularProgress.vue'
import { type ProgressStatus, type ProgressType, STATUS_LABELS } from '@/types/progress'

withDefaults(
  defineProps<{
    items: number[] | ProgressStatus[]
    variant: 'percentage' | 'status'
    type?: ProgressType
  }>(),
  { type: 'circle' },
)
</script>

<template>
  <div class="gallery">
    <div v-for="item in items" :key="String(item)" class="gallery-item">
      <CircularProgress
        :percentage="variant === 'percentage' ? (item as number) : 75"
        :status="variant === 'status' ? (item as ProgressStatus) : undefined"
        :type="type"
      />
      <span v-if="variant === 'status'">{{ STATUS_LABELS[item as ProgressStatus] }}</span>
    </div>
  </div>
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
  font-size: $font-size-base;
  color: $color-text-secondary;
}

@media (max-width: 640px) {
  .gallery {
    justify-content: center;
  }
}
</style>
