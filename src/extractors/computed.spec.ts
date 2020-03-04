import computed from './computed'

const source =
``

const output =
``

describe ('Computed extractor raws output tests.', () => {
  it ('Should return empty array on empty string.', () => {
    expect(computed('').raws).toStrictEqual([])
  })

  it ('Should return empty array on non-significant string.', () => {
    expect(computed('\n  \n ').raws).toStrictEqual([])
  })

  it ('Should return empty array on single non-getter content.', () => {
    expect(computed('non-getter content ').raws).toStrictEqual([])
  })
})
