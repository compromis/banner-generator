<template>
  <label :for="name+value" :class="{'checked': shouldBeChecked}">
    <input
      :id="name+value"
      type="radio"
      :name="name"
      :value="value"
      :checked="shouldBeChecked"
      @change="$emit('change', value)"
      class="sr-only">
    <font-awesome-icon
      v-if="icon"
      :icon="['far', icon]" />
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
    },
    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    shouldBeChecked () {
      return this.modelValue === this.value
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
    background: $gray-100;
  }

  &:active {
    background: $gray-200;
  }
}

</style>
