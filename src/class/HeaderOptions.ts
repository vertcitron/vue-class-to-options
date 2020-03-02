import reIndent from "../utils/reIndent"
import getBlock from "../utils/getBlock"

export default class HeaderOptions {
  readonly raw: string = ''

  constructor(source: string) {
    const expr = /@Component\s*\(\{\n*(.*)\}\)\n*export default/gs
    const zone = expr.exec(source)
    if (zone) {
      this.raw = reIndent(zone[1], 0)
    }
  }

  private rawOptions (): object {
    if (!this.raw) {
      return {}
    }
    const keys = this.raw.match(/^[^ :}]*/gm)?.filter(item => item) || []
    const options: any = {}
    for (const key of keys) {
      let value = ''
      const expr = new RegExp(`${key}: (.*)`, 'gs')
      const match = expr.exec(this.raw)
      const remaining = match ? match[1] : ''
      if (remaining.charAt(0) === '{') {
        value = `{\n${reIndent(getBlock(remaining), 2)}\n}`
      } else if (remaining.charAt(0) === '[') {
        value = `[\n${reIndent(getBlock(remaining, '[', ']'), 2)}\n]`
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

  get options () {
    const output: { components?: string } = { ...this.rawOptions() }
    delete output.components
    return output
  }

  get components (): string {
    const optionsSet = this.rawOptions()
    if (!Object.keys(optionsSet).includes('components')) {
      return ''
    }
    const raw: string = (optionsSet as any).components
    const list = raw.trim().substring(1, raw.length - 1).split(',').map(item => item.trim())
    return `{ ${list.join(', ')} }`
  }
}
