import fs from 'fs'
import chalk from 'chalk'

export default (): string => {
  const param = process.argv[2]
  if (!param) {
    console.log(chalk.redBright('    A file must be specified => exiting.\n'))
    process.exit(1)
  }
  if (!param.match(/.*\.vue$/)) {
    console.log(chalk.redBright('    The specified file is not a .vue one => exiting.\n'))
    process.exit(1)
  }
  if (!fs.existsSync(param)) {
    console.log(chalk.redBright('    The specified file does not exist => exiting.\n'))
    process.exit(1)
  }
  return param
}
