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
      placeholder="300.000"
      v-model="properties.amount"
      :message="setFieldMessage('amount')"
      :maxlength="14" />

    <div class="c-field c-field-content">
      <a href="https://comprom.is/Fc1U610" target="_blank" class="c-field-help">
        <font-awesome-icon :icon="['far', 'question-circle']" />
        Consulta la quantitat que correspon al teu poble</a>
    </div>

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="false"
      :errors="{}"
      @upload="updateImage"
      @delete="removeImage">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </picture-upload>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'

export default {
  name: 'ivace-pane',

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
.c-field-help {
  display: flex;
  align-items: center;
  line-height: 1;

  svg {
    margin-right: .5rem;
  }
}
</style>
