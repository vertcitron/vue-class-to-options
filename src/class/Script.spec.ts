import Script from './Script'
import HeaderOptions from './HeaderOptions'

const multilinedSource =
`<template>
</template>

<script>
  import Vue from 'vue'
  @Component
  export default class TestComponent extends Vue {}
</script>

<style></style>`

const multilinedRaw =
`import Vue from 'vue'
@Component
export default class TestComponent extends Vue {}`

describe ('Script class', () => {
  it ('Should give an empty raw if source has no script tag.', () => {
    const script = new Script('<template></template> <style></style>')
    expect(script.raw).toBe('')
  })

  it ('Should give the inner script if source has a script tag.', () => {
    const script = new Script('<template></template> <script>inner</script> <style></style>')
    expect(script.raw).toBe('inner')
  })

  it ('Should give the inner script if source has a script tag, multilined.', () => {
    const script = new Script(multilinedSource)
    expect(script.raw).toBe(multilinedRaw)
  })

  it ('Should return the component name.', () => {
    const script = new Script(multilinedSource)
    expect(script.name).toBe('TestComponent')
  })

  it ('Should return a HeaderOptions object.', () => {
    const script = new Script(multilinedSource)
    expect(script.headerOptions instanceof HeaderOptions).toBeTruthy()
  })
})
