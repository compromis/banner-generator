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
      label="Tipus d'acte"
      name="overtitle"
      :message="setFieldMessage('overtitle')"
      placeholder="Debat"
      :maxlength="60"
      v-model="properties.overtitle" />

    <!-- Speakers -->
    <speaker-list
      v-model="properties.speakers"
      :display-errors="displayErrors"
      :errors="errors"
      :min-speakers="2"
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

    <!-- Event Type -->
    <c-tab-group v-if="aspect !== 'event'">
      <c-tab v-model="properties.eventType" value="inperson" name="event-type">En persona</c-tab>
      <c-tab v-model="properties.eventType" value="stream" name="event-type">Emissió</c-tab>
      <c-tab v-model="properties.eventType" value="videochat" name="event-type">Vídeo xat</c-tab>
    </c-tab-group>

    <transition-group tag="div" name="slide">
      <!-- Venue -->
      <c-input-text
        key="inperson"
        v-if="aspect !== 'event' && properties.eventType === 'inperson'"
        label="Lloc"
        name="venue"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        max-length="60" />

      <!-- Social Media Selector -->
      <social-selector
        key="stream"
        v-if="aspect !== 'event' && properties.eventType === 'stream'"
        v-model="properties.social" />
        B4(RdGV+&tU{
      <!-- Videochat -->
      <c-input-text
        key="videochat"
        v-if="aspect !== 'event' && properties.eventType === 'videochat'"
        label="Servei"
        name="videochat"
        :message="setFieldMessage('videochat')"
        placeholder="Google Meet"
        v-model="properties.videochat"
        max-length="60" />
    </transition-group>

    <!-- Background color  -->
    <color-selector v-model="properties.bgColor" :colors="granissatColors" label="Color" is-rounded />

    <!-- Background color  -->
    <color-selector v-model="properties.secondaryColor" :colors="secondaryColors" label="Color secundari" is-rounded />

    <granissat-color-advisor :color="properties.bgColor" />

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
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'
import SocialSelector from '@/components/pane/SocialSelector'
import GranissatColorAdvisor from '../GranissatColorAdvisor'
import GranissatMixin from '../granissat-mixin'

export default {
  name: 'speakers-pane',

  mixins: [PaneMixin, GranissatMixin],

  components: {
    DatePicker,
    SpeakerList,
    CTab,
    CTabGroup,
    SocialSelector,
    GranissatColorAdvisor
  },

  data () {
    return {
      properties: {
        bgColor: 'initial',
        secondaryColor: 'initial',
        title: '',
        overtitle: '',
        date: new Date(),
        time: new Date(),
        place: '',
        eventType: 'inperson',
        selectedSocial: [],
        videochat: '',
        speakers: [
          {
            name: 'Aitana Mas',
            description: 'Vicepresidenta',
            picture: null
          },
          {
            name: 'Papi Robles',
            description: 'Síndica',
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
    },

    secondaryColors () {
      const combos = {
        initial: ['initial'],
        red: ['blue', 'yellow'],
        yellow: ['blue', 'red', 'pink', 'indigo'],
        blue: ['yellow', 'red'],
        pink: ['yellow'],
        indigo: ['yellow'],
        feminist: ['yellow','red','blue','pink','indigo']
      }

      return combos[this.properties.bgColor]
    }
  },

  created () {
    // Set a default time
    this.properties.time.setHours(10)
    this.properties.time.setMinutes(0)

    // Set a random granissat color
    this.setRandomColor()

    // Set secondary color
    this.properties.secondaryColor = this.secondaryColors[0]
  },

  watch: {
    'properties.bgColor' () {
      this.properties.secondaryColor = this.secondaryColors[0]
    }
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
  .local-label {
    margin-top: .75rem;
  }
</style>
