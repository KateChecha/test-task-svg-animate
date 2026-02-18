<script setup lang="ts">
import { ref } from 'vue'
import CircularProgress from './CircularProgress.vue'
import { type ProgressStatus, type ProgressType, STATUS_LABELS } from '@/types/progress'

const percentage = ref(50)
const status = ref<ProgressStatus>('normal')
const progressType = ref<ProgressType>('circle')
const strokeWidth = ref(6)
const size = ref(160)

const statuses: ProgressStatus[] = ['normal', 'success', 'warning', 'error']
</script>

<template>
  <div class="playground">
    <div class="preview">
      <CircularProgress
        :percentage="percentage"
        :status="status"
        :type="progressType"
        :stroke-width="strokeWidth"
        :width="size"
      />
    </div>
    <div class="controls">
      <label>
        <span>Процент: <strong>{{ percentage }}%</strong></span>
        <input type="range" v-model.number="percentage" min="0" max="100" />
      </label>
      <label>
        <span>Толщина линии: <strong>{{ strokeWidth }}px</strong></span>
        <input type="range" v-model.number="strokeWidth" min="2" max="20" />
      </label>
      <label>
        <span>Размер: <strong>{{ size }}px</strong></span>
        <input type="range" v-model.number="size" min="80" max="300" />
      </label>
      <div class="btn-group">
        <span>Статус:</span>
        <button
          v-for="s in statuses"
          :key="s"
          :class="{ active: status === s }"
          @click="status = s"
        >
          {{ STATUS_LABELS[s] }}
        </button>
      </div>
      <div class="btn-group">
        <span>Тип:</span>
        <button :class="{ active: progressType === 'circle' }" @click="progressType = 'circle'">
          Круг
        </button>
        <button :class="{ active: progressType === 'dashboard' }" @click="progressType = 'dashboard'">
          Панель
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playground {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 200px;
  flex-shrink: 0;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;

  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input[type='range'] {
    width: 100%;
  }
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;

  span {
    font-weight: 500;
    margin-inline-end: 4px;
  }

  button {
    padding-block: 6px;
    padding-inline: 12px;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: $radius-sm;
    cursor: pointer;
    font-size: $font-size-base;
    transition: all $transition-fast;

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
    }

    &.active {
      background: $color-primary;
      border-color: $color-primary;
      color: $color-bg;
    }
  }
}

@media (max-width: 640px) {
  .playground {
    flex-direction: column;
    align-items: center;
  }

  .preview {
    min-width: unset;
    min-height: unset;
  }
}
</style>
