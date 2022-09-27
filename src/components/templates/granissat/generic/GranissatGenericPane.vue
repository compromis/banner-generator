<template>
  <div :class="['pane', 'som-molt-generic-pane', `pane-${aspect}`, { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Layout -->
    <layout-selector v-model="properties.layout" :layouts="availableLayouts" />

    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Som molt de tu. Som molt d'ací."
      v-model="properties.text"
      :maxlength="70"
      :message="setFieldMessage('text')"
      class="source-input-name" />
    <granissat-text-advisor />

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
    <granissat-photo-advisor />

    <!-- Background color  -->
    <color-selector v-model="properties.bgColor" :colors="granissatColors" label="Color" is-rounded />

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspect !== '916'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import GranissatMixin from '../granissat-mixin'
import LayoutSelector from './LayoutSelector'
import GranissatTextAdvisor from '../GranissatTextAdvisor'
import GranissatPhotoAdvisor from '../GranissatPhotoAdvisor'

export default {
  mixins: [PaneMixin, GranissatMixin],

  components: {
    LayoutSelector,
    GranissatTextAdvisor,
    GranissatPhotoAdvisor
  },

  data () {
    return {
      properties: {
        layout: 'right',
        text: '',
        bgColor: 'initial'
      },
      aspects: {
        11: ['right', 'top', 'bottom'],
        45: ['top', 'bottom'],
        916: ['top', 'bottom'],
        169: ['right']
      },
      ratios: {
        11: {
          right: 0.42,
          bottom: 2,
          top: 2
        },
        45: {
          top: 1.6,
          bottom: 1.6
        },
        916: {
          top: 1.11,
          bottom: 1.11
        },
        169: {
          right: 0.8
        }
      }
    }
  },

  computed: {
    ratio () {
      return this.ratios[this.aspect][this.properties.layout]
    },

    availableLayouts () {
      return this.aspects[this.aspect]
    }
  },

  watch: {
    ratio (ratio) {
      this.refreshImageAspect({ ratio })
    },

    aspect (aspect) {
      if (!this.aspects[aspect].includes(this.properties.layout)) {
        this.properties.layout = this.aspects[aspect][0]
      }
      const ratio = this.ratios[aspect][this.properties.layout]
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
