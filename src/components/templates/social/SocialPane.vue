<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Picture -->
    <advanced-picture-upload
      :picture="properties.picture"
      :picture-aspect="properties.pictureAspect"
      :crop="properties.pictureCrop"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="aspectProperties.ratio"
      @upload="updateImage"
      @crop="updateCrop"
      @delete="removeImage" />

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
