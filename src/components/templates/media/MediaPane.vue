<template>
  <div :class="['pane', 'media-pane', { 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

    <!-- Title -->
    <c-input-text
      label="Títol"
      name="title"
      :message="setFieldMessage('title')"
      placeholder="Mónica Oltra"
      v-model="properties.title"
      :maxlength="30" />

    <!-- Overtitle -->
    <c-input-text
      label="Tipus d'acte"
      name="overtitle"
      :message="setFieldMessage('overtitle')"
      placeholder="Entrevista"
      v-model="properties.overtitle"
      :maxlength="30" />

    <!-- Subtitle -->
    <c-input-text
      label="Subtítol"
      name="subtitle"
      :message="setFieldMessage('subtitle')"
      placeholder="Vicepresidenta de la Generalitat"
      v-model="properties.subtitle"
      :maxlength="40" />

    <!-- Channel -->
    <c-select
      name="source"
      label="Canal"
      :message="setFieldMessage('source')"
      placeholder="Selecciona un canal"
      @input="updateSource"
      :value="properties.source">
      <optgroup v-for="(category, i) in presets" :label="category.name" :key="i">
        <option
          v-for="source in category.channels"
          :value="source"
          :key="source.id"
          :selected="properties.source === source.id">
          {{ source.name }}
        </option>
      </optgroup>
      <option
        value="other"
        :selected="properties.source === 'other'">
        Altre...
      </option>
    </c-select>

    <!-- Programme -->
    <transition name="slide">
      <c-select
        v-if="properties.source && properties.source !== 'other' && properties.source.programmes.length > 0"
        name="programme"
        label="Programa"
        :message="setFieldMessage('programme')"
        placeholder="Selecciona un programa"
        @input="updateProgramme"
        :value="properties.programme">
        <option
          v-for="programme in properties.source.programmes"
          :value="programme.id"
          :key="programme.id"
          :selected="properties.programme === programme.id">
          {{ programme.name }}
        </option>
        <option
          value="other"
          :selected="properties.programme === 'other'">
          Altre...
        </option>
      </c-select>
    </transition>

    <!-- Other source -->
    <transition name="slide">
      <div v-if="properties.source === 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.customSourceColor"></swatches>
          </div>
        </div>
        <c-input-text
          label="Nom del canal"
          name="customSource"
          placeholder="TeleElx"
          v-model="properties.customSource"
          :maxlength="20"
          :message="setFieldMessage('customSource')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- Other programme -->
    <transition name="slide">
      <div v-if="properties.programme === 'other'" class="source-input-group">
        <div class="c-field">
          <div class="c-field-info">
            <label>Color</label>
          </div>
          <div class="c-field-content-sm">
            <swatches v-model="properties.customProgrammeColor"></swatches>
          </div>
        </div>
        <c-input-text
          label="Nom del programa"
          name="customProgramme"
          placeholder="L'anàlisi"
          v-model="properties.customProgramme"
          :maxlength="30"
          :message="setFieldMessage('customProgramme')"
          class="source-input-name" />
      </div>
    </transition>

    <!-- Date and time -->
    <transition name="slide">
      <div class="date-time-grid">
        <c-field label="Data" v-if="aspect !== 2" edge focusable label-for="date">
          <date-picker v-model="eventDate" id="date"/>
        </c-field>
        <c-field label="Hora" v-if="aspect !== 2" edge focusable>
          <b-timepicker
            rounded
            inline
            :increment-minutes="15"
            v-model="eventTime" >
          </b-timepicker>
        </c-field>
      </div>
    </transition>

    <!-- Card position -->
    <transition name="slide">
      <c-tab-group v-if="properties.theme !== 'glowy' && aspect === '11'">
        <c-tab v-model="properties.disposition" value="left" name="disposition" icon="align-left"></c-tab>
        <c-tab v-model="properties.disposition" value="full" name="disposition" icon="align-center"></c-tab>
        <c-tab v-model="properties.disposition" value="right" name="disposition" icon="align-right"></c-tab>
      </c-tab-group>
    </transition>

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
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" v-if="properties.theme !== 'glowy'">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color accent" is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

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
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from './presets'
import Swatches from 'vue-swatches'
import DatePicker from '@/components/pane/DatePicker'
import ThemeSelector from '@/components/pane/ThemeSelector'
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'

export default {
  name: 'media-pane',

  components: {
    Swatches,
    DatePicker,
    ThemeSelector,
    CTab,
    CTabGroup
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        theme: 'blobless',
        title: '',
        overtitle: '',
        subtitle: '',
        date: new Date(),
        time: new Date(),
        source: null,
        programme: null,
        customSource: '',
        customSourceColor: '#1CA085',
        customProgramme: '',
        customProgrammeColor: '#1CA085',
        color: 'orange',
        fullGradient: false,
        disposition: 'full'
      },
      presets
    }
  },

  created () {
    // Set a default time
    this.properties.time.setHours(10)
    this.properties.time.setMinutes(0)
  },

  computed: {
    eventDate: {
      get () {
        const { date } = this.properties
        return date instanceof Date ? date : new Date(date)
      },

      set (value) {
        this.properties.date = value
      }
    },

    eventTime: {
      get () {
        const { time } = this.properties
        return time instanceof Date ? time : new Date(time)
      },

      set (value) {
        this.properties.time = value
      }
    },

    availableThemes () {
      const themes = {
        11: ['glowy', 'blobless', 'blobs'],
        916: ['glowy', 'blobless', 'blobs']
      }

      return themes[this.aspect]
    }
  },

  methods: {
    validate () {
      const sourceField = this.properties.source === 'other'
        ? { customSource: "Has d'escriure un canal" }
        : { source: 'Has de seleccionar un canal' }
      const programmeField = this.properties.programme === 'other'
        ? { customProgramme: "Has d'escriure un programa" }
        : { programme: 'Has de seleccionar un programa' }

      this.fieldRequired({
        title: "Has d'escriure el títol",
        ...sourceField,
        ...programmeField
      })
      this.pictureRequired()
      this.allCapsDisallowed('title')
    },

    updateSource (source) {
      if (source === 'other') {
        this.properties.source = 'other'
        this.properties.programme = 'other'
        return
      }

      this.properties.source = source

      if (!source.programmes.length) {
        this.properties.programme = 'other'
      } else {
        this.properties.programme = null
      }
    },

    updateProgramme (programme) {
      if (programme === 'other') {
        this.properties.programme = 'other'
        return
      }

      this.properties.programme = this.properties.source.programmes.find(p => p.id === programme)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .media-pane {
    .source-input {
      &-group {
        display: flex;
      }

      &-name {
        flex-grow: 1;
        order: 1;
        border-bottom: 1px $gray-300 solid !important;
      }
    }
  }
</style>
