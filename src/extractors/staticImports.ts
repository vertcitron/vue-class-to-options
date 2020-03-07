import reIndent from "../utils/reIndent"

export default (source: string): { block: string, chunk: string } => {
  if (!source.trim()) return ''
  const expression = /<script.*>(.*)@Component/gs
  const extract = expression.exec(source)
  const chunk = extract ? extract[1] : ''
  const block = chunk.split('\n')
    .filter(line => !line.includes('vue-property-decorator'))
    .filter(line => !line.includes('vue-class-decorator'))
    .join('\n')
  return { block, chunk }
}
