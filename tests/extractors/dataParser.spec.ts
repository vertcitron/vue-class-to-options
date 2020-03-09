import dataParser from '../../src/extractors/dataParser'

const noDataSource =
`@Prop({ type: String, default: null })
dataTestId: string | null;

getUserById (id: number): UserData {
  return this.$store.getters['auth/users](id)
}`

const complexSource =
`@Prop({ type: String, default: null })
dataTestId: string | null;

data1: string = 'my string';

data2: Object = {
  prop: {
    sub: 'sub-content'
  }
};

data3: string[] = [
  'aaa',
  'bbb',
  'ccc'
];

getUserById (id: number): UserData {
  return this.$store.getters['auth/users](id)
}

protected data4: number;`

const complexChunks = [
`data1: string = 'my string';`,
`data2: Object = {
  prop: {
    sub: 'sub-content'
  }
};`,
`data3: string[] = [
  'aaa',
  'bbb',
  'ccc'
];`
]

const complexIFace =
`interface MyComponentModel {
  data1: string
  data2: Object
  data3: string[]
}`

const complexBlock =
`data: (): MyComponentModel => ({
  data1: 'my string',
  data2: {
    prop: {
      sub: 'sub-content'
    }
  },
  data3: [
    'aaa',
    'bbb',
    'ccc'
  ]
})`

describe ('Component data parser.', () => {
  describe('data parser chunks extraction.', () => {
    it ('Should return empty chunk if source is empty.', () => {
      expect(dataParser('', 'MyComponent').chunks).toStrictEqual([])
    })

    it ('Should return empty chunk if source is non significant.', () => {
      expect(dataParser('non significant\ncontent\n', 'MyComponent').chunks).toStrictEqual([])
    })

    it ('Should return empty chunk if source has no data lines.', () => {
      expect(dataParser(noDataSource, 'MyComponent').chunks).toStrictEqual([])
    })

    it ('Should return one chunk when one data line is given.', () => {
      expect(dataParser(`data1: string = 'my string';`, 'MyComponent').chunks)
        .toStrictEqual([`data1: string = 'my string';`])
    })

    it ('Should return two chunks when two data lines are given.', () => {
      expect(dataParser(`data1: string = 'my string';\ndata2: Type = { prop: 'aaa' };`, 'MyComponent').chunks)
        .toStrictEqual([
          `data1: string = 'my string';`,
          `data2: Type = { prop: 'aaa' };`
        ])
    })

    it ('Should retain one chunk when one data line contains a non beginning get.', () => {
      expect(dataParser(`data1: string = 'get string',`, 'MyComponent').chunks)
        .toStrictEqual([`data1: string = 'get string',`])
    })

    it ('Complex chunk extraction.', () => {
      expect(dataParser(complexSource, 'MyComponent').chunks).toStrictEqual(complexChunks)
    })
  })

  describe ('Data parser interface extraction', () => {
    it ('Should return empty interface if source is empty.', () => {
      expect(dataParser('', 'MyComponent').interface).toBe('')
    })

    it ('Should return empty chunk if source is non significant.', () => {
      expect(dataParser('non significant\ncontent\n', 'MyComponent').interface).toBe('')
    })

    it ('Should return empty chunk if source has no data lines.', () => {
      expect(dataParser(noDataSource, 'MyComponent').interface).toBe('')
    })

    it ('Should return one chunk when one data line is given.', () => {
      expect(dataParser(`data1: string = 'my string';`, 'MyComponent').interface)
        .toBe('interface MyComponentModel {\n  data1: string\n}')
    })

    it ('Should return two chunks when two data lines are given.', () => {
      expect(dataParser(`data1: string = 'my string';\ndata2: Type = { prop: 'aaa' };`, 'MyComponent').interface)
      .toBe('interface MyComponentModel {\n  data1: string\n  data2: Type\n}')
    })

    it ('Should retain one chunk when one data line contains a non beginning get.', () => {
      expect(dataParser(`data1: string = 'get string',`, 'MyComponent').interface)
      .toBe('interface MyComponentModel {\n  data1: string\n}')
    })

    it ('Complex chunk extraction.', () => {
      expect(dataParser(complexSource, 'MyComponent').interface).toBe(complexIFace)
    })
  })

  describe ('Data parser block extraction', () => {
    it ('Should return empty block if source is empty.', () => {
      expect(dataParser('', 'MyComponent').block).toBe('')
    })

    it ('Should return empty chunk if source is non significant.', () => {
      expect(dataParser('non significant\ncontent\n', 'MyComponent').block).toBe('')
    })

    it ('Should return empty chunk if source has no data lines.', () => {
      expect(dataParser(noDataSource, 'MyComponent').block).toBe('')
    })

    it ('Should return one chunk when one data line is given.', () => {
      expect(dataParser(`data1: string = 'my string';`, 'MyComponent').block)
        .toBe(`data: (): MyComponentModel => ({\n  data1: 'my string'\n})`)
    })

    it ('Should return two chunks when two data lines are given.', () => {
      expect(dataParser(`data1: string = 'my string';\ndata2: Type = { prop: 'aaa' };`, 'MyComponent').block)
      .toBe(`data: (): MyComponentModel => ({\n  data1: 'my string',\n  data2: { prop: 'aaa' }\n})`)
    })

    it ('Should retain one chunk when one data line contains a non beginning get.', () => {
      expect(dataParser(`data1: string = 'get string',`, 'MyComponent').block)
      .toBe(`data: (): MyComponentModel => ({\n  data1: 'get string'\n})`)
    })

    it ('Complex chunk extraction.', () => {
      expect(dataParser(complexSource, 'MyComponent').block).toBe(complexBlock)
    })
  })
})
