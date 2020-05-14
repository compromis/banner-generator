<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      banner.card ? 'cards' : 'no-cards',
      banner.localLabel ? 'has-local-label' : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="quote">
      <div :class="['quote-glyph', 'quote-glyph-' + banner.textColor ]" >“</div>
      <div class="quote-text-wrapper">
        <text-in-pills
        v-if="banner.quote"
        :text="$options.filters.formatString($options.filters.formatQuote(banner.quote))"
        :pill-style="banner.textColor"
        :font-size="fontSizePrimary"
        :text-align="textAlign"
        :width="500" />
      </div>
      <div class="quote-author">{{ banner.author | formatString }}</div>
    </div>
    <div class="logo">
      <compromis-logo :mono="banner.card ? true : false" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/utils/TextInPills'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    TextInPills
  },

  computed: {
    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize('quote', 60, 35, 110, banner.textSize)
        : fontSize('quote', 50, 25, 110, banner.textSize)
    },
    textAlign () {
      return this.banner.disposition === 0 || this.aspect === '916'
        ? 'left'
        : 'right'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .quote {
    display: flex;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 40;
    box-sizing: border-box;
    padding: 0 45px;
    width: 420px;
    height: 550px;
    z-index: 20;
    flex-direction: column;
    justify-content: center;
    transition: all .5s ease-in-out;
    font-family: $family-primary;

    &-text {
      font-size: 32px;
      line-height: 1.42;
      color: white;
      padding: 0 10px;
      border-radius: 2px;
      background: linear-gradient(45deg,$gradient-start,$gradient-end);
      letter-spacing: -1px;
      display: inline;
      word-wrap: break-word;
      font-family: $family-primary;
      font-weight: bold;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;

      &-wrapper {
        position: relative;
      }
    }

    &-glyph {
      font-size: 170px;
      font-weight: bold;
      margin-bottom: -134px;
      margin-left: -24px;
      margin-top: -58px;

      &-black {
        color: $gray-darkest;
      }

      &-white {
        color: $white;
      }

      &-orange {
        color: $gradient-start;
      }
    }

    &-author {
      font-size: 19px;
      letter-spacing: -0.5px;
      margin-top: 12px;
      line-height: 1.2;
      width: 165px;
      color: $gray-600;
      white-space: pre-line;
      max-height: 90px;
      overflow: hidden;
    }
  }

  .blob {
    &-1 {
      display: none;
    }

    &-2 {
      left: -67%;
      bottom: -88%;
      z-index: 10;
    }

    &-image {
      top: -4%;
      right: -4%;
      height: 600px;
      z-index: 20;
      width: 535px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      img {
        width: 100%;
        margin: 21px -30px;
      }
    }
  }

  // Story aspect
  .aspect-916 {
    .quote {
      bottom: 153px;
      top: 221px;
      padding: 0 30px;
      height: 415px;
      justify-content: flex-end;
      width: 95%;

      &-text {
        font-size: 28px;
      }

      &-author {
        width: 100%;
        max-height: 120px;
      }
    }

    .blob {
      &-1 {
        top: -43%;
        right: -120%;
      }

      &-2 {
        left: -110%;
        bottom: -94%;
      }

      &-image {
        width: 440px;
        height: 472px;
        top: -27px;
        left: -12px;
        border-bottom-right-radius: 0;

        img {
          width: 96%;
          margin: 21px 3px;
        }
      }
    }

    .logo {
      display: none;
    }
  }

  // Quote on top
  .disposition-1 {
    .quote {
      top: 18%;
      align-items: flex-end;
      text-align: right;
      right: 10px;
      left: auto;

      &-text {
        margin: 0 -10px;
      }

      &-glyph {
        margin-right: -12px;

        &-orange {
          color: $gradient-end;
        }
      }

      &-author {
        width: 122px;
        text-align: right;
        margin-right: -10px;
      }
    }

    .logo {
      bottom: 665px;
      left: 30px;
      right: auto;
    }

    .hashtag {
      bottom: 668px;
    }

    .blob {
      &-2 {
        left: 444px;
         bottom: 640px;
      }

      &-image {
        left: auto;
        top: auto;
        border-top-right-radius: 80px;
        border-bottom-left-radius: 0;
        bottom: -26px;
        right: 236px;
        height: 620px;
        width: 511px;

        img {
          margin: -18px 28px;
        }
      }
    }
  }

  .cards {
    .quote {
      top: 100px;

      &-text {
        background: $white;
        color: $gray-900;
      }

      &-author {
        font-weight: bold;
        color: $white;
        text-shadow: 0 0 8px $black;
        overflow: visible;
        width: 250px;
      }
    }
    .blob {
      &-image {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: rotate(0);
        border-radius: 0;
        width: 100%;
        height: 100%;
        z-index: 0;

        img {
          transform: rotate(0);
          margin: 0;
          width: 100%;
          height: 100%;
        }
      }

      &-1 {
        display: block;
        left: -58%;
        top: -82%;
        z-index: 20;
      }

      &-2 {
        left: auto;
        right: -57%;
        bottom: -81%;
        z-index: 20;
        --gradient-orientation: -45deg;
      }
    }

    .logo {
      color: $white;
      z-index: 25;
    }

    &.has-local-label {
      .blob-2 {
        right: -44%;
      }
    }

    &.aspect-916 {
      .cards .quote {
        bottom: 115px;
        top: auto;
      }

      .blob {
        &-1 {
          left: -118%;
        }

        &-2 {
          right: -104%;
        }
      }
    }

    &.disposition-1 {
      .quote {
        top: 40px;
      }

      .logo {
        right: 35px;
        bottom: 25px;
        left: auto;
      }
    }
  }
</style>
