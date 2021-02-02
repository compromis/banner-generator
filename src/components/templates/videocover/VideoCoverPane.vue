<template>
  <div :class="{ 'pane video-cover-pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Secondary Text  -->
    <c-input-text
      label="Text superior"
      name="textSecondary"
      placeholder="Baldoví"
      v-model="properties.textSecondary"
      :maxlength="20"
    />

    <!-- Secondary Text Color  -->
    <color-selector v-model="properties.textSecondaryColor" />

    <!-- Main Text  -->
    <c-input-text
      label="Text principal"
      name="text"
      type="textarea"
      placeholder="5 tipus de tila que recomanem a Abascal"
      v-model="properties.text"
      :maxlength="40"
    />

    <!-- Text Color  -->
    <color-selector v-model="properties.textColor" />

    <!-- Text size -->
    <c-field label="Tamany del text" class="range-field" compact>
      <range-slider
        name="points"
        :min="85"
        :max="115"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </c-field>

    <!-- Text align -->
    <c-tab-group>
      <c-tab name="text-align" v-model="properties.textAlign" value="left" icon="align-left"></c-tab>
      <c-tab name="text-align" v-model="properties.textAlign" value="center" icon="align-center"></c-tab>
      <c-tab name="text-align" v-model="properties.textAlign" value="right" icon="align-right"></c-tab>
    </c-tab-group>

    <!-- Text position -->
    <c-tab-group>
      <c-tab name="text-pos" v-model="properties.textPos" value="flex-start" icon="arrow-to-top"></c-tab>
      <c-tab name="text-pos" v-model="properties.textPos" value="center" icon="grip-lines"></c-tab>
      <c-tab name="text-pos" v-model="properties.textPos" value="flex-end" icon="arrow-to-bottom"></c-tab>
    </c-tab-group>

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

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

    <!-- Pit against -->
    <c-field>
      <b-switch v-model="properties.pitAgainst">
          Enfrontar imatges
      </b-switch>
    </c-field>

    <!-- Picture to pit against -->
    <transition name="slide">
      <picture-upload
        id="pit-against-picture"
        field-name="pitAgainstPicture"
        label="Segona foto"
        v-if="properties.pitAgainst"
        :picture="properties.pitAgainstPicture"
        :display-errors="displayErrors"
        :errors="errors"
        @upload="(image) => customUpdateImage('pitAgainst', image)"
        @delete="properties.pitAgainstPicture = null; properties.pitAgainstPicturePreview = null">
        <range-slider
          name="points"
          :min="0"
          :max="100"
          v-model="properties.pitAgainstPicturePos"
          @touchstart="dimPane(true)"
          @touchend="dimPane(false)" />
      </picture-upload>
    </transition>

    <!-- Hide frame -->
    <transition name="slide">
      <c-field v-if="aspect === '11'">
        <b-switch v-model="properties.showFrame">
            Marc de color
        </b-switch>
      </c-field>
    </transition>

    <!-- Frame color  -->
    <transition name="slide">
      <color-selector v-if="properties.showFrame || aspect !== 1" v-model="properties.frameColor" label="Color del marc" isRounded />
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import EmojiPicker from '@/components/pane/EmojiPicker'
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'

export default {
  name: 'video-cover-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    CTab,
    CTabGroup
  },

  data () {
    return {
      properties: {
        text: '',
        textPos: 'flex-end',
        textAlign: 'left',
        textPosI: 1,
        textAlignI: 1,
        textSize: 100,
        textColor: 'orange',
        textSecondaryColor: 'white',
        textSecondary: '',
        frameColor: 'orange',
        emojis: [],
        showFrame: true,
        pitAgainst: false,
        pitAgainstPicture: null,
        pitAgainstPicturePreview: null,
        pitAgainstPicturePos: 50,
        pitAgainstPictureAspect: 'horizontal',
        pitAgainstPictureDimensions: null
      }
    }
  },

  methods: {
    validate () {
      this.pictureRequired()

      if (this.properties.pitAgainst) {
        this.fieldRequired({
          pitAgainstPicture: 'Has de seleccionar una foto'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-align-group {
    flex-direction: column;

    .b-tabs {
      margin-bottom: .25rem;
    }
  }
</style>

<style lang="scss">
  .text-align-group .tab-content {
    height: 0;
    padding: 0;
  }
</style>
