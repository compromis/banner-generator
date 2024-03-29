<template>
  <div :class="['pane', 'event-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

    <!-- Title -->
    <c-input-text
      label="Titol"
      name="title"
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

    <!-- Card position -->
    <transition name="slide">
      <c-tab-group v-if="properties.theme !== 'glowy' && aspect === '11'">
        <c-tab v-model="properties.disposition" value="left" name="disposition" icon="align-left"></c-tab>
        <c-tab v-model="properties.disposition" value="full" name="disposition" icon="align-center"></c-tab>
        <c-tab v-model="properties.disposition" value="right" name="disposition" icon="align-right"></c-tab>
      </c-tab-group>
    </transition>

    <!-- Picture -->
    <advanced-picture-upload
      :picture="properties.picture"
      :picture-aspect="properties.pictureAspect"
      :crop="properties.pictureCrop"
      :preview="properties.picturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="aspectProperties.ratio"
      @upload="updateImage"
      @crop="updateCrop"
      @delete="removeImage">
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" v-if="properties.theme === 'blobless' && properties.picture">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </advanced-picture-upload>

    <!-- Frame color  -->
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color accent" is-rounded />

    <!-- Dark mode -->
    <color-selector
      v-if="aspect !== 'event'"
      v-model="properties.mode"
      :colors="['white', 'black']"
      :label="properties.theme === 'glowy' ? 'Color de fons' : 'Color de targeta'"
      :is-rounded="properties.theme === 'glowy'" />

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
import ThemeSelector from '@/components/pane/ThemeSelector'
import CTab from '@/components/pane/CTab'
import CTabGroup from '@/components/pane/CTabGroup'
import SocialSelector from '@/components/pane/SocialSelector'

export default {
  name: 'event-pane',

  mixins: [PaneMixin],

  components: {
    DatePicker,
    SpeakerList,
    ThemeSelector,
    CTab,
    CTabGroup,
    SocialSelector
  },

  data () {
    return {
      properties: {
        theme: 'blobless',
        title: '',
        overtitle: '',
        date: new Date(),
        time: new Date(),
        place: '',
        speakers: [],
        color: 'orange',
        fullGradient: false,
        disposition: 'full',
        social: [],
        eventType: 'inperson',
        videochat: ''
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
        11: ['glowy', 'blobless', 'blobs'],
        916: ['glowy', 'blobless', 'blobs'],
        event: ['glowy']
      }

      return themes[this.aspect]
    }
  },

  methods: {
    validate () {
      // Required fields for each event type
      const eventLocationFields = {
        inperson: 'place',
        stream: 'social',
        videochat: 'videochat'
      }

      this.fieldRequired({
        title: "Has d'escriure un títol",
        [eventLocationFields[this.properties.eventType]]: "Has d'escriure un lloc"
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
