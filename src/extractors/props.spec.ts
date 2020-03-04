import props from './props'

const source =
`@Prop({ type: [Boolean, String], default: false }) isScrolled: boolean | string;

@Prop()
numberOfEntries: number;

@Prop(String) name: string

@Prop({ default: 'small' })
readonly size!: string;`

describe ('Props extractor unit tests.', () => {
  it ('Should return empty if no prop given.', () => {
    expect(props('')).toStrictEqual([])
    expect(props('\n  \n')).toStrictEqual([])
    expect(props('\n  get trueish () { return true }\n')).toStrictEqual([])
  })

  it('Tests cases for props raw extraction.', () => {
    expect(props('@Prop()')[0].raw).toBe('@Prop()')
    expect(props('@Prop() name')[0].raw).toBe('@Prop() name')
    expect(props('@Prop() name: type')[0].raw).toBe('@Prop() name: type')
    expect(props('@Prop() name1: type1\n@Prop() name2: type2')[0].raw).toBe('@Prop() name1: type1\n')
    expect(props('@Prop() name1: type1\n@Prop() name2: type2')[1].raw).toBe('@Prop() name2: type2')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[0].raw).toBe('@Prop()\nname1\n')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[1].raw).toBe('@Prop() name2: type2\n\n')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[2].raw).toBe('@Prop()\nname3: type3')
    expect(props(source).length).toBe(4)
    expect(props(source)[0].raw).toBe('@Prop({ type: [Boolean, String], default: false }) isScrolled: boolean | string;\n\n')
    expect(props(source)[1].raw).toBe('@Prop()\nnumberOfEntries: number;\n\n')
    expect(props(source)[2].raw).toBe("@Prop(String) name: string\n\n")
    expect(props(source)[3].raw).toBe("@Prop({ default: 'small' })\nreadonly size!: string;")
  })

  it ('Tests cases for props transformed extraction.', () => {
    expect(props('@Prop()')[0].line).toBe('')
    expect(props('@Prop() name')[0].line).toBe('name')
    expect(props('@Prop() name: type')[0].line).toBe('name // as PropType<type>')
    expect(props('@Prop() name1: type1\n@Prop() name2: type2')[0].line).toBe('name1 // as PropType<type1>')
    expect(props('@Prop() name1: type1\n@Prop() name2: type2')[1].line).toBe('name2 // as PropType<type2>')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[0].line).toBe('name1')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[1].line).toBe('name2 // as PropType<type2>')
    expect(props('@Prop()\nname1\n@Prop() name2: type2\n\n@Prop()\nname3: type3')[2].line).toBe('name3 // as PropType<type3>')
    expect(props(source)[0].line).toBe('isScrolled: { type: [Boolean, String] as PropType<boolean | string>, default: false }')
    expect(props(source)[1].line).toBe('numberOfEntries // as PropType<number>')
    expect(props(source)[2].line).toBe("name: String as PropType<string>")
    expect(props(source)[3].line).toBe("size: { default: 'small' } // as PropType<string>")
  })
})
