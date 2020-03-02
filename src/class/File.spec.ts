import { mockProcessExit, mockConsoleLog } from 'jest-mock-process'
import mock from 'mock-fs'
import File from './File'
import { readFileSync } from 'fs'

describe ('File class test', () => {
  
  beforeEach(() => {
    mockConsoleLog()
  })

  afterEach(() => {
    mockConsoleLog().mockRestore()
    mockProcessExit().mockRestore()
  })

  it('Should exit process if path is empty.', () => {
    const mockExit = mockProcessExit()
    const file = new File('')
    expect(mockExit).toHaveBeenCalledWith(1)
    })

  it('Should exit process if path has not .vue extension.', () => {
    const mockExit = mockProcessExit()
    const file = new File('file.ts')
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it('Should exit with a non existing file.', () => {
    const mockExit = mockProcessExit()
    const file = new File('nonExistingFile.vue')
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it('Should return the given file content if it exists', () => {
    const mockExit = mockProcessExit()
    const file = new File('./src/tests/file/basicFile.vue')
    expect(file.content).toBe('basic content')
  })

  it('Should return a multiline file.', () => {
    const path = './src/tests/file/multiline.vue'
    const file = new File(path)
    const expected = readFileSync(path, 'utf-8')
    expect(file.content).toBe(expected)
  })
})
