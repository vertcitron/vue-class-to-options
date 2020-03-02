import title from './display/title'
import display from './display/displayOption'
import Component from './class/Component'
import File from './class/File'
import chalk from 'chalk'


(async () => {
  await title('Class To Options', 'greenBright')

  const path = process.argv[2] || ''
  const file = new File(path)
  const component = new Component(file.content)

  display('Component name :', component.script.name)
  
  display('Static imports and constants :', component.script.static)
  
  display('Child components :', component.script.headerOptions.components)

  display('Header options :', component.script.headerOptions.options)

  display('Props :', component.props.propsString)

})()
