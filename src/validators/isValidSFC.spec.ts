import isValidSFC from './isValidSFC'

const complexValidSFC = `
<template>
  <div class="component">{{ message }}</div>
  <script src='aaa'></script>
</template>

<script lang="ts>
  import { Vue, Component, Prop } from 'vue-class-decorator'
  import Hello from './Hello'

  @Component({
    components: { Hello }
  })
  export default class ComplexValid extends Vue {
    @Prop(String) message: string | undefined
  }
</script>

<style>
  .component {
    font-size: 14px;
  }
</style>
`
describe('Class API SFC Validator.', () => {
  let logSpy: jest.SpyInstance<void, [any?, ...any[]]>
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
    logSpy.mockRestore()
  })

  it ('Should return false if source is empty.', () => {
    expect(isValidSFC('')).toBeFalsy()
    expect(logSpy).toHaveBeenCalled()
  })

  it ('Should return false if source does not contain a <script> tag.', () => {
    expect(isValidSFC('<template></template><style></style>')).toBeFalsy()
    expect(logSpy).toHaveBeenCalled()
  })

  it ('Should return false if source does not contain a @Component decorator.', () => {
    expect(isValidSFC('<script>export class TestComponent extends Vue {}</script>')).toBeFalsy()
    expect(logSpy).toHaveBeenCalled()
  })

  it ('Should return false if source does not contain a class extends Vue default export.', () => {
    expect(isValidSFC('<script>@Component</script>')).toBeFalsy()
    expect(logSpy).toHaveBeenCalled()
  })

  it ('Should return true if there is @Component, <script> and class default export.', () => {
    expect(isValidSFC('<script>@Component export default class TestComponent extends Vue {}</script>')).toBeTruthy()
  })

  it ('Should return true if valid complex SFC.', () => {
    expect(isValidSFC(complexValidSFC)).toBeTruthy()
  })
})
