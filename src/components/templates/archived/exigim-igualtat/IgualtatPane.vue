<template>
  <div :class="['pane', 'event-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Language -->
    <c-select name="lang" label="Idioma" v-model="properties.lang" expanded>
        <option value="val">Valencià</option>
        <option value="cas">Castellà</option>
    </c-select>

    <!-- Title -->
    <c-input-text
      label="Titol"
      name="title"
      :message="setFieldMessage('title')"
      placeholder="Arreplegada de signatures a Oliva"
      v-model="properties.title"
      max-length="60"
    />

    <!-- Date and time -->
    <transition name="slide">
      <div class="date-time-grid">
        <c-field label="Data" v-if="aspect !== 'event'" edge focusable label-for="date">
          <date-picker v-model="eventDate" id="date"/>
        </c-field>
        <c-field label="Hora" v-if="aspect !== 'event'" edge focusable>
          <b-timepicker
            rounded
            inline
            :increment-minutes="15"
            v-model="eventTime" >
          </b-timepicker>
        </c-field>
      </div>
    </transition>

      <!-- Venue -->
      <c-input-text
        label="Lloc"
        name="venue"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        max-length="60" />

    <!-- Speakers -->
    <transition name="slide">
      <speaker-list
        v-model="properties.speakers"
        v-show="aspect !== 'event'"
        :accepts-picture="false"
        :min-speakers="0"
        :max-speakers="6"
        :max-length-name="25"
        :max-length-description="50" />
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
import DatePicker from '@/components/pane/DatePicker'
import SpeakerList from '@/components/pane/SpeakerList'

export default {
  name: 'event-pane',

  mixins: [PaneMixin],

  components: {
    DatePicker,
    SpeakerList
  },

  data () {
    return {
      properties: {
        theme: 'blobless',
        lang: 'val',
        title: '',
        date: new Date(),
        time: new Date(),
        place: '',
        speakers: []
      }
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
        11: ['blobless']
      }

      return themes[this.aspect]
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        title: "Has d'escriure un títol",
        place: "Has d'escriure un lloc"
      })
      this.allCapsDisallowed('title', 'place')
    }
  }
}
</script>

<style lang="scss" scoped>
  .local-label {
    margin-top: .75rem;
  }
</style>
