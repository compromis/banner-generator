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
                width: horizontal ? calcLength(value.number) : null,
                height: horizontal ? 'auto' : calcLength(value.number),
                backgroundColor: value.color
              }"
            >
              <div
                v-if="!chart.options.onlyHighlighted || value.highlight"
                :style="{ color: value.highlight ? value.color : null }"
                :class="{'chart-item-number' : true, 'chart-item-number-starred' : value.highlight}"
              >
                {{ formatNumber(value.number) }}
              </div>
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
      default: 300
    }
  },

  methods: {
    calcLength (value) {
      const length = value * this.maxLength / this.highestValue
      return length + 'px'
    },

    formatNumber (number) {
      const options = { notation: 'compact', compactDisplay: 'short' }
      if (this.chart.options.valuesInEuros) {
        options.style = 'currency'
        options.currency = 'EUR'
      }
      return new Intl.NumberFormat('es-ES', options).format(number)
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
  margin-top: 38px;
}

.chart-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  &-label {
    font-size: 14px;
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
    font-size: 14px;
    top: -10px;
    left: 50%;
    transform: translate(-50%, -100%);
    line-height: 1;

    &-starred {
      font-weight: bold;
      font-size: 28px;
      background: rgba($white, .75);
      padding: 1px 3px;
      z-index: 100;
      border-radius: 3px;

      @at-root .banner-background-black .chart-item-number-starred {
        background: rgba($gray-900, .75);
      }
    }
  }
}

.chart-horizontal {
  grid-auto-flow: row;
  align-items: start;
  margin-top: 10px;
  margin-right: 60px;

  .chart-item {
    flex-direction: row-reverse;

    &-label {
      text-align: left;
      width: 100px;
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
      right: -10px;
      top: 50%;
      transform: translate(100%, -50%);
      text-align: left;
    }
  }
}
</style>
