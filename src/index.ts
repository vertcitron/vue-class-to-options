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
  unprocessed = removeChunk(unprocessed, statics.chunk)
  statics.block = clean(statics.block)
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
  unprocessed = removeChunk(unprocessed, methods.chunks).trim()

  let converted = before + '\n\n'
  const attributes = generals.attrs ? ` ${generals.attrs}` : ''
  converted += `<script${attributes}>\n`
  converted += statics ? reIndent(statics.block, 2) : ''
  converted += '\n\n  export default Vue.extend ({\n'
  if (generals.name) converted += `    name: '${generals.name}',\n\n`
  if (header.components) converted += `    components: ${header.components},\n\n`
  if (props.block) converted += reIndent(props.block, 4) + ',\n\n'
  if (computedProps.block) converted += reIndent(computedProps.block, 4) + ',\n\n'
  if (methods.block) converted += reIndent(methods.block, 4) + '\n'
  if (unprocessed) {
    converted += '\n    /****************** UNPROCESSED LINES FROM ORIGINAL COMPONENT: ******************\n\n'
    converted += reIndent(unprocessed, 6)
    converted += '\n\n     ********************************************************************************/\n'
  }
  converted += '  )}'
  converted += generals.semi ? ';\n' : '\n'
  converted += '</script>\n'
  if (after) converted += '\n' + after

  display('Converted component =', converted)
})()
