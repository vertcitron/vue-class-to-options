import removeChunk from './removeChunk'

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
`The ed
source`

describe ('Remove Chunk function tests.', () => {
  it (`Should return '' if source is empty`, () => {
    expect(removeChunk('', '')).toBe('')
    expect(removeChunk('', 'aaa')).toBe('')
  })

  it (`Should return source if chunk is empty`, () => {
    expect(removeChunk('source', '')).toBe('source')
  })

  it (`Should return source if chunk is not in source`, () => {
    expect(removeChunk('source', '')).toBe('source')
  })

  it (`Should return source if chunk is empty`, () => {
    expect(removeChunk('source', 'chunk')).toBe('source')
  })

  it (`Should return unchunked source`, () => {
    expect(removeChunk('source with a chunk and more', 'chunk')).toBe('source with a  and more')
  })

  it (`Should return unchunked multiline source`, () => {
    expect(removeChunk(multilineSource, 'chunk')).toBe(multilineUnchunked1)
  })

  it (`Should return unchunked multiline source with multiline chunk`, () => {
    expect(removeChunk(multilineSource, multilineChunk)).toBe(multilineUnchunked2)
  })
})
