<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Style -->
    <b-field label="Estil">
      <b-tabs
        id="style-tabs"
        type="is-toggle"
        size="is-small"
        v-model="properties.card"
        class="tabs-field"
        expanded>
        <b-tab-item label="Fons blanc"></b-tab-item>
        <b-tab-item label="Fons imatge"></b-tab-item>
      </b-tabs>
    </b-field>

    <!-- Disposition -->
    <transition name="slide">
      <b-field label="Posició de la frase" v-if="!aspect">
        <b-tabs type="is-toggle" size="is-small" v-model="properties.disposition" class="tabs-field" expanded>
          <b-tab-item label="Frase esquerra"></b-tab-item>
          <b-tab-item label="Frase dreta"></b-tab-item>
        </b-tabs>
      </b-field>
    </transition>

    <!-- Quote -->
    <b-field
      label="Frase"
      :type="setFieldType('quote')"
      :message="setFieldMessage('quote')">
      <b-input
        type="textarea"
        placeholder="Tenim de 30 a 50 ciclistes passant cada segon pel carril bici."
        v-model="properties.quote"
        maxlength="140">
      </b-input>
    </b-field>

    <!-- Author -->
    <b-field
      label="Autor i/o mitjà"
      :type="setFieldType('author')"
      :message="setFieldMessage('author')">
      <b-input
        type="textarea"
        class="textarea-small"
        placeholder="Giuseppe Grezzi a l'entrevista de La Sexta"
        v-model="properties.author"
        maxlength="70">
      </b-input>
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
  name: 'quote-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        quote: '',
        author: ''
      }
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
</style>
