<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' || banner.card ? 'disposition-' + banner.disposition : '',
      banner.card ? 'cards' : 'no-cards',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="comparison-images">
      <img :src="banner.pictureBeforePreview" alt="Imatge" v-if="banner.pictureBeforePreview" :style="objectPositionBefore" />
      <img :src="banner.pictureAfterPreview" alt="Imatge" v-if="banner.pictureAfterPreview" :style="objectPositionAfter" />
    </div>
    <div class="blob blob-1"  :style="banner.source === 'other' ? { background: banner.customSourceColor } : banner.source ? { background: banner.source.color } : { background: 'gray' }"></div>
    <div class="blob blob-2"></div>
    <div class="before-party before-party--custom" v-if="banner.source === 'other'" >
      {{ banner.customSource }}
    </div>
    <div class="before-party" v-else-if="banner.source" >
      <img :src="banner.source.logo" :alt="banner.source.name" :style="{ height: banner.source.logoHeight + 'px' }" />
    </div>
    <div class="comparison">
      <div class="comparison-text comparison-text-before"
        :style="{
          fontSize: fontSize(banner.textBefore, 45, 30, 160, banner.textSize),
        }">
        {{ banner.textBefore | formatString }}
      </div>
      <div class="comparison-text comparison-text-after"
        :style="{
          fontSize: fontSize(banner.textAfter, 45, 30, 160, banner.textSize),
        }">
        {{ banner.textAfter | formatString }}
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
  name: 'comparison-canvas',

  mixins: [CanvasMixin],

  computed: {
    objectPositionAfter: function () {
      const objectPosition = (100 - this.banner.pictureAfterPos) + '% 0%'
      return { objectPosition }
    },
    objectPositionBefore: function () {
      const objectPosition = (100 - this.banner.pictureBeforePos) + '% 0%'
      return { objectPosition }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .comparison {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    font-family: $family-primary;
    font-weight: 700;
    transition: all .5s ease-in-out;

    &-images {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 12px;
      align-items: stretch;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;

      img {
        object-fit: cover;
      }
    }

    &-text {
      line-height: 1.1;
      word-wrap: break-word;
      background: $white;
      width: 265px;
      padding: 16px;
      border-radius: $card-radius;
      box-shadow: $raised-shadow;
      position: absolute;
      letter-spacing: -.5px;

      &-before {
        top: 90px;
        left: 30px;
      }

      &-after {
        bottom: 90px;
        right: 30px;
      }
    }
  }

  .blob {
    &-1 {
      top: -82%;
      right: 58%;
      z-index: 10;
    }

    &-2 {
      left: 58%;
      bottom: -83%;
      z-index: 10;
    }
  }

  .before-party {
    z-index: 20;
    position: absolute;
    left: 35px;
    top: 25px;

    &--custom {
      margin-bottom: 4px;
      font-size: 24px;
      color: $white;
      font-weight: bold;
    }
  }

  .has-local-label {
    .blob-2 {
      left: 42%;
      bottom: -81%;
    }
  }

  .logo {
   color: white;
    z-index: 20;
  }

</style>
