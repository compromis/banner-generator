<template>
  <div :class="['pane', 'cards-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <!-- Card title -->
    <c-input-text
      type="textarea"
      label="Títol"
      name="title"
      placeholder="Ajudes a empreses i autònoms"
      v-model="properties.title"
      :maxlength="48" />

    <!-- Cards manager -->
    <cards-manager v-model="properties.cards" />

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Picture -->
    <advanced-picture-upload
      :picture="properties.picture"
      :picture-aspect="properties.pictureAspect"
      :crop="properties.pictureCrop"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="aspectProperties.ratio"
      @upload="updateImage"
      @crop="updateCrop"
      @delete="removeImage">
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" v-if="properties.theme === 'blobless' && properties.picture">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </advanced-picture-upload>

    <!-- Frame color -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect === '11'"
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
import PaneMixin from '@/mixins/pane-mixin'
import EmojiPicker from '@/components/pane/EmojiPicker'
import CardsManager from './CardsManager'

export default {
  name: 'cards-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    CardsManager
  },

  data () {
    return {
      properties: {
        title: '',
        cards: [
          { type: 'emoji', text: '', colspan: 2, rowspan: 1 },
          { type: 'emoji', text: '', colspan: 1, rowspan: 1 },
          { type: 'emoji', text: '', colspan: 3, rowspan: 1 }
        ],
        emojis: [],
        color: 'orange',
        fullGradient: false
      }
    }
  },

  methods: {
    validate () {
      //
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
