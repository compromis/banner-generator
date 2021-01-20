<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="['blobs', 'blobless']" />

    <!-- Chart data input -->
    <chart-data v-model="properties.chart" />

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

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <c-field v-if="properties.theme === 'blobless'" class="blobless-gradient-option">
      <b-switch v-model="properties.fullGradient">
        Degradat sobre tota la imatge
      </b-switch>
    </c-field>

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect != '916'"
        label="Hashtag"
        name="hashtag"
        placeholder="#"
        @input="updateHashtag"
        :value="properties.hashtag"
        :maxlength="properties.localLabel ? 18 : 32"
        :message="setFieldMessage('hashtag')" />
    </transition>

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspectKey != '916'"
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
import EmojiPicker from '@/components/pane/EmojiPicker'
import ThemeSelector from '@/components/pane/ThemeSelector'
import ChartData from '@/components/pane/ChartData'

export default {
  name: 'chart-pane',

  mixins: [PaneMixin],

  components: {
    EmojiPicker,
    ThemeSelector,
    ChartData
  },

  data () {
    return {
      properties: {
        emojis: [],
        chart: {
          sets: [
            {
              label: 'Compromís',
              color: 'orangered'
            }
          ],
          data: [
            {
              label: 'gener',
              values: [{ number: 200, color: 'inherit', highlight: false }]
            },
            {
              label: 'febrer',
              values: [{ number: 100, color: 'inherit', highlight: false }]
            }
          ]
        },
        color: 'orange',
        fullGradient: false
      }
    }
  },

  methods: {
    validate () {
      // Chart data required
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

</style>
