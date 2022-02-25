<template>
  <div :class="['pane', 'headline-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

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
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
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

    <!-- Disposition -->
    <c-tab-group>
      <c-tab v-model="properties.disposition" value="top" name="disposition">Titular dalt</c-tab>
      <c-tab v-model="properties.disposition" value="bottom" name="disposition">Titular baix</c-tab>
    </c-tab-group>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Picture -->
    <picture-upload
      id="picture-field"
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="properties.picture = null; properties.picturePreview = ''">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" v-if="properties.theme === 'blobless'">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </picture-upload>

    <!-- Frame color  -->
    <color-selector
      v-model="properties.color"
      :colors="availableColors[properties.theme]"
      label="Color accent"
      is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect !== '916'"
        label="Hashtag"
        name="hashtag"
        placeholder="#"
        @input="updateHashtag"
        :value="properties.hashtag"
        :maxlength="properties.localLabel ? 22 : 32"
        :message="setFieldMessage('hashtag')" />
    </transition>

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

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
import presets from './presets'
import Swatches from 'vue-swatches'
import EmojiPicker from '@/components/pane/EmojiPicker'
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'
import ThemeSelector from '@/components/pane/ThemeSelector'

export default {
  name: 'headline-pane',

  components: {
    Swatches,
    EmojiPicker,
    CTab,
    CTabGroup,
    ThemeSelector
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        disposition: 'bottom',
        headline: '',
        source: null,
        customSource: '',
        customSourceColor: '#1CA085',
        emojis: [],
        color: 'orange',
        fullGradient: false
      },
      presets: presets
    }
  },

  computed: {
    presetsByName () {
      const presetsByName = [...this.presets]
      return presetsByName.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    },

    availableThemes () {
      const themes = {
        11: ['glowy', 'blobs', 'blobless'],
        916: ['glowy', 'blobs', 'blobless'],
        169: ['blobs', 'blobless']
      }

      return themes[this.aspect]
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
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

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
