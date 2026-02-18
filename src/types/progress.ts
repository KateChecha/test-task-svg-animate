export type ProgressStatus = 'normal' | 'success' | 'warning' | 'error'
export type ProgressType = 'circle' | 'dashboard'

export const STATUS_LABELS: Record<ProgressStatus, string> = {
  normal: 'Обычный',
  success: 'Успех',
  warning: 'Предупреждение',
  error: 'Ошибка',
}
