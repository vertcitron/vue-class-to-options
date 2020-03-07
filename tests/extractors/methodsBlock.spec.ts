import methodsBlock from '../../src/extractors/methodsBlock'

const oneMethod =
`helloWorld () {
  return 'Hello World!'
}`

const twoMethods =
`helloWorld () {
  return 'Hello World!'
}

helloName (name: string) {
  return 'Hello ' + name + '!'
}`

const oneMethodAndData =
`helloWorld () {
  return 'Hello World!'
}

property: string = 'aaa'`

const oneMethodAndGetter =
`helloWorld () {
  return 'Hello World!'
}

get user (): UserInfo {
  return this.$store.getters['auth/user']
}`

const oneMethodBlock =
`methods: {
  helloWorld () {
    return 'Hello World!'
  }
}`

const twoMethodsBlock =
`methods: {
  helloWorld () {
    return 'Hello World!'
  },
  helloName (name: string) {
    return 'Hello ' + name + '!'
  }
}`

describe ('Methods extractor test suite.', () => {
  describe ('Chunks tests.', () => {
    it('Should return no chunks if source is empty', () => {
      expect(methodsBlock('').chunks).toStrictEqual([])
    })

    it('Should return no chunks if source is spacy', () => {
      expect(methodsBlock('\n\n  \n').chunks).toStrictEqual([])
    })

    it('Should return no chunks if source has no methods', () => {
      expect(methodsBlock('aaa\nbbb\n  {\n    ccc\n  }\n').chunks).toStrictEqual([])
    })

    it('Should return one chunk if source has one method', () => {
      expect(methodsBlock(oneMethod).chunks)
        .toStrictEqual([`helloWorld () {\n  return 'Hello World!'\n}`])
    })

    it('Should return one chunk if source has one method and some data', () => {
      expect(methodsBlock(oneMethodAndData).chunks)
        .toStrictEqual([`helloWorld () {\n  return 'Hello World!'\n}`])
    })

    it('Should return two chunks if source has two methods', () => {
      expect(methodsBlock(twoMethods).chunks).toStrictEqual([
          `helloWorld () {\n  return 'Hello World!'\n}`,
          `helloName (name: string) {\n  return 'Hello ' + name + '!'\n}`
        ])
    })

    it('Should return one chunk if source has one method and a getter', () => {
      expect(methodsBlock(oneMethodAndGetter).chunks)
        .toStrictEqual([`helloWorld () {\n  return 'Hello World!'\n}`])
    })
  })

  describe ('Block tests.', () => {
    it('Should return empty block if source is empty', () => {
      expect(methodsBlock('').block).toBe('')
    })

    it('Should return no chunks if source is spacy', () => {
      expect(methodsBlock('\n\n  \n').block).toBe('')
    })

    it('Should return no chunks if source has no methods', () => {
      expect(methodsBlock('aaa\nbbb\n  {\n    ccc\n  }\n').block).toBe('')
    })

    it('Should return one chunk if source has one method', () => {
      expect(methodsBlock(oneMethod).block).toBe(oneMethodBlock)
    })

    it('Should return one chunk if source has one method and data', () => {
      expect(methodsBlock(oneMethodAndData).block).toBe(oneMethodBlock)
    })

    it('Should return two chunks if source has two methods', () => {
      expect(methodsBlock(twoMethods).block).toBe(twoMethodsBlock)
    })

    it('Should return block with one method if source has one method and a getter', () => {
      expect(methodsBlock(oneMethodAndGetter).block).toBe(oneMethodBlock)
    })
  })
})
