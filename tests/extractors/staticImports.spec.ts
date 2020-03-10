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

const validStatics = {
  block: `import Vue, { PropType } from 'vue'

  const CONST = 0`,
  chunk: `  import Vue from 'vue'

  const CONST = 0`
}

const emptyBlock = `import Vue, { PropType } from 'vue'\n`

describe ('Static and Imports extractor Tests.', () => {
  it ('Should return empty if source is empty.', () => {
    expect(staticImports('')).toStrictEqual({ block: emptyBlock, chunk: '' })
    expect(staticImports('\n  \n')).toStrictEqual({ block: emptyBlock, chunk: '' })
  })

  it ('Should return empty there are not imports and statics.', () => {
    expect(staticImports('<script>@Component</script>'))
      .toStrictEqual({ block: emptyBlock, chunk: '' })
    expect(staticImports(emptySource)).toStrictEqual({ block: emptyBlock, chunk: '' })
  })

  it ("Should return statics and imports as they're given.", () => {
    expect(staticImports('<script>imports@Component</script>'))
      .toStrictEqual({ block: emptyBlock + 'imports', chunk: 'imports' })
    expect(staticImports(validSource)).toStrictEqual(validStatics)
  })
})
