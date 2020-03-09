import getBlock from "../utils/getBlock"
import reIndent from "../utils/reIndent"
import { HeaderOptions } from './componentHeader'

export interface Computeds {
  chunks: string[]
  block: string
}

export default (source: string, headOptions: HeaderOptions = {}): Computeds => {
  const output: Computeds = {
    chunks: [],
    block: ''
  }
  let sum = ''
  if (headOptions.computed) {
    let head = headOptions.computed
      .replace(/^\{\n/gs, '')
      .replace(/\n}$/gs, '')
      .replace(/^  /gm, '')
    if (head) sum += head + ',\n'
  }
  const matches = source.match(/^ *get\s+[^(]*\(.*\)[^{]*{/gm)
  for (const match of matches ?? []) {
    const start = source.indexOf(match)
    const chunk = match + getBlock(source.substring(start)) + '}'
    output.chunks.push(chunk)
    sum += chunk.replace(/^ *get\s+/, '').trim() + ',\n'
  }
  if (sum) {
    sum = sum.replace(/\,\n$/, '')
    output.block = 'computed: {\n' + reIndent(sum, 2) + '\n}'
  }
  return output
}
