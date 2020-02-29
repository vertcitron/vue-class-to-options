export default (source: string, opens: string = '{', closes: string = '}') => {
  let count = 0;
  let start = source.indexOf(opens)
  let end = -1
  if (start === -1) {
    return ''
  }
  for (let i = start; i < source.length; i++) {
    const ch = source.charAt(i)
    if (ch === opens) {
      ++count
    }
    if (ch === closes) {
      if (count <= 0) {
        return ''
      }
      if (count > 0) {
        --count
      }
      if (count === 0) {
        end = i
        break
      }
    }
  }
  if (end === -1) {
    return ''
  }
  return source.substring(start, end + 1)
}
