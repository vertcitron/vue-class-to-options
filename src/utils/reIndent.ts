const trimTopBottom = (source: string): string => {
  return source.replace(/^\n/gs, '').replace(/\n$/gs, '')
}

export default (source: string, indent: number): string => {
  const lines: string[] = trimTopBottom(source).split('\n')
  if (lines.length === 0) {
    return ''
  }
  const original: number = lines[0].replace(/[^\s].*$/, '').length

  const output: string[] = []
  for (const line of lines) {
    const now = line.replace(/[^\s].*$/, '').length
    const delta = Math.max(now - original, 0)
    const trimmed = line.trim()
    output.push(trimmed ? ' '.repeat(indent + delta) + trimmed : '')
  }
  return trimTopBottom(output.join('\n'))
}
