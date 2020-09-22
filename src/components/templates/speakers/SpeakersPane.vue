<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Title -->
    <b-field
      label="Titol"
      :type="setFieldType('title')"
      :message="setFieldMessage('title')">
      <b-input placeholder="Acte Central a València" v-model="properties.title" maxlength="60"></b-input>
    </b-field>

    <!-- Overtitle -->
    <b-field label="Tipus d'acte">
      <b-input placeholder="Debat" maxlength="30" v-model="properties.overtitle"></b-input>
    </b-field>

    <!-- Speakers -->
    <speaker-list
      :default-speakers="properties.speakers"
      @updated="(speakers) => properties.speakers = speakers"
      :display-errors="displayErrors"
      :errors="errors"
      :min-speakers="2"
      :max-speakers="4" />

    <!-- Date -->
    <transition name="slide">
      <b-field label="Data" v-if="aspect !== 2">
        <date-picker v-model="properties.date" />
      </b-field>
    </transition>

    <!-- Time -->
    <transition name="slide">
      <b-field label="Hora" v-if="aspect !== 2">
        <b-timepicker
          rounded
          inline
          :increment-minutes="15"
          v-model="properties.time"
          icon="clock">
        </b-timepicker>
      </b-field>
    </transition>

    <!-- Venue -->
    <transition name="slide">
      <b-field
        label="Lloc"
        v-if="aspect !== 2"
        :type="setFieldType('place')"
        :message="setFieldMessage('place')">
        <b-input placeholder="Riu Túria" v-model="properties.place" maxlength="60"></b-input>
      </b-field>
    </transition>

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
