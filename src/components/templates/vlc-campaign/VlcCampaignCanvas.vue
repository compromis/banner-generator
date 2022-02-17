<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'banner-background-' + banner.mode,
    ]"
    v-if="banner">
    <div class="banner-grid">
      <div class="picture">
        <div class="background-picture" key="picture">
          <img v-if="banner.picture" :src="banner.picturePreview" :style="objectPosition" />
        </div>
        <vlc-seal :style="{color: `var(--${banner.mode})`, ...randomizeSeal}"/>
      </div>
      <div class="text">
        <div class="text-wrapper">
         {{ $options.filters.formatString(banner.text) }}
        </div>
      </div>
    </div>
    <banner-frame />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import VlcSeal from './VlcSeal.vue'
import BannerFrame from '@/components/canvas/BannerFrame'

export default {
  name: 'vlc-canvas',

  mixins: [CanvasMixin],

  components: {
    VlcSeal,
    BannerFrame
  },

  methods: {
    validate () {
      //
    }
  },

  computed: {
    randomizeSeal () {
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
      background: $color;
    }
  }

  .banner-grid {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    width: 720px;
    height: 720px;
    padding: 40px;
    row-gap: 60px;
  }

  .picture {
    position: relative;
  }
  .background-picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: 100%;
    width: 100%;

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
  }

  .vlc-seal {
    z-index: 2;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 160px;
    height: auto;
  }
</style>
