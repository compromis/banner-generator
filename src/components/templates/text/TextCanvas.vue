<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="text text-wysiwyg" v-if="banner.text">
      <div v-html="banner.text"></div>
    </div>
    <div class="logo">
      <compromis-logo :mono="true" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
    <div class="hashtag" v-if="aspect === '11'">
      {{ banner.hashtag }}
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'text-canvas',

  mixins: [CanvasMixin]
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    position: absolute;
    background: $white;
    bottom: 80px;
    left: 40px;
    right: 40px;
    z-index: 30;
    box-shadow: $raised-shadow;
    border-radius: $card-radius;
    padding: 24px 24px;
    max-height: 515px;
    overflow: hidden;
  }

  .blob {
    &-1 {
      left: -58%;
      top: -82%;
      z-index: 20;
    }

    &-2 {
      right: -57%;
      bottom: -81%;
      z-index: 20;
      --gradient-orientation: -45deg;
    }

    &-image {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      z-index: 10;
      background: $gray-300;
      transform: rotate(0);
      border-radius: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: rotate(0);
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

  .hashtag {
    top: 20px;
    left: 35px;
    bottom: auto;
  }

  .has-local-label {
    .blob-2 {
      right: -40%;
    }
  }

  // Story aspect
  .aspect-916 {
    .blob {
      &-1 {
        top: -85%;
        left: -120%;
      }

      &-2 {
        right: -120%;
        bottom: -84%;
      }
    }

    .text {
      left: 16px;
      right: 16px;
      padding: 16px;
    }

    .logo {
      display: none;
    }
  }
</style>

<style lang="scss">
  @import "../../../sass/variables";

  .text-wysiwyg {
    font-size: 20px;

    h1 {
      font-size: 40px;
      letter-spacing: -1px;
      font-weight: bold;
      margin: 0;
      line-height: 1.1;
    }

    h2 {
      background: $gray-100;
      padding: 16px 24px;
      margin: 16px -24px;
      font-size: 24px;
      letter-spacing: -.5px;
      line-height: 1.1;
    }

    p {
      line-height: 1.1;
      margin: 8px 0;
    }

    ol {
      li {
        margin-left: 30px;
        line-height: 1;
        margin-bottom: 12px;
      }
    }

    ul {
      li {
        padding-left: 30px;
        line-height: 1;
        margin-bottom: 12px;

        &::before {
          position: absolute;
          content: '➡️';
          color: $orange;
          font-weight: bold;
          left: 24px;
        }
      }

      &[data-checked] {
        li::before {
          content: '✅';
        }
      }
    }

    u {
      color: $orange;
    }
  }

  .aspect-916 {
    h2 {
      padding: 16px;
      margin: 16px -16px;
      font-size: 20px;
    }

    ul {
      li {
        padding-left: 28px;

        &::before {
          left: 16px;
        }
      }
    }
  }
</style>
