import fs from 'fs'
import chalk from 'chalk'
import getOption from '../utils/getOption'

export default class File {
  private path: string
  public content: string

  constructor (path: string) {
    this.path = path
    this.content = fs.readFileSync(path, 'utf8')
    this.checkSFC()
    this.checkClassApi()
  }

  get before (): string {
    const result = this.content.replace(/@Component.*$/gs, '').trim()
    return result || ''
  }

  get script (): string {
    const result = this.content
      .replace(/^.*<script[^>]*>\n/gs, '')
      .replace(/\n<\/script>.*$/gs, '')
    return result || ''
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
    const result = this.script.replace(/^.*@Component\n/gs, '').replace(/export.*$/gs, '')
    return `{\n${result}\n}`
  }

  get components () {
    const result = getOption(this.headerOptions, 'components').split(',').map(item => item.trim()).join(', ')
    return result ? `{ ${result} }` : ''
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
