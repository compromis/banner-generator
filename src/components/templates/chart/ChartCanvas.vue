<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + banner.theme,
      'disposition-' + banner.disposition,
      'banner-background-' + banner.mode
    ]"
    v-if="banner">
    <div class="grid">
      <banner-picture
        :picture="banner.picturePreview"
        :picture-position="objectPosition"
        :theme="banner.theme"
        :color="banner.color"
        edge
        :full-gradient="banner.fullGradient" />
      <div class="text text-wysiwyg">
        <bar-chart />
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="banner.theme"
      :mode="banner.mode"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect"
      :color="banner.color" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import BarChart from '@/components/canvas/BarChart'

export default {
  name: 'chart-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame,
    BarChart
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
      padding: 0 35px;
      overflow: hidden;
      font-size: 1.25rem;
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

  .theme-blobs, .theme-blobless {
    .text {
      position: absolute;
      background: var(--card-background, #{$white});
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

    &.aspect-event {
      .text {
        bottom: 85px;
        top: auto;
      }
    }

    &.disposition-top {
      .text {
        top: 80px;
        bottom: auto;
      }

      &.aspect-event {
        .text {
          top: 65px;
        }
      }
    }
  }

  .theme-blobless {
    .text {
      bottom: 120px;
    }

    &.aspect-event.disposition-top {
      .text {
        top: 40px;
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

  .aspect-event {
    .text-wysiwyg {
      font-size: 14px;

      h1 {
        font-size: 30px;
      }

      h2 {
        font-size: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }
  }

  .theme-blobs, .theme-blobless {
    .text-wysiwyg ul li::before {
      left: 18px;
    }
  }

  .theme-glowy {
    .text-wysiwyg > div > h2 {
      margin-top: 0;
      margin-bottom: 20px;
    }
  }

  .banner-background-black {
    .text-wysiwyg {
      --card-background: #{$gray-900};
      color: $white;

      h2 {
        background: $gray-800;
      }

      strong {
        color: $white;
      }
    }
  }
</style>
