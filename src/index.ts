import title from './display/title'
import display from './display/displayOption'
import isValidPath from './validators/isValidPath'
import readFile from './utils/readFile'
import isValidSFC from './validators/isValidSFC'
import beforeScript from './extractors/beforeScript'
import removeChunk from './utils/removeChunk'
import script from './extractors/script'
import staticImports from './extractors/staticImports'
import reIndent from './utils/reIndent'
import componentOptions from './extractors/componentOptions'
import general from './extractors/general'

const clean = (source: string): string => {
  return reIndent(source, 0).trim()
}

(async () => {
  await title('Class To Options', 'greenBright')

  // File content extraction and validation
  const filePath = process.argv[2] || ''
  if (!isValidPath(filePath)) process.exit(1)
  const original = readFile(filePath)
  let remains = original
  if (!isValidSFC(original)) process.exit(1)

  // Component root tags extraction
  const before = beforeScript(original)
  remains = removeChunk(remains, before).trim()
  const component = script(remains)
  const after = removeChunk(remains, component).trim()
  remains = component

  // statics extraction
  let statics = staticImports(remains)
  remains = removeChunk(remains, statics)
  statics = clean(statics)
  let header = componentOptions(remains)
  remains = removeChunk(remains, header.raw)

  // general setup extraction
  let generals = general(remains)
  remains = generals.inner

  display('Name :', generals.name)
  display('Script attributes :', generals.attrs)
  display('Statics :', statics)
  display('Components :', header.components)
  display('Head Options :', header.options)
  display('Remains :', remains)

})()
