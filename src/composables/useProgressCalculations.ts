import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import type { ProgressStatus, ProgressType } from '@/types/progress'

export interface ProgressCalculationsProps {
  percentage: MaybeRefOrGetter<number>
  status: MaybeRefOrGetter<ProgressStatus>
  type: MaybeRefOrGetter<ProgressType>
  strokeWidth: MaybeRefOrGetter<number>
  width: MaybeRefOrGetter<number>
  color?: MaybeRefOrGetter<string | ((percentage: number) => string) | undefined>
  format?: MaybeRefOrGetter<((percentage: number) => string) | undefined>
}

export interface ProgressCalculations {
  clamped: ComputedRef<number>
  radius: ComputedRef<number>
  perimeter: ComputedRef<number>
  center: ComputedRef<number>
  isDashboard: ComputedRef<boolean>
  rate: ComputedRef<number>
  arcLength: ComputedRef<number>
  dashArray: ComputedRef<string>
  dashOffset: ComputedRef<number>
  rotation: ComputedRef<string>
  stroke: ComputedRef<string>
  text: ComputedRef<string>
  textColor: ComputedRef<string>
}

export function useProgressCalculations(
  props: ProgressCalculationsProps,
): ProgressCalculations {
  const clamped = computed(() => {
    const p = toValue(props.percentage)
    return Math.max(0, Math.min(100, p))
  })
  
  const width = computed(() => toValue(props.width))
  const strokeWidth = computed(() => toValue(props.strokeWidth))
  const status = computed(() => toValue(props.status))
  const type = computed(() => toValue(props.type))
  const color = computed(() => toValue(props.color))
  const format = computed(() => toValue(props.format))
  
  const radius = computed(() => (width.value - strokeWidth.value) / 2)
  const perimeter = computed(() => 2 * Math.PI * radius.value)
  const center = computed(() => width.value / 2)
  const isDashboard = computed(() => type.value === 'dashboard')

  const rate = computed(() => (isDashboard.value ? 0.75 : 1))
  const arcLength = computed(() => perimeter.value * rate.value)
  const dashArray = computed(() => `${arcLength.value} ${perimeter.value}`)
  const dashOffset = computed(() => arcLength.value * (1 - clamped.value / 100))

  const rotation = computed(() => {
    const angle = isDashboard.value ? 135 : -90
    return `rotate(${angle}, ${center.value}, ${center.value})`
  })

  const stroke = computed(() => {
    const c = color.value
    if (c) {
      return typeof c === 'function'
        ? c(clamped.value)
        : c
    }
    switch (status.value) {
      case 'success':
        return '#67c23a'
      case 'warning':
        return '#e6a23c'
      case 'error':
        return '#f56c6c'
      default:
        return `hsl(${(clamped.value / 100) * 120}, 75%, 50%)`
    }
  })

  const text = computed(() => {
    const f = format.value
    if (f) return f(clamped.value)
    switch (status.value) {
      case 'success':
        return '✓'
      case 'warning':
        return '!'
      case 'error':
        return '✕'
      default:
        return `${Math.round(clamped.value)}%`
    }
  })

  const textColor = computed(() => {
    switch (status.value) {
      case 'success':
        return '#67c23a'
      case 'warning':
        return '#e6a23c'
      case 'error':
        return '#f56c6c'
      default:
        return '#606266'
    }
  })

  return {
    clamped,
    radius,
    perimeter,
    center,
    isDashboard,
    rate,
    arcLength,
    dashArray,
    dashOffset,
    rotation,
    stroke,
    text,
    textColor,
  }
}
