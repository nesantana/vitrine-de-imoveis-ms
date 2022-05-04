export const capitalize = (str: string) => {
  if (typeof str !== 'string' || !str.length) {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.substr(1)
}
