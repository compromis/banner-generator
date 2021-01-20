<template>
  <div>
    <h1>{{ message }}</h1>
    <div class="chart">
      <div class="chart-item" v-for="(data, d) in chart.data" :key="d">
        <div class="chart-item-bars">
          <div
            v-for="(value, set) in data.values"
            :key="set"
            class="chart-item-bar"
            :style="{
              height: calcHeight(value.number, 200),
              backgroundColor: value.color === 'inherit' ? chart.sets[set].color : value.color
            }"
          ></div>
        </div>
        <div class="chart-item-label">{{ data.label }}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    chart: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      message: 'asfsdgadsfg'
    }
  },

  methods: {
    calcHeight (value, maxHeight) {
      const height = value * maxHeight / this.heightestValue
      return height + 'px'
    }
  },

  computed: {
    heightestValue () {
      let values = []
      this.chart.data.forEach(row => {
        const rowValues = row.values.map(value => value.number)
        values = [...values, ...rowValues]
      })

      return Math.max(...values)
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
    font-size: 18px;
  }

  &-bars {
    display: flex;
    align-items: flex-end;
  }

  &-bar {
    margin-bottom: .5rem;
    background-color: $orange;
    width: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 0 5px;
  }
}
</style>
