<template>
  <div class="banner-picture">
    <glowy-card v-if="banner.theme === 'glowy'" v-bind="$attrs" />
    <div v-else class="background-picture">
      <img v-if="banner.picture" :src="banner.picturePreview" :style="banner.picturePosition" />
    </div>
    <div
      v-if="banner.theme === 'blobless'"
      :class="[
        'banner-gradient',
        `gradient-${banner.color}`,
        {
          'gradient-partial': !banner.fullGradient,
          'gradient-full': banner.fullGradient,
          'gradient-background': gradientBackground
        }
      ]"></div>
  </div>
</template>

<script>
import GlowyCard from './GlowyCard'

export default {
  name: 'banner-picture',

  components: {
    GlowyCard
  },

  computed: {
    banner () {
      return this.$store.state.banner
    },

    gradientBackground () {
      return !this.banner.picturePreview
    }
  },

  props: {
    picturePosition: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .background-picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background: $gray-200;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .banner-gradient {
    --gradient-orientation: 0deg;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    &.gradient {
      @each $name, $gradient in $trans-gradients {
        &-#{$name} {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $gradient;
        }
      }

      &-lgbt {
        --gradient-orientation: 153.5deg;
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: $gradient-lgtb;
        opacity: .75;
      }

      &-partial {
        top: 50%;
        bottom: -10%;

        &.gradient-orange {
          background: linear-gradient(var(--gradient-orientation, 110deg), rgba($gradient-start, 1) 0, rgba($gradient-start, .9) 20%, rgba($gradient-end, .7) 60%, rgba($gradient-end, 0) 95%);
        }

        &.gradient-lgbt {
          --gradient-orientation: 90deg;
          top: unset;
          bottom: 0;
          height: 90px;
        }
      }

      &-full {
        &.gradient-orange {
          background: linear-gradient(var(--gradient-orientation, 110deg), rgba($gradient-start, .9), rgba($gradient-end, .8), rgba($gradient-end, .3));
        }
        &.gradient-black {
          background: rgba($gray-800, .65);
        }
      }

      &-background {
        top: 0;
        bottom: 0;

        &.gradient-orange {
          background: linear-gradient(var(--gradient-orientation, 110deg), rgba($gradient-start, 1), rgba($gradient-end, 1), rgba($gradient-end, 1));
        }
        &.gradient-black {
          background: rgba($gray-800, 1);
        }
        &.gradient-lgbt {
          --gradient-orientation: 153.5deg;
          top: 0;
          bottom: 0;
          height: unset;
          opacity: 1;
        }
        &.gradient-feminism {
          background: linear-gradient(var(--gradient-orientation, 110deg), rgba(125, 58, 129, 1), rgba(197, 70, 135, 1), rgba(197, 70, 135, 1));
        }
      }
    }
  }
</style>
