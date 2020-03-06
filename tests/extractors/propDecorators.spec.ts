import props from '../../src/extractors/propDecorators'

const source =
`@Prop({ type: [Boolean, String], default: false }) isScrolled: boolean | string;

@Prop()
numberOfEntries: number;

@Prop(String) name: string

@Prop({ default: 'small' })
readonly size!: string;`

const chunks = [
  '@Prop({ type: [Boolean, String], default: false }) isScrolled: boolean | string;\n\n',
  '@Prop()\nnumberOfEntries: number;\n\n',
  '@Prop(String) name: string\n\n',
  "@Prop({ default: 'small' })\nreadonly size!: string;"
]

const block = 
`props: {
  isScrolled: { type: [Boolean, String] as PropType<boolean | string>, default: false },
  numberOfEntries // as PropType<number>,
  name: String as PropType<string>,
  size: { default: 'small' } // as PropType<string>
}`

describe ('Props extractor unit tests.', () => {
  it ('Should return empty if no prop given.', () => {
    expect(props('')).toStrictEqual({"block": "", "chunks": []})
    expect(props('\n  \n')).toStrictEqual({"block": "", "chunks": []})
    expect(props('\n  get trueish () { return true }\n')).toStrictEqual({"block": "", "chunks": []})
  })

  it('Tests cases for props raw extraction.', () => {
    expect(props('@Prop()').chunks).toStrictEqual(['@Prop()'])
    expect(props('@Prop() name').chunks).toStrictEqual(['@Prop() name'])
    expect(props('@Prop() name: type').chunks).toStrictEqual(['@Prop() name: type'])
    expect(props('@Prop() name1: type1\n@Prop() name2: type2').chunks)
      .toStrictEqual(['@Prop() name1: type1\n', '@Prop() name2: type2'])
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3').chunks)
      .toStrictEqual(['@Prop()\nname1\n', '@Prop() name2: type2\n\n', '@Prop()\nname3: type3'])
    expect(props(source).chunks).toStrictEqual(chunks)
  })

  it ('Tests cases for props transformed extraction.', () => {
    expect(props('@Prop()').block).toBe('')
    expect(props('@Prop() name').block).toBe('props: {\n  name\n}')
    expect(props('@Prop() name: type').block).toBe('props: {\n  name // as PropType<type>\n}')
    expect(props('@Prop() name1: type1\n@Prop() name2: type2\n}').block)
      .toBe('props: {\n  name1 // as PropType<type1>,\n  name2 // as PropType<type2>\n}')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3\n}').block)
      .toBe('props: {\n  name1,\n  name2 // as PropType<type2>,\n  name3 // as PropType<type3>\n}')
    expect(props(source).block).toBe(block)
  })
})
