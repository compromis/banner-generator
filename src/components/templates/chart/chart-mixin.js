export default {
  methods: {
    formatNumber (number) {
      const options = { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 4 }
      if (this.chart.options.valuesIn === 'euros') {
        options.style = 'currency'
        options.currency = 'EUR'
      } else if (this.chart.options.valuesIn === 'percentage') {
        number = number / 100
        options.style = 'percent'
      }

      return new Intl.NumberFormat('es-ES', options).format(number)
    }
  }
}
