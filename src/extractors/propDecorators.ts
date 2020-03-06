import reIndent from "../utils/reIndent"

export interface Props {
  chunks: string[]
  block: string
}

const transformer = (source: string): string => {
  const line = source.split('\n').join(' ').trim()
  const name = line.replace(/@Prop\(.*\)\s?/, '').replace(/:.*$/, '').replace(/readonly\s*/, '').replace('!', '').trim()
  const options = line.replace(/@Prop\s*\(/, '').replace(/\).*$/, '').trim()
  const type = line.replace(/@Prop\(.*\).*:\s*/, '').replace(/;\s*/, '').trim()
  let output = ''
  // I wrote this, I know it works, but I'm no longer able to understand it...
  // TODO: it really needs refacto !!!
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

export default (source: string): Props => {
  let output: Props = {block: '', chunks: []}
  const searchProps = source.match(/@Prop\([^)]*\)\s*[^\n:]*(:\s+[^\n]*)?\s*/gs)
  if (searchProps) {
    for (const propRaw of searchProps) {
      output.chunks.push(propRaw)
      output.block += transformer(propRaw) + ',\n'
    }
    output.block = 'props: {\n' + reIndent(output.block.replace(/,\n$/, ''), 2) + '\n}'
    output.block = output.block.replace(/props: {\s*}/, '')
  }
  return output 
}
// ·