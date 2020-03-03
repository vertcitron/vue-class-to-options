import title from './display/title'
import display from './display/displayOption'
import Component from './class/Component'
import File from './class/File'
import chalk from 'chalk'
import isValidPath from './validators/isValidPath'
import readFile from './utils/readFile'
import isValidSFC from './validators/isValidSFC'


(async () => {
  await title('Class To Options', 'greenBright')

  const filePath = process.argv[2] || ''
  if (!isValidPath(filePath)) process.exit(1)
  const original = readFile(filePath)
  if (!isValidSFC(original)) process.exit(1)


  const file = new File(filePath)
  const component = new Component(file.content)

  display('Component name :', component.script.name)
  
  display('Static imports and constants :', component.script.static)
  
  display('Child components :', component.script.headerOptions.components)

  display('Header options :', component.script.headerOptions.options)

  display('Props :', component.props.propsString)

})()
Ò