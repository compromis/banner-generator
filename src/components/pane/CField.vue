<template>
  <div class="c-field">
    <div class="c-field-info" v-if="label">
      <label>{{ label }}</label>
    </div>
    <div :class="{ 'c-field-content': !edge, 'c-field-compact': compact}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-field',

  props: {
    label: {
      type: String,
      default: null
    },

    edge: {
      type: Boolean,
      default: false
    },

    compact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.c-field-compact {
  padding-top: 0;
}
</style>
