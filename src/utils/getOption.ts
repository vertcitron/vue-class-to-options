import getBlock from "./getBlock"

export default (source: string, property: string): string => {
  const start = source.indexOf(property)
  if (start === -1) {
    return ''
  }
  const fragment = source.substring(start)
  return getBlock(fragment)
}
