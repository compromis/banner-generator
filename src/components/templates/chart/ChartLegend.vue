<template>
  <div class="chart-legend">
    <template v-for="(set, setKey) in sets">
      <div class="chart-legend-item" v-if="setKey < limit" :key="setKey">
        <div class="chart-legend-item-color" :style="{ backgroundColor: set.color }"></div>
        <div class="chart-legend-item-label">{{ set.label }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import config from './config'

export default {
  props: {
    sets: {
      type: Array,
      default: () => []
    },

    chartType: {
      type: String,
      default: 'bar-vertical'
    }
  },

  computed: {
    limit () {
      return config.maxSets[this.chartType]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: flex-start;
  font-size: 12px;

  &-item {
    display: flex;
    margin-right: 16px;
    margin-top: 4px;

    &-color {
      border-radius: 5px;
      width: 30px;
      height: 20px;
      background-color: $gray-700;
    }

    &-label {
      margin-left: 6px;
    }
  }
}
</style>
