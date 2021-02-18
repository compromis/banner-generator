<template>
  <div>
    <comparison-canvas-party v-if="child === 'party'"/>
    Active tab is {{ child }}
  </div>
</template>

<script>
import ComparisonCanvasParty from './ComparisonCanvasParty'

export default {
  name: 'comparison-canvas',

  components: {
    ComparisonCanvasParty
  },

  computed: {
    child () {
      return this.$store.state.child
    }
  }
}
</script>
