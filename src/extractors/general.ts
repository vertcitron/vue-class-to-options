import getBlock from "../utils/getBlock"
import reIndent from "../utils/reIndent"

export interface General {
  inner: string
  name: string
  attrs: string
}

export default (source: string): General => {
  const output: General = {
    inner: '',
    name: '',
    attrs: ''
  }

  const searchAttrs = /<script\s+([^>]*)\s*>/gs.exec(source)
  if (searchAttrs) {
    output.attrs = searchAttrs[1].split('\n').map(l => l.trim()).join(' ').trim()
  }

  const searchName = /class\W+([-\w]+)\W+extends Vue/.exec(source)
  if (searchName) {
    output.name = searchName[1].trim()
  }

  const block = getBlock(source)
  output.inner = reIndent(block, 0)
  

  return output  
}
