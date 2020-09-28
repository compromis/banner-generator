<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Title -->
    <c-input-text
      label="Titol"
      :type="setFieldType('title')"
      :message="setFieldMessage('title')"
      placeholder="Acte Central a València"
      v-model="properties.title"
      max-length="60"
    />

    <!-- Overtitle -->
    <c-input-text
      label="Tipus d'acte"
      :message="setFieldMessage('overtitle')"
      placeholder="Debat"
      max-length="30"
      v-model="properties.overtitle"
    />

    <!-- Speakers -->
    <speaker-list
      :default-speakers="properties.speakers"
      @updated="(speakers) => properties.speakers = speakers"
      :display-errors="displayErrors"
      :errors="errors"
      :min-speakers="2"
      :max-speakers="4"
    />

    <!-- Date -->
    <transition name="slide">
      <c-field label="Data" v-if="aspect !== 2">
        <date-picker v-model="properties.date" />
      </c-field>
    </transition>

    <!-- Time -->
    <transition name="slide">
      <c-field label="Hora" v-if="aspect !== 2">
        <b-timepicker
          rounded
          inline
          :increment-minutes="15"
          v-model="properties.time"
          icon="clock">
        </b-timepicker>
      </c-field>
    </transition>

    <!-- Venue -->
    <transition name="slide">
      <c-input-text
        label="Lloc"
        v-if="aspect !== 2"
        :type="setFieldType('place')"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        maxlength="60"
      />
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
import PaneMixin from '@/mixins/pane-mixin'
import DatePicker from '@/components/pane/DatePicker'
import SpeakerList from '@/components/pane/SpeakerList'
import CField from '@/components/pane/CField'

export default {
  name: 'speakers-pane',

  mixins: [PaneMixin],

  components: {
    DatePicker,
    SpeakerList,
    CField
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
