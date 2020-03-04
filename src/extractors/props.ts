
export interface Prop {
  raw: string
  line: string
}

const transformer = (source: string): string => {
  const line = source.split('\n').join(' ').trim()
  const name = line.replace(/@Prop\(.*\)\s?/, '').replace(/:.*$/, '').replace(/readonly\s*/, '').replace('!', '').trim()
  const options = line.replace(/@Prop\s*\(/, '').replace(/\).*$/, '').trim()
  const type = line.replace(/@Prop\(.*\).*:\s*/, '').replace(/;\s*/, '').trim()
  let output = ''
  if (name) {
    output += name
    if (options) {
      output += ': ' + options
      if (type) {
        const hasOptions = line.match(/@Prop\s*\(.+\)/)
        if (hasOptions) {
          const hasSingleVueType = line.match(/@Prop\s*\([^{}]+\)/)
          if (hasSingleVueType) {
            const pattern = hasSingleVueType[0].replace(/@Prop\s*\(/, '').replace(/\)\s*/, '')
            output = output.replace(pattern, `${pattern} as PropType<${type}>`)
          } else {
            const hasObject = line.match(/@Prop\s*\({[^)]+\)/)
            if (hasObject) {
              const inner = hasObject[0].replace(/@Prop\s*\({/, '').replace(/}\)\s*/, '').trim()
              const single = inner.match(/,?\s*type: [^,}\[]+/)
              if (single) {
                const pattern = single[0].replace('type: ', '')
                output = output.replace(pattern, `${pattern} as PropType<${type}>`)
              } else {
                const multiple = inner.match(/,?\s*type: \[.*\]/)
                if (multiple) {
                  const pattern = multiple[0].replace('type: ', '')
                  output = output.replace(pattern, `${pattern} as PropType<${type}>`)
                } else {
                  output += ` // as PropType<${type}>`
                }
              }
            }
          }
        }
      }
    } else {
      const type = line.match(/:.*$/)
      if (type) output += ` // as PropType<${type[0].replace(': ', '').replace(/;\s*/, '').trim()}>`
    }
  }
  return output
}

export default (source: string): Prop[] => {
  let output: Prop[] = []
  const searchProps = source.match(/@Prop\([^)]*\)\s*[^\n:]*(:\s+[^\n]*)?\s*/gs)
  if (searchProps) {
    for (const propRaw of searchProps) {
      output.push({
        raw: propRaw,
        line: transformer(propRaw)
      })
    }
  }
  return output
}
