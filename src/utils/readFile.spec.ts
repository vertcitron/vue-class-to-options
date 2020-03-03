import readFile from './readFile'
import { readFileSync } from 'fs'

describe('readFile tests.', () => {
  it ('Should return an empty string if file does not exist.', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    expect(readFile('nonExistingFile.vue')).toBe('')
    logSpy.mockRestore()
  })

  it ('Should return the file content if the file exists', () => {
    expect(readFile('src/tests/file/basicFile.vue')).toBe('basic content')
  })
})
