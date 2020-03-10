<template>
  <div class="component">
    {{ message }}
    <button @click="handleClick"></button>
    <script src="aaa"></script>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import Minicart from '@/components/molecules/minicart/Minicart.vue';
  import UserInfo from '@/components/organisms/user-info/UserInfo.vue';


  interface MyComponentModel {
    user: UserInfo
  }
  export default Vue.extend ({
    name: 'MyComponent',

    components: { UserInfo, Minicart },

    props: {
      isScrolled: { type: Boolean as PropType<boolean>, default: false },
      numberOfEntries, // as PropType<number>,
      size: { default: 'small' }, // as PropType<string>
    },

    computed: {
      isMobile (): number {
        return this.$store.getters['breakpoint/isMobile']
      },
      isTablet (): boolean {
        return this.$store.getters['breakpoint/isTablet']
      },
      componentSize(): string {
        if (this.isMobile) {
          return 'small';
        }
        if (this.isTablet) return 'medium';
        return 'full';
      },
      isMinicartOverlayActive(): boolean {
        return !!this.numberOfCartEntries;
      }
    },

    data: (): MyComponentModel => ({
      user: {}
    }),

    methods: {
      handleClick() {
        this.$emit('button-clicked');
      }
    }

    /****************** UNPROCESSED LINES FROM ORIGINAL COMPONENT: ******************

      @Watch(watcher) {
        zko&zpix,&z
      }

     ********************************************************************************/
  });
</script>

<style lang="scss" scoped>
  .component {
    font-size: 14px;
  }
</style>