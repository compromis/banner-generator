<template>
  <div class="banner-workspace" v-if="banner">
    <b-dropdown :triggers="['hover']" aria-role="list" v-if="template" class="aspect-selector">
      <template #trigger>
        <b-button :icon-left="aspects[aspect].icon" icon-right="chevron-down">
          <span class="aspect-name">{{ aspects[aspect].name }}</span>
          <span class="aspect-description">{{ aspects[aspect].description }}</span>
        </b-button>
      </template>

      <b-dropdown-item v-for="taspect in template.aspects" aria-role="listitem" :key="taspect" @click="() => selectAspect(taspect)">
        <font-awesome-icon :icon="['far', aspects[taspect].icon]" fixed-width />
        <span class="aspect-name">{{ aspects[taspect].name }}</span>
        <span class="aspect-description">{{ aspects[taspect].description }}</span>
      </b-dropdown-item>
    </b-dropdown>

    <div :class="['banner-aspect', `banner-aspect-${aspect}`]">
      <div
        :class="['canvas-wrapper', `template-${template.id.toLowerCase()}`]"
        :style="{transform: `scale(${scale})`, margin: `${margin}px`}">
        <component :is="canvasComponent" />
      </div>
    </div>

    <div id="download-button" class="primary-download-button">
      <b-tooltip
        label="Has d'emplenar tots els camps necessaris"
        position="is-left"
        type="is-dark"
        :active="!isDownloadable && displayErrors">
        <b-button
          type="is-primary"
          size="is-large"
          rounded
          @click="download"
          :disabled="downloading">
          <b-icon v-if="!downloading" icon="arrow-to-bottom" />
          <b-icon v-else icon="circle-notch" custom-class="fa-spin" />
          <span class="button-label">Descarrega</span>
        </b-button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import http from '@/http'

export default {
  name: 'canvas-container',

  props: {
    canvasComponent: Function
  },

  data () {
    return {
      displayTooltip: false,
      downloading: false,
      scale: 1,
      margin: 0
    }
  },

  computed: {
    aspects () {
      return this.$store.state.aspects
    },

    aspect () {
      return this.$store.state.aspect
    },

    template () {
      return this.$store.state.template
    },

    banner () {
      return this.$store.state.banner
    },

    isDownloadable () {
      return this.$store.state.isDownloadable
    },

    displayErrors () {
      return this.$store.state.displayErrors
    }
  },

  created () {
    this.resize()
    window.addEventListener('resize', this.handleWindowResize)
  },

  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    selectAspect (aspect) {
      this.$store.commit('setAspect', aspect)
      this.resize()
    },

    resize () {
      this.handleWindowResize({ srcElement: window })
    },

    handleWindowResize (e) {
      const minHeight = 450
      const maxHeight = 950
      const { minScale, maxScale, minMargin, maxMargin } = this.aspects[this.aspect]
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

    async download () {
      if (!this.banner) return
      this.$store.commit('setDisplayErrors', true)
      this.$root.$emit('checkForErrors')
      if (!this.isDownloadable) {
        window.scrollTo({
          top: 400,
          behavior: 'smooth'
        })
      }

      const { ref } = this.$store.state.bannerMeta
      const { width, height, downloadScale } = this.aspects[this.aspect]
      const bannerWidth = width * downloadScale
      const bannerHeight = height * downloadScale

      if (this.isDownloadable) {
        this.downloading = true

        const blob = await domtoimage.toPng(
          document.getElementById('bannerCanvas' + this.aspect),
          {
            bgcolor: this.banner.mode === 'black' ? '#353949' : '#fff',
            width: bannerWidth,
            height: bannerHeight,
            style: {
              transform: `scale(${downloadScale})`,
              transformOrigin: 'top left'
            }
          }
        )

        // Download banner on browser
        saveAs(blob, 'banner.png')
        this.downloading = false

        // Save preview to server
        await http.preview(ref, blob)

        if (typeof gtag === 'function') {
          window.gtag('event', 'banner_download', {
            event_category: 'banners',
            event_label: this.aspect
          })
        }
      }
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
    user-select: none;
  }

  .canvas-wrapper {
    display: flex;
    justify-content: center;
    transition: .25 ease-in-out;
    border: 1px $white solid;
    outline: 1px $gray-900 solid;
  }

  .tab-content {
    // display: none !important;
  }

  .banner-aspect {
    margin-bottom: 0 !important;
  }

  .banner-aspect-916 .banner-canvas {
    width: 405px;
  }

  .banner-aspect-event .banner-canvas,
  .banner-aspect-169 .banner-canvas {
    width: 720px;
    height: 405px;
  }

  .primary-download-button {
    position: fixed;
    right: 2rem;
    bottom: 2rem;

    .button {
      transition: .25s ease-in-out;

      &-label {
        position: relative;
        top: -.15rem;
        overflow: hidden;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: $raised-shadow;
      }

      &:active {
        transform: translateY(2px);
      }
    }
  }

  .template-social {
    border-radius: 100%;
    overflow: hidden;
    outline: 0;
    border-color: $gray-900;
  }

  .banner-workspace .careta-selector {
    margin: 0 auto;
  }

  .aspect-selector {
    margin: 0 auto 1rem auto;
    transform: translateY(-0.375rem);
    min-width: 100px;
    position: relative;
    z-index: 40;

    &::v-deep .dropdown-menu {
      padding-top: 14px !important;
    }

    .button {
      min-width: 170px !important;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      padding-right: 1rem;
      min-width: 175px;
    }

    .aspect-name {
      margin: 0 .5rem;
    }

    .aspect-description {
      color: $gray-700;
      margin-left: auto;
    }
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
      top: .75rem;
      right: 1rem;
      bottom: auto;

      .button {
        &-label {
          display: inline;
          top: 0;
        }

        &.is-large {
          font-size: .85rem;
        }

        .icon {
          position: relative;
          top: .25rem;
          height: .85rem;
          width: .85rem;
          margin-right: .35rem !important;
        }
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .primary-download-button {
      top: 3.75rem;
    }
  }
</style>
