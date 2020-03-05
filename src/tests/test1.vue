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
      Minicart
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

    handleClick() {
      this.$emit('button-clicked');
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .primary-header-right {
    position: absolute;
    right: 16px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .header__user {
    position: relative;
    display: flex;
    align-items: center;
    width: 32px;
    height: 100%;
    margin-right: 8px;
    background-color: transparent;
  }

  .minicart {

    &-wrapper {
      width: 32px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      height: 100%;
    }

    &-overlay {
      position: absolute;
      top: calc(50% + 26px);
      right: -12px;
      display: none;
    }
  }

  @include tablet-up {

    .minicart {

      &-wrapper {
        border-left: none;

        ::v-deep .icon-label {
          display: none;
        }
      }
    }
  }

  @include desktop-up {

    .primary-header-right {
      right: 32px;
      flex-flow: row nowrap;
    }

    .header__user {
      width: auto;
      margin-right: 24px;
    }

    .minicart-wrapper {
      width: auto;

      &.active:hover {

        .minicart-overlay {
          display: block;
        }
      }

      &.scrolled {
        height: 80px;
      }

      ::v-deep .icon-label {
        display: block;
      }

      ::v-deep .icon-link {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }
    }
  }
</style>
