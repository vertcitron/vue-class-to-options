const isString = (s: string | string[]): s is string => {
  return (s as string).charAt !== undefined
}

const isStringArray = (s: string | string[]): s is string[] => {
  return Array.isArray(s)
}

const removeChunkString = (source: string, chunk: string): string => {
  if (!chunk.trim()) return source
  if (chunk === '@Component') console.log('removing @Component')
  const start = source.indexOf(chunk)
  if (start === -1) {
    return source
  }
  const separator = chunk.includes('\n') ? '\n' : ''
  const before = source.substring(0, start).replace(/ $/, '')
  let after = source.substring(start + chunk.length)
  if (separator === '\n') after = after.replace(/^ /, '')
  const output = before + separator + after
  return output.replace(/\n{2,}/, '\n\n').trim()
}

const removeChunkArray = (source: string, chunks: string[]): string => {
  const validChunks = chunks.filter(chunk => chunk.trim() !== '')
  if (chunks.length === 0) return source
  let output = source
  let flag = false
  for (const chunk of validChunks) {
    output = removeChunkString(output, chunk)
  }
  return output.replace(/\n{2,}/gm, '\n\n')
}

const removeChunk = (source: string, chunks: string | string[]): string => {
  if (!source.trim()) return ''
  if (isStringArray(chunks)) {
    return removeChunkArray(source, chunks as string[])
  }
  return removeChunkString(source, chunks as string)
}

export default removeChunk
