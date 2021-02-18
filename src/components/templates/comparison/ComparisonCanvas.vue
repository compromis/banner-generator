<template>
  <div v-if="child">
    <comparison-canvas-party v-if="child === 'party'"/>
    <comparison-canvas-headline v-if="child === 'headline'"/>
  </div>
</template>

<script>
import ComparisonCanvasParty from './ComparisonCanvasParty'
import ComparisonCanvasHeadline from './ComparisonCanvasHeadline'

export default {
  name: 'comparison-canvas',

  components: {
    ComparisonCanvasParty,
    ComparisonCanvasHeadline
  },

  computed: {
    child () {
      return this.$store.state.child
    }
  }
}
</script>
