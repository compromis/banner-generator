<template>
  <div class="c-field">
    <div v-if="label" class="c-field-info">
      <label>{{ label }}</label>
    </div>
    <div class="c-field-content social-selector">
      <label
        v-for="(xarxa, i) in xarxes.channels"
        :key="i"
        :class="['social-selector-item', {'social-selector-item-active': value.includes(xarxa.id)}]"
      >
        <input
          :id="xarxa.id"
          v-model="social"
          type="checkbox"
          :value="xarxa.id"
        >
        <b-icon :icon="xarxa.id" pack="fab" />
      </label>
    </div>
  </div>
</template>

<script>
import xarxes from '@/components/templates/media/presets-xarxes.js'

export default {
  name: 'social-selector',

  data () {
    return {
      xarxes
    }
  },

  props: {
    label: {
      type: String,
      default: 'Xarxes'
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    social: {
      get () {
        return this.value
      },
      set (selected) {
        this.$emit('input', selected)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables";

.c-field .social-selector {
  display: flex;
  justify-content: space-between;

  input {
    display: none;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $gray-200;
    color: $gray-600;
    border-radius: .5rem;
    transition: .25s ease-in-out;
    height: 36px;
    width: 36px;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
      border-color: $gray-400;
    }

    &-active,
    &-active:hover {
      border-color: $primary;
      color: $primary;
    }
  }
}
</style>
