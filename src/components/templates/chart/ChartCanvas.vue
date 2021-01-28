<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      { 'has-description': banner.description.length }
    ]"
    v-if="banner">
    <div class="grid">
      <banner-picture
        :picture="banner.picturePreview"
        :picture-position="objectPosition"
        :theme="banner.theme"
        :color="banner.color"
        edge
        :full-gradient="banner.fullGradient"
        :gradient-background="!banner.picturePreview" />
      <div class="chart">
        <h1 :style="{fontSize: fontSize(banner.title, 40, 28, 120)}">{{ banner.title }}</h1>

        <bar-chart
          v-if="banner.chartType === 'bar-vertical'"
          :chart="banner.chart"
          :max-length="banner.description ? 200 : 310" />
        <bar-chart
          v-if="banner.chartType === 'bar-horizontal'"
          :chart="banner.chart"
          horizontal
          :max-length="400" />
        <line-chart
          v-if="banner.chartType === 'lines'"
          :chart="banner.chart"
          :mode="banner.mode" />
        <pie-chart
          v-if="banner.chartType === 'pie'"
          :chart="banner.chart"
          :mode="banner.mode" />
        <pie-chart
          v-if="banner.chartType === 'doughnut'"
          :chart="banner.chart"
          :mode="banner.mode"
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
import config from './config'
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import FartoChart from './FartoChart'
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
    PieChart,
    FartoChart,
    ChartLegend
  },

  data: () => config
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
      margin: 8px -24px -24px;
      padding: 10px 24px;
      background: $gray-100;
    }
  }

  ::v-deep canvas {
    height: 400px !important;
  }

  .has-description {
    &::v-deep canvas {
      height: 300px !important;
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
</style>
