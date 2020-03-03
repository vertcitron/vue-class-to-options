export default (source: string, chunk: string): string => {
  if (!source.trim()) return ''
  if (!chunk.trim()) return source
  const start = source.indexOf(chunk)
  if (start === -1) return source
  const separator = chunk.includes('\n') ? '\n' : ''
  return source.substring(0, start) + separator + source.substring(start + chunk.length)
}
