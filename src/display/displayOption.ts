import  chalk from 'chalk'

export default (label: string, option: any): void => {
  console.log(chalk.cyan(label || '############'))
  console.log(option)
  console.log()
}
