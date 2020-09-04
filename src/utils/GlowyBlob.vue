<template>
  <div
    :class="['glowy-blob', `gradient-${gradient}`, `position-${position}`, { 'is-wide': wide }]"
    :style="offset ? { '--translate-x': offset.x, '--translate-y': offset.y } : false"
  >
    <div class="glowy-subject"></div>
    <div class="glowy-ghost first"></div>
    <div class="glowy-ghost second"></div>
  </div>
</template>

<script>
export default {
  name: 'glowy-blob',

  props: {
    position: {
      type: String,
      default: 'top',
      validator (value) {
        return ['top', 'bottom'].indexOf(value) !== -1
      }
    },
    wide: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: String,
      default: 'orange',
      validator (value) {
        return ['orange', 'feminism', 'lgtb'].indexOf(value) !== -1
      }
    },
    offset: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .glowy-blob {
    position: absolute;
    transform: rotate($rotation) translate(var(--translate-x), var(--translate-y));
    transition: all .5s ease-in-out;
    z-index: 20;

    &.position-top {
      left: -58%;
      top: -82%;

      &.is-wide {
        left: -46%;
      }
    }

    &.position-bottom {
      right: -57%;
      bottom: -81%;
      --gradient-orientation: -45deg;

      &.is-wide {
        right: -46%;
      }
    }

    .glowy-subject {
      position: relative;
      width: 720px;
      height: 720px;
      border-radius: $border-radius;
      background: $gradient;
      z-index: 20;
    }

    .glowy-ghost {
      position: absolute;
      top: 10px;
      left: 0;
      bottom: -5px;
      right: 0;
      border-radius: $border-radius;
      background: $gradient;
      filter: blur(34px);
      z-index: 19;

      &.second {
        bottom: -1px;
        filter: blur(6px);
      }
    }

    @each $name, $gradient in $blob-gradients {
      &.gradient-#{$name} .glowy-subject,
      &.gradient-#{$name} .glowy-ghost {
        background: $gradient;
      }
    }

    &.gradient-lgtb .glowy-subject,
    &.gradient-lgtb .glowy-ghost {
      --gradient-orientation: 180deg !important;
      background-size: 100% 144px;
    }
  }
</style>
