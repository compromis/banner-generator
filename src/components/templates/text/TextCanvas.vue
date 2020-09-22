<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + theme,
      'disposition-' + banner.disposition
    ]"
    v-if="banner">
    <div class="grid">
      <banner-picture
        :picture="banner.picturePreview"
        :picture-position="objectPosition"
        :theme="theme"
        edge/>
      <div class="text text-wysiwyg" v-if="banner.text">
        <div v-html="banner.text"></div>
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="theme"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'text-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .theme-glowy {
    .grid {
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 35px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 80px;
    }

    .text {
      padding: 0 35px 0 35px;
      overflow: hidden;
    }

    .banner-picture {
      display: flex;
    }

    .banner-picture::v-deep .glowy-card {
      min-height: 300px;
    }

    &.aspect-916 {
      .text {
        padding: 0 30px;
      }
    }
  }

  .theme-blobs {
    .text {
      position: absolute;
      background: $white;
      bottom: 80px;
      left: 35px;
      right: 35px;
      z-index: 30;
      box-shadow: $raised-shadow;
      border-radius: $card-radius;
      padding: 24px 24px;
      max-height: 515px;
      overflow: hidden;
    }

    &.aspect-916 {
      .text {
        left: 16px;
        right: 16px;
        padding: 16px;
      }
    }

    &.disposition-1 {
      .text {
        top: 80px;
        bottom: auto;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../sass/variables";

  .text-wysiwyg {
    font-size: 20px;

    & > div > *:first-child {
      margin-top: 0;
    }

    & > div > *:last-child {
      margin-bottom: 0;
    }

    & > div > h2:first-child {
      margin-top: -24px;
    }

    & > div > h2:last-child {
      margin-bottom: -24px;
    }

    h1 {
      font-size: 40px;
      letter-spacing: -1px;
      font-weight: bold;
      margin: 16px 0;
      line-height: 1.1;
    }

    h2 {
      background: $gray-100;
      padding: 16px 24px;
      margin: 16px -24px;
      font-size: 24px;
      letter-spacing: -.5px;
      line-height: 1.1;

      @at-root .theme-glowy h2 {
        padding: 14px 16px;
        border-radius: 8px;
        margin: 16px -16px;
      }
    }

    p {
      line-height: 1.2;
      margin: 16px 0;
    }

    ol {
      margin: 16px 0;

      li {
        margin-left: 30px;
        line-height: 1;
        margin-bottom: 12px;
      }
    }

    ul {
      margin: 16px 0;

      li {
        padding-left: 30px;
        line-height: 1;
        margin-bottom: 12px;

        &::before {
          position: absolute;
          content: '➡️';
          color: $orange;
          font-weight: bold;
          left: 36px;
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
    .text-wysiwyg {
      & > div > h2:first-child {
        margin-top: -16px;
      }

      & > div > h2:last-child {
        margin-bottom: -16px;
      }

      h2 {
        padding: 16px;
        margin: 16px -16px;
        font-size: 20px;
      }

      ul {
        li {
          padding-left: 28px;

          &::before {
            left: 30px;
          }
        }
      }
    }
  }
</style>
