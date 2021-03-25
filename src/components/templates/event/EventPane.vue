<template>
  <div :class="['pane', 'event-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Theme selector -->
    <theme-selector v-model="properties.theme" :themes="availableThemes" />

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

    <!-- Event Type -->
    <c-tab-group>
      <c-tab v-model="properties.eventType" value="physical" name="event-type">Acte físic</c-tab>
      <c-tab v-model="properties.eventType" value="virtual" name="event-type">Acte virtual</c-tab>
    </c-tab-group>

    <!-- Venue -->
    <transition name="slide">
      <c-input-text
        label="Lloc"
        name="venue"
        v-if="aspect !== '916' && properties.eventType === 'physical'"
        :type="setFieldType('place')"
        :message="setFieldMessage('place')"
        placeholder="Riu Túria"
        v-model="properties.place"
        max-length="60"
      />
    </transition>

    <!-- Social Media Selector -->
    <transition name="slide">
      <social-selector v-if="properties.eventType === 'virtual'" v-model="properties.selectedSocial"/>
    </transition>

    <!-- Speakers -->
    <transition name="slide">
      <speaker-list
        v-show="aspect !== '916'"
        :accepts-picture="false"
        :min-speakers="0"
        :max-speakers="6"
        :max-length-name="25"
        :max-length-description="50"
        @updated="(speakers) => properties.speakers = speakers" />
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
    <color-selector v-model="properties.color" :colors="availableColors[properties.theme]" label="Color accent" is-rounded />

    <!-- Dark mode -->
    <color-selector
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
        eventType: 'physical'
      }
    }
  },

  created () {
    // Set a default time
    this.properties.time.setHours(10)
    this.properties.time.setMinutes(0)
  },

  computed: {
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
