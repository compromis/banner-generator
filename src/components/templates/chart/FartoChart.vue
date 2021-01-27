<template>
  <div class="chart-wrapper">
    <div class="chart-farto">
      <div :class="{'chart-farto-piece' : true, 'chart-farto-piece-starred' : row.values[0].highlight}" v-for="(row, i) in chart.data" :key="i" :style="{width: calcLength(row.values[0].number), backgroundColor: row.values[0].color}">
        <span class="chart-farto-piece-number" v-if="!chart.options.onlyHighlighted || row.values[0].highlight">{{ formatNumber(row.values[0].number) }}</span>
        <span class="chart-farto-piece-label">{{ row.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ChartMixin from './chart-mixin'

export default {
  mixins: [ChartMixin],

  props: {
    chart: {
      type: Object,
      required: true
    }
  },

  methods: {
    calcLength (value) {
      const total = this.chart.data.reduce((a, b) => a + parseInt(b.values[0].number), 0)
      return `${(value * 100) / total}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: flex-end;
}

.chart-farto {
  width: 550px;
  display: flex;
  margin: 0 auto;
  background: gray;
  border-radius: 15px;
  height: 55px;

  &-piece {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: fit-content;
    padding: 0 2px;
    border-right: 3px solid white;

    &:first-child {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    &:last-child {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      border-right: none;
    }

    &-number {
      color: white;
    }

    &-starred {
      .chart-farto-piece-number {
        font-weight: bold;
        font-size: 24px;
      }
    }

    &-label {
      text-align: left;
      position: absolute;
      transform-origin: 0 0;
      left: 50%;
      bottom: 70px;
      transform: rotate(-30deg) translate(-50%, 0);

    }
  }
}
</style>
