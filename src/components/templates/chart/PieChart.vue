<script>
import Chart from 'chart.js'
import { Pie, mixins } from 'vue-chartjs'
Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#707380'
Chart.defaults.global.tooltips.enabled = false
Chart.defaults.global.legend.display = true

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
        responsive: true,
        maintainAspectRatio: false,
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
    }
  },

  computed: {
    computedChartData () {
      const labels = this.chart.data.map(row => row.label)
      const datasets = this.chart.sets.map((set, setKey) => {
        const setdata = this.chart.data.map(row => row.values[setKey].number)
        const color = this.chart.data.map(row => row.values[setKey].color)

        return {
          label: set.label,
          backgroundColor: color,
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
    this.chartData = this.computedChartData
    this.renderChart(this.chartData, this.options)
  },

  watch: {
    computedChartData: {
      deep: true,
      handler (data) {
        this.chartData = data
      }
    }
  }
}
</script>
