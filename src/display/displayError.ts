import chalk from 'chalk'

export default (message: string): void => {
  console.log('\n    ' + chalk.redBright.bold(message) + '\n')
}
