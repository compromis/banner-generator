<template>
  <div
    :class="[
      'glowy-blob',
      `gradient-${color}`,
      `position-${position}`,
      `aspect-${aspect}`,
      { 'is-wide': wide }
    ]"
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
    offset: {
      type: Object
    }
  },

  computed: {
    aspect () {
      return this.$store.state.aspect
    },

    color () {
      return this.$store.state.banner.color
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .glowy-blob {
    position: absolute;
    transform: rotate($rotation) translate(var(--translate-x, 0), var(--translate-y, 0));
    transition: all .5s ease-in-out;
    z-index: 29;

    &.position-top {
      left: -58%;
      top: -82%;

      &.is-wide {
        left: -46%;
      }

      &.aspect-916 {
        left: -118% !important;
        top: -84%;
      }

      &.aspect-169 {
        left: -61%;
        top: -150%;
      }

      &.is-wide.aspect-169 {
        left: -44%;
        top: -151%;
      }
    }

    &.position-bottom {
      right: -57%;
      bottom: -81%;
      --gradient-orientation: -45deg;

      &.aspect-169 {
        right: -65%;
        bottom: -148%;
      }

      &.is-wide {
        right: -46%;
      }

      &.aspect-916 {
        right: -104% !important;
        bottom: -84%;
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
      filter: blur(32px);
      z-index: 19;
      opacity: .65;

      &.second {
        bottom: -1px;
        filter: blur(6px) brightness(.85);
        opacity: .85;
      }
    }

    @each $name, $gradient in $blob-gradients {
      &.gradient-#{$name} .glowy-subject,
      &.gradient-#{$name} .glowy-ghost {
        background: $gradient;
      }
    }

    &.gradient-lgbt .glowy-subject,
    &.gradient-lgbt .glowy-ghost {
      --gradient-orientation: 180deg !important;
      background-size: 100% 144px;
    }

    &.gradient-feminism .glowy-subject,
    &.gradient-feminism .glowy-ghost {
      background-position: -403px 155px;
      background-size: 53%;
    }

    &.is-wide.gradient-feminism  {
      .glowy-ghost, .glowy-subject {
        background-position: -440px 155px;
        background-size: 60%;
      }
    }

    &.gradient-feminism.position-top .glowy-subject,
    &.gradient-feminism.position-top .glowy-ghost {
      background-position: 0 334px;
      background-size: unset;
    }
  }
</style>
