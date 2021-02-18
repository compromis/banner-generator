<template>
  <div :class="{ 'pane comparison-pane': true, 'pane-dimmed': false }">
    <b-tabs @input="updateActiveTab">
      <b-tab-item label="Partits" value="party">
        <comparison-pane-party />
      </b-tab-item>
      <b-tab-item label="Titulars" value="headline">
        <comparison-pane-headline />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import ComparisonPaneParty from './ComparisonPaneParty'
import ComparisonPaneHeadline from './ComparisonPaneHeadline'

export default {
  name: 'comparison-pane',

  components: {
    ComparisonPaneParty,
    ComparisonPaneHeadline
  },

  methods: {
    updateActiveTab (value) {
      this.$store.commit('updateChild', value)
    }
  },

  mounted () {
    this.$store.commit('updateChild', 'party')
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .b-tabs .tab-content {
    padding: 0;
  }

  .tabs li {
    width: 100%;
  }
</style>
