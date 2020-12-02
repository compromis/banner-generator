<template>
  <div :class="{ 'pane christmas-pane': true, 'pane-916': aspect === 1 }">
    <!-- Language -->
    <c-select label="Idioma" name="lang" v-model="properties.lang" expanded>
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
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'

export default {
  name: 'christmas-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        lang: 'val',
        municipality: ''
      }
    }
  },

  methods: {
    validate () {
      this.pictureRequired()
      this.fieldRequired({
        municipality: "Has d'escriure un poble"
      })
      this.allCapsDisallowed('municipality')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

</style>
