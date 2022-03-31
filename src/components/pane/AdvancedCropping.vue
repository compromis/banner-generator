<template>
  <div>
    <range-slider
      name="scale"
      label="Zoom"
      :min="100"
      :max="300"
      v-model="picture.scale"
    />
    <range-slider
      name="xpos"
      label="Posició X"
      :min="-25"
      :max="25"
      v-model="picture.x"
    />
    <range-slider
      name="ypos"
      label="Posició Y"
      :min="-25"
      :max="25"
      v-model="picture.y"
    />
  </div>
</template>

<script>
import RangeSlider from './RangeSlider'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  components: {
    RangeSlider
  },

  computed: {
    picture: {
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

</style>
