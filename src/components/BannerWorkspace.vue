<template>
  <div class="banner-workspace">
    <b-tabs class="banner-aspect" type="is-toggle-rounded" position="is-centered">
      <b-tab-item label="1:1" icon="square">
        <component :is="componentBanner" :banner-properties="bannerProperties" aspect="1:1" />
      </b-tab-item>
      <b-tab-item label="9:16" icon="mobile-android">
        <component :is="componentBanner" :banner-properties="bannerProperties" aspect="9:16" />
      </b-tab-item>
    </b-tabs>
    <button @click="download">Descarrega</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'banner-workspace',

  props: {
    componentBanner: Object,
    bannerProperties: Object
  },

  methods: {
    download () {
      html2canvas(document.querySelector("#banner"), { allowTaint: true }).then(canvas => {
        canvas.classList.add('banner')
        document.body.appendChild(canvas)
      })
    }
  }
}
</script>
