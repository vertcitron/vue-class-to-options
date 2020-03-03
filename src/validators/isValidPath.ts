import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

export default (file: string): boolean => {
  if (!file) {
    console.log('\n    ' + chalk.redBright.bold('You must provide a valid Vue file.') + '\n')
    return false
  }
  if (!file.match(/\.vue$/)) {
    console.log('\n    ' + chalk.redBright.bold('The provided path is not a .vue file.') + '\n')
    return false
  }
  const fullPath = path.join(process.cwd(), file)
  if (!fs.existsSync(fullPath)) {
    console.log('\n    ' + chalk.redBright.bold('The provided path does not exist.') + '\n')
    return false
  }
  return true
}
