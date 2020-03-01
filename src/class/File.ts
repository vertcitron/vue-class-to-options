import fs from 'fs'
import chalk from 'chalk'

export default class File {
  private path: string = ''
  readonly content: string = ''

  constructor(path: string) {
    let pass = true
    if (pass && !path) {
      console.log(chalk.redBright('    You must provide a single file component => exiting.'))
      pass = false
      process.exit(1)
    }
    if (pass && !path.match(/\.vue$/)) {
      console.log(chalk.redBright('    The provided file has not a .vue extension => exiting.'))
      pass = false
      process.exit(1)
    }
    if (pass && !fs.existsSync(path)) {
      console.log(chalk.redBright('    The provided file does not exist => exiting.'))
      pass = false
      process.exit(1)
    }
    if (pass) {
      this.path = path
      this.content = fs.readFileSync(this.path, 'utf-8')
    }
  }
}
