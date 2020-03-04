export interface Computeds {
  raws: string[]
  block: string
}

export default (source: string): Computeds => {
  const output: Computeds = {
    raws: [],
    block: ''
  }
  return output
}
