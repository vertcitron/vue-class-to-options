export default (source: string): string => {
  const output = source.match(/<script.*script>/gs)
  return output ? output[0] : ''
}
