<script>
import Chart from 'chart.js'
import { Line, mixins } from 'vue-chartjs'
Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.tooltips.enabled = false

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
