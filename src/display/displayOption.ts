import  chalk from 'chalk'

export default (label: string, option: any): void => {
  console.log(chalk.yellow.bold(label || '############'))
  console.log(option)
  console.log()
}
