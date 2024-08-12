export function toCase(str: string) {
  const to = str.replace(/(-[a-z])/g, (v) => {
    return v.replace('-', '').toLocaleUpperCase()
  })

  return lower(to)
}

export function lower(str: string) {
  return str.replace(str[0], str[0].toLowerCase())
}
