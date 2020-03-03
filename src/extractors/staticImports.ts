import reIndent from "../utils/reIndent"

export default (source: string): string => {
  if (!source.trim()) return ''
  const expression = /<script.*>(.*)@Component/gs
  const output = expression.exec(source)
  return output ? output[1] : ''
}
