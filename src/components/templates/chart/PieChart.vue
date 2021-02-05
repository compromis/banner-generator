<script>
import Chart from 'chart.js'
import { Pie } from 'vue-chartjs'
import ChartMixin from './chart-mixin'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: Pie,

  mixins: [ChartMixin],

  props: {
    chart: {
      type: Object,
      required: true
    },
    doughnut: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    labels () {
      return this.chart.data.map(row => row.label)
    },
    datasetlabel () {
      return this.chart.sets[0].label
    },
    colors () {
      return this.chart.data.map(row => row.values[0].color)
    },
    datapoints () {
      return this.chart.data.map(row => row.values[0].number)
    },
    options () {
      const options = {
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false },
        legend: { display: false },
        layout: {
          padding: { top: 35, left: 40, right: 40, bottom: 0 }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }]
        }
      }

      if (this.doughnut) {
        options.circumference = Math.PI
        options.rotation = -Math.PI
        options.cutoutPercentage = 50
      }

      return options
    }
  },

  mounted () {
    this.updateChart()
  },

  watch: {
    chart: {
      deep: true,
      handler () {
        this.updateChart()
      }
    },
    options: {
      deep: true,
      handler () {
        this.updateChart()
      }
    },
    mode: {
      deep: true,
      handler () {
        this.updateChart()
      }
    }
  },

  methods: {
    updateChart () {
      this.renderChart({
        labels: this.labels,
        datasets: [{
          label: this.label,
          backgroundColor: this.colors,
          borderColor: this.mode === 'black' ? '#353949' : '#FFF',
          borderWidth: 5,
          data: this.datapoints,
          datalabels: {
            labels: {
              name: {
                align: 'end',
                anchor: 'end',
                color: () => {
                  return this.mode === 'black' ? 'white' : '#707380'
                },
                font: { size: 16 },
                formatter: function (value, ctx) {
                  return ctx.chart.data.labels[ctx.dataIndex]
                }
              },
              value: {
                align: 'center',
                color: 'white',
                font: ({ dataIndex: dataKey, datasetIndex: setKey }) => {
                  const row = this.chart.data[dataKey].values[setKey]
                  return row.highlight ? { size: 28, weight: 'bold' } : { size: 14, weight: 'normal' }
                },
                display: ({ dataIndex: dataKey, datasetIndex: setKey }) => {
                  const row = this.chart.data[dataKey].values[setKey]
                  return !(this.chart.options.onlyHighlighted && !row.highlight)
                },
                formatter: (value) => {
                  return this.formatNumber(value)
                }
              }
            }
          }
        }]
      }, this.options)
    }
  }
}
</script>
