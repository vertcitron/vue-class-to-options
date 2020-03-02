import { mockProcessExit, mockConsoleLog } from 'jest-mock-process'
import Component from './Component'
import Script from './Script'

import noClassApi from '../tests/component/noClasApi'
import validClassApi from '../tests/component/ValidClassApi'

const basicSource = 
`<template>
  <div>Before the script part</div>
</template>

<script lang='ts'>
  import Vue from 'vue'
  @Component
  export default class TestComponent extends Vue {}
</script>

<style lang="scss" scoped></style>
`

const basicBeforeExpected = 
`<template>
  <div>Before the script part</div>
</template>`

const basicScriptExpected = 
`import Vue from 'vue'
@Component
export default class TestComponent extends Vue {}`

const basicAfterExpected = 
`<style lang="scss" scoped></style>`

describe ('Component class', () => {
  beforeEach(() => {
    mockConsoleLog()
  })

  afterEach(() => {
    mockConsoleLog().mockRestore()
  })
  
  it ('Should exit if content is empty.', () => {
    const mockExit = mockProcessExit()
    const component = new Component('')
    expect(mockExit).toHaveBeenCalledWith(1)
    mockExit.mockRestore()
  })

  it ('Should exit if not a vue class API component with decorators.', () => {
    const mockExit = mockProcessExit()
    const component = new Component(noClassApi)
    expect(mockExit).toHaveBeenCalledWith(1)
    mockExit.mockRestore()
  })

  it ('Should return raw content if it\'s a Vue class API component', () => {
    const component = new Component(validClassApi)
    expect(component.content).toBe(validClassApi)
  })

  it ('Should return the text before the script part.', () => {
    const component = new Component(basicSource)
    expect(component.before).toBe(basicBeforeExpected)
  })

  it ('Should return the script part.', () => {
    const component = new Component(basicSource)
    expect(component.script instanceof Script).toBeTruthy()
  })

  it ('Should return the text after the script part.', () => {
    const component = new Component(basicSource)
    expect(component.after).toBe(basicAfterExpected)
  })
})
