import fs from 'fs'
import chalk from 'chalk'

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

  private checkSFC () {
    if (!this.content.match(/<script.*export default.*<\/script>/gs)) {
      console.log(chalk.redBright('    The specified file does not seem to be a Vue component => exiting.\n'))
      process.exit(1)
    }
  }
  private checkClassApi () {
    if (!this.content.match(/@Component.*<script.*export default class.*<\/script>/gs)) {
      console.log(chalk.redBright('    The component does not seem to be written with Class API => exiting.\n'))
      process.exit(1)
    }
  }
}
