<template>
  <div :class="{ 'pane fake-news-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Text -->
    <c-input-text
      label="Realitat"
      name="text"
      type="textarea"
      placeholder="Açò és fals perquè..."
      v-model="properties.text"
      :maxlength="140"
      :message="setFieldMessage('text')" />

    <!-- Stamp -->
    <c-select label="Segell" placeholder="Segells" name="stamp" v-model="properties.stamp" expanded>
      <option value="FALS">FALS</option>
      <option value="FALSO">FALSO</option>
      <option value="BULO">BULO</option>
      <option value="FAKE">FAKE</option>
    </c-select>

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

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      label="Color de fons"
      is-rounded />

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

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

export default {
  name: 'fakenews-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        text: '',
        stamp: 'FALS'
      }
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        text: "Has d'escriure un text"
      })
      this.pictureRequired()
      this.allCapsDisallowed('text')
    }
  }
}
</script>

<style lang="scss" scoped>
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
