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
      <div v-if="(!aspect && !properties.card) || (properties.card)">
        <c-tab-group>
          <c-tab v-model="properties.disposition" value="top" name="disposition">Titular dalt</c-tab>
          <c-tab v-model="properties.disposition" value="bottom" name="disposition">Titular baix</c-tab>
        </c-tab-group>
      </div>
    </transition>

    <!-- Source -->
    <c-select
      name="source"
      label="Font"
      :message="setFieldMessage('source')"
      placeholder="Selecciona una font"
      @input="updateSource"
      :value="properties.source">
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
    </c-select>

    <!-- Other source -->
    <transition name="slide">
      <div v-if="properties.source !== 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content">
            <swatches v-model="properties.customSourceColor"></swatches>
          </div>
        </div>
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
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'

export default {
  name: 'headline-pane',

  components: {
    Swatches,
    EmojiPicker,
    CTab,
    CTabGroup
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
      presets: presets,
      tabp: ''
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
      }

      &-name {
        flex-grow: 1;
        order: 1;
      }
    }
  }
</style>
