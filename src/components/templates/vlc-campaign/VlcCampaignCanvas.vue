<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'banner-background-' + banner.mode,
    ]"
    v-if="banner">
    <div class="background"></div>
    <div class="banner-grid">
      <div class="picture">
        <div class="background-picture">
          <img v-if="banner.picture" :src="banner.picturePreview" :style="objectPosition" />
        </div>
        <vlc-seal :style="randomizedSeal"/>
      </div>
      <div class="text" contenteditable>{{ banner.text | formatString }}</div>
    </div>
    <banner-frame />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import BannerFrame from '@/components/canvas/BannerFrame'
import VlcSeal from './VlcSeal.vue'

export default {
  name: 'vlc-canvas',

  mixins: [CanvasMixin],

  components: {
    VlcSeal,
    BannerFrame
  },

  computed: {
    randomizedSeal () {
      const index = this.banner.sealPosition === 'random' ? Math.floor(Math.random() * (this.banner.sealPositions.length - 1)) : this.banner.sealPosition
      return this.banner.sealPositions[index]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "colors";

  @font-face {
    font-family: 'Mont';
    font-weight: 600;
    font-style: normal;
    src: url(./Mont-SemiBold.ttf) format('truetype');
  }

  .banner-canvas {
    box-sizing: border-box;

    @each $name, $color in $colors {
      --vlc-#{$name}: #{$color};
    }
  }

  @each $name, $color in $colors {
    .banner-background-vlc-#{$name} {
      --banner-color: var(--vlc-#{$name});
    }
  }

  .background {
    position: absolute;
    z-index: 0;
    background-color: var(--banner-color);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: .5s ease-in-out;
  }

  .banner-grid {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    width: 720px;
    height: 720px;
    padding: 40px;
    row-gap: 60px;
    z-index: 20;
  }

  .picture {
    position: relative;
    z-index: 40;
  }

  .background-picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    height: 100%;
    width: 100%;
    background: $gray-100;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .text {
    transform: translateY(10px);
    font-family: 'Mont', sans-serif;
    letter-spacing: -0.025em;
    line-height: 1.1;
    max-width: 65%;
    color: black;
    font-size: 30px;
    display: flex;
    z-index: 30;
    white-space: pre-wrap;
  }

  .vlc-seal {
    z-index: 50;
    position: absolute;
    width: 160px;
    height: auto;
    color: var(--banner-color);
    transition: .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>
