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

    <!-- Has custom message -->

    <!-- Picture -->
    <transition name="slide">
      <picture-upload
        :picture="properties.picture"
        :preview="properties.picturePreview"
        :display-errors="displayErrors"
        :errors="errors"
        :ratio="1.86"
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
      </transition>

      <!-- Has custom message -->
      <c-field>
        <b-switch v-model="properties.hasCustomMessage">
          Missatge personalitzat
        </b-switch>
      </c-field>

    <transition name="slide">
      <!-- Custom message -->
      <c-input-text
        v-if="properties.hasCustomMessage"
        type="textarea"
        label="Missatge"
        name="text"
        placeholder="T'estime tant que enguany em quede a casa"
        v-model="properties.customMessage"
        :maxlength="60"
        :message="setFieldMessage('customMessage')" />
    </transition>
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
        hasCustomMessage: false,
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
  @import "../../../sass/variables";

</style>
