import chalk from 'chalk'
import reIndent from '../utils/reIndent'
import getBlock from '../utils/getBlock'
import Script from './Script'
import Props from './Props'

export default class File {
  readonly content: string
  readonly script: Script
  readonly props: Props

  constructor (content: string) {
    if (!content.trim()) {
      console.log(chalk.redBright('    This component file seems to be empty => exiting.'))
      process.exit(1)
    }
    this.content = content
    this.checkSFC()
    this.checkClassApi()
    this.script = new Script(content)
    this.props = new Props(this.script.raw)
  }

  get before (): string {
    const result = this.content.replace(/<script.*$/gs, '').trim()
    return result || ''
  }

  get after (): string {
    const result = this.content.replace(/^.*<\/script>/gs, '').trim()
    return result || ''
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
