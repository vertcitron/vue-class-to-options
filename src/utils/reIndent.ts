export default (source: string, indent: number): string => {
  const lines: string[] = source.split('\n')
  if (lines.length === 0) {
    return ''
  }
  const original: number = lines[0].replace(/[^\s].*$/, '').length

  const output: string[] = []
  for (const line of lines) {
    const now = line.replace(/[^\s].*$/, '').length
    const delta = now - original
    const trimmed = line.trim()
    output.push(trimmed ? ' '.repeat(indent + delta) + trimmed : '')
  }
  return output.join('\n')
}
