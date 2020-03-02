import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"

export default class HeaderOptions {
  readonly raw: string = ''

  constructor(source: string) {
    const result = source.match(/@Component.*export default/gs)
    if (!result || result.length === 0) {
      this.raw = ''
    } else {
      const cleaned = result[0]
        .replace('@Component', '')
        .replace('export default', '')
      this.raw = reIndent(cleaned, 0)
    }
  }

  get options (): object {
    if (!this.raw) {
      return {}
    }
    const keys = this.raw.match(/^[^ :}]*/gm)?.filter(item => item) || []
    const options: any = {}
    for (const key of keys) {
      let value = ''
      const remaining = this.raw.substring(this.raw.indexOf(key)).replace(`${key}: `, '')
      if (remaining.charAt(0) === '{') {
        value = `{\n${reIndent(getBlock(remaining), 4)}\n  }`
      } else if (remaining.charAt(0) === '{') {
        value = reIndent(getBlock(remaining, '[', ']'), 0)
      } else {
        value = remaining.split('\n')[0]
        value = value.substring(1, value.length - 1)
      }
      Object.defineProperty(options, key, {
        value,
        enumerable: true
      })
    }
    return options
  }

  get components (): string {
    if (!Object.keys(this.options).includes('components')) {
      return ''
    }
    const raw: string = (this.options as any).components
    const list = raw.trim().substring(1, raw.length - 1).split(',').map(item => item.trim())
    return `{ ${list.join(', ')} }`
  }
}
