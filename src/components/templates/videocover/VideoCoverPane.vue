<template>
  <div :class="{ 'pane video-cover-pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Secondary Text  -->
    <c-input-text
      label="Text superior"
      name="textSecondary"
      placeholder="Baldoví"
      v-model="properties.textSecondary"
      :max-length="25"
    />

    <!-- Secondary Text Color  -->
    <color-selector v-model="properties.textSecondaryColor" />

    <!-- Main Text  -->
    <c-input-text
      label="Text principal"
      name="text"
      type="textarea"
      placeholder="Cinc tipus de tila que des de Compromís recomanem a Abascal"
      v-model="properties.text"
      :max-length="70"
    />

    <!-- Text Color  -->
    <color-selector v-model="properties.textColor" />

    <!-- Text size -->
    <c-field label="Tamany del text" class="range" compact>
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </c-field>

    <!-- Text position -->
    <c-tab-group>
      <c-tab name="text-pos" v-model="properties.textPos" value="flex-start" icon="arrow-to-top"></c-tab>
      <c-tab name="text-pos" v-model="properties.textPos" value="center" icon="grip-lines"></c-tab>
      <c-tab name="text-pos" v-model="properties.textPos" value="flex-end" icon="arrow-to-bottom"></c-tab>
    </c-tab-group>

    <!-- Text align -->
    <c-tab-group>
      <c-tab name="text-align" v-model="properties.textAlign" value="left" icon="align-left"></c-tab>
      <c-tab name="text-align" v-model="properties.textAlign" value="center" icon="align-center"></c-tab>
      <c-tab name="text-align" v-model="properties.textAlign" value="right" icon="align-right"></c-tab>
    </c-tab-group>

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
    <color-selector v-model="properties.frameColor" label="Color del marc" isRounded />
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import ColorSelector from '@/components/pane/ColorSelector'
import EmojiPicker from '@/components/pane/EmojiPicker'
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'
import CField from '@/components/pane/CField'

export default {
  name: 'video-cover-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        text: '',
        textPos: 'flex-end',
        textAlign: 'left',
        textPosI: 1,
        textAlignI: 1,
        textSize: 100,
        textColor: 'orange',
        textSecondaryColor: 'white',
        textSecondary: '',
        frameColor: 'orange',
        emojis: []
      }
    }
  },

  components: {
    ColorSelector,
    EmojiPicker,
    CTab,
    CTabGroup,
    CField
  },

  methods: {
    validate () {
      this.pictureRequired()
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-align-group {
    flex-direction: column;

    .b-tabs {
      margin-bottom: .25rem;
    }
  }
</style>

<style lang="scss">
  .text-align-group .tab-content {
    height: 0;
    padding: 0;
  }
</style>
