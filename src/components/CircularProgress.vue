<script setup lang="ts">
import { useProgressCalculations } from '@/composables/useProgressCalculations'
import type { ProgressStatus, ProgressType } from '@/types/progress'

const props = withDefaults(
  defineProps<{
    percentage?: number
    status?: ProgressStatus
    type?: ProgressType
    strokeWidth?: number
    width?: number
    showText?: boolean
    color?: string | ((percentage: number) => string)
    strokeLinecap?: 'round' | 'butt' | 'square'
    format?: (percentage: number) => string
    trackColor?: string
  }>(),
  {
    percentage: 0,
    status: 'normal',
    type: 'circle',
    strokeWidth: 6,
    width: 126,
    showText: true,
    strokeLinecap: 'round',
    trackColor: '#e5e9f2',
  },
)

const {
  radius,
  center,
  isDashboard,
  dashArray,
  dashOffset,
  rotation,
  stroke,
  text,
  textColor,
} = useProgressCalculations({
  percentage: () => props.percentage,
  status: () => props.status,
  type: () => props.type,
  strokeWidth: () => props.strokeWidth,
  width: () => props.width,
  color: () => props.color,
  format: () => props.format,
})
</script>

<template>
  <div
    class="circular-progress"
    :class="{ 'is-dashboard': isDashboard }"
    :style="{ width: `${props.width}px`, height: `${props.width}px` }"
  >
    <svg :viewBox="`0 0 ${props.width} ${props.width}`" :width="props.width" :height="props.width">
      <circle
        class="circular-progress__track"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="props.trackColor"
        :stroke-width="props.strokeWidth"
        :stroke-linecap="props.strokeLinecap"
        :stroke-dasharray="dashArray"
        stroke-dashoffset="0"
        :transform="rotation"
      />
      <circle
        class="circular-progress__bar"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="props.strokeWidth"
        :stroke-linecap="props.strokeLinecap"
        :stroke-dasharray="dashArray"
        :transform="rotation"
        :style="{
          stroke,
          strokeDashoffset: `${dashOffset}`,
        }"
      />
    </svg>
    <div
      v-if="showText"
      class="circular-progress__text"
      :style="{ fontSize: `${props.width * 0.2}px`, color: textColor }"
    >
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circular-progress {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.circular-progress__bar {
  transition:
    stroke-dashoffset 0.6s ease,
    stroke 0.6s ease;
}

.circular-progress__text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 1;
  user-select: none;
  transition: color 0.6s ease;
}
</style>
