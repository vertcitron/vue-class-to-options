import title from './display/title'
import Component from './class/Component'
import File from './class/File'
import chalk from 'chalk'


(async () => {
  await title('Class To Options', 'greenBright')

  const path = process.argv[2] || ''
  const file = new File(path)
  const component = new Component(file.content)

  console.log(chalk.cyan('Source :'))
  console.log(component.content)
  console.log()

  console.log(chalk.cyan('Component name :'))
  console.log(component.script.name)
  console.log()
  
  console.log(chalk.cyan('Static imports and constants :'))
  console.log(component.script.static)
  console.log()
  
  console.log(chalk.cyan('Child components :'))
  console.log(component.script.headerOptions.components)
  console.log()

  console.log(chalk.cyan('Props :'))
  console.log(component.props.propsString)
  console.log()

})()
