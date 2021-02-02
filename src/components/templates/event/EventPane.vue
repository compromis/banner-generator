<template>
  <div :class="{ 'pane': true, 'pane-dimmed': paneDimmed }">
    <!-- Title -->
    <c-input-text
      label="Titol"
      name="title"
      :type="setFieldType('title')"
      :message="setFieldMessage('title')"
      placeholder="Acte Central a València"
      v-model="properties.title"
      max-length="60"
    />

    <!-- Overtitle -->
    <c-input-text
      label="Tipus d'acte"
      name="event-type"
      placeholder="Debat"
      max-length="20"
      v-model="properties.overtitle"
    />

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
        name="venue"
        v-if="aspect !== '916'"
        :type="setFieldType('place')"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        max-length="60"
      />
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
      @delete="properties.picture = null; properties.picturePreview = null" >
      <range-slider
        name="points"
        :min="0"
        :max="100"
        v-model="properties.picturePos"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors['glowy']" label="Color accent" is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-model="properties.mode"
      :colors="['white', 'black']"
      label="Color de fons"
      is-rounded />

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
  name: 'event-pane',

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
        speakers: [],
        color: 'orange'
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
