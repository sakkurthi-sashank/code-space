export function formatCustomDate(data: string | Date) {
  // Example :- Jun 12 2021, 12:00:00 AM
  const date = new Date(data)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${month} ${day} ${year}, ${time}`
}

export function formatCustomDateWithOutTime(data: string | Date) {
  // Example :- Jun 12 2021
  const date = new Date(data)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day} ${year}`
}
