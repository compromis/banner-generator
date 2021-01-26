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
        <bar-chart :chart="banner.chart" v-if="banner.chartType === 'bar-vertical'" />
        <bar-chart :chart="banner.chart" horizontal v-if="banner.chartType === 'bar-horizontal'" />
        <line-chart :chart="banner.chart" v-if="banner.chartType === 'lines'" />
        <chart-legend v-if="banner.chart.sets.length > 1" :sets="banner.chart.sets" :chart-type="banner.chartType" />
        <div class="source" v-if="banner.source">
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
import LineChart from './LineChart'
import BarChart from './BarChart'
import ChartLegend from './ChartLegend'

export default {
  name: 'chart-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame,
    BarChart,
    LineChart,
    ChartLegend
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
    color: $gray-700;

    h1 {
      font-size: 32px;
      line-height: 1.1;
    }

    .source {
      color: $gray-700;
      font-size: 14px;
    }
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

  .banner-background-black {
    .chart {
      background: $gray-900;
      color: $gray-100;
    }
  }

  .theme-blobless {
    .chart {
      bottom: 120px;
    }
  }
</style>
