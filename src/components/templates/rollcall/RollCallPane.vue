<template>
  <div :class="['pane', 'rollcall-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <!-- Card title -->
    <c-input-text
      type="textarea"
      label="Títol"
      name="title"
      placeholder="Ajudes a empreses i autònoms"
      v-model="properties.title"
      :maxlength="48" />

    <!-- Cards manager -->
    <roll-call-manager v-model="properties.parties" />

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
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
import RollCallManager from './RollCallManager'

export default {
  name: 'roll-call-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    RollCallManager
  },

  data () {
    return {
      properties: {
        title: '',
        parties: [
          { id: 'compromis', voted: 'for', votes: 3 }
          // { id: 'custom', voted: 'against', votes: 2, custom: { name: '', color: '' }}
        ],
        emojis: [],
        color: 'orange'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
