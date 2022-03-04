<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="removeImage" >
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </picture-upload>

    <!-- Logo Style -->
    <c-field label="Logo">
      <careta-selector v-model="properties.logoStyle" />
    </c-field>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import CaretaSelector from '@/components/pane/CaretaSelector'

export default {
  name: 'social-pane',
  mixins: [PaneMixin],

  components: {
    CaretaSelector
  },

  data () {
    return {
      properties: {
        logoStyle: 'normal'
      }
    }
  },

  methods: {
    validate () {
      this.pictureRequired()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .local-label {
    margin-top: .75rem;
  }
</style>
