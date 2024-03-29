<template>
  <div :class="['pane', 'milestone-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <c-tab-group>
      <c-tab v-model="properties.style" value="transparent" name="style">Transparent</c-tab>
      <c-tab v-model="properties.style" value="card" name="style">Targeta</c-tab>
    </c-tab-group>

    <!-- Text -->
    <c-input-text
      label="Text superior"
      name="overtitle"
      placeholder="Educació"
      v-model="properties.overtitle"
      :maxlength="50"
      :message="setFieldMessage('overtitle')" />

    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Nou pla per afegir més personal docent"
      v-model="properties.text"
      :maxlength="100"
      :message="setFieldMessage('text')" />

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

    <div class="icon-wrapper">
      <!-- Icon -->
      <c-select label="Icona" placeholder="Aconseguiment" name="icon" v-model="properties.icon" expanded>
        <option value="check">✅</option>
        <option value="times">❌</option>
      </c-select>

      <!-- Icon text -->
      <c-input-text
        label="Text de la icona"
        name="iconText"
        placeholder="Aprovat"
        v-model="properties.iconText"
        :maxlength="12"
        :message="setFieldMessage('iconText')" />
    </div>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

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
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" v-if="properties.theme === 'blobless' && properties.picture">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </advanced-picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <!-- Dark mode -->
    <transition name="slide">
      <color-selector
        v-if="properties.style === 'card'"
        v-model="properties.mode"
        :colors="['white', 'black']"
        label="Color de la targeta"
        is-rounded />
    </transition>

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect === '11'"
        label="Hashtag"
        name="hashtag"
        placeholder="#"
        @input="updateHashtag"
        :value="properties.hashtag"
        :maxlength="properties.localLabel ? 22 : 32"
        :message="setFieldMessage('hashtag')" />
    </transition>

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspect === '11'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import EmojiPicker from '@/components/pane/EmojiPicker'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'milestone-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        style: 'card',
        theme: 'blobless',
        overtitle: '',
        text: '',
        color: 'orange',
        textSize: 100,
        emojis: [],
        icon: 'check',
        iconText: 'Aprovat'
      }
    }
  },

  methods: {
    validate () {
      this.fieldRequired({ text: "Has d'escriure un text" })
      this.pictureRequired()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../sass/variables';

  .icon-wrapper {
    display: flex;

    .c-field:first-child {
      border-right: 1px $gray-300 solid;
      width: 70px;
    }

    .c-field:last-child {
      flex-grow: 1;
    }
  }
</style>
