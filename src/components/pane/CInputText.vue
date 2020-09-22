<template>
  <div :class="['field', {'has-errors': message}]">
    <div class="field-info">
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
      v-bind="$attrs">
    <textarea
      v-else
      :name="name"
      :id="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs" />
    <div v-if="message" class="field-error">
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .field {
    border-bottom: 1px solid $gray-300;

    &-info {
      display: flex;
      padding: .5rem $field-padding 0 $field-padding;
      align-items: center;
    }

    input,
    textarea {
      width: 100%;
      border: 0;
      max-width: 100%;
      min-width: 100%;
      background: transparent;
      outline: 0;
      padding: .5rem $field-padding;
    }

    textarea {
      min-height: 6rem;
    }

    label {
      flex-grow: 1;
    }

    .char-count {
      display: none;
      font-size: .75rem;
    }

    &:focus-within {
      background: $gray-100;

      .char-count {
        display: block;
      }
    }

    &-error {
      color: $red;
      font-size: .75rem;
      padding: 0 $field-padding .5rem $field-padding;
    }

    &.has-errors {
      background: rgba($red, .1);

      &:focus-within {
        background: rgba($red, .15);
      }

      label {
        color: $red;
      }
    }
  }
</style>
