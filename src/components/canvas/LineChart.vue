<script>
import { Line } from 'vue-chartjs'
Chart.defaults.global.defaultFontFamily = "'Compromis', sans-serif"
Chart.defaults.global.tooltips.enabled = false

export default {
  extends: Line,

  data () {
    return {
      chartdata: {
        labels: ['January', 'February', 'jaskdas', 'jkashdkas'],
        datasets: [
          {
            label: 'Data One',
            borderColor: '#f87979',
            backgroundColor: 'transparent',
            data: [40, 20, 35, 45]
          },
          {
            label: 'Data Two',
            borderColor: '#2f7343',
            backgroundColor: 'transparent',
            data: [10, 28, 8, 40]
          }
        ]
      },
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

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
