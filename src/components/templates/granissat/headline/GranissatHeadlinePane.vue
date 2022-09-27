<template>
  <div :class="['pane', 'headline-pane', { 'pane-dimmed': paneDimmed }]">
    <!-- Source -->
    <c-select
      name="source"
      label="Font"
      :message="setFieldMessage('source')"
      placeholder="Selecciona una font"
      v-model="properties.source">
      <option
        v-for="source in presetsByName"
        :value="source"
        :key="source.id"
        :selected="properties.source && properties.source.id === source.id">
        {{ source.name }}
      </option>
      <option
        value="other"
        :selected="properties.source === 'other'">
        Altre...
      </option>
    </c-select>

    <!-- Other source -->
    <transition name="slide">
      <div v-if="properties.source === 'other'" class="source-input-group">
        <c-input-text
          label="Mitjà de comunicació"
          name="customSource"
          placeholder="La Veu"
          v-model="properties.customSource"
          :maxlength="30"
          :message="setFieldMessage('customSource')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- Headline -->
    <c-input-text
      label="Titular"
      name="headline"
      type="textarea"
      placeholder="L'ús de la bici està per damunt de 9000..."
      v-model="properties.headline"
      :maxlength="160"
      :message="setFieldMessage('headline')" />

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
import PaneMixin from '@/mixins/pane-mixin.js'
import GranissatMixin from '../granissat-mixin'
import presets from '@/components/templates/headline/presets'

export default {
  mixins: [PaneMixin, GranissatMixin],

  data () {
    return {
      properties: {
        headline: '',
        source: null,
        customSource: '',
        customSourceColor: '#1CA085',
        bgColor: 'initial'
      },
      presets,
      ratios: {
        11: 1.2,
        45: 0.95,
        916: 1.13,
        169: 0.89
      }
    }
  },

  mounted () {
    this.setRandomColor()
  },

  computed: {
    presetsByName () {
      const presetsByName = [...this.presets]
      return presetsByName.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    },

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
      const sourceField = this.properties.source === 'other'
        ? { customSource: "Has d'esciure una font" }
        : { source: 'Has de seleccionar una font' }
      this.fieldRequired({
        headline: "Has d'omplir un titular",
        ...sourceField
      })
      this.allCapsDisallowed('headline')
    }
  }
}
</script>

<style lang="scss">
  @import "../../../../sass/variables";

  .headline-pane {
    .source-input {
      &-group {
        display: flex;
      }

      &-name {
        flex-grow: 1;
        order: 1;
        border-bottom: 1px $gray-300 solid !important;
      }
    }
  }
</style>