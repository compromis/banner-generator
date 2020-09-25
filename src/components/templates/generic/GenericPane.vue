<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" />

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

    <!-- Text align -->
    <c-tab-group>
      <c-tab v-model="properties.textAlign" value="left" name="textAlign" icon="align-left"></c-tab>
      <c-tab v-model="properties.textAlign" value="center" name="textAlign" icon="align-center"></c-tab>
      <c-tab v-model="properties.textAlign" value="right" name="textAlign" icon="align-right"></c-tab>
    </c-tab-group>

    <!-- Text vertical align -->
    <c-tab-group>
      <c-tab v-model="properties.textPos" value="flex-start" name="textPos" icon="arrow-to-top"></c-tab>
      <c-tab v-model="properties.textPos" value="center" name="textPos" icon="grip-lines"></c-tab>
      <c-tab v-model="properties.textPos" value="flex-end" name="textPos" icon="arrow-to-bottom"></c-tab>
    </c-tab-group>

    <!-- Text Color -->
    <color-selector label="Color del text" v-model="properties.textColor" />

    <!-- Text size -->
    <c-field label="Tamany del text">
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </c-field>

    <article class="message is-info is-small" v-if="aspect === 1">
      <div class="message-body">
        Es recomana utilitzar la ferramenta de text nativa d'Instragram per a afegir text en aquest model de tarja.
      </div>
    </article>

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

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="!aspect"
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
        v-if="!aspect"
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
import ColorSelector from '@/components/pane/ColorSelector'
import ThemeSelector from '@/components/pane/ThemeSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'
import CField from '@/components/pane/CField'

export default {
  name: 'generic-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    ColorSelector,
    ThemeSelector,
    CTabGroup,
    CTab,
    CField
  },

  data () {
    return {
      properties: {
        text: '',
        textPos: 'center',
        textAlign: 'center',
        textPosI: 1,
        textAlignI: 1,
        textSize: 100,
        emojis: [],
        textColor: 'black'
      }
    }
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

  .hashtag {
    margin-top: .25rem;
  }

  .local-label {
    margin-top: .75rem;
  }

  .message-body {
    font-size: .85rem;
  }

  .color-selector {
    margin-bottom: 1.5rem;
    margin-top: 2rem;
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
