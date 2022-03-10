<template>
  <div>
    <compare-headline-canvas-glowy v-if="banner.theme === 'glowy'" />
    <compare-headline-canvas-blobless v-else />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import CompareHeadlineCanvasGlowy from './CompareHeadlineCanvasGlowy.vue'
import CompareHeadlineCanvasBlobless from './CompareHeadlineCanvasBlobless.vue'

export default {
  mixins: [CanvasMixin],

  components: {
    CompareHeadlineCanvasGlowy,
    CompareHeadlineCanvasBlobless
  }
}
</script>
