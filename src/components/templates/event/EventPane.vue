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
      <b-input placeholder="Debat" maxlength="20" v-model="properties.overtitle"></b-input>
    </b-field>

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
        <b-input
          placeholder="Riu Túria"
          v-model="properties.place"
          maxlength="60">
        </b-input>
      </b-field>
    </transition>

    <!-- Speakers -->
    <transition name="slide">
      <speaker-list
        v-show="aspect !== 2"
        :accepts-picture="false"
        :accepts-description="false"
        :min-speakers="0"
        :max-speakers="6"
        :max-length-name="25"
        :max-length-description="50"
        @updated="(speakers) => properties.speakers = speakers" />
    </transition>

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
        title: '',
        overtitle: '',
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

  methods: {
    validate () {
      this.fieldRequired({
        title: "Has d'escriure un títol",
        place: "Has d'escriure un lloc"
      })
      this.pictureRequired()
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
