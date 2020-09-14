<template>
  <div :class="['glowy-card', `gradient-${gradient}`, {'edge': edge}, {'full-width': width === '100%'}]" :style="{ '--width': width, '--height': height ? height + 'px' : '100%' }">
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
      return this.pictureDimensions && !this.edge && this.height
        ? `${this.pictureDimensions.width * this.height / this.pictureDimensions.height}px`
        : '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .glowy {
    &-card {
      position: relative;
      min-height: 350px;
      min-width: 400px;
    }

    &-subject {
      top: 0;
      z-index: 20;
    }

    &-ghost {
      top: 5px;
      z-index: 1;
      filter: blur(34px);

      &.second {
        filter: blur(8px) brightness(.85);
      }
    }

    &-subject,
    &-ghost {
      position: absolute;
      border-radius: $glowy-card-radius;
      overflow: hidden;
      max-width: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: var(--width, 100%);
      height: var(--height);

      img {
        width: var(--width, 100%);
        height: var(--height);
        max-width: 100%;
        display: block;
        margin: 0;
        object-fit: cover;
      }

      @at-root .edge {
          width: 100%;

         .glowy-subject,
         .glowy-ghost {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }

      @at-root .full-width {
        .glowy-subject,
        .glowy-ghost {
          left: 0;
          right: 0;
          transform: none;

          img {
            width: 100%;
          }
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
