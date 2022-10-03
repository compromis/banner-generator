<template>
  <div :class="['pane', 'som-molt-cover-pane', `pane-${aspect}`, { 'pane-dimmed': paneDimmed }]">
    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Som molt de tu. Som molt d'ací."
      v-model="properties.text"
      :maxlength="50"
      :message="setFieldMessage('text')"
      class="source-input-name" />

    <!-- Picture -->
    <advanced-picture-upload
      :picture="properties.picture"
      :picture-aspect="properties.pictureAspect"
      :crop="properties.pictureCrop"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="ratio"
      @upload="updateImage"
      @crop="updateCrop"
      @delete="removeImage">
    </advanced-picture-upload>

    <!-- Background color  -->
    <color-selector v-model="properties.bgColor" :colors="granissatColors" label="Color" is-rounded />
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import GranissatMixin from '../granissat-mixin'

export default {
  mixins: [PaneMixin, GranissatMixin],

  data () {
    return {
      properties: {
        text: '',
        bgColor: 'initial'
      },
      ratios: {
        11: 1.5,
        916: 0.95,
        event: 0.98
      }
    }
  },

  computed: {
    ratio () {
      return this.ratios[this.aspect]
    }
  },

  watch: {
    ratio (ratio) {
      this.refreshImageAspect({ ratio })
    },

    aspect (aspect) {
      const ratio = this.ratios[aspect]
      this.refreshImageAspect({ ratio })
    }
  },

  mounted () {
    this.setRandomColor()
  },

  methods: {
    validate () {
      this.pictureRequired()
    }
  }
}
</script>
