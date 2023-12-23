export function formatTime(timestamp) {
  const now = new Date()
  const createdAt = new Date(timestamp)

  const diffInMilliseconds = now - createdAt
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else {
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
    return `${diffInHours}h ago`
  }
}
