<template>
  <div class="banner-picture">
    <glowy-card v-if="theme === 'glowy'" :picture="picture" :picture-position="picturePosition" :color="color" v-bind="$attrs" />
    <div v-else class="background-picture">
      <img v-if="picture" :src="picture" :style="picturePosition" />
    </div>
    <div v-if="theme === 'blobless'" :class="['banner-gradient', `gradient-${color}`, { 'gradient-partial': !fullGradient, 'gradient-full': fullGradient }]"></div>
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
    theme: {
      type: String,
      default: 'blobs',
      validator (value) {
        return ['blobs', 'glowy', 'blobless'].includes(value)
      }
    },
    picture: {
      type: [File, String],
      default: null
    },
    picturePosition: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: 'orange',
      validator (value) {
        return ['none', 'black', 'orange', 'feminism', 'lgbt', 'green'].includes(value)
      }
    },
    fullGradient: {
      type: Boolean,
      default: true
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

        &.gradient-lgbt {
          --gradient-orientation: 90deg;
          top: 87%;
        }
      }

      &-full {
        &.gradient-black {
          background: rgba($gray-800, .65);
        }
      }
    }
  }
</style>
