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
      :picture-position="backgroundPicturePosition"
      :full-gradient="(banner.fullGradient && banner.style === 'card') || banner.style === 'transparent'"
      :picture="backgroundPicture"
      :color="banner.backgroundColor"
    />
    <div class="tweet-wrapper">
      <div class="tweet">
        <div class="tweet-user">
          <div class="tweet-user-pic">
            <img v-if="profilePicture" :src="profilePicture" :style="profilePicturePosition" />
          </div>
          <div class="tweet-user-name">
            <div class="tweet-user-full_name">
              {{ banner.name }}
              <span v-if="banner.verified" class="verified">
                <b-icon icon="badge-check" pack="fas" size="is-small" />
              </span>
            </div>
            <div class="tweet-user-screen_name">
              @{{ banner.username }}
            </div>
          </div>
          <div class="tweet-icon">
            <x-icon />
          </div>
        </div>
        <div class="tweet-text" :style="{ fontSize: textFontSize }" contenteditable>{{ banner.text }}</div>
        <div class="tweet-picture"
          v-if="postPicture"
          :style="{ backgroundImage: `url(${postPicture})`, ...postPicturePosition }">
        </div>
        <div class="tweet-counts">
          <div class="tweet-counts-rts">
            <b-icon icon="retweet" />
            <span v-if="banner.showCounts">{{ banner.reposts | formatNumber }}</span>
          </div>
          <div class="tweet-counts-faves">
            <b-icon icon="heart" />
            <span v-if="banner.showCounts">{{ banner.likes | formatNumber }}</span>
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
import CanvasMixin from '@/mixins/canvas-mixin.js'
import XIcon from './XIcon'

export default {
  name: 'tweet-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    BannerPicture,
    XIcon
  },

  computed: {
    textFontSize () {
      const fontSize = this.fontSize(this.banner.text, 40, 24, 280, this.banner.textSize, true)
      return `${fontSize}px`
    },

    backgroundPicture () {
      return this.getPicture('background')
    },

    backgroundPicturePosition () {
      return this.computeBackgroundPosition('background')
    },

    profilePicture () {
      return this.getPicture('profile')
    },

    profilePicturePosition () {
      return this.computeObjectPosition('profile')
    },

    postPicture () {
      return this.getPicture('post')
    },

    postPicturePosition () {
      return this.computeBackgroundPosition('post')
    }
  },

  methods: {
    getPicture (prefix) {
      return this.banner[`${prefix}PictureBlob`] || this.banner[`${prefix}PicturePreview`]
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
    --x-color: #{$white};
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
      --x-color: #000;
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
      --x-color: #000;
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
      background-size: cover;
      border-radius: 6px;
      border: 1px $gray-300 solid;
      height: 250px;

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
        object-fit: cover;
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
      line-height: 1.2;
      white-space: pre-wrap;
      margin-bottom: 14px;
    }

    &-icon {
      margin-left: auto;
      color: var(--x-color);
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
