<template>
  <div :class="['pane', 'speakers-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Title -->
    <c-input-text
      label="Títol"
      name="title"
      :message="setFieldMessage('title')"
      placeholder="Acte Central a València"
      v-model="properties.title"
      :maxlength="60" />

    <!-- Overtitle -->
    <c-input-text
      label="Municipi"
      name="overtitle"
      :message="setFieldMessage('overtitle')"
      placeholder="Gandia"
      :maxlength="50"
      v-model="properties.overtitle" />

    <!-- Speakers -->
    <speaker-list
      v-model="properties.speakers"
      :display-errors="displayErrors"
      :errors="errors"
      :min-speakers="1"
      :max-speakers="4" />

    <!-- Date and time -->
    <transition name="slide">
      <div class="date-time-grid">
        <c-field label="Data" v-if="aspect !== '916'" edge focusable label-for="date">
          <date-picker v-model="eventDate" id="date"/>
        </c-field>
        <c-field label="Hora" v-if="aspect !== '916'" edge focusable>
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

    <!-- Color predominance -->
    <color-selector label="Primer color" v-model="properties.firstColor" :colors="['sumar-orange','sumar-fuchsia']" is-rounded />
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin'
import ColorSelector from '@/components/pane/ColorSelector'
import DatePicker from '@/components/pane/DatePicker'
import SpeakerList from '@/components/pane/SpeakerList'

export default {
  name: 'speakers-pane',

  mixins: [PaneMixin],

  components: {
    DatePicker,
    SpeakerList,
    ColorSelector
  },

  data () {
    return {
      properties: {
        title: '',
        overtitle: '',
        date: new Date(),
        time: new Date(),
        place: '',
        firstColor: 'sumar-orange',
        speakers: [
          {
            name: 'Yolanda Díaz',
            description: 'Candidata a la Presidència',
            picture: null
          },
          {
            name: 'Àgueda Micó',
            description: 'Candidata per València',
            picture: null
          }
        ]
      }
    }
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
    }
  },

  created () {
    // Set a default time
    this.properties.time.setHours(10)
    this.properties.time.setMinutes(0)
  },

  methods: {
    validate () {
      this.fieldRequired({
        title: "Has d'escriure un títol",
        place: "Has d'escriure un lloc"
      })
      this.allCapsDisallowed('title', 'place')

      // Check speakers
      const speakersAreValid = this.properties.speakers.every((speaker) => speaker.picture !== null && speaker.name !== '')
      if (!speakersAreValid) {
        this.errors.speakers = true
      }
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
