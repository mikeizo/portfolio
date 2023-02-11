export const date = () => {
  const dateObj = new Date()
  const date =
    dateObj.getFullYear() +
    '-' +
    (dateObj.getMonth() + 1) +
    '-' +
    dateObj.getDate() +
    ' ' +
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes() +
    ':' +
    dateObj.getSeconds()

  return date
}
