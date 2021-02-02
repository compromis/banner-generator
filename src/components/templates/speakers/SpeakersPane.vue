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
      :maxlength="30"
      v-model="properties.overtitle" />

    <!-- Speakers -->
    <speaker-list
      :default-speakers="properties.speakers"
      @updated="(speakers) => properties.speakers = speakers"
      :display-errors="displayErrors"
      :errors="errors"
      :min-speakers="2"
      :max-speakers="4" />

    <!-- Date and time -->
    <transition name="slide">
      <div class="date-time-grid">
        <c-field label="Data" v-if="aspect !== '916'" edge focusable label-for="date">
          <date-picker v-model="properties.date" id="date"/>
        </c-field>
        <c-field label="Hora" v-if="aspect !== '916'" edge focusable>
          <b-timepicker
            rounded
            inline
            :increment-minutes="15"
            v-model="properties.time" >
          </b-timepicker>
        </c-field>
      </div>
    </transition>

    <!-- Venue -->
    <transition name="slide">
      <c-input-text
        label="Lloc"
        name="place"
        v-if="aspect !== '916'"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        :maxlength="60" />
    </transition>

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      label="Color de fons"
      is-rounded />

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

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
import PaneMixin from '@/mixins/pane-mixin'
import DatePicker from '@/components/pane/DatePicker'
import SpeakerList from '@/components/pane/SpeakerList'

export default {
  name: 'speakers-pane',

  mixins: [PaneMixin],

  components: {
    DatePicker,
    SpeakerList
  },

  data () {
    return {
      properties: {
        theme: 'glowy',
        title: '',
        overtitle: '',
        date: new Date(),
        time: new Date(),
        place: '',
        speakers: [
          {
            name: 'Mónica Oltra',
            description: 'Vicepresidenta',
            picture: null
          },
          {
            name: 'Fran Ferri',
            description: 'Síndic',
            picture: null
          }
        ]
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
