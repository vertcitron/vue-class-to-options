<template>
  <div class="example"></div>
</template>

<script>
  import Vue from 'vue'

  @Component
    components: {
      ChildComponent1,
      ChildComponent2
    },
    computed: {
      ...mapGetters([
        'module1/getter1',
        'module2/getter2'
      ]),
      comp1 () {
        return 0
      }
    }
  export default class TestComponent extends Vue {}
</script>

<style lang="scss" scoped>
  .example {
    color: yellow;
  }
</style>
