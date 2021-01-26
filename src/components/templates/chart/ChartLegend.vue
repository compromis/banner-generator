<template>
  <div classs="chart-legend">
    <div class="chart-legend-item" v-for="set in sets" :key="set">
      <div class="chart-legend-item-color" :style="{backgroundColor: set.color}"></div>
      <div class="chart-legend-item-label">{{ set.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sets: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";
.chart-legend {
  display: flex;
  flex-direction: row;

  &-item {
    display: inline-flex;
    margin-right: 12px;

    &-color {
      width: 30px;
      height: 20px;
      background-color: red;
    }

    &-label {
      margin-left: 10px;
      color: $gray-700
    }
  }
}
</style>
