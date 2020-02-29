import figlet from 'figlet'
import chalk from 'chalk'

type Colors = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'grey' | 'redBright' | 'yellowBright' | 'greenBright'

export default (text: string, color: string = 'white'): Promise<void> => {
  console.clear()
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      if (err) {
        reject(err)
      }
      console.log(chalk[color](data))
      console.log('\n')
      resolve()
    })
  })
}
