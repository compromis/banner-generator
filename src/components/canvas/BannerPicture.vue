<template>
  <div class="banner-picture" v-if="!transparentMode">
    <glowy-card
      v-if="banner.theme === 'glowy'"
      :picture="computedPicture"
      :picture-position="picturePosition"
      :color="computedColor"
      v-bind="$attrs" />
    <template v-else>
      <div class="background-picture" v-if="computedPicture" :style="{ backgroundImage: `url(${computedPicture})`, ...picturePosition }" />
    </template>
    <div
      v-if="banner.theme === 'blobless'"
      :class="[
        'banner-gradient',
        `gradient-${computedColor}`,
        {
          'gradient-partial': !computedFullGradient,
          'gradient-full': computedFullGradient,
          'gradient-background': !computedPicture
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

  props: {
    picture: {
      type: [String, Boolean],
      default: null
    },
    picturePosition: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    fullGradient: {
      type: Boolean,
      default: null
    }
  },

  computed: {
    banner () {
      return this.$store.state.banner
    },

    computedPicture () {
      if (this.picture === false) return
      return this.picture || this.banner.pictureBlob || this.banner.picturePreview
    },

    computedColor () {
      return this.color || this.banner.color
    },

    computedFullGradient () {
      return this.fullGradient === null ? this.banner.fullGradient : this.fullGradient
    },

    transparentMode () {
      return this.$store.state.settings.transparentMode
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
    background-color: $gray-200;
    background-size: cover;
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
          top: 30%;
          bottom: 0;
          background: url(../../assets/gradients/gradient-partial.png);
          background-size: 100% 100%;
        }

        &.gradient-lgbt {
          --gradient-orientation: 90deg;
          top: unset;
          bottom: 0;
          height: 90px;
        }

        &.gradient-feminism {
          top: 30%;
          bottom: 0;
          background: url(../../assets/gradients/feminism-partial.png);
          background-size: 100% 100%; // this seems redundant but is needed, otherwise chrome sizes according to overriden bg
        }
      }

      &-full {
        &.gradient-orange {
          background: linear-gradient(-10deg, rgba($gradient-start, .9), rgba($gradient-end, .8), rgba($gradient-end, .3));
        }
        &.gradient-black {
          background: rgba($gray-800, .65);
        }

        &.gradient-white {
          background: rgba($white, .65);
        }
        &.gradient-feminism {
          background: url(../../assets/gradients/feminism-full.png);
          background-size: 100% 100%; // this seems redundant but is needed, otherwise chrome sizes according to overriden bg
        }

        &.gradient-green {
          background: linear-gradient(-10deg, rgba($green-start, .9), rgba($green-end, .8), rgba($green-end, .3));
        }
      }

      &-background {
        top: 0;
        bottom: 0;

        &.gradient-orange {
          top: 0;
          background: linear-gradient(-38deg, $gradient-start 0%, $gradient-end 90%, $gradient-end 100%);
        }

        &.gradient-green {
          --gradient-orientation: -30deg;
          background: $gradient-green;
        }
        &.gradient-black {
          background: rgba($gray-800, 1);
        }

        &.gradient-white {
          background: rgba($white, 1);
        }
        &.gradient-lgbt {
          --gradient-orientation: 153.5deg;
          top: 0;
          bottom: 0;
          height: unset;
          opacity: 1;
        }
        &.gradient-feminism {
          top: 0;
          background: url(../../assets/gradients/feminism-background.jpg);
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
