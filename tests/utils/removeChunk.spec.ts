import removeChunk from '../../src/utils/removeChunk'

const multilineSource =
`The multilined
chunked
source`

const multilineChunk =
`multilined
chunk`

const multilineUnchunked1 =
`The multilined
ed
source`

const multilineUnchunked2 =
`The
ed
source`

const multilineSource3 =
`Lorem ipsum dolor sit amet,
consectetur adipiscing elit.
Suspendisse accumsan erat diam,
sit amet blandit dui rhoncus non.

Suspendisse potenti.
Pellentesque a est tincidunt,
sagittis lorem at, tempus sapien.`

const chunks3 = ['amet,\nconsectetur', 'accumsan erat', 'Suspendisse potenti.\nPellentesque a est tincidunt,']

const multilineUnchunked3 =
`Lorem ipsum dolor sit
adipiscing elit.
Suspendisse diam,
sit amet blandit dui rhoncus non.

sagittis lorem at, tempus sapien.`

describe ('Remove Chunk function tests.', () => {
  describe ('With string parameter.', () => {
    it (`Should return '' if source is empty`, () => {
      expect(removeChunk('', '')).toBe('')
      expect(removeChunk('', 'aaa')).toBe('')
    })
  
    it (`Should return source if chunk is empty`, () => {
      expect(removeChunk('source', '')).toBe('source')
    })
  
    it (`Should return source if chunk is not in source`, () => {
      expect(removeChunk('source', 'not here')).toBe('source')
    })
  
    it (`Should return source if chunk is empty`, () => {
      expect(removeChunk('source', 'chunk')).toBe('source')
    })
  
    it (`Should return unchunked source`, () => {
      expect(removeChunk('source with a chunk and more', 'chunk')).toBe('source with a and more')
    })
  
    it (`Should return unchunked multiline source`, () => {
      expect(removeChunk(multilineSource, 'chunk')).toBe(multilineUnchunked1)
    })
  
    it (`Should return unchunked multiline source with multiline chunk`, () => {
      expect(removeChunk(multilineSource, multilineChunk)).toBe(multilineUnchunked2)
    })
  
    it ('Should remove multiple line ends from the result.', () => {
      expect(removeChunk('first line\n\n\nsecond line\n\n\nthird line', 'third line'))
        .toBe('first line\n\nsecond line')
    })
  })

  describe ('With array of strings parameter.', () => {
    it ('Should return empty if source is empty.', () => {
      expect(removeChunk('', [])).toBe('')
    })

    it ('Should return source if array is empty or filled with ampty strings.', () => {
      expect(removeChunk('source\n', [])).toBe('source\n')
      expect(removeChunk('source\n', ['', ''])).toBe('source\n')
    })

    it ('Should return unchunked single line source.', () => {
      expect(removeChunk('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', ['ipsum', 'elit']))
        .toBe('Lorem dolor sit amet, consectetur adipiscing.')
    })

    it ('Should return unchunked multiple lines source.', () => {
      expect(removeChunk('Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.', ['ipsum', 'elit']))
        .toBe('Lorem dolor sit amet,\nconsectetur adipiscing.')
    })

    it ('Should return unchunked multiple lines source, with multiline chunks.', () => {
      expect(removeChunk(multilineSource3, chunks3)).toBe(multilineUnchunked3)
    })
  })
})
