<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' || banner.card ? 'disposition-' + banner.disposition : '',
      banner.card ? 'cards' : 'no-cards',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      banner.headline.length > 95 ? 'has-long-headline' : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="headline">
      <div class="headline-source headline-source--custom" v-if="banner.source === 'other'" :style="banner.card ? { backgroundColor: banner.customSourceColor } : null">
        <span :style="banner.card ? { color: 'white' } : { color: banner.customSourceColor }">{{ banner.customSource }}</span>
      </div>
      <div class="headline-source" v-else-if="banner.source" :style="banner.card ? { backgroundColor: banner.source.color } : null">
        <img :src="banner.source.hasOwnProperty('logoCard') && banner.card ? banner.source.logoCard : banner.source.logo" :alt="banner.source.name" :style="{ height: banner.source.logoHeight + 'px' }" />
      </div>
      <div class="headline-text"
        :style="{
          fontFamily: banner.source ? banner.source.fontFamily : false,
          fontSize: aspect === '11' ? fontSize('headline', 50, 30, 160) : fontSize('headline', 35, 23.5, 160),
          letterSpacing: banner.source ? banner.source['letterSpacing'] : false
        }">
        {{ banner.headline | formatString }}
      </div>
    </div>
    <div class="logo">
      <compromis-logo :mono="banner.card ? true : false" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
    <div class="hashtag" v-if="banner.hashtag && aspect === '11'">
      {{ banner.hashtag }}
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'headline-canvas',

  mixins: [CanvasMixin]
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./fonts";

  .headline {
    display: flex;
    position: absolute;
    top: 425px;
    left: 0;
    z-index: 30;
    height: 200px;
    padding: 0 40px;
    font-family: 'Tiempos Headline', serif;
    font-weight: 700;
    transition: all .5s ease-in-out;
    flex-direction: column;
    justify-content: center;

    &-source {
      margin-bottom: 4px;

      &--custom {
        margin-bottom: 4px;
        font-size: 22px;
      }
    }

    &-text {
      font-size: 27px;
      line-height: 1.1;
      word-wrap: break-word;
    }
  }

  .blob {
    &-1 {
      top: -42%;
      right: -55%;
      z-index: 10;
    }

    &-2 {
      left: -42%;
      bottom: -91%;
      z-index: 10;
    }

    &-image {
      top: -25px;
      left: -30px;
      width: 620px;
      height: 410px;
      z-index: 20;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      img {
        width: 98%;
        height: 100%;
        margin: 27px;
      }
    }
  }

  .has-local-label {
    .blob-2 {
      left: -60%;
    }
  }

  // Square aspect
  .aspect-11 {
    .blob-image {
      border-bottom-left-radius: 0;
    }
  }

  // Story aspect
  .aspect-916 {
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
        top: -20px;
        left: -12px;
        width: 444px;
        height: 395px;
        border-bottom-right-radius: 0;

        img {
          width: 93%;
          margin: 15px 10px;
        }
      }
    }

    .headline {
      top: 430px;

      &-text {
        font-size: 20px;
      }
    }

    .logo {
      display: none;
    }
  }

  // Headline on top
  .disposition-1.no-cards {
    .headline {
      top: 90px;
      height: 172px;
    }

    .blob-image {
      img {
        margin: -29px -14px;
      }
    }

    &.has-local-label {
      .blob-1 {
        left: -60%;
        top: -88%;
      }
    }

    .logo {
      bottom: 666px;
    }

    .hashtag {
      bottom: 668px;
    }

    .blob {
      &-1 {
        top: -90%;
        right: 40%;
      }

      &-2 {
        opacity: 0;
      }

      &-image {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        top: 285px;
        left: 130px;
        height: 500px;
      }
    }
  }

  /* Card style */
  .cards {
    .headline {
      z-index: 30;
      left: 40px;
      right: 40px;
      bottom: 90px;
      top: auto;
      background: $white;
      box-shadow: $raised-shadow;
      border-radius: $card-radius;
      height: auto;
      padding: 26px;
      overflow: hidden;

      &-source {
        background: $green;
        margin: -26px -26px 26px -26px;
        padding: 8px 26px;

        img {
          position: relative;
          top: 3px;
          filter: grayscale(100%) brightness(0) invert(1);
        }

        &--custom {
          font-size: 22px;
          color: $white;
          font-family: Compromis, sans-serif;
        }
      }
    }

    .blob {
      &-1 {
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

      &-image {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(0);
        border-radius: 0;
        z-index: 0;

        img {
          transform: rotate(0);
          width: 100%;
          margin: 0;
        }
      }
    }

    .logo {
      z-index: 30;
      color: $white;
    }

    .hashtag {
      top: 20px;
      left: 35px;
      bottom: auto;
    }

    &.has-local-label {
      .blob-2 {
        right: -44%;
      }
    }

    /* Cards with headline on top */
    &.disposition-1 {
      .headline {
        top: 88px;
        bottom: auto;
      }
    }

    /* Cards in story aspect */
    &.aspect-916 {
      .headline {
        left: 16px;
        right: 16px;
        padding: 18px;

        &-source {
          margin: -18px -18px 18px -18px;
          padding: 8px 18px;
        }
      }

      .blob {
        &-1 {
          left: -118%;
        }

        &-2 {
          right: -104%;
        }
      }

      /* Cards in story aspect with headline on top */
      &.disposition-1 {
        .headline {
          top: 88px;
          bottom: auto;
        }
      }
    }
  }
</style>
