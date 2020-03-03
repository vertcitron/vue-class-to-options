import script from './script'

const complexSource = `
<script lang="ts">
  export default class Source extends Vue {}
</script>

<style></style>`

const complexResult = 
`<script lang="ts">
  export default class Source extends Vue {}
</script>`

describe('Script extractor tests.', () => {
  it('Should return empty if source is empty.', () => {
    expect(script('')).toBe('')
    expect(script('\n  \n')).toBe('')
  })

  it('Should return empty if nothing before <script>.', () => {
    expect(script('<script></script>')).toBe('<script></script>')
    expect(script('\n  \n<script></script>')).toBe('<script></script>')
  })

  it('Should return single content <script>.', () => {
    expect(script('before<script></script>')).toBe('<script></script>')
  })

  it('Should return complex content <script>.', () => {
    expect(script(complexSource)).toBe(complexResult)
  })
})
