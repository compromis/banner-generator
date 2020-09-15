<template>
  <div :class="['event-info', `event-info-${color}`]" contenteditable>
    <font-awesome-icon :icon="['far', icon]" fixed-width />
    <slot></slot>
    <svg width="0" height="0">
      <radialGradient id="compromisGradient" r="150%" cx="30%" cy="107%">
        <stop class="gradient-start" offset="0" />
        <stop class="gradient-end" offset="1" />
      </radialGradient>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'EventInfo',

  props: {
    icon: {
      type: String,
      default: 'calendar-day'
    },
    color: {
      type: String,
      default: 'gradient',
      validator (value) {
        return ['gradient', 'gray'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.event-info {
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: -1px;
  width: auto;
  color: $gray-700;
  padding-right: 20px;
  line-height: 1.1;

  svg {
    padding-right: 8px;
    font-size: 28px;
    margin-top: -1px;
  }

  &-gradient {
    svg {
      * {
        fill: url(#compromisGradient) !important;
      }
    }
  }
}
</style>
