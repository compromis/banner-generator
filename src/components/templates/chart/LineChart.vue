<script>
import Chart from 'chart.js'
import { Line, mixins } from 'vue-chartjs'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: Line,

  mixins: [mixins.reactiveData],

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
          padding: { top: 35, left: 30, right: 30, bottom: 0 }
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
            align: 'end',
            color: ({ dataIndex: dataKey, datasetIndex: setKey }) => {
              const row = this.chart.data[dataKey].values[setKey]
              return row.highlight ? row.color : '#707380'
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
              const options = { notation: 'compact', compactDisplay: 'short' }
              if (this.chart.options.valuesInEuros) {
                options.style = 'currency'
                options.currency = 'EUR'
              }
              return new Intl.NumberFormat('es-ES', options).format(value)
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
