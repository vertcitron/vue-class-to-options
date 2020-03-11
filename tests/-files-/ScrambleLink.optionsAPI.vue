<template>
  <span
    v-if="bool"
    :data-href="getScrambled()"
    :data-test-id="dataTestId"
  >
    <slot />
  </span>
  <a
    v-else-if="isExternalLink()"
    :href="dataHref"
    :target="target ? target : undefined"
    :data-test-id="dataTestId"
  >
    <slot />
  </a>
  <router-link
    v-else-if="hasLink()"
    :to="dataHref"
    :data-test-id="dataTestId"
  >
    <slot />
  </router-link>
  <span
    v-else
    :data-test-id="dataTestId"
  >
    <slot />
  </span>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { Location as RouterLocation } from 'vue-router';
  import { routeExist } from '@/router/constants';

  interface ScrambleLinkModel {
    regex: RegExp
    obfuscation: string
    externalLinkFlag: string
    bool: boolean
  }

  export default Vue.extend ({
    name: 'ScrambleLink',

    props: {
      dataHref, // as PropType<undefined | string | RouterLocation>,
      target, // as PropType<undefined | string>,
      scramble: { type: Boolean as PropType<boolean>, default: true },
      dataTestId: {   type: String as PropType<string | null>,   default: null }
    },

    data: (): ScrambleLinkModel => ({
      regex: /\//g,
      obfuscation: '||',
      externalLinkFlag: 'http',
      bool: this.scramble
    }),

    methods: {
      getScrambled() {
        if (this.dataHref && (this.dataHref as string).replace) {
          return (this.dataHref as string).replace(this.regex, this.obfuscation);
        }
        // TODO : handle RouterLocation case
        return this.dataHref;
      },
      isExternalLink() {
        if (this.dataHref && (this.dataHref as string).includes) {
          return (
            (this.dataHref as string).includes(this.externalLinkFlag)
            || !this.hasRoute(this.dataHref as string)
          );
        }
        return false;
      },
      hasRoute(dataHref: string) {
        // Here we check if the resolved route exists.
        // If not, an external link is forced, in order to go to the legacy site.
        const to = this.$router.resolve(dataHref);

        if (to && to.resolved && to.resolved.name) {
          return routeExist(to.resolved.name);
        }

        return false;
      },
      hasLink() {
        return this.dataHref && this.dataHref !== '' && this.dataHref !== {};
      }
    }

    /****************** UNPROCESSED LINES FROM ORIGINAL COMPONENT: ******************

      mounted() {
        this.bool = false;
      }

     ********************************************************************************/
  });
</script>
