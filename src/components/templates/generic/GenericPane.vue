<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

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
    <transition name="slide">
      <color-selector
        v-if="properties.theme !== 'blobless' || !properties.fullGradient"
        v-model="properties.textColor" />
    </transition>

    <!-- Text size -->
    <c-field label="Tamany del text" class="range-field" compact>
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <article class="message is-info is-small" v-if="aspect === '11'">
        <div class="message-body">
          Es recomana utilitzar la ferramenta de text nativa d'Instragram per a afegir text en aquest model de tarja.
        </div>
      </article>
    </c-field>

    <c-field>
      <b-switch v-model="properties.hasSecondaryText">
        Afegeix text secundari
      </b-switch>
    </c-field>

    <transition name="slide">
      <c-input-text
        v-if="properties.hasSecondaryText"
        type="textarea"
        label="Text secundari"
        name="secondary-text"
        placeholder=""
        v-model="properties.secondaryText"
        :maxlength="100"
        :message="setFieldMessage('secondaryText')" />
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
      <b-switch v-if="properties.theme === 'blobless' && properties.picture" v-model="properties.fullGradient">
        Degradat sobre tota la imatge
      </b-switch>
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <!-- Dark mode -->
    <transition name="slide">
      <color-selector
        v-if="properties.theme === 'glowy'"
        v-model="properties.mode"
        :colors="['white', 'black']"
        label="Color de fons"
        is-rounded />
    </transition>

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
import ThemeSelector from '@/components/pane/ThemeSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'generic-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    ThemeSelector,
    CTabGroup,
    CTab
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
        hasSecondaryText: false,
        secondaryText: '',
        emojis: [],
        textColor: 'white',
        color: 'orange',
        fullGradient: false
      }
    }
  },

  computed: {
    availableThemes () {
      const themes = {
        11: ['glowy', 'blobs', 'blobless'],
        916: ['glowy', 'blobs', 'blobless'],
        event: ['blobs', 'blobless']
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

<style lang="scss" scoped>
  .message-body {
    font-size: .85rem;
  }
</style>
