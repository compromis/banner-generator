<template>
  <div :class="['pane', 'generic-pane', { 'pane-dimmed': paneDimmed }]">
    <!-- Theme selector -->

    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="48152342 usuaris de bicicleta en 2023"
      v-model="properties.text"
      :maxlength="100"
      :message="setFieldMessage('text')"
      class="source-input-name" />

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

    <c-field edge>
      <button @click="randomizeSeal" class="c-button" style="display: flex; align-items: center;">
        <font-awesome-icon :icon="['far', 'dice-d20']" class="icon mr-2" /> Reposiciona el segell
      </button>
    </c-field>

    <!-- Dark mode -->
    <transition name="slide">
      <color-selector
        v-model="properties.mode"
        :colors="['vlc-green', 'vlc-blue', 'vlc-red', 'vlc-yellow', 'vlc-orange']"
        label="Color de fons"
        is-rounded />
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'

export default {
  name: 'vlc-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        text: '',
        textSize: 100,
        mode: 'vlc-green',
        sealPosition: 'random',
        sealPositions: [
          { top: '-20px', left: '-20px' },
          { top: '-20px', left: '40px' },
          { top: '-20px', left: '440px' },
          { top: '-20px', left: '490px' },
          { top: 'unset', bottom: '-20px', left: '490px' },
          { top: 'unset', bottom: '-20px', left: '440px' },
          { top: 'unset', bottom: '-20px', left: '40px' },
          { top: 'unset', bottom: '-20px', left: '20px' },
          { top: 'unset', bottom: '40px', left: '-20px' },
          { top: 'unset', bottom: '80px', left: '-20px' },
          { top: '40px', left: '-20px' },
          { top: '120px', left: '-20px' },
          { top: '40px', left: '490px' },
          { top: '120px', left: '490px' }
        ]
      }
    }
  },

  methods: {
    validate () {
      this.pictureRequired()
    },

    randomizeSeal () {
      this.properties.sealPosition = Math.floor(Math.random() * (this.properties.sealPositions.length - 1))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "colors";

  .message-body {
    font-size: .85rem;
  }

  @each $name, $color in $colors {
    .pane::v-deep .vlc-#{$name}-bg {
      background: $color;
    }
  }
</style>
