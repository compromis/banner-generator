<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'style-' + banner.style,
      'mode-' + banner.mode,
      'logo-' + banner.logo,
    ]"
    v-if="banner">
    <emojis-on-canvas v-model="banner.emojis" />
    <div class="card">
      <div class="card-overtitle">{{ banner.overtitle }}</div>
      <div class="card-text" :style="{ fontSize: fontSizeText }">{{ banner.text }}</div>
      <div :class="['card-status', 'card-status--' + banner.icon]">
        {{ banner.iconText }}
        <span class="card-status-icon">
          <font-awesome-icon :icon="['far', banner.icon]" />
        </span>
      </div>
    </div>
    <banner-frame />
    <banner-picture
      :picture-position="backgroundPosition"
      :height="aspect === '11' ? 500 : null"
      :width="aspect === '916' ? 405 : null" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'milestone-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame
  },

  computed: {
    fontSizeText () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize(banner.text, 50, 25, 110, banner.textSize)
        : fontSize(banner.text, 50, 25, 110, banner.textSize)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .banner-canvas {
    --card-background: #{$white};
    --text-color: #{$gray-900};
    --overtitle-text-color: #{$gray-600};
    --positive-color: rgba(127, 195, 71, 1);
    --negative-color: rgba(239, 64, 77, 1);

    &.style-transparent {
      --card-background: transparent;
      --text-color: #{$white};
      --overtitle-text-color: rgba(255, 255, 255, .6);
    }

    &.style-card.mode-black {
      --card-background: #{$gray-900};
      --text-color: #{$white};
      --overtitle-text-color: #{$gray-400};
    }
  }

  .card {
    position: absolute;
    z-index: 40;
    top: 50px;
    left: 50px;
    width: 320px;
    height: 500px;
    display: flex;
    flex-direction: column;
    background: var(--card-background);

    &-overtitle {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: bold;
      color: var(--overtitle-text-color);
      font-size: 16px;
    }

    &-text {
      line-height: 1.1;
      margin: auto 0;
      letter-spacing: -0.03em;
      color: var(--text-color);
    }

    &-status {
      display: flex;
      font-size: 32px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      align-items: center;
      font-weight: bold;
      color: var(--icon-color);
      justify-content: flex-end;
      margin-right: -78px;

      &-icon {
        display: flex;
        background: var(--icon-color);
        color: $white;
        border-radius: 100%;
        height: 100px;
        width: 100px;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        margin-left: 20px;
      }

      &--check {
        --icon-color: var(--positive-color);
      }

      &--times {
        --icon-color: var(--negative-color)
      }
    }
  }

  .style-transparent {
    .card {
      box-shadow: none;
      border: 3px $white solid;

      &-status {
        color: $white;

        &-icon {
          background: $white;
          color: var(--icon-color);
        }
      }
    }
  }

  .aspect-916 {
    .card {
      top: 80px;
      left: 30px;
      right: 30px;
      height: 450px;
      width: auto;

      &-status {
        margin-right: -54px;

        &-icon {
          width: 50px;
          height: 50px;
          font-size: 20px;
        }
      }
    }
  }
</style>
