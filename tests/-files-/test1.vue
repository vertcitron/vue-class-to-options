<template>
  <div class="component">
    {{ message }}
    <button @click="handleClick"></button>
    <script src="aaa"></script>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';
  import Minicart from '@/components/molecules/minicart/Minicart.vue';
  import UserInfo from '@/components/organisms/user-info/UserInfo.vue';()

  @Component({
    components: {
      UserInfo,
      Minicart,
      AAA
    },
    computed: {
      ...mapGetters({
        isMobile: 'breakpoint/isMobile',
        isTablet: 'breakpoint/isTablet'
      })
    },
    test: 'something',
    test2: ['aaa', 'bbb']
  })
  export default class MyComponent extends Vue {
    @Prop({ type: Boolean, default: false }) isScrolled: boolean;

    @Prop()
    numberOfEntries: number;

    @Prop({ default: 'small' })
    size: string;

    protected isTablet: boolean;
    protected isMobile: boolean;

    user: UserInfo = {};

    get componentSize(): string {
      if (this.isMobile) {
        return 'small';
      }
      if (this.isTablet) return 'medium';
      return 'full';
    }

    get isMinicartOverlayActive(): boolean {
      return !!this.numberOfCartEntries;
    }

    @Watch(watcher) {
      zko&zpix,&z
    }

    handleClick() {
      this.$emit('button-clicked');
    }
  }
</script>

<style lang="scss" scoped>
  .component {
    font-size: 14px;
  }
</style>
