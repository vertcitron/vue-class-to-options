import reIndent from "../utils/reIndent"

interface ComponentData {
  block: string
  interface: string
  chunks: string[]
}

const previousLine = (source: string, line: string): string => {
  const start = source.indexOf(line)
  if (start < 1) return ''
  const before = source.substring(0, start - 1)
  const last = before.match(/[^\n]*$/gs)
  return last ? last[0] : ''
}

export default (source: string, componentName: string): ComponentData => {
  let data: ComponentData = { block: '', interface: '', chunks: [] }
  const firstPass = source.match(
    /^(?! )(?!@)(?!get)(?!beforeCreate)(?!created)(?!beforeMount)(?!mounted)(?!beforeUpdate)(?!updated)(?!beforeDestroy)(?!destroyed)(?!protected)(?!private)[^()\n=]*:[^\n]*$/gm
  )
  if (firstPass) {
    // need first to remove following lines of @Props declarations
    const matches = []
    for (const line of firstPass) {
      const previous = previousLine(source, line)
      if (!previous.match(/^@Prop/)) {
        matches.push(line)
      }
    }
    // then let's fill chunks with whole declarations
    const chunks: string[] = []
    for (const match of matches) {
      const last = match.trim().slice(-1)
      if (last === '{') {
        const whole = source.match(new RegExp(match + '.*?\n};?', 's'))
        if (whole) chunks.push(whole[0])
      } else if (last === '[') {
        const _match = match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
        const whole = source.match(new RegExp(_match + '.*?\n\];?', 's'))
        if (whole) chunks.push(whole[0])
      } else {
        chunks.push(match)
      }
    }
    // now extract names and types from chunks to build the interface, sub blocks and kept chunks
    const interfaceProps: string[] = []
    const subBlocks: string[] = []
    const keptChunks: string[] = []
    for (const chunk of chunks) {
      const findName = chunk.match(/^[^:]*/)
      const findType = /: ([^ ]*)/.exec(chunk)
      if (findName && findType) {
        const name = findName[0]
        const type = findType[1]
        interfaceProps.push('  ' + name + ': ' + type)
        const cleanChunk = chunk.replace(': ' + type + ' =', ':').replace(/;$/s, '').replace(/,$/s, '')
        subBlocks.push(reIndent(cleanChunk, 2) + ',\n')
        keptChunks.push(chunk)
      }
    }
    // finally assemble the results
    if (keptChunks.length > 0) {
      const iName = componentName + 'Model'
      let iFace = 'interface ' + componentName + 'Model {\n'
      let dataBlock = 'data: (): ' + iName + ' => ({\n'
      for (let i = 0; i < keptChunks.length; i++) {
        iFace += interfaceProps[i] + '\n'
        dataBlock += subBlocks[i]
      }
      iFace += '}'
      dataBlock = dataBlock.replace(/,\n$/s, '\n')
      dataBlock += '})'
      data = { block: dataBlock, interface: iFace, chunks: keptChunks }
    }
  }
  return data
}
