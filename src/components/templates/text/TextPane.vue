<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
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
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="properties.picture = null; properties.picturePreview = null">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <c-field v-if="properties.theme === 'blobless'" class="blobless-gradient-option">
      <b-switch v-model="properties.fullGradient">
        Degradat sobre tota la imatge
      </b-switch>
    </c-field>

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
        :maxlength="properties.localLabel ? 18 : 32"
        :message="setFieldMessage('hashtag')" />
    </transition>

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspectKey != '916'"
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
        event: ['blobs', 'blobless']
      }

      return themes[this.aspectKey]
    }
  },

  methods: {
    validate () {
      this.pictureRequired()
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
