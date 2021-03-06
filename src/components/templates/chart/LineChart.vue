<script>
import Chart from 'chart.js'
import { Line, mixins } from 'vue-chartjs'
import ChartMixin from './chart-mixin'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: Line,

  mixins: [mixins.reactiveData, ChartMixin],

  props: {
    chart: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false },
        layout: {
          padding: { top: 45, left: 45, right: 45, bottom: 0 }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
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
        },

        plugins: {
          datalabels: {
            align: ({ dataIndex: dataKey }) => {
              if (dataKey === 0) {
                return '300'
              }

              if (dataKey === this.chart.data.length - 1) {
                return '235'
              }

              return 'top'
            },
            anchor: 'end',
            color: ({ dataIndex: dataKey, datasetIndex: setKey }) => {
              const row = this.chart.data[dataKey].values[setKey]
              return row.highlight ? row.color : this.mode === 'black' ? 'white' : '#707380'
            },
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
    }
  },

  computed: {
    computedChartData () {
      const labels = this.chart.data.map(row => row.label)
      const datasets = this.chart.sets.map((set, setKey) => {
        const setdata = this.chart.data.map(row => row.values[setKey].number)

        return {
          label: set.label,
          borderColor: set.color,
          backgroundColor: 'transparent',
          borderWidth: 5,
          data: setdata
        }
      })

      return {
        labels,
        datasets
      }
    }
  },

  mounted () {
    Chart.defaults.global.defaultFontColor = (this.mode === 'black') ? '#FFFFFF' : '#707380'
    this.chartData = { ...this.computedChartData, update: 0 }
    this.renderChart(this.chartData, this.options)
  },

  watch: {
    chart: {
      deep: true,
      handler () {
        this.chartData = { ...this.computedChartData, update: Math.random() }
      }
    },

    mode (mode) {
      Chart.defaults.global.defaultFontColor = (mode === 'black') ? '#FFFFFF' : '#707380'
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
