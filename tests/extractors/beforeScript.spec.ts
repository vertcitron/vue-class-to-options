import beforeScript from '../../src/extractors/beforeScript'

const emtyishSource =
`
    
<script>
</script>`

const validSource =
`<template>
  <div></div>
</template>

<script>
</script>`

const validResult =
`<template>
  <div></div>
</template>`

const scriptedSource =
`<template>
  <div></div>
  <script></script>
</template>

<script>
</script>`

const scriptedResult =
`<template>
  <div></div>
  <script></script>
</template>`


describe ('Before script extractor tests.', () => {
  it ('Should return empty string if source is empty.', () => {
    expect(beforeScript('')).toBe('')
    expect(beforeScript('\n   \n')).toBe('')
  })

  it ('Should return empty string if nothing before <script>.', () => {
    expect(beforeScript('<script></script>')).toBe('')
    expect(beforeScript(emtyishSource)).toBe('')
  })

  it ("Should return what's before <script>.", () => {
    expect(beforeScript('before<script></script>')).toBe('before')
    expect(beforeScript(validSource)).toBe(validResult)
  })

  it ('Should not stop at first <script> if enclosed in <template>.', () => {
    expect(beforeScript(scriptedSource)).toBe(scriptedResult)
  })
})
