<template>
  <div :class="['pane', 'headline-pane', { 'pane-dimmed': paneDimmed }]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="['glowy', 'blobless']" />

    <!-- Party -->
    <c-select
      name="source"
      label="Partit a comparar"
      :message="setFieldMessage('source')"
      placeholder="Selecciona un partit"
      v-model="properties.source">
      <option
        v-for="source in presets"
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

    <!-- Other party -->
    <transition name="slide">
      <div v-if="properties.source === 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.customSourceColor"></swatches>
          </div>
        </div>
        <c-input-text
          label="Formació política"
          name="customSource"
          placeholder="Partit local"
          v-model="properties.customSource"
          :maxlength="30"
          :message="setFieldMessage('customSource')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- Before Text  -->
    <c-input-text
      label="Text de l'altre partit"
      name="textBefore"
      type="textarea"
      placeholder="Mireu què mal ho han fet..."
      v-model="properties.textBefore"
      :maxlength="160"
      :message="setFieldMessage('textBefore')" />

    <!-- Before Picture -->
    <picture-upload
      id="picture-field"
      field-name="beforePicture"
      label="Foto de l'altre partit"
      :picture="properties.beforePicture"
      :preview="properties.beforePicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="ratios[properties.theme]"
      @upload="(image, ratio) => updateImageComparison('before', image, ratio)"
      @delete="removeComparePicture('before')">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.beforePicturePos"
        @touchstart="$emit('dimPane', true)"
        @touchend="$emit('dimPane', false)" />
    </picture-upload>

    <!-- After Text  -->
    <c-input-text
      label="Text de Compromís"
      name="textAfter"
      type="textarea"
      placeholder="I què bé ho fem"
      v-model="properties.textAfter"
      :maxlength="160"
      :message="setFieldMessage('textAfter')" />

    <!-- After Picture -->
    <picture-upload
      id="picture-field"
      field-name="afterPicture"
      label="Foto de Compromís"
      :picture="properties.afterPicture"
      :preview="properties.afterPicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="ratios[properties.theme]"
      @upload="(image, ratio) => updateImageComparison('after', image, ratio)"
      @delete="removeComparePicture('after')">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.afterPicturePos"
        @touchstart="$emit('dimPane', true)"
        @touchend="$emit('dimPane', false)" />
    </picture-upload>

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

    <!--Invert order -->
    <c-field>
      <b-switch v-model="properties.invertOrder">
        Invertir ordre de partits
      </b-switch>
    </c-field>

    <!-- Comparison mode -->
    <c-select
      name="comparison-mode"
      label="Comparació"
      placeholder="Tipus de comparació"
      v-model="properties.comparisonMode">
      <option value="none">
        Cap
      </option>
      <option value="vs">
        Vs.
      </option>
      <option value="arrow">
        Fletxa
      </option>
    </c-select>

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      label="Color de fons"
      is-rounded />

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

    <!-- Local label -->
     <transition name="slide">
      <c-input-text
        v-if="aspect === '11'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import ThemeSelector from '@/components/pane/ThemeSelector'
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from './presets'
import Swatches from 'vue-swatches'

export default {
  name: 'comparison-pane-party',

  components: {
    ThemeSelector,
    Swatches
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        theme: 'blobless',
        source: null,
        customSource: '',
        customSourceColor: '#1CA085',
        textAfter: '',
        textBefore: '',
        textSize: 100,
        beforePicture: null,
        beforePicturePreview: null,
        beforePicturePos: 50,
        afterPicture: null,
        afterPicturePreview: null,
        afterPicturePos: 50,
        invertOrder: false,
        comparisonMode: 'none'
      },
      presets,
      ratios: { 'blobless': 2.02, 'glowy': 0.53 }
    }
  },

  mounted () {
    this.$root.$on('refreshPane', (pane) => {
      if (pane === 'party') {
        this.$store.commit('updateBanner', this.properties)
      }
    })
  },

  watch: {
    'properties.theme' () {
      // Reevalute if image is vertical or horizontal
      // according to theme ratios
      this.refreshImageAspect('before')
      this.refreshImageAspect('after')
    }
  },

  methods: {
    validate () {
      const sourceField = (this.properties.source === 'other')
        ? { customSource: "Has d'escriure el nom d'un partit" }
        : { source: 'Has de seleccionar un partit' }

      this.fieldRequired({
        textBefore: "Has d'escirure un text",
        textAfter: "Has d'escriure un text",
        beforePicture: 'Has de seleccionar una foto',
        afterPicture: 'Has de seleccionar una foto',
        ...sourceField
      })
      this.allCapsDisallowed('textBefore', 'textAfter')
    },

    updateImageComparison (which, image, ratio) {
      this.customUpdateImage(which, image, ratio)
    },

    removeComparePicture (prefix) {
      const picture = prefix ? `${prefix}Picture` : 'picture'
      const picturePreview = prefix ? `${prefix}PicturePreview` : 'picturePreview'
      const pictureBlob = prefix ? `${prefix}PictureBlob` : 'pictureBlob'

      this.properties = Object.assign({}, this.properties, { [picture]: null, [picturePreview]: null, [pictureBlob]: null })
    },

    refreshImageAspect (prefix) {
      const picturePreview = prefix ? `${prefix}PicturePreview` : 'picturePreview'
      const pictureBlob = prefix ? `${prefix}PictureBlob` : 'pictureBlob'
      const pictureAspect = prefix ? `${prefix}PictureAspect` : 'pictureAspect'

      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        this.properties[pictureAspect] = (width / height > this.ratios[this.properties.theme]) ? 'horizontal' : 'vertical'
      }
      img.src = this.properties[pictureBlob] || this.properties[picturePreview]
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .comparison-pane {
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
