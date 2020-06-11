<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      `card-${banner.card}`,
      `background-${banner.backgroundColor}`,
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
    ]"
    v-if="banner">
    <div class="background">
      <img
        :src="banner.tweetEmbed.entities.media[0].media_url_https"
        v-if="banner.tweetEmbed && banner.tweetEmbed.entities['media'] && banner.showMedia"
        alt="Imatge"
        :style="objectPosition" />
    </div>
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
        <div class="tweet-text" :style="{ fontSize: textFontSize }" contenteditable>{{ banner.tweetEmbed.full_text | removeUrls }}</div>
        <div class="tweet-quote" v-if="banner.tweetEmbed.is_quote_status">
          <div class="tweet-quote-user">
            <img :src="banner.tweetEmbed.quoted_status.user.profile_image_url_https" />
            <strong>{{ banner.tweetEmbed.quoted_status.user.name }}</strong>
            <b-icon icon="badge-check" pack="fas" size="is-small" v-if="banner.tweetEmbed.quoted_status.user.verified" />
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
            <span v-if="banner.showCounts">{{ banner.tweetEmbed.retweet_count }}</span>
          </div>
          <div class="tweet-counts-faves">
            <b-icon icon="heart" />
            <span v-if="banner.showCounts">{{ banner.tweetEmbed.favorite_count }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
      <compromis-logo :mono="true" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'tweet-canvas',

  mixins: [CanvasMixin],

  computed: {
    textFontSize () {
      return this.fontSize(this.banner.tweetEmbed.full_text, 40, 24, 280)
    }
  },

  filters: {
    formatFullDate (date) {
      return moment(date).format('D MMMM [a les] H:mm')
    },

    removeUrls (value) {
      var urlRegex = /(https?:\/\/[^\s]+)/g
      return value.replace(urlRegex, '')
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

    &.background-white {
      --background: #{$white};
      --base-color: #{$gray-900};
      --quote-border-color: #{rgba($gray-900, .5)};
      --twitter-color: #1DA1F2;
    }

    &.background-orange {
      --background: #{$gradient};
    }
  }

  .background {
    background: var(--background);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

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
    border-radius: $card-radius;
    padding: 26px;
    width: 100%;

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

        .verified {
          display: flex;
          align-items: center;
          margin-left: 6px;
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
      }
    }

    &-date {
      margin: 16px 0 32px;
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

  .logo {
    color: $white;
    z-index: 20;

    &-local-label {
      color: $white;
    }
  }

  .card-1 {
    --base-color: #{$gray-900};

    .tweet {
      border: 0;
      background: $white;
      box-shadow: $raised-shadow;
    }
  }
</style>
<style lang="scss">
.tweet {
  &-icon svg {
    width: 28px !important;
    height: 28px !important;
  }
}
</style>
