export const formatDate = (date: string | number | Date): string => {
  const covertedDate = new Date(date)
  const formatedDate = covertedDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  })
  const formatedTime = covertedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formatedDate} ${formatedTime}`
}
