<template>
  <div :class="{ 'pane media-pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Title -->
    <b-field
      label="Titol"
      :type="setFieldType('title')"
      :message="setFieldMessage('title')">
      <b-input
        placeholder="Mónica Oltra"
        v-model="properties.title"
        maxlength="30">
      </b-input>
    </b-field>

    <!-- Overtitle -->
    <b-field label="Tipus d'acte">
      <b-input
        placeholder="Entrevista"
        v-model="properties.overtitle"
        maxlength="30">
      </b-input>
    </b-field>

    <!-- Subtitle -->
    <b-field label="Subtítol">
      <b-input
        placeholder="a Assumptes Interns"
        v-model="properties.subtitle"
        maxlength="40">
      </b-input>
    </b-field>

    <!-- Channel -->
    <b-field
      label="Canal"
      :type="setFieldType('source')"
      :message="setFieldMessage('source')">
      <b-select placeholder="Selecciona un canal" @input="updateSource" expanded>
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
      </b-select>
    </b-field>

    <!-- Programme -->
    <transition name="slide">
      <b-field
        label="Programa" v-if="properties.source && properties.source !== 'other' && properties.source.programmes.length > 0"
        :type="setFieldType('programme')"
        :message="setFieldMessage('programme')">
        <b-select placeholder="Selecciona un programa" expanded @input="updateProgramme">
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
        </b-select>
      </b-field>
    </transition>

    <transition name="slide">
      <div v-if="properties.source === 'other'" class="media-input-group">
        <b-field
          label="Nom del canal"
          class="media-input-name"
          :type="setFieldType('customSource')"
          :message="setFieldMessage('customSource')">
          <b-input
            placeholder="TeleElx"
            v-model="properties.customSource"
            maxlength="20">
          </b-input>
        </b-field>
        <b-field label="Color" class="media-input-color">
          <swatches v-model="properties.customSourceColor"></swatches>
        </b-field>
      </div>
    </transition>

    <transition name="slide">
      <div v-if="properties.programme === 'other'" class="media-input-group">
        <b-field
          label="Nom del programa"
          class="media-input-name"
          :type="setFieldType('customProgramme')"
          :message="setFieldMessage('customProgramme')">
          <b-input
            placeholder="El Análisis"
            v-model="properties.customProgramme"
            maxlength="30">
          </b-input>
        </b-field>
        <b-field label="Color" class="media-input-color">
          <swatches v-model="properties.customProgrammeColor"></swatches>
        </b-field>
      </div>
    </transition>

    <!-- Date -->
    <b-field label="Data">
       <date-picker v-model="properties.date" />
    </b-field>

    <!-- Time -->
    <b-field label="Hora">
      <b-timepicker
        rounded
        inline
        :increment-minutes="15"
        v-model="properties.time"
        icon="clock">
      </b-timepicker>
    </b-field>

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :display-errors="displayErrors"
      :errors="errors"
      @upload="updateImage"
      @delete="properties.picture = null; properties.picturePreview = null" />

    <!-- Picture position -->
    <b-field label="Posició de la imatge" class="range">
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </b-field>

    <!-- Local label -->
    <transition name="slide">
      <div v-if="!aspect" class="field">
        <b-switch v-model="properties.hasLocalLabel">
          Afegir text al logo
        </b-switch>
        <transition name="slide">
          <div v-if="properties.hasLocalLabel" class="local-label">
            <b-field>
              <b-input placeholder="Alacant" v-model="properties.localLabel" maxlength="48"></b-input>
            </b-field>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import presets from './presets'
import Swatches from 'vue-swatches'
import DatePicker from '@/utils/DatePicker'

export default {
  name: 'media-pane',

  components: {
    Swatches,
    DatePicker
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
        customProgrammeColor: '#1CA085'
      },
      presets: presets
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

      // const channel = this.presets.find(preset => preset.id === source)
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
    .local-label {
      margin-top: .75rem;
    }

    .media-input {
      &-group {
        display: flex;

        label {
          font-size: .85rem;
          color: $gray-600;
        }
      }

      &-name {
        flex-grow: 1;
        order: 1;
      }

      &-color {
        margin-right: .5rem;
      }
    }

    .vue-swatches__trigger {
      height: 31px !important;
      width: 31px !important;
      border-radius: 4px !important;
    }
  }
</style>
