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
      const limits = {
        'bar-vertical': 4,
        'bar-horizontal': 4,
        'lines': 8,
        'doughnut': 1
      }

      return limits[this.chartType]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.chart-legend {
  display: flex;
  margin-top: 10px;

  &-item {
    display: flex;
    margin-right: 12px;

    &-color {
      border-radius: 5px;
      width: 30px;
      height: 20px;
      background-color: $gray-700;
    }

    &-label {
      margin-left: 10px;
    }
  }
}
</style>
