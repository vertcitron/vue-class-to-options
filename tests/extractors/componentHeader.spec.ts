import componentOptions from '../../src/extractors/componentHeader'

const source0 =
`@Component({
})
export default`

const source1 =
`@Component({
  prop: 'property'
})
export default`

const options1 = {
  chunks: [`@Component({\n  prop: 'property'\n})\n`],
  components: '',
  options: { prop: 'property' }
}

const source2 =
`@Component({
  components: { Child },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isLogged: 'auth/logged'
    })
  }
})
export default

protected user: UserObject
protected isLogged: boolean`

const options2 = {
  chunks: [
    "@Component({\n  components: { Child },\n  computed: {\n    ...mapGetters({\n      user: 'auth/user',\n      isLogged: 'auth/logged'\n    })\n  }\n})\n",
    'protected user: UserObject',
    'protected isLogged: boolean'
  ],
  components: '{ Child }',
  options: {
    computed: "{\n  user (): UserObject {\n    return this.$store.getters['auth/user']\n  },\n  isLogged (): boolean {\n    return this.$store.getters['auth/logged']\n  }\n}"
  }
}

const source3 =
`@Component({
  components: {
    Child1,
    Child2
  }
})
export default`

const options3 = {
  chunks: ["@Component({\n  components: {\n    Child1,\n    Child2\n  }\n})\n"],
  components: '{ Child1, Child2 }',
  options: {}
}

describe ('Component Options extractor Tests.', () => {
  it ('Should return empty if source is empty.', () => {
    expect(componentOptions('')).toStrictEqual({ chunks: [], components: '', options: {} })
  })

  it ('Should return empty if source is spacy.', () => {
    expect(componentOptions('\n  \n')).toStrictEqual({ chunks: [], components: '', options: {} })
  })

  it ('Should return empty if @Component has no options at all.', () => {
    expect(componentOptions('@Componentexport default'))
      .toStrictEqual({ chunks: ['@Component'], components: '', options: {} })
  })

  it ('Should return empty if @Component has no options at all with line breaks.', () => {
    expect(componentOptions('@Component\nexport default'))
      .toStrictEqual({ chunks: ['@Component\n'], components: '', options: {} })
  })

  it ('Should return empty if @Component has empty content.', () => {
    expect(componentOptions('@Component({})\nexport default'))
      .toStrictEqual({ chunks: ['@Component({})\n'], components: '', options: {} })
  })

  it ('Should return empty if @Component has empty content with line breaks.', () => {
    expect(componentOptions(source0))
      .toStrictEqual({ chunks: ['@Component({\n})\n'], components: '', options: {} })
  })

  it ('Real test case #1.', () => {
    expect(componentOptions(source1)).toStrictEqual(options1)
  })

  it ('Real test case #2.', () => {
    expect(componentOptions(source2)).toStrictEqual(options2)
  })

  it ('Real test case #2.', () => {
    expect(componentOptions(source3)).toStrictEqual(options3)
  })
})
