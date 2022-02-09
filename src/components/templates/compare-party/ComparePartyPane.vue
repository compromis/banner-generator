<template>
  <div>
    <!-- Party -->
    <c-select
      name="source"
      label="Partit a comparar"
      :message="setFieldMessage('source')"
      placeholder="Selecciona un partit"
      @input="updateSource"
      :value="properties.source.id">
      <option
        v-for="source in presets"
        :value="source.id"
        :key="source.id">
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
      :ratio="1.8"
      @upload="(image, ratio) => updateImageComparison('before', image, ratio)"
      @delete="properties.beforePicture = null; properties.beforePicturePreview = null">
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
      :ratio="1.8"
      @upload="(image, ratio) => updateImageComparison('after', image, ratio)"
      @delete="properties.afterPicture = null; properties.afterPicturePreview = null">
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

    <!-- Local label -->
    <c-field>
      <b-switch v-model="properties.invertOrder">
        Invertir ordre de partits
      </b-switch>
    </c-field>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

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
import presets from './presets'
import Swatches from 'vue-swatches'
import EmojiPicker from '@/components/pane/EmojiPicker'

export default {
  name: 'comparison-pane-party',

  components: {
    Swatches,
    EmojiPicker
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        theme: 'glowy',
        source: presets[0],
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
        emojis: []
      },
      presets: presets
    }
  },

  mounted () {
    this.$root.$on('refreshPane', (pane) => {
      if (pane === 'party') {
        this.$store.commit('updateBanner', this.properties)
      }
    })
  },

  methods: {
    validate () {
      if (this.$store.state.child !== 'party') return

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
