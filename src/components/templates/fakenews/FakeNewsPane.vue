<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Text -->
    <b-field
      label="Realitat"
      :type="setFieldType('text')"
      :message="setFieldMessage('text')">
      <b-input
        type="textarea"
        placeholder="Açò és fals perquè..."
        v-model="properties.text"
        maxlength="140">
      </b-input>
    </b-field>

    <b-field label="Segell">
        <b-select placeholder="Segells" v-model="properties.stamp" expanded>
            <option value="FALS">FALS</option>
            <option value="FALSO">FALSO</option>
            <option value="BULO">BULO</option>
            <option value="FAKE">FAKE</option>
        </b-select>
    </b-field>

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

    <!-- Hashtag -->
    <transition name="slide">
      <b-field label="Hashtag" v-if="!aspect">
        <b-input
          placeholder="#"
          @input="updateHashtag"
          :value="properties.hashtag"
          :maxlength="25">
        </b-input>
      </b-field>
    </transition>

    <!-- Local label -->
    <transition name="slide">
      <div v-if="!aspect" class="field">
        <b-switch v-model="properties.hasLocalLabel">
          Afegir text al logo
        </b-switch>
        <transition name="slide">
          <div v-if="properties.hasLocalLabel" class="local-label">
            <b-field>
              <b-input placeholder="Alacant" v-model="properties.localLabel" maxlength="48"></b-input>
            </b-field>
          </div>
        </transition>
      </div>
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
