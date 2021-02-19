<template>
  <div>
    <!-- First Headline -->
    <c-select
      name="source"
      label="Primer mitjà"
      :message="setFieldMessage('firstSource')"
      placeholder="Selecciona un mitjà"
      @input="(source) => updateSource('first', source)"
      :value="properties.firstSource">
      <option
        v-for="source in presets"
        :value="source.id"
        :key="source.id"
        :selected="properties.firstSource === source.id">
        {{ source.name }}
      </option>
      <option
        value="other"
        :selected="properties.firstSource === 'other'">
        Altre...
      </option>
    </c-select>

    <!-- Other Source -->
    <transition name="slide">
      <div v-if="properties.firstSource === 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.customFirstSourceColor"></swatches>
          </div>
        </div>
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
    <picture-upload
      id="picture-field"
      field-name="pictureBefore"
      label="Foto del primer titular"
      :picture="properties.pictureBefore"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="(image) => updateImageComparison('Before', image)"
      @delete="properties.pictureBefore = null; properties.pictureBeforePreview = null">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.pictureBeforePos"
        @touchstart="$emit('dimPane', true)"
        @touchend="$emit('dimPane', false)" />
    </picture-upload>

    <!-- Second Headline Source -->
    <c-select
      name="source"
      label="Segon mitjà"
      :message="setFieldMessage('secondSource')"
      placeholder="Selecciona un mitjà"
      @input="(source) => updateSource('second', source)"
      :value="properties.secondSource">
      <option
        v-for="source in presets"
        :value="source.id"
        :key="source.id"
        :selected="properties.secondSource === source.id">
        {{ source.name }}
      </option>
      <option
        value="other"
        :selected="properties.secondSource === 'other'">
        Altre...
      </option>
    </c-select>

    <!-- Other Source -->
    <transition name="slide">
      <div v-if="properties.secondSource === 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.customSecondSourceColor"></swatches>
          </div>
        </div>
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
    <picture-upload
      id="picture-field"
      field-name="pictureAfter"
      label="Foto del segon titular"
      :picture="properties.pictureAfter"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="(image) => updateImageComparison('After', image)"
      @delete="properties.pictureAfter = null; properties.pictureAfterPreview = null">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.pictureAfterPos"
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
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from '../headline/presets'
import Swatches from 'vue-swatches'

export default {
  name: 'comparison-pane-party',

  components: {
    Swatches
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        theme: 'glowy',
        firstSource: null,
        secondSource: null,
        customFirstSource: '',
        customSecondSource: '',
        customFirstSourceColor: '#1CA085',
        customSecondSourceColor: '#1CA085',
        textAfter: '',
        textBefore: '',
        textSize: 100,
        pictureBefore: null,
        pictureBeforePreview: null,
        pictureBeforePos: 50,
        pictureAfter: null,
        pictureAfterPreview: null,
        pictureAfterPos: 50,
        invertOrder: false
      },
      presets
    }
  },

  mounted () {
    this.$root.$on('refreshPane', (pane) => {
      if (pane === 'headline') {
        this.$store.commit('updateBanner', this.properties)
      }
    })
  },

  methods: {
    validate () {
      const firstSourceField = (this.properties.firstSource === 'other')
        ? { customFirstSource: "Has d'escriure un primer mitjà" }
        : { firstSource: 'Has de seleccionar un partit' }
      const secondSourceField = (this.properties.secondSource === 'other')
        ? { customSecondSource: "Has d'escriure un segon mitjà" }
        : { secondSource: 'Has de seleccionar un segon mitjà' }

      this.fieldRequired({
        textBefore: "Has d'escirure un primer titular",
        textAfter: "Has d'escriure un segon titular",
        pictureBefore: 'Has de seleccionar una foto',
        pictureAfter: 'Has de seleccionar una foto',
        ...firstSourceField,
        ...secondSourceField
      })
      this.allCapsDisallowed('textBefore', 'textAfter')
    },

    updateImageComparison (which, image) {
      this.properties[`picture${which}`] = image
      this.properties[`picture${which}Preview`] = URL.createObjectURL(image)

      const img = new Image()
      img.src = this.properties[`picture${which}Preview`]
    },

    updateSource (which, source) {
      if (source === 'other') {
        this.properties[`${which}Source`] = 'other'
        return
      }

      this.properties[`${which}Source`] = this.presets.find(preset => preset.id === source)
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
