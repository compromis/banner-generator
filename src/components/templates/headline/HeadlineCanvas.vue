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
    <headline-card
    :headline="banner.headline"
    :source="banner.source"
    :customSource="banner.customSource"
    :customSourceColor="banner.customSourceColor"
    :fontSize="aspect === '11' ? fontSize(banner.headline, 50, 30, 160) : fontSize(banner.headline, 35, 23.5, 160)"/>
    <emojis-on-canvas v-model="banner.emojis" />
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
import EmojisOnCanvas from '@/utils/EmojisOnCanvas'
import HeadlineCard from './HeadlineCard'

export default {
  name: 'headline-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    HeadlineCard
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./fonts";

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

    /* Cards in story aspect */
    &.aspect-916 {
      .blob {
        &-1 {
          left: -118%;
        }

        &-2 {
          right: -104%;
        }
      }
    }
  }

  .no-cards .drr {
    display: none;
  }
</style>
