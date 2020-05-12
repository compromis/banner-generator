<template>
  <div :class="{ 'pane video-cover-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Text -->
    <div class="text-wrapper">
      <!-- Secondary Text  -->
      <b-field label="Text Superior">
        <b-input placeholder="Baldoví" v-model="properties.textSecondary" maxlength="25"></b-input>
      </b-field>

      <!-- Secondary Text Color  -->
      <color-selector v-model="properties.textSecondaryColor" />
      <!-- Main Text  -->
      <b-field label="Text Principal">
        <b-input type="textarea" placeholder="Cinc tipus de tila que des de Compromís recomanem a Abascal" v-model="properties.text" maxlength="100"></b-input>
      </b-field>

      <!-- Text Color  -->
      <color-selector v-model="properties.textColor" />

      <!-- Text align -->
      <b-field label="Alineació del text" class="text-align-group">
        <b-tabs @change="updateTextAlign" :value="1" class="text-align" type="is-toggle" size="is-small" expanded>
          <b-tab-item icon="align-left"></b-tab-item>
          <b-tab-item icon="align-center"></b-tab-item>
          <b-tab-item icon="align-right"></b-tab-item>
        </b-tabs>

        <!-- Text position -->
        <b-tabs @change="updateTextPosition" :value="1" class="text-position" type="is-toggle" size="is-small" expanded>
          <b-tab-item icon="arrow-to-top"></b-tab-item>
          <b-tab-item icon="grip-lines"></b-tab-item>
          <b-tab-item icon="arrow-to-bottom"></b-tab-item>
        </b-tabs>
      </b-field>

      <!-- Text size -->
      <b-field label="Tamany del text" class="range">
        <range-slider
          name="points"
          :min="75"
          :max="125"
          v-model="properties.textSize"
          @touchstart="dimPane(true)"
          @touchend="dimPane(false)" />
      </b-field>
    </div>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="properties.picture = null; properties.picturePreview = null" />

    <!-- Picture position -->
    <b-field label="Posició de la imatge" class="range">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- Frame color  -->
    <color-selector v-model="properties.frameColor" label="Color del marc" isRounded />
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import ColorSelector from '@/utils/ColorSelector'
import EmojiPicker from '@/utils/EmojiPicker'

export default {
  name: 'video-cover-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        text: '',
        textPos: 'center',
        textAlign: 'center',
        textPosI: 1,
        textAlignI: 1,
        textSize: 100,
        textColor: 'black',
        textSecondaryColor: 'black',
        textSecondary: '',
        frameColor: 'black',
        emojis: []
      }
    }
  },

  components: {
    ColorSelector,
    EmojiPicker
  },

  methods: {
    validate () {
      this.pictureRequired()
    },

    updateTextAlign (i) {
      const values = ['left', 'center', 'right']
      this.properties.textAlign = values[i]
    },

    updateTextPosition (i) {
      const values = ['flex-start', 'center', 'flex-end']
      this.properties.textPos = values[i]
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

  .hashtag {
    margin-top: .25rem;
  }

  .local-label {
    margin-top: .75rem;
  }

  .message-body {
    font-size: .85rem;
  }

  .pane-916 {
    display: flex;
    flex-direction: column;

    .text-wrapper {
      order: 1;
    }
  }
</style>

<style lang="scss">
  .text-align-group .tab-content {
    height: 0;
    padding: 0;
  }
</style>
