<script>
import Chart from 'chart.js'
import { HorizontalBar, mixins } from 'vue-chartjs'
import ChartMixin from './chart-mixin'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'
// eslint-disable-next-line
import ChartRoundedCorners from './chart-rounded-corners'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: HorizontalBar,

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
          padding: { top: 0, left: 0, right: 100, bottom: 0 }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        },

        plugins: {
          datalabels: {
            align: 'end',
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
        const colors = this.chart.data.map(row => row.values[setKey].color)

        return {
          label: set.label,
          borderColor: 'transparent',
          backgroundColor: colors,
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
