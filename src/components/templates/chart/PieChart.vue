<script>
import Chart from 'chart.js'
import { Pie, mixins } from 'vue-chartjs'
// eslint-disable-next-line
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'

export default {
  extends: Pie,

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
        defaultFontFamily: 'Compromis, sans-serif',
        defaultFontSize: 14,
        defaultFontColor: '#707380',
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false },
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
      const color = this.chart.data.map(row => row.values[0].color)
      const setdata = this.chart.data.map(row => row.values[0].number)
      const datasets = [{
        label: this.chart.sets[0].label,
        backgroundColor: color,
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
