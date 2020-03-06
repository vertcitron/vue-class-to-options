import staticImports from '../../src/extractors/staticImports'

const emptySource =
`<script>
  @Component
</script>`

const validSource =
`<script>
  import Vue from 'vue'

  const CONST = 0

  @Component
</script>`

const validStatics =
`import Vue from 'vue'

  const CONST = 0`

describe ('Static and Imports extractor Tests.', () => {
  it ('Should return empty if source is empty.', () => {
    expect(staticImports('')).toBe('')
    expect(staticImports('\n  \n')).toBe('')
  })

  it ('Should return empty there are not imports and statics.', () => {
    expect(staticImports('<script>@Component</script>')).toBe('')
    expect(staticImports(emptySource)).toBe('\n  ')
  })

  it ("Should return statics and imports as they're given.", () => {
    expect(staticImports('<script>imports@Component</script>')).toBe('imports')
    expect(staticImports(validSource).trim()).toBe(validStatics)
  })
})
