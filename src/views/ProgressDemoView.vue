<script setup lang="ts">
import DemoCard from '@/components/DemoCard.vue'
import InteractivePlayground from '@/components/InteractivePlayground.vue'
import ProgressGallery from '@/components/ProgressGallery.vue'
import AutoAnimationCard from '@/components/AutoAnimationCard.vue'
import type { ProgressStatus } from '@/types/progress'

const statuses: ProgressStatus[] = ['normal', 'success', 'warning', 'error']
const percentages = [0, 25, 50, 75, 100]
</script>

<template>
  <div class="progress-demo">
    <h1>Круговой прогресс-бар</h1>
    <p class="subtitle">Компонент на SVG с плавными переходами</p>

    <DemoCard title="Интерактивная демонстрация">
      <InteractivePlayground />
    </DemoCard>

    <DemoCard title="Статусы">
      <ProgressGallery :items="statuses" variant="status" />
    </DemoCard>

    <DemoCard title="Значения прогресса (Круг)">
      <ProgressGallery :items="percentages" variant="percentage" />
    </DemoCard>

    <DemoCard title="Значения прогресса (Панель)">
      <ProgressGallery :items="percentages" variant="percentage" type="dashboard" />
    </DemoCard>

    <DemoCard title="Автоматическая анимация">
      <AutoAnimationCard />
    </DemoCard>
  </div>
</template>

<style lang="scss" scoped>
.progress-demo {
  max-width: 900px;
  margin-inline: auto;
  padding-block: 32px;
  padding-inline: 16px;
}

h1 {
  font-size: $font-size-title;
  font-weight: 700;
  margin-block-end: 4px;
}

.subtitle {
  color: $color-text-secondary;
  margin-block-end: 32px;
}
</style>
