import title from './display/title'
import display from './display/block'
import Component from './class/Component'
import getArguments from './utils/getArguments'

(async () => {
  await title('Class To Options', 'greenBright')

  const path = getArguments()
  const component = new Component(path)

  display('script :', component.script)
  display('name :', component.name)
  for (const key in component.headerOptions) {
    display(`${key}:`, component.headerOptions[key])
  }
  display ('components :', component.components)
})()
