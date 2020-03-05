import getBlock from "../utils/getBlock"
import reIndent from "../utils/reIndent"

export interface Computeds {
  chunks: string[]
  block: string
}

export default (source: string): Computeds => {
  const output: Computeds = {
    chunks: [],
    block: ''
  }
  let sum = ''
  const matches = source.match(/^ *get\s+[^(]*\(.*\)[^{]*{/gm)
  for (const match of matches ?? []) {
    const start = source.indexOf(match)
    const chunk = match + getBlock(source.substring(start)) + '}'
    output.chunks.push(chunk)
    sum += reIndent(chunk, 0).replace(/^ *get\s+/, '').trim() + ',\n'
  }
  if (sum) {
    sum = sum.replace(/\,\n$/, '')
    output.block = 'computed: {\n' + reIndent(sum, 2) + '\n}'
  }
  return output
}
