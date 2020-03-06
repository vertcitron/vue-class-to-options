import isValidPath from '../../src/validators/isValidPath'

describe ('Path validator tests.', () => {
  let logSpy: jest.SpyInstance<void, [any?, ...any[]]>
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
    logSpy.mockRestore()
  })

  it ('Should return false on empty path', () => {
    expect(isValidPath('')).toBeFalsy()
  })

  it('Should return false on non .vue path.', () => {
    expect(isValidPath('myComponent.ts')).toBeFalsy()
    expect(isValidPath('myComponent.vue.ts')).toBeFalsy()
    expect(isValidPath('myComponentvue')).toBeFalsy()
  })
  it ('Should return false if file does not exist', () => {
    expect(isValidPath('nonExistingFile.vue')).toBeFalsy()
  })
  
  it ('Should return true if file ends with .vue and exists', () => {
    expect(isValidPath('tests/-files-/basicFile.vue')).toBeTruthy()
  })
})
