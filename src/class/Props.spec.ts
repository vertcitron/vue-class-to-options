import Props from './Props'

const noPropsComponent =
`@Component
export default class NoPropComponent extends Vue {
  myMethod () {
    return true
  }
}`

const propsComponent =
`@Component
export default class NoPropComponent extends Vue {
  @Prop(Number) readonly propA: number
  @Prop([String, Boolean]) readonly propB: string | boolean | undefined
  @Prop({
    type: Array,
    default: []
  }) readonly propC!: any[]
  myMethod () {
    return true
  }
}`

const propsBlock =
`propA: { type: Number as PropType<number>, required: true },
propB: { type: [String, Boolean] as PropType<string | boolean | undefined>, required: true },
propC: { type: Array as PropType<any[]>, default: [] }`

describe ('Props class.', () => {
  it ('Should return an empty array if empty component given.', () => {
    const props = new Props('')
    expect(props.raw).toStrictEqual([])
  })

  it ('Should return an empty array if component with no prop given.', () => {
    const props = new Props(noPropsComponent)
    expect(props.raw).toStrictEqual([])
  })

  it ('Should return the props names by index, empty if prop no exists.', () => {
    const props = new Props(propsComponent)
    expect(props.name(0)).toBe('propA')
    expect(props.name(1)).toBe('propB')
    expect(props.name(2)).toBe('propC')
    expect(props.name(3)).toBe('')
  })

  it ('Should return the prop vue type by index, empty if not set.', () => {
    const props = new Props(propsComponent)
    expect(props.vueType(0)).toBe('Number')
    expect(props.vueType(1)).toBe('[String, Boolean]')
    expect(props.vueType(2)).toBe('Array')
    expect(props.vueType(3)).toBe('')
  })

  it ('Should return the TS types by index, empty if not set.', () => {
    const props = new Props(propsComponent)
    expect(props.tsType(0)).toBe('number')
    expect(props.tsType(1)).toBe('string | boolean | undefined')
    expect(props.tsType(2)).toBe('any[]')
    expect(props.tsType(3)).toBe('')
  })

  it ('Should return the type string by index, emty if not set.', () => {
    const props = new Props(propsComponent)
    expect(props.type(0)).toBe('type: Number as PropType<number>')
    expect(props.type(1)).toBe('type: [String, Boolean] as PropType<string | boolean | undefined>')
    expect(props.type(2)).toBe('type: Array as PropType<any[]>')
    expect(props.type(3)).toBe('')
  })

  it ('Should return the required or default string by index, emty if not set.', () => {
    const props = new Props(propsComponent)
    expect(props.default(0)).toBe('required: true')
    expect(props.default(1)).toBe('required: true')
    expect(props.default(2)).toBe('default: []')
    expect(props.default(3)).toBe('')
  })

  it ('Should return the proper propsBlock.', () => {
    const props = new Props(propsComponent)
    expect(props.propsString).toBe(propsBlock)
  })
})
