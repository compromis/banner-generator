export default {
  data () {
    return {
      granissatColors: ['red', 'yellow', 'blue', 'pink', 'indigo', 'feminist']
    }
  },

  methods: {
    setRandomColor () {
      if (this.properties.bgColor !== 'initial') return
      const max = this.granissatColors.length - 1
      const index = Math.floor(Math.random() * max)
      this.properties.bgColor = this.granissatColors[index]
    }
  }
}
