<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" />

    <!-- Quote -->
    <c-input-text
      label="Cita"
      name="quote"
      type="textarea"
      placeholder="Tenim de 30 a 50 ciclistes passant cada segon pel carril bici."
      v-model="properties.quote"
      :maxlength="140"
      :message="setFieldMessage('quote')" />

    <c-tab-group>
      <c-tab v-model="properties.disposition" value="left" name="disposition" icon="align-left"></c-tab>
      <c-tab v-model="properties.disposition" value="right" name="disposition" icon="align-right"></c-tab>
    </c-tab-group>

    <!-- Text color -->
    <color-selector label="Color del text" v-model="properties.textColor" :colors="['black', 'white', 'orange']" />

    <!-- Author -->
    <c-input-text
      label="Autor i/o mitjà"
      name="author"
      type="textarea"
      class="textarea-small"
      placeholder="Giuseppe Grezzi a l'entrevista de La Sexta"
      v-model="properties.author"
      :maxlength="70"
      :message="setFieldMessage('author')" />

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
    <color-selector v-model="properties.color" :colors="properties.theme === 'glowy' ? ['none', 'orange', 'lgbt', 'feminism', 'green'] : ['orange', 'lgbt', 'feminism', 'green']" label="Color" is-rounded />

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
import PaneMixin from '@/mixins/pane-mixin.js'
import ThemeSelector from '@/components/pane/ThemeSelector'
import ColorSelector from '@/components/pane/ColorSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'quote-pane',

  mixins: [PaneMixin],

  components: {
    ThemeSelector,
    ColorSelector,
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        quote: '',
        author: '',
        textColor: 'white',
        color: 'orange',
        disposition: 'left'
      }
    }
  },

  // Prevent white text on no-cards
  // when user transitions from white text on cards to no-cards
  watch: {
    properties: {
      handler: function (props) {
        if (props.card === 0 && props.textColor === 'white') {
          this.properties.textColor = 'orange'
        }
      },
      deep: true
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        quote: "Has d'escirure una cita",
        author: "Has d'escriure un autor"
      })
      this.pictureRequired()
      this.allCapsDisallowed('quote', 'author')
    }
  }
}
</script>

<style lang="scss" scoped>
  .local-label {
    margin-top: .75rem;
  }

  .color-selector {
    margin-bottom: 1.5rem;
    margin-top: 2rem;
  }
</style>
