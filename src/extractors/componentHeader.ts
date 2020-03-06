import removeChunk from "../utils/removeChunk"
import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"

export interface HeaderOptions {
  [key: string]: string
}

export interface Header {
  components: string
  options: HeaderOptions
  chunks: string[]
}

const rawOptions = (source: string): HeaderOptions => {
  if (!source.trim()) return {}
  const keys = source.match(/^[^ :,.}]*/gm)?.filter(item => item) || []
  const options = {}
  for (const key of keys) {
    let value = ''
    const expr = new RegExp(`${key}: (.*)`, 'gs')
    const match = expr.exec(source)
    const remaining = match ? match[1] : ''
    if (remaining.charAt(0) === '{') {
      value = `{\n${reIndent(getBlock(remaining), 2)}\n}`
    } else if (remaining.charAt(0) === '[') {
      value = `[\n${reIndent(getBlock(remaining, '[', ']'), 2)}\n]`
    } else {
      value = remaining.split('\n')[0]
      value = value.substring(1, value.length - 1)
    }
    Object.defineProperty(options, key, {
      value,
      enumerable: true
    })
  }
  return options
}



export default (source: string): Header => {
  const output: Header = {
    components: '',
    options: {},
    chunks: []
  }

  const chunksResult = /(@Component.*)export default/gs.exec(source)
  if (!chunksResult) return output
  const header = chunksResult[1]
  const componentsResult = /components:[^}]*{([^}]*)}/gs.exec(header)
  let unprocessed = header
  if (componentsResult) {
    output.components = '{ ' + componentsResult[1].split(',').map(s => s.trim()).join(', ') + ' }'
    unprocessed = removeChunk(header, componentsResult[0])
  }
  const optionsResult = /@Component[^[a-z]*(.*)}\)[\n\s]*$/gs.exec(unprocessed)
  if (optionsResult) {
    const optionsList = reIndent('    ' + optionsResult[1], 0)
    output.options = rawOptions(optionsList)
  }
  if (header) output.chunks.push(header)

  return output
}
