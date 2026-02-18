import { ref, computed, reactive, type Ref, type ComputedRef } from 'vue'
import type { ChartData, ChartOptions } from 'chart.js'

export interface ChartItem {
  id: number
  name: string
  value: number
  color: string
}

export interface ChartForm {
  name: string
  value: number
  color: string
}

export interface UseChartItemsReturn {
  items: Ref<ChartItem[]>
  editingId: Ref<number | null>
  form: ChartForm
  isEditing: ComputedRef<boolean>
  totalValue: ComputedRef<number>
  chartData: ComputedRef<ChartData<'pie'>>
  chartOptions: ChartOptions<'pie'>
  submit: () => void
  editItem: (item: ChartItem) => void
  deleteItem: (id: number) => void
  cancelEdit: () => void
  resetForm: () => void
  getPercentage: (value: number) => number
}

const DEFAULT_COLOR = '#409EFF'

export function useChartItems(initialItems: ChartItem[] = []): UseChartItemsReturn {
  let nextId = initialItems.length > 0 
    ? Math.max(...initialItems.map(i => i.id)) + 1 
    : 1

  const items = ref<ChartItem[]>([...initialItems])
  const editingId = ref<number | null>(null)
  const form = reactive<ChartForm>({
    name: '',
    value: 0,
    color: DEFAULT_COLOR,
  })

  const isEditing = computed(() => editingId.value !== null)

  const totalValue = computed(() => items.value.reduce((sum, item) => sum + item.value, 0))

  const chartData = computed<ChartData<'pie'>>(() => ({
    labels: items.value.map((i) => i.name),
    datasets: [
      {
        data: items.value.map((i) => i.value),
        backgroundColor: items.value.map((i) => i.color),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }))

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    devicePixelRatio: Math.round(window.devicePixelRatio ?? 1),
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  function submit() {
    if (!form.name.trim() || form.value <= 0) return

    if (editingId.value !== null) {
      const item = items.value.find((i) => i.id === editingId.value)
      if (item) {
        item.name = form.name
        item.value = form.value
        item.color = form.color
      }
      editingId.value = null
    } else {
      items.value.push({
        id: nextId++,
        name: form.name,
        value: form.value,
        color: form.color,
      })
    }
    resetForm()
  }

  function editItem(item: ChartItem) {
    editingId.value = item.id
    form.name = item.name
    form.value = item.value
    form.color = item.color
  }

  function deleteItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
    if (editingId.value === id) cancelEdit()
  }

  function cancelEdit() {
    editingId.value = null
    resetForm()
  }

  function resetForm() {
    form.name = ''
    form.value = 0
    form.color = DEFAULT_COLOR
  }

  function getPercentage(value: number): number {
    if (totalValue.value === 0) return 0
    return Math.round((value / totalValue.value) * 100)
  }

  return {
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
  }
}
