<template>
  <div :class="['c-field c-field-focusable', {'has-errors': message, 'c-field-small': small}]">
    <div class="c-field-info">
      <label :for="name">
        {{ label }}
        <font-awesome-icon
          v-if="message"
          :icon="['far', 'exclamation-circle']" />
      </label>
      <span v-if="maxlength" class="char-count">
        {{ value.length }} / {{ maxlength }}
      </span>
    </div>
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :name="name"
      :id="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      @keydown="$emit('keydown', $event)"
      v-bind="$attrs">
    <textarea
      v-else
      :name="name"
      :id="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @keydown="$emit('keydown', $event)"
      v-bind="$attrs" />
    <div v-if="message" class="c-field-error">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-input-text',

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
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: null
    },
    message: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  input,
  textarea {
    font-size: 1rem;
    width: 100%;
    border: 0;
    max-width: 100%;
    min-width: 100%;
    background: transparent;
    outline: 0;
    padding: .5rem $field-padding .75rem $field-padding;
    color: $gray-900;

    &::placeholder {
      color: $gray-600;
    }

    &:disabled {
      color: $gray-600;
    }
  }

  textarea {
    min-height: 6.5rem;
  }

  .c-field-small {
    border-color: $gray-200;

    input,
    textarea {
      font-size: .85rem;
      padding: 0 1rem 0.25rem .75rem;
    }

    label {
      font-size: .75rem;
    }

    .c-field-info {
      margin-bottom: -2px;
      padding: 0.25rem 1rem 0 .75rem;
    }
  }
</style>
