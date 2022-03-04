<template>
  <div :class="['pane', 'chart-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

    <!-- Title -->
    <c-input-text
      label="Títol"
      name="title"
      type="textarea"
      placeholder="Baixa l'atur..."
      v-model="properties.title"
      :maxlength="120"
      :message="setFieldMessage('title')" />

    <!-- Chart type -->
    <c-select name="chartType" label="Tipus de gràfica" v-model="properties.chartType" expanded>
      <option value="bar-vertical">Barres verticals</option>
      <option value="bar-horizontal">Barres horitzontals</option>
      <option value="lines">Línies</option>
      <option value="doughnut">Semicercle</option>
      <option value="pie">Pastís</option>
      <option value="farto">Fartó</option>
    </c-select>

    <!-- Chart data input -->
    <chart-data v-model="properties.chart" :chart-type="properties.chartType" />

    <!-- Chart options -->
    <c-field>
      <b-switch v-model="properties.chart.options.onlyHighlighted">
        Mostrar només valors destacats
      </b-switch>
    </c-field>

    <c-select name="chartType" label="Valors" v-model="properties.chart.options.valuesIn" expanded>
      <option value="numbers">Números</option>
      <option value="euros">Euros (€)</option>
      <option value="percentage">Percentatge (%)</option>
    </c-select>

    <!-- Source -->
    <c-input-text
      label="Font"
      name="source"
      :message="setFieldMessage('source')"
      placeholder="INE"
      v-model="properties.source"
      :maxlength="30" />

      <!-- Descripció -->
      <c-input-text
        label="Descripció"
        name="description"
        type="textarea"
        placeholder="Reduïm les xifres un 25% des d'abril..."
        v-model="properties.description"
        :maxlength="260"
        :message="setFieldMessage('description')" />

    <!-- Emoji picker -->
    <emoji-picker v-model="properties.emojis" />

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color" is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="removeImage">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
      <transition name="slide">
        <b-switch v-if="properties.theme === 'blobless' && properties.picture" v-model="properties.fullGradient">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </picture-upload>

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="aspect != '916'"
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
        v-if="aspect != '916'"
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
import ChartData from './ChartData'

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
        title: '',
        description: '',
        source: '',
        emojis: [],
        chartType: 'bar-vertical',
        chart: {
          sets: [
            {
              label: '',
              color: '#FF6720'
            }
          ],
          data: [
            {
              label: 'gener',
              values: [{ number: 200, color: '#FF6720', highlight: false }]
            },
            {
              label: 'febrer',
              values: [{ number: 100, color: '#FF6720', highlight: false }]
            }
          ],
          options: {
            onlyHighlighted: false,
            valuesIn: 'numbers'
          }
        },
        color: 'orange',
        fullGradient: false
      }
    }
  },

  computed: {
    availableThemes () {
      const themes = {
        11: ['blobs', 'blobless'],
        169: ['blobless']
      }

      return themes[this.aspect]
    }
  },

  methods: {
    validate () {
      this.allCapsDisallowed('title', 'description')
      if (this.properties.theme !== 'blobless') {
        this.pictureRequired()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

</style>
