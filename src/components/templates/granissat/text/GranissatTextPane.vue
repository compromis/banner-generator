<template>
  <div :class="['pane', 'text-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <layout-selector v-model="properties.layout" :layouts="availableLayouts" />

    <c-field label="Contingut" edge>
      <vue-editor v-model="properties.text" :editor-toolbar="customToolbar" />
    </c-field>

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
    <granissat-color-advisor :color="properties.bgColor" />

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspect != '916'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>

    <!-- Tagline -->
    <c-field>
      <b-switch v-model="properties.hasOwnTagline">
        Lema personalitzat
      </b-switch>
    </c-field>
    <transition name="slide">
      <c-input-text
        v-if="properties.hasOwnTagline"
        label="Lema"
        name="tagline"
        type="textarea"
        placeholder="Som molt de tu. Som molt d'ací."
        v-model="properties.tagline"
        :maxlength="60"
        :message="setFieldMessage('tagline')" />
    </transition>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import PaneMixin from '@/mixins/pane-mixin.js'
import GranissatMixin from '../granissat-mixin'
import LayoutSelector from './LayoutSelector'
import GranissatPhotoAdvisor from '../GranissatPhotoAdvisor'
import GranissatColorAdvisor from '../GranissatColorAdvisor'

export default {
  mixins: [PaneMixin, GranissatMixin],

  components: {
    VueEditor,
    LayoutSelector,
    GranissatPhotoAdvisor,
    GranissatColorAdvisor
  },

  data () {
    return {
      properties: {
        text: '',
        layout: 'top',
        bgColor: 'initial',
        hasOwnTagline: false,
        tagline: ''
      },
      availableLayouts: ['top', 'bottom'],
      customToolbar: [
        [{ header: 1 }],
        ['bold'],
        [{ list: 'bullet' }, { list: 'ordered' }]
      ],
      ratios: {
        11: {
          top: 1.87,
          bottom: 1.07
        },
        45: {
          top: 1.49,
          bottom: 0.85
        },
        916: {
          top: 1.13,
          bottom: 1.13
        }
      }
    }
  },

  mounted () {
    this.setRandomColor()
  },

  computed: {
    ratio () {
      return this.ratios[this.aspect][this.properties.layout]
    }
  },

  watch: {
    ratio (ratio) {
      this.refreshImageAspect({ ratio })
    },

    aspect (aspect) {
      const ratio = this.ratios[aspect][this.properties.layout]
      this.refreshImageAspect({ ratio })
    }
  },

  methods: {
    validate () {
      this.pictureRequired()
    }
  }
}
</script>

<style lang="scss">
  @import "../../../../sass/variables";

  .pane {
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border: 0;
    }

    .ql-editor {
      border-top: 1px solid $gray-200;
    }
  }
</style>
