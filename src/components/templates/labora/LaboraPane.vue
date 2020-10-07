<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Language -->
    <c-select label="Idioma" v-model="properties.lang" expanded>
        <option value="val">Valencià</option>
        <option value="cas">Castellà</option>
    </c-select>

    <!-- Municipality -->
    <c-input-text
      label="Nom del poble"
      name="municipality"
      placeholder="Alzira"
      v-model="properties.municipality"
      :message="setFieldMessage('municipality')"
      :maxlength="40" />

    <!-- Amount -->
    <c-input-text
      label="Quantitat"
      name="amount"
      placeholder="30 milions"
      v-model="properties.amount"
      :message="setFieldMessage('amount')"
      :maxlength="14" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :display-errors="false"
      :errors="{}"
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
  name: 'labora-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        lang: 'val',
        municipality: '',
        amount: ''
      }
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        municipality: "Has d'escriure un poble",
        amount: "Has d'escriure una quantitat"
      })
      this.allCapsDisallowed('municipality')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
