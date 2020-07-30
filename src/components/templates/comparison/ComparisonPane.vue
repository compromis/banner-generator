<template>
  <div :class="{ 'pane comparison-pane': true, 'pane-dimmed': paneDimmed }">

    <!-- Party -->
    <b-field
      id="source-field"
      label="Partit Abans"
      :type="setFieldType('source')"
      :message="setFieldMessage('source')">
      <b-select placeholder="Selecciona un partit" @input="updateSource" expanded>
        <option
          v-for="source in presets"
          :value="source.id"
          :key="source.id"
          :selected="properties.source === source.id">
          {{ source.name }}
        </option>
        <option
          value="other"
          :selected="properties.source === 'other'">
          Altre...
        </option>
      </b-select>
    </b-field>

    <!-- Other party -->
    <transition name="slide">
      <div v-if="properties.source === 'other'" class="source-input-group">
        <b-field
          class="source-input-name"
          label="Formació política"
          :type="setFieldType('customSource')"
          :message="setFieldMessage('customSource')">
          <b-input placeholder="Partit local" v-model="properties.customSource" maxlength="23"></b-input>
        </b-field>
        <b-field label="Color" class="source-input-color">
          <swatches v-model="properties.customSourceColor"></swatches>
        </b-field>
      </div>
    </transition>

    <!-- Before Text  -->
    <b-field
      label="Text Abans"
      :type="setFieldType('textBefore')"
      :message="setFieldMessage('textBefore')">
      <b-input
        type="textarea"
        placeholder="L'ús de la bici està per damunt de 9000..."
        v-model="properties.textBefore"
        maxlength="160">
      </b-input>
    </b-field>

    <!-- Before Picture -->
    <picture-upload
      id="picture-field"
      field-name="pictureBefore"
      :picture="properties.pictureBefore"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="(image) => updateImageComparison('Before', image)"
      @delete="properties.pictureBefore = null; properties.pictureBeforePreview = null" />

    <!-- Before Picture position -->
    <b-field id="picture-position-field" label="Posició de la imatge" class="range">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.pictureBeforePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- After Text  -->
    <b-field
      label="Text Després"
      :type="setFieldType('textAfter')"
      :message="setFieldMessage('textAfter')">
      <b-input
        type="textarea"
        placeholder="L'ús de la bici està per damunt de 9000..."
        v-model="properties.textAfter"
        maxlength="160">
      </b-input>
    </b-field>

    <!-- After Picture -->
    <picture-upload
      id="picture-field"
      field-name="pictureAfter"
      :picture="properties.pictureAfter"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="(image) => updateImageComparison('After', image)"
      @delete="properties.pictureAfter = null; properties.pictureAfterPreview = null" />

    <!-- After Picture position -->
    <b-field id="picture-position-field" label="Posició de la imatge" class="range">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.pictureAfterPos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- Text size -->
    <b-field label="Tamany del text" class="range">
      <range-slider
        name="points"
        :min="50"
        :max="150"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- Local label -->
    <transition name="slide">
      <div v-if="!aspect" class="field" id="local-label-field">
        <b-switch v-model="properties.hasLocalLabel" @input="properties.hashtag = properties.hashtag.substring(0, 18)">
          Afegir text al logo
        </b-switch>
        <transition name="slide">
          <div v-if="properties.hasLocalLabel" class="local-label">
            <b-field>
              <b-input placeholder="Alacant" v-model="properties.localLabel" maxlength="48"></b-input>
            </b-field>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from './presets'
import Swatches from 'vue-swatches'

export default {
  name: 'comparison-pane',

  components: {
    Swatches
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        source: null,
        customSource: '',
        customSourceColor: '#1CA085',
        textAfter: '',
        textBefore: '',
        textSize: 100,
        pictureBefore: null,
        pictureBeforePreview: null,
        pictureBeforePos: 50,
        pictureAfter: null,
        pictureAfterPreview: null,
        pictureAfterPos: 50
      },
      presets: presets
    }
  },

  methods: {
    validate () {
      const sourceField = (this.properties.source === 'other')
        ? { customSource: "Has d'escriure el nom d'un partit" }
        : { source: 'Has de seleccionar un partit' }

      this.fieldRequired({
        textBefore: "Has d'escirure una cita",
        textAfter: "Has d'escriure un autor",
        pictureBefore: 'Has de seleccionar una foto',
        pictureAfter: 'Has de seleccionar una foto',
        ...sourceField
      })
      this.allCapsDisallowed('textBefore', 'textAfter')
    },

    updateImageComparison (which, image) {
      this.properties[`picture${which}`] = image
      this.properties[`picture${which}Preview`] = URL.createObjectURL(image)

      const img = new Image()
      img.src = this.properties[`picture${which}Preview`]
    },

    updateSource (source) {
      if (source === 'other') {
        this.properties.source = 'other'
        return
      }

      this.properties.source = this.presets.find(preset => preset.id === source)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .comparison-pane {
    .hashtag {
      margin-top: .25rem;
    }

    .local-label {
      margin-top: .75rem;
    }

    .source-input {
      &-group {
        display: flex;

        label {
          font-size: .85rem;
          color: $gray-600;
        }
      }

      &-name {
        flex-grow: 1;
        order: 1;
      }

      &-color {
        margin-right: .5rem;
      }
    }

    .vue-swatches__trigger {
      height: 36px !important;
      width: 36px !important;
      border-radius: 4px !important;
    }
  }
</style>
