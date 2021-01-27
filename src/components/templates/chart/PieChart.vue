<script>
import Chart from 'chart.js'
import { Pie, mixins } from 'vue-chartjs'
import ChartMixin from './chart-mixin'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: Pie,

  mixins: [mixins.reactiveData, ChartMixin],

  props: {
    chart: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'white'
    }
  },

  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false },
        legend: { display: false },
        layout: {
          padding: { top: 35, left: 0, right: 0, bottom: 0 }
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
        },

        plugins: {
          datalabels: {
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
    }
  },

  computed: {
    computedChartData () {
      const labels = this.chart.data.map(row => row.label)
      const color = this.chart.data.map(row => row.values[0].color)
      const setdata = this.chart.data.map(row => row.values[0].number)
      const datasets = [{
        label: this.chart.sets[0].label,
        backgroundColor: color,
        borderColor: this.mode === 'black' ? '#353949' : '#FFF',
        borderWidth: 5,
        data: setdata
      }]

      return {
        labels,
        datasets
      }
    }
  },

  mounted () {
    this.chartData = { ...this.computedChartData, update: 0 }
    this.renderChart(this.chartData, this.options)
  },

  watch: {
    chart: {
      deep: true,
      handler () {
        this.chartData = { ...this.computedChartData, update: Math.random() }
      }
    }
  }
}
</script>
