<template>
  <div :class="['c-field c-field-focusable', {'has-errors': message}]">
    <div class="c-field-info">
      <label :for="name">
        {{ label }}
        <font-awesome-icon
          v-if="message"
          :icon="['far', 'exclamation-circle']" />
      </label>
    </div>
    <select
      v-model="computedValue"
      :id="name"
      :name="name"
      :disabled="disabled"
      :class="{'has-value': value}">
      <option
        v-if="computedValue == null"
        :value="null"
        disabled
        hidden>
        {{ placeholder }}
      </option>
      <slot></slot>
    </select>
    <font-awesome-icon :icon="['far', 'chevron-down']" />
    <div v-if="message" class="c-field-error">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-select',

  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  select {
    font-size: 1rem;
    width: 100%;
    border: 0;
    max-width: 100%;
    min-width: 100%;
    background: transparent;
    outline: 0;
    padding: .5rem $field-padding .75rem $field-padding;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: $gray-600;

    &.has-value {
      color: $gray-900;
    }
  }

  .fa-chevron-down {
    position: absolute;
    top: 2.75rem;
    right: 1rem;
    pointer-events: none;
  }
</style>
