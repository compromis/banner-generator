<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'logo-' + banner.logo,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      'banner-background-' + banner.mode
    ]"
    v-if="banner">
    <div class="blob-image">
      <span class="stamp">{{ banner.stamp }}</span>
      <span class="stamp stamp-over">{{ banner.stamp }}</span>
      <div class="picture" v-if="mainPicture" :style="{backgroundImage: `url(${mainPicture})`, ...backgroundPosition}" />
    </div>
    <div class="text" v-if="banner.text">
      <div class="text-holder" contenteditable>
        <div class="text-lines" :style="{ fontSize: aspect === '11' ? fontSize(banner.text, 50, 30, 140) : fontSize(banner.text, 50, 22, 140) }">{{ banner.text | formatString }}</div>
      </div>
    </div>
    <banner-frame />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerFrame from '@/components/canvas/BannerFrame'

export default {
  name: 'fake-news-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    position: absolute;
    top: 475px;
    bottom: 175px;
    left: 60px;
    right: 60px;
    z-index: 10;
    transition: all .5s ease-in-out;
    letter-spacing: -.03em;
    line-height: 1.25;
    color: $gray-900;
  }

  .blob {
    &-image {
      position: absolute;
      top: 30px;
      left: 30px;
      right: 30px;
      height: 410px;
      z-index: 30;
      transform: rotate(0);
      border-radius: $card-radius;
      overflow: hidden;
      background: $white;
      box-shadow: 0 10px 60px -20px $fake-color, 0 5px 15px -7px rgba($fake-color, .75);
      transform: rotate(-2deg);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $fake-color;
        opacity: .25;
        z-index: 30;
      }

      .picture {
        width: 100%;
        height: 100%;
        transform: rotate(0);
      }
    }
  }

  .stamp {
    position: absolute;
    font-size: 150px;
    font-weight: bold;
    bottom: 20px;
    left: 20px;
    color: $fake-color;
    line-height: 1;
    letter-spacing: -0.03em;
    z-index: 30;
    mix-blend-mode: multiply;

    &-over {
      mix-blend-mode: normal;
      opacity: .75;
    }
  }

  // Story aspect
  .aspect-916 {
    .text {
      left: 40px;
      right: 40px;
    }

    .stamp {
      font-size: 90px;
    }
  }

  // Dark mode
  .banner-background-black .text {
    color: $white;
  }
</style>
