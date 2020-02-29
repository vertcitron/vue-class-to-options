import getBlock from './getBlock'

test ('Return nothing on empty string.', () => {
  expect(getBlock('')).toBe('')
})

test ('Return only the content of the block.', () => {
  expect(getBlock('aaa {bbb } ccc')).toBe('bbb ')
})

test ('Return the block when multiline.', () => {
  const source = `
    aaa,
    bbb: {
      ccc,
      ddd
    },
    eee`
  expect(getBlock(source)).toBe(`
      ccc,
      ddd
    `)
})

test ('Return the block with nested blocks', () => {
  const source = 'aaa: { bbb: { ccc, ddd: { eee }}}, ccc'
  const expected = ' bbb: { ccc, ddd: { eee }}'
  expect(getBlock(source)).toBe(expected)
})

test ('Should return nothing with wrong blocks pairing.', () => {
  let source = 'aaa: { bbb: { ccc, ddd: { eee }}, ccc'
  expect(getBlock(source)).toBe('')
  source = 'aaa, bbb, ccc } ddd'
  expect(getBlock(source)).toBe('')
})

test ('Should return the inner block with nested blocks.', () => {
  let source = 'const aaa = { bbb: { ccc };};'
  const outer = getBlock(source)
  expect(outer).toBe(' bbb: { ccc };')
  expect(getBlock(outer)).toBe(' ccc ')
})

test ('Test with another openers / closers', () => {
  expect(getBlock('aaa ^bbb^ccc$$ ddd', '^', '$')).toBe('bbb^ccc$')
})