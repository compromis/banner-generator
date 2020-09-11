<template>
  <div :class="['glowy-card', `gradient-${gradient}`, {'edge': edge}]" :style="{ '--width': width + 'px', '--height': height + 'px' }">
    <div class="glowy-subject">
      <img v-if="picture" :src="picture" :style="picturePosition" />
      <div v-else class="placeholder"></div>
    </div>
    <div class="glowy-ghost first">
      <img v-if="picture" :src="picture" :style="picturePosition" />
      <div v-else class="placeholder"></div>
    </div>
    <div class="glowy-ghost second">
      <img v-if="picture" :src="picture" :style="picturePosition" />
      <div v-else class="placeholder"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'glowy-card',

  props: {
    picture: {
      type: [File, String],
      default: null
    },
    picturePosition: {
      type: Object,
      default: null
    },
    pictureDimensions: {
      type: Object,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    gradient: {
      type: String,
      default: 'orange',
      validator (value) {
        return ['orange', 'feminism', 'green', 'lgtb', 'none'].indexOf(value) !== -1
      }
    },
    edge: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    width () {
      return this.pictureDimensions ? this.pictureDimensions.width * this.height / this.pictureDimensions.height : null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .glowy {
    &-card {
      position: relative;
      min-height: 400px;
      min-width: 400px;
    }

    &-subject {
      position: absolute;
      display: flex;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      width: var(--width);
      height: var(--height);
    }

    &-ghost {
      position: absolute;
      top: 5px;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%);
      filter: blur(34px);
      width: var(--width);
      height: var(--height);

      &.second {
        filter: blur(8px) brightness(.85);
      }
    }

    &-subject,
    &-ghost {
      border-radius: $glowy-card-radius;
      overflow: hidden;

      img {
        width: var(--width);
        height: var(--height);
        display: block;
        margin: 0;
        object-fit: cover;
      }

      @at-root .edge > div {
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        img {
          width: 100%;
        }
      }
    }
  }

  .gradient {
    @each $name, $gradient in $trans-gradients {
      &-#{$name} {
        .glowy-subject::before,
        .glowy-ghost::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $gradient;
        }
      }
    }

    &-lgtb {
      .glowy-subject::before,
      .glowy-ghost::before {
        --gradient-orientation: 90deg;
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 20px;
        background: $gradient-lgtb;
      }
    }
  }

  .placeholder {
    background: $gray-200;
    width: 100%;
    height: 100%;
  }
</style>
