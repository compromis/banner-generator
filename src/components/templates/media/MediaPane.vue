<template>
  <div :class="{ 'pane media-pane': true, 'pane-dimmed': paneDimmed }">
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
          placeholder="En Análisis"
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
          <date-picker v-model="properties.date" id="date"/>
        </c-field>
        <c-field label="Hora" v-if="aspect !== 2" edge focusable>
          <b-timepicker
            rounded
            inline
            :increment-minutes="15"
            v-model="properties.time" >
          </b-timepicker>
        </c-field>
      </div>
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
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors['glowy']" label="Color" is-rounded />

    <!-- Hashtag -->
    <transition name="slide">
      <c-input-text
        v-if="!aspect"
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
        v-if="!aspect"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import ColorSelector from '@/components/pane/ColorSelector.vue'
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from './presets'
import Swatches from 'vue-swatches'
import DatePicker from '@/components/pane/DatePicker'

export default {
  name: 'media-pane',

  components: {
    Swatches,
    DatePicker,
    ColorSelector
  },

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
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
        color: 'orange'
      },
      presets
    }
  },

  created () {
    // Set a default time
    this.properties.time.setHours(10)
    this.properties.time.setMinutes(0)
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
