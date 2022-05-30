<template>
  <div :class="['pane', 'tweet-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Style -->
    <c-tab-group>
      <c-tab v-model="properties.style" value="transparent" name="style">Transparent</c-tab>
      <c-tab v-model="properties.style" value="card" name="style">Targeta</c-tab>
    </c-tab-group>

    <!-- Color -->
    <color-selector label="Color de fons" is-rounded v-model="properties.backgroundColor" :colors="availableColors" />

    <!-- Dark mode -->
    <transition name="slide">
      <color-selector
        v-if="properties.style === 'card'"
        v-model="properties.mode"
        :colors="['white', 'black']"
        label="Color de la targeta"
        is-rounded />
    </transition>

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
        <c-field label="Tamany del text" compact class="range-field">
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
          <div v-if="tweetHasImage">
            <c-select
              name="mediaType"
              label="Tipus d'imatge"
              v-model="properties.mediaType">
              <option
                value="tweetimage"
                :selected="properties.mediaType === 'tweetimage'">
                Imatge del tweet
              </option>
              <option
                value="uploaded"
                :selected="properties.mediaType === 'uploaded'">
                Puja una foto
              </option>
              <option
                value="none"
                :selected="properties.mediaType === 'none'">
                Cap imatge
              </option>
            </c-select>

            <transition name="slide">
              <div class="c-field range-field" v-if="properties.mediaType === 'tweetimage'">
                <!-- Pictures -->
                <div class="media-as-background" v-for="(media, i) in properties.tweetEmbed.entities.media" :key="i">
                  <advanced-cropping
                    class="advanced-cropping"
                    :preview="media.media_url_https"
                    :ratio="properties.mediaAsBackground ? 1 : 1.87"
                    :picture-aspect="properties.pictureAspect"
                    v-model="properties.pictureCrop" />

                  <b-switch v-model="properties.mediaAsBackground">
                    Imatge de fons
                  </b-switch>
                  <transition name="slide">
                    <b-switch v-model="properties.fullGradient" v-if="properties.style === 'card' && properties.mediaAsBackground" class="mt-1">
                      Degradat en tota la imatge
                    </b-switch>
                  </transition>
                </div>
              </div>
            </transition>
          </div>
        </transition>

        <!-- Image -->
        <advanced-picture-upload
          v-if="properties.mediaType === 'uploaded' || !tweetHasImage"
          id="picture-field"
          :picture="properties.picture"
          :picture-aspect="properties.pictureAspect"
          :crop="properties.pictureCrop"
          :preview="properties.picturePreview"
          :display-errors="displayErrors"
          :errors="errors"
          :ratio="properties.mediaAsBackground ? 1 : 1.87"
          @upload="updateImage"
          @crop="updateCrop"
          @delete="removeImage">
          <b-switch v-model="properties.mediaAsBackground">
            Imatge de fons
          </b-switch>
          <transition name="slide">
            <b-switch v-model="properties.fullGradient" v-if="properties.style === 'card' && properties.mediaAsBackground" class="mt-1">
              Degradat sobre tota la imatge
            </b-switch>
          </transition>
        </advanced-picture-upload>

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
import API from '@/api'
import PaneMixin from '@/mixins/pane-mixin.js'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'
import AdvancedCropping from '@/components/pane/AdvancedCropping'

export default {
  name: 'tweet-pane',

  mixins: [PaneMixin],

  components: {
    CTabGroup,
    CTab,
    AdvancedCropping
  },

  data () {
    return {
      properties: {
        tweetUrl: '',
        tweetId: null,
        tweetEmbed: null,
        textSize: 100,
        mediaType: 'tweetimage',
        mediaAsBackground: false,
        showCounts: true,
        showCta: false,
        backgroundColor: 'black',
        style: 'transparent',
        cta: 'Passa-ho!'
      },
      fetching: false,
      ratios: { inline: 2.09, background: 1 }
    }
  },

  watch: {
    'properties.tweetUrl' (url) {
      this.fetchTweet(url)
    },

    'properties.mediaAsBackground' (value) {
      const ratio = value ? this.ratios.background : this.ratios.inline
      this.reevaluateImages(ratio)
    },

    'properties.mediaType' () {
      const ratio = this.properties.mediaAsBackground ? this.ratios.background : this.ratios.inline
      this.reevaluateImages(ratio)
    }
  },

  computed: {
    availableColors () {
      return ['black', 'white', 'orange', 'lgbt', 'feminism', 'green']
    },

    showImage () {
      return this.properties.mediaType !== 'none' &&
        (this.properties.mediaType === 'tweetimage' || this.properties.picture)
    },

    tweetHasImage () {
      return this.properties.tweetEmbed && this.properties.tweetEmbed.entities['media']
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

            // Set pictureAspect
            if (response.entities.media) {
              this.setMediaAspect(response.entities.media[0].media_url_https)
            }

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
    },

    setMediaAspect (url) {
      const img = new Image()
      img.addEventListener('load', () => {
        const { naturalWidth, naturalHeight } = img
        this.properties.pictureAspect = (naturalWidth / naturalHeight > 1) ? 'horizontal' : 'vertical'
      })
      img.src = url
    },

    reevaluateImages (ratio) {
      let image
      const { properties } = this

      if (properties.mediaType === 'tweetimage' && properties.tweetEmbed.entities.media) {
        image = properties.tweetEmbed && properties.tweetEmbed.entities['media'] && properties.tweetEmbed.entities['media'][0].media_url_https
      }

      this.refreshImageAspect({ ratio, image })
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
    border-bottom: 0;

    img {
      display: block;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: .5rem;
    }
  }

  .media-as-background {
    padding: 1rem;

    .advanced-cropping {
      margin-bottom: 1rem;
    }
  }
</style>
