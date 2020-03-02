import reIndent from "../utils/reIndent"

export default class Props {
  readonly raw: string[] = []
  constructor(source: string) {
    const extract = source.match(/\s*@Prop[^)]*[^:]*:[^\n]*/gs)
    if (extract?.length) {
      this.raw = extract.map(prop => prop.split(/\n\s*/).join(' ').trim())
    }
  }

  name (index: number): string {
    const source = this.raw[index] || ''
    const exp = /\) (readonly )*([^:]*)/gm
    const rawName = exp.exec(source)
    return rawName ? rawName[2].replace('!','') : ''
  }

  private options (source: string): string {
    const exp = /@Prop\((.*)\)/
    const options = exp.exec(source)
    if (!options) {
      return ''
    }
    return options[1]
  }

  vueType (index: number): string {
    const source = this.raw[index] || ''
    const opts = this.options(source)
    if (!opts) {
      return ''
    }
    if (opts.includes('{')) {
      const exp = /type: ([^,}]*)/
      const type = exp.exec(opts)
      return type ? type[1].trim() : ''
    }
    return opts.trim()
  }

  tsType (index: number): string {
    const source = this.raw[index] || ''
    const exp = /\)[^:]*:(.*)$/
    const type = exp.exec(source)
    return type ? type[1].trim() : ''
  }

  type (index: number): string {
    const source = this.raw[index] || ''
    const vueType = this.vueType(index)
    const tsType = this.tsType(index)
    let output = ''
    if (vueType) {
      output += `type: ${vueType}`
    }
    if (vueType && tsType) {
      output += ` as PropType<${tsType}>`
    }
    return output
  }

  default (index: number): string {
    const source = this.raw[index] || ''
    if (!source) {
      return ''
    }
    const exp = /default:([^,}]*)/
    const match = exp.exec(source)
    return match ? `default: ${match[1].trim()}`: 'required: true'
  }

  propString (index: number): string {
    if (!this.raw) return ''
    const propName = this.name(index)
    if (!propName) return ''
    const propType = this.type(index)
    const propDefault = this.default(index)
    let output = propName
    if (propType || propDefault) {
      output += ': { '
      if (propType) output += propType
      if (propType && propDefault) output += ', '
      if (propDefault) output += propDefault
      output += ' }'
    }
    return output
  }

  get propsString (): string {
    let output = ''
    for (let i = 0; i < this.raw.length; i++) {
      const propName = this.name(i)
      if (propName) output += this.propString(i)
      if (i !== this.raw.length - 1) output += ',\n'
    }
    return output
  }
}
