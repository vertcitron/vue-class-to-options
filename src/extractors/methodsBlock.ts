import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"

interface Methods {
  block: string
  chunks: string[]
}

export default (source: string): Methods => {
  const output: Methods = { block: '', chunks: [] }
  const methodLines = source.match(/^(?! )(?!@)(?!get)(?!beforeCreate)(?!created)(?!beforeMount)(?!mounted)(?!beforeUpdate)(?!updated)(?!beforeDestroy)(?!destroyed).*{$/gm)
  for (const line of methodLines ?? []) {
    let chunk = source.substring(source.indexOf(line))
    let end = chunk.indexOf('\n}')
    if (end > -1) {
      chunk = chunk.substring(0, end) + '\n}'
    }
    output.chunks.push(chunk)
  }
  if (output.chunks.length > 0) {
    let sum = output.chunks.reduce((acc, value) => acc + ',\n' + value)
    output.block = 'methods: {\n' + reIndent(sum, 2) + '\n}'
    }
  return output
}
