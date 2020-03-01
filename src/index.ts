import title from './display/title'
import File from './class/Component'

(async () => {
  await title('Class To Options', 'greenBright')

  const path = process.argv[2] || ''
  const file = new File(path)

  console.log(file.content)
})()
