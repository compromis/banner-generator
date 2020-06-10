<template>
  <div :class="{ 'pane tweet-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">

    <!-- Text -->
    <b-field
      label="Tweet"
      :type="setFieldType('tweetId')"
      :message="setFieldMessage('tweetId')">
      <b-input
        v-model="properties.tweetUrl"
        placeholder="https://"
        :disabled="fetching"
        @keydown.native="(e) => handleKeyStrokes(e)">
      </b-input>
    </b-field>
    <div v-if="fetching">Carregant tweet...</div>
    <div v-if="properties.tweetEmbed">
      <ul>
        <li>{{ properties.tweetEmbed.user.name }}</li>
        <li>@{{ properties.tweetEmbed.user.screen_name }}</li>
        <li>{{ properties.tweetEmbed.text }}</li>
      </ul>
    </div>

    <!-- Tweet media -->
    <transition name="slide">
      <div v-if="properties.tweetEmbed && properties.tweetEmbed.entities['media']">
        <b-switch v-model="properties.showMedia">
          Mostra imatge del tweet
        </b-switch>
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
      </div>
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
import API from '@/api'
import PaneMixin from '@/mixins/pane-mixin.js'

export default {
  name: 'tweet-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        tweetUrl: '',
        tweetId: null,
        tweetEmbed: null,
        showMedia: true
      },
      fetching: false
    }
  },

  watch: {
    'properties.tweetUrl' (url) {
      this.fetchTweet(url)
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        tweetId: "Has d'engantxar la URL d'un tweet valid"
      })
    },

    fetchTweet (url) {
      delete this.errors.tweetdId
      const matched = url.match(/(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/)
      const id = (matched) ? matched[4] : false

      if (!id) {
        this.displayErrors = true
        this.errors.tweetId = ['La URL del tweet sembla no ser vàlida']
        return false
      } else if (id !== this.properties.tweetId) {
        this.fetching = true
        this.properties.tweetId = null
        this.properties.tweetEmbed = null
        API.fetchTweet(id)
          .then(response => {
            this.fetching = false
            this.properties.tweetId = id
            this.properties.tweetEmbed = response
          })
          .catch(() => {
            this.displayErrors = true
            this.errors.tweetId = ['Error de servidor']
          })
          .then(() => {
            this.fetching = false
          })
      }
    },

    handleKeyStrokes (e) {
      if (e.code === 'Backspace') {
        this.properties.tweetUrl = ''
        this.properties.tweetId = ''
        this.properties.tweetEmbed = ''
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
