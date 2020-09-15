<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'theme-' + theme
    ]"
    v-if="banner">
    <div class="quote">
      <div>
        <div :class="['quote-glyph', 'quote-glyph-' + banner.textColor ]" >“</div>
        <div class="quote-text-wrapper">
          <text-in-pills
          v-if="banner.quote"
          :text="$options.filters.formatString($options.filters.formatQuote(banner.quote))"
          :pill-style="banner.textColor"
          :font-size="fontSizePrimary"
          :width="600" />
        </div>
        <div class="quote-author">{{ banner.author | formatString }}</div>
      </div>
    </div>
    <banner-frame
      :theme="theme"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect" />
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :height="aspect === '11' ? 570 : 730"
      :theme="theme"
      :edge="aspect === '916'" />
  </div>
</template>

<script>
import BannerPicture from '@/utils/BannerPicture'
import BannerFrame from '@/utils/BannerFrame'
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/utils/TextInPills'

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
      return aspect === '11'
        ? fontSize(banner.quote, 43, 33, 110, banner.textSize)
        : fontSize(banner.quote, 38, 30, 110, banner.textSize)
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
      font-size: 19px;
      letter-spacing: -0.5px;
      margin-top: 12px;
      line-height: 1.2;
      width: 165px;
      color: $white;
      font-weight: bold;
      white-space: pre-line;
      max-height: 90px;
      text-shadow: 0 2px 6px rgba(0, 0, 0, .5);
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
        left: 35px;
        right: 35px;
        bottom: 90px;
      }
    }
  }

  .theme-blobs {
    .quote {
      top: 160px;
      left: 40px;
      right: 40px;
      bottom: 120px;
    }

    &.aspect-916 {
      .quote {
        top: 120px;
        left: 35px;
        right: 35px;
        bottom: 120px;
      }
    }
  }
</style>
