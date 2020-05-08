<template>
  <div class="banner-workspace" v-if="banner">
    <b-tabs :class="['banner-aspect', `banner-aspect-${template.aspects[aspect]}`]" type="is-toggle-rounded" position="is-centered" v-model="aspect" @change="resize">
      <b-tab-item id="aspect-tabs" v-if="template.aspects.includes('11')" label="1:1" icon="square"></b-tab-item>
      <b-tab-item v-if="template.aspects.includes('916')" label="9:16" icon="mobile-android"></b-tab-item>
      <b-tab-item v-if="template.aspects.includes('event')" label="Portada" icon="rectangle-landscape"></b-tab-item>
      <div id="previewCanvas" :class="['canvas-wrapper', `template-${template.id.toLowerCase()}`]" :style="{transform: `scale(${scale})`, margin: `${margin}rem`}">
        <component :is="canvasComponent" :banner="banner" :aspect="template.aspects[aspect]" :color="color" />
      </div>
      <div class="hidden-canvas">
        <div id="downloadCanvas" :style="{transform: `scale(${downloadScale})`, transformOrigin: 'top left'}"></div>
      </div>
    </b-tabs>
    <careta-selector v-model="color" is-rounded v-if="!['FakeNews', 'Social', 'Comparison', 'Headline', 'Media'].includes(template.id)" />

    <div id="download-button" class="primary-download-button">
      <b-tooltip label="Has d'emplenar tots els camps necessaris" position="is-left" type="is-dark" :active="!isDownloadable && displayTooltip">
        <b-button type="is-primary" size="is-large" rounded @click="download" :disabled="downloading">
          <b-icon v-if="!downloading" icon="arrow-to-bottom" />
          <b-icon v-else icon="circle-notch" custom-class="fa-spin" />
          <span class="button-label">Descarrega</span>
        </b-button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import CaretaSelector from '@/utils/CaretaSelector'

export default {
  name: 'canvas-container',

  props: {
    canvasComponent: Function,
    banner: Object,
    template: Object,
    isDownloadable: Boolean
  },

  components: {
    CaretaSelector
  },

  data () {
    return {
      aspect: 0,
      color: 'normal',
      displayTooltip: false,
      downloading: false,
      scale: 1,
      downloadScale: 2,
      margin: 0,
      aspects: {
        '11': { width: 720, height: 720, downloadScale: 2, minScale: 0.35, maxScale: 1, minMargin: -15, maxMargin: 0 },
        '916': { width: 405, height: 720, downloadScale: 2, minScale: 0.35, maxScale: 1, minMargin: -15, maxMargin: 0 },
        'event': { width: 720, height: 405, downloadScale: 3, minScale: 0.35, maxScale: 1, minMargin: -15, maxMargin: 0 }
      }
    }
  },

  watch: {
    aspect: function () {
      EventBus.$emit('aspectUpdated', this.aspect)
    }
  },

  created () {
    this.resize()
    window.addEventListener('resize', this.handleWindowResize)
    EventBus.$on('download', this.download)
  },

  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    resize () {
      this.handleWindowResize({ srcElement: window })
    },

    handleWindowResize (e) {
      const aspect = this.template.aspects[this.aspect]
      const minHeight = 450
      const maxHeight = 950
      const minScale = this.aspects[aspect].minScale
      const maxScale = this.aspects[aspect].maxScale
      const minMargin = this.aspects[aspect].minMargin
      const maxMargin = this.aspects[aspect].maxMargin
      const height = e.srcElement.innerHeight
      const propHeight = (height - minHeight) / (maxHeight - minHeight)

      if (height > maxHeight) { // Max scale
        this.scale = maxScale
        this.margin = maxMargin
      } else if (height < minHeight) { // Min scale
        this.scale = minScale
        this.margin = minMargin
      } else { // In-between
        this.scale = minScale + propHeight * (maxScale - minScale)
        this.margin = minMargin + propHeight * (maxMargin - minMargin)
      }
    },

    download () {
      if (!this.banner) return
      this.displayTooltip = true
      EventBus.$emit('checkForErrors', true)

      const aspect = this.template.aspects[this.aspect]
      const { width, height, downloadScale } = this.aspects[aspect]
      const bannerWidth = width * downloadScale
      const bannerHeight = height * downloadScale
      this.downloadScale = downloadScale

      if (this.isDownloadable) {
        this.downloading = true

        /* Create an upscaled clone */
        const previewCanvas = document.getElementById('previewCanvas')
        const downloadCanvas = document.getElementById('downloadCanvas')
        downloadCanvas.innerHTML = previewCanvas.cloneNode(true).innerHTML

        domtoimage.toPng(
          downloadCanvas,
          { bgcolor: '#fff', width: bannerWidth, height: bannerHeight }
        ).then((blob) => {
          saveAs(blob, 'banner.png')
          this.saveToServer(blob)
          this.downloading = false
          // eslint-disable-next-line
          gtag('event', 'banner_download', {
            event_category: 'banners',
            event_label: aspect
          })
        })
      }
    },

    saveToServer (blob) {
      fetch('https://compromis.net/espai/targes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: this.encode({ blob })
      })
    },

    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/variables";
  @import "../sass/banner";

  .banner-canvas {
    box-sizing: content-box;
    position: relative;
    width: 720px;
    height: 720px;
    overflow: hidden;
    transition: all .5s ease-in-out;
    background: $white;
  }

  .canvas-wrapper {
    display: flex;
    justify-content: center;
    transition: .25 ease-in-out;
    border: 1px $white solid;
    outline: 1px $gray-900 solid;
  }

  .hidden-canvas {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .banner-aspect-916 .banner-canvas {
    width: 405px;
  }

  .banner-aspect-event .banner-canvas {
    width: 720px;
    height: 405px;
  }

  .primary-download-button {
    position: fixed;
    right: 2rem;
    bottom: 2rem;

    .button {
      transition: .25s ease-in-out;

      &:hover {
        transform: translateY(-4px);
        box-shadow: $raised-shadow;
      }

      &:active {
        transform: translateY(2px);
      }

      &-label {
        position: relative;
        top: -4px;
        overflow: hidden;
      }
    }
  }

  .template-social {
    border-radius: 100%;
    overflow: hidden;
    outline: 0;
    border-color: $gray-900;
  }

  @media (max-width: $xs-breakpoint) {
    .canvas-wrapper {
      transform: scale(0.4321) !important;
      margin: -12.49rem !important;
    }

    .banner-aspect-event {
      .canvas-wrapper {
        transform: scale(0.4321) !important;
        margin: -5.49rem !important;
      }
    }

    .b-tabs,
    .tab-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

  @media (max-width: $xl-breakpoint) {
    .primary-download-button {
      top: 3.65rem;
      bottom: auto;

      .button {
        &-label {
          display: inline;
        }

        &.is-large {
          font-size: .85rem;
        }

        .icon {
          position: relative;
          top: 3px;
          height: .85rem;
          width: .85rem;
          margin-right: .35rem !important;
        }
      }
    }
  }
</style>
