<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      'blobs-' + color,
      'border-' + banner.frameColor
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="text" :style="{ alignItems: banner.textPos, textAlign: banner.textAlign }">
      <div class="text-wrapper">
        <div class="text-holder text-holder-secondary" contenteditable v-if="banner.textSecondary">
          <div :class="['text-lines', 'text-lines-' + banner.textSecondaryColor]" :style="{ fontSize: aspect === '11' ? fontSize('text', 60, 35, 80, banner.textSize) : fontSize('text', 70, 25, 110, banner.textSize) }"><span>{{ banner.textSecondary | formatString }}</span></div>
        </div>
        <div class="text-holder" contenteditable v-if="banner.text">
          <div :class="['text-lines', 'text-lines-' + banner.textColor]" :style="{ fontSize: aspect === '11' ? fontSize('text', 80, 35, 110, banner.textSize) : fontSize('text', 70, 25, 110, banner.textSize) }"><span>{{ banner.text | formatString }}</span></div>
        </div>
      </div>
    </div>
    <emojis-in-canvas v-model="banner.emojis" />
    <goo-filter />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import GooFilter from '@/utils/GooFilter'
import EmojisInCanvas from '@/utils/EmojisInCanvas'

export default {
  name: 'video-cover-canvas',

  mixins: [CanvasMixin],

  components: {
    GooFilter,
    EmojisInCanvas
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .banner-canvas {
    border: 20px solid white;
    box-sizing: border-box;
  }

  .border {
    &-black {
      border-color: $gray-darkest;
    }

    &-orange {
      border-image-slice: 1;
      border-image-source: $gradient;
    }

    &-white {
      border-color:  $white;
    }
  }

  .text {
    display: flex;
    position: absolute;
    top: 80px;
    bottom: 80px;
    left: 0;
    z-index: 30;
    width: 100%;
    transition: all .5s ease-in-out;

    &-wrapper {
      width: 100%;
    }

    &-holder {
      width: 100%;
      padding: 0 45px;
      -webkit-line-break: normal;

      &-secondary {
        margin-bottom: 1rem;
      }
    }

    &-lines {
      font-size: 45px;
      line-height: 1.25;
      padding: 0 10px;
      letter-spacing: -1px;
      display: inline;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: $family-primary;
      font-weight: bold;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -webkit-line-break: normal;
      filter: url('#goo');

      &-black {
        background: $gray-darkest;
        color: $white;
      }

      &-orange {
        background: $gradient;
        color: $white;
        background-attachment:fixed;
      }

      &-white {
        background-color:  $white;

        span {
          background: $gradient;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

        }
      }
    }
  }

  .blob {
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

  // Story aspect
  .aspect-916 {
    .quote {
      top: 370px;

      &-glyph {
        top: -105px;
        font-size: 140px;
      }

      &-text {
        font-size: 28px;
      }
    }
  }
</style>
