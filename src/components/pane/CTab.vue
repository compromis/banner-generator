<template>
  <label :for="name+value" :class="{'checked': shouldBeChecked}">
    <input
      :id="name+value"
      type="radio"
      :name="name"
      :value="value"
      :checked="shouldBeChecked"
      @change="$emit('change', value)"
      class="sr-only"
    >
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'Ctab',

  model: {
    prop: 'modelValue',
    event: 'change'
  },

  computed: {
    shouldBeChecked () {
      return this.modelValue === this.value
    }
  },

  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    modelValue: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

label {
  cursor: pointer;
  padding: .75rem 0;
  transition: .15s ease-in-out;

  &.checked {
    background: $primary;
    color: $white;

    &:hover {
      background: $primary;
    }
  }

  &:hover {
    background: $gray-200;
  }
}

</style>
