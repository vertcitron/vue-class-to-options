export default `
<template>
  <div>{{msg}}</div>
</template>

@Component
<script>
  import Vue from 'vue'
  export default class ValidClassApi extends Vue {
    msg: string = 'Hello !'
  }
</script>
`.trim()
