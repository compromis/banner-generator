<template>
  <div>
    <theme-selector v-model="properties.theme" :themes="['glowy', 'blobless']" />
    <!-- First Headline -->
    <div class="source-input-group">
      <c-select
        name="source"
        label="Primer mitjà"
        :message="setFieldMessage('firstSource')"
        placeholder="Selecciona un mitjà"
        v-model="properties.firstSource"
        class="source-input-name"
        >
        <option
          v-for="source in presetsByName"
          :value="source"
          :key="source.id"
          :selected="properties.firstSource && properties.firstSource === source.id">
          {{ source.name }}
        </option>
        <option
          value="other"
          :selected="properties.firstSource === 'other'">
          Altre...
        </option>
      </c-select>
      <transition name="slide">
        <div class="c-field" v-if="properties.theme === 'glowy' || properties.firstSource === 'other'">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.firstSourceCustomColor"></swatches>
          </div>
        </div>
      </transition>
    </div>

    <!-- Other Source -->
    <transition name="slide">
      <div v-if="properties.firstSource === 'other'">
        <c-input-text
          label="Mitjà de comunicació"
          name="customSource"
          placeholder="La Veu"
          v-model="properties.customFirstSource"
          :maxlength="30"
          :message="setFieldMessage('customSource')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- First Description -->
    <transition name="slide">
      <c-input-text
        v-if="properties.theme === 'glowy'"
        label="Descripció breu"
        name="firstDescription"
        type="text"
        placeholder="2014"
        v-model="properties.firstDescription"
        :maxlength="30" />
    </transition>

    <!-- First Headline Text  -->
    <c-input-text
      label="Primer titular"
      name="textBefore"
      type="textarea"
      placeholder="L'ús de la bici està per davall de 9000..."
      v-model="properties.textBefore"
      :maxlength="160"
      :message="setFieldMessage('textBefore')" />

    <!-- First Headline Picture -->
    <advanced-picture-upload
      field-name="beforePicture"
      :picture="properties.beforePicture"
      :picture-aspect="properties.beforePictureAspect"
      :crop="properties.beforePictureCrop"
      :preview="properties.beforePicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="2"
      @upload="(image, ratio) => customUpdateImage('before', image, ratio)"
      @crop="(crop) => updateCrop(crop, 'before')"
      @delete="removeImage('before')">
    </advanced-picture-upload>

    <!-- Second Headline Source -->
    <div class="source-input-group">
      <c-select
        name="source"
        label="Segon mitjà"
        :message="setFieldMessage('secondSource')"
        placeholder="Selecciona un mitjà"
        v-model="properties.secondSource"
        class="source-input-name"
        >
        <option
          v-for="source in presets"
          :value="source"
          :key="source.id"
          :selected="properties.secondSource && properties.secondSource.id === source.id">
          {{ source.name }}
        </option>
        <option
          value="other"
          :selected="properties.secondSource === 'other'">
          Altre...
        </option>
      </c-select>
      <transition name="slide">
        <div class="c-field" v-if="properties.theme === 'glowy' || properties.secondSource === 'other'">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.secondSourceCustomColor"></swatches>
          </div>
        </div>
      </transition>
    </div>

    <!-- Other Source -->
    <transition name="slide">
      <div v-if="properties.secondSource === 'other'">
        <c-input-text
          label="Mitjà de comunicació"
          name="customSource"
          placeholder="La Veu"
          v-model="properties.customSecondSource"
          :maxlength="30"
          :message="setFieldMessage('customSource')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- Second Description -->
    <transition name="slide">
      <c-input-text
        v-if="properties.theme === 'glowy'"
        label="Descripció breu"
        name="secondDescription"
        type="text"
        placeholder="2020"
        v-model="properties.secondDescription"
        :maxlength="30" />
    </transition>

    <!-- Second Headline  -->
    <c-input-text
      label="Segon titular"
      name="textAfter"
      type="textarea"
      placeholder="L'ús de la bici està per damunt de 9000..."
      v-model="properties.textAfter"
      :maxlength="160"
      :message="setFieldMessage('textAfter')" />

    <!-- After Picture -->
    <advanced-picture-upload
      field-name="afterPicture"
      :picture="properties.afterPicture"
      :picture-aspect="properties.afterPictureAspect"
      :crop="properties.afterPictureCrop"
      :preview="properties.afterPicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="2"
      @upload="(image, ratio) => customUpdateImage('after', image, ratio)"
      @crop="(crop) => updateCrop(crop, 'after')"
      @delete="removeImage('after')">
    </advanced-picture-upload>

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

    <!-- Hashtag -->
    <c-input-text
      label="Hashtag"
      name="hashtag"
      placeholder="#"
      @input="updateHashtag"
      :value="properties.hashtag"
      :maxlength="properties.localLabel ? 22 : 32" />

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
import presets from '../headline/presets'
import Swatches from 'vue-swatches'

export default {
  components: {
    Swatches,
    ThemeSelector
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        theme: 'blobless',
        firstSource: null,
        secondSource: null,
        customFirstSource: '',
        customSecondSource: '',
        firstSourceCustomColor: '#222F3D',
        secondSourceCustomColor: '#222F3D',
        textAfter: '',
        textBefore: '',
        firstDescription: '',
        secondDescription: '',
        textSize: null,
        beforePicture: null,
        beforePicturePreview: null,
        afterPicture: null,
        afterPicturePreview: null,
        comparisonMode: 'none',
        beforePictureCrop: {
          scale: 100,
          x: 50,
          y: 50
        },
        afterPictureCrop: {
          scale: 100,
          x: 50,
          y: 50
        }
      },
      presets
    }
  },

  watch: {
    'properties.firstSource' (source) {
      this.properties.firstSourceCustomColor = source.color
    },

    'properties.secondSource' (source) {
      this.properties.secondSourceCustomColor = source.color
    }
  },

  computed: {
    presetsByName () {
      const presetsByName = [...this.presets]
      return presetsByName.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
  },

  methods: {
    validate () {
      const firstSourceField = (this.properties.firstSource === 'other')
        ? { customFirstSource: "Has d'escriure un primer mitjà" }
        : { firstSource: 'Has de seleccionar un primer mitjà' }
      const secondSourceField = (this.properties.secondSource === 'other')
        ? { customSecondSource: "Has d'escriure un segon mitjà" }
        : { secondSource: 'Has de seleccionar un segon mitjà' }

      this.fieldRequired({
        textBefore: "Has d'escirure un primer titular",
        textAfter: "Has d'escriure un segon titular",
        beforePicture: 'Has de seleccionar una foto',
        afterPicture: 'Has de seleccionar una foto',
        ...firstSourceField,
        ...secondSourceField
      })
      this.allCapsDisallowed('textBefore', 'textAfter')
    },

    updateImageComparison (which, image, ratio) {
      this.customUpdateImage(which, image, ratio)
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
