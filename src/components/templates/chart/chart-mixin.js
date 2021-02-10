export default {
  computed: {
    mode () {
      return this.$store.state.banner.mode
    }
  },

  methods: {
    formatNumber (number) {
      const options = { notation: 'compact', compactDisplay: 'short' }

      if (number.toString().split('').includes('.')) {
        console.log('I gots the digits')
        options.maximumFractionDigits = 2
      }

      if (this.chart.options.valuesIn === 'euros') {
        options.style = 'currency'
        options.currency = 'EUR'
      } else if (this.chart.options.valuesIn === 'percentage') {
        number = number / 100
        options.style = 'percent'
        options.maximumFractionDigits = 4
      }

      return new Intl.NumberFormat('es-ES', options).format(number)
    }
  }
}
