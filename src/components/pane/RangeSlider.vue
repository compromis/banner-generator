<template>
  <div class="range-slider">
    <input
      class="slider"
      type="range"
      :name="name"
      :min="min"
      :max="max"
      :value="value"
      @input="updateValue"
      @touchstart="$emit('touchstart')"
      @touchend="$emit('touchend')" />
  </div>
</template>

<script>
export default {
  name: 'range-slider',

  props: {
    min: Number,
    max: Number,
    value: Number,
    name: String
  },

  methods: {
    updateValue (e) {
      this.$emit('input', parseInt(e.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.range-slider {
  margin: 0 -.5rem;
  padding: 0 .5rem;
  border-radius: .5rem;
}

.slider {
  appearance: none;
  width: 100%;
  height: .3rem;
  background: $gray-300;
  border-radius: 3rem;
  outline: none;
  opacity: 1;
  transition: opacity .2s;
  margin: 1.75rem 0 1rem;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 25px;
  background: $primary;
  transition: .2s;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background: $primary;
  transition: .2s;
  cursor: pointer;
}

.slider::-webkit-slider-thumb:hover {
  width: 1.5rem;
  height: 1.5rem;
}

.slider::-webkit-slider-thumb:active {
  background: darken($primary, 10%);
}
</style>
