<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      `style-${banner.style}`,
      `background-${banner.backgroundColor}`,
      `mode-${banner.mode}`,
      `logo-${banner.logo}`
    ]"
    v-if="banner">
    <banner-picture
      :picture-position="objectPosition"
      :full-gradient="(banner.fullGradient && banner.style === 'card') || banner.style === 'transparent'"
      :picture="banner.mediaAsBackground && inlinePicture"
      :color="banner.backgroundColor"
    />
    <div class="tweet-wrapper">
      <div class="tweet" v-if="banner.tweetEmbed">
        <div class="tweet-user">
          <div class="tweet-user-pic">
            <img :src="banner.tweetEmbed.user.profile_image_url_https" />
          </div>
          <div class="tweet-user-name">
            <div class="tweet-user-full_name">
              {{ banner.tweetEmbed.user.name }}
              <span v-if="banner.tweetEmbed.user.verified" class="verified">
                <b-icon icon="badge-check" pack="fas" size="is-small" />
              </span>
            </div>
            <div class="tweet-user-screen_name">
              @{{ banner.tweetEmbed.user.screen_name }}
            </div>
          </div>
          <div class="tweet-icon">
            <b-icon icon="twitter" pack="fab" />
          </div>
        </div>
        <div class="tweet-text" :style="{ fontSize: textFontSize }" contenteditable v-html="tweetText"></div>
        <div class="tweet-picture" v-if="inlinePicture && !banner.mediaAsBackground">
          <img
            :src="inlinePicture"
            alt="Imatge"
            :style="objectPosition" />
        </div>
        <div class="tweet-quote" v-if="banner.tweetEmbed.is_quote_status">
          <div class="tweet-quote-user">
            <img :src="banner.tweetEmbed.quoted_status.user.profile_image_url_https" />
            <strong>{{ banner.tweetEmbed.quoted_status.user.name }}</strong>
            <b-icon icon="badge-check" pack="fas" size="is-small" v-if="banner.tweetEmbed.quoted_status.user.verified" class="verified" />
            <span class="tweet-quote-user-screen_name">@{{ banner.tweetEmbed.quoted_status.user.screen_name }}</span>
          </div>
          <div class="tweet-quote-text">{{ banner.tweetEmbed.quoted_status.full_text }}</div>
        </div>
        <div class="tweet-date">
          {{ banner.tweetEmbed.created_at | formatFullDate }}
        </div>
        <div class="tweet-counts">
          <div class="tweet-counts-rts">
            <b-icon icon="retweet" />
            <span v-if="banner.showCounts">{{ banner.tweetEmbed.retweet_count | formatNumber }}</span>
          </div>
          <div class="tweet-counts-faves">
            <b-icon icon="heart" />
            <span v-if="banner.showCounts">{{ banner.tweetEmbed.favorite_count | formatNumber }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cta" v-if="banner.showCta && banner.cta">
      <span>{{ banner.cta }}</span>
      <div>
        <img src="./images/point-down.png" alt="" />
      </div>
    </div>
    <banner-frame :logo-type="banner.backgroundColor === 'white' ? 'color' : 'auto'" />
  </div>
</template>

<script>
import BannerPicture from '@/components/canvas/BannerPicture.vue'
import BannerFrame from '@/components/canvas/BannerFrame.vue'
import moment from 'moment'
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'tweet-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    BannerPicture
  },

  computed: {
    tweetText () {
      const text = this.banner.tweetEmbed.full_text
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const hashtagRegex = /(^|\B)#(?![0-9_]+\b)([A-Za-zÀ-ÖØ-öø-ÿñ0-9_]{1,30})(\b|\r)/g
      const mentionRegex = /@[A-Za-z0-9_-]*/g
      return text
        .replace(urlRegex, '')
        .replace(hashtagRegex, (text) => `<span class="ht">${text}</span>`)
        .replace(mentionRegex, (text) => `<span class="ht">${text}</span>`)
    },

    inlinePicture () {
      const { banner } = this

      if (banner.mediaType === 'none') {
        return false
      }

      if (banner.mediaType === 'tweetimage' && banner.tweetEmbed.entities.media) {
        return banner.tweetEmbed && banner.tweetEmbed.entities['media'] && banner.tweetEmbed.entities['media'][0].media_url_https
      }

      return banner.pictureBlob || banner.picturePreview
    },

    textFontSize () {
      const fontSize = this.fontSize(this.banner.tweetEmbed.full_text, 40, 24, 280, this.banner.textSize, true)
      return (this.inlinePicture && !this.banner.mediaAsBackground) ? `${fontSize * 0.6}px` : `${fontSize}px`
    }
  },

  filters: {
    formatFullDate (date) {
      return moment(date).locale('ca').format('LLL')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .banner-canvas {
    --background: #{$gray-900};
    --base-color: #{$white};
    --quote-border-color: #{rgba($white, .75)};
    --twitter-color: #{$white};
    --link-color: #{$primary};
    --card-background: transparent;

    &.background-black {
      --shadow-color: rgba(0, 0, 0, .15);
    }

    &.background-white {
      --background: #{$white};
      --base-color: #{$gray-900};
      --quote-border-color: #{rgba($gray-900, .5)};
      --twitter-color: #1DA1F2;
    }

    &.background-orange {
      --background: #{$gradient};
      --link-color: #{$white};
      --link-decoration: underline;
    }

    &.background-lgbt {
      --background: #{$gradient-lgtb};
      --gradient-orientation: 153.5deg;
      --link-color: #{$white};
      --link-decoration: underline;
    }

    &.background-feminism {
      --background: url(../../../assets/gradients/feminism-background.jpg);
      --link-color: #{$white};
      --link-decoration: underline;
      .background {
        background-size: 100% 100%;
      }
    }

    &.background-green {
      --background: #{$gradient-green};
      --link-color: #{$white};
      --link-decoration: underline;
    }

    &.style-card {
      --base-color: #{$gray-900};
      --twitter-color: #1DA1F2;
      --quote-border-color: #{$gray-300};
      --link-color: #{$primary};
      --link-decoration: none;
      --card-background: #{$white};
    }

    &.style-card.mode-black {
      --base-color: #{$white};
      --twitter-color: #{$white};
      --quote-border-color: #{$gray-600};
      --link-color: #{$primary};
      --link-decoration: none;
      --card-background: #{$gray-900};
    }
  }

  .background {
    background: var(--background);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      opacity: .15;
      object-fit: cover;
    }
  }

  .tweet {
    color: var(--base-color);
    border: 2px var(--base-color) solid;
    background-color: var(--card-background);
    border-radius: $card-radius;
    padding: 26px;
    width: 100%;
    max-height: 530px;
    overflow: hidden;

    &-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      top: 40px;
      left: 70px;
      right: 70px;
      bottom: 80px;
      z-index: 200;
    }

    &-picture {
      margin-top: 16px;

      img {
        border-radius: 6px;
        border: 1px $gray-300 solid;
        width: 100%;
        max-height: 250px;
        object-fit: cover;
      }

      &-as-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        z-index: 2;
        opacity: .15;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @at-root .background-transparent {
          .tweet-picture-as-background {
            opacity: 1;
          }
        }
      }
    }

    &-user {
      display: flex;
      margin-bottom: 16px;
      line-height: 1.25;

      &-pic img {
        border-radius: 50%;
        margin-right: 12px;
      }

      &-name {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-weight: bold;
      }

      &-full_name {
        display: flex;
        align-items: center;
        font-size: 17px;

        .verified {
          display: flex;
          align-items: center;
          margin-left: 6px;
          color: var(--twitter-color);
        }
      }

      &-screen_name {
        font-weight: normal;
        opacity: .5;
      }
    }

    &-text {
      font-size: 28px;
      line-height: 1.25;
      white-space: pre-wrap;
    }

    &-quote {
      border: 1px var(--quote-border-color) solid;
      border-radius: .5rem;
      margin-top: 16px;
      padding: 12px;

      &-user {
        display: flex;
        align-items: center;
        margin-bottom: 6px;

        img {
          border-radius: 50%;
          width: 25px;
          height: 25px;
          margin-right: 8px;
        }

        strong {
          color: var(--base-color);
          margin-right: 6px;
        }

        &-screen_name {
          margin-left: 8px;
          opacity: .5;
        }

        .verified {
          color: var(--twitter-color);
        }
      }
    }

    &-date {
      margin: 13px 0;
      opacity: .5;
    }

    &-icon {
      margin-left: auto;
      color: var(--twitter-color);
    }

    &-counts {
      display: flex;

      &-rts,
      &-faves {
        display: flex;
        align-items: center;
        margin-right: 26px;

        .icon {
          margin-right: 6px;
        }
      }
    }
  }

  .cta {
    display: flex;
    position: absolute;
    bottom: 18px;
    right: 490px;
    color: var(--base-color);
    font-size: 25px;
    align-items: center;
    font-weight: bold;
    letter-spacing: -.02em;
    z-index: 3;

    img {
      display: block;
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }

    div {
      display: flex;
      align-items: flex-end;
      height: 100%;
    }

    span {
      display: block;
      max-width: 130px;
      line-height: 1;
      text-align: right;
    }
  }

  .logo {
    color: $white;
    z-index: 20;

    &-local-label {
      color: $white;
    }
  }

  .background-white .logo-local-label {
    color: $gray-600;
  }

  .style-card,
  .style-dark {
    .tweet {
      border: 0;
      box-shadow: $raised-shadow;
    }

    .cta {
      color: $white;
    }

    &.background-white .cta {
      color: $gray-900;
    }
  }
</style>
<style lang="scss">
.tweet {
  &-icon svg {
    width: 28px !important;
    height: 28px !important;
  }

  .ht {
    color: var(--link-color);
    text-decoration: var(--link-decoration, none);
  }
}
</style>
