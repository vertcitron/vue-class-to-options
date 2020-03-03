export default (source: string): string => {
  if (!source.trim()) return ''

  const expression = /^(.*(<\/template>)?.*)<script.*<\/script>/gs
  const output = expression.exec(source)

  return output ? output[1].trim() : ''
}
