import chalk from 'chalk'

export default (label: string, text: string): void => {
  let output = label ? chalk.cyan(`${label} `) : ''
  const prefix = label ? ' '.repeat(label.length + 1) : ''
  const lines = text.split('\n')
  output += lines[0] + '\n'
  for (let i = 1; i < lines.length; i++) {
    output += prefix + lines[i] + '\n'
  }
  console.log(output)
}
