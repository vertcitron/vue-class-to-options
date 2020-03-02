import reIndent from "../utils/reIndent"
import HeaderOptions from "./HeaderOptions"

export default class Script {
  readonly raw: string = ''

  constructor (content: string) {
    const result = content.match(/<script.*<\/script>/gs)
    if (!result || result.length === 0) {
      this.raw = ''
    } else {
      const cleaned = result[0]
        .replace(/<script[^>]*>/gm, '')
        .replace(/<\/script>/gm, '')
    this.raw = reIndent(cleaned, 0)
    }
  }

  get name (): string {
    const exp = /export default class (.*) extends Vue/gs
    const result = exp.exec(this.raw)
    return result ? result[1] : ''
  }

  get static (): string {
    const exp = /^(.*)@Component/gs
    const output = exp.exec(this.raw)
    return output ? reIndent(output[1], 0).trim() : ''
  }

  get headerOptions (): HeaderOptions {
    return new HeaderOptions(this.raw)
  }

}
