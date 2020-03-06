import general from '../../src/extractors/general'

const source =
`<script>
  export default class Name extends Vue {
    @Prop (Number) index: number | undefined

    get user () {
      return
    }
  }
</script>`

const output =
`@Prop (Number) index: number | undefined

get user () {
  return
}`

describe ('general.spec unit tests.', () => {
  it ('Should return empty if nothing given.', () => {
    expect(general('')).toStrictEqual({ inner: '', name: '', attrs: '', semi: false })
    expect(general('\n  \n')).toStrictEqual({ inner: '', name: '', attrs: '', semi: false })
  })

  it ('Should return the good name in different conditions .', () => {
    expect(general('class Name extends Vue').name).toBe('Name')
    expect(general('class\n\n  Name   \n extends Vue').name).toBe('Name')
    expect(general('class extends Vue').name).toBe('')
  })

  it ('Should return the good attributes in different conditions .', () => {
    expect(general('class Name extends Vue').attrs).toBe('')
    expect(general('<script>\n</script>').attrs).toBe('')
    expect(general('<script lang="ts" src="aaa.ts">\n</script>').attrs).toBe('lang="ts" src="aaa.ts"')
    expect(general('<script\n  lang="ts"\n  src="aaa.ts"\n>\n</script>').attrs).toBe('lang="ts" src="aaa.ts"')
  })

  it ('Should return the good inner in different conditions .', () => {
    expect(general('<script></script>').inner).toBe('')
    expect(general('<script>\ncontent</script>').inner).toBe('')
    expect(general('export default class Name extends Vue {}').inner).toBe('')
    expect(general('export default class Name extends Vue {content}').inner).toBe('content')
    expect(general('export default class Name extends Vue {\n  content \n   line2}').inner).toBe('content\n line2')
    expect(general(source).inner).toBe(output)
  })

  it ('Should return the good semi flag.', () => {
    expect(general('').semi).toBeFalsy()
    expect(general('<script>\ncontent</script>').semi).toBeFalsy()
    expect(general('<script>\ncontent;</script>').semi).toBeTruthy()
    expect(general('<script>\ncontent\n</script>').semi).toBeFalsy()
    expect(general('<script>\ncontent;\n</script>').semi).toBeTruthy()
    expect(general('<script>\ncontent\ncontent;\n</script>').semi).toBeTruthy()
    expect(general(source).semi).toBeFalsy()
    const source2 = source.replace('return', 'return;')
  })
})
