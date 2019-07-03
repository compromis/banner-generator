<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + bannerProperties.disposition : '',
      bannerProperties.localLabel ? 'has-local-label' : '',
      bannerProperties.headline.length > 105 ? 'has-long-headline' : ''
    ]"
    v-if="bannerProperties">
    <div class="blob blob-image">
      <vue-draggable-resizable class="blob-image-wrapper" :w="bannerProperties.pictureWidth" :h="bannerProperties.pictureHeight" :parent="false" v-if="bannerProperties">
        <img :src="bannerProperties.picturePreview" alt="Imatge" v-if="bannerProperties.picturePreview" ref="image" />
      </vue-draggable-resizable>
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div :class="sourceClass">
      <div class="headline-source headline-source--custom" v-if="bannerProperties.source === 'other'">
        <span :style="{ 'color': bannerProperties.customSourceColor }">{{ bannerProperties.customSource }}</span>
      </div>
      <div class="headline-source" v-else>
        <img :src="bannerProperties.source.logo" :alt="bannerProperties.source.name" :style="{ height: bannerProperties.source.logoHeight + 'px' }" />
      </div>
      <div class="headline-text" contenteditable :style="{ fontFamily: bannerProperties.source.fontFamily }">
        {{ bannerProperties.headline }}
      </div>
    </div>
    <div class="logo">
      <img :src="logo" alt="Compromís" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': bannerProperties.localLabel.length > 20 }" v-if="bannerProperties.localLabel">{{ bannerProperties.localLabel }}</div>
    </div>
    <div class="hashtag" v-if="bannerProperties.hashtag">
      {{ bannerProperties.hashtag }}
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import Logo from '../../../assets/logo-compromis.svg'

export default {
  name: 'HeadlineBanner',

  components: {
    VueDraggableResizable
  },

  props: {
    bannerProperties: Object,
    aspect: String
  },

  data () {
    return {
      logo: Logo
    }
  },

  computed: {
    sourceClass: function () {
      if (!this.bannerProperties) return
      const name = this.bannerProperties.source === 'other' ? 'other' : this.bannerProperties.source.id
      return {
        'headline': true,
        [name]: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto:700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Montserrat:700&display=swap');

  @font-face {
    font-family: 'Tiempos Headline';
    src: url('../../../assets/fonts/TiemposHeadline-Medium.eot');
    src: url('../../../assets/fonts/TiemposHeadline-Medium.eot?#iefix') format('embedded-opentype'),
        url('../../../assets/fonts/TiemposHeadline-Medium.woff2') format('woff2'),
        url('../../../assets/fonts/TiemposHeadline-Medium.woff') format('woff'),
        url('../../../assets/fonts/TiemposHeadline-Medium.svg#TiemposHeadline-Medium') format('svg');
    font-weight: 700;
    font-style: normal;
  }

  .banner-canvas {
    box-sizing: content-box;
    position: relative;
    width: 720px;
    height: 720px;
    border: 1px $white solid;
    outline: 1px $gray-900 solid;
    overflow: hidden;
    transition: all .5s ease-in-out;
  }

  .headline {
    position: absolute;
    top: 460px;
    left: 0;
    z-index: 100;
    padding: 0 40px;
    font-family: 'Tiempos Headline', serif;
    font-weight: 700;
    transition: all .5s ease-in-out;

    &-source {
      margin-bottom: .25rem;

      &--custom {
        margin-bottom: 4px;
      }
    }

    &-text {
      font-size: 30px;
      line-height: 1.1;
      word-wrap: break-word;
    }
  }

  .blob {
    position: absolute;
    width: 720px;
    height: 720px;
    overflow: hidden;
    border-radius: $border-radius;
    background: linear-gradient(45deg,$gradient-start,$gradient-end);
    transform: rotate($rotation);
    transition: all .5s ease-in-out;

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
      top: -55px;
      left: -140px;
      height: 440px;
      z-index: 20;
      background: $gray-300;

      &-wrapper {
        margin: -10px;
        transform: rotate(-$rotation) scale(1.1);
        cursor: move;

        &:hover {
          background: $blue;

          img {
            opacity: .75;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .25s ease-in-out;
        }
      }
    }
  }

  .logo {
    display: flex;
    position: absolute;
    right: 35px;
    bottom: 15px;
    align-items: center;

    img {
      height: 30px;
    }

    &-local-label {
      border-left: 1px $gray-400 solid;
      margin-left: .75rem;
      padding-left: .75rem;
      font-size: 1.25rem;
      letter-spacing: -.3px;
      line-height: 1;
      white-space: nowrap;

      &--long {
        font-size: .95rem;
        white-space: normal;
        width: 90px;
      }
    }
  }

  .hashtag {
    position: absolute;
    z-index: 30;
    bottom: 20px;
    left: 35px;
    color: $white;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -.3px;
  }

  .has-local-label {
    .blob-2 {
      left: -60%;
    }
  }

  .aspect-916 {
    width: 405px;

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
        top: -65px;
        left: -12px;
      }
    }

    .headline {
      top: 430px;

      &-text {
        font-size: 26px;
      }
    }

    .logo {
      display: none;
    }
  }

  .disposition-1 {
    .headline {
      top: 100px;
    }

    &.has-long-headline {
      .blob-image{
        bottom: -120px;
      }
    }

    .blob {
      &-1 {
        top: -90%;
        left: -40%;
        bottom: auto;
        right: auto;
      }

      &-2 {
        display: none;
      }

      &-image {
        left: auto;
        top: auto;
        bottom: -90px;
        right: -80px;
        height: 570px;
      }
    }
  }
</style>
