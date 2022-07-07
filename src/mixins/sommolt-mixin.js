export default {
  methods: {
    fieldIsSomMolt (field) {
      if (!this.properties[field].startsWith('Som molt d')) {
        this.$store.commit('addError', { field, message: 'La frase ha de començar per "Som molt de..."' })
      }
    }
  }
}
