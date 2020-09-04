<template>
  <div :class="['glowy-card', `gradient-${gradient}`, {'edge': edge}]">
    <div class="glowy-subject">
      <img v-if="image" :src="image" :style="imagePosition" />
      <div v-else class="placeholder"></div>
    </div>
    <div class="glowy-ghost first">
      <img v-if="image" :src="image" :style="imagePosition" />
      <div v-else class="placeholder"></div>
    </div>
    <div class="glowy-ghost second">
      <img v-if="image" :src="image" :style="imagePosition" />
      <div v-else class="placeholder"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'glowy-card',

  props: {
    image: {
      type: [File, String],
      default: null
    },
    imagePosition: {
      type: Object,
      default: null
    },
    gradient: {
      type: String,
      default: 'orange',
      validator: function (value) {
        return ['orange', 'feminism', 'green', 'none'].indexOf(value) !== -1
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
      top: 5px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      filter: blur(34px);

      &.second {
        filter: blur(8px);
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
  }
</style>
