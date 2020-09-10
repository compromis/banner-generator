<template>
  <div :class="['glowy-card', `gradient-${gradient}`, {'edge': edge}]">
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
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .glowy {
    &-card {
      position: relative;
    }

    &-subject {
      position: relative;
      z-index: 2;
    }

    &-ghost {
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      bottom: -4px;
      z-index: 1;
      filter: blur(34px);

      &.second {
        bottom: -1px;
        filter: blur(8px) brightness(.85);
      }
    }

    &-subject,
    &-ghost {
      border-radius: $glowy-card-radius;
      overflow: hidden;

      img {
        display: block;
        margin: 0;
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
    min-height: 400px;
    min-width: 400px;
  }
</style>
