import getBlock from './getBlock'

test ('Return nothing on empty string.', () => {
  expect(getBlock('')).toBe('')
})

test ('Return only the content of the block.', () => {
  expect(getBlock('aaa {bbb} ccc')).toBe('{bbb}')
})

test ('Return the block when multiline.', () => {
  const source = `
    aaa,
    bbb: {
      ccc,
      ddd
    },
    eee`
  expect(getBlock(source)).toBe(`{
      ccc,
      ddd
    }`)
})

test ('Return the block with nested blocks', () => {
  const source = 'aaa: { bbb: { ccc, ddd: { eee }}}, ccc'
  const expected = '{ bbb: { ccc, ddd: { eee }}}'
  expect(getBlock(source)).toBe(expected)
})
