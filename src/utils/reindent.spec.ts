import reIndent from './reIndent'

const chunkA0 = `{
  prop1: {
    subprop
  }
}`

const chunkA2 = `  {
    prop1: {
      subprop
    }
  }`

const chunkA4 = `    {
      prop1: {
        subprop
      }
    }`

const blank0 = `[
  first,
  
  second,
]`

const blank3 = `   [
     first,

     second,
   ]`

const trim2= `
  hello
  world
`

const trim3= `   hello
   world`

test ('Should return an empty string if given string is empty', () => {
  expect(reIndent('', 0)).toBe('')
  expect(reIndent('', 2)).toBe('')
})

test ('Should reindent 0 spaces to 4 spaces.', () => {
  expect(reIndent(chunkA0, 4)).toBe(chunkA4)
})

test ('Should reindent 4 spaces to 2 spaces.', () => {
  expect(reIndent(chunkA4, 2)).toBe(chunkA2)
})

test ('Should reduce blank lines to empty.', () => {
  expect(reIndent(blank0, 3)).toBe(blank3)
})

test ('Should trim heading and trailing line breaks', () => {
  expect(reIndent(trim2, 3)).toBe(trim3)
})