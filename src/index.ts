import title from './display/title'
import File from './class/File'
import getArguments from './utils/getArguments'

(async () => {
  await title('Class To Options', 'greenBright')

  const path = getArguments()

  const component = new File(path)
  console.log(component.content)
})()
