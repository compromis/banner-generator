<template>
  <div class="c-field">
    <div v-if="label" class="c-field-info">
      <label>{{ label }}</label>
    </div>
    <div class="c-field-content social-selector">
      <label
        v-for="(xarxa, i) in xarxes.channels"
        :key="i"
        :class="['social-selector-item', {'social-selector-item-active': selectedSocial.includes(xarxa.id)}]"
      >
        <input
          :id="xarxa.id"
          v-model="selectedSocial"
          type="checkbox"
          :value="xarxa.id"
          @change="onChange"
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
      xarxes: xarxes,
      selectedSocial: []
    }
  },

  props: {
    label: {
      type: String,
      default: 'Xarxes'
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.selectedSocial)
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
    border: .15rem solid $gray-600;
    color: $gray-600;
    border-radius: .5rem;
    transition: .25s ease-in-out;
    height: 36px;
    width: 36px;
    font-size: 1.5rem;
    cursor: pointer;

    &-active {
      border-color: $primary;
      color: $primary;
    }
  }
}
</style>
