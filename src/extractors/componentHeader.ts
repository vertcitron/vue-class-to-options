import removeChunk from "../utils/removeChunk"
import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"
import { match } from "assert"

export interface HeaderOptions {
  [key: string]: string
}

export interface Header {
  components: string
  options: HeaderOptions
  chunks: string[]
}

interface Typing {
  chunk: string
  key: string
  value: string
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
      enumerable: true,
      writable: true
    })
  }
  return options
}

const optionsTyping = (source: string): Typing[] => {
  const output: Typing[] = []
  const lines = source.split('\n')
  const expression = /protected ([^:]*): ([^;\s]*)/
  for (const line of lines) {
    const match = expression.exec(line)
    if (match) {
      output.push({ chunk: line, key: match[1], value: match[2] })
    }
  }
  return output
}

const extractGetters = (source: string, typings: Typing[] = []): { functions: string, chunks: string[] } => {
  let output: string = ''
  let chunks: string[] = []
  const expression = /\.{3}mapGetters\s*\({\n*([^\)]*)}\)/gs
  const gettersBlock = expression.exec(source)
  if (gettersBlock) {
    chunks.push('  ' + gettersBlock[0])
    const getters = gettersBlock[1].match(/ *.*$/gm)
    for (const getter of getters ?? []) {
      const expr = /^ *([^:]*): ('.*').*$/gm
      const extr = expr.exec(getter)
      if (extr && extr[1] && extr[2]) {
        let key = extr[1]
        const typing = typings.find(item => item.key === key)
        if (typing) {
          key += ` (): ${typing.value}`
          chunks.push(typing.chunk)
        } else {
          key += ` ()`
        }
        output += `${key} {\n  return this.$store.getters[${extr[2]}]\n},\n`
      }
    }
  }
  return { functions: output.replace(/,\n$/gs, ''), chunks }
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

  const computed = output.options?.computed
  if (computed?.includes('...mapGetters')) {
    const typings = optionsTyping(source)
    const getters = extractGetters(computed, typings)
    output.options.computed = computed.replace(getters.chunks[0], reIndent(getters.functions, 2))
    output.chunks = output.chunks.concat(getters.chunks.slice(1))
  }

  return output
}
