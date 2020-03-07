import computed from '../../src/extractors/computedProperties'

const source =
`protected prop: string

get user(): User {
  return this.$store.getters['auth/user']
}

clickHandle (): ClickEvent {
  this.$emit('Click', this.id)
}

get isLogged(): boolean {
  return this.$store.getters['auth/connected']
}`

const chunkOutput = [
  `get user(): User {\n  return this.$store.getters['auth/user']\n}`,
  `get isLogged(): boolean {\n  return this.$store.getters['auth/connected']\n}`
]

const blockOutput =
`computed: {
  user(): User {
    return this.$store.getters['auth/user']
  },
  isLogged(): boolean {
    return this.$store.getters['auth/connected']
  }
}`

describe ('Computed extractor chunks output tests.', () => {
  it ('Should return empty array on empty string.', () => {
    expect(computed('').chunks).toStrictEqual([])
  })

  it ('Should return empty array on non-significant string.', () => {
    expect(computed('\n  \n ').chunks).toStrictEqual([])
  })

  it ('Should return empty array on single non-getter content.', () => {
    expect(computed('non-getter content ').chunks).toStrictEqual([])
  })

  it ('Should return empty array on multiple non-getter content.', () => {
    expect(computed('non-getter content\n other non-getter').chunks).toStrictEqual([])
  })

  it ('Should return an array entry on singlel ine getter content.', () => {
    expect(computed('get getter() {}').chunks).toStrictEqual(['get getter() {}'])
  })

  it ('Should return an array entry on multi line getter content.', () => {
    expect(computed('  get getter () {\n    return\n  }\n').chunks)
      .toStrictEqual(['  get getter () {\n    return\n  }'])
  })

  it ('Should return two array entries on multiple getters.', () => {
    expect(computed('get getter1() {}\nget getter2() {}').chunks)
      .toStrictEqual(['get getter1() {}', 'get getter2() {}'])
  })

  it ('Should return two array entries on multiple multilined getters.', () => {
    expect(computed('get getter1() {\n  return output1\n}\nget getter2() {\n  return output2\n}').chunks)
      .toStrictEqual(['get getter1() {\n  return output1\n}', 'get getter2() {\n  return output2\n}'])
  })

  it ('Real case test.', () => {
    expect(computed(source).chunks).toStrictEqual(chunkOutput)
  })
})

describe ('Computed extractor block output tests.', () => {
  it ('Should return empty array on empty string.', () => {
    expect(computed('').block).toStrictEqual('')
  })

  it ('Should return empty array on non-significant string.', () => {
    expect(computed('\n  \n ').block).toStrictEqual('')
  })

  it ('Should return empty array on single non-getter content.', () => {
    expect(computed('non-getter content ').block).toStrictEqual('')
  })

  it ('Should return empty array on multiple non-getter content.', () => {
    expect(computed('non-getter content\n other non-getter').block).toStrictEqual('')
  })

  it ('Should return an array entry on singlel ine getter content.', () => {
    expect(computed('get getter() {}').block).toStrictEqual('computed: {\n  getter() {}\n}')
  })

  it ('Should return an array entry on multi line getter content.', () => {
    expect(computed('  get getter () {\n    return\n  }\n').block)
      .toStrictEqual('computed: {\n  getter () {\n      return\n    }\n}')
  })

  it ('Should return two array entries on multiple getters.', () => {
    expect(computed('get getter1() {}\nget getter2() {}').block)
      .toStrictEqual('computed: {\n  getter1() {},\n  getter2() {}\n}')
  })

  it ('Should return two array entries on multiple multilined getters.', () => {
    expect(computed('get getter1() {\n  return output1\n}\nget getter2() {\n  return output2\n}').block)
      .toStrictEqual('computed: {\n  getter1() {\n    return output1\n  },\n  getter2() {\n    return output2\n  }\n}')
  })

  it ('Real case test.', () => {
    expect(computed(source).block).toStrictEqual(blockOutput)
  })

  describe ('Computed extractor block output with header options.', () => {
    it ('Should return empty with empty source and empty options.', () => {
      expect(computed('', {}).block).toStrictEqual('')
    })

    it ('Should return empty with empty source and no computed option.', () => {
      expect(computed('', { opt: 'lorem' }).block).toStrictEqual('')
    })

    it ('Should return option with empty source and computed option.', () => {
      expect(computed('', { computed: 'lorem' }).block).toBe('computed: {\n  lorem\n}')
    })

    it ('Should return option with empty source and computed option.', () => {
      expect(computed('', { computed: "{\n  ...mapGetters({\n    isMobile: 'breakpoint/isMobile'\n  })\n}" }).block)
        .toBe("computed: {\n  ...mapGetters({\n    isMobile: 'breakpoint/isMobile'\n  })\n}")
    })
  })
})
