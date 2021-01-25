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
      <div class="chart">
        <h1>{{ banner.title }}</h1>
        <bar-chart :chart="banner.chart" v-if="chartType === 'bar'"/>
        <line-chart :chart="banner.chart"/>
        <div v-if="banner.source">
          Font: {{ banner.source }}
        </div>
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
import LineChart from '@/components/canvas/LineChart'
import BarChart from '@/components/canvas/BarChart'

export default {
  name: 'chart-canvas',

  mixins: [CanvasMixin],

  data () {
    return {
      chartType: 'line'
    }
  },

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame,
    BarChart,
    LineChart
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .chart {
    position: absolute;
    background: var(--card-background, #{$white});
    bottom: 85px;
    left: 35px;
    right: 35px;
    z-index: 30;
    box-shadow: $raised-shadow;
    border-radius: $card-radius;
    padding: 24px 24px;
    max-height: 515px;
    overflow: hidden;
  }

  .aspect-916 {
    .chart {
      left: 16px;
      right: 16px;
      padding: 16px;
    }
  }

  .aspect-event {
    .chart {
      bottom: 85px;
      top: auto;
    }
  }

  .theme-blobless {
    .chart {
      bottom: 120px;
    }
  }
</style>
