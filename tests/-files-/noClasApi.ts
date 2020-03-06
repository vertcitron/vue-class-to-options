export default `
<template>
  <div>{{msg}}</div>
</template>
<script>
  export default {
    name: 'NoClassApi',
    data: () => ({ msg: 'Hello !' })
  }
</script>
`.trim()
