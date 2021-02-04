<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo,
      { 'full-gradient': banner.fullGradient }
    ]"
    v-if="banner">
    <div :style="{ fontSize: fontSizePrimary }" class="quote">
      <div :style="{ textAlign: banner.disposition }">
        <div :class="['quote-glyph', 'quote-glyph-' + banner.textColor ]" >“</div>
        <div class="quote-text-wrapper" style="font-size: 16px">
          <text-in-pills
            v-if="banner.quote"
            :text="$options.filters.formatString($options.filters.formatQuote(banner.quote))"
            :text-align="banner.disposition"
            :pill-style="banner.textColor"
            :font-size="fontSizePrimary"
            :width="600"
            shadow
            :transparent="banner.theme === 'blobless' && banner.fullGradient" />
        </div>
        <div class="quote-author">{{ banner.author | formatString }}</div>
      </div>
    </div>
    <banner-frame />
    <banner-picture
      :picture-position="objectPosition"
      :height="aspect === '11' ? 570 : 730"
      :edge="aspect === '916'" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import TextInPills from '@/components/canvas/TextInPills'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    TextInPills,
    BannerPicture,
    BannerFrame
  },

  computed: {
    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      const sizes = {
        11: { min: 33, max: 43 },
        916: { min: 28, max: 36 },
        169: { min: 23, max: 36 }
      }

      return fontSize(banner.quote, sizes[aspect].max, sizes[aspect].min, 140)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .quote {
    display: flex;
    position: absolute;
    z-index: 30;
    top: 90px;
    left: 90px;
    bottom: 160px;
    align-items: flex-end;
    width: 325px;

    &-glyph {
      font-size: 150px;
      font-weight: bold;
      margin-bottom: -115px;
      margin-left: -22px;
      margin-right: -16px;

      &-black {
        color: $gray-darkest;
      }

      &-white {
        color: $white;
      }

      &-orange {
        color: $gradient-start;
      }
    }

    &-author {
      font-size: clamp(14px, 0.65em, 18px); ;
      letter-spacing: -0.5px;
      margin-top: 12px;
      line-height: 1.2;
      color: $white;
      font-weight: bold;
      white-space: pre-line;
      max-height: 90px;
      max-width: 75%;
      text-shadow: 0 2px 6px rgba(0, 0, 0, .5);
    }
  }

  .disposition-right {
    .quote {
      left: auto;
      right: 90px;
      justify-content: flex-end;
      align-items: flex-start;

      &-glyph-orange {
        color: $gradient-end;
      }

      &-author {
        margin-left: auto;
      }
    }
  }

  .aspect-916 {
    .quote-glyph {
      font-size: 140px;
      margin-bottom: -110px;
      margin-left: -20px;
    }
  }

  .theme-glowy {
    .banner-picture::v-deep .glowy-card {
      position: absolute;
      z-index: 20;
      left: 45px;
      right: 45px;
      top: 45px;
    }

    &.aspect-916 {
      .banner-picture::v-deep .glowy-card {
        top: 0;
        left: 0;
        right: 0;
      }

      .quote {
        top: 90px;
        left: 25px;
        right: 25px;
        bottom: 90px;
      }
    }
  }

  .theme-blobs {
    .quote {
      top: 160px;
      left: 50px;
      right: 50px;
      bottom: 120px;
    }

    &.aspect-916 {
      .quote {
        top: 120px;
        left: 30px;
        right: 20px;
        bottom: 120px;
      }
    }

    &.aspect-169 {
      .quote {
        top: 110px;
        bottom: 20px;
      }
    }

    &.disposition-right {
      .quote {
        top: 60px;
        left: auto;
        right: 50px;
        bottom: 160px;
      }

      &.aspect-169 {
        .quote {
          top: -20px;
          right: 40px;
        }
      }
    }
  }

  .theme-blobless {
    .quote {
      top: 80px;
      left: 55px;
      right: auto;
      bottom: 130px;
    }

    &.full-gradient .quote-glyph {
      color: $white !important;
    }

    &.full-gradient {
      .quote-author {
        text-shadow: none;
        opacity: .6;
      }
    }

    &.disposition-right {
      .quote {
        left: auto;
        right: 60px;
      }
    }

    &.aspect-916 {
      .quote {
        left: 30px;
        right: 20px;
      }
    }

    &.aspect-169 {
      .quote {
        top: 0;
        bottom: 110px;
      }
    }
  }

  .aspect-169 {
    &.disposition-left {
      .quote {
        bottom: 38px;
      }
    }

    .quote {
      width: 375px;
    }

    .quote-author {
      max-width: 70%;
    }
  }
</style>
