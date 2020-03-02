import HeaderOptions from './HeaderOptions'

const emptyHeader =
`@Component
export default`

const basicHeader =
`@Component
  basic: 'something'
  content: {
    sub1: 'something',
    sub2: 'other thing'
  }
export default`

const basicHeaderRaw =
`basic: 'something'
content: {
  sub1: 'something',
  sub2: 'other thing'
}`

const basicOptions = {
  basic: 'something',
  content: `{
    sub1: 'something',
    sub2: 'other thing'
  }`
}

const structuredHeader =
`@Component
components: {
  Component1,
  Component2
}
export default`

describe ('HeaderOptions class.', () => {
  it ('Should return an empty raw if nothing under @Component.', () => {
    const header = new HeaderOptions(emptyHeader)
    expect(header.raw).toBe('')
  })

  it ('Should return basic content de-indented.', () => {
    const header = new HeaderOptions(basicHeader)
    expect(header.raw).toBe(basicHeaderRaw)
  })

  it ('Should return an empty options object if nothing under @Component.', () => {
    const header = new HeaderOptions(emptyHeader)
    expect(header.options).toStrictEqual({})
  })

  it ('Should return basic options from basic header.', () => {
    const header = new HeaderOptions(basicHeader)
    expect(header.options).toStrictEqual(basicOptions)
  })

  it ('Should return components from given header.', () => {
    const header = new HeaderOptions(structuredHeader)
    expect(header.components).toStrictEqual('{ Component1, Component2 }')
  })
})
