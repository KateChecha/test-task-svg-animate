<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import { useChartItems } from '@/composables/useChartItems'
import type { ChartItem } from '@/composables/useChartItems'

ChartJS.register(ArcElement, Tooltip, Legend)

const showForm = ref(false)
const showColorPicker = ref(false)
const colorPickerRef = ref<HTMLElement | null>(null)

const {
  items,
  editingId,
  form,
  isEditing,
  totalValue,
  chartData,
  chartOptions,
  submit,
  editItem,
  deleteItem,
  cancelEdit,
  resetForm,
  getPercentage,
} = useChartItems([
  { id: 1, name: 'Сектор-1', value: 25, color: '#FF6384' },
  { id: 2, name: 'Сектор-2', value: 25, color: '#FFCE56' },
  { id: 3, name: 'Сектор-3', value: 25, color: '#36A2EB' },
])

function handleEdit(item: ChartItem) {
  editItem(item)
  showForm.value = true
}

function handleSubmit() {
  submit()
  showForm.value = false
}

function handleCancel() {
  cancelEdit()
  showForm.value = false
  showColorPicker.value = false
}

function handleAdd() {
  resetForm()
  showForm.value = true
  showColorPicker.value = false
}

function getColorName(hex: string): string {
  const hexClean = hex.replace('#', '').toUpperCase()
  const r = parseInt(hexClean.substring(0, 2), 16)
  const g = parseInt(hexClean.substring(2, 4), 16)
  const b = parseInt(hexClean.substring(4, 6), 16)
  
  if (hexClean === 'FF6384' || (r > 220 && g < 120 && b < 140)) return 'Красный'
  if (hexClean === 'FFCE56' || (r > 240 && g > 200 && b < 100)) return 'Желтый'
  if (hexClean === '36A2EB' || (r < 100 && g > 150 && b > 200)) return 'Синий'
  if (hexClean === '4F46E5' || (r > 60 && r < 100 && g < 100 && b > 200)) return 'Фиолетовый'
  if (r < 100 && g > 200 && b < 100) return 'Зеленый'
  if (r > 150 && g < 100 && b > 150) return 'Фиолетовый'
  if (r < 100 && g > 150 && b > 150) return 'Бирюзовый'
  if (r > 200 && g > 100 && b < 100) return 'Оранжевый'
  if (r > 200 && g < 100 && b > 150) return 'Розовый'
  return 'Цвет'
}

function handleClickOutside(event: MouseEvent) {
  if (colorPickerRef.value && !colorPickerRef.value.contains(event.target as Node)) {
    showColorPicker.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="chart-view">
    <h1>Круговая диаграмма</h1>
    <div class="divider"></div>

    <div class="layout">
      <div class="left-panel">
        <div v-if="items.length" class="sectors-list">
          <div
            v-for="item in items"
            :key="item.id"
            class="sector-card"
            :class="{ editing: editingId === item.id }"
          >
            <span class="sector-name">{{ item.name }}</span>
            <div class="divider-vertical"></div>
            <span class="sector-percentage">{{ getPercentage(item.value) }}%</span>
            <div class="divider-vertical"></div>
            <span class="sector-color" :style="{ backgroundColor: item.color }" aria-hidden="true"></span>
            <div class="sector-actions">
              <button class="btn-icon" title="Редактировать" @click="handleEdit(item)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11.333 2.00001C11.5084 1.82445 11.7163 1.68607 11.9439 1.59331C12.1715 1.50055 12.4142 1.45532 12.6587 1.46035C12.9031 1.46538 13.1442 1.52057 13.3681 1.62289C13.592 1.72521 13.7943 1.87237 13.9627 2.05578C14.1311 2.23919 14.2622 2.45503 14.3489 2.69087C14.4356 2.92671 14.4762 3.17799 14.4683 3.43001C14.4604 3.68203 14.4042 3.93001 14.303 4.16001L5.72667 12.7363L2 13.3333L2.59667 9.60667L11.173 1.03034L11.333 2.00001Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button class="btn-icon btn-danger" title="Удалить" @click="deleteItem(item.id)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button class="add-button" @click="handleAdd">Добавить сектор</button>
      </div>

      <div class="right-panel">
        <div class="chart-wrapper">
          <Pie v-if="items.length" :data="chartData" :options="chartOptions" />
          <p v-else class="empty">Добавьте секторы, чтобы увидеть диаграмму</p>
          <div v-if="items.length" class="chart-legend">
            <div
              v-for="item in items"
              :key="item.id"
              class="legend-item"
            >
              <span class="legend-dot" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="5" :fill="item.color" />
                </svg>
              </span>
              <span class="legend-label">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="form-modal" @click.self="handleCancel">
      <div class="form-card">
        <h2>{{ isEditing ? 'Редактирование сектора' : 'Добавление сектора' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="item-name">Наименование</label>
            <input
              id="item-name"
              v-model="form.name"
              type="text"
              placeholder="Сектор-1"
              required
            />
          </div>
          <div class="field">
            <label for="item-value">Значение</label>
            <input
              id="item-value"
              v-model.number="form.value"
              type="number"
              placeholder="25"
              min="1"
              required
            />
          </div>
          <div class="field">
            <label>Цвет</label>
            <div ref="colorPickerRef" class="color-field-wrapper">
              <div class="color-input-display" @click.stop="showColorPicker = !showColorPicker">
                <span class="color-indicator" :style="{ backgroundColor: form.color }" aria-hidden="true"></span>
                <span class="color-name">{{ getColorName(form.color) }}</span>
                <svg
                  class="arrow-icon"
                  :class="{ open: showColorPicker }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#606266"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div v-if="showColorPicker" class="color-picker-dropdown">
                <ColorPicker
                  v-model:pureColor="form.color"
                  is-widget
                  picker-type="chrome"
                  :disable-alpha="false"
                  :disable-history="true"
                />
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ isEditing ? 'Сохранить' : 'Добавить сектор' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-view {
  max-width: 1200px;
  margin-inline: auto;
  padding-block: 32px;
  padding-inline: 16px;
}

h1 {
  font-size: $font-size-title;
  font-weight: 700;
  color: $color-text-primary;
  margin-block-end: 16px;
}

.divider {
  height: 1px;
  background: $color-border;
  margin-block-end: 24px;
}

.layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  align-items: start;
}

.left-panel {
  display: flex;
  flex-direction: column;
}

.sectors-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-block-end: 16px;
}

.sector-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-block: 14px;
  padding-inline: 16px;
  background: $color-bg-soft;
  border-bottom: 1px solid $color-border;
  transition: background $transition-fast;

  &:last-of-type {
    border-bottom: none;
  }

  &.editing {
    background: $color-primary-alpha;
  }
}

.sector-name {
  font-size: $font-size-base;
  font-weight: 500;
  color: $color-text-primary;
  flex-shrink: 0;
}

.divider-vertical {
  width: 1px;
  height: 16px;
  background: $color-border;
  flex-shrink: 0;
}

.sector-percentage {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  min-width: 45px;
}

.sector-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.sector-actions {
  display: flex;
  gap: 8px;
  margin-inline-start: auto;
}

.btn-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: $radius-sm;
  cursor: pointer;
  color: $color-text-secondary;
  transition: all $transition-fast;
  padding: 0;

  &:hover {
    background: $color-border;
    color: $color-text-regular;
  }

  &.btn-danger:hover {
    background: $color-danger-bg;
    color: $color-danger;
  }
}

