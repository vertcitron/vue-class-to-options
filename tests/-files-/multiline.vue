<template>
  <div class="component">
    {{ message }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Multiline'
  })
</script>

<style lang="scss" scoped>
  .component {
    font-size: &rem;
  }
</style>
