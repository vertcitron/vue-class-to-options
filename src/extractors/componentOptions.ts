import removeChunk from "../utils/removeChunk"
import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"

export interface Options {
  components: string
  options: object
  raw: string
}

const rawOptions = (source: string): object => {
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

export default (source: string): Options => {
  const output: Options = {
    components: '',
    options: {},
    raw: ''
  }

  const rawResult = /(@Component.*)export default/gs.exec(source)
  if (!rawResult) return output
  output.raw = rawResult[1]

  const componentsResult = /components:[^}]*{([^}]*)}/gs.exec(output.raw)

  let remains = output.raw
  if (componentsResult) {
    output.components = '{ ' + componentsResult[1].split(',').map(s => s.trim()).join(', ') + ' }'
    remains = removeChunk(output.raw, componentsResult[0])
  }

  const optionsResult = /@Component[^[a-z]*(.*)}\)[\n\s]*$/gs.exec(remains)
  if (optionsResult) {
    const optionsList = reIndent('    ' + optionsResult[1], 0)
    output.options = rawOptions(optionsList)
  }

  return output
}
