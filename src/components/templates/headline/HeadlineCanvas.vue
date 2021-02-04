<template>
  <div
    v-if="banner"
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]">
    <banner-picture
      :picture-position="objectPosition"
      :height="aspect === '11' ? 500 : 730"
      :edge="aspect === '916'" />
    <headline-card
      :headline="$options.filters.formatString(banner.headline)"
      :font-size="headlineFontSize" />
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import HeadlineCard from './HeadlineCard'

export default {
  name: 'headline-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerPicture,
    BannerFrame,
    EmojisOnCanvas,
    HeadlineCard
  },

  computed: {
    headlineFontSize () {
      const sizes = {
        11: { min: 30, max: 50 },
        916: { min: 23.5, max: 35 },
        169: { min: 23.5, max: 35 }
      }

      return this.fontSize(this.banner.headline, sizes[this.aspect].max, sizes[this.aspect].min, 160)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./fonts";

  .headline {
    position: absolute;
    z-index: 30;
    left: 40px;
    right: 40px;
  }

  .aspect-916 .headline {
      left: 10px;
      right: 10px;
  }

  /* Blobs theme */
  .theme-blobs {
    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .headline {
        top: 90px;
        bottom: auto;
      }
    }
  }

  /* Glowy theme */
  .theme-glowy {
    /* Glowy card */
    .banner-picture::v-deep .glowy-card {
      position: absolute;
      z-index: 20;
      left: 40px;
      right: 40px;
      top: 70px;
    }

    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .banner-picture::v-deep .glowy-card {
        top: 120px;
      }

      .headline {
        top: 25px;
        bottom: auto;
      }
    }

    /* Story */
    &.aspect-916 {
      .headline {
        left: 5px;
        right: 25px;
      }

      .banner-picture::v-deep .glowy-card {
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 540px;
      }

      .headline::v-deep .headline-source {
        padding: 5px 8px;

        img {
          height: 20px;
        }
      }

      &.disposition-top {
        .headline {
          top: 75px;
        }
      }
    }
  }

  /* Blobless theme */
  .theme-blobless {
    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 100px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .headline {
        top: 85px;
        bottom: auto;
      }
    }
  }

  /* Twitter */
  .aspect-169 {
    &.theme-blobless {
      &.disposition-top {
        .headline {
          top: 35px;
        }
      }
    }

    &.theme-glowy {
      .banner-picture::v-deep .glowy-card {
        top: 35px;
      }

      &.disposition-top {
        .headline {
          top: 35px;
        }
      }

      &.disposition-bottom {
        .headline {
          bottom: 90px;
        }
      }
    }

    &.disposition-bottom {
      .headline {
        bottom: 100px;
      }
    }

    &.disposition-top {
      .headline {
        top: 72px;
      }
    }
  }
</style>
