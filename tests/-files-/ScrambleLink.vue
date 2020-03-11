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
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Location as RouterLocation } from 'vue-router';
  import { routeExist } from '@/router/constants';

  @Component
  export default class ScrambleLink extends Vue {
    @Prop() dataHref!: undefined | string | RouterLocation;

    @Prop() target!: undefined | string;

    @Prop({ type: Boolean, default: true }) scramble!: boolean;

    @Prop({
      type: String,
      default: null
    })
    dataTestId: string | null;

    regex: RegExp = /\//g;

    obfuscation: string = '||';

    externalLinkFlag: string = 'http';

    bool: boolean = this.scramble;

    mounted() {
      this.bool = false;
    }

    getScrambled() {
      if (this.dataHref && (this.dataHref as string).replace) {
        return (this.dataHref as string).replace(this.regex, this.obfuscation);
      }
      // TODO : handle RouterLocation case
      return this.dataHref;
    }

    isExternalLink() {
      if (this.dataHref && (this.dataHref as string).includes) {
        return (
          (this.dataHref as string).includes(this.externalLinkFlag)
          || !this.hasRoute(this.dataHref as string)
        );
      }
      return false;
    }

    hasRoute(dataHref: string) {
      // Here we check if the resolved route exists.
      // If not, an external link is forced, in order to go to the legacy site.
      const to = this.$router.resolve(dataHref);

      if (to && to.resolved && to.resolved.name) {
        return routeExist(to.resolved.name);
      }

      return false;
    }

    hasLink() {
      return this.dataHref && this.dataHref !== '' && this.dataHref !== {};
    }
  }
</script>
