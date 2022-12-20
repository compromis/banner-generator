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
      placeholder="Xixona"
      v-model="properties.municipality"
      :message="setFieldMessage('municipality')"
      :maxlength="30" />

    <!-- Picture -->
    <advanced-picture-upload
      :picture="properties.picture"
      :picture-aspect="properties.pictureAspect"
      :crop="properties.pictureCrop"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="aspectProperties.ratio"
      @upload="updateImage"
      @crop="updateCrop"
      @delete="removeImage" />

    <!-- Custom message -->
    <c-input-text
      type="textarea"
      label="Missatge"
      name="text"
      placeholder="Des d'Alacant et desitgem..."
      v-model="properties.customMessage"
      :maxlength="60"
      :message="setFieldMessage('customMessage')" />
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
        lang: 'val',
        municipality: '',
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
