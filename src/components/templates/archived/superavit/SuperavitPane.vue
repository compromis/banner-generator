<template>
  <div :class="{ 'pane generic-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Language -->
    <b-field label="Idioma">
        <b-select placeholder="Idioma" v-model="properties.lang" expanded>
            <option value="val">Valencià</option>
            <option value="cas">Castellà</option>
        </b-select>
    </b-field>

    <!-- Text -->
    <b-field
      label="Nom del poble"
      :type="setFieldType('municipality')"
      :message="setFieldMessage('municipality')">
      <b-input
        placeholder="Alzira"
        v-model="properties.municipality"
        maxlength="40">
      </b-input>
    </b-field>

    <!-- Text -->
    <b-field
      label="Quantitat"
      :type="setFieldType('amount')"
      :message="setFieldMessage('amount')">
      <b-input
        placeholder="30 milions"
        v-model="properties.amount"
        maxlength="14">
      </b-input>
    </b-field>

    <speaker-list
      label="Inversions"
      label-add="Afegeix inversió"
      placeholder=""
      icon="hand-point-right"
      :default-speakers="[{ name: '' }]"
      :accepts-picture="false"
      :accepts-description="false"
      :min-speakers="1"
      :max-speakers="3"
      :max-length-name="60"
      :display-errors="displayErrors"
      :errors="errors"
      @updated="(things) => properties.things = things" />

    <!-- Picture -->
    <picture-upload
      :picture="properties.picture"
      :preview="properties.picturePreview"
      :display-errors="false"
      :errors="{}"
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

    <!-- Hashtag -->
    <transition name="slide">
      <b-field label="Hashtag" v-if="aspect === '11'">
        <b-input
          placeholder="#"
          @input="updateHashtag"
          :value="properties.hashtag"
          :maxlength="25">
        </b-input>
      </b-field>
    </transition>

    <!-- Local label -->
    <transition name="slide">
      <div v-if="aspect === '11'" class="field">
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
import PaneMixin from '@/mixins/pane-mixin.js'
import SpeakerList from '@/components/pane/SpeakerList'

export default {
  name: 'superavit-pane',

  mixins: [PaneMixin],

  components: {
    SpeakerList
  },

  data () {
    return {
      properties: {
        lang: 'val',
        municipality: '',
        amount: '',
        things: [],
        hashtag: '#LesPersonesPrimer'
      }
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        municipality: "Has d'escriure un poble",
        amount: "Has d'escriure una quantitat"
      })
      this.allCapsDisallowed('municipality')

      // Check things
      const thingsAreValid = this.properties.things.every((thing) => thing.name !== '')
      if (!thingsAreValid) {
        this.errors.things = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .hashtag {
    margin-top: .25rem;
  }

  .local-label {
    margin-top: .75rem;
  }

  .message-body {
    font-size: .85rem;
  }

  .pane-916 {
    display: flex;
    flex-direction: column;

    .text-wrapper {
      order: 1;
    }
  }
</style>
