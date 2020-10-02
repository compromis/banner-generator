<template>
  <div :class="{ 'pane tweet-pane': true, 'pane-dimmed': paneDimmed, 'pane-916': aspect === 1 }">
    <!-- Style -->
    <c-tab-group>
      <c-tab v-model="properties.style" value="transparent" name="style">Transparent</c-tab>
      <c-tab v-model="properties.style" value="card" name="style">Targeta</c-tab>
      <c-tab v-model="properties.style" value="dark" name="style">Fosc</c-tab>
    </c-tab-group>

    <!-- Color -->
    <color-selector label="Color de fons" is-rounded v-model="properties.backgroundColor" :colors="['black', 'white', 'orange', 'lgbt', 'feminism', 'green']" />

    <!-- Tweet URL -->
    <div class="tweet-input">
    <c-input-text
      label="Tweet"
      name="tweetUrl"
      type="url"
      placeholder="https://"
      v-model="properties.tweetUrl"
      :disabled="(fetching || properties.tweetEmbed) ? true : false"
      :message="setFieldMessage('tweetId')"
      @keydown="(e) => handleKeyStrokes(e)" />
      <b-button rounded size="is-small" icon-left="paste" @click="pasteUrl">
          Enganxa
      </b-button>
    </div>

    <div v-if="fetching" class="c-field c-field-content fetching">Carregant tweet...</div>

    <!-- Tweet card -->
    <transition name="slide">
      <div v-if="properties.tweetEmbed">
        <!-- Tweet card -->
        <div class="tweet-embed c-field">
          <div class="tweet-embed-pic">
            <img :src="properties.tweetEmbed.user.profile_image_url_https" />
          </div>
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

        <!-- Text size -->
        <c-field label="Tamany del text" compact>
          <range-slider
            name="points"
            :min="75"
            :max="125"
            v-model="properties.textSize"
            @touchstart="dimPane(true)"
            @touchend="dimPane(false)" />
        </c-field>

        <!-- Tweet media -->
        <transition name="slide">
          <div v-if="properties.tweetEmbed && properties.tweetEmbed.entities['media']">
            <div class="c-field">
              <div class="c-field-content" style="padding-bottom: 0">
                <b-switch v-model="properties.showMedia" style="margin-bottom: 1rem">
                  Mostrar imatge del tweet
                </b-switch>
              </div>

              <transition name="slide">
                <div v-if="properties.showMedia">
                  <!-- Pictures -->
                  <div class="twitter-media c-field c-field-content" style="padding-top: 0">
                    <div v-for="(media, i) in properties.tweetEmbed.entities.media" :key="i" class="twitter-media-item">
                      <img :src="media.media_url_https" />
                    </div>
                  </div>

                  <!-- Picture position -->
                  <c-field label="Posició de la imatge" compact class="c-field-force-border">
                    <range-slider
                      name="points"
                      :min="0"
                      :max="100"
                      v-model="properties.picturePos"
                      @touchstart="dimPane(true)"
                      @touchend="dimPane(false)" />
                  </c-field>
                </div>
              </transition>
            </div>
          </div>
        </transition>

        <c-field>
          <b-switch v-model="properties.showCounts">
              Mostrar compte de RTs i Favs
          </b-switch>
        </c-field>
      </div>
    </transition>

    <c-field>
      <b-switch v-model="properties.showCta">
          Afegir cridada a l'acció
      </b-switch>
    </c-field>
    <transition name="slide">
        <c-input-text
          v-if="properties.showCta"
          label="Cridada a l'acció"
          name="cta"
          placeholder="Passa-ho!"
          v-model="properties.cta"
          :maxlength="24" />
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
import API from '@/api'
import PaneMixin from '@/mixins/pane-mixin.js'
import ColorSelector from '@/components/pane/ColorSelector'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'tweet-pane',

  mixins: [PaneMixin],

  components: {
    ColorSelector,
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        tweetUrl: '',
        tweetId: null,
        tweetEmbed: null,
        textSize: 100,
        showMedia: true,
        showCounts: true,
        showCta: false,
        backgroundColor: 'black',
        style: 'transparent',
        cta: 'Passa-ho!'
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

            // Default to hide counts if either of them is under 20
            if (response.retweet_count < 20 || response.favorite_count < 20) {
              this.properties.showCounts = false
            }
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
        this.clearTweet()
      }
    },

    clearTweet () {
      this.properties.tweetUrl = ''
      this.properties.tweetId = null
      this.properties.tweetEmbed = null
      this.displayErrors = false
    },

    pasteUrl () {
      navigator.clipboard.readText().then(text => {
        this.properties.tweetUrl = text
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .local-label {
    margin-top: .75rem;
  }

  .tweet-input {
    position: relative;

    .button {
      position: absolute;
      top: .5rem;
      right: .5rem;
    }
  }

  .fetching {
    color: $gray-700;
    font-size: .85rem;
  }

  .tweet-embed {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "pic user remove"
      "text text text";
    gap: .25rem;
    font-size: .85rem;
    padding: $field-padding;

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
