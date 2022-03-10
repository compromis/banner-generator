<template>
  <div>
    <compare-party-canvas-glowy v-if="banner.theme === 'glowy'" />
    <compare-party-canvas-blobless v-else />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import ComparePartyCanvasGlowy from './ComparePartyCanvasGlowy.vue'
import ComparePartyCanvasBlobless from './ComparePartyCanvasBlobless.vue'

export default {
  mixins: [CanvasMixin],

  components: {
    ComparePartyCanvasGlowy,
    ComparePartyCanvasBlobless
  }
}
</script>
