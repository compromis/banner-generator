<template>
  <div :class="['pane', 'som-molt-generic-pane', `pane-${aspect}`, { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Un psicòleg a cada centre de salut"
      v-model="properties.text"
      :maxlength="70"
      :message="setFieldMessage('text')"
      class="source-input-name" />

    <!-- Text size -->
    <c-field label="Tamany del text" class="range-field" compact>
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="$emit('dimPane', true)"
        @touchend="$emit('dimPane', false)" />
    </c-field>

    <!-- num -->
    <c-input-text
        label="Número o text secundari (opcional)"
        name="num"
        placeholder="#1"
        v-model="properties.num"
        :maxlength="28" />

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
    <color-selector v-model="properties.bgColor" :colors="['yellow', 'blue', 'pink', 'indigo', 'feminist']" label="Color" is-rounded />
    <granissat-color-advisor :color="properties.bgColor" />

    <!-- Idioma -->
    <c-select label="Lema" name="lang" v-model="properties.lang" expanded>
        <option value="val">Per tot el que importa</option>
        <option value="cas">Por todo lo que importa</option>
    </c-select>

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
import GranissatColorAdvisor from '../GranissatColorAdvisor'

export default {
  mixins: [PaneMixin, GranissatMixin],

  components: {
    GranissatColorAdvisor
  },

  data () {
    return {
      properties: {
        textSize: 100,
        text: '',
        bgColor: 'yellow',
        lang: 'val',
        num: ''
      },
      ratios: {
        11: 1,
        45: 1,
        916: 1,
        169: 1
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

  methods: {
    validate () {
      this.fieldRequired({ text: "Has d'escriure un text" })
    }
  }
}
</script>
