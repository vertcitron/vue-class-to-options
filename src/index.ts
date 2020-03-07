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
import componentHeader from './extractors/componentHeader'
import general from './extractors/general'
import propDecorators from './extractors/propDecorators'
import computedProperties from './extractors/computedProperties'
import methodsBlock from './extractors/methodsBlock'

const clean = (source: string): string => {
  return reIndent(source, 0).trim()
}

(async () => {
  await title('Class To Options', 'greenBright')

  // File content extraction and validation
  const filePath = process.argv[2] || ''
  if (!isValidPath(filePath)) process.exit(1)
  const original = readFile(filePath)
  let unprocessed = original
  if (!isValidSFC(original)) process.exit(1)

  // Component root tags extraction
  const before = beforeScript(original)
  unprocessed = removeChunk(unprocessed, before).trim()
  const component = script(unprocessed)
  const after = removeChunk(unprocessed, component).trim()
  unprocessed = component

  // statics extraction
  let statics = staticImports(unprocessed)
  unprocessed = removeChunk(unprocessed, statics)
  statics = clean(statics)
  let header = componentHeader(unprocessed)
  unprocessed = removeChunk(unprocessed, header.chunks)

  // general setup extraction
  let generals = general(unprocessed)
  unprocessed = generals.inner

  // props extraction
  let props = propDecorators(unprocessed)
  unprocessed = removeChunk(unprocessed, props.chunks)

  // computeds extraction
  let computedProps = computedProperties(unprocessed, header.options)
  unprocessed = removeChunk(unprocessed, computedProps.chunks)

  // methods extraction
  let methods = methodsBlock(unprocessed)
  unprocessed = removeChunk(unprocessed, methods.chunks)

  display('Name :', generals.name)
  display('Script attributes :', generals.attrs)
  display('Has semicolons :', generals.semi)
  display('Statics :', statics)
  display('Components :', header.components)
  // display('Head Options :', header.options)
  display('Props :', props.block)
  display('Computed properties :', computedProps.block)
  display('methods', methods.block)
  display('Not processed :', unprocessed)

})()
