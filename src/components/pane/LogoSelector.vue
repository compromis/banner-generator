<template>
  <c-select name="logo" label="Logo" v-model="logo" expanded v-if="showLogoSelector">
    <option value="compromis">Compromís</option>
    <option value="mes">Més</option>
    <option value="iniciativa">Iniciativa</option>
    <option value="verds">Verds</option>
    <option value="jovespv">Joves PV</option>
    <option value="jovesiniciativa">Joves amb Iniciativa</option>
  </c-select>
</template>

<script>
import CSelect from './CSelect'

export default {
  name: 'party-selector',

  components: {
    CSelect
  },

  props: {
    value: {
      type: String,
      default: 'compromis'
    }
  },

  computed: {
    logo: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    },

    showLogoSelector () {
      return this.$store.state.settings.showLogoSelector
    }
  }
}
</script>