.add-button {
  width: 100%;
  padding-block: 14px;
  padding-inline: 16px;
  background: $color-primary;
  color: $color-bg;
  border: none;
  border-radius: $radius-md;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background: $color-primary-hover;
  }
}

.right-panel {
  display: flex;
  flex-direction: column;
}

.chart-wrapper {
  background: $color-bg;
  border-radius: $radius-lg;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.empty {
  text-align: center;
  color: $color-text-placeholder;
  font-size: $font-size-base;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-block-start: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  width: 10px;
  height: 10px;

  svg {
    display: block;
    width: 10px;
    height: 10px;
    shape-rendering: geometricPrecision;
  }
}

.legend-label {
  font-size: $font-size-base;
  color: $color-text-primary;
}

.form-modal {
  position: fixed;
  inset: 0;
  background: $color-overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.form-card {
  background: $color-bg;
  border-radius: $radius-lg;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: $shadow-modal;

  h2 {
    font-size: $font-size-subtitle;
    font-weight: 600;
    margin-block-end: 20px;
    color: $color-text-primary;
  }
}

.field {
  margin-block-end: 16px;

  label {
    display: block;
    font-size: $font-size-base;
    font-weight: 500;
    margin-block-end: 8px;
    color: $color-text-regular;
  }

  input {
    width: 100%;
    padding-block: 8px;
    padding-inline: 12px;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    font-size: $font-size-base;
    background: $color-bg;
    color: $color-text-primary;
    transition: border-color $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }
}

.color-field-wrapper {
  position: relative;
}

.color-input-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-block: 8px;
  padding-inline: 12px;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  background: $color-bg;
  cursor: pointer;
  transition: border-color $transition-fast;
  min-height: 40px;

  &:hover {
    border-color: $color-primary;
  }
}

.color-indicator {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid $color-border;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.color-name {
  flex: 1;
  font-size: $font-size-base;
  color: $color-text-primary;
}

.arrow-icon {
  flex-shrink: 0;
  transition: transform 0.2s;

  &.open {
    transform: rotate(180deg);
  }
}

.color-picker-dropdown {
  margin-block-start: 12px;
  background: $color-bg;
  border-radius: $radius-md;
  padding: 16px;
  width: 100%;

  :deep(.vue3-colorpicker),
  :deep(.vc-colorpicker) {
    width: 100%;
  }

  :deep(.vc-chrome) {
    width: 100% !important;
    box-shadow: none !important;
  }
}

.form-actions {
  margin-block-start: 24px;
}

.btn-primary {
  width: 100%;
  padding-block: 14px;
  padding-inline: 16px;
  background: $color-primary;
  color: $color-bg;
  border: none;
  border-radius: $radius-md;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background: $color-primary-hover;
  }
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .left-panel {
    order: 2;
  }

  .right-panel {
    order: 1;
  }

  .chart-wrapper {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .chart-view {
    padding-block: 16px;
    padding-inline: 16px;
  }

  h1 {
    font-size: $font-size-title-sm;
  }

  .sector-card {
    padding-block: 12px;
    padding-inline: 12px;
    gap: 8px;
  }

  .sector-name,
  .sector-percentage {
    font-size: $font-size-base;
  }

  .sector-percentage {
    min-width: 40px;
  }
}
</style>
