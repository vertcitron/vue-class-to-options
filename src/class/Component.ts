import chalk from 'chalk'
import reIndent from '../utils/reIndent'
import getBlock from '../utils/getBlock'

export default class File {
  readonly content: string

  constructor (content: string) {
    if (!content.trim()) {
      console.log(chalk.redBright('    This component file seems to be empty => exiting.'))
      process.exit(1)
    }
    this.content = content
    this.checkSFC()
    this.checkClassApi()
  }

  get before (): string {
    const result = this.content.replace(/<script.*$/gs, '').trim()
    return result || ''
  }

  get script (): string {
    const result = this.content
      .replace(/^.*<script[^>]*>\n/gs, '')
      .replace(/\n<\/script>.*$/gs, '')
    
    return result ? reIndent(result, 0) : ''
  }

  get after (): string {
    const result = this.content.replace(/^.*<\/script>/gs, '').trim()
    return result || ''
  }

  get name () {
    const exp = /export default class (.*) extends Vue/gs
    const result = exp.exec(this.script)
    return result ? result[1] : ''
  }

  get headerOptions () {
    let result = this.script.replace(/^.*@Component\n/gs, '').replace(/export.*$/gs, '')
    result = reIndent(result, 0)
    const keys = result.match(/^[^ :}]*/gm)?.filter(item => item) || []
    const options: any = {}
    for (const key of keys) {
      const value = `{${getBlock(result.substring(result.indexOf(key)))}}`
      Object.defineProperty(options, key, {
        value,
        enumerable: true
      })
    }
    return options
  }

  get components () {
    const list = (this.headerOptions?.components || '').replace(/[{}]/gm, '').split(',').map((item: string) => item.trim())
    return `{ ${list.join(', ')} }`
  }

  private checkSFC () {
    if (!this.content.match(/<script.*export default.*<\/script>/gs)) {
      console.log(chalk.redBright('    The specified file does not seem to be a Vue component => exiting.\n'))
      process.exit(1)
    }
  }
  private checkClassApi () {
    if (!this.content.match(/@Component.*export default class.*<\/script>/gs)) {
      console.log(chalk.redBright('    The component does not seem to be written with Class API => exiting.\n'))
      process.exit(1)
    }
  }
}
