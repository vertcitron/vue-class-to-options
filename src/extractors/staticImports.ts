import reIndent from "../utils/reIndent"

export default (source: string): { block: string, chunk: string } => {
  if (!source.trim()) return { block: '', chunk: '' }
  const expression = /<script.*>(.*)@Component/gs
  const extract = expression.exec(source)
  let chunk = extract ? extract[1] : ''
  chunk = chunk.replace(/^\n/s, '').trimEnd()
  const block = chunk.split('\n')
    .filter(line => !line.includes('vue-property-decorator'))
    .filter(line => !line.includes('vue-class-decorator'))
    .join('\n')
    .trimEnd()
  return { block, chunk }
}
