<template>
  <div
    :class="[
      'glowy-card',
      `gradient-${color}`,
      `glow-size-${glowSize}`,
      {'edge': edge},
      {'full-width': proportionalWidth === '100%'}
    ]"
    :style="{
      '--width': proportionalWidth,
      '--height': proportionalHeight
    }">
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
    width: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: 'orange',
      validator (value) {
        return ['orange', 'feminism', 'green', 'lgbt', 'custom', 'none'].indexOf(value) !== -1
      }
    },
    edge: {
      type: Boolean,
      default: false
    },
    glowSize: {
      type: String,
      default: 'lg'
    }
  },

  computed: {
    proportionalWidth () {
      return this.width
        ? `${this.width}px`
        : this.pictureDimensions && !this.edge && this.height
          ? `${this.pictureDimensions.width * this.height / this.pictureDimensions.height}px`
          : '100%'
    },
    proportionalHeight () {
      return this.height
        ? `${this.height}px`
        : this.pictureDimensions && !this.edge && this.width
          ? `${this.pictureDimensions.height * this.width / this.pictureDimensions.width}px`
          : '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .glowy {
    &-card {
      position: relative;
      min-height: 350px;
      height: var(--height);
      // min-width: 400px;
    }

    &-subject {
      top: 0;
      z-index: 20;
    }

    &-ghost {
      top: 5px;
      z-index: 1;
      filter: blur(34px) brightness(.85);

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
      min-height: 350px;
      min-width: 350px;

      img {
        width: var(--width, 100%);
        height: var(--height);
        max-width: 100%;
        min-height: 350px;
        min-width: 350px;
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

      @at-root .glow-size-sm {
        .glowy-ghost.first {
          filter: blur(16px) brightness(1.1);
        }

        .glowy-ghost.second {
          filter: blur(4px) brightness(1.1);
          opacity: .5;
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

    &-lgbt {
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