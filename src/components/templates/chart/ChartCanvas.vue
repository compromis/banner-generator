<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo,
      { 'has-description': banner.description.length }
    ]"
    v-if="banner">
    <div class="grid">
      <banner-picture :picture-position="objectPosition" edge />
      <div class="chart">
        <h1 v-if="aspect === '11'" :style="{ fontSize: fontSize(banner.title, 40, 28, 120) }">
          {{ banner.title }}
        </h1>
        <bar-chart
          v-if="banner.chartType === 'bar-vertical'"
          :chart="banner.chart" />
        <horizontal-bar-chart
          v-if="banner.chartType === 'bar-horizontal'"
          :chart="banner.chart" />
        <line-chart
          v-if="banner.chartType === 'lines'"
          :chart="banner.chart" />
        <pie-chart
          v-if="banner.chartType === 'pie'"
          :chart="banner.chart" />
        <pie-chart
          v-if="banner.chartType === 'doughnut'"
          :chart="banner.chart"
          doughnut />
        <farto-chart
          v-if="banner.chartType === 'farto'"
          :chart="banner.chart" />

        <div class="chart-info">
          <chart-legend
            v-if="banner.chart.sets.length > 1 && config.maxSets[banner.chartType] > 1"
            :sets="banner.chart.sets"
            :chart-type="banner.chartType" />
          <div class="source" v-if="banner.source">
            Font: {{ banner.source }}
          </div>
        </div>
        <div class="description" v-if="banner.description">{{ banner.description }}</div>
      </div>
    </div>
    <text-in-pills
      v-if="banner.title && aspect === '169'"
      :text="banner.title"
      style="margin: 30px 0 0 30px; max-width: 210px;"
      :font-size="fontSize(banner.title, 28, 18, 120)"
      shadow
    />
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame :logo-align="aspect === '169' ? 'left' : 'right'" />
  </div>
</template>

<script>
import config from './config'
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import TextInPills from '@/components/canvas/TextInPills'
import BarChart from './BarChart'
import HorizontalBarChart from './HorizontalBarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'
import FartoChart from './FartoChart'
import ChartLegend from './ChartLegend'

export default {
  name: 'chart-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    TextInPills,
    BannerPicture,
    BannerFrame,
    BarChart,
    HorizontalBarChart,
    LineChart,
    PieChart,
    FartoChart,
    ChartLegend
  },

  data () {
    return {
      config
    }
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
      color: $gray-900;
      font-size: 32px;
      line-height: 1.1;
      margin-bottom: 20px;
    }

    &-info {
      display: flex;
      align-items: flex-end;
    }

    .source {
      font-size: 12px;
      text-align: right;
      margin-left: auto;
      align-self: flex-end;
      min-width: 30%;
    }

    .description {
      font-size: 16px;
      margin: 16px -24px -24px;
      padding: 10px 24px;
      background: $gray-100;
    }
  }

  ::v-deep canvas {
    height: 350px !important;
  }

  .has-description {
    &::v-deep canvas {
      height: 280px !important;
    }
  }

  .aspect-916 {
    .chart {
      left: 16px;
      right: 16px;
      padding: 16px;
    }
  }

  .aspect-169 {
    .chart {
      bottom: 85px;
      top: auto;
    }
  }

  .banner-background-black {
    .chart {
      background: $gray-900;
      color: $gray-100;

      .description {
        background: $gray-800;
      }
    }

    h1 {
      color: $white;
    }
  }

  .theme-blobless {
    .chart {
      bottom: 120px;
    }
  }

  .aspect-169 {
    .chart {
      bottom: 50%;
      left: 40px;
      right: 32px;
      transform: scale(0.65) translate(0, 50%);
      transform-origin: right bottom;
    }
  }
</style>
