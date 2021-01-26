<template>
  <div>
    <div :class="{'chart' : true, 'chart-horizontal' : horizontal}">
      <div class="chart-item" v-for="(data, d) in truncatedData" :key="d">
        <div class="chart-item-bars">
          <template v-for="(value, set) in data.values">
            <div
              v-if="set < 4"
              :key="set"
              class="chart-item-bar"
              :style="{
                width: horizontal ? calcLength(value.number) : 'reset',
                height: horizontal ? 'auto' : calcLength(value.number),
                backgroundColor: value.color
              }"
            >
              <div :style="{color: value.highlight ? value.color : null}" :class="{'chart-item-number' : true, 'chart-item-number-starred' : value.highlight}">{{ value.number }}</div>
            </div>
          </template>
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
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 400
    }
  },

  methods: {
    calcLength (value) {
      const length = value * this.maxLength / this.highestValue
      return length + 'px'
    }
  },

  computed: {
    truncatedData () {
      const max = this.horizontal ? 8 : 10
      return this.chart.data.filter((entry, i) => i < max)
    },
    highestValue () {
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
@import "../../../sass/variables";
.chart {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  align-items: end;
  justify-items: center;
  gap: 18px;
}

.chart-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  &-label {
    color: $gray-700;
    font-size: 16px;
    margin-top: 8px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 20px;
    text-align: center;
    line-height: 1.2;
    overflow: hidden;
  }

  &-bars {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
  }

  &-bar {
    position: relative;
    margin-bottom: .5rem;
    background-color: $orange;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 0 5%;
    max-width: 60px;
  }

  &-number {
    position: absolute;
    font-size: 16px;
    color: $gray-700;
    top: -30px;
    left: 50%;
    transform: translate(-50%, 0);

    &-starred {
      top: -40px;
      font-size: 24px;
      color: red;
    }
  }
}

.chart-horizontal {
  grid-auto-flow: row;
  align-items: start;

  .chart-item {
    flex-direction: row-reverse;

  &-label {
    text-align: left;
    width: 130px;
    margin-top: 0;
    margin-right: 8px;
    height: auto;
  }

  &-bars {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex-direction: column;
  }

  &-bar {
    margin: .5% 0;
    max-width: 100%;
    min-height: 25px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 10px;
  }

  &-number {
    left: unset;
    right: -40px;
    top: 50%;
    transform: translate(0, -50%);

    &-starred {
      right: -50px;
    }
  }
}
}
</style>
