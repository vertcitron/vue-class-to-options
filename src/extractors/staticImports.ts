import reIndent from "../utils/reIndent"

export default (source: string): { block: string, chunk: string } => {
  if (!source.trim()) return { block: `import Vue, { PropType } from 'vue'\n`, chunk: '' }
  const expression = /<script.*>(.*)@Component/gs
  const extract = expression.exec(source)
  let chunk = extract ? extract[1] : ''
  chunk = chunk.replace(/^\n/s, '').trimEnd()
  let extracted = chunk.split('\n')
    .filter(line => !line.includes('vue-property-decorator'))
    .filter(line => !line.includes('vue-class-decorator'))
    .filter(line => !line.includes('import Vue'))
    .map(line => line.trim())
    .join('\n')
    .trimEnd()
  const hasSemi: boolean = chunk.split('\n')[0].slice(-1) === ';'
  let block = `import Vue, { PropType } from 'vue'`
  block += hasSemi ? ';\n' : '\n'
  block += extracted
  block = block.trim() + '\n'
  return { block, chunk }
}
