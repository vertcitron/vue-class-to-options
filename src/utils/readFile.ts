import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export default (file: string): string => {
  const fullPath = path.join(process.cwd(), file)
  let result: string
  try {
    result = fs.readFileSync(fullPath, 'utf-8')
  } catch {
    result = ''
    console.log('\n    ' + chalk.redBright.bold(`There was a problem reading the file ${fullPath}.`) + '\n')
  }
  return result
}
