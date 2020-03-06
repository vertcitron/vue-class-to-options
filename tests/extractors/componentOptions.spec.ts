import componentOptions from '../../src/extractors/componentOptions'

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
  raw: `@Component({\n  prop: 'property'\n})\n`,
  components: '',
  options: { prop: 'property' }
}

const source2 =
`@Component({
  components: { Child },
  computed: {
    ...mapGetters(['auth/service'])
  }
})
export default`

const options2 = {
  raw: "@Component({\n  components: { Child },\n  computed: {\n    ...mapGetters(['auth/service'])\n  }\n})\n",
  components: '{ Child }',
  options: {
    computed: "{\n  ...mapGetters(['auth/service'])\n}"
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
  raw: "@Component({\n  components: {\n    Child1,\n    Child2\n  }\n})\n",
  components: '{ Child1, Child2 }',
  options: {}
}

describe ('Component Options extractor Tests.', () => {
  it ('Should return empty if source is empty.', () => {
    expect(componentOptions('')).toStrictEqual({ raw: '', components: '', options: {} })
    expect(componentOptions('\n  \n')).toStrictEqual({ raw: '', components: '', options: {} })
  })

  it ('Should return empty if @Component has no options.', () => {
    expect(componentOptions('@Componentexport default'))
      .toStrictEqual({ raw: '@Component', components: '', options: {} })
    expect(componentOptions('@Component\nexport default'))
      .toStrictEqual({ raw: '@Component\n', components: '', options: {} })
    expect(componentOptions('@Component({})\nexport default'))
      .toStrictEqual({ raw: '@Component({})\n', components: '', options: {} })
    expect(componentOptions(source0))
      .toStrictEqual({ raw: '@Component({\n})\n', components: '', options: {} })
  })

  it ('Should return raw text options if it exists.', () => {
    expect(componentOptions(source1)).toStrictEqual(options1)
    expect(componentOptions(source2)).toStrictEqual(options2)
    expect(componentOptions(source3)).toStrictEqual(options3)
  })
})
