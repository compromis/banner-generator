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
      <b-switch v-model="properties.invert">
          Invertir columnes
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
