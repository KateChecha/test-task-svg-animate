import { ref, onUnmounted, type Ref } from 'vue'

export interface UseAutoProgressOptions {
  initialValue?: number
  increment?: number
  interval?: number
  maxValue?: number
  minValue?: number
}

export interface UseAutoProgressReturn {
  percentage: Ref<number>
  isRunning: Ref<boolean>
  start: () => void
  stop: () => void
  toggle: () => void
}

export function useAutoProgress(
  options: UseAutoProgressOptions = {},
): UseAutoProgressReturn {
  const {
    initialValue = 0,
    increment = 10,
    interval = 1000,
    maxValue = 100,
    minValue = 0,
  } = options

  const percentage = ref(initialValue)
  const isRunning = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer) return
    isRunning.value = true
    timer = setInterval(() => {
      percentage.value += increment
      if (percentage.value > maxValue) {
        percentage.value = minValue
      }
    }, interval)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isRunning.value = false
  }

  function toggle() {
    if (isRunning.value) {
      stop()
    } else {
      start()
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    percentage,
    isRunning,
    start,
    stop,
    toggle,
  }
}
