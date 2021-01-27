export default {
  methods: {
    formatNumber (number) {
      const options = { notation: 'compact', compactDisplay: 'short' }
      if (this.chart.options.valuesIn === 'euros') {
        options.style = 'currency'
        options.currency = 'EUR'
      } else if (this.chart.options.valuesIn === 'percentage') {
        number = number / 100
        options.style = 'percent'
        options.maximumFractionDigits = 0
      }

      return new Intl.NumberFormat('es-ES', options).format(number)
    }
  }
}
