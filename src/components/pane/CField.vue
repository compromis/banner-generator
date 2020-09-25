<template>
  <div class="c-field">
    <div class="c-field-info" v-if="label">
      <label>{{ label }}</label>
    </div>
    <div class="c-field-content">
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
    }
  }
}
</script>
