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
        :disabled="fetching || properties.tweetId"
        @keydown.native="(e) => handleKeyStrokes(e)">
      </b-input>
    </b-field>
    <div v-if="fetching" class="fetching">Carregant tweet...</div>

    <!-- Tweet card -->
    <div v-if="properties.tweetEmbed" class="tweet-embed mini-card">
      <div class="tweet-embed-pic"><img :src="properties.tweetEmbed.user.profile_image_url_https" /></div>
      <div class="tweet-embed-user">
        <strong>{{ properties.tweetEmbed.user.name }}</strong>
        <div>@{{ properties.tweetEmbed.user.screen_name }}</div>
      </div>
      <div class="tweet-embed-text">{{ properties.tweetEmbed.full_text }}</div>
      <div class="tweet-embed-remove">
        <b-button
          @click="clearTweet"
          class="remove-image"
          type="is-danger"
          size="is-small"
          icon-right="times">
        </b-button>
      </div>
    </div>

    <!-- Tweet media -->
    <transition name="slide">
      <div v-if="properties.tweetEmbed && properties.tweetEmbed.entities['media']">
        <b-switch v-model="properties.showMedia" style="margin-bottom: 1rem">
          Mostra imatge del tweet
        </b-switch>

        <transition name="slide">
          <div v-if="properties.showMedia">
            <!-- Pictures -->
            <div class="twitter-media mini-card">
              <div v-for="(media, i) in properties.tweetEmbed.entities.media" :key="i" class="twitter-media-item">
                <img :src="media.media_url_https" />
              </div>
            </div>

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
      </div>
    </transition>

    <color-selector is-rounded v-model="properties.backgroundColor" />

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
import ColorSelector from '@/utils/ColorSelector'

export default {
  name: 'tweet-pane',

  mixins: [PaneMixin],

  components: {
    ColorSelector
  },

  data () {
    return {
      properties: {
        tweetUrl: '',
        tweetId: null,
        tweetEmbed: null,
        showMedia: true,
        backgroundColor: 'orange'
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

      if (!id && url !== '') {
        this.displayErrors = true
        this.errors.tweetId = ['La URL del tweet sembla no ser vàlida']
        return false
      } else if (id !== this.properties.tweetId && url) {
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
    },

    clearTweet () {
      this.properties.tweetUrl = ''
      this.properties.tweetId = null
      this.properties.tweetEmbed = null
      this.displayErrors = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .local-label {
    margin-top: .75rem;
  }

  .fetching {
    margin-top: -.75rem;
    margin-bottom: 1rem;
    color: $gray-700;
    font-size: .85rem;
  }

  .mini-card {
    border: 2px $gray-200 solid;
    padding: 1rem;
    font-size: .85rem;
    border-radius: .5rem;
    margin-bottom: 1rem;
  }

  .tweet-embed {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "pic user remove"
      "text text text";
    gap: .25rem;

    &-pic {
      grid-area: pic;

      img {
        width: 35px;
        border-radius: 50%;
      }
    }

    &-user {
      grid-area: user;
      align-self: center;
      line-height: 1.25;
      margin-left: .25rem;

      & > div {
        color: $gray-700;
      }
    }

    &-text {
      grid-area: text;
    }

    &-remove {
      grid-area: remove;
    }
  }

  .twitter-media {
    img {
      display: block;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: .5rem;
    }
  }
</style>
