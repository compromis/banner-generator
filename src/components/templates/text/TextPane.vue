<template>
  <div :class="['pane', 'text-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

    <c-field label="Contingut" edge>
      <vue-editor v-model="properties.text" :editor-toolbar="customToolbar" />
    </c-field>

     <!-- Disposition -->
    <transition name="slide">
      <c-tab-group v-if="properties.theme !== 'glowy'">
        <c-tab v-model="properties.disposition" value="top" name="disposition">Text dalt</c-tab>
        <c-tab v-model="properties.disposition" value="bottom" name="disposition">Text baix</c-tab>
      </c-tab-group>
    </transition>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="removeImage">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <range-slider
        v-if="advancedImageCropping"
        label="Eix 2"
        name="picturePosAlt"
        :min="-25"
        :max="25"
        v-model="properties.picturePosAlt"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <range-slider
        v-if="advancedImageCropping"
        name="pictureZoom"
        label="Escala"
        :min="100"
        :max="300"
        v-model="properties.pictureZoom"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <transition name="slide">
        <b-switch v-if="properties.theme === 'blobless' && properties.picture" v-model="properties.fullGradient">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect != '916'"
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
        v-if="aspect != '916'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import PaneMixin from '@/mixins/pane-mixin.js'
import EmojiPicker from '@/components/pane/EmojiPicker'
import ThemeSelector from '@/components/pane/ThemeSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'text-pane',

  mixins: [PaneMixin],

  components: {
    VueEditor,
    EmojiPicker,
    ThemeSelector,
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        text: '',
        emojis: [],
        disposition: 'bottom',
        color: 'orange',
        fullGradient: false
      },
      customToolbar: [
        [{ header: 1 }, { header: 2 }],
        ['bold', 'underline'],
        [{ list: 'check' }, { list: 'bullet' }, { list: 'ordered' }]
      ]
    }
  },

  computed: {
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
      if (this.properties.theme !== 'blobless') {
        this.pictureRequired()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .pane {
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border: 0;
    }

    .ql-editor {
      border-top: 1px solid $gray-200;
    }
  }
</style>
