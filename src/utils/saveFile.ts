import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export default (content: string, fullpath: string): void => {
  const dirpath = path.dirname(fullpath)
  const extension = path.extname(fullpath)
  const basename = path.basename(fullpath, extension)
  const newPath = path.join(dirpath, basename + '.optionsAPI' + extension)
  fs.writeFileSync(newPath, content)
}
