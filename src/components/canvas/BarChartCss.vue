<template>
  <div>
    <p>dsflkghdlfg</p>
    <div class="chart">
      <div class="chart-item" v-for="data in dataset" :key="data">
        <div class="chart-item-bar chart-item-bar-a" :style="{height: calcHeight(data.valueA)}"></div>
        <div class="chart-item-label">{{data.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      message: 'asfsdgadsfg',
      // 1 dataset amb dos values o 2 datasets??
      dataset: [
        {
          name: 'febrer',
          valueA: 100,
          valueB: 150,
          colorA: '#fff',
          colorB: '#fff'
        }
      ]
    }
  },

  methods: {
    calcHeight (value) {
      // buscar valor més alt dins de dataset = highestvalue
      // regla de 3 -> highestvalue = 100 -> value = x
      return value + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
.chart {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  align-items: end;
}

.chart-item {
  display: flex;
  align-items: center;
  flex-direction: column;

  &-label {
    color: $gray-700;
    font-size: 1.25rem;
  }
  &-bar {
    margin-bottom: .5rem;
    background-color: $orange;
    width: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
