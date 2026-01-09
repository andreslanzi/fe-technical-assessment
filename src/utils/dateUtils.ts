export const formatDateRelative = (timestamp: number): string => {
  const now = new Date()
  const date = new Date(timestamp * 1000)
  
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  
  const diffTime = nowDate.getTime() - targetDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays > 3 && diffDays < 7) {
    return 'This Week'
  } else {
    return `${diffDays} Days Ago`
  }
}

