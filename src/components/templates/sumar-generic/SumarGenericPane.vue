<template>
  <div :class="['pane', 'speakers-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="48152342 usuaris de bicicleta en 2023"
      v-model="properties.text"
      :maxlength="100"
      :message="setFieldMessage('text')"
      class="source-input-name" />

    <!-- Text size -->
    <c-field label="Tamany del text" class="range-field" compact>
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </c-field>

    <c-field>
      <b-switch v-model="properties.hasSecondaryText">
        Afegeix text secundari
      </b-switch>
    </c-field>

    <transition name="slide">
      <c-input-text
        v-if="properties.hasSecondaryText"
        type="textarea"
        label="Text secundari"
        name="secondary-text"
        placeholder=""
        v-model="properties.secondaryText"
        :maxlength="100"
        :message="setFieldMessage('secondaryText')" />
    </transition>

    <!-- Text align -->
    <c-tab-group>
      <c-tab v-model="properties.textAlign" value="left" name="textAlign" icon="align-left"></c-tab>
      <c-tab v-model="properties.textAlign" value="center" name="textAlign" icon="align-center"></c-tab>
      <c-tab v-model="properties.textAlign" value="right" name="textAlign" icon="align-right"></c-tab>
    </c-tab-group>

    <!-- Text vertical align -->
    <c-tab-group>
      <c-tab v-model="properties.textPos" value="flex-start" name="textPos" icon="arrow-to-top"></c-tab>
      <c-tab v-model="properties.textPos" value="center" name="textPos" icon="grip-lines"></c-tab>
      <c-tab v-model="properties.textPos" value="flex-end" name="textPos" icon="arrow-to-bottom"></c-tab>
    </c-tab-group>

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
      @delete="removeImage">
    </advanced-picture-upload>

    <!-- Color predominance -->
    <color-selector label="Color text" v-model="properties.firstColor" :colors="['sumar-orange','sumar-fuchsia']" />

    <!-- Color predominance
    <color-selector label="Color de fons" v-model="properties.backgroundColor" :colors="['sumar-orange','sumar-fuchsia', 'white']" is-rounded /> -->
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import ColorSelector from '@/components/pane/ColorSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  mixins: [PaneMixin],

  components: {
    ColorSelector,
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        text: '',
        firstColor: 'sumar-orange',
        backgroundColor: 'white',
        hasSecondaryText: false,
        secondaryText: '',
        textPos: 'flex-start',
        textAlign: 'left'
      }
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        text: "Has d'escriure un text"
      })
      this.allCapsDisallowed('text', 'secondaryText')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .local-label {
    margin-top: .75rem;
  }
</style>
