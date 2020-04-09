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
    <div class="blob-image">
      <span class="stamp">{{ banner.stamp }}</span>
      <span class="stamp stamp-over">{{ banner.stamp }}</span>
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="text" v-if="banner.text">
      <div class="text-holder" contenteditable>
        <div class="text-lines" :style="{ fontSize: aspect === '11' ? fontSize('text', 50, 30, 140) : fontSize('text', 50, 22, 140) }">{{ banner.text | formatString }}</div>
      </div>
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
  name: 'generic-canvas',

  mixins: [CanvasMixin]
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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

  .logo {
    color: $white;
    z-index: 20;

    &-local-label {
      color: $white;
    }
  }

  .hashtag {
    bottom: 30px;
    left: 35px;
    top: auto;
    color: $gray-900;
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
      left: 40px;
      right: 40px;
    }

    .stamp {
      font-size: 90px;
    }

    .logo {
      display: none;
    }
  }
</style>
