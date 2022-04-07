<template>
  <div class="advanced-cropping">
    <div
      ref="area"
      class="crop-area"
      :style="{
        '--aspect': ratio,
        backgroundImage: `url(${preview})`,
        ...backgroundPosition
      }"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @scroll="onScroll"
    >
      <div class="handler" :style="{ left: `${handler.x}px`, top: `${handler.y}px` }"></div>
    </div>
    <range-slider
      name="scale"
      :min="100"
      :max="300"
      v-model="pos.scale"
      class="scale-slider"
    />
  </div>
</template>

<script>
import RangeSlider from './RangeSlider'

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
        scale: 100
      })
    },
    ratio: {
      type: Number,
      default: 1
    },
    preview: {
      type: String,
      required: true
    },
    pictureAspect: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      handler: {
        x: 50,
        y: 50
      },
      dragging: false
    }
  },

  components: {
    RangeSlider
  },

  computed: {
    pos: {
      get () {
        return this.value
      },

      set (pos) {
        this.$emit('input', pos)
      }
    },

    backgroundPosition () {
      const { x, y, scale } = this.pos
      return {
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: this.pictureAspect === 'horizontal' ? `auto ${scale}%` : `${scale}% auto`
      }
    }
  },

  methods: {
    startDrag (e) {
      this.dragging = true
      this.computePosition(e)
    },

    onDrag (e) {
      if (this.dragging) {
        this.computePosition(e)
      }
    },

    endDrag () {
      this.dragging = false
    },

    computePosition ({ offsetX, offsetY }) {
      this.pos.x = 100 - (offsetX / this.$refs.area.offsetWidth * 100)
      this.pos.y = 100 - (offsetY / this.$refs.area.offsetHeight * 100)
      this.handler.x = offsetX - 10
      this.handler.y = offsetY - 10
    }
  }
}
</script>

<style lang="scss" scoped>
.advanced-cropping {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.crop-area {
  aspect-ratio: var(--aspect, 1);
  width: 100%;
  position: relative;
  border-radius: .5rem;
  padding: .25rem;

  .handler {
    width: 1.5em;
    height: 1.5em;
    border-radius: 100%;
    background: white;
    position: absolute;
    pointer-events: none;
    border: 2px black solid;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
}

.scale-slider::v-deep .slider {
  padding: 0;
  margin: 0;
}
</style>
