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

    <!-- Abstain column -->
    <c-select label="Abstenció en columna de..." name="abstainCol" v-model="properties.abstainColumn">
      <option value="for">🟢 A favor</option>
      <option value="against">🔴 En contra</option>
    </c-select>

    <!-- Invert -->
    <c-field>
      <b-switch v-model="properties.inverted">
          Invertir columnes
      </b-switch>
      <b-switch v-model="properties.partyTotals">
          Mostrar total de vots de partits
      </b-switch>
    </c-field>

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
import parties from './parties.js'
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
          { party: parties[0], voted: 'for', votes: '3' }
        ],
        inverted: false,
        partyTotals: false,
        abstainColumn: 'against',
        emojis: [],
        color: 'orange'
      }
    }
  },

  methods: {
    validate () {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
