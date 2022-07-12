export default {
  data () {
    return {
      granissatColors: ['red', 'yellow', 'blue', 'pink']
    }
  },

  methods: {
    fieldIsSomMolt (field) {
      if (!this.properties[field].startsWith('Som molt d') && !this.properties[field].startsWith('Somos muy de')) {
        this.$store.commit('addError', { field, message: 'La frase ha de començar per "Som molt de..." o "Somos muy de..."' })
      }
    }
  }
}
