<template>
  <div :class="{ 'pane christmas-pane': true, 'pane-916': aspect === 1 }">
    <!-- Language -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Bones festes!"
      v-model="properties.text"
      :maxlength="20"
      :message="setFieldMessage('text')" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="1.86"
      @upload="updateImage"
      @delete="removeImage">
        <range-slider
          name="points"
          :min="0"
          :max="100"
          v-model="properties.picturePos"
          @touchstart="dimPane(true)"
          @touchend="dimPane(false)" />
        <b-switch v-model="properties.colorsFromPicture">
          Colors de la imatge
        </b-switch>
    </picture-upload>

    <c-input-text
      type="textarea"
      label="Missatge"
      name="text"
      placeholder="Us destigem molt bones festes i bon 2024"
      v-model="properties.customMessage"
      :maxlength="60"
      :message="setFieldMessage('customMessage')" />

    <!-- Municipality -->
    <c-input-text
      label="Nom del poble"
      name="municipality"
      placeholder="Xixona"
      v-model="properties.municipality"
      :message="setFieldMessage('municipality')"
      :maxlength="30" />
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'

export default {
  name: 'christmas-greetings-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        text: 'Bones festes!',
        municipality: '',
        colorsFromPicture: true,
        customMessage: ''
      }
    }
  },

  methods: {
    validate () {
      if (this.properties.hasCustomMessage) {
        this.fieldRequired({
          customMessage: "Has d'escriure un missatge"
        })
        this.allCapsDisallowed('customMessage')
      } else {
        this.fieldRequired({
          municipality: "Has d'escriure un poble"
        })
        this.allCapsDisallowed('municipality')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";

</style>
