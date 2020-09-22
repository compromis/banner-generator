<template>
  <div :class="{ 'pane headline-pane': true, 'pane-dimmed': paneDimmed }">
    <b-field>
      <b-tabs
        id="style-tabs"
        type="is-toggle"
        size="is-small"
        v-model="properties.theme"
        class="tabs-field"
        expanded>
        <b-tab-item label="Fons imatge"></b-tab-item>
        <b-tab-item label="Targeta"></b-tab-item>
      </b-tabs>
    </b-field>

    <!-- Disposition -->
    <transition name="slide">
      <b-field v-if="(!aspect && !properties.card) || (properties.card)">
        <b-tabs
          id="disposition-tabs"
          type="is-toggle"
          size="is-small"
          v-model="properties.disposition"
          class="tabs-field"
          expanded>
          <b-tab-item label="Titular baix"></b-tab-item>
          <b-tab-item label="Titular dalt"></b-tab-item>
        </b-tabs>
      </b-field>
    </transition>

    <!-- Source -->
    <b-field
      id="source-field"
      label-position="inside"
      label="Font"
      label-for="font"
      :type="setFieldType('source')"
      :message="setFieldMessage('source')">
      <b-select placeholder="Selecciona un diari" @input="updateSource" expanded>
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

    <!-- Other source -->
    <transition name="slide">
      <div v-if="properties.source === 'other'" class="source-input-group">
        <b-field
          class="source-input-name"
          label="Mitjà de comunicació"
          :type="setFieldType('customSource')"
          :message="setFieldMessage('customSource')">
          <b-input placeholder="La Veu" v-model="properties.customSource"></b-input>
        </b-field>
        <b-field label="Color" class="source-input-color">
          <swatches v-model="properties.customSourceColor"></swatches>
        </b-field>
      </div>
    </transition>

    <!-- Headline -->
    <c-input-text
      label="Titular"
      name="headline"
      type="textarea"
      placeholder="L'ús de la bici està per damunt de 9000..."
      v-model="properties.headline"
      maxlength="160"
      :message="setFieldMessage('headline')" />

    <b-field
      label-position="inside"
      label-for="headline-input"
      id="headline-field"
      label="Titular"
      :type="setFieldType('headline')"
      :message="setFieldMessage('headline')">
      <b-input
        type="textarea"
        placeholder="L'ús de la bici està per damunt de 9000..."
        v-model="properties.headline"
        maxlength="160"
        id="headline-input">
      </b-input>
    </b-field>

    <!-- Emoji picker -->
    <transition name="slide">
      <emoji-picker v-model="properties.emojis" v-if="properties.card === 1" />
    </transition>

    <!-- Picture -->
    <picture-upload
      id="picture-field"
      :picture="properties.picture"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="properties.picture = null; properties.picturePreview = null" />

    <!-- Picture position -->
    <b-field id="picture-position-field" label="Posició de la imatge" class="range">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="!aspect"
        label="Hashtag"
        name="hashtag"
        placeholder="#"
        @input="updateHashtag"
        :value="properties.hashtag"
        :maxlength="properties.hasLocalLabel ? 18 : 32"
        :message="setFieldMessage('hashtag')" />
    </transition>

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
import EmojiPicker from '@/components/pane/EmojiPicker'

export default {
  name: 'headline-pane',

  components: {
    Swatches,
    EmojiPicker
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        headline: '',
        source: null,
        customSource: '',
        customSourceColor: '#1CA085',
        emojis: []
      },
      presets: presets
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
      this.pictureRequired()
      this.allCapsDisallowed('headline')
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

  .headline-pane {
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
  }
</style>
