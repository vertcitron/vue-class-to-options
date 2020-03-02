<template>
  <div class="component">
    {{ message }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Comp1 from '@/components/Comp1'
  import Comp2 from '@/components/Comp2'

  const MYCONST = 'aaa'

  @Component
  components: {
    Comp1,
    Comp2
  }
  export default class Test1Component extends Vue {
    @Prop({ type: String, default: ''}) readonly message: string
    @Prop(Array) readonly list: string[]
    @Prop({ type: [Object, String], default: {}}) readonly myProp: MyInterface | string
    @Prop(Boolean) readonly test: boolean
  }
</script>

<style>
  .component {
    font-size: 14px;
  }
</style>
