<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-generic',
      'banner-canvas',
      'aspect-' + aspect,
      'first-color-' + banner.firstColor
    ]"
    v-if="banner">
    <div :class="['background-color', `color-${banner.backgroundColor}`]" />
    <div class="image" :style="{ backgroundImage: computedPicture, ...backgroundPosition, alignItems: banner.textPos, textAlign: banner.textAlign }">
      <div class="text">
        <text-in-pills
          class="primary"
          :text="banner.text"
          :text-align="banner.textAlign"
          :fontSize="fontSizePrimary" />

        <text-in-pills
          class="secondary"
          v-if="banner.hasSecondaryText"
          :text="banner.secondaryText"
          :text-align="banner.textAlign"
          :fontSize="fontSizeSecondary" />
      </div>
    </div>
    <div class="logos">
      <compromis-logo class="logo-compromis" :mono="banner.backgroundColor !== 'white'" />
      <sumar-logo class="logo-sumar" :mono="banner.backgroundColor !== 'white'" />
    </div>
  </div>
</template>

<script>
import SumarLogo from './SumarLogo'
import CompromisLogo from '@/components/utils/CompromisLogo'
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/components/canvas/TextInPills'

export default {
  mixins: [CanvasMixin],

  components: {
    CompromisLogo,
    SumarLogo,
    TextInPills
  },

  computed: {
    computedPicture () {
      if (this.banner.picture === null) return 'none'
      return `url(${this.banner.pictureBlob || this.banner.picturePreview}`
    },
    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      const sizes = {
        11: { min: 35, max: 60 },
        916: { min: 25, max: 50 },
        169: { min: 30, max: 55 }
      }

      return fontSize(banner.text, sizes[aspect].max, sizes[aspect].min, 100, banner.textSize)
    },

    fontSizeSecondary () {
      const size = parseInt(this.fontSizePrimary, 10) * 0.5
      return size + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  @font-face {
    font-family: 'Roobert';
    src: url('../granissat/resources/Roobert-Bold.woff2') format('woff2'),
      url('../granissat/resources/Roobert-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roobert';
    src: url('../granissat/resources/Roobert-Medium.woff2') format('woff2'),
      url('../granissat/resources/Roobert-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .banner-generic {
    --spacer: 16px;
    --radius: 10px;
    font-family: Roobert, sans-serif;
  }

  .first-color-sumar-fuchsia {
    --primary: #{$sumar-fuchsia};
    --secondary: #{$sumar-orange};
  }

  .first-color-sumar-orange {
    --primary: #{$sumar-orange};
    --secondary: #{$sumar-fuchsia};
  }

  .image {
    position: absolute;
    top: var(--spacer);
    left: var(--spacer);
    right: var(--spacer);
    bottom: 70px;
    border-radius: var(--radius);
    background: $gray-100;
    padding: calc(var(--spacer) * 2);
    display: flex;
    z-index: 2;
  }

  .text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacer);

   .primary::v-deep .text-lines {
      background: var(--primary) !important;
      color: $white !important;
    }

    .secondary::v-deep .text-lines {
      background: var(--secondary) !important;
      color: $white !important;
    }
  }

  .background-color {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &.color-sumar-fuchsia {
      background: #{$sumar-fuchsia};
      color: $white;
    }

    &.color-sumar-orange {
      background: #{$sumar-orange};
      color: $white;
    }
  }

  .logos {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: var(--spacer);
    z-index: 10;
    color: $white;

    .logo-compromis {
      height: 35px;
    }

    .logo-sumar {
      height: 35px;
      margin-left: auto;
    }
  }
</style>
