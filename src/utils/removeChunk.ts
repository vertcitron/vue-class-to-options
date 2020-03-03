export default (source: string, chunk: string): string => {
  if (!source.trim()) return ''
  if (!chunk.trim()) return source
  const start = source.indexOf(chunk)
  if (start === -1) return source
  return source.substring(0, start) + source.substring(start + chunk.length)
}
