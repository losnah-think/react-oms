// 임시로 clsx, tailwind-merge 없이 작동하도록 수정
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, format = 'ko-KR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(format);
}

export function formatDateTime(date: Date | string, format = 'ko-KR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(format);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}-${id}` : id;
}
